import { Component, OnInit, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from '../../../core/models/projects/project.model';
import { ShotListItem } from '../../../core/models/projects/shot-list-item.models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-project-storyboard',
  templateUrl: './project-storyboard.component.html',
  styleUrls: ['./project-storyboard.component.scss']
})
export class ProjectStoryboardComponent implements OnInit {

  private modalRef: BsModalRef;

  @Input() project: Project;
  @Output() storyboardUpdated: EventEmitter<any> = new EventEmitter<any>();

  selectedShot: ShotListItem;
  selectedImage: any;
  imageUploadPercent: Observable<number>;
  imageDownloadURL: Observable<string>;
  imageURLSubscription: Subscription;

  newShotImageForm = this.fb.group({
    image: [''],
    notes: ['']
  });

  constructor(private modalService: BsModalService, private fb: FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  saveImage(): void {
    const filePath = `${this.selectedShot.shotNumber}-${this.project.title}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(this.selectedImage);
    this.imageUploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.imageDownloadURL = fileRef.getDownloadURL();
        this.imageURLSubscription = this.imageDownloadURL.subscribe(url => {
          this.newShotImageForm.patchValue({ 'image': url });
          if (this.newShotImageForm.valid) {
            this.selectedShot.image = this.newShotImageForm.get('image').value.toString();
            if (this.newShotImageForm.get('notes').value.toString().length > 0) {
              this.selectedShot.notes = this.newShotImageForm.get('notes').value.toString();
            }
            const shotIndex = this.project.shotList.indexOf(this.selectedShot);
            const updatedShotList = this.project.shotList;
            updatedShotList[shotIndex] = this.selectedShot;
            this.storyboardUpdated.emit({updatedShotList});
            this.modalRef.hide();
            this.resetNewShotImageForm();
            this.selectedImage = null;
            this.imageURLSubscription.unsubscribe();
          }
        });
      })
    ).subscribe();
  }

  onImageAdded(event: any): void {
    const files = event.srcElement.files;
    if (files[0]) {
      this.selectedImage = files[0];
    }
  }

  showModal(template: TemplateRef<any>, shot: ShotListItem): void {
    this.selectedShot = shot;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  closeModal(): void {
    this.selectedImage = null;
    this.modalRef.hide();
    this.resetNewShotImageForm();
  }

  private resetNewShotImageForm(): void {
    this.newShotImageForm.patchValue({ 'image': '' });
    this.newShotImageForm.patchValue({ 'notes': '' });
  }

}