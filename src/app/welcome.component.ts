import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface text-on-surface font-body antialiased min-h-screen relative overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed flex flex-col">
      <!-- Background Top Section -->
      <div class="absolute top-0 left-0 w-full h-[65%] bg-pattern rounded-b-[40px] z-0 shadow-lg">
        <div class="absolute inset-0 bg-gradient-to-br from-[#32DE84] to-[#0F6E56] rounded-b-[40px] opacity-95"></div>
        <div class="absolute top-10 left-0 w-full flex justify-center z-20 px-4">
          <div class="bg-white/10 backdrop-blur-md py-3 px-6 rounded-2xl border border-white/10 shadow-sm">
            <h2 class="text-white font-display text-3xl font-extrabold tracking-tight text-shadow-glow text-center">Conéctate, trabaja y gana</h2>
          </div>
        </div>
        <!-- Decorative shapes -->
        <div class="absolute top-10 -right-20 w-64 h-64 bg-[#FF5722] rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div class="absolute bottom-10 -left-20 w-72 h-72 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
      
      <!-- Image Layer -->
      <div class="absolute top-16 left-0 w-full h-[55%] flex justify-center items-end z-10 pointer-events-none drop-shadow-2xl">
        <img alt="3D character of a young worker holding tools" class="h-full object-contain object-bottom max-h-[500px]" src="https://lh3.googleusercontent.com/aida/ADBb0ugtRxZBGgvDzUWjIZ5otcaljEIERcEAGBlXLQ-NYBcFq2LXGl7kClB3FmYpV0EA9kXW5PanUHfhwSr-GzmDueoIbBmqisDZCAUZw1MTE3_MuDGnhzZYoQMVl6bG4Ee4xJp8WJ8SQB34w-e8W_aORuzPvWOERO2wPwWC596dNPsqj8OPw3z4DRn0FZQ1Hk3LjcCVDBBXZVBe5AyL1dM4w_qYU0AzAA1b9Mftl00OqpOLJJ7GyToRhm8TYScNfeyLUu69xkRjXh8" />
      </div>

      <!-- Main Content Container -->
      <main class="relative z-20 flex flex-col justify-end flex-grow px-6 pb-12 pt-[60vh]">
        <div class="bg-surface/95 backdrop-blur-md rounded-[32px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] w-full max-w-md mx-auto flex flex-col mt-auto border border-white/40">
          <div class="mb-8 w-full text-center">
            <h1 class="font-display text-[3.25rem] leading-[1.1] font-extrabold text-[#0F6E56] tracking-tighter mb-3 text-shadow-glow drop-shadow-md">Kachuelos</h1>
            <p class="font-body text-on-surface-variant text-base font-medium leading-relaxed max-w-[320px] mx-auto">
              Activa tu talento y encuentra oportunidades o encuentra a alguien que te ayude con oficios, mudanzas y más. Ganar dinero nunca fue tan fácil.
            </p>
          </div>
          
          <div class="flex flex-col gap-4 w-full">
            <a routerLink="/phone" class="group flex items-center justify-center w-full bg-[#FF5722] text-white font-label font-bold text-[1.125rem] py-4 px-6 rounded-full shadow-[0_8px_24px_rgba(255,87,34,0.5)] transition-all active:scale-[0.98] hover:bg-[#E64A19]">
              <span>Crear cuenta</span>
              <span class="material-symbols-outlined ml-2 text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
            <a routerLink="/login" class="flex items-center justify-center w-full bg-surface-container text-[#0F6E56] font-label font-bold text-[1.125rem] py-4 px-6 rounded-full transition-all active:scale-[0.98] hover:bg-surface-container-high border-2 border-transparent hover:border-[#0F6E56]/10">
              <span>Iniciar sesión</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  `
})
export class WelcomeComponent {}
