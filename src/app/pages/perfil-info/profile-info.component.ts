import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface font-body text-on-surface antialiased min-h-screen pb-32">
      <header class="bg-white font-headline font-semibold tracking-tight text-lg top-0 flex items-center justify-between px-6 py-4 w-full z-50 sticky shadow-sm">
        <a routerLink="/role" class="text-primary-container hover:bg-slate-50 transition-colors active:scale-95 duration-150 p-2 -ml-2 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <span class="text-primary-container font-bold">Paso 4 de 4</span>
        <div class="w-10"></div>
      </header>

      <main class="px-6 py-6 max-w-md mx-auto">
        <!-- Barra de progreso -->
        <div class="flex gap-2 mb-8">
          <div class="h-1.5 flex-1 bg-primary-container rounded-full"></div>
          <div class="h-1.5 flex-1 bg-primary-container rounded-full"></div>
          <div class="h-1.5 flex-1 bg-primary-container rounded-full"></div>
          <div class="h-1.5 flex-1 bg-primary-container rounded-full"></div>
        </div>

        <div class="mb-8">
          <h1 class="font-headline text-[24px] font-bold text-on-surface mb-2">Cuéntanos sobre ti</h1>
          <p class="font-body text-[14px] text-on-surface-variant">Esta información ayuda a generar confianza en la comunidad y encontrar los mejores kachuelos para ti.</p>
        </div>

        <!-- Foto -->
        <div class="flex flex-col items-center mb-8">
          <button class="w-[100px] h-[100px] rounded-full border-2 border-dashed border-primary-container bg-surface-container-low flex flex-col items-center justify-center mb-3 active:scale-95 duration-150 transition-transform">
            <span class="material-symbols-outlined text-primary-container text-3xl mb-1">photo_camera</span>
          </button>
          <span class="text-primary-container font-medium text-sm">Agregar foto (opcional)</span>
        </div>

        <form class="space-y-6" (ngSubmit)="guardarPerfil()">

          <!-- Nombre -->
          <div>
            <label class="block font-headline text-sm font-semibold text-on-surface mb-2" for="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              [(ngModel)]="nombre"
              placeholder="Ej: Juan Pérez Mamani"
              class="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-0 focus:border-b-2 focus:border-b-primary transition-all placeholder:text-outline-variant font-body outline-none"/>
          </div>

          <!-- Edad — mínimo 17 -->
          <div class="w-1/2 pr-3">
            <label class="block font-headline text-sm font-semibold text-on-surface mb-2" for="edad">Edad</label>
            <input
              id="edad"
              type="number"
              min="17"
              max="99"
              name="edad"
              placeholder="Ej: 22"
              [(ngModel)]="edad"
              (input)="validarEdad()"
              class="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-0 focus:border-b-2 transition-all placeholder:text-outline-variant font-body outline-none"
              [class]="edadInvalida() ? 'border-b-2 border-b-red-400 focus:border-b-red-400' : 'focus:border-b-primary'"/>
            @if (edadInvalida()) {
              <p class="text-red-500 text-xs mt-1 font-body">La edad mínima es 17 años.</p>
            }
          </div>

          <!-- Género -->
          <div>
            <label class="block font-headline text-sm font-semibold text-on-surface mb-3">Género (opcional)</label>
            <div class="flex flex-wrap gap-3">
              @for (g of generos; track g.valor) {
                <button
                  type="button"
                  (click)="seleccionarGenero(g.valor)"
                  class="px-5 py-2.5 rounded-full font-label text-sm transition-all active:scale-95"
                  [class]="generoSeleccionado() === g.valor
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'">
                  {{ g.etiqueta }}
                </button>
              }
            </div>
          </div>

          <!-- Zona -->
          <div>
            <label class="block font-headline text-sm font-semibold text-on-surface mb-2" for="zona">¿En qué zona vives?</label>
            <div class="relative">
              <select
                id="zona"
                [(ngModel)]="zonaSeleccionada"
                name="zona"
                class="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface appearance-none focus:ring-0 focus:border-b-2 focus:border-b-primary transition-all font-body pr-10 outline-none">
                <option value="" disabled>Selecciona tu zona</option>
                <option value="ayacucho-huamanga-centro">Distrito de Ayacucho (Huamanga)</option>
                <option value="carmen-alto">Carmen Alto</option>
                <option value="jesus-nazareno">Jesús Nazareno</option>
                <option value="san-juan-bautista">San Juan Bautista</option>
                <option value="andres-avelino-caceres">A.A. Cáceres</option>
                <option value="otra">✏️ Escribir mi zona manualmente</option>
              </select>
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>

            @if (zonaSeleccionada === 'otra') {
              <div class="mt-3 relative">
                <input
                  id="zona-manual"
                  type="text"
                  [(ngModel)]="zonaManual"
                  name="zonaManual"
                  placeholder="Ej: Huanta, Los Morochucos..."
                  autofocus
                  class="w-full bg-surface-container-low border-b-2 border-b-primary-container rounded-lg px-4 py-3 text-on-surface focus:ring-0 focus:border-b-primary transition-all placeholder:text-outline-variant font-body outline-none"/>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary-container text-lg pointer-events-none">edit_location</span>
              </div>
              <p class="text-xs text-on-surface-variant mt-1.5 font-body px-1">Escribe el nombre de tu distrito o barrio.</p>
            }

            <button class="mt-3 flex items-center text-primary-container font-medium text-sm gap-1 hover:opacity-80 transition-opacity" type="button">
              <span class="material-symbols-outlined text-lg">location_on</span>
              Usar mi ubicación actual
            </button>
          </div>
        </form>

        <!-- Aviso privacidad -->
        <div class="mt-8 bg-surface-container-low rounded-xl p-4 flex gap-3 items-start border border-outline-variant/15">
          <span class="material-symbols-outlined text-on-surface-variant shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">lock</span>
          <p class="font-body text-xs text-on-surface-variant leading-relaxed">
            Tus datos están protegidos. Solo compartiremos tu nombre de pila y foto (si agregaste una) con los empleadores una vez que apliques a un kachuelo.
          </p>
        </div>

        <!-- Error -->
        @if (error()) {
          <div class="mt-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span class="material-symbols-outlined text-red-500 text-[18px] flex-shrink-0">error</span>
            <p class="font-body text-sm text-red-600">{{ error() }}</p>
          </div>
        }

        <!-- Botón crear cuenta -->
        <div class="mt-6">
          <button
            type="button"
            (click)="guardarPerfil()"
            [disabled]="guardando()"
            class="w-full bg-secondary-container text-white font-headline font-bold text-base py-4 rounded-xl shadow-[0_4px_16px_rgba(255,87,34,0.2)] hover:bg-opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60">
            @if (guardando()) {
              <span class="material-symbols-outlined animate-spin">progress_activity</span>
              Guardando...
            } @else {
              Crear mi cuenta
              <span class="material-symbols-outlined">check_circle</span>
            }
          </button>
        </div>
      </main>
    </div>
  `
})
export class ProfileInfoComponent {
  private auth   = inject(Auth);
  private userService = inject(UserService);
  private router = inject(Router);

  nombre = '';
  edad: number | null = null;
  edadInvalida = signal(false);
  generoSeleccionado = signal('');
  zonaSeleccionada = '';
  zonaManual = '';
  guardando = signal(false);
  error = signal<string | null>(null);

  generos = [
    { valor: 'masculino', etiqueta: 'Masculino' },
    { valor: 'femenino',  etiqueta: 'Femenino' },
    { valor: 'no-decir',  etiqueta: 'Prefiero no decir' },
  ];

  validarEdad() {
    this.edadInvalida.set(this.edad !== null && this.edad < 17);
  }

  seleccionarGenero(valor: string) {
    this.generoSeleccionado.set(
      this.generoSeleccionado() === valor ? '' : valor
    );
  }

  async guardarPerfil() {
    this.error.set(null);

    if (!this.nombre.trim()) {
      this.error.set('El nombre completo es obligatorio.');
      return;
    }
    if (this.edadInvalida()) {
      this.error.set('Corrige la edad antes de continuar.');
      return;
    }
    const zonaFinal = this.zonaSeleccionada === 'otra'
      ? this.zonaManual.trim()
      : this.zonaSeleccionada;
    if (!zonaFinal) {
      this.error.set('Selecciona o escribe tu zona.');
      return;
    }

    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.error.set('No hay sesión activa. Vuelve a iniciar sesión.');
      return;
    }

    this.guardando.set(true);
    try {
      await this.userService.createProfile(uid, {
        nombre: this.nombre.trim(),
        edad:   this.edad ?? 0,
        genero: this.generoSeleccionado(),
        zona:   zonaFinal,
        rol:    'trabajador',
      });
      this.router.navigate(['/worker-type']);
    } catch {
      this.error.set('Error al guardar el perfil. Intenta de nuevo.');
    } finally {
      this.guardando.set(false);
    }
  }
}
