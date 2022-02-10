import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Service } from '@syncpilot/bpool-guest-lib';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  constructor(private httpClient: HttpClient) {
  }

  public connectUser() {
    // Added 5 second delay to display loader
    return this.httpClient.get('./../../assets/user.json').pipe(delay(500),
      switchMap((user: any) => {
        // Created random number to generate error message
        // If randomNo greater then 5 then It will return error
        // Otherwise it will return user details
        const randomNo = Math.floor(Math.random() * 10);
        if (false) {
          return throwError("Error From ThrowError observable")
        } else {
          return of(user);
        }

      }))
  }

}
