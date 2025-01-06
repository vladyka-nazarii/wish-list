import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FirestoreService, WishItem } from '../firestore.service';

const OVERLAY_CLASS = 'wish-editor__overlay';

@Component({
  selector: 'app-wish-list-editor',
  imports: [FormsModule, NgIf],
  templateUrl: './wish-list-editor.component.html',
  styleUrl: './wish-list-editor.component.scss',
})
export class WishListEditorComponent implements OnChanges {
  @Input() product!: WishItem | null;
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateProducts: EventEmitter<void> = new EventEmitter<void>();

  activeProduct: WishItem | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.activeProduct = changes['product'].currentValue
        ? { ...changes['product'].currentValue }
        : changes['product'].currentValue;
    }
  }

  updateParentProducts() {
    this.updateProducts.emit();
  }

  onClose() {
    this.closePopup.emit();
  }

  onOverlayClick(event: MouseEvent) {
    const targetClass = (event.target as HTMLDivElement).className;
    if (targetClass === OVERLAY_CLASS) {
      this.onClose();
    }
  }

  onSave(product: WishItem) {
    this.firestoreService.editProduct(product);
    this.updateParentProducts();
    this.onClose();
  }

  onDelete(id: string) {
    this.firestoreService.removeProduct(id);
    this.updateParentProducts();
    this.onClose();
  }
}
