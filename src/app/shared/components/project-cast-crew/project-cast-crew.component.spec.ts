import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCastCrewComponent } from './project-cast-crew.component';

describe('ProjectCastCrewComponent', () => {
  let component: ProjectCastCrewComponent;
  let fixture: ComponentFixture<ProjectCastCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCastCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCastCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
