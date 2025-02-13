import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ClothingReferral,
  FoodGroceriesReferral,
  FoodRestaurantReferral,
  IncidentalsReferral,
  Support,
  TransportationTaxiReferral,
  TransportationOtherReferral,
  LodgingHotelReferral,
  LodgingBilletingReferral,
  LodgingGroupReferral,
  Referral,
  NeedsAssessment
} from 'src/app/core/api/models';
import { StepSupportsService } from '../../step-supports/step-supports.service';
import * as globalConst from '../../../../core/services/global-constants';
import { AddressModel } from 'src/app/core/models/address.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ViewAssessmentDialogComponent } from 'src/app/shared/components/dialog-components/view-assessment-dialog/view-assessment-dialog.component';
import { EvacuationFileModel } from 'src/app/core/models/evacuation-file.model';
import { VoidReferralDialogComponent } from 'src/app/shared/components/dialog-components/void-referral-dialog/void-referral-dialog.component';
import { ReprintReferralDialogComponent } from 'src/app/shared/components/dialog-components/reprint-referral-dialog/reprint-referral-dialog.component';
import { ExistingSupportDetailsService } from './existing-support-details.service';
import { InformationDialogComponent } from 'src/app/shared/components/dialog-components/information-dialog/information-dialog.component';
import { ReferralCreationService } from '../../step-supports/referral-creation.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';

@Component({
  selector: 'app-existing-support-details',
  templateUrl: './existing-support-details.component.html',
  styleUrls: ['./existing-support-details.component.scss']
})
export class ExistingSupportDetailsComponent implements OnInit {
  selectedSupport: Support;
  needsAssessmentForSupport: EvacuationFileModel;
  isLoading = false;
  color = '#169BD5';

  constructor(
    private router: Router,
    public stepSupportsService: StepSupportsService,
    private dialog: MatDialog,
    private existingSupportService: ExistingSupportDetailsService,
    private referralCreationService: ReferralCreationService,
    private alertService: AlertService,
    private evacueeSessionService: EvacueeSessionService
  ) {}

  ngOnInit(): void {
    this.selectedSupport = this.stepSupportsService.selectedSupportDetail;
    console.log(this.selectedSupport);
    this.getNeedsAssessment();
  }

  back() {
    this.router.navigate(['/ess-wizard/add-supports/view']);
  }

  getNeedsAssessment() {
    this.isLoading = !this.isLoading;
    this.stepSupportsService
      .getEvacFile(this.evacueeSessionService.essFileNumber) //this.selectedSupport?.needsAssessmentId
      .subscribe(
        (value) => {
          this.isLoading = !this.isLoading;
          this.needsAssessmentForSupport = value;
          console.log(value);
        },
        (error) => {
          this.isLoading = !this.isLoading;
          this.alertService.clearAlert();
          this.alertService.setAlert(
            'danger',
            globalConst.supportNeedsAssessmentError
          );
        }
      );
  }

  checkGroceryMaxRate(): boolean {
    const maxRate =
      globalConst.groceriesRate.rate *
      (this.selectedSupport as FoodGroceriesReferral).numberOfDays;
    return maxRate < (this.selectedSupport as FoodGroceriesReferral).totalAmount
      ? false
      : true;
  }

  checkIncidentalMaxRate(): boolean {
    const maxRate =
      globalConst.incidentals.rate *
      (this.selectedSupport as IncidentalsReferral).includedHouseholdMembers
        .length;
    return maxRate < (this.selectedSupport as IncidentalsReferral).totalAmount
      ? false
      : true;
  }

  checkClothingMaxRate(): boolean {
    const rate = (this.selectedSupport as ClothingReferral)
      .extremeWinterConditions
      ? globalConst.extremeConditions.rate
      : globalConst.normalConditions.rate;
    const maxRate =
      rate *
      (this.selectedSupport as ClothingReferral).includedHouseholdMembers
        .length;
    return maxRate < (this.selectedSupport as IncidentalsReferral).totalAmount
      ? false
      : true;
  }

