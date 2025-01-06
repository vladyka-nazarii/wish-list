import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { filter, map } from 'rxjs/operators';

export interface WishItem {
  id: string;
  url: string;
  image: string;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!)
  );

  async addProduct(data: WishItem) {
    const ref = await addDoc(
      collection(
        this.firestore,
        `users/${this.auth.currentUser?.uid}/wishlist`
      ),
      data
    );
    setDoc(ref, { ...data, id: ref.id });
  }

  async removeProduct(id: string): Promise<void> {
    const docRef = doc(
      this.firestore,
      `users/${this.auth.currentUser?.uid}/wishlist`,
      id
    );
    await deleteDoc(docRef);
  }

  async editProduct(data: WishItem): Promise<void> {
    const docRef = doc(
      this.firestore,
      `users/${this.auth.currentUser?.uid}/wishlist`,
      data.id
    );
    await setDoc(docRef, data);
  }

  async getUserData(): Promise<WishItem[]> {
    const q = query(
      collection(
        this.firestore,
        `users/${this.auth.currentUser?.uid}/wishlist/`
      )
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((wishItem) => wishItem.data()) as WishItem[];
  }
}
