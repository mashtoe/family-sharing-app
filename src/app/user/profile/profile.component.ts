import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../shared/user';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';
import {state, style, transition, trigger, animate} from "@angular/animations";
import {MatSnackBar} from '@angular/material';
import {FileService} from '../../file-system/file.service';

@Component({
  selector: 'fpa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage', animate('200ms ease-in'))
  ])]
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  img: string;
  srcloaded: boolean;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private snack: MatSnackBar,
              private fileService: FileService) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        this.img = user.profileImgUrl;
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    return model.username === this.user.username &&
      model.firstName === this.user.firstName &&
      model.middleName === this.user.middleName &&
      model.lastName === this.user.lastName;
  }

  uploadNewImage(filelist) {
    if (filelist &&  filelist.length === 1 && ['image/jpeg', 'image/png'].indexOf(filelist.item(0).type) > -1) {
      this.srcloaded = false;
      const file = filelist.item(0);
      const path = 'profile-image/' + this.user.uid;
      this.fileService.upload(path, file).downloadUrl.subscribe(
        url => {
          console.log('url', url);
          this.img = url;
          this.hovering(false);
        }
      );
    } else {
      console.log('wrooooong');
      this.snack.open('You need to drop a single png or jpeg image', null, {
        duration: 4000
      });
      this.hovering(false);
    }
    console.log('hi: ', filelist);
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
