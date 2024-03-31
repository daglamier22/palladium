import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomepageViewComponent } from './views/homepage-view/homepage-view.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoginComponent } from './views/auth/login/login.component';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';
import { AddAccountViewComponent } from './views/add-account-view/add-account-view.component';
import { EditAccountViewComponent } from './views/edit-account-view/edit-account-view.component';
import { AddTransactionViewComponent } from './views/add-transaction-view/add-transaction-view.component';
import { EditTransactionViewComponent } from './views/edit-transaction-view/edit-transaction-view.component';
import { ViewAccountViewComponent } from './views/view-account-view/view-account-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', data: { title: 'McNet' }},
  { path: '', component: HomepageViewComponent, data: { title: 'McNet' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Signup' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'overview', component: OverviewViewComponent, canActivate: [AuthGuard], data: { title: 'Overview' } },
  { path: 'add-account', component: AddAccountViewComponent, canActivate: [AuthGuard] },
  { path: 'edit-account/:id', component: EditAccountViewComponent, canActivate: [AuthGuard] },
  { path: 'add-transaction', component: AddTransactionViewComponent, canActivate: [AuthGuard] },
  { path: 'edit-transaction/:id', component: EditTransactionViewComponent, canActivate: [AuthGuard] },
  { path: 'view-account/:id', component: ViewAccountViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
