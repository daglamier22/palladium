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
  isHamburgerMenuOpen: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInChanged().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onToggleHamburgerMenu() {
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  onLogin() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/login']);
  }

  onSignup() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/signup']);
  }

  onLogout() {
    console.log('logout');
    this.authService.logout();
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/login']);
  }

  onHome() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/']);
  }

  onOverview() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/overview']);
  }

  onAddAccount() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/add-account']);
  }

  onAddTransaction() {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/add-transaction']);
  }
}
