import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display-version',
  templateUrl: './display-version.component.html',
  styleUrls: ['./display-version.component.scss']
})
export class DisplayVersionComponent implements OnInit {

  appVersion: String = "";
  constructor() { }

  ngOnInit(): void {
    this.appVersion = environment.appVersion;
  }

}
