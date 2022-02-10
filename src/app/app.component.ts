import { Component } from '@angular/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vTerminal';

  constructor(
    private localizationService: LocalizationService) {
    this.localizationService.setDefaultLanguage("en");
  }
}
