import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Session } from '../models/session';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public login = false;
  isSignForm:boolean = false;
  constructor(private globalService: GlobalService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.globalService.sessionState.subscribe((session: Session) => {
      this.login = this.globalService.chkLogin();
      if (session) {
        this.login = session.login;
      }
    });
    this.globalService.isSignFormState.subscribe((isSignForm: boolean) => {
      this.isSignForm = isSignForm;
    })
  }
  // サインアウト処理
  signOut() {
    this.globalService.logout;
    this.snackBar.open('ログアウトしました', '', { duration: 2000 });
  }
}
