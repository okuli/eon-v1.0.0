import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Service, } from '@syncpilot/bpool-guest-lib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../app.config';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-connect-call',
  templateUrl: './connect-call.component.html',
  styleUrls: ['./connect-call.component.scss']
})
export class ConnectCallComponent implements OnInit, OnDestroy {

  currentCallStatus = CallStatus.Initial;
  CallStatus = CallStatus;
  agents: any;
  service: any;
  guestUser = {
    firstName: "",
    lastName: ""
  }
  beraterpoolResponse: any;
  selectedAgent: any;
  environmentConfigData: any;
  ownerId: any;
  groupId: any;
  isAgentSelected = false;
  isAgentAcceptRequest = false;
  requestedAgentList: any[] = [];
  timeoutSec = 45

  constructor(public config: AppConfig) {
    this.guestUser.firstName = "VideoTerminal"
    this.guestUser.lastName = `User_${this.generateRandomString()}`;
    this.environmentConfigData = this.config.config
    this.ownerId = this.environmentConfigData?.ownerId;
    this.groupId = this.environmentConfigData?.groupId;
  }

  ngOnInit(): void {
    this.service = new Service();
    this.setupEvent();
  }


  generateRandomString() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    let stringLength = Math.floor(Math.random() * (2 - 1 + 1) + 1)
    for (var i = 0; i < stringLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += Math.floor(Math.random() * (99 - 10 + 1) + 10)
    return result;
  }

  ngOnDestroy() {
    this.abortService();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.abortService();
  }

  abortService() {
    try {
      console.log("Service Abort In Connect Call");
      if (this.service) {
        this.service?.abort();
      }

    } catch (error) {

    }
  }

  async connectAgent() {
    if (this.currentCallStatus == CallStatus.Connecting) {
      return;
    }
    this.currentCallStatus = CallStatus.Connecting;
    await this.connectToService();
    await this.getAgentList();
  }

  async connectToService() {
    this.service.setConfig({
      stompUrl: this.environmentConfigData.stompUrl,
      serverUrlServer: this.environmentConfigData.serverUrlServer,
      fullName: `${this.guestUser.firstName} ${this.guestUser.lastName}`
    });

    let fullName = `${this.guestUser.firstName} ${this.guestUser.lastName}`;

    await this.service.connect(this.ownerId, fullName);


  }


  async getAgentList() {
    try {
      console.log("Getting agent list....");
      const result = await this.service.getActiveConsultants(this.ownerId);
      this.agents = result.configData;
      console.log("Got agent list -> ", this.agents);
      if (this.agents.length) {
        this.connectToAgent(this.agents[0]);
      } else {
        this.currentCallStatus = CallStatus.Failed;
        this.reset();
      }
    } catch (error) {
      this.currentCallStatus = CallStatus.Failed;
      this.reset();
    }
  }

  reset() {
    let intervalObj = setInterval(() => {
      if (this.timeoutSec == 0) {
        // this.reloadComponent();
        window.location.reload();

        this.requestedAgentList = [];
        this.timeoutSec = 45;
        clearInterval(intervalObj);
      } else {
        this.timeoutSec -= 1;
      }
    }, 1000);
  }

  setupEvent() {
    this.service.onRedirect.subscribe((response: any) => {
      if (response.state == 'accepted') {
        this.beraterpoolResponse = response;
        console.log("Requested Accepted : ", response);
        this.currentCallStatus = CallStatus.Connected;
        this.isAgentAcceptRequest = true;
      } else if (response.state == 'declined' || response.state == "timeouted" || response.state == "aborted" || response.state == "invalid" || response.state == "killed") {
        console.log("Requested Declined : ", response);
        this.isAgentSelected = false;
        this.isAgentAcceptRequest = false;
        this.selectedAgent = null;
        // this.reloadComponent();
        window.location.reload();
        // this.currentCallStatus = CallStatus.Initial;
        // this.getAgentList();
      } else if (response.state == 'requested' || response.state == 'prerequest' || response.state == 'extended') {
        console.log("Requested : ", response);
      }
    });
  }

  connectToAgent(agent: any) {
    if (this.isAgentSelected) {
      return;
    }
    console.log("Requesting agent to connect...");
    this.isAgentSelected = true;
    this.selectedAgent = agent;
    this.service.enterQueue(this.createGuestInfo(this.guestUser.firstName, this.guestUser.lastName, 'd'), this.groupId);

  }

  createGuestInfo(firstName: string, lastName: string, gender: 'm' | 'w' | 'd') {
    console.log("Creating guest user...");
    return {
      firstName: firstName,
      name: lastName,
      gender: gender,
      additionalGuestInformation: new Map<string, string>()
    }
  }

  reloadComponent() {
    window.location.reload();
  }
}

export enum CallStatus {
  Initial = 1,
  Connecting,
  Connected,
  Failed,
}
