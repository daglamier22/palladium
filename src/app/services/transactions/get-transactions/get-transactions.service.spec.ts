import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GetTransactionsService } from './get-transactions.service';

describe('GetTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: GetTransactionsService = TestBed.get(GetTransactionsService);
    expect(service).toBeTruthy();
  });
});
