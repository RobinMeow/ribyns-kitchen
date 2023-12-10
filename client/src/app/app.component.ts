import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './core/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    MatSidenavModule,
    MenuComponent,
    HeaderComponent,
  ],
})
export class AppComponent {}
