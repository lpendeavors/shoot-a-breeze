import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStoryboardComponent } from './project-storyboard.component';

describe('ProjectStoryboardComponent', () => {
  let component: ProjectStoryboardComponent;
  let fixture: ComponentFixture<ProjectStoryboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStoryboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStoryboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
