import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EditTransactionService } from './edit-transaction.service';

describe('EditTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: EditTransactionService = TestBed.get(EditTransactionService);
    expect(service).toBeTruthy();
  });
});
