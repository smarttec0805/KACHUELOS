import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type WorkerType = 'profesional' | 'estudiante' | 'ambos';

@Component({
  selector: 'app-worker-type',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface text-on-surface min-h-screen relative pb-28">
      <header class="bg-[#F7F9FF] fixed top-0 w-full z-50 flex items-center justify-between px-4 h-16 shadow-sm">
        <a routerLink="/profile-info" class="text-primary active:scale-95 transition-transform p-2 -ml-2">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <h1 class="font-headline font-semibold text-lg text-on-surface-variant flex-1 text-center">Completa tu perfil</h1>
        <button class="text-primary font-headline font-semibold text-sm hover:opacity-80 transition-opacity p-2 -mr-2">Omitir</button>
      </header>

      <main class="pt-24 px-6 max-w-md mx-auto">
        <section class="mb-8">
          <h2 class="font-headline text-3xl font-bold text-on-surface mb-3 leading-tight tracking-tight text-center">
            ¿Qué tipo de kachuelero eres?
          </h2>
          <p class="font-body text-sm text-on-surface-variant text-center leading-relaxed px-2">
            Cuéntanos cómo ganarás dinero con Kachuelos. Puedes agregar más opciones después desde tu perfil.
          </p>
        </section>

        <section class="flex flex-col gap-4 mb-8">

          <!-- Opción 1: Profesional de oficio -->
          <button
            type="button"
            (click)="seleccionar('profesional')"
            class="w-full text-left rounded-2xl p-5 flex items-start gap-4 transition-all relative overflow-hidden active:scale-[0.98]"
            [class]="seleccionado() === 'profesional'
              ? 'ring-2 ring-primary bg-primary/5 border-transparent'
              : 'bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low'">

            <div class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="seleccionado() === 'profesional'
                   ? 'bg-primary text-on-primary'
                   : 'bg-primary-container text-on-primary-container'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">build</span>
            </div>

            <div class="flex-1">
              <h3 class="font-headline font-bold text-lg text-on-surface mb-1">Profesional de oficio</h3>
              <p class="font-body text-sm text-on-surface-variant leading-snug">
                Ofrezco servicios técnicos como gasfitería, electricidad, pintura, limpieza profunda, entre otros oficios especializados.
              </p>
            </div>

            <div class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all"
                 [class]="seleccionado() === 'profesional'
                   ? 'border-primary bg-primary'
                   : 'border-outline-variant bg-transparent'">
              @if (seleccionado() === 'profesional') {
                <span class="material-symbols-outlined text-white text-sm" style="font-size:14px;font-variation-settings:'FILL' 1;">check</span>
              }
            </div>
          </button>

          <!-- Opción 2: Estudiante -->
          <button
            type="button"
            (click)="seleccionar('estudiante')"
            class="w-full text-left rounded-2xl p-5 flex items-start gap-4 transition-all relative overflow-hidden active:scale-[0.98]"
            [class]="seleccionado() === 'estudiante'
              ? 'ring-2 ring-tertiary bg-tertiary/5 border-transparent'
              : 'bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low'">

            <div class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="seleccionado() === 'estudiante'
                   ? 'bg-tertiary text-on-tertiary'
                   : 'bg-tertiary-container text-on-tertiary-container'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">menu_book</span>
            </div>

            <div class="flex-1">
              <h3 class="font-headline font-bold text-lg text-on-surface mb-1">Estudiante</h3>
              <p class="font-body text-sm text-on-surface-variant leading-snug">
                Estoy en la universidad o academia y busco trabajos flexibles como mudanzas, pasear perros o tutorías para generar ingresos extra.
              </p>
            </div>

            <div class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all"
                 [class]="seleccionado() === 'estudiante'
                   ? 'border-tertiary bg-tertiary'
                   : 'border-outline-variant bg-transparent'">
              @if (seleccionado() === 'estudiante') {
                <span class="material-symbols-outlined text-white text-sm" style="font-size:14px;font-variation-settings:'FILL' 1;">check</span>
              }
            </div>
          </button>

          <!-- Opción 3: Profesional y estudiante -->
          <button
            type="button"
            (click)="seleccionar('ambos')"
            class="w-full text-left rounded-2xl p-5 flex items-start gap-4 transition-all relative overflow-hidden active:scale-[0.98]"
            [class]="seleccionado() === 'ambos'
              ? 'ring-2 ring-secondary-container bg-secondary/5 border-transparent'
              : 'bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low'">

            <div class="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                 [class]="seleccionado() === 'ambos'
                   ? 'bg-secondary-container text-on-secondary-container'
                   : 'bg-secondary-container text-on-secondary-container'">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">sync</span>
            </div>

            <div class="flex-1">
              <h3 class="font-headline font-bold text-lg text-on-surface mb-1">Profesional y estudiante</h3>
              <p class="font-body text-sm text-on-surface-variant leading-snug">
                Combino mis estudios con mis habilidades técnicas u oficios para maximizar mis oportunidades dentro de la plataforma.
              </p>
            </div>

            <div class="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all"
                 [class]="seleccionado() === 'ambos'
                   ? 'border-secondary-container bg-secondary-container'
                   : 'border-outline-variant bg-transparent'">
              @if (seleccionado() === 'ambos') {
                <span class="material-symbols-outlined text-white text-sm" style="font-size:14px;font-variation-settings:'FILL' 1;">check</span>
              }
            </div>
          </button>

        </section>

        <!-- Aviso -->
        <div class="bg-surface-container rounded-xl p-4 flex items-start gap-3 mt-4">
          <span class="material-symbols-outlined text-secondary mt-0.5" style="font-variation-settings: 'FILL' 1;">favorite</span>
          <p class="font-body text-sm text-on-surface-variant leading-snug">
            Todos los kachueleros son bienvenidos. No necesitas certificados ni carnets para empezar a conectar con clientes.
          </p>
        </div>
      </main>

      <!-- Botón continuar -->
      <div class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-surface to-transparent pt-12 z-40">
        <a routerLink="/services"
           class="flex items-center justify-center w-full font-headline font-bold text-lg py-4 px-6 rounded-xl shadow-[0_8px_16px_rgba(168,56,15,0.15)] active:scale-95 transition-all"
           [class]="seleccionado()
             ? 'bg-secondary text-on-secondary hover:brightness-110'
             : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'">
          Continuar
        </a>
      </div>
    </div>
  `
})
export class WorkerTypeComponent {
  seleccionado = signal<WorkerType | null>(null);

  seleccionar(tipo: WorkerType) {
    this.seleccionado.set(
      this.seleccionado() === tipo ? null : tipo
    );
  }
}
