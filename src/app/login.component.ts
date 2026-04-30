import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">

      <!-- Cabecera verde con logo -->
      <div class="relative bg-gradient-to-br from-[#32DE84] to-[#0F6E56] pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <!-- Decoraciones -->
        <div class="absolute top-8 -right-16 w-48 h-48 bg-[#FF5722] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
        <div class="absolute bottom-4 -left-16 w-56 h-56 bg-[#a0f3d4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

        <!-- Botón volver -->
        <a routerLink="/" class="absolute top-5 left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
          <span class="material-symbols-outlined text-2xl">arrow_back</span>
        </a>

        <!-- Ícono / Logo -->
        <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-5 shadow-lg border border-white/30">
          <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">handyman</span>
        </div>

        <h1 class="font-display text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow">
          Kachuelos
        </h1>
        <p class="font-body text-white/90 text-sm leading-relaxed max-w-xs">
          Bienvenido de vuelta. Ingresa con tu número de celular.
        </p>
      </div>

      <!-- Tarjeta del formulario (sobrepuesta) -->
      <main class="flex-1 -mt-10 z-10 px-5 pb-10">
        <div class="bg-surface rounded-[28px] shadow-[0_-8px_40px_rgba(0,0,0,0.10)] border border-white/60 p-7">

          <!-- Título -->
          <h2 class="font-headline text-[22px] font-bold text-on-surface mb-1">Iniciar sesión</h2>
          <p class="font-body text-sm text-on-surface-variant mb-7 leading-relaxed">
            Te enviaremos un código SMS para verificar tu identidad.
          </p>

          <!-- Campo teléfono -->
          <div class="space-y-2 mb-5">
            <label class="block font-label text-sm font-semibold text-on-surface" for="login-phone">
              Número de celular
            </label>
            <div class="flex gap-3">
              <!-- Prefijo país -->
              <div class="flex items-center justify-center gap-2 px-4 bg-surface-container-low rounded-xl h-[52px] w-[90px] text-on-surface font-body font-medium flex-shrink-0">
                <span class="text-xl leading-none" aria-hidden="true">🇵🇪</span>
                <span class="text-sm">+51</span>
              </div>
              <!-- Input -->
              <div class="flex-1 relative">
                <input
                  id="login-phone"
                  type="tel"
                  autocomplete="tel"
                  placeholder="987 654 321"
                  class="w-full h-[52px] bg-surface-container-low border-transparent focus:border-transparent focus:ring-0 rounded-xl px-4 font-body text-lg text-on-surface placeholder:text-outline-variant transition-all hover:bg-surface-container focus:bg-surface-container-lowest border-b-2 focus:border-b-[#0F6E56] shadow-sm outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Nota de privacidad -->
          <div class="flex items-center gap-2 text-on-surface-variant mb-8">
            <span class="material-symbols-outlined text-[16px] text-outline flex-shrink-0">lock</span>
            <span class="font-body text-xs">Tu número es privado y seguro</span>
          </div>

          <!-- Botón principal -->
          <a
            [routerLink]="['/code']"
            [queryParams]="{ modo: 'login' }"
            id="btn-ingresar"
            class="group flex items-center justify-center w-full bg-[#0F6E56] text-white font-headline font-bold text-[1.1rem] py-4 px-6 rounded-2xl shadow-[0_8px_24px_rgba(15,110,86,0.35)] transition-all active:scale-[0.98] hover:bg-[#086b53] mb-4"
          >
            <span>Ingresar</span>
            <span class="material-symbols-outlined ml-2 text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>

          <!-- Divider -->
          <div class="flex items-center gap-3 mb-4">
            <div class="flex-1 h-px bg-outline-variant/40"></div>
            <span class="font-body text-xs text-outline">o</span>
            <div class="flex-1 h-px bg-outline-variant/40"></div>
          </div>

          <!-- Crear cuenta -->
          <a
            routerLink="/phone"
            class="flex items-center justify-center w-full bg-surface-container text-[#0F6E56] font-headline font-bold text-[1.05rem] py-4 px-6 rounded-2xl transition-all active:scale-[0.98] hover:bg-surface-container-high border-2 border-[#0F6E56]/20 hover:border-[#0F6E56]/40"
          >
            Crear una cuenta nueva
          </a>
        </div>

        <!-- Ayuda -->
        <p class="text-center font-body text-xs text-on-surface-variant mt-6 leading-relaxed px-4">
          ¿Problemas para ingresar?
          <a href="#" class="text-[#0F6E56] font-semibold hover:underline ml-1">Contactar soporte</a>
        </p>
      </main>
    </div>
  `
})
export class LoginComponent {}
