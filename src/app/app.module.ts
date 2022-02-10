import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { VideoChatComponent } from './videochat/videochat.component';
import { RouterModule, Routes } from "@angular/router";
import { ConnectingComponent } from './connecting/connecting.component';
import { NoAvailableAgentComponent } from './no-available-agent/no-available-agent.component';
import { StartConsultationComponent } from './start-consultation/start-consultation.component';
import { ConnectCallComponent } from './connect-call/connect-call.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserAgentComponent } from './user-agent/user-agent.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAgentDetailsComponent } from './user-agent-details/user-agent-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallEndComponent } from './call-end/call-end.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DisplayVersionComponent } from './display-version/display-version.component';
import { LocalizationService } from "./services/localization.service";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: '', redirectTo: 'connect-call', pathMatch: 'full' },
  { path: 'no-available-agent', component: NoAvailableAgentComponent },
  { path: 'start-consultation', component: StartConsultationComponent },
  { path: 'connecting', component: ConnectingComponent },
  { path: 'videochat/:room/:name', component: VideoChatComponent },
  { path: 'connect-call', component: ConnectCallComponent },
  { path: 'call-end', component: CallEndComponent },
  { path: 'app-version', component: DisplayVersionComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
]

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    NoAvailableAgentComponent,
    StartConsultationComponent,
    ConnectingComponent,
    VideoChatComponent,
    ConnectCallComponent,
    UserAgentComponent,
    UserDetailsComponent,
    UserAgentDetailsComponent,
    CallEndComponent,
    DisplayVersionComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule
  ],
  providers: [
    AppConfig,
    LocalizationService,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
