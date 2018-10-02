import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScriptComponent } from './project-script.component';

describe('ProjectScriptComponent', () => {
  let component: ProjectScriptComponent;
  let fixture: ComponentFixture<ProjectScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
