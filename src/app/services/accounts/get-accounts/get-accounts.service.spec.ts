import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GetAccountsService } from './get-accounts.service';

describe('GetAccountsService', () => {
  let service: GetAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(GetAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
