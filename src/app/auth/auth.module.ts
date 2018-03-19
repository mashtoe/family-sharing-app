import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import {AuthService} from './shared/auth.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {AuthGuard} from './shared/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import {LoggedInGuard} from './shared/logged-in.guard';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from '../user/profile/profile.component';
import {UserModule} from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    MatIconModule
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService, AuthGuard, LoggedInGuard]
})
export class AuthModule { }

