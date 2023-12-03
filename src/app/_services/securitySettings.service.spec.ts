/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecuritySettingsService } from './securitySettings.service';

describe('Service: SecuritySettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecuritySettingsService]
    });
  });

  it('should ...', inject([SecuritySettingsService], (service: SecuritySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
