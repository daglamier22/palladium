import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CreateLinkTokenService } from './create-link-token.service';

describe('CreateLinkTokenService', () => {
  let service: CreateLinkTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(CreateLinkTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
