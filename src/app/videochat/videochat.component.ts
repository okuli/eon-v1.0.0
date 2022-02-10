import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-videochat',
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.scss']
})
export class VideoChatComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.room = this.route.snapshot.paramMap.get('room');; // set your room name
    this.user = {
      name: this.route.snapshot.paramMap.get('name') // set your username
    }
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name
      }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // this.api.addEventListeners({
    //   readyToClose: this.handleClose,
    //   participantLeft: this.handleParticipantLeft,
    //   participantJoined: this.handleParticipantJoined,
    //   videoConferenceJoined: this.handleVideoConferenceJoined,
    //   videoConferenceLeft: this.handleVideoConferenceLeft,
    //   audioMuteStatusChanged: this.handleMuteStatus,
    //   videoMuteStatusChanged: this.handleVideoStatus
    // });
  }

}
