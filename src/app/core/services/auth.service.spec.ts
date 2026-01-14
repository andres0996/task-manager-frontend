import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppConfig } from '../../app.config';
import { environment } from '../../../environments/environment.prod';

/**
 * Unit tests for AuthService
 *
 * This suite verifies that AuthService correctly handles:
 * - login API calls
 * - token storage and retrieval
 * - email storage and retrieval
 * - logout functionality
 *
 */
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API and return token', () => {
    const email = 'test@example.com';
    const mockResponse = { token: 'my-jwt-token' };

    service.login(email).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AppConfig.endpoints.auth.login}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userEmail: email });

    req.flush(mockResponse);
  });

  it('should save and retrieve token', () => {
    service.saveToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should save and retrieve email', () => {
    service.saveToken('abc123', 'test@example.com');
    expect(service.getEmail()).toBe('test@example.com');
  });

  it('should return true for isLoggedIn if token exists', () => {
    service.saveToken('token123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false for isLoggedIn if token does not exist', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should remove token and email on logout', () => {
    service.saveToken('token123', 'test@example.com');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.getEmail()).toBeNull();
  });
});
