import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Profile, ProfileDataConflict } from '../../core/api/models';
import { ProfileService as Service } from '../../core/api/services/profile.service';
import { ProfileMappingService } from './profile-mapping.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private profileService: Service,
    private profileMapping: ProfileMappingService
  ) {}

  public profileExists(): Observable<boolean> {
    return this.profileService.profileGetDoesUserExists();
  }

  public getLoginProfile(): void {
    this.profileService.profileGetProfile().subscribe((loginProfile) => {
      this.profileMapping.mapLoginProfile(loginProfile);
    });
  }

  public getProfile(): void {
    this.profileService.profileGetProfile().subscribe((profile) => {
      console.log(profile);
      this.profileMapping.mapProfile(profile);
    });
  }

  public getConflicts(): Observable<ProfileDataConflict[]> {
    return this.profileService.profileGetProfileConflicts();
  }

  public upsertProfile(updatedProfile: Profile): Observable<string> {
    return this.profileService.profileUpsert({ body: updatedProfile }).pipe(
      mergeMap((id) => this.profileService.profileGetProfile()),
      map((profile) => {
        this.profileMapping.mapProfile(profile);
        return profile.id;
      })
    );
  }
}
