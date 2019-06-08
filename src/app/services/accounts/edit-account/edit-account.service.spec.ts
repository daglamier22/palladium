import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EditAccountService } from './edit-account.service';

describe('EditAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: EditAccountService = TestBed.get(EditAccountService);
    expect(service).toBeTruthy();
  });
});
