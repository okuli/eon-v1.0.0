import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

class RoomJoinDeclinedException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RoomJoinDeclinedException.prototype);
  }
}

// This component is not used

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() agent: any;
  @Input() service: any;
  @Input() guestUser: any;

  constructor() { }
}
