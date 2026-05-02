import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col items-center justify-center">
      <div class="w-full max-w-md h-full sm:h-auto sm:min-h-[812px] bg-surface-container-lowest sm:rounded-3xl sm:shadow-2xl overflow-hidden flex flex-col relative">
        <header class="w-full top-0 sticky bg-surface-container-lowest z-10 flex flex-col">
          <div class="flex items-center px-4 py-3 w-full justify-between gap-4 h-14">
            <a routerLink="/" class="p-2 -ml-2 text-[#0F6E56] hover:bg-surface-container-low rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F6E56]">
              <span class="material-symbols-outlined text-2xl">arrow_back</span>
            </a>
            <h1 class="font-headline font-semibold text-xs tracking-tight text-on-surface-variant flex-1 text-center">Paso 1 de 4</h1>
            <div class="w-10"></div>
          </div>
          <div class="w-full flex h-1 bg-surface-container-high">
            <div class="w-1/4 bg-[#0F6E56] h-full rounded-r-full"></div>
          </div>
        </header>

        <main class="flex-1 px-6 pt-8 pb-6 flex flex-col">
          <div class="space-y-3 mb-10">
            <h2 class="font-headline text-2xl font-bold text-on-surface tracking-tight">Ingresa tu número de celular</h2>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed">Te enviaremos un código por SMS para verificar que eres tú. Es rápido y seguro.</p>
          </div>

          <div class="space-y-2 mb-6">
            <label class="block font-label text-sm font-medium text-on-surface" for="phone">Número de celular</label>
            <div class="flex gap-3">
              <div class="flex items-center justify-center gap-2 px-4 bg-surface-container-low rounded-xl h-[52px] w-[90px] text-on-surface font-body font-medium transition-colors">
                <span aria-hidden="true" class="text-xl leading-none">🇵🇪</span>
                <span>+51</span>
              </div>
              <div class="flex-1 relative">
                <input autocomplete="tel" class="w-full h-[52px] bg-surface-container-low border-transparent focus:border-transparent focus:ring-0 rounded-xl px-4 font-body text-lg text-on-surface placeholder:text-outline-variant transition-all hover:bg-surface-container focus:bg-surface-container-lowest border-b-2 focus:border-b-[#0F6E56] shadow-sm outline-none" id="phone" placeholder="987 654 321" type="tel"/>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 text-on-surface-variant mt-2">
            <span class="material-symbols-outlined text-[16px] text-outline">lock</span>
            <span class="font-body text-xs">No compartiremos tu número con nadie</span>
          </div>
          <div class="flex-1"></div>
        </main>

        <footer class="px-6 pb-8 pt-4 w-full bg-surface-container-lowest mt-auto">
          <a routerLink="/code" class="w-full h-[52px] bg-[#D85A30] text-white font-headline font-bold text-base rounded-xl shadow-[0_4px_16px_rgba(216,90,48,0.2)] hover:shadow-[0_6px_20px_rgba(216,90,48,0.3)] transition-all active:scale-95 mb-6 flex items-center justify-center">
            Enviar código SMS
          </a>
          <p class="text-center font-body text-sm text-on-surface-variant">
            ¿Ya tienes cuenta? <a class="font-semibold text-[#0F6E56] hover:text-primary transition-colors focus:outline-none focus:underline" href="#">Iniciar sesión</a>
          </p>
        </footer>
      </div>
    </div>
  `
})
export class PhoneComponent {}
