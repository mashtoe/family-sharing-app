import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from './auth/shared/auth.service';

@Component({
  selector: 'fpa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  routes = [
    {route: '/', title: 'Home', icon: 'home'},
    {route: '/albums', title: 'Albums', icon: 'folder'},
    {route: '/login', title: 'Login', icon: 'input'},
    {route: '/signup', title: 'Signup', icon: 'input'}

  ];
  navBarOpen = true;
  mode = 'side';
  watcher: Subscription;

  constructor(media: ObservableMedia, private authService: AuthService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else {
        this.loadDashboardContent();
      }
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.navBarOpen = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }

  loadMobileContent() {
    this.navBarOpen = false;
    this.mode = 'over';
  }

  loadDashboardContent() {
    this.navBarOpen = true;
    this.mode = 'side';

  }
}
