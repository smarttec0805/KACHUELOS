import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/bienvenida/welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: 'phone',
        loadComponent: () => import('./pages/telefono/phone.component').then(m => m.PhoneComponent)
    },
    {
        path: 'code',
        loadComponent: () => import('./pages/codigo/code.component').then(m => m.CodeComponent)
    },
    {
        path: 'role',
        loadComponent: () => import('./pages/rol/role.component').then(m => m.RoleComponent)
    },
    {
        path: 'profile-info',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/perfil-info/profile-info.component').then(m => m.ProfileInfoComponent)
    },
    {
        path: 'worker-type',
        loadComponent: () => import('./pages/tipo-trabajador/worker-type.component').then(m => m.WorkerTypeComponent)
    },
    {
        path: 'services',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/servicios/services.component').then(m => m.ServicesComponent)
    },
    {
        path: 'work-details',
        loadComponent: () => import('./pages/detalles-trabajo/work-details.component').then(m => m.WorkDetailsComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/panel-principal/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'premium',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/premium/premium.component').then(m => m.PremiumComponent)
    },
    {
        path: 'private-profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/perfil-privado/private-profile.component').then(m => m.PrivateProfileComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    }
];
