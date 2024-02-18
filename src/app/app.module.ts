import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageViewComponent } from './views/homepage-view/homepage-view.component';
import { ButtonRectangleComponent } from './components/buttons/button/button-rectangle.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';
import { AddAccountViewComponent } from './views/add-account-view/add-account-view.component';
import { EditAccountViewComponent } from './views/edit-account-view/edit-account-view.component';
import { AddTransactionViewComponent } from './views/add-transaction-view/add-transaction-view.component';
import { EditTransactionViewComponent } from './views/edit-transaction-view/edit-transaction-view.component';
import { ViewAccountViewComponent } from './views/view-account-view/view-account-view.component';
import { ButtonCircleComponent } from './components/buttons/button-circle/button-circle.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageViewComponent,
    ButtonRectangleComponent,
    ButtonCircleComponent,
    InputFieldComponent,
    SignupComponent,
    LoginComponent,
    OverviewViewComponent,
    AddAccountViewComponent,
    EditAccountViewComponent,
    AddTransactionViewComponent,
    EditTransactionViewComponent,
    ViewAccountViewComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPlaidLinkModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
