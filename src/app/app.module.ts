import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageViewComponent } from './views/homepage-view/homepage-view.component';
import { ButtonComponent } from './components/buttons/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';
import { AddAccountViewComponent } from './views/add-account-view/add-account-view.component';
import { EditAccountViewComponent } from './views/edit-account-view/edit-account-view.component';
import { AddTransactionViewComponent } from './views/add-transaction-view/add-transaction-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageViewComponent,
    ButtonComponent,
    InputFieldComponent,
    SignupComponent,
    LoginComponent,
    OverviewViewComponent,
    AddAccountViewComponent,
    EditAccountViewComponent,
    AddTransactionViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
