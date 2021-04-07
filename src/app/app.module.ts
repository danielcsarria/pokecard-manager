import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './shared/services/app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './login/auth.component';
import { LoginComponent } from './login/admin/login/login.component';
import { RegisterComponent } from './login/admin/register/register.component';
import { ForgotPasswordComponent } from './login/admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/admin/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';



import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule,  ReactiveFormsModule, } from '@angular/forms';
import { NavComponent } from './dashboard/nav/nav.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SetlistComponent } from './dashboard/setlist/setlist.component';
import { SetCardComponent } from './dashboard/setlist/set-card/set-card.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { CardlistComponent } from './dashboard/cardlist/cardlist.component';
import { CardComponent } from './dashboard/cardlist/card/card.component';
import { CardDetailComponent } from './dashboard/cardlist/card-detail/card-detail.component';
import { CollectionComponent } from './dashboard/collection/collection.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    SetlistComponent,
    SetCardComponent,
    FilterPipe,
    CardlistComponent,
    CardComponent,
    CardDetailComponent,
    CollectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
