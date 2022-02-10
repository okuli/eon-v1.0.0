import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

//Not used

@Component({
  selector: 'app-user-agent',
  templateUrl: './user-agent.component.html',
  styleUrls: ['./user-agent.component.scss']
})
export class UserAgentComponent {

  @Input() agents: any;
  @Input() service: any;
  @Input() guestUser: any;


  constructor() { }




}
