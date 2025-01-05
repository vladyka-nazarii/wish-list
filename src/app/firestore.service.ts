import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { filter, map } from 'rxjs/operators';

export interface WishItem {
  url: string;
  image: string;
  title: string;
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

  async addProductForUser(data: WishItem) {
    const ref = await addDoc(
      collection(
        this.firestore,
        `users/${this.auth.currentUser?.uid}/wishlist`
      ),
      data
    );
    setDoc(ref, { ...data, id: ref.id });
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
