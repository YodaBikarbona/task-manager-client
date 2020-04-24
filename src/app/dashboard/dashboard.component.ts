import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  windowWidth: number;
  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.windowWidth = window.outerWidth;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
    this.navService.appDrawer = this.appDrawer;
  }

  private detectScreenSize() {
    // if (window.outerWidth > 900) {
    //   console.log(window.outerWidth)
    //   this.windowWidth = window.outerWidth;
    //   this.closeMenu();
    // } else {
    //   console.log(window.outerWidth)
    //   this.windowWidth = window.outerWidth;
    //   // const element = document.getElementById('mobileNavigation');
    //   // element.classList.add('show');
    // }
    // console.log('Changed!')
    // // we will write this logic later
  }

  // openMenu() {
  //   const element = document.getElementById('mobileNavigationBackground');
  //   element.classList.add('show');
  //   element.classList.remove('hide');
  // }
  //
  // closeMenu() {
  //   const element = document.getElementById('mobileNavigationBackground');
  //   element.classList.remove('show');
  //   element.classList.add('hide');
  // }

  closeMenu(menuDisplayName: string, drawer) {
    if (menuDisplayName !== 'Admin' && window.innerWidth < 768) {
      drawer.close();
      const element = document.getElementById('menuButton');
      element.classList.remove('cdk-focused');
      element.classList.remove('cdk-program-focused');
    }
  }

  @ViewChild('appDrawer') appDrawer: ElementRef;
  //version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Tasks',
      iconName: 'account_circle',
      route: 'tasks',
    }
  ];
}
