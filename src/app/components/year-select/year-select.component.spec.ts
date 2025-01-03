import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectComponent } from './year-select.component';

describe('YearSelectComponent', () => {
  let component: YearSelectComponent;
  let fixture: ComponentFixture<YearSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
