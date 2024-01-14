import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureUnauthorizedComponent } from './feature-unauthorized.component';

describe('FeatureUnauthorizedComponent', () => {
  let component: FeatureUnauthorizedComponent;
  let fixture: ComponentFixture<FeatureUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureUnauthorizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
