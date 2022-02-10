import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translateService: TranslateService) { }

  public setDefaultLanguage(language: any) {
    this.translateService.setDefaultLang(language);
  }

  public changeCurrentLanguage(language: any) {
    this.translateService.use(language);
  }
}
