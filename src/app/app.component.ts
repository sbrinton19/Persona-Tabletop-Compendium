import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Persona Tabletop Compendium';
  opened = false;
  color = '';
  openCloseSubNav() {
    this.opened = !this.opened;
    if (this.opened) {
      this.color = '#111';
    } else {
      this.color = '';
    }
  }
}
