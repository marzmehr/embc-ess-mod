import { Injectable } from '@angular/core';
import { TabModel } from 'src/app/core/models/tab.model';
import { WizardSidenavModel } from 'src/app/core/models/wizard-sidenav.model';
import * as globalConst from '../../core/services/global-constants';

@Injectable({
  providedIn: 'root'
})
export class WizardDataService {
  private evacueeProfileTabs: Array<TabModel> = [
    {
      label: 'Collection Notice',
      route: 'collection-notice',
      name: 'collection-notice',
      status: 'not-started'
    },
    {
      label: 'Restriction',
      route: 'restriction',
      name: 'restriction',
      status: 'not-started'
    },
    {
      label: 'Evacuee Details',
      route: 'evacuee-details',
      name: 'evacuee-details',
      status: 'incomplete'
    },
    {
      label: 'Address',
      route: 'address',
      name: 'address',
      status: 'not-started'
    },
    {
      label: 'Contact',
      route: 'contact',
      name: 'contact',
      status: 'not-started'
    },
    {
      label: 'Security Questions',
      route: 'security-questions',
      name: 'security-questions',
      status: 'not-started'
    },
    {
      label: 'Review & Save',
      route: 'review',
      name: 'review',
      status: 'not-started'
    }
  ];

  private evacueeEditProfileTabs: Array<TabModel> = [
    {
      label: 'Restriction',
      route: 'restriction',
      name: 'restriction',
      status: 'not-started'
    },
    {
      label: 'Evacuee Details',
      route: 'evacuee-details',
      name: 'evacuee-details',
      status: 'incomplete'
    },
    {
      label: 'Address',
      route: 'address',
      name: 'address',
      status: 'not-started'
    },
    {
      label: 'Contact',
      route: 'contact',
      name: 'contact',
      status: 'not-started'
    },
    {
      label: 'Security Questions',
      route: 'security-questions',
      name: 'security-questions',
      status: 'not-started'
    },
    {
      label: 'Review & Save',
      route: 'review',
      name: 'review',
      status: 'not-started'
    }
  ];

  private essFileTabs: Array<TabModel> = [
    {
      label: 'Evacuation Details',
      route: 'evacuation-details',
      name: 'evacuation-details',
      status: 'not-started'
    },
    {
      label: 'Household Members',
      route: 'household-members',
      name: 'household-members',
      status: 'not-started'
    },
    {
      label: 'Animals',
      route: 'animals',
      name: 'animals',
      status: 'not-started'
    },
    {
      label: 'Needs',
      route: 'needs',
      name: 'needs',
      status: 'not-started'
    },
    {
      label: 'Security Phrase',
      route: 'security-phrase',
      name: 'security-phrase',
      status: 'not-started'
    },
    {
      label: 'Review & Save',
      route: 'review',
      name: 'review',
      status: 'not-started'
    }
  ];

