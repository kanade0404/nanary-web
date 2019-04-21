import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../services/global.service';
import { Session } from '../models/session';


interface CreateUser {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: CreateUser;

  constructor(private router: Router, private snackBar: MatSnackBar,
    private authService: AuthService, private globalService: GlobalService) {
    this.registerForm = new FormGroup({
      'username': new FormControl(this.user.username, [
        Validators.required
      ]),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.user.password, [
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
   * ユーザー登録
   */
  async signUp() {
    await this.authService.signUp(this.registerForm.value).subscribe(
      response => {
        this.snackBar.open(
          'ユーザー登録しました',
          '',
          {duration: 2000}
        );
        this.router.navigate(['login']);
      },
      error => {
        this.snackBar.open(
          `登録に失敗しました。\n${error}`,
          '',
          {duration: 2000}
        );
      }
    );
  }
}
