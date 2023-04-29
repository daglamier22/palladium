import { TestBed } from '@angular/core/testing';

import { CreateTokenService } from './create-link-token.service';

describe('CreateTokenService', () => {
  let service: CreateTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
