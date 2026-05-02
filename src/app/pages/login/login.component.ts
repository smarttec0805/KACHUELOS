import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">

      <!-- Cabecera verde con logo -->
      <div class="relative bg-gradient-to-br from-[#32DE84] to-[#0F6E56] pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <div class="absolute top-8 -right-16 w-48 h-48 bg-[#FF5722] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
        <div class="absolute bottom-4 -left-16 w-56 h-56 bg-[#a0f3d4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

        <a routerLink="/" class="absolute top-5 left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
          <span class="material-symbols-outlined text-2xl">arrow_back</span>
        </a>

        <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-5 shadow-lg border border-white/30">
          <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">handyman</span>
        </div>

        <h1 class="font-display text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow">
          Kachuelos
        </h1>
        <p class="font-body text-white/90 text-sm leading-relaxed max-w-xs">
          Bienvenido de vuelta. Ingresa con tu número de celular o con Google.
        </p>
      </div>

      <!-- Tarjeta del formulario (sobrepuesta) -->
      <main class="flex-1 -mt-10 z-10 px-5 pb-10">
        <div class="bg-surface rounded-[28px] shadow-[0_-8px_40px_rgba(0,0,0,0.10)] border border-white/60 p-7">

          <h2 class="font-headline text-[22px] font-bold text-on-surface mb-1">Iniciar sesión</h2>
          <p class="font-body text-sm text-on-surface-variant mb-7 leading-relaxed">
            Elige cómo quieres ingresar a tu cuenta.
          </p>

          <!-- Campo teléfono -->
          <div class="space-y-2 mb-5">
            <label class="block font-label text-sm font-semibold text-on-surface" for="login-phone">
              Número de celular
            </label>
            <div class="flex gap-3">
              <div class="flex items-center justify-center gap-2 px-4 bg-surface-container-low rounded-xl h-[52px] w-[90px] text-on-surface font-body font-medium flex-shrink-0">
                <span class="text-xl leading-none" aria-hidden="true">🇵🇪</span>
                <span class="text-sm">+51</span>
              </div>
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

          <div class="flex items-center gap-2 text-on-surface-variant mb-6">
            <span class="material-symbols-outlined text-[16px] text-outline flex-shrink-0">lock</span>
            <span class="font-body text-xs">Tu número es privado y seguro</span>
          </div>

          <!-- Botón SMS -->
          <a
            [routerLink]="['/code']"
            [queryParams]="{ modo: 'login' }"
            class="group flex items-center justify-center w-full bg-[#0F6E56] text-white font-headline font-bold text-[1.1rem] py-4 px-6 rounded-2xl shadow-[0_8px_24px_rgba(15,110,86,0.35)] transition-all active:scale-[0.98] hover:bg-[#086b53] mb-5"
          >
            <span>Ingresar con SMS</span>
            <span class="material-symbols-outlined ml-2 text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>

          <!-- Divider -->
          <div class="flex items-center gap-3 mb-5">
            <div class="flex-1 h-px bg-outline-variant/40"></div>
            <span class="font-body text-xs text-outline">o continúa con</span>
            <div class="flex-1 h-px bg-outline-variant/40"></div>
          </div>

          <!-- Botón Google -->
          <button
            type="button"
            (click)="loginConGoogle()"
            [disabled]="cargando()"
            class="flex items-center justify-center gap-3 w-full bg-white text-on-surface font-headline font-semibold text-[1rem] py-4 px-6 rounded-2xl border-2 border-outline-variant/40 transition-all active:scale-[0.98] hover:bg-surface-container-low disabled:opacity-60 mb-4 shadow-sm"
          >
            <!-- Google icon SVG -->
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            @if (cargando()) {
              <span>Entrando...</span>
            } @else {
              <span>Continuar con Google</span>
            }
          </button>

          <!-- Error -->
          @if (error()) {
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <span class="material-symbols-outlined text-red-500 text-[18px] flex-shrink-0">error</span>
              <p class="font-body text-sm text-red-600">{{ error() }}</p>
            </div>
          }

          <!-- Divider crear cuenta -->
          <div class="flex items-center gap-3 mb-4">
            <div class="flex-1 h-px bg-outline-variant/40"></div>
            <span class="font-body text-xs text-outline">¿no tienes cuenta?</span>
            <div class="flex-1 h-px bg-outline-variant/40"></div>
          </div>

          <a
            routerLink="/phone"
            class="flex items-center justify-center w-full bg-surface-container text-[#0F6E56] font-headline font-bold text-[1.05rem] py-4 px-6 rounded-2xl transition-all active:scale-[0.98] hover:bg-surface-container-high border-2 border-[#0F6E56]/20 hover:border-[#0F6E56]/40"
          >
            Crear una cuenta nueva
          </a>
        </div>

        <p class="text-center font-body text-xs text-on-surface-variant mt-6 leading-relaxed px-4">
          ¿Problemas para ingresar?
          <a href="#" class="text-[#0F6E56] font-semibold hover:underline ml-1">Contactar soporte</a>
        </p>
      </main>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);

  cargando = signal(false);
  error = signal<string | null>(null);

  async loginConGoogle() {
    this.error.set(null);
    this.cargando.set(true);
    try {
      await this.authService.loginWithGoogle();
    } catch {
      this.error.set('No se pudo iniciar sesión con Google. Intenta de nuevo.');
    } finally {
      this.cargando.set(false);
    }
  }
}
