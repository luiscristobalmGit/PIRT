import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  valido: boolean;
  idRol?: number;
  mensaje?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/usuarios/validar';
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_ROLE_KEY = 'userRole';

  constructor(private http: HttpClient, private router: Router) { }

  login(cuenta: string, contrasena: string): Observable<LoginResponse> {
    const body = { cuenta, contrasena };
    const headers = {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost'
    };

    return this.http.post<LoginResponse>(this.API_URL, body, { headers }).pipe(
      tap((response: LoginResponse) => {
        if (response.valido && response.token) {
          this.storeAuthData(response.token, response.idRol);
        } else {
          throw new Error(response.mensaje || 'Autenticación fallida');
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  getUserRole(): number | null {
    const role = localStorage.getItem(this.USER_ROLE_KEY);
    return role ? parseInt(role) : null;
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private storeAuthData(token: string, idRol?: number): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    if (idRol !== undefined) {
      localStorage.setItem(this.USER_ROLE_KEY, idRol.toString());
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error de autenticación';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error?.mensaje) {
      errorMessage = error.error.mensaje;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}