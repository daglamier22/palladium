import { TestBed } from '@angular/core/testing';

import { AddAccountsService } from './add-accounts.service';

describe('AddAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAccountsService = TestBed.get(AddAccountsService);
    expect(service).toBeTruthy();
  });
});
