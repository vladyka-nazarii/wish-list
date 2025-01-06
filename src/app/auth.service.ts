import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  linkWithPopup,
  NextFn,
  signInAnonymously,
  signInWithPopup,
  User,
  UserCredential,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

const FIREBASE_AUTH_ERROR =
  'FirebaseError: Firebase: Error (auth/credential-already-in-use).';

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
      const authProvider = new GoogleAuthProvider();
      let userCredential: UserCredential;
      try {
        if (this.auth.currentUser) {
          userCredential = await linkWithPopup(
            this.auth.currentUser,
            authProvider
          );
          updateProfile(this.auth.currentUser, {
            displayName: this.auth.currentUser.providerData[0].displayName,
            photoURL: this.auth.currentUser.providerData[0].photoURL,
          });
        } else {
          userCredential = await signInWithPopup(this.auth, authProvider);
        }
      } catch (error) {
        if (`${error}` === FIREBASE_AUTH_ERROR) {
          if (this.auth.currentUser) {
            userCredential = await signInWithPopup(this.auth, authProvider);
            updateProfile(this.auth.currentUser, {
              displayName: this.auth.currentUser.providerData[0].displayName,
              photoURL: this.auth.currentUser.providerData[0].photoURL,
            });
            this.userSubject.next(userCredential.user);
          }
        } else {
          throw error;
        }
      }
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
