import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CreateItemService } from './create-item.service';

describe('CreateItemService', () => {
  let service: CreateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(CreateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
