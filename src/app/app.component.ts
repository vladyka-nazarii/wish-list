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
  readonly: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async updateProducts(hash?: string) {
    this.wishItems = await this.firestoreService.getUserData(hash);
    if (!hash && this.readonly) {
      this.readonly = false;
    }
  }

  ngOnInit(): void {
    this.authService.subscribeAuthChange((user) => {
      const hash = window.location.hash?.slice(1);
      this.readonly = !!hash;
      if (user?.uid) {
        this.user = user;
        this.updateProducts(hash);
      } else {
        this.authService.loginAnonymously();
      }
    });
  }
}
