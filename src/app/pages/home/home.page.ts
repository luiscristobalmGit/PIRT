import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false,
})
export class HomePage {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Navega a una ruta específica con manejo de errores
   * @param path Ruta a la que se desea navegar
   */
  navigateTo(path: string): void {
    this.router.navigate([path])
      .then(navigationSuccess => {
        if (!navigationSuccess) {
          console.warn(`Navegación a ${path} fallida, intentando con navigateByUrl`);
          this.router.navigateByUrl(path)
            .then(byUrlSuccess => {
              if (!byUrlSuccess) {
                console.error(`Navegación fallida completamente a ${path}, recargando página`);
                window.location.href = path;
              }
            })
            .catch(err => {
              console.error('Error en navigateByUrl:', err);
              window.location.href = path;
            });
        }
      })
      .catch(err => {
        console.error('Error en navigate:', err);
        this.router.navigateByUrl(path).catch(() => {
          window.location.href = path;
        });
      });
  }

  /**
   * Cierra la sesión y redirige al login
   */
  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { 
      replaceUrl: true,
      state: { clearHistory: true } 
    }).catch(err => {
      console.error('Error al navegar a login:', err);
      window.location.href = '/login';
    });
  }
}