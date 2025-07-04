import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token inválido o expirado
          this.authService.logout();
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        
        // Mostrar mensaje de error específico si está disponible
        const errorMessage = error.error?.mensaje || error.message;
        console.error('Error en la solicitud:', errorMessage);
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}