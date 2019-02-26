import { TestBed } from '@angular/core/testing';

import { GetAccountsService } from './get-accounts.service';

describe('GetAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAccountsService = TestBed.get(GetAccountsService);
    expect(service).toBeTruthy();
  });
});
