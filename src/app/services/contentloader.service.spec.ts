/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContentloaderService } from './contentloader.service';

describe('Service: Contentloader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentloaderService]
    });
  });

  it('should ...', inject([ContentloaderService], (service: ContentloaderService) => {
    expect(service).toBeTruthy();
  }));
});
