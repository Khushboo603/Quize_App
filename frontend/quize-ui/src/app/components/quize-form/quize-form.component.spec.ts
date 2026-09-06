import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizeFormComponent } from './quize-form.component';

describe('QuizeFormComponent', () => {
  let component: QuizeFormComponent;
  let fixture: ComponentFixture<QuizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
