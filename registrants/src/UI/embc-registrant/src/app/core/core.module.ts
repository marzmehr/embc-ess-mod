import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EssFileDialogComponent } from './components/dialog-components/ess-file-dialog/ess-file-dialog.component';
import { InformationDialogComponent } from './components/dialog-components/information-dialog/information-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    CaptchaComponent,
    AppLoaderComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent,
    EssFileDialogComponent,
    InformationDialogComponent
  ],
  exports: [
    CaptchaComponent,
    AppLoaderComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    DialogComponent
  ]
})
export class CoreModule {}
