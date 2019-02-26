import { TestBed } from '@angular/core/testing';

import { EditAccountsService } from './edit-accounts.service';

describe('EditAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditAccountsService = TestBed.get(EditAccountsService);
    expect(service).toBeTruthy();
  });
});
