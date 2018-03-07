import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../shared/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'fpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private snack: MatSnackBar, private router: Router) {
    this.loginForm = fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(authState => console.log(authState),
          error2 => console.log(error2),
        () => console.log('complete'));
  }

  login() {
    const loginModel = this.loginForm.value
    this.authService.login(loginModel.email, loginModel.password)
      .then(() => {
        this.router.navigateByUrl('albums').then(() => this.snack.open('You\'re logged in', '', {
          duration: 2000
        }));
      })
      .catch(error => {
        this.snack.open(error.message, '', {
          duration: 4000
        });
      });
  }
}
