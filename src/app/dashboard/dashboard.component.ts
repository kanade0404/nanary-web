import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit() {
    if (this.globalService.chkLogin()) {
      this.globalService.session.login = true;
      this.globalService.sessionSubject.next(this.globalService.session);
      this.globalService.IsSignForm(false);
    } else {
      this.globalService.session.login = false;
      this.globalService.sessionSubject.next(this.globalService.session);
      this.router.navigate(['login']);
    }
  }
}
