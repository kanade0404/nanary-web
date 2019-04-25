import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material';
import { LoginUser } from '../models/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: LoginUser;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.globalService.chkLogin()) {
      this.globalService.session.login = true;
      this.globalService.sessionSubject.next(this.globalService.session);
      this.router.navigate(['home']);
    } else {
      this.globalService.isSignFormSubject.next(true);
      this.globalService.session.login = false;
      this.globalService.sessionSubject.next(this.globalService.session);
    }
    /**
     * ログインフォーム
     */
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
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
          this.snackBar.open('ログインに成功しました', '', { duration: 2000 });
          this.router.navigate(['home']);
        } catch (e) {
          this.snackBar.open(`ログインに失敗しました\n${e}`, '', {
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open(`ログインに失敗しました。\n${error}`, '', {
          duration: 2000
        });
      }
    );
  }
}
