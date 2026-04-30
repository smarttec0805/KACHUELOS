import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

type PrecioTipo = 'hora' | 'dia' | 'trabajo' | 'convenir';
type Turno = 'manana' | 'tarde' | 'noche';
type Cobertura = 'zona' | 'ciudad' | 'alrededores';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gradient-to-b from-emerald-50/50 to-surface text-on-surface font-body pb-28">

      <!-- Header -->
      <header class="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-emerald-50/80 backdrop-blur-sm">
        <a routerLink="/services" class="text-[#0F6E56] p-2 -ml-2 rounded-full hover:bg-[#0F6E56]/10 transition-colors">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <h1 class="text-[#0F6E56] font-headline font-bold text-lg text-center flex-1">Último paso</h1>
        <button class="text-slate-500 font-headline font-semibold text-sm hover:bg-[#0F6E56]/10 px-3 py-2 rounded-full transition-colors">Omitir</button>
      </header>

      <main class="px-5 pt-4 max-w-lg mx-auto space-y-6">

        <section>
          <h2 class="font-headline text-[24px] font-bold text-on-surface mb-1 tracking-tight leading-tight">Cuéntanos cómo trabajas</h2>
          <p class="font-body text-[14px] text-on-surface-variant leading-relaxed">Esta información ayuda a que los clientes te encuentren y sepan exactamente qué ofreces.</p>
        </section>

        <!-- ① EXPERIENCIA -->
        <section class="bg-white rounded-2xl p-5 border border-outline-variant/15 shadow-sm">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-8 h-8 rounded-full bg-[#0F6E56] text-white flex items-center justify-center font-bold text-sm">1</div>
            <h3 class="font-headline font-bold text-lg text-[#0F6E56]">¿Cuánta experiencia tienes?</h3>
          </div>

          <div class="flex flex-wrap gap-2 mb-5">
            @for (op of opcionesExperiencia; track op.valor) {
              <button
                type="button"
                (click)="experiencia.set(op.valor)"
                class="px-4 py-2 rounded-full text-sm font-headline font-medium transition-all active:scale-95"
                [class]="experiencia() === op.valor
                  ? 'bg-[#0F6E56] text-white font-bold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'">
                {{ op.etiqueta }}
              </button>
            }
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-on-surface-variant">Describe brevemente tu experiencia (opcional)</label>
            <textarea
              [(ngModel)]="descripcion"
              name="descripcion"
              maxlength="300"
              placeholder="Ej. Llevo 3 años trabajando como gasfitero en zonas residenciales..."
              class="w-full bg-surface-container-low border-transparent focus:border-[#0F6E56] focus:ring-0 rounded-xl p-3 text-sm resize-none h-24 placeholder:text-on-surface-variant/50 transition-colors outline-none border-b-2">
            </textarea>
            <div class="text-right text-xs text-on-surface-variant">{{ descripcion.length }}/300</div>
          </div>
        </section>

        <!-- ② PRECIO -->
        <section class="bg-white rounded-2xl p-5 border border-outline-variant/15 shadow-sm">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-8 h-8 rounded-full bg-[#0F6E56] text-white flex items-center justify-center font-bold text-sm">2</div>
            <h3 class="font-headline font-bold text-lg text-[#0F6E56]">¿Cuánto cobras?</h3>
          </div>

          <div class="space-y-3">
            @for (op of opcionesPrecio; track op.valor) {
              <button
                type="button"
                (click)="precioTipo.set(op.valor)"
                class="w-full p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98]"
                [class]="precioTipo() === op.valor
                  ? 'border-[#0F6E56]/40 bg-[#0F6E56]/5'
                  : 'border-outline-variant/20 hover:bg-surface-container-low'">
                <div class="flex items-center gap-3">
                  <!-- Radio circle -->
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                       [class]="precioTipo() === op.valor ? 'border-[#0F6E56] bg-[#0F6E56]' : 'border-outline-variant'">
                    @if (precioTipo() === op.valor) {
                      <div class="w-2 h-2 rounded-full bg-white"></div>
                    }
                  </div>
                  <span class="font-headline font-semibold"
                        [class]="precioTipo() === op.valor ? 'text-[#0F6E56]' : 'text-on-surface-variant'">
                    {{ op.etiqueta }}
                  </span>
                </div>

                <!-- Campo monto (solo si está seleccionado y tiene monto) -->
                @if (precioTipo() === op.valor && op.conMonto) {
                  <div class="mt-3 ml-8 flex items-center gap-3">
                    <span class="text-[#0F6E56] font-medium">S/</span>
                    <input
                      [(ngModel)]="monto"
                      name="monto"
                      type="number"
                      min="0"
                      class="w-20 bg-white border border-[#0F6E56]/20 focus:border-[#0F6E56] focus:ring-1 focus:ring-[#0F6E56] rounded-lg px-3 py-2 text-center font-bold text-[#0F6E56] outline-none"/>
                    <span class="text-on-surface-variant text-sm">/ {{ op.unidad }}</span>
                  </div>
                  <p class="ml-8 mt-2 text-xs text-on-surface-variant/80 italic">El promedio en Ayacucho es S/ 20 - 35</p>
                }
              </button>
            }
          </div>
        </section>

        <!-- ③ DISPONIBILIDAD -->
        <section class="bg-white rounded-2xl p-5 border border-outline-variant/15 shadow-sm">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-8 h-8 rounded-full bg-[#0F6E56] text-white flex items-center justify-center font-bold text-sm">3</div>
            <h3 class="font-headline font-bold text-lg text-[#0F6E56]">¿Cuándo estás disponible?</h3>
          </div>

          <!-- Días de la semana -->
          <div class="mb-5">
            <div class="flex justify-between mb-3">
              <button type="button" (click)="seleccionarTodosDias()"
                class="text-sm font-headline font-bold transition-colors"
                [class]="todosDiasSeleccionados() ? 'text-[#0F6E56]' : 'text-on-surface-variant hover:text-on-surface'">
                Todos los días
              </button>
              <button type="button" (click)="seleccionarFinDeSemana()"
                class="text-sm font-headline transition-colors"
                [class]="soloFinSemana() ? 'text-[#0F6E56] font-bold' : 'text-on-surface-variant hover:text-on-surface'">
                Solo fines de semana
              </button>
            </div>

            <div class="flex justify-between gap-1">
              @for (dia of dias; track dia.id) {
                <button
                  type="button"
                  (click)="toggleDia(dia.id)"
                  class="w-10 h-10 rounded-full font-bold font-headline text-sm flex items-center justify-center transition-all active:scale-90 shadow-sm"
                  [class]="diasSeleccionados().includes(dia.id)
                    ? 'bg-[#0F6E56] text-white'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'">
                  {{ dia.letra }}
                </button>
              }
            </div>
          </div>

          <!-- Turnos -->
          <div class="grid grid-cols-3 gap-3 mb-5">
            @for (t of turnos; track t.valor) {
              <button
                type="button"
                (click)="toggleTurno(t.valor)"
                class="rounded-xl p-3 flex flex-col items-center text-center transition-all active:scale-95 border-2"
                [class]="turnosSeleccionados().includes(t.valor)
                  ? 'bg-[#0F6E56]/10 border-[#0F6E56]/30 text-[#0F6E56]'
                  : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container-high'">
                <span class="material-symbols-outlined mb-1">{{ t.icono }}</span>
                <span class="text-sm font-bold font-headline">{{ t.nombre }}</span>
                <span class="text-[10px] font-medium">{{ t.horario }}</span>
              </button>
            }
          </div>

          <!-- Toggle disponible ahora -->
          <div class="flex items-center justify-between p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl mb-5">
            <div>
              <h4 class="font-bold font-headline text-sm text-[#0F6E56]">¿Estás disponible ahora mismo?</h4>
              <p class="text-xs text-[#0F6E56]/70 mt-1">Aparecerás como "Disponible ahora" para urgencias</p>
            </div>
            <button
              type="button"
              (click)="disponibleAhora.set(!disponibleAhora())"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0"
              [class]="disponibleAhora() ? 'bg-[#D85A30]' : 'bg-surface-container-highest'">
              <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                    [class]="disponibleAhora() ? 'translate-x-5' : 'translate-x-0.5'">
              </span>
            </button>
          </div>

          <!-- Cobertura -->
          <div>
            <label class="block text-sm font-medium text-on-surface-variant mb-3">Zona de cobertura</label>
            <div class="flex flex-wrap gap-2">
              @for (op of opcionesCobertura; track op.valor) {
                <button
                  type="button"
                  (click)="cobertura.set(op.valor)"
                  class="px-4 py-2 rounded-full text-sm font-headline font-medium transition-all active:scale-95"
                  [class]="cobertura() === op.valor
                    ? 'bg-[#0F6E56] text-white font-bold shadow-sm'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'">
                  {{ op.etiqueta }}
                </button>
              }
            </div>
          </div>
        </section>

        <!-- Banner finalizar -->
        <section class="p-4 bg-orange-50 rounded-2xl flex items-start gap-4 border border-orange-100 mb-4">
          <div class="w-10 h-10 rounded-full bg-[#D85A30] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <div>
            <h4 class="font-headline font-bold text-[#D85A30] mb-1">¡Listo! Tu perfil será visible</h4>
            <p class="text-sm text-[#D85A30]/80 leading-relaxed font-medium">
              Al finalizar, tu perfil de Kachuelo estará activo en la plataforma y podrás empezar a recibir solicitudes de clientes en tu zona.
            </p>
          </div>
        </section>
      </main>

      <!-- Botón finalizar -->
      <div class="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-outline-variant/10 z-40">
        <a routerLink="/dashboard"
           class="flex justify-center items-center w-full bg-[#D85A30] hover:bg-[#c2512a] text-white font-headline text-lg font-bold py-4 rounded-xl shadow-[0_8px_16px_rgba(216,90,48,0.25)] active:scale-[0.98] transition-all">
          Finalizar mi perfil
        </a>
      </div>
    </div>
  `
})
export class WorkDetailsComponent {

  // ① Experiencia
  opcionesExperiencia = [
    { valor: 'menos1', etiqueta: 'Menos de 1 año' },
    { valor: '1a3',    etiqueta: '1 a 3 años' },
    { valor: '3a5',    etiqueta: '3 a 5 años' },
    { valor: 'mas5',   etiqueta: 'Más de 5 años' },
  ];
  experiencia = signal('1a3');
  descripcion = '';

  // ② Precio
  opcionesPrecio: { valor: PrecioTipo; etiqueta: string; conMonto: boolean; unidad?: string }[] = [
    { valor: 'hora',     etiqueta: 'Cobro por hora',    conMonto: true,  unidad: 'hora' },
    { valor: 'dia',      etiqueta: 'Cobro por día',     conMonto: true,  unidad: 'día' },
    { valor: 'trabajo',  etiqueta: 'Cobro por trabajo', conMonto: true,  unidad: 'trabajo' },
    { valor: 'convenir', etiqueta: 'A convenir',        conMonto: false },
  ];
  precioTipo = signal<PrecioTipo>('hora');
  monto = 25;

  // ③ Disponibilidad — días
  dias = [
    { id: 'L', letra: 'L' }, { id: 'M', letra: 'M' }, { id: 'X', letra: 'M' },
    { id: 'J', letra: 'J' }, { id: 'V', letra: 'V' }, { id: 'S', letra: 'S' },
    { id: 'D', letra: 'D' },
  ];
  diasSeleccionados = signal<string[]>(['L', 'M', 'X', 'J', 'V']);

  todosDiasSeleccionados = computed(() => this.diasSeleccionados().length === 7);
  soloFinSemana         = computed(() => {
    const d = this.diasSeleccionados();
    return d.length === 2 && d.includes('S') && d.includes('D');
  });

  toggleDia(id: string) {
    const actual = this.diasSeleccionados();
    this.diasSeleccionados.set(
      actual.includes(id) ? actual.filter(d => d !== id) : [...actual, id]
    );
  }
  seleccionarTodosDias()  { this.diasSeleccionados.set(['L','M','X','J','V','S','D']); }
  seleccionarFinDeSemana(){ this.diasSeleccionados.set(['S','D']); }

  // Turnos
  turnos = [
    { valor: 'manana' as Turno, nombre: 'Mañana',  icono: 'light_mode',        horario: '8:00 - 12:00' },
    { valor: 'tarde'  as Turno, nombre: 'Tarde',   icono: 'partly_cloudy_day', horario: '12:00 - 18:00' },
    { valor: 'noche'  as Turno, nombre: 'Noche',   icono: 'dark_mode',         horario: '18:00 - 22:00' },
  ];
  turnosSeleccionados = signal<Turno[]>(['manana', 'tarde']);

  toggleTurno(turno: Turno) {
    const actual = this.turnosSeleccionados();
    this.turnosSeleccionados.set(
      actual.includes(turno) ? actual.filter(t => t !== turno) : [...actual, turno]
    );
  }

  // Toggle disponible ahora
  disponibleAhora = signal(false);

  // Cobertura
  opcionesCobertura = [
    { valor: 'zona'        as Cobertura, etiqueta: 'Solo mi zona' },
    { valor: 'ciudad'      as Cobertura, etiqueta: 'Toda la ciudad' },
    { valor: 'alrededores' as Cobertura, etiqueta: 'Alrededores (+15km)' },
  ];
  cobertura = signal<Cobertura>('ciudad');
}
