import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = new User();

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService) {
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
    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }

  /**
   * ユーザー登録
   */
  async signUp() {
    await this.authService.signUp(this.registerForm.value);
  }
}
