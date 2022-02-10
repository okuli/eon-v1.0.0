import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-end',
  templateUrl: './call-end.component.html',
  styleUrls: ['./call-end.component.scss']
})
export class CallEndComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/connect-call']);
    }, 10000);
  }

}
