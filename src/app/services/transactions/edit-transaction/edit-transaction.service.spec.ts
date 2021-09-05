import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EditTransactionService } from './edit-transaction.service';

describe('EditTransactionService', () => {
  let service: EditTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(EditTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
