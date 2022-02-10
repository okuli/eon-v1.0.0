import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private keyClockService: KeycloakService) { }


  logout() {
    this.keyClockService.logout();
  }

}
