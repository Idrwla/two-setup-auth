import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SecondauthComponent } from './secondauth/secondauth.component';
import { PageComponent } from './page/page.component';
import { SingupComponent } from './singup/singup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SecondauthComponent,
    PageComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AppComponent, UserService, SecondauthComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
