import { TestBed } from '@angular/core/testing';


import { LocalizationService } from './localization.service';
import {TranslateModule} from "@ngx-translate/core";

describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ TranslateModule.forRoot() ] });
    service = TestBed.inject(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
