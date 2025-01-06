import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FirestoreService, WishItem } from '../firestore.service';
import { WishListEditorComponent } from '../wish-list-editor/wish-list-editor.component';

@Component({
  selector: 'app-wish-list-item',
  imports: [NgFor, WishListEditorComponent],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent {
  @Input() products!: WishItem[];
  @Input() readonly!: boolean;
  @Output() updateProducts: EventEmitter<void> = new EventEmitter<void>();

  selectedProduct: WishItem | null = null;

  constructor(private firestoreService: FirestoreService) {}

  deleteProduct: (id: string) => void = async (id) => {
    await this.firestoreService.removeProduct(id);
  };

  setSelectedProduct(product: WishItem) {
    this.selectedProduct = product;
  }

  onClosePopup() {
    console.log('closePopup called', this.selectedProduct);
    this.selectedProduct = null;
  }

  updateParentProducts() {
    this.updateProducts.emit();
  }
}
