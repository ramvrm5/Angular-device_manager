import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatFormFieldModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule } from '@angular/material';

//Filters
import { GrdFilterPipe } from './filter/grd-filter.pipe';
import { DeviceSortPipe } from './filter/device-sort.pipe';
import { LimitPipe } from './filter/limit.pipe';
import { CountDaysPipe } from './filter/count-days.pipe';
import { UploadService } from './upload.service';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Auth
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth.guard';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Excel Generate
import { ExcelService } from './service/excel.service';

//Components
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceviewComponent } from './deviceview/deviceview.component';
import { UserComponent } from './user/user.component';
import { AndroidappComponent } from './androidapp/androidapp.component';
import { ActivitiesComponent } from './activity/activities/activities.component';
import { AccountComponent } from './user/account/account.component';
import { DevicenewComponent } from './devices/devicenew/devicenew.component';
import { IssuesviewComponent } from './issues/issuesview/issuesview.component';
import { FilterissuePipe } from './filter/filterissue.pipe';
import { StatisticsComponent } from './statistics/statistics.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingsComponent } from './devices/settings/settings.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { UsereditComponent } from './user/useredit/useredit.component';
import { RegionlistComponent } from './regionlist/regionlist.component';
import { DevicetypesComponent } from './devices/devicetypes/devicetypes.component';
import { LocationlistComponent } from './Locationlist/locationlist.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { PersonSearchPipe } from './statistics/pipesearch';
import { DeviceSearchPipe } from './devices/pipesearch';
import { DashboardSearchPipe } from './admin-view/pipesearch';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    PersonSearchPipe,
    DeviceSearchPipe,
    DashboardSearchPipe,
    HeaderComponentComponent,
    FooterComponentComponent,
    LoginComponent,
    DevicesComponent,
    DeviceviewComponent,
    GrdFilterPipe,
    UserComponent,
    AndroidappComponent,
    ActivitiesComponent,
    AccountComponent,
    DeviceSortPipe,
    LimitPipe,
    DevicenewComponent,
    CountDaysPipe,
    IssuesviewComponent,
    FilterissuePipe,
    StatisticsComponent,
    NotfoundComponent,
    SettingsComponent,
    NewuserComponent,
    UsereditComponent,
    RegionlistComponent,
    LocationlistComponent,
    DevicetypesComponent,
    AdminViewComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AngularMultiSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    NoopAnimationsModule,
    AppRoutingModule,
    NgxQRCodeModule,
	MatDatepickerModule,
    MatNativeDateModule,
	MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BsDatepickerModule.forRoot(),
    SelectDropDownModule,
    NgxSpinnerModule
  ], 
  entryComponents: [AppComponent],
  providers: [AuthService,AuthGuard,ExcelService,MatDatepickerModule,DevicesComponent,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
