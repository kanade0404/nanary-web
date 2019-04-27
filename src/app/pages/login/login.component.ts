import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalService } from '../../core/services/global.service';
import { MatSnackBar } from '@angular/material';
import { LoginUser } from '../../models/loginUser';
import { UserService } from '../../core/services/user.service';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';

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
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    /**
     * ログイン状態ならホーム画面に遷移
     */
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
     * email: string
     * password: string
     */
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }
  /**
   * ユーザーが登録済みならJWTトークンを取得しログイン
   */
  async signIn() {
    try {
      if (this.loginForm.invalid) {
        return;
      }
      await this.authService.signIn(this.loginForm.value).subscribe(_ => {
        this.userService.findUserByEmail(this.loginForm.value.email).subscribe(
          user => {
            console.log('user', user[0]);
            this.globalService.login(user[0]);
            this.snackBar.open('ログインに成功しました', '', {
              duration: 2000
            });
            this.router.navigate(['home']);
          },
          error => {
            console.error(error);
            this.snackBar.open(
              `ログインに失敗しました。\n${error.detail}`,
              '',
              {
                duration: 2000
              }
            );
          }
        );
      });
      console.log('between signIn and findUserByEmail');
    } catch (e) {
      console.error(e);
      this.snackBar.open(`ログインに失敗しました。\n${e.detail}`, '', {
        duration: 2000
      });
    }
  }
}
