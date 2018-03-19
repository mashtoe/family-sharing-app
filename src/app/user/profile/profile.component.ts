import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../shared/user';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'fpa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User;
  userSub: Subscription;

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.userSub = this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  unchanged(){

  }

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
    this.userService.update(model)
      .then(() => console.log('saved'))
      .catch(err => console.log('error', err));
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(ec);
  }

}
