import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Oficio {
  id: string;
  nombre: string;
  categoria: string;
}

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  colorBg: string;
  colorIcon: string;
  oficios: Oficio[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-background text-on-background antialiased min-h-screen pb-28">

      <!-- Header -->
      <header class="bg-white font-headline font-bold text-lg flex justify-between items-center px-4 h-16 w-full sticky top-0 z-40 shadow-sm">
        <a routerLink="/worker-type" class="text-on-surface hover:bg-slate-100 transition-transform duration-200 p-2 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <h1 class="text-on-surface font-headline font-bold text-lg tracking-tight">Completa tu perfil</h1>
        <span class="text-primary text-sm font-semibold px-3 py-2 rounded-lg">
          {{ seleccionados().length }} seleccionados
        </span>
      </header>

      <main class="px-4 pt-6 max-w-md mx-auto">

        <!-- Título -->
        <section class="mb-6">
          <h2 class="font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight">¿Qué servicios ofreces?</h2>
          <p class="font-body text-sm text-outline font-normal leading-relaxed">
            Selecciona uno o varios oficios. Mientras más especifiques, más clientes te encontrarán.
          </p>
        </section>

        <!-- Buscador funcional -->
        <section class="mb-6 relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            [(ngModel)]="busqueda"
            name="busqueda"
            type="text"
            placeholder="Buscar oficio (ej: gasfitero)"
            class="w-full bg-surface-container-high text-on-surface border-none rounded-xl py-3 pl-12 pr-4 font-body text-sm focus:ring-0 focus:border-b-2 focus:border-primary transition-all outline-none shadow-sm"/>
          @if (busqueda) {
            <button (click)="busqueda = ''" class="absolute inset-y-0 right-3 flex items-center text-outline hover:text-on-surface transition-colors">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          }
        </section>

        <!-- Filtros -->
        <section class="mb-6 flex overflow-x-auto gap-2 pb-2 hide-scrollbar snap-x">
          @for (f of filtros; track f.valor) {
            <button
              type="button"
              (click)="filtroActivo.set(f.valor)"
              class="snap-start whitespace-nowrap font-label text-sm font-medium px-4 py-2 rounded-full transition-colors flex-shrink-0"
              [class]="filtroActivo() === f.valor
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant'">
              {{ f.etiqueta }}
            </button>
          }
        </section>

        <!-- Resultados de búsqueda -->
        @if (busqueda && resultadosBusqueda().length === 0) {
          <div class="text-center py-8 text-on-surface-variant font-body text-sm">
            <span class="material-symbols-outlined text-4xl mb-2 block">search_off</span>
            No se encontraron oficios con "{{ busqueda }}"
          </div>
        }

        @if (busqueda && resultadosBusqueda().length > 0) {
          <div class="grid grid-cols-2 gap-3 mb-6">
            @for (oficio of resultadosBusqueda(); track oficio.id) {
              <button
                type="button"
                (click)="toggleOficio(oficio.id)"
                class="flex items-center gap-2 p-3 rounded-xl border transition-all text-left active:scale-95"
                [class]="estaSeleccionado(oficio.id)
                  ? 'bg-primary/10 border-primary'
                  : 'bg-surface border-outline-variant/20 hover:bg-surface-container-low'">
                <div class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                     [class]="estaSeleccionado(oficio.id) ? 'border-primary bg-primary' : 'border-outline-variant'">
                  @if (estaSeleccionado(oficio.id)) {
                    <span class="material-symbols-outlined text-white" style="font-size:12px;font-variation-settings:'FILL' 1;">check</span>
                  }
                </div>
                <span class="font-body text-sm font-medium text-on-surface">{{ oficio.nombre }}</span>
              </button>
            }
          </div>
        }

        <!-- Categorías accordion -->
        @if (!busqueda) {
          <section class="space-y-4 mb-6">
            @for (cat of categorias; track cat.id) {
              <div class="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/15">

                <!-- Cabecera clickeable -->
                <button
                  type="button"
                  (click)="toggleCategoria(cat.id)"
                  class="w-full p-4 flex items-center justify-between transition-colors"
                  [class]="categoriaAbierta() === cat.id ? cat.colorBg : 'hover:bg-surface-container-low'">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center" [class]="cat.colorIcon">
                      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">{{ cat.icono }}</span>
                    </div>
                    <h3 class="font-headline font-semibold text-on-surface text-base">{{ cat.nombre }}</h3>
                  </div>
                  <div class="flex items-center gap-2 text-on-surface-variant">
                    <span class="text-xs font-medium">
                      {{ contarSeleccionadosEnCategoria(cat) }}/{{ cat.oficios.length }}
                    </span>
                    <span class="material-symbols-outlined transition-transform duration-300"
                          [class]="categoriaAbierta() === cat.id ? 'rotate-180' : 'rotate-0'">
                      expand_more
                    </span>
                  </div>
                </button>

                <!-- Opciones (se muestran si la categoría está abierta) -->
                @if (categoriaAbierta() === cat.id) {
                  <div class="p-4 bg-surface-container-lowest grid grid-cols-2 gap-3 border-t border-outline-variant/10">
                    @for (oficio of cat.oficios; track oficio.id) {
                      <button
                        type="button"
                        (click)="toggleOficio(oficio.id)"
                        class="flex items-center gap-2 p-3 rounded-xl border transition-all text-left active:scale-95"
                        [class]="estaSeleccionado(oficio.id)
                          ? 'bg-primary/10 border-primary'
                          : 'bg-surface border-outline-variant/20 hover:bg-surface-container-low'">
                        <div class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                             [class]="estaSeleccionado(oficio.id) ? 'border-primary bg-primary' : 'border-outline-variant'">
                          @if (estaSeleccionado(oficio.id)) {
                            <span class="material-symbols-outlined text-white" style="font-size:12px;font-variation-settings:'FILL' 1;">check</span>
                          }
                        </div>
                        <span class="font-body text-sm font-medium text-on-surface">{{ oficio.nombre }}</span>
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </section>

          <!-- Otro oficio no listado -->
          <div class="mb-6">
            <button
              type="button"
              (click)="mostrarOtroOficio.set(!mostrarOtroOficio())"
              class="w-full bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between border border-outline-variant/15 hover:bg-surface-container-low transition-colors shadow-sm">
              <span class="font-headline font-semibold text-on-surface">Tengo otro oficio no listado</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                   [class]="mostrarOtroOficio() ? 'bg-primary text-on-primary' : 'bg-secondary-container text-on-secondary-container'">
                <span class="material-symbols-outlined transition-transform duration-300"
                      [class]="mostrarOtroOficio() ? 'rotate-45' : 'rotate-0'">add</span>
              </div>
            </button>

            @if (mostrarOtroOficio()) {
              <div class="mt-3 bg-surface-container-low rounded-2xl p-4 border border-primary/20 space-y-3">
                <p class="font-body text-sm text-on-surface-variant">Escribe el nombre de tu oficio:</p>
                <div class="relative">
                  <input
                    [(ngModel)]="otroOficioTexto"
                    name="otroOficio"
                    type="text"
                    placeholder="Ej: Tapicero, DJ, Fotógrafo..."
                    autofocus
                    class="w-full bg-surface border-b-2 border-b-primary rounded-xl px-4 py-3 text-on-surface focus:ring-0 outline-none font-body text-sm placeholder:text-outline-variant"/>
                </div>
                <button
                  type="button"
                  (click)="agregarOtroOficio()"
                  class="w-full py-3 rounded-xl font-headline font-semibold text-sm transition-all active:scale-95"
                  [class]="otroOficioTexto.trim()
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-outline cursor-not-allowed'">
                  <span class="material-symbols-outlined text-sm mr-1" style="vertical-align:middle">add_circle</span>
                  Agregar oficio
                </button>
                <!-- Oficios personalizados agregados -->
                @if (oficiosPersonalizados().length > 0) {
                  <div class="flex flex-wrap gap-2 pt-1">
                    @for (op of oficiosPersonalizados(); track op) {
                      <span class="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                        {{ op }}
                        <button type="button" (click)="quitarPersonalizado(op)" class="hover:opacity-70">
                          <span class="material-symbols-outlined text-xs" style="font-size:14px">close</span>
                        </button>
                      </span>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }

        <!-- Tip -->
        <div class="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-4 flex gap-3 items-start mb-8 shadow-sm">
          <span class="material-symbols-outlined text-primary mt-0.5" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
          <p class="font-body text-sm text-on-surface-variant leading-snug">
            Los clientes buscan mucho estos servicios, especialmente en Semana Santa y feriados nacionales.
          </p>
        </div>
      </main>

      <!-- Botón siguiente -->
      <div class="fixed bottom-0 w-full bg-surface-container-lowest p-4 border-t border-outline-variant/15 z-50">
        <div class="max-w-md mx-auto">
          <a routerLink="/work-details"
             class="w-full block text-center font-headline font-bold text-base py-4 rounded-xl shadow-sm transition-all"
             [class]="seleccionados().length > 0 || oficiosPersonalizados().length > 0
               ? 'bg-secondary text-on-secondary'
               : 'bg-surface-container-high text-on-surface-variant'">
            Siguiente
          </a>
        </div>
      </div>
    </div>
  `
})
export class ServicesComponent {
  // Búsqueda
  busqueda = '';

  // Filtros
  filtros = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'populares', etiqueta: 'Más populares' },
    { valor: 'recomendados', etiqueta: 'Recomendados' },
  ];
  filtroActivo = signal('todos');

  // Acordeón — id de la categoría abierta (null = todas cerradas)
  categoriaAbierta = signal<string | null>('construccion');

  // Oficios seleccionados
  seleccionados = signal<string[]>([]);

  // Otro oficio
  mostrarOtroOficio = signal(false);
  otroOficioTexto   = '';
  oficiosPersonalizados = signal<string[]>([]);

  // Catálogo completo
  categorias: Categoria[] = [
    {
      id: 'construccion',
      nombre: 'Construcción y reparaciones',
      icono: 'construction',
      colorBg: 'bg-secondary-fixed',
      colorIcon: 'bg-white/50 text-secondary',
      oficios: [
        { id: 'gasfitero',    nombre: 'Gasfitero/a',    categoria: 'construccion' },
        { id: 'electricista', nombre: 'Electricista',    categoria: 'construccion' },
        { id: 'carpintero',   nombre: 'Carpintero/a',   categoria: 'construccion' },
        { id: 'albanil',      nombre: 'Albañil',         categoria: 'construccion' },
        { id: 'pintor',       nombre: 'Pintor/a',        categoria: 'construccion' },
        { id: 'cerrajero',    nombre: 'Cerrajero/a',    categoria: 'construccion' },
      ]
    },
    {
      id: 'mecanica',
      nombre: 'Mecánica y transporte',
      icono: 'build',
      colorBg: 'bg-surface-container-low',
      colorIcon: 'bg-surface-variant text-on-surface-variant',
      oficios: [
        { id: 'mecanico',          nombre: 'Mecánico/a',          categoria: 'mecanica' },
        { id: 'lavado-auto',       nombre: 'Lavado de auto',      categoria: 'mecanica' },
        { id: 'chofer',            nombre: 'Chofer',              categoria: 'mecanica' },
        { id: 'mecanico-moto',     nombre: 'Mecánico/a de moto',  categoria: 'mecanica' },
        { id: 'camion-mudanza',    nombre: 'Camión de mudanza',   categoria: 'mecanica' },
        { id: 'delivery-express',  nombre: 'Delivery express',    categoria: 'mecanica' },
        { id: 'gruas',             nombre: 'Grúas',               categoria: 'mecanica' },
      ]
    },
    {
      id: 'tecnologia',
      nombre: 'Tecnología y electrónica',
      icono: 'laptop_mac',
      colorBg: 'bg-primary-fixed-dim/20',
      colorIcon: 'bg-primary-fixed-dim/20 text-primary',
      oficios: [
        { id: 'tecnico-pc',         nombre: 'Técnico/a PC',             categoria: 'tecnologia' },
        { id: 'redes',              nombre: 'Redes / WiFi',             categoria: 'tecnologia' },
        { id: 'cel-reparacion',     nombre: 'Reparar celular',          categoria: 'tecnologia' },
        { id: 'camaras-seguridad',  nombre: 'Cámaras de seguridad',     categoria: 'tecnologia' },
        { id: 'electrodomesticos',  nombre: 'Técnico/a electrodom.',    categoria: 'tecnologia' },
        { id: 'tecnico-tv',         nombre: 'Técnico/a TV',             categoria: 'tecnologia' },
        { id: 'community-manager',  nombre: 'Community Manager',        categoria: 'tecnologia' },
        { id: 'influencer',         nombre: 'Influencer',               categoria: 'tecnologia' },
      ]
    },
    {
      id: 'profesionales',
      nombre: 'Servicios de profesionales',
      icono: 'school',
      colorBg: 'bg-primary/5',
      colorIcon: 'bg-primary/10 text-primary',
      oficios: [
        { id: 'contador',        nombre: 'Contador/a',        categoria: 'profesionales' },
        { id: 'abogado',         nombre: 'Abogado/a',         categoria: 'profesionales' },
        { id: 'enfermera',       nombre: 'Enfermero/a',       categoria: 'profesionales' },
        { id: 'docente',         nombre: 'Docente',            categoria: 'profesionales' },
        { id: 'informatico',     nombre: 'Informático/a',     categoria: 'profesionales' },
        { id: 'cosmetologa',     nombre: 'Cosmetólogo/a',     categoria: 'profesionales' },
        { id: 'fisioterapeuta',  nombre: 'Fisioterapeuta',    categoria: 'profesionales' },
        { id: 'administrador',   nombre: 'Administrador/a',   categoria: 'profesionales' },
      ]
    },
    {
      id: 'artesania',
      nombre: 'Oficios tradicionales',
      icono: 'palette',
      colorBg: 'bg-tertiary-fixed/50',
      colorIcon: 'bg-tertiary-fixed/50 text-tertiary',
      oficios: [
        { id: 'costurero',         nombre: 'Costurero/a',           categoria: 'artesania' },
        { id: 'cocinero',          nombre: 'Cocinero/a',            categoria: 'artesania' },
        { id: 'fotografo',         nombre: 'Fotógrafo/a',           categoria: 'artesania' },
        { id: 'bartender',         nombre: 'Bar tender',            categoria: 'artesania' },
        { id: 'mozo',              nombre: 'Mozo/a',                categoria: 'artesania' },
        { id: 'jardinero',         nombre: 'Jardinero/a',           categoria: 'artesania' },
        { id: 'decorador',         nombre: 'Decorador/a',           categoria: 'artesania' },
        { id: 'ninieria',          nombre: 'Niñero/a',              categoria: 'artesania' },
        { id: 'ventas',            nombre: 'Personal de ventas',    categoria: 'artesania' },
        { id: 'limpieza',          nombre: 'Servicio de limpieza',  categoria: 'artesania' },
        { id: 'masajista',         nombre: 'Masajista',             categoria: 'artesania' },
        { id: 'peluqueria',        nombre: 'Peluquero/a · Barbero/a', categoria: 'artesania' },
        { id: 'maquillaje',        nombre: 'Maquillador/a prof.',   categoria: 'artesania' },
      ]
    },
  ];

  // Todos los oficios planos para búsqueda
  todosLosOficios = computed(() =>
    this.categorias.flatMap(c => c.oficios)
  );

  resultadosBusqueda = computed(() => {
    const q = this.busqueda.toLowerCase().trim();
    if (!q) return [];
    return this.todosLosOficios().filter(o =>
      o.nombre.toLowerCase().includes(q)
    );
  });

  // Toggle acordeón
  toggleCategoria(id: string) {
    this.categoriaAbierta.set(
      this.categoriaAbierta() === id ? null : id
    );
  }

  // Toggle selección de oficio
  toggleOficio(id: string) {
    const actual = this.seleccionados();
    if (actual.includes(id)) {
      this.seleccionados.set(actual.filter(s => s !== id));
    } else {
      this.seleccionados.set([...actual, id]);
    }
  }

  estaSeleccionado(id: string) {
    return this.seleccionados().includes(id);
  }

  contarSeleccionadosEnCategoria(cat: Categoria) {
    return cat.oficios.filter(o => this.estaSeleccionado(o.id)).length;
  }

  // Agregar oficio personalizado
  agregarOtroOficio() {
    const texto = this.otroOficioTexto.trim();
    if (!texto) return;
    if (!this.oficiosPersonalizados().includes(texto)) {
      this.oficiosPersonalizados.set([...this.oficiosPersonalizados(), texto]);
    }
    this.otroOficioTexto = '';
  }

  quitarPersonalizado(oficio: string) {
    this.oficiosPersonalizados.set(
      this.oficiosPersonalizados().filter(o => o !== oficio)
    );
  }
}
