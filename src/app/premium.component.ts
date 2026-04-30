import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface-container-lowest min-h-screen flex flex-col font-body text-on-surface antialiased relative">
      <div class="relative bg-gradient-to-b from-primary-container via-primary-container/80 to-surface-container-lowest pt-16 pb-24 px-6 flex flex-col items-center text-center rounded-b-[40px]">
        <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-b-[40px]">
          <span class="material-symbols-outlined absolute top-10 left-8 text-on-primary-container/30 text-2xl rotate-12">auto_awesome</span>
          <span class="material-symbols-outlined absolute top-24 right-10 text-on-primary-container/30 text-3xl -rotate-12">flare</span>
          <span class="material-symbols-outlined absolute top-40 left-16 text-on-primary-container/20 text-xl rotate-45">star</span>
        </div>
        
        <a routerLink="/dashboard" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-20 cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </a>
        
        <div class="relative w-[140px] h-[140px] bg-surface-container-lowest rounded-full flex items-center justify-center shadow-xl shadow-primary-container/20 mb-8 z-10">
          <div class="absolute inset-0 bg-primary-fixed/20 rounded-full animate-pulse"></div>
          <span class="material-symbols-outlined text-[80px] text-primary-container relative z-10" style="font-variation-settings: 'FILL' 1;">redeem</span>
          <span class="material-symbols-outlined absolute -top-2 -right-2 text-secondary-container text-2xl">auto_awesome</span>
          <span class="material-symbols-outlined absolute bottom-4 -left-4 text-primary text-xl">star</span>
        </div>
        
        <div class="relative z-10 max-w-sm">
          <p class="font-label text-xs font-bold tracking-[0.15em] uppercase text-on-primary-container mb-3 opacity-90">NUESTRO REGALO PARA TI</p>
          <h1 class="font-display text-[32px] leading-tight font-extrabold text-white mb-4 tracking-tight">¡Tienes 1 mes gratis!</h1>
          <p class="font-body text-sm leading-relaxed text-on-primary-container/90 px-4">Disfruta todas las funciones del Plan Top sin pagar nada durante 30 días.</p>
        </div>
      </div>
      
      <div class="flex-1 px-6 pb-12 -mt-12 relative z-20 max-w-lg mx-auto w-full flex flex-col">
        <div class="bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-variant/50 mb-4">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface-container-high/50">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary-container text-xl" style="font-variation-settings: 'FILL' 1;">stars</span>
              <h2 class="font-headline text-sm font-bold text-on-surface tracking-tight">INCLUYE PLAN TOP COMPLETO</h2>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-outline font-medium uppercase tracking-wider">Valor regular</p>
              <p class="text-sm text-outline-variant line-through font-semibold">S/ 10/mes</p>
            </div>
          </div>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Aparece en destacados</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Prioridad máxima</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Contactos ilimitados</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Chat y reseñas</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Portfolio ilimitado</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary-container text-[20px] mt-0.5" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              <span class="font-body text-sm text-on-surface-variant font-medium">Estadísticas avanzadas</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-primary-fixed/20 rounded-[16px] p-4 flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
            <span class="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div>
            <p class="font-headline text-sm font-bold text-on-primary-fixed">Tu mes gratis empieza ahora</p>
            <p class="font-body text-xs text-on-primary-fixed-variant mt-0.5">Válido por los próximos 30 días.</p>
          </div>
        </div>
        
        <div class="text-center mb-6">
          <p class="font-body text-sm text-outline font-medium">Sin compromisos. No te cobraremos nada al finalizar.</p>
        </div>
        
        <div class="mt-auto space-y-4">
          <a routerLink="/dashboard" class="w-full h-[56px] flex items-center justify-center bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white rounded-xl font-headline text-base font-bold tracking-wide transition-all shadow-[0_4px_16px_rgba(253,117,73,0.2)] active:scale-[0.98]">
            Empezar a usar mi mes gratis
          </a>
          <button class="w-full h-12 flex items-center justify-center text-primary-container font-headline text-sm font-bold hover:underline transition-all">
            Ver detalles del plan completo
          </button>
        </div>
        
        <div class="mt-8 text-center px-4">
          <p class="font-body text-[11px] leading-tight text-outline">
            Al activar tu mes gratis, aceptas nuestros 
            <a class="text-primary-container underline underline-offset-2" href="#">Términos y Condiciones</a> y 
            <a class="text-primary-container underline underline-offset-2" href="#">Políticas de Privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  `
})
export class PremiumComponent implements OnInit {
  private router = inject(Router);

  private readonly KEY = 'kachuelos_premium_visto';

  ngOnInit() {
    // Si ya vio esta pantalla antes, ir directo al dashboard
    if (localStorage.getItem(this.KEY) === 'true') {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      return;
    }
    // Marcarla como vista para que no vuelva a aparecer
    localStorage.setItem(this.KEY, 'true');
  }
}
