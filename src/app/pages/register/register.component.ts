import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { GlobalService } from "../../core/services/global.service";
import { CreateUser } from "../../models/createUser";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: CreateUser;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    if (this.globalService.chkLogin()) {
      this.globalService.session.login = true;
      this.globalService.sessionSubject.next(this.globalService.session);
      this.router.navigate(["home"]);
    } else {
      this.globalService.session.login = false;
      this.globalService.sessionSubject.next(this.globalService.session);
    }
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  /**
   * ユーザー登録
   */
  async signUp() {
    await this.authService.signUp(this.registerForm.value).subscribe(
      _ => {
        this.snackBar.open("ユーザー登録しました", "", { duration: 2000 });
        this.router.navigate(["login"]);
      },
      error => {
        this.snackBar.open(`登録に失敗しました。\n${error}`, "", {
          duration: 2000
        });
      }
    );
  }
}
