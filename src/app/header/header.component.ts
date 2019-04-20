import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private globalService: GlobalService) {
  }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.globalService.login = true;
    } else {
      this.globalService.login = false;
    }
  }
  signOut() {
    localStorage.removeItem('token')
    if (!localStorage.getItem('token')){
      this.globalService.login = false;
      this.router.navigate(['login']);
    }
  }
}
