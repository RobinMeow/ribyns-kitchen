import { TestBed } from '@angular/core/testing';

import { JwtDecoderService } from './jwt-decoder.service';

describe('JwtDecoderService should', () => {
  let service: JwtDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDecoderService);
  });

  it('be created', () => {
    expect(service).toBeTruthy();
  });

  it('throw on invalid JWT', () => {
    expect(() => service.decode('invalid jwt')).toThrow();
  });

  // we are testing a thrird party library here, to behave as expected.
  it('decode valid JWT', () => {
    // valid token copied from https://jwt.io/#debugger-io
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    expect(() => service.decode(validToken)).not.toThrow();
  });
});
