import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEditorComponent } from './events-editor.component';

describe('EventsEditorComponent', () => {
  let component: EventsEditorComponent;
  let fixture: ComponentFixture<EventsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
