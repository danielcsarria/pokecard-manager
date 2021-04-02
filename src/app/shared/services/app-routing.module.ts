import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../login/admin/forgot-password/forgot-password.component';
import { LoginComponent } from '../../login/admin/login/login.component';
import { RegisterComponent } from '../../login/admin/register/register.component';
import { VerifyEmailComponent } from '../../login/admin/verify-email/verify-email.component';
import { AuthComponent } from '../../login/auth.component';
import { SearchComponent } from 'src/app/dashboard/search/search.component';
import { SetlistComponent } from 'src/app/dashboard/setlist/setlist.component';
import { CardlistComponent } from 'src/app/dashboard/cardlist/cardlist.component';
import { CardDetailComponent } from 'src/app/dashboard/cardlist/card-detail/card-detail.component';
import { CollectionComponent } from 'src/app/dashboard/collection/collection.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, children: [
    {path: '', component: LoginComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'},
    {path: 'verify-email', component: VerifyEmailComponent, pathMatch: 'full'},
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivateChild:[AuthGuardService], children: [
    {path: '', component: SearchComponent, pathMatch: 'full'},
    {path: 'set-list', component: SetlistComponent, pathMatch: 'full'},
    {path: 'card-list', component: CardlistComponent, pathMatch: 'full'},
    {path: 'card', component: CardDetailComponent, pathMatch: 'full'},
    {path: 'collection', component: CollectionComponent, pathMatch: 'full'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
