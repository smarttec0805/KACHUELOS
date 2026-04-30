import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="fixed top-0 z-[100] left-0 h-full w-48 bg-surface-container p-4 overflow-y-auto hidden md:block border-r border-outline-variant/30">
        <h2 class="font-headline font-bold mb-4 text-primary">Screens</h2>
        <ul class="flex flex-col gap-2 font-body text-sm font-medium">
            <li><a routerLink="/" class="text-secondary hover:underline">Welcome</a></li>
            <li><a routerLink="/phone" class="text-secondary hover:underline">Phone Input</a></li>
            <li><a routerLink="/code" class="text-secondary hover:underline">Code Verif.</a></li>
            <li><a routerLink="/role" class="text-secondary hover:underline">Role</a></li>
            <li><a routerLink="/profile-info" class="text-secondary hover:underline">Profile Info</a></li>
            <li><a routerLink="/worker-type" class="text-secondary hover:underline">Worker Type</a></li>
            <li><a routerLink="/services" class="text-secondary hover:underline">Services</a></li>
            <li><a routerLink="/work-details" class="text-secondary hover:underline">Work Details</a></li>
            <li><a routerLink="/dashboard" class="text-secondary hover:underline">Dashboard</a></li>
            <li><a routerLink="/premium" class="text-secondary hover:underline">Premium</a></li>

            <li><a routerLink="/private-profile" class="text-secondary hover:underline">Private Profile</a></li>
        </ul>
    </div>
    <div class="md:ml-48">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {}
