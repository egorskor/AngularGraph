import { TestBed, inject } from '@angular/core/testing';

import { PrecipitationService } from './precipitation.service';

describe('PrecipitationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrecipitationService]
    });
  });

  it('should be created', inject([PrecipitationService], (service: PrecipitationService) => {
    expect(service).toBeTruthy();
  }));
});
