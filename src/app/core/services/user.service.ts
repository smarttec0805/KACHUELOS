import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    docData,
    serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UserProfile {
    uid: string;
    nombre: string;
    edad: number;
    genero: string;
    zona: string;
    rol: 'trabajador' | 'empleador';
    tipoTrabajador?: string;
    servicios?: string[];
    premium: boolean;
    fotoUrl: string;
    email?: string;
    createdAt?: any;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private firestore = inject(Firestore);

    async createProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
        const ref = doc(this.firestore, `users/${uid}`);
        await setDoc(ref, {
            ...data,
            uid,
            premium: false,
            fotoUrl: data.fotoUrl || '',
            createdAt: serverTimestamp()
        });
    }

    getProfile(uid: string): Observable<UserProfile | undefined> {
        const ref = doc(this.firestore, `users/${uid}`);
        return docData(ref) as Observable<UserProfile | undefined>;
    }

    async getProfileOnce(uid: string): Promise<UserProfile | null> {
        const ref = doc(this.firestore, `users/${uid}`);
        const snap = await getDoc(ref);
        return snap.exists() ? (snap.data() as UserProfile) : null;
    }

    async updateProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
        const ref = doc(this.firestore, `users/${uid}`);
        await updateDoc(ref, { ...data });
    }
}
