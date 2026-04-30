import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Role = 'offer' | 'need' | 'both';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface text-on-surface antialiased min-h-screen flex flex-col md:max-w-md md:mx-auto md:shadow-2xl md:bg-surface-container-lowest relative pb-24">

      <!-- Header -->
      <header class="flex items-center w-full px-4 h-16 bg-surface-container-lowest sticky top-0 z-10">
        <a routerLink="/code" class="p-2 -ml-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <div class="flex-1 text-center font-headline font-semibold text-lg text-on-surface">Paso 3 de 4</div>
        <div class="w-10"></div>
      </header>

      <!-- Barra de progreso -->
      <div class="flex gap-2 w-full h-1.5 px-4" aria-hidden="true">
        <div class="flex-1 bg-primary rounded-full"></div>
        <div class="flex-1 bg-primary rounded-full"></div>
        <div class="flex-1 bg-primary rounded-full"></div>
        <div class="flex-1 bg-surface-container-highest rounded-full"></div>
      </div>

      <main class="flex-1 px-6 pt-6 pb-8 flex flex-col gap-6">

        <!-- Título -->
        <div class="flex flex-col gap-2">
          <h1 class="font-headline text-[24px] font-bold text-on-surface leading-tight tracking-tight">
            ¿Qué quieres hacer en Kachuelos?
          </h1>
          <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">
            Elige la opción que mejor te describe. Podrás cambiarla después desde tu perfil.
          </p>
        </div>

        <!-- Opciones -->
        <div class="flex flex-col gap-4">

          <!-- Opción 1: Ofrecer servicios -->
          <button
            type="button"
            (click)="seleccionar('offer')"
            class="relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] w-full"
            [class]="selectedRole() === 'offer'
              ? 'border-primary-container bg-primary-container/5'
              : 'border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low'">

            <!-- Ícono -->
            <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="selectedRole() === 'offer'
                   ? 'bg-primary text-on-primary'
                   : 'bg-primary-container/10 text-primary-container'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">handyman</span>
            </div>

            <!-- Texto -->
            <div class="flex flex-col gap-1 flex-1 pr-6">
              <span class="font-headline font-semibold text-base text-on-surface">Quiero ofrecer mis servicios</span>
              <span class="font-body text-sm text-on-surface-variant leading-snug">
                Soy trabajador de oficio o estudiante y busco ganar dinero con kachuelos
              </span>
            </div>

            <!-- Radio indicator -->
            <div class="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0"
                 [class]="selectedRole() === 'offer'
                   ? 'border-primary-container bg-primary-container'
                   : 'border-outline-variant'">
              @if (selectedRole() === 'offer') {
                <div class="w-2 h-2 rounded-full bg-white"></div>
              }
            </div>
          </button>

          <!-- Opción 2: Necesito ayuda -->
          <button
            type="button"
            (click)="seleccionar('need')"
            class="relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] w-full"
            [class]="selectedRole() === 'need'
              ? 'border-secondary-container bg-secondary-container/5'
              : 'border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low'">

            <!-- Ícono -->
            <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="selectedRole() === 'need'
                   ? 'bg-secondary-container text-on-secondary'
                   : 'bg-secondary-container/10 text-secondary-container'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">front_hand</span>
            </div>

            <!-- Texto -->
            <div class="flex flex-col gap-1 flex-1 pr-6">
              <span class="font-headline font-semibold text-base text-on-surface">Necesito que me ayuden</span>
              <span class="font-body text-sm text-on-surface-variant leading-snug">
                Busco a alguien que haga un trabajo eventual o me ayude con una tarea
              </span>
            </div>

            <!-- Radio indicator -->
            <div class="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0"
                 [class]="selectedRole() === 'need'
                   ? 'border-secondary-container bg-secondary-container'
                   : 'border-outline-variant'">
              @if (selectedRole() === 'need') {
                <div class="w-2 h-2 rounded-full bg-white"></div>
              }
            </div>
          </button>

          <!-- Opción 3: Ambas (seleccionada por defecto) -->
          <button
            type="button"
            (click)="seleccionar('both')"
            class="relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] w-full"
            [class]="selectedRole() === 'both'
              ? 'border-primary bg-primary/5'
              : 'border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low'">

            <!-- Badge Más popular -->
            <div class="absolute -top-3 right-4 px-2.5 py-0.5 bg-primary text-on-primary text-xs font-semibold rounded-full shadow-sm">
              Más popular
            </div>

            <!-- Ícono -->
            <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="selectedRole() === 'both'
                   ? 'bg-primary text-on-primary'
                   : 'bg-primary/10 text-primary'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">sync</span>
            </div>

            <!-- Texto -->
            <div class="flex flex-col gap-1 flex-1 pr-6">
              <span class="font-headline font-semibold text-base text-on-surface">Quiero ambas cosas</span>
              <span class="font-body text-sm text-on-surface-variant leading-snug">
                A veces ofrezco servicios y a veces necesito ayuda. Lo mejor de los dos mundos
              </span>
            </div>

            <!-- Radio indicator -->
            <div class="absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0"
                 [class]="selectedRole() === 'both'
                   ? 'border-primary bg-primary'
                   : 'border-outline-variant'">
              @if (selectedRole() === 'both') {
                <div class="w-2 h-2 rounded-full bg-white"></div>
              }
            </div>
          </button>

        </div>
      </main>

      <!-- Botón continuar fijo -->
      <div class="fixed bottom-0 left-0 w-full md:absolute md:max-w-md p-4 bg-surface-container-lowest/90 backdrop-blur-md pt-4 pb-6">
        <a routerLink="/profile-info"
           class="flex justify-center items-center w-full bg-secondary text-on-secondary font-headline font-bold text-lg py-4 rounded-xl shadow-[0_8px_16px_rgba(216,90,48,0.25)] active:scale-[0.98] transition-transform">
          Continuar
        </a>
      </div>
    </div>
  `
})
export class RoleComponent {
  selectedRole = signal<Role>('both'); // "Ambas" seleccionada por defecto

  seleccionar(role: Role) {
    this.selectedRole.set(role);
  }
}
