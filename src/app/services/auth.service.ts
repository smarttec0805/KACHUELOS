import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    user,
    User
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth = inject(Auth);
    private router = inject(Router);
    private userService = inject(UserService);

    currentUser$: Observable<User | null> = user(this.auth);

    async loginWithGoogle(): Promise<void> {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const uid = result.user.uid;
            const perfil = await this.userService.getProfileOnce(uid);
            if (!perfil) {
                this.router.navigate(['/profile-info']);
            } else {
                this.router.navigate(['/dashboard']);
            }
        } catch (error) {
            console.error('Error en login con Google:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.router.navigate(['/login']);
    }

    get currentUser(): User | null {
        return this.auth.currentUser;
    }
}