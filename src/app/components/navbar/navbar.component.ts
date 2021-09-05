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
  public isLoggedIn: boolean = false;
  public isHamburgerMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInChanged().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public onToggleHamburgerMenu(): void {
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  public onLogin(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/login']);
  }

  public onSignup(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/signup']);
  }

  public onLogout(): void {
    console.log('logout');
    this.authService.logout();
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/login']);
  }

  public onHome(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/']);
  }

  public onOverview(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/overview']);
  }

  public onAddAccount(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/add-account']);
  }

  public onAddTransaction(): void {
    this.isHamburgerMenuOpen = false;
    this.router.navigate(['/add-transaction']);
  }
}
