import { TestBed } from '@angular/core/testing';

import { LocalPersistorBase } from './local-persistor.base';

describe('LocalPersistorBase', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let localPersistorBase: any; // bypass access modifiers

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localPersistorBase = TestBed.inject(LocalPersistorBase);
  });

  it('should be created', () => {
    expect(localPersistorBase).toBeTruthy();
  });

  it('newId should return valid string', () => {
    const id = localPersistorBase.newId();
    expect(id).toBeTruthy();
    expect(id.length).toBeGreaterThan(1);
  });

  it('dateNow should return date now but in ISO format as string', () => {
    const now = new Date();
    spyOn(globalThis, 'Date').and.returnValue(now as unknown as string);
    const dateIsoString = localPersistorBase.dateNow();
    expect(dateIsoString).toBeTruthy();
    expect(dateIsoString).toEqual(now.toISOString());
  });
});
