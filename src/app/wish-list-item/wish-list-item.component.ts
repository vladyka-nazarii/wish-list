import { Component, Input } from '@angular/core';
import { MetaService } from '../meta.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FirestoreService, WishItem } from '../firestore.service';

@Component({
  selector: 'app-wish-list-item',
  imports: [FormsModule, NgFor],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent {
  @Input() items!: WishItem[];

  url: string = '';
  products: { title: string; image: string }[] = [];

  constructor(
    private metaService: MetaService,
    private firestoreService: FirestoreService
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
}
