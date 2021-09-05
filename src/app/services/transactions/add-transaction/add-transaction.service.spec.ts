import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddTransactionService } from './add-transaction.service';

describe('AddTransactionService', () => {
  let service: AddTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AddTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
