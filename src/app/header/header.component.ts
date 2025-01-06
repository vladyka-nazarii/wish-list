import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

import { MetaService } from '../meta.service';
import { FirestoreService, WishItem } from '../firestore.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() user!: User | null;
  @Input() products!: WishItem[];
  @Output() updateProducts: EventEmitter<void> = new EventEmitter<void>();

  url: string = '';

  constructor(
    private metaService: MetaService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  updateParentProducts() {
    this.updateProducts.emit();
  }

  addProduct() {
    if (!this.url) {
      alert('Please enter a URL!');
      return;
    }

    if (this.products.some(({ url }) => url === this.url)) {
      alert('The product already exists!');
      return;
    }

    this.metaService.fetchMetaTags(this.url).subscribe((data) => {
      this.firestoreService.addProduct(data);
      this.url = '';
      this.updateParentProducts();
    });
  }

  login() {
    this.authService.signInWithGoogle();
  }

  logout() {
    this.authService.signOut();
  }
}
