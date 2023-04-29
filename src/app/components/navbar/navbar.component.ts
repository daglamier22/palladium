import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { CreateLinkTokenService } from '../../services/plaid/create-link-token/create-link-token.service';
import { NgxPlaidLinkService, PlaidConfig, PlaidErrorMetadata, PlaidEventMetadata, PlaidLinkHandler, PlaidSuccessMetadata } from 'ngx-plaid-link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isHamburgerMenuOpen: boolean = false;

  private plaidLinkHandler: PlaidLinkHandler | undefined = undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private createLinkTokenService: CreateLinkTokenService,
    private plaidLinkService: NgxPlaidLinkService
  ) { }

  ngOnInit() {
    this.authService.getLoggedInChanged().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onAddAccount(): void {
    this.createLinkTokenService.call();
    this.createLinkTokenService.getLoadingChanged().subscribe((loading: boolean) => {
      let linkToken = this.createLinkTokenService.getServerResponse().values.linkToken;
      console.log(linkToken);
      let config: PlaidConfig = {
        token: linkToken,
        onSuccess: (token: string, metadata: PlaidSuccessMetadata) => this.onPlaidSuccess(token, metadata),
        onExit: (error: string, metadata: PlaidErrorMetadata) => this.onPlaidExit(error, metadata),
        onEvent: (eventName: string, metadata: PlaidEventMetadata) => this.onPlaidEvent(eventName, metadata),
        onLoad: (event: string) => this.onPlaidLoad(event)
      };
      this.plaidLinkService
        .createPlaid(
          Object.assign({}, config)
        )
        .then((handler: PlaidLinkHandler) => {
          this.plaidLinkHandler = handler;
          this.plaidLinkHandler.open();
        });
      });
  }

  onPlaidSuccess(token: string, metadata: PlaidSuccessMetadata) {
    // Send the public token to your server so you can do the token exchange.
    console.log('success', token, metadata);
  }

  onPlaidExit(error: string, metadata: PlaidErrorMetadata) {
    // TODO: - Get errors or exit reason.
    console.log('exit', error, metadata);
  }

  onPlaidEvent(eventName: string, metadata: PlaidEventMetadata) {
    // TODO: - Log events so you can have insight into how your users are using plaid link.
    console.log('event', eventName, metadata);
  }

  onPlaidLoad(event: string) {
    // TODO: - Do something when the iframe loads.
    console.log('load', event);
  }
}