  get groceryReferral(): FoodGroceriesReferral {
    return this.selectedSupport as FoodGroceriesReferral;
  }

  get mealReferral(): FoodRestaurantReferral {
    return this.selectedSupport as FoodRestaurantReferral;
  }

  get taxiReferral(): TransportationTaxiReferral {
    return this.selectedSupport as TransportationTaxiReferral;
  }

  get otherReferral(): TransportationOtherReferral {
    return this.selectedSupport as TransportationOtherReferral;
  }

  get hotelReferral(): LodgingHotelReferral {
    return this.selectedSupport as LodgingHotelReferral;
  }

  get billetingReferral(): LodgingBilletingReferral {
    return this.selectedSupport as LodgingBilletingReferral;
  }

  get groupReferral(): LodgingGroupReferral {
    return this.selectedSupport as LodgingGroupReferral;
  }

  get incidentalReferral(): IncidentalsReferral {
    return this.selectedSupport as IncidentalsReferral;
  }

  get clothingReferral(): ClothingReferral {
    return this.selectedSupport as ClothingReferral;
  }

  get referral(): Referral {
    return this.selectedSupport as Referral;
  }

  get supplierAddress(): AddressModel {
    return this.referral?.supplierAddress as AddressModel;
  }

  openAssessment(): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: ViewAssessmentDialogComponent,
        profileData: this.needsAssessmentForSupport
      },
      height: '650px',
      width: '720px'
    });
  }

  voidReferral(): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          component: VoidReferralDialogComponent,
          profileData: this.selectedSupport.id
        },
        height: '550px',
        width: '720px'
      })
      .afterClosed()
      .subscribe((reason) => {
        this.existingSupportService
          .voidSupport(
            this.needsAssessmentForSupport.id,
            this.selectedSupport.id,
            reason
          )
          .subscribe(
            (value) => {
              const stateIndicator = { action: 'void' };
              this.router.navigate(['/ess-wizard/add-supports/view'], {
                state: stateIndicator
              });
            },
            (error) => {
              this.alertService.clearAlert();
              this.alertService.setAlert(
                'danger',
                globalConst.voidReferralError
              );
            }
          );
      });
  }

  reprint(): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          component: ReprintReferralDialogComponent,
          profileData: this.selectedSupport.id
        },
        height: '550px',
        width: '720px'
      })
      .afterClosed()
      .subscribe((reason) => {
        this.isLoading = !this.isLoading;
        this.existingSupportService
          .reprintSupport(
            this.needsAssessmentForSupport.id,
            this.selectedSupport.id,
            reason
          )
          .subscribe(
            (value) => {
              const blob = value;
              const url = window.URL.createObjectURL(blob);
              window.open(url, '_blank');
              this.isLoading = !this.isLoading;
            },
            (error) => {
              this.isLoading = !this.isLoading;
              this.alertService.clearAlert();
              this.alertService.setAlert(
                'danger',
                globalConst.reprintReferralError
              );
            }
          );
      });
  }

  mapMemberName(memberId: string): string {
    const memberObject = this.needsAssessmentForSupport?.householdMembers.find(
      (value) => {
        if (value?.id === memberId) {
          return value;
        }
      }
    );
    return memberObject?.lastName + ',' + memberObject?.firstName;
  }

  deleteDraft(): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          component: InformationDialogComponent,
          content: globalConst.deleteDraftMessage
        },
        width: '620px'
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'confirm') {
          const supportType = this.selectedSupport.subCategory
            ? this.selectedSupport.subCategory
            : this.selectedSupport.category;
          this.referralCreationService
            .clearDraftSupports(supportType, this.selectedSupport)
            .subscribe((incomingValue) => {
              const stateIndicator = { action: 'delete' };
              this.router.navigate(['/ess-wizard/add-supports/view'], {
                state: stateIndicator
              });
            });
        }
      });
  }

  editDraft(): void {
    this.existingSupportService.createEditableDraft(
      this.selectedSupport,
      this.needsAssessmentForSupport
    );
    this.router.navigate(['/ess-wizard/add-supports/details'], {
      state: { action: 'edit' }
    });
  }
}
