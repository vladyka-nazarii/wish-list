import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

import { MetaService } from '../meta.service';
import { FirestoreService } from '../firestore.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() user!: User | null;

  url: string = '';

  constructor(
    private metaService: MetaService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  addProduct() {
    if (!this.url) {
      alert('Please enter a URL!');
      return;
    }

    this.metaService.fetchMetaTags(this.url).subscribe((data) => {
      console.log(data);
      this.firestoreService.addProductForUser(data);
      this.url = ''; // Clear the input field
    });
  }

  login() {
    this.authService.signInWithGoogle();
  }
}
