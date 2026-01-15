import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

/**
 * Unit tests for AuthInterceptor
 *
 * This suite verifies that AuthInterceptor correctly attaches the
 * Authorization header with a Bearer token to outgoing HTTP requests
 * if the user is logged in
 *
 */
describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: jasmine.SpyObj<AuthService>;
  let httpHandler: jasmine.SpyObj<HttpHandler>;

  /**
   * Sets up TestBed and mocks AuthService and HttpHandler
   */
  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const handlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpHandler = handlerSpy;

    httpHandler.handle.and.returnValue(of(null as unknown as HttpEvent<any>));
  });

  /**
   * Test: Interceptor should be created
   */
  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  /**
   * Test: Adds Authorization header when token exists
   */
  it('should add Authorization header when token exists', () => {
    authService.getToken.and.returnValue('my-token');

    const req = new HttpRequest('GET', '/test');

    interceptor.intercept(req, httpHandler).subscribe();

    expect(httpHandler.handle).toHaveBeenCalled();
    const handledRequest = httpHandler.handle.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(handledRequest.headers.get('Authorization')).toBe('Bearer my-token');
  });

  /**
   * Test: Does not add Authorization header when token is null
   */
  it('should not add Authorization header when token does not exist', () => {
    authService.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/test');

    interceptor.intercept(req, httpHandler).subscribe();

    expect(httpHandler.handle).toHaveBeenCalled();
    const handledRequest = httpHandler.handle.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(handledRequest.headers.has('Authorization')).toBeFalse();
  });
});
