import { TestBed } from '@angular/core/testing';

import { FoodieApiService } from './foodie-api.service';

describe('FoodieApiService', () => {
  let service: FoodieApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodieApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
