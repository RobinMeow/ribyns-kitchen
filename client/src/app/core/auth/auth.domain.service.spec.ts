import { TestBed } from '@angular/core/testing';
import { AuthDomainService } from './auth.domain.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
