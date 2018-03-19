import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AlbumsListComponent} from './albums/albums-list/albums-list.component';
import {AuthModule} from './auth/auth.module';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/shared/auth-guard.service';
import {SignupComponent} from './auth/signup/signup.component';
import {LoggedInGuard} from './auth/shared/logged-in.guard';
import {ProfileComponent} from './user/profile/profile.component';
import {UserModule} from './user/user.module';

const routes: Routes = [
  { path: 'albums', component: AlbumsListComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedInGuard]},
  { path: '', redirectTo: '/albums', pathMatch: 'full'}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule,
    UserModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
