import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementFormComponent } from './announcement-form.component';

describe('AnnouncementFormComponent', () => {
  let component: AnnouncementFormComponent;
  let fixture: ComponentFixture<AnnouncementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
