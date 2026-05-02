import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal, ViewChildren, QueryList, ElementRef, AfterViewInit
} from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface text-on-surface antialiased min-h-screen">

      <!-- Header dinámico según flujo -->
      <header class="flex items-center justify-between px-6 h-16 w-full sticky top-0 bg-[#DFE3E8] z-10">
        <a [routerLink]="esLogin() ? '/login' : '/phone'"
           class="p-2 -ml-2 text-primary hover:bg-[#DFE3E8]/50 transition-colors active:scale-95 duration-200 rounded-full">
          <span class="material-symbols-outlined">arrow_back</span>
        </a>
        <h1 class="font-headline font-semibold text-lg text-on-surface">
          {{ esLogin() ? 'Verificar identidad' : 'Paso 2 de 4' }}
        </h1>
        <div class="w-10"></div>
      </header>

      <!-- Barra de progreso (solo en registro) -->
      @if (!esLogin()) {
        <div class="px-6 py-4 w-full max-w-md mx-auto">
          <div class="flex gap-2 w-full h-2">
            <div class="flex-1 bg-primary-container rounded-full"></div>
            <div class="flex-1 bg-primary-container rounded-full"></div>
            <div class="flex-1 bg-surface-container-highest rounded-full"></div>
            <div class="flex-1 bg-surface-container-highest rounded-full"></div>
          </div>
        </div>
      }

      <main class="flex-1 flex flex-col items-center px-6 pt-10 pb-36 max-w-md mx-auto w-full">

        <!-- Ícono -->
        <div class="w-24 h-24 mb-8 rounded-full flex items-center justify-center"
             [class]="esLogin() ? 'bg-[#0F6E56]/10 text-[#0F6E56]' : 'bg-surface-container-low text-primary-container'">
          <span class="material-symbols-outlined text-5xl" style="font-variation-settings: 'FILL' 1;">
            {{ esLogin() ? 'shield_lock' : 'lock' }}
          </span>
        </div>

        <h2 class="font-headline text-[24px] font-bold text-on-surface mb-3 text-center">
          Ingresa el código
        </h2>
        <p class="font-body text-sm text-on-surface-variant text-center mb-10 px-4">
          Enviamos un código de 6 dígitos al <br/>
          <span class="font-semibold text-primary-container">+51 987 654 321</span>
        </p>

        <!-- Campos de código con auto-avance -->
        <div class="w-full flex justify-center gap-2 mb-10">
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            autocomplete="one-time-code"
            (input)="onInput($event, 0)"
            (keydown)="onKeyDown($event, 0)"
            (paste)="onPaste($event)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            (input)="onInput($event, 1)"
            (keydown)="onKeyDown($event, 1)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            (input)="onInput($event, 2)"
            (keydown)="onKeyDown($event, 2)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            (input)="onInput($event, 3)"
            (keydown)="onKeyDown($event, 3)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            (input)="onInput($event, 4)"
            (keydown)="onKeyDown($event, 4)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
          <input #digitInput
            type="text" inputmode="numeric" maxlength="1" pattern="[0-9]*"
            (input)="onInput($event, 5)"
            (keydown)="onKeyDown($event, 5)"
            class="w-12 h-14 text-center font-headline text-2xl font-bold bg-surface-container-high border-b-2 border-transparent focus:border-b-[#0F6E56] rounded-xl text-on-surface shadow-sm outline-none transition-all caret-transparent select-none"/>
        </div>

        <!-- Reenviar -->
        <div class="font-body text-sm text-on-surface-variant text-center mb-8">
          Reenviar código en <span class="font-medium">00:45</span>
        </div>

        <!-- Botón verificar -->
        <button
          id="btn-verificar"
          (click)="verificar()"
          class="flex justify-center items-center w-full py-4 px-6 rounded-xl text-on-primary font-headline font-semibold text-lg active:scale-[0.98] transition-transform cursor-pointer"
          [class]="esLogin()
            ? 'bg-[#0F6E56] shadow-[0_4px_16px_rgba(15,110,86,0.3)]'
            : 'bg-primary shadow-[0_4px_16px_rgba(0,84,64,0.2)]'">
          <span class="material-symbols-outlined mr-2" style="font-variation-settings: 'FILL' 1;">
            {{ esLogin() ? 'login' : 'check_circle' }}
          </span>
          {{ esLogin() ? 'Ingresar a mi cuenta' : 'Verificar Código' }}
        </button>
      </main>

      <!-- Footer -->
      <footer class="fixed bottom-0 left-0 right-0 p-6 bg-surface/85 backdrop-blur-sm border-t border-outline-variant/15 flex flex-col items-center justify-center">
        <p class="font-body text-sm text-on-surface-variant mb-2">¿No recibiste el código?</p>
        <div class="flex items-center justify-center gap-2 font-body text-sm font-medium">
          <a class="text-primary-container underline hover:opacity-80 transition-colors" href="#">Cambiar número</a>
          <span class="text-outline-variant">•</span>
          <a class="text-primary-container underline hover:opacity-80 transition-colors" href="#">Llamar en su lugar</a>
        </div>
      </footer>
    </div>
  `
})
export class CodeComponent implements OnInit, AfterViewInit {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChildren('digitInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  esLogin = signal(false);

  ngOnInit() {
    const modo = this.route.snapshot.queryParamMap.get('modo');
    this.esLogin.set(modo === 'login');
  }

  ngAfterViewInit() {
    this.inputs.first?.nativeElement.focus();
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const inputsArr = this.inputs.toArray();

    input.value = input.value.replace(/\D/g, '').slice(-1);

    if (input.value && index < inputsArr.length - 1) {
      inputsArr[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const inputsArr = this.inputs.toArray();
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value) {
        input.value = '';
      } else if (index > 0) {
        const prev = inputsArr[index - 1].nativeElement;
        prev.value = '';
        prev.focus();
      }
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputsArr[index - 1].nativeElement.focus();
      event.preventDefault();
    }

    if (event.key === 'ArrowRight' && index < inputsArr.length - 1) {
      inputsArr[index + 1].nativeElement.focus();
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const digits  = pasted.replace(/\D/g, '').slice(0, 6).split('');
    const inputsArr = this.inputs.toArray();

    digits.forEach((digit, i) => {
      if (inputsArr[i]) {
        inputsArr[i].nativeElement.value = digit;
      }
    });

    const focusIndex = Math.min(digits.length, inputsArr.length - 1);
    inputsArr[focusIndex].nativeElement.focus();
  }

  verificar() {
    if (this.esLogin()) {
      this.router.navigate(['/private-profile']);
    } else {
      this.router.navigate(['/role']);
    }
  }
}
