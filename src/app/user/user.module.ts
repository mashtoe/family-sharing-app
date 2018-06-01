import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './shared/user.service';
import {ProfileComponent} from './profile/profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileSystemModule} from '../file-system/file-system.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    MatIconModule,
    AngularFirestoreModule,
    SharedModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FileSystemModule,
    MatProgressSpinnerModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService]
})
export class UserModule { }
