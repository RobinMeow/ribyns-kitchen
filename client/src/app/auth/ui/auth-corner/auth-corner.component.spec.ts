import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthCornerComponent } from './auth-corner.component';

describe('AuthCornerComponent', () => {
  let component: AuthCornerComponent;
  let fixture: ComponentFixture<AuthCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCornerComponent, RouterTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
