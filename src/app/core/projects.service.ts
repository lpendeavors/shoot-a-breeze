import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Project } from '../core/models/projects/project.model';
import { ProjectCategory } from '../core/models/projects/project-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private PROJECTS_COLLECTION_NAME = 'projects';
  private PROJECT_CATEGORIES_COLLECTION_NAME = 'project-categories';
  
  private PROJECTS_REF = this.db.collection<Project>(this.PROJECTS_COLLECTION_NAME);
  private PROJECTS_CATEGORIES_REF = this.db.collection<ProjectCategory>(this.PROJECT_CATEGORIES_COLLECTION_NAME);

  projects: Observable<Project[]>;
  projectCategories: Observable<ProjectCategory[]>;

  constructor(private db: AngularFirestore) {
    // Add firebase document id to projects
    this.projects = this.PROJECTS_REF.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Project;
        const id = a.payload.doc.id;
        return { id, ...data } as Project;
      }))
    );
    // Add firebase document id to projectCategories
    this.projectCategories = this.PROJECTS_CATEGORIES_REF.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ProjectCategory;
        const id = a.payload.doc.id;
        return { id, ...data } as ProjectCategory;
      }))
    );
  }

  addProject(project: Project): Promise<firebase.firestore.DocumentReference> {
    return this.PROJECTS_REF.add(project);
  }

  updateProject(project:  Project): Promise<void> {
    return this.PROJECTS_REF.doc(project.id).update(project);
  }

  removeProject(project: Project): Promise<void> {
    return this.PROJECTS_REF.doc(project.id).delete();
  }

  getProjectById(projectId: string): Observable<{}> {
    return this.PROJECTS_REF.doc(projectId).snapshotChanges().pipe(
      map(action => {
        return action.payload as DocumentSnapshot<any>;
      })
    );
  }
}
