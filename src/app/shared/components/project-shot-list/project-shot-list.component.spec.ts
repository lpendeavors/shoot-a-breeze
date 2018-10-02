import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShotListComponent } from './project-shot-list.component';

describe('ProjectShotListComponent', () => {
  let component: ProjectShotListComponent;
  let fixture: ComponentFixture<ProjectShotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectShotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectShotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
