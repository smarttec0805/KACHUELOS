import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
import { KachuelosService, Kachuelo } from '../../core/services/kachuelos.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gradient-to-b from-primary-fixed to-surface-bright min-h-screen text-on-surface antialiased overflow-x-hidden">
      <div class="w-full flex justify-between items-center px-6 pt-6 absolute top-0 z-10">
        <a routerLink="/work-details"
           class="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md text-primary-container hover:bg-white/80 transition-colors active:scale-90">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <a routerLink="/premium" class="text-primary-container font-medium text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer">
          Omitir
        </a>
      </div>

      <main class="w-full max-w-md mx-auto min-h-screen flex flex-col items-center pt-20 pb-28 px-6 relative z-0">

        <!-- Avatar -->
        <div class="w-full flex justify-center mb-8 relative">
          <div class="absolute top-0 left-4 w-3 h-3 bg-secondary rounded-sm rotate-45 opacity-70"></div>
          <div class="absolute top-10 left-12 w-2 h-2 bg-primary rounded-full opacity-60"></div>
          <div class="absolute top-4 right-8 w-4 h-4 bg-tertiary-container rounded-md rotate-12 opacity-80"></div>
          <div class="absolute top-16 right-14 w-2 h-2 bg-secondary-container rounded-full opacity-50"></div>

          @if (perfil()?.fotoUrl) {
            <img
              [src]="perfil()!.fotoUrl"
              [alt]="perfil()!.nombre"
              class="w-48 h-48 object-cover rounded-full border-4 border-surface-container-lowest shadow-lg shadow-primary-fixed-dim/30"/>
          } @else {
            <div class="w-48 h-48 rounded-full border-4 border-surface-container-lowest shadow-lg bg-[#0F6E56] flex items-center justify-center">
              <span class="text-white font-headline font-bold text-6xl">
                {{ perfil()?.nombre?.charAt(0)?.toUpperCase() ?? '?' }}
              </span>
            </div>
          }

          <div class="absolute bottom-2 right-16 bg-surface-container-lowest p-2 rounded-full shadow-md">
            <span class="material-symbols-outlined text-[#D85A30] text-3xl" style="font-variation-settings: 'FILL' 1;">stars</span>
          </div>
        </div>

        <!-- Bienvenida -->
        <div class="text-center mb-8">
          <h1 class="font-headline text-[28px] font-bold text-on-surface mb-3 leading-tight tracking-tight">
            ¡Bienvenido a Kachuelos!
          </h1>
          <p class="font-body text-[16px] text-on-surface-variant leading-relaxed max-w-xs mx-auto">
            Tu perfil está listo,
            <span class="font-semibold text-on-surface">
              {{ perfil()?.nombre?.split(' ')?.[0] ?? 'Usuario' }}
            </span>.
            Ya puedes empezar a recibir clientes en tu zona.
          </p>
        </div>

        <!-- Tarjeta de perfil -->
        <div class="w-full bg-surface-container-lowest rounded-[1.5rem] p-6 shadow-sm shadow-primary-fixed-dim/20 border border-primary-fixed-dim/40 mb-8 relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed rounded-full blur-2xl opacity-30"></div>
          <div class="flex items-center gap-4 mb-5 relative z-10">
            <div class="w-14 h-14 bg-[#0F6E56] text-white rounded-full flex items-center justify-center font-headline font-bold text-xl flex-shrink-0">
              {{ perfil()?.nombre?.charAt(0)?.toUpperCase() ?? '?' }}
            </div>
            <div>
              <h2 class="font-headline font-bold text-lg text-on-surface">
                {{ perfil()?.nombre ?? 'Cargando...' }}
              </h2>
              <p class="font-body text-sm text-[#0F6E56] flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                {{ perfil()?.tipoTrabajador ?? perfil()?.rol ?? 'Kachuelero' }}
              </p>
            </div>
          </div>
          <div class="h-px w-full bg-outline-variant/30 mb-5"></div>

          @if (perfil()?.servicios && perfil()!.servicios!.length > 0) {
            <div class="flex flex-wrap gap-2 mb-5">
              @for (s of perfil()!.servicios!.slice(0, 4); track s) {
                <span class="px-3 py-1.5 bg-primary-fixed-dim/30 text-on-primary-fixed-variant font-medium text-xs rounded-lg border border-primary-fixed-dim/50 capitalize">{{ s }}</span>
              }
            </div>
          }

          <div class="flex items-center gap-2 text-on-surface-variant font-body text-sm bg-surface-container-low p-3 rounded-xl">
            <span class="material-symbols-outlined text-[#D85A30]" style="font-variation-settings: 'FILL' 1;">location_on</span>
            <span>{{ perfil()?.zona ?? 'Sin zona definida' }}</span>
          </div>
        </div>

        <!-- Kachuelos en tu zona -->
        <div class="w-full mb-8">
          <h3 class="font-headline font-bold text-lg text-on-surface mb-1 px-2">Kachuelos en tu zona</h3>
          @if (perfil()?.zona) {
            <p class="font-body text-xs text-on-surface-variant px-2 mb-4">{{ perfil()!.zona }}</p>
          }

          @if (kachuelos().length === 0) {
            <div class="bg-surface-container-lowest rounded-2xl p-6 text-center border border-outline-variant/15 shadow-sm">
              <span class="material-symbols-outlined text-3xl text-on-surface-variant block mb-2">work_history</span>
              <p class="font-body text-sm text-on-surface-variant">Aún no hay kachuelos publicados en tu zona.</p>
              <p class="font-body text-xs text-outline mt-1">¡Sé el primero en publicar uno!</p>
            </div>
          } @else {
            <div class="flex flex-col gap-3">
              @for (k of kachuelos(); track k.id) {
                <div class="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 shadow-sm hover:bg-surface-container-low transition-colors">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-headline font-semibold text-sm text-on-surface flex-1 pr-3">{{ k.titulo }}</h4>
                    <span class="text-[#0F6E56] font-bold text-sm shrink-0">S/ {{ k.precio }}</span>
                  </div>
                  <p class="font-body text-xs text-on-surface-variant mb-3 line-clamp-2">{{ k.descripcion }}</p>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2 py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant text-[10px] font-semibold rounded-full">{{ k.categoria }}</span>
                    <span class="flex items-center gap-1 text-[10px] text-outline font-medium ml-auto">
                      <span class="material-symbols-outlined text-[14px]">location_on</span>{{ k.zona }}
                    </span>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Primeros pasos -->
        <div class="w-full mb-10">
          <h3 class="font-headline font-bold text-lg text-on-surface mb-4 px-2">Primeros pasos</h3>
          <div class="grid grid-cols-1 gap-3">
            <div class="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-[#D85A30]">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">photo_camera</span>
              </div>
              <div class="flex-grow">
                <h4 class="font-headline font-semibold text-sm text-on-surface">Agrega fotos de tu trabajo</h4>
                <p class="font-body text-xs text-on-surface-variant mt-1">Aumenta tus contrataciones 3x</p>
              </div>
              <span class="material-symbols-outlined text-outline">chevron_right</span>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              <div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 text-[#0F6E56]">
                <span class="material-symbols-outlined">share</span>
              </div>
              <div class="flex-grow">
                <h4 class="font-headline font-semibold text-sm text-on-surface">Comparte tu perfil</h4>
                <p class="font-body text-xs text-on-surface-variant mt-1">Invita a tus clientes actuales</p>
              </div>
              <span class="material-symbols-outlined text-outline">chevron_right</span>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              <div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0 text-tertiary">
                <span class="material-symbols-outlined">explore</span>
              </div>
              <div class="flex-grow">
                <h4 class="font-headline font-semibold text-sm text-on-surface">Explora Kachuelos</h4>
                <p class="font-body text-xs text-on-surface-variant mt-1">Descubre cómo funciona la app</p>
              </div>
              <span class="material-symbols-outlined text-outline">chevron_right</span>
            </div>
          </div>
        </div>

        <div class="w-full mt-auto flex flex-col gap-4">
          <a routerLink="/premium" class="w-full bg-[#D85A30] text-white font-headline font-bold text-lg py-4 rounded-2xl shadow-[0_8px_16px_rgba(216,90,48,0.15)] hover:shadow-[0_4px_12px_rgba(216,90,48,0.2)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 cursor-pointer">
            Empezar a usar Kachuelos
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
          <button class="w-full text-center text-on-surface-variant font-medium text-sm py-3 hover:text-on-surface transition-colors">
            Completar perfil más tarde
          </button>
        </div>
      </main>

      <!-- Barra de navegación inferior -->
      <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant/20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div class="max-w-md mx-auto flex items-center justify-around px-2 h-16 pb-safe">
          @for (tab of tabs; track tab.id) {
            <button
              type="button"
              (click)="tabActiva.set(tab.id)"
              class="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all active:scale-90">
              <div class="relative flex items-center justify-center">
                @if (tabActiva() === tab.id) {
                  <div class="absolute -inset-2 bg-[#DFE8FF] rounded-full"></div>
                }
                <span
                  class="material-symbols-outlined text-[22px] relative z-10 transition-all"
                  [style]="tabActiva() === tab.id ? 'font-variation-settings: FILL 1' : ''"
                  [class]="tabActiva() === tab.id ? 'text-[#1a3766]' : 'text-on-surface-variant'">
                  {{ tab.icono }}
                </span>
              </div>
              <span
                class="text-[10px] font-headline font-medium transition-colors"
                [class]="tabActiva() === tab.id ? 'text-[#1a3766] font-bold' : 'text-on-surface-variant'">
                {{ tab.nombre }}
              </span>
            </button>
          }
        </div>
      </nav>
    </div>
  `
})
export class DashboardComponent {
  private auth            = inject(Auth);
  private userService     = inject(UserService);
  private kachuelosService = inject(KachuelosService);

  private currentUser$ = user(this.auth);

  perfil = toSignal(
    this.currentUser$.pipe(
      switchMap(u => u ? this.userService.getProfile(u.uid) : of(undefined))
    )
  );

  kachuelos = toSignal(
    this.currentUser$.pipe(
      switchMap(u => u ? this.userService.getProfile(u.uid) : of(undefined)),
      switchMap(p => p?.zona ? this.kachuelosService.getPorZona(p.zona) : of([] as Kachuelo[]))
    ),
    { initialValue: [] as Kachuelo[] }
  );

  tabs = [
    { id: 'inicio',   nombre: 'Inicio',     icono: 'home' },
    { id: 'explorar', nombre: 'Explorar',   icono: 'search' },
    { id: 'tareas',   nombre: 'Mis Tareas', icono: 'work' },
    { id: 'mensajes', nombre: 'Mensajes',   icono: 'chat' },
    { id: 'perfil',   nombre: 'Perfil',     icono: 'person' },
  ];

  tabActiva = signal('inicio');
}
