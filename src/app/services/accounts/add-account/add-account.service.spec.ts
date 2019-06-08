import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddAccountService } from './add-account.service';
import { AuthService } from '../../auth/auth.service';

describe('AddAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AddAccountService = TestBed.get(AddAccountService);
    expect(service).toBeTruthy();
  });
});
