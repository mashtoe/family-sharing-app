import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {AuthService} from '../../auth/shared/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/first';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

  getUser(): Observable<User> {
    // s
    // SwitchMap wait for both methods to return their values to prodeed
    // s
    return this.authService.getAuthUser().first()
      .switchMap(authUser => {
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges().first()
          .map(dbUser => {
            dbUser.uid = authUser.uid;
            dbUser.email = authUser.email;
            return dbUser;
          });
      });
  }

  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
