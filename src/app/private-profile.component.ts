import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-private-profile',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-on-background min-h-screen pb-32 bg-[#F5F5F5]">
      <header class="bg-[#F7F9FF]/85 backdrop-blur-sm text-[#1905da] font-['Plus_Jakarta_Sans'] font-bold text-xl tracking-tight docked full-width top-0 sticky z-50 flex justify-between items-center px-6 py-4 w-full">
        <span class="font-extrabold">Mi Perfil</span>
        <button class="hover:bg-[#DFE3E8]/20 transition-colors p-2 rounded-full active:scale-95 duration-150">
          <span class="material-symbols-outlined text-2xl">settings</span>
        </button>
      </header>
      
      <main class="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
          <div class="relative mb-4">
            <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img alt="Juan Pérez Mamani" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ZSfZ_TMn18zbX64sUPnWHw3m76zGzLIfcamDEfaR7L0BxqOuxObkGJzjCxcALpkMga0racy6vjvPR6DSEE89ZVKLZs_6tuwkyU4jCs2dOg0KQbu97kjjVNo7l3zWRZlzOLYwWqjWKEuHQ_Zi-OCycz_P6Fs-CgIqPJKLpnxS_GR0oCfxShxtGm8mSY-FzIL4qbt8KtS3KX3tljCsTC7dfdbermwkXZ9bAHl5ePvKMiYXnfT6mzBPXVUa4Uc0ne8n-NbY5-02"/>
            </div>
            <button class="absolute bottom-0 right-0 bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-white border-2 border-surface-container-lowest">
              <span class="material-symbols-outlined text-lg">photo_camera</span>
            </button>
          </div>
          <h1 class="font-headline font-bold text-xl text-on-surface">Juan Pérez Mamani</h1>
          <div class="inline-flex items-center bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-semibold mt-2">
            <span class="material-symbols-outlined text-sm mr-1">build</span>
            Profesional de oficio
          </div>
          <p class="text-on-surface-variant text-sm mt-3 flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">location_on</span>
            Ayacucho, Carmen Alto
          </p>
          <div class="flex items-center mt-2 text-sm">
            <span class="material-symbols-outlined text-secondary mr-1" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="font-bold text-on-surface">4.8</span>
            <span class="text-on-surface-variant ml-1">(47 reseñas)</span>
          </div>
          <button class="mt-6 w-full py-3 px-4 bg-primary-fixed-dim text-on-primary-fixed-variant rounded-xl font-bold transition-all hover:bg-primary-fixed active:scale-[0.98]">
            Editar mi perfil
          </button>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h2 class="font-headline font-bold text-lg mb-4">Mi actividad</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-2xl font-extrabold text-primary">47</p>
              <p class="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mt-1">Trabajos</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-extrabold text-secondary flex items-center justify-center">
                <span class="material-symbols-outlined mr-1 text-xl" style="font-variation-settings: 'FILL' 1;">star</span>
                4.8
              </p>
              <p class="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mt-1">Calificación</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-extrabold text-on-surface">S/ 2,300</p>
              <p class="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium mt-1">Ganado</p>
            </div>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-headline font-bold text-lg">Mi rol</h2>
          </div>
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 bg-surface-container flex items-center justify-center rounded-xl text-primary">
              <span class="material-symbols-outlined text-3xl">construction</span>
            </div>
            <div>
              <h3 class="font-bold text-on-surface">Kachuelero</h3>
              <p class="text-sm text-on-surface-variant">Profesional de oficio</p>
            </div>
          </div>
          <div class="flex items-center justify-between py-3 border-t border-surface-variant/30">
            <span class="font-medium text-sm">Disponible para nuevos kachuelos</span>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
            </button>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h2 class="font-headline font-bold text-lg mb-4">Servicios</h2>
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="bg-primary-fixed-dim text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-sm font-medium">Gasfitería</span>
            <span class="bg-primary-fixed-dim text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-sm font-medium">Electricidad</span>
            <span class="bg-primary-fixed-dim text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-sm font-medium">Mecánica</span>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Experiencia</span>
              <span class="font-semibold text-on-surface">8 años</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Precio desde</span>
              <span class="font-semibold text-on-surface">S/ 25/h</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Disponibilidad</span>
              <span class="font-semibold text-on-surface">Lun - Sáb</span>
            </div>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-headline font-bold text-lg">Portfolio</h2>
            <button class="text-primary text-sm font-bold">Ver todo</button>
          </div>
          <div class="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
            <div class="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-surface-container">
              <img alt="Trabajo 1" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd3Is1VNkyxw22B2O77bt0cscd2oCaONeCFS8VUt28bf2QBN8YX8oNxtoOdHCq2MlT3V8EVA5Ak3Eqp4rMYzMet7ojl2AR4Y3U4nNtZ8aKlVD28y4YJylXGO0EB_OSGV-uzeyG3omTe5U7DSR4Op26fy41Kr1TRQB9I5OnkxbSyvJFf4jD-HcdfJPkqKzbTos3pSYvGYoWeriHjEppUmob0gH7jmJF-j7DN2TG59mCwJ0Bn4478w8R3wcYmoh6ENDj3GGjJ9Gk"/>
            </div>
            <div class="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-surface-container">
              <img alt="Trabajo 2" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq-VguuDFVBZGgrqRPbgkf-ny9Bb97S1_7w_xjnAlBDpoSvQoFeuC4tn4jVjWtFcwB75efdXK4TTtfD6f25s585SUg74letHREq0n02i49QypxLrX9pua8kE8WnVti6D_kW_4ePvyRwHWJAXuirx_ePQaTjntzALDU9BTdVILa421l-bL-EayD71safxuKpheki1gQupkQgeo8R2v1M68Bdrft76UhycmkV889nX1WzVU5X-XxQfIUvDZJlBuvP-74ZCaXHCHR"/>
            </div>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h2 class="font-headline font-bold text-lg mb-4">Métodos de pago aceptados</h2>
          <div class="flex flex-wrap gap-2">
            <div class="flex items-center space-x-2 bg-secondary/10 border border-secondary text-on-secondary-container px-3 py-2 rounded-xl">
              <span class="material-symbols-outlined text-lg">payments</span>
              <span class="text-xs font-bold">Efectivo</span>
            </div>
            <div class="flex items-center space-x-2 bg-secondary/10 border border-secondary text-on-secondary-container px-3 py-2 rounded-xl">
              <span class="material-symbols-outlined text-lg">smartphone</span>
              <span class="text-xs font-bold">Yape</span>
            </div>
            <div class="flex items-center space-x-2 bg-secondary/10 border border-secondary text-on-secondary-container px-3 py-2 rounded-xl">
              <span class="material-symbols-outlined text-lg">smartphone</span>
              <span class="text-xs font-bold">Plin</span>
            </div>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h2 class="font-headline font-bold text-lg mb-4">Verificaciones</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-emerald-500">verified_user</span>
                <span class="text-sm font-medium">Celular verificado</span>
              </div>
              <span class="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-emerald-500">badge</span>
                <span class="text-sm font-medium">DNI verificado</span>
              </div>
              <span class="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-amber-500" style="font-variation-settings: 'FILL' 1;">stars</span>
                <span class="text-sm font-medium">Top kachuelero</span>
              </div>
              <span class="bg-amber-500/10 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded">EXCELENTE</span>
            </div>
          </div>
        </section>

        <section class="bg-[#F0E6FF] rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div class="w-12 h-12 bg-white flex items-center justify-center rounded-full text-[#78352b]">
            <span class="material-symbols-outlined text-2xl">card_giftcard</span>
          </div>
          <div class="flex-1">
            <h2 class="font-headline font-bold text-[#3b0804]">Invita amigos</h2>
            <p class="text-[#743329] text-xs mt-1">Gana beneficios por cada referido.</p>
          </div>
          <button class="bg-[#1905da] text-white px-4 py-2 rounded-xl text-xs font-bold">
            Compartir
          </button>
        </section>

        <section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8">
          <div class="p-2">
            <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span class="font-medium text-sm">Notificaciones</span>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-on-surface-variant">language</span>
                <span class="font-medium text-sm">Idioma</span>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-on-surface-variant">security</span>
                <span class="font-medium text-sm">Privacidad</span>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-on-surface-variant">help_outline</span>
                <span class="font-medium text-sm">Ayuda y soporte</span>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
          </div>
        </section>

        <a routerLink="/" class="w-full mt-4 flex items-center justify-center space-x-2 py-4 bg-white border-2 border-error text-error rounded-xl font-bold transition-all hover:bg-error-container/20 active:scale-95 cursor-pointer">
          <span class="material-symbols-outlined">logout</span>
          <span>Cerrar sesión</span>
        </a>
      </main>

      <nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#F7F9FF]/85 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 rounded-t-2xl border-none">
        <a routerLink="/" class="flex flex-col items-center justify-center text-[#5c6bc0] opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span class="material-symbols-outlined text-2xl">home</span>
          <span class="font-['Inter'] font-medium text-[10px] mt-1">Inicio</span>
        </a>
        <a class="flex flex-col items-center justify-center text-[#5c6bc0] opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span class="material-symbols-outlined text-2xl">search</span>
          <span class="font-['Inter'] font-medium text-[10px] mt-1">Buscar</span>
        </a>
        <a class="flex flex-col items-center justify-center text-[#5c6bc0] opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span class="material-symbols-outlined text-2xl">work</span>
          <span class="font-['Inter'] font-medium text-[10px] mt-1">Mis kachuelos</span>
        </a>
        <div class="flex flex-col items-center justify-center text-[#D85A30] bg-[#D85A30]/10 rounded-xl px-3 py-1 scale-110 active:duration-200">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">person</span>
          <span class="font-['Inter'] font-medium text-[10px] mt-0.5">Perfil</span>
        </div>
      </nav>
    </div>
  `
})
export class PrivateProfileComponent {}
