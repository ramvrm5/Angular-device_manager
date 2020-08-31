import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { LoginComponent } from './login/login.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceviewComponent } from './deviceview/deviceview.component';
import { DevicenewComponent } from './devices/devicenew/devicenew.component';
import { UserComponent } from './user/user.component';
import { AndroidappComponent } from './androidapp/androidapp.component';
import { ActivitiesComponent } from './activity/activities/activities.component';
import { AccountComponent } from './user/account/account.component';
import { IssuesviewComponent } from './issues/issuesview/issuesview.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingsComponent } from './devices/settings/settings.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { UsereditComponent } from './user/useredit/useredit.component';
import { RegionlistComponent } from './regionlist/regionlist.component';
import { LocationlistComponent } from './Locationlist/locationlist.component';
import { DevicetypesComponent } from './devices/devicetypes/devicetypes.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', redirectTo: '', pathMatch: 'full' },
	{ path: "users/recover/:username/:key", component: ResetpasswordComponent},
	{ path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
	{ path: 'devices/:id/add', component: DevicenewComponent, canActivate: [AuthGuard]  },
	{ path: 'devices/add', component: DevicenewComponent, canActivate: [AuthGuard]  },
	{ path: 'devices/add', component: DevicenewComponent, canActivate: [AuthGuard]  },
	{ path: 'devices/:id', component: DeviceviewComponent, canActivate: [AuthGuard]  },
	{ path: 'regionList', component: RegionlistComponent, canActivate: [AuthGuard]  },
	{ path: 'locationList', component: LocationlistComponent, canActivate: [AuthGuard]  },
	{ path: 'adminView', component: AdminViewComponent, canActivate: [AuthGuard]  },
	{ path: 'devicestype', component: DevicetypesComponent, canActivate: [AuthGuard]  },
	{ path: 'devices/:id/settings', component: SettingsComponent, canActivate: [AuthGuard]  },
	{ path: 'users', component: UserComponent, canActivate: [AuthGuard]  },
	{ path: 'users/edit/:id', component: UsereditComponent, canActivate: [AuthGuard]  },
	{ path: 'users/add', component: NewuserComponent, canActivate: [AuthGuard]  },
	{ path: 'androidApp', component: AndroidappComponent, canActivate: [AuthGuard]  },
	{ path: 'recentActivity', component: ActivitiesComponent, canActivate: [AuthGuard]  },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuard]  },
	{ path: 'issues', component: IssuesviewComponent, canActivate: [AuthGuard]  },
	{ path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]  },
	{ path: '404', component: NotfoundComponent },
 	{ path: '**', redirectTo: '/devices' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{ useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }