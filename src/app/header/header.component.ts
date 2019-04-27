import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Session } from '../models/session';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  public login: boolean = this.globalService.chkLogin();
  isSignForm: boolean = false;
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.globalService.sessionState.subscribe(
      (session: Session) => {
        console.log('session.login', session.login);
        this.login = session.login;
      }
    );
    // this.globalService.isSignFormState.subscribe((isSignForm: boolean) => {
    //   console.log('isSignForm', isSignForm);
    //   this.isSignForm = isSignForm;
    // });
  }
  clickedLogin() {
    this.router.navigate(['login']);
  }
  // サインアウト処理
  async signOut() {
    await this.globalService.logout();
    await this.snackBar.open('ログアウトしました', '', { duration: 2000 });
    await this.router.navigate(['login']);
  }
}
