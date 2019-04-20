import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.user.username, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }
  /**
   * ユーザーが登録済みならトークンを取得しログイン
   * ユーザーが未登録なら登録後、トークンを取得しログイン
   */
  async signIn() {
    await this.authService.signIn(this.loginForm.value);
  }
}
