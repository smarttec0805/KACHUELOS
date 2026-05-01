import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    collectionData,
    query,
    where,
    orderBy,
    serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Kachuelo {
    id?: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    precio: number;
    zona: string;
    empleadorId: string;
    estado: 'activo' | 'cerrado';
    createdAt?: any;
}

@Injectable({ providedIn: 'root' })
export class KachuelosService {
    private firestore = inject(Firestore);

    async crear(data: Omit<Kachuelo, 'id' | 'createdAt'>): Promise<string> {
        const ref = collection(this.firestore, 'kachuelos');
        const docRef = await addDoc(ref, {
            ...data,
            estado: 'activo',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    }

    getPorZona(zona: string): Observable<Kachuelo[]> {
        const ref = collection(this.firestore, 'kachuelos');
        const q = query(
            ref,
            where('estado', '==', 'activo'),
            where('zona', '==', zona),
            orderBy('createdAt', 'desc')
        );
        return collectionData(q, { idField: 'id' }) as Observable<Kachuelo[]>;
    }

    getPorEmpleador(empleadorId: string): Observable<Kachuelo[]> {
        const ref = collection(this.firestore, 'kachuelos');
        const q = query(
            ref,
            where('empleadorId', '==', empleadorId),
            orderBy('createdAt', 'desc')
        );
        return collectionData(q, { idField: 'id' }) as Observable<Kachuelo[]>;
    }

    async cerrar(id: string): Promise<void> {
        const ref = doc(this.firestore, `kachuelos/${id}`);
        await updateDoc(ref, { estado: 'cerrado' });
    }

    async eliminar(id: string): Promise<void> {
        const ref = doc(this.firestore, `kachuelos/${id}`);
        await deleteDoc(ref);
    }
}