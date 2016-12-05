/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SerialNumberVerificationService } from './serial-number-verification.service';

describe('Service: SerialNumberVerification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerialNumberVerificationService]
    });
  });

  it('should ...', inject([SerialNumberVerificationService], (service: SerialNumberVerificationService) => {
    expect(service).toBeTruthy();
  }));
});
