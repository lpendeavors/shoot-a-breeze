import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Project } from '../../../core/models/projects/project.model';
import { ProjectTreatment } from '../../../core/models/projects/project-treatment.model';
import { Character } from '../../../core/models/characters/character.model';
import { ShootLocation } from '../../../core/models/locations/shoot-location.model';
import { VisualElement } from '../../../core/models/visual-elements/visual-element.model';
import { AudioElement } from '../../../core/models/audio-elements/audio-element.model';

@Component({
  selector: 'app-project-treatment',
  templateUrl: './project-treatment.component.html',
  styleUrls: ['./project-treatment.component.scss']
})
export class ProjectTreatmentComponent implements OnInit, OnChanges {

  private modalRef: BsModalRef;

  @Input() project: Project;
  @Output() treatmentSaved: EventEmitter<any> = new EventEmitter<any>();

  characters: Character[] = [];
  locations: ShootLocation[] = [];
  visualElements: VisualElement[] = [];
  audioElements: AudioElement[] = [];

  projectTreatmentForm = this.fb.group({
    logline: ['', Validators.compose([Validators.required])],
    synopsis: ['', Validators.compose([Validators.required])],
    targetAudience: ['', Validators.compose([Validators.required])]
  });

  newCharacterForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    background: ['']
  });

  newLocationForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    notes: ['']
  });

  newVisualElementForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    notes: ['']
  });

  newAudioElementForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    notes: ['']
  });

  constructor(private fb: FormBuilder, private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.project.treatment) {
      this.projectTreatmentForm.patchValue({ 'logline': this.project.treatment.logline });
      this.projectTreatmentForm.patchValue({ 'synopsis': this.project.treatment.synopsis });
      this.projectTreatmentForm.patchValue({ 'targetAudience': this.project.treatment.targetAudience });
      if (this.project.treatment.characters) {
        this.characters = [];
        this.project.treatment.characters.forEach(character => {
          this.characters.push(character);
        });
      }
      if (this.project.treatment.locations) {
        this.locations = [];
        this.project.treatment.locations.forEach(location => {
          this.locations.push(location);
        });
      }
      if (this.project.treatment.visualElements) {
        this.visualElements = [];
        this.project.treatment.visualElements.forEach(visualElement => {
          this.visualElements.push(visualElement);
        });
      }
      if (this.project.treatment.audioElements) {
        this.audioElements = [];
        this.project.treatment.audioElements.forEach(audioElement => {
          this.audioElements.push(audioElement);
        });
      }
    }
  }

  showAddCharacterModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addCharacter(): void {
    if (this.newCharacterForm.valid) {
      const character: Character = {
        name: this.newCharacterForm.get('name').value.toString()
      };
      if (this.newCharacterForm.get('background').value.toString().length > 0) {
        character.background = this.newCharacterForm.get('background').value.toString();
      };
      this.characters.push(character);
      this.modalRef.hide();
      this.resetNewCharacterForm();
    }
  }

  showAddLocationModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addLocation(): void {
    if (this.newLocationForm.valid) {
      const location: ShootLocation = {
        name: this.newLocationForm.get('name').value.toString()
      };
      if (this.newLocationForm.get('notes').value.toString().length > 0) {
        location.notes = this.newLocationForm.get('notes').value.toString();
      }
      this.locations.push(location);
      this.modalRef.hide();
      this.resetNewLocationForm();
    }
  }

  showAddVisualElementModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addVisualElement(): void {
    if (this.newVisualElementForm.valid) {
      const visualElement: VisualElement = {
        name: this.newVisualElementForm.get('name').value.toString()
      };
      if (this.newVisualElementForm.get('notes').value.toString().length > 0) {
        visualElement.notes = this.newVisualElementForm.get('notes').value.toString();
      }
      this.visualElements.push(visualElement);
      this.modalRef.hide();
      this.resetNewVisualElementForm();
    }
  }

  showAddAudioElementModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addAudioElement(): void {
    if (this.newAudioElementForm.valid) {
      const audioElement: AudioElement = {
        name: this.newAudioElementForm.get('name').value.toString()
      };
      if (this.newAudioElementForm.get('notes').value.toString().length > 0) {
        audioElement.notes = this.newAudioElementForm.get('notes').value.toString();
      }
      this.audioElements.push(audioElement);
      this.modalRef.hide();
      this.resetNewAudioelementForm();
    }
  }

  cancelModal(): void {
    this.modalRef.hide();
    this.modalRef = null;
    this.resetNewCharacterForm();
    this.resetNewLocationForm();
    this.resetNewVisualElementForm();
    this.resetNewAudioelementForm();
  }

  saveTreatment(): void {
    if (this.projectTreatmentForm.valid) {
      const treatment: ProjectTreatment = {
        logline: this.projectTreatmentForm.get('logline').value.toString(),
        synopsis: this.projectTreatmentForm.get('synopsis').value.toString(),
        targetAudience: this.projectTreatmentForm.get('targetAudience').value.toString()
      };
      if (this.characters.length > 0) {
        treatment.characters = this.characters;
      }
      if (this.locations.length > 0) {
        treatment.locations = this.locations;
      }
      if (this.visualElements.length > 0) {
        treatment.visualElements = this.visualElements;
      }
      if (this.audioElements.length > 0) {
        treatment.audioElements = this.audioElements;
      }
      this.treatmentSaved.emit({treatment});
    }
  }

  private resetNewCharacterForm(): void {
    this.newCharacterForm.patchValue({ 'name': '' });
    this.newCharacterForm.patchValue({ 'background': '' });
  }

  private resetNewLocationForm(): void {
    this.newLocationForm.patchValue({ 'name': '' });
    this.newLocationForm.patchValue({ 'notes': '' });
  }

  private resetNewVisualElementForm(): void {
    this.newVisualElementForm.patchValue({ 'name': '' });
    this.newVisualElementForm.patchValue({ 'notes': '' });
  }

  private resetNewAudioelementForm(): void {
    this.newAudioElementForm.patchValue({ 'name': '' });
    this.newAudioElementForm.patchValue({ 'notes': '' });
  }

}