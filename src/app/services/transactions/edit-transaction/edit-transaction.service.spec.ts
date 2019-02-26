import { TestBed } from '@angular/core/testing';

import { EditTransactionService } from './edit-transaction.service';

describe('EditTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditTransactionService = TestBed.get(EditTransactionService);
    expect(service).toBeTruthy();
  });
});
