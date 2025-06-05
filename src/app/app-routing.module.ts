import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro-app',
    loadChildren: () => import('./pages/registro-app/registro-app.module').then(m => m.RegistroAppPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogos',
    loadChildren: () => import('./pages/catalogos/catalogos.module').then(m => m.CatalogosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bitacora',
    loadChildren: () => import('./pages/bitacora/bitacora.module').then(m => m.BitacoraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false // Cambiar a true solo para depuración
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}