import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { VersionService } from './version.service';

describe('VersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: VersionService = TestBed.get(VersionService);
    expect(service).toBeTruthy();
  });
});
