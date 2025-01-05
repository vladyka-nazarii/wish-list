import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WishListItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wish-list';
}
