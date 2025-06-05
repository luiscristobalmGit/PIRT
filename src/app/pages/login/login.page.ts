import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      cuenta: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Redirigir si ya está autenticado
    if (this.authService.isLoggedIn()) {
      this.redirectToHome();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid || this.isLoading) {
      this.markFormAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { cuenta, contrasena } = this.loginForm.value;

    this.authService.login(cuenta, contrasena)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.valido) {
            this.redirectToHome();
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorMessage = err.message || 'Error de conexión con el servidor';
          // Mostrar mensaje específico del backend si está disponible
          if (err.error?.mensaje) {
            this.errorMessage = err.error.mensaje;
          }
        }
      });
  }

  private markFormAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private redirectToHome() {
    this.router.navigate(['/home'], { replaceUrl: true })
      .then(success => {
        if (!success) {
          console.warn('Navigation failed, reloading page');
          window.location.href = '/home';
        }
      });
  }
}