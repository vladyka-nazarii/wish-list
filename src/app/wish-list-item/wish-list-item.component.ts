import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { WishItem } from '../firestore.service';

@Component({
  selector: 'app-wish-list-item',
  imports: [NgFor],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent {
  @Input() products!: WishItem[];
}
