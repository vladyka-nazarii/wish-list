import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { AuthService } from './auth.service';
import { FirestoreService, WishItem } from './firestore.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WishListItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  wishItems: WishItem[] = [];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  updateProducts: () => void = async () => {
    this.wishItems = await this.firestoreService.getUserData();
  };

  ngOnInit(): void {
    this.authService.subscribeAuthChange((user) => {
      if (user?.uid) {
        console.log(user.uid);
        this.updateProducts();
      } else {
        this.authService.loginAnonymously();
      }
    });
  }
}
