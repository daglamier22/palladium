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
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInChanged().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onLogout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
