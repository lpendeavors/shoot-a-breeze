import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../core/models/projects/project.model';
import { ShotListItem } from '../../../core/models/projects/shot-list-item.models';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project-shot-list',
  templateUrl: './project-shot-list.component.html',
  styleUrls: ['./project-shot-list.component.scss']
})
export class ProjectShotListComponent implements OnInit {

  private modalRef: BsModalRef;

  @Input() project: Project;

  @Output() shotSaved: EventEmitter<any> = new EventEmitter<any>();
  @Output() shotDeleted: EventEmitter<any> = new EventEmitter<any>();

  newShotListItemForm = this.fb.group({
    shotNumber: ['', Validators.compose([Validators.required])],
    subject: ['', Validators.compose([Validators.required])],
    angle: ['', Validators.compose([Validators.required])],
    movement: ['', Validators.compose([Validators.required])],
    equipment: ['', Validators.compose([Validators.required])],
    lens: ['', Validators.compose([Validators.required])],
    sound: ['', Validators.compose([Validators.required])]
  });

  constructor(private fb: FormBuilder, private modalService: BsModalService) { }

  ngOnInit() {
  }

  saveShotListItem(): void {
    if (this.newShotListItemForm.valid) {
      const shotListItem : ShotListItem = {
        shotNumber: this.newShotListItemForm.get('shotNumber').value.toString(),
        subject: this.newShotListItemForm.get('subject').value.toString(),
        angle: this.newShotListItemForm.get('angle').value.toString(),
        movement: this.newShotListItemForm.get('movement').value.toString(),
        equipment: this.newShotListItemForm.get('equipment').value.toString(),
        lens: this.newShotListItemForm.get('lens').value.toString(),
        sound: this.newShotListItemForm.get('sound').value.toString()
      };
      this.shotSaved.emit({shotListItem});
      this.modalRef.hide();
      this.resetNewShotListItemForm();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetNewShotListItemForm();
  }

  private resetNewShotListItemForm(): void {
    this.newShotListItemForm.patchValue({ 'shotNumber': '' });
    this.newShotListItemForm.patchValue({ 'subject': '' });
    this.newShotListItemForm.patchValue({ 'angle': '' });
    this.newShotListItemForm.patchValue({ 'movement': '' });
    this.newShotListItemForm.patchValue({ 'equipment': '' });
    this.newShotListItemForm.patchValue({ 'lens': '' });
    this.newShotListItemForm.patchValue({ 'sound': '' });
  }

}
