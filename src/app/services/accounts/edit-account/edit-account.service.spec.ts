import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EditAccountService } from './edit-account.service';

describe('EditAccountService', () => {
  let service: EditAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(EditAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
