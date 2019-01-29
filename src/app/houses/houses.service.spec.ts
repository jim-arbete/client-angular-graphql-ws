import { TestBed } from '@angular/core/testing';

import { AllHousesGQL } from './houses.graphql';

describe('HousesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllHousesGQL = TestBed.get(AllHousesGQL);
    expect(service).toBeTruthy();
  });
});
