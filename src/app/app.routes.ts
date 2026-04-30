import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: 'phone',
        loadComponent: () => import('./phone.component').then(m => m.PhoneComponent)
    },
    {
        path: 'code',
        loadComponent: () => import('./code.component').then(m => m.CodeComponent)
    },
    {
        path: 'role',
        loadComponent: () => import('./role.component').then(m => m.RoleComponent)
    },
    {
        path: 'profile-info',
        loadComponent: () => import('./profile-info.component').then(m => m.ProfileInfoComponent)
    },
    {
        path: 'worker-type',
        loadComponent: () => import('./worker-type.component').then(m => m.WorkerTypeComponent)
    },
    {
        path: 'services',
        loadComponent: () => import('./services.component').then(m => m.ServicesComponent)
    },
    {
        path: 'work-details',
        loadComponent: () => import('./work-details.component').then(m => m.WorkDetailsComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'premium',
        loadComponent: () => import('./premium.component').then(m => m.PremiumComponent)
    },
    {
        path: 'private-profile',
        loadComponent: () => import('./private-profile.component').then(m => m.PrivateProfileComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login.component').then(m => m.LoginComponent)
    }
];
