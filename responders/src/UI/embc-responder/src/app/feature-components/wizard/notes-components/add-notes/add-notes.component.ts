import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { StepNotesService } from '../../step-notes/step-notes.service';
import * as globalConst from 'src/app/core/services/global-constants';
import { CustomValidationService } from 'src/app/core/services/customValidation.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<boolean>(false);
  notesForm: FormGroup;
  showLoader = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private stepNotesService: StepNotesService,
    private alertService: AlertService,
    private customValidation: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.createNotesForm();
  }

  /**
   * Returns the control of the form
   */
  get verifiedFormControl(): { [key: string]: AbstractControl } {
    return this.notesForm.controls;
  }

  /**
   * Emits the cancel event to close the text box
   */
  cancel(): void {
    this.closeEvent.emit(true);
  }

  /**
   * Save the notes and emits a cancel event to close the text
   * box
   */
  save(): void {
    if (!this.notesForm.valid) {
      this.notesForm.get('note').markAsTouched();
    } else if (this.stepNotesService.selectedNote) {
      this.showLoader = !this.showLoader;
      this.isSubmitted = !this.isSubmitted;
      this.editNote();
    } else {
      this.showLoader = !this.showLoader;
      this.isSubmitted = !this.isSubmitted;
      this.createNote();
    }
  }

  /**
   * Creates the notes
   */
  createNote(): void {
    this.stepNotesService
      .saveNotes(
        this.stepNotesService.createNoteDTO(this.notesForm.get('note').value)
      )
      .subscribe(
        (result) => {
          this.closeEvent.emit(true);
        },
        (error) => {
          this.showLoader = !this.showLoader;
          this.isSubmitted = !this.isSubmitted;
          this.alertService.clearAlert();
          this.alertService.setAlert('danger', globalConst.addNotesError);
        }
      );
  }

  /**
   * Edits the note
   */
  editNote(): void {
    this.stepNotesService
      .editNote(
        this.stepNotesService.createNoteDTO(
          this.notesForm.get('note').value,
          this.stepNotesService.selectedNote.id
        )
      )
      .subscribe(
        (result) => {
          this.closeEvent.emit(true);
        },
        (error) => {
          this.showLoader = !this.showLoader;
          this.isSubmitted = !this.isSubmitted;
          this.alertService.clearAlert();
          this.alertService.setAlert('danger', globalConst.editNotesError);
        }
      );
  }

  /**
   * Creates the note form
   */
  private createNotesForm(): void {
    this.notesForm = this.formBuilder.group({
      note: [
        this.stepNotesService.selectedNote !== undefined
          ? this.stepNotesService.selectedNote.content
          : '',
        [this.customValidation.whitespaceValidator()]
      ]
    });
  }
}
