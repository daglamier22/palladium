import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GetAccountsService } from './get-accounts.service';

describe('GetAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: GetAccountsService = TestBed.get(GetAccountsService);
    expect(service).toBeTruthy();
  });
});
