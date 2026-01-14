import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * AuthInterceptor
 *
 * This HTTP interceptor automatically attaches the authentication token
 * (Bearer token) to outgoing HTTP requests if the user is logged in.
 *
 * It works globally for all HTTP requests made via Angular's HttpClient.
 *
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercepts outgoing HTTP requests and adds the Authorization header
   * if a token is available.
   *
   * @param req The outgoing HTTP request
   * @param next The next HTTP handler in the chain
   * @returns Observable<HttpEvent<any>> - the handled request stream
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
