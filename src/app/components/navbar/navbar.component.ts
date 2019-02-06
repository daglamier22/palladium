import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { AuthResponse } from '../../services/auth/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogout() {
    console.log('logout');
    this.authService.logout();
        this.authService.getLoadingChangedLogin().pipe(take(1)).subscribe(
          (loading: boolean) => {
            const response: AuthResponse = this.authService.getServerResponseLogin();
            if (response.status === 'SUCCESS') {
              this.router.navigate(['/']);
            }
          }
        );
  }
}
