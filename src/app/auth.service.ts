import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  NextFn,
  signInAnonymously,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {}

  async loginAnonymously(): Promise<void> {
    try {
      const userCredential = await signInAnonymously(this.auth);
      this.userSubject.next(userCredential.user);
      console.log('Logged in as anonymous user:', userCredential.user.uid);
    } catch (error) {
      console.error('Anonymous login failed:', error);
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      this.userSubject.next(userCredential.user);
      console.log('Signed with Google as:', userCredential.user.uid);
    } catch (error) {
      console.error('Sign In With Google failed:', error);
    }
  }

  async signOut(): Promise<void> {
    return this.auth.signOut();
  }

  subscribeAuthChange(callback: NextFn<User | null>) {
    return this.auth.onAuthStateChanged(callback);
  }

  getCurrentUserUid() {
    return this.auth.currentUser?.uid;
  }
}
