import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