  private newRegistrationMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Create Evacuee Profile',
      route: '/ess-wizard/evacuee-profile',
      isLocked: false,
      incompleteMsg: globalConst.evacueeProfileStepIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-profile.svg',
        altSrc: '/assets/images/wizard/profile.svg',
        height: '26',
        width: '26'
      }
    },
    {
      step: 'STEP 2',
      title: 'Create ESS File',
      route: '/ess-wizard/ess-file',
      isLocked: true,
      incompleteMsg: globalConst.essFileStepIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-ess-file.svg',
        altSrc: '/assets/images/wizard/ess-file.svg',
        height: '29',
        width: '28'
      }
    },
    {
      step: 'STEP 3',
      title: 'Add Supports',
      route: '/ess-wizard/add-supports',
      isLocked: true,
      incompleteMsg: globalConst.supportIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-supports.svg',
        altSrc: '/assets/images/wizard/supports.svg',
        height: '33',
        width: '33'
      }
    },
    {
      step: 'NOTES',
      title: 'Add Case Notes',
      route: '/ess-wizard/add-notes',
      isLocked: true,
      img: {
        imgSrc: '/assets/images/wizard/locked-notes.svg',
        altSrc: '/assets/images/wizard/notes.svg',
        height: '42',
        width: '42'
      }
    }
  ];

  private newESSFileMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Create ESS File',
      route: '/ess-wizard/ess-file',
      isLocked: false,
      incompleteMsg: globalConst.essFileStepIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-ess-file.svg',
        altSrc: '/assets/images/wizard/ess-file.svg',
        height: '29',
        width: '28'
      }
    },
    {
      step: 'STEP 2',
      title: 'Add Supports',
      route: '/ess-wizard/add-supports',
      isLocked: true,
      incompleteMsg: globalConst.supportIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-supports.svg',
        altSrc: '/assets/images/wizard/supports.svg',
        height: '33',
        width: '33'
      }
    },
    {
      step: 'NOTES',
      title: 'Add Case Notes',
      route: '/ess-wizard/add-notes',
      isLocked: true,
      img: {
        imgSrc: '/assets/images/wizard/locked-notes.svg',
        altSrc: '/assets/images/wizard/notes.svg',
        height: '42',
        width: '42'
      }
    }
  ];

  private editProfileMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Edit Evacuee Profile',
      route: '/ess-wizard/evacuee-profile',
      isLocked: false,
      img: {
        imgSrc: '/assets/images/wizard/locked-profile.svg',
        altSrc: '/assets/images/wizard/profile.svg',
        height: '26',
        width: '26'
      }
    }
  ];

  private membersProfileMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Create Evacuee Profile',
      route: '/ess-wizard/evacuee-profile',
      isLocked: false,
      img: {
        imgSrc: '/assets/images/wizard/locked-profile.svg',
        altSrc: '/assets/images/wizard/profile.svg',
        height: '26',
        width: '26'
      }
    }
  ];

  private reviewESSFileMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Review ESS File',
      route: '/ess-wizard/ess-file',
      isLocked: false,
      incompleteMsg: globalConst.essFileStepIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-ess-file.svg',
        altSrc: '/assets/images/wizard/ess-file.svg',
        height: '29',
        width: '28'
      }
    },
    {
      step: 'STEP 2',
      title: 'Add Supports',
      route: '/ess-wizard/add-supports',
      isLocked: true,
      incompleteMsg: globalConst.supportIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-supports.svg',
        altSrc: '/assets/images/wizard/supports.svg',
        height: '33',
        width: '33'
      }
    },
    {
      step: 'NOTES',
      title: 'Add Case Notes',
      route: '/ess-wizard/add-notes',
      isLocked: true,
      img: {
        imgSrc: '/assets/images/wizard/locked-notes.svg',
        altSrc: '/assets/images/wizard/notes.svg',
        height: '42',
        width: '42'
      }
    }
  ];

  private completeESSFileMenu: Array<WizardSidenavModel> = [
    {
      step: 'STEP 1',
      title: 'Complete ESS File',
      route: '/ess-wizard/ess-file',
      isLocked: false,
      incompleteMsg: globalConst.essFileStepIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-ess-file.svg',
        altSrc: '/assets/images/wizard/ess-file.svg',
        height: '29',
        width: '28'
      }
    },
    {
      step: 'STEP 2',
      title: 'Add Supports',
      route: '/ess-wizard/add-supports',
      isLocked: true,
      incompleteMsg: globalConst.supportIncompleteMessage,
      img: {
        imgSrc: '/assets/images/wizard/locked-supports.svg',
        altSrc: '/assets/images/wizard/supports.svg',
        height: '33',
        width: '33'
      }
    },
    {
      step: 'NOTES',
      title: 'Add Case Notes',
      route: '/ess-wizard/add-notes',
      isLocked: true,
      img: {
        imgSrc: '/assets/images/wizard/locked-notes.svg',
        altSrc: '/assets/images/wizard/notes.svg',
        height: '42',
        width: '42'
      }
    }
  ];

  /**
   * Creates new registration menu
   *
   * @returns side menu array
   */
  public createNewRegistrationMenu(): Array<WizardSidenavModel> {
    const newRegMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.newRegistrationMenu) {
      newRegMenu.push({ ...menuItems, ...menu });
    }
    return newRegMenu;
  }

  /**
   * Creates edit profile menu
   *
   * @returns side menu array
   */
  public createEditProfileMenu(): Array<WizardSidenavModel> {
    const editProfileMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.editProfileMenu) {
      editProfileMenu.push({ ...menuItems, ...menu });
    }
    return editProfileMenu;
  }

  /**
   * Creates edit profile menu
   *
   * @returns side menu array
   */
  public createMembersProfileMenu(): Array<WizardSidenavModel> {
    const membersProfileMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.membersProfileMenu) {
      membersProfileMenu.push({ ...menuItems, ...menu });
    }
    return membersProfileMenu;
  }

  /**
   * Creates new ess file menu
   *
   * @returns side menu array
   */
  public createNewESSFileMenu(): Array<WizardSidenavModel> {
    const newEssMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.newESSFileMenu) {
      newEssMenu.push({ ...menuItems, ...menu });
    }
    return newEssMenu;
  }

  /**
   * Creates review file menu
   *
   * @returns side menu array
   */
  public createReviewFileMenu(): Array<WizardSidenavModel> {
    const reviewFileMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.reviewESSFileMenu) {
      reviewFileMenu.push({ ...menuItems, ...menu });
    }
    return reviewFileMenu;
  }

  /**
   * Creates review file menu
   *
   * @returns side menu array
   */
  public createCompleteFileMenu(): Array<WizardSidenavModel> {
    const reviewFileMenu: Array<WizardSidenavModel> = new Array<WizardSidenavModel>();
    let menuItems: WizardSidenavModel;
    for (const menu of this.completeESSFileMenu) {
      reviewFileMenu.push({ ...menuItems, ...menu });
    }
    return reviewFileMenu;
  }

  /**
   * Creates the profile tabs to load
   *
   * @returns profile tab array
   */
  public createNewProfileSteps(): Array<TabModel> {
    const profileTabs: Array<TabModel> = new Array<TabModel>();
    let tab: TabModel;
    for (const tabs of this.evacueeProfileTabs) {
      profileTabs.push({ ...tab, ...tabs });
    }
    return profileTabs;
  }

  /**
   * Creates the ess files tabs to load
   *
   * @returns essFile tab array
   */
  public createNewESSFileSteps(): Array<TabModel> {
    const essFileTabs: Array<TabModel> = new Array<TabModel>();
    let tab: TabModel;
    for (const tabs of this.essFileTabs) {
      essFileTabs.push({ ...tab, ...tabs });
    }
    return essFileTabs;
  }

  /**
   * Creates the profile tabs to load
   *
   * @returns profile tab array
   */
  public createNewEditProfileSteps(): Array<TabModel> {
    const profileTabs: Array<TabModel> = new Array<TabModel>();
    let tab: TabModel;
    for (const tabs of this.evacueeEditProfileTabs) {
      profileTabs.push({ ...tab, ...tabs });
    }
    return profileTabs;
  }
}
