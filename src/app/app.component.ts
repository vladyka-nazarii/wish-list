import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { AuthService } from './auth.service';
import { FirestoreService, WishItem } from './firestore.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WishListItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  wishItems: WishItem[] = [];
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async updateProducts() {
    this.wishItems = await this.firestoreService.getUserData();
  }

  ngOnInit(): void {
    this.authService.subscribeAuthChange((user) => {
      if (user?.uid) {
        this.user = user;
        this.updateProducts();
      } else {
        this.authService.loginAnonymously();
      }
    });
  }
}
