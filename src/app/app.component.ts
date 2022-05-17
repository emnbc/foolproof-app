import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ITabItem } from './interfaces';

const LINKS: ITabItem[] = [
  {name: 'Files', path: '/files'},
  {name: 'Users', path: '/users'},
  {name: 'Types', path: '/types'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links: ITabItem[] = LINKS;
  activeLink: string = '/';

  constructor(private router: Router) {
    this.router.events
      .subscribe(event => event instanceof NavigationEnd && (this.activeLink = event.urlAfterRedirects));
  }
  
}
