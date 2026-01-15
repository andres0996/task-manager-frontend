/**
 * AppComponent
 *
 * The root component of the application.
 * It serves as the main container and renders the active route via RouterOutlet.
 *
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
