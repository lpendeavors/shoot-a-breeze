import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreatmentComponent } from './project-treatment.component';

describe('ProjectTreatmentComponent', () => {
  let component: ProjectTreatmentComponent;
  let fixture: ComponentFixture<ProjectTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
