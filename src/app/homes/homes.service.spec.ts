import { TestBed } from '@angular/core/testing';

import { AllHomesGQL } from './homes.graphql';

describe('HomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllHomesGQL = TestBed.get(AllHomesGQL);
    expect(service).toBeTruthy();
  });
});
