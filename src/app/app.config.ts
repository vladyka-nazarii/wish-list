import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "wish-list-28b8f", appId: "1:69191109318:web:b14e76198f8e88295525c7", storageBucket: "wish-list-28b8f.firebasestorage.app", apiKey: "AIzaSyBV2TFEfTzq47X9_qNfr_fJuJ2aVXfdeWw", authDomain: "wish-list-28b8f.firebaseapp.com", messagingSenderId: "69191109318" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())]
};
