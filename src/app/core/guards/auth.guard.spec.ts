import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

/**
 * Unit tests for AuthGuard
 *
 * This suite tests the behavior of AuthGuard which protects routes
 * that require authentication. It ensures that:
 * 1. The guard is created properly.
 * 2. Logged-in users can activate routes.
 * 3. Non-authenticated users are blocked and redirected to login.
 *
 */
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  /**
   * Sets up the TestBed and injects the guard along with mocked dependencies
   */
  beforeEach(() => {

    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  /**
   * Test: Guard is created successfully
   */
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  /**
   * Test: Route activation allowed when user is logged in
   *
   * The guard should return true and not trigger any navigation
   */
  it('should allow activation when user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  /**
   * Test: Route activation prevented when user is not logged in
   *
   * The guard should return false and redirect the user to /login
   */
  it('should prevent activation and redirect when user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
