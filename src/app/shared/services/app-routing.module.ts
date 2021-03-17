import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../login/admin/forgot-password/forgot-password.component';
import { LoginComponent } from '../../login/admin/login/login.component';
import { RegisterComponent } from '../../login/admin/register/register.component';
import { VerifyEmailComponent } from '../../login/admin/verify-email/verify-email.component';
import { AuthComponent } from '../../login/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, children: [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'verify-email', component: VerifyEmailComponent},
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivateChild:[AuthGuardService] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
