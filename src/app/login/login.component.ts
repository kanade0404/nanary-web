import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material';
import { LoginUser } from '../models/loginUser';
import { Session } from '../models/session';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: LoginUser = new LoginUser();

  constructor(private router: Router, private globalService: GlobalService,
    private authService: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.user.Email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.user.Password, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  ngOnInit() {
    this.globalService.sessionState.subscribe((session: Session) => {
      if (session.login) {
        this.router.navigate(['home']);
      }
    })
    this.globalService.IsSignForm(true);
  }
  /**
   * ユーザーが登録済みならトークンを取得しログイン
   * ユーザーが未登録なら登録後、トークンを取得しログイン
   */
  async signIn() {
    await this.authService.signIn(this.loginForm.value).subscribe(
      response => {
        try {
          this.globalService.login(response['user'], response['token']);
          this.snackBar.open(
            'ログインに成功しました',
            '',
            { duration: 2000 }
          );
        } catch (e) {
          this.snackBar.open(
            `ログインに失敗しました\n${e}`,
            '',
            { duration: 2000 }
          );
        }
      },
      error => {
        this.snackBar.open(
          `ログインに失敗しました。\n${error}`,
          '',
          { duration: 2000 }
        );
      }
    );
    this.snackBar.open(
      'OK',
      '',
      { duration: 2000 }
    );
  }
}
