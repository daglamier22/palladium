import { TestBed } from '@angular/core/testing';

import { GetTransactionsService } from './get-transactions.service';

describe('GetTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTransactionsService = TestBed.get(GetTransactionsService);
    expect(service).toBeTruthy();
  });
});
