import { Component, OnInit, Input, Output, OnChanges, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../core/models/projects/project.model';
import { Character } from '../../../core/models/characters/character.model';
import { CastMember } from '../../../core/models/projects/cast-member.model';
import { CrewMember } from '../../../core/models/projects/crew-member.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project-cast-crew',
  templateUrl: './project-cast-crew.component.html',
  styleUrls: ['./project-cast-crew.component.scss']
})
export class ProjectCastCrewComponent implements OnInit, OnChanges {

  private modalRef: BsModalRef;

  @Input() project: Project;

  castMembers: CastMember[] = [];
  crewMembers: CrewMember[] = [];
  characters: Character[] = [];

  @Output() castUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() crewUpdated: EventEmitter<any> = new EventEmitter<any>();

  newCastMemberForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    character: [null, Validators.compose([Validators.required])]
  });

  newCrewMemberForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    responsibility: ['', Validators.compose([Validators.required])]
  });

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.populateCharacters();
    this.castMembers = this.project.cast ? this.project.cast : [];
    this.crewMembers = this.project.crew ? this.project.crew : [];
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetNewCastMemberForm();
    this.resetNewCrewMemberForm();
  }

  saveCastMember(): void {
    if (this.newCastMemberForm.valid) {
      const castMember: CastMember = {
        name: this.newCastMemberForm.get('name').value.toString(),
        character: this.newCastMemberForm.get('character').value as Character
      };
      this.castUpdated.emit({castMember});
      this.modalRef.hide();
      this.resetNewCastMemberForm();
    }
  }

  saveCrewMember(): void {
    if (this.newCrewMemberForm.valid) {
      const crewMember: CrewMember = {
        name: this.newCrewMemberForm.get('name').value.toString(),
        responsibility: this.newCrewMemberForm.get('responsibility').value.toString()
      };
      this.crewUpdated.emit({crewMember});
      this.modalRef.hide();
      this.resetNewCrewMemberForm();
    }
  }

  private populateCharacters(): void {
    this.characters = [];
    if (this.project.treatment) {
      if (this.project.treatment.characters) {
        this.project.treatment.characters.forEach(c => {
          this.characters.push(c);
        });
      }
    }
  }

  private resetNewCastMemberForm(): void {
    this.newCastMemberForm.patchValue({ name: '' });
    this.newCastMemberForm.patchValue({ character: '' });
  }

  private resetNewCrewMemberForm(): void {
    this.newCrewMemberForm.patchValue({ name: '' });
    this.newCrewMemberForm.patchValue({ responsibility: '' });
  }

}
