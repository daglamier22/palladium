import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddAccountService } from './add-account.service';

describe('AddAccountsService', () => {
  let service: AddAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AddAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
