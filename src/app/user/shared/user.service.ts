import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {FileService} from '../../file-system/file.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private afs: AngularFirestore, private fileService: FileService) { }

  getUser(): Observable<User> {
    // s
    // SwitchMap wait for both methods to return their values to prodeed
    // s
    return this.authService.getAuthUser().first()
      .switchMap(authUser => {
        if (!authUser) {
          return new EmptyObservable();
        }
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges().first()
          .map(dbUser => {
            if (dbUser) {
              authUser.username = dbUser.username;
              authUser.firstName = dbUser.firstName;
              authUser.middleName = dbUser.middleName;
              authUser.lastName = dbUser.lastName;
              authUser.img = dbUser.img;
            }
            return authUser;
          });
      });
  }

  getUserWithProfileUrl(): Observable<User> {
    return this.getUser().
      switchMap(user => {
        if (!user || !user.img ) {
          return Observable.create(obs => {
            obs.next(user);
          });
        }
        return this.fileService.downloadUrlProfile(user.uid)
          .map(url => {
            user.profileImgUrl = url;
            return user;
            });
    });
  }

  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
