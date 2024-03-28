import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { AuthCorner } from './auth-corner'
import { AuthService } from '../../utils/auth.service'
import { signal } from '@angular/core'
import { provideRouter } from '@angular/router'

describe('AuthCorner', () => {
  let component: AuthCorner
  let fixture: ComponentFixture<AuthCorner>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCorner, provideRouter([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: {
            isAuthorized() {
              return signal(false)
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AuthCorner)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
