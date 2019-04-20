import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isLoggedIn: boolean;
  set login(state: boolean) {
    this.isLoggedIn = state;
  }
  get isLogin() {
    return this.isLoggedIn;
  }
  user: User = new User();
  set me(userData: any) {
    this.user.id = userData['id'];
    this.user.email = userData['email'];
    this.user.username = userData['usename'];
    this.user.displayUsername = userData['display_username'];
    this.user.profile = userData['profile'];
    this.user.iconImage = userData['icon_image'];
    localStorage.setItem('account', JSON.stringify(this.user));
  }
}
