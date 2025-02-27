import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { EvacuationFileSummaryModel } from 'src/app/core/models/evacuation-file-summary.model';
import { EvacueeProfileService } from 'src/app/core/services/evacuee-profile.service';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { FileStatusDefinitionComponent } from 'src/app/shared/components/dialog-components/file-status-definition/file-status-definition.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import * as globalConst from '../../../../core/services/global-constants';

@Component({
  selector: 'app-matched-essfiles',
  templateUrl: './matched-essfiles.component.html',
  styleUrls: ['./matched-essfiles.component.scss']
})
export class MatchedEssfilesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  currentlyOpenedItemIndex = -1;
  essFiles: Array<EvacuationFileSummaryModel>;
  registrantId: string;
  isLoading = false;
  public color = '#169BD5';

  constructor(
    private dialog: MatDialog,
    private evacueeSessionService: EvacueeSessionService,
    private evacueeProfileService: EvacueeProfileService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrantId = this.evacueeSessionService.profileId;
    this.getProfileESSFiles(this.registrantId);
  }

  /**
   * Sets expanded input value for panel
   *
   * @param index
   * @returns
   */
  isExpanded(index: number): boolean {
    return index === 0;
  }

  /**
   * Updates value of openend file index
   *
   * @param itemIndex selected file index
   */
  setOpened(itemIndex: number): void {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  /**
   * Resets the opened file index to default
   *
   * @param itemIndex closed file index
   */
  setClosed(itemIndex: number): void {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  /**
   * Open the dialog with definition of
   * profile status
   */
  openStatusDefinition(): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: FileStatusDefinitionComponent,
        content: 'All'
      },
      height: '650px',
      width: '500px'
    });
  }

  /**
   * Redirects to the ESSFile dashboard to display details of the selected file
   *
   * @param essFileId the essFileID of the selected item
   */
  goToESSFile(essFileId: string): void {
    this.evacueeSessionService.essFileNumber = essFileId;
    this.router.navigate(['/responder-access/search/essfile-dashboard']);
  }

  /**
   * Gets all the matched ESSFile list related to the selected profile Dashboard to be diplayed on the ESSFiles section.
   *
   * @param registrantId the selected registrandID
   */
  private getProfileESSFiles(registrantId: string): void {
    this.isLoading = !this.isLoading;
    this.evacueeProfileService.getProfileFiles(registrantId).subscribe(
      (essFilesArray) => {
        this.essFiles = essFilesArray;
        this.isLoading = !this.isLoading;
      },
      (error) => {
        this.isLoading = !this.isLoading;
        this.alertService.clearAlert();
        this.alertService.setAlert(
          'danger',
          globalConst.getProfileEssFilesError
        );
      }
    );
  }
}
