import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeQuizeComponent } from './take-quize.component';

describe('TakeQuizeComponent', () => {
  let component: TakeQuizeComponent;
  let fixture: ComponentFixture<TakeQuizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeQuizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
