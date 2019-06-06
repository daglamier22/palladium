import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddTransactionService } from './add-transaction.service';

describe('AddTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AddTransactionService = TestBed.get(AddTransactionService);
    expect(service).toBeTruthy();
  });
});
