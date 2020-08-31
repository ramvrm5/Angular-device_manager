import { Component } from '@angular/core';
import { ApiServiceService } from  './api-service.service';
import { AuthService } from './auth/auth.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'device-manager';
	constructor(
		private apiService:  ApiServiceService,
		public auth: AuthService,
		private router: Router,
	) {
		if (this.auth.isLoggedIn()) {
			/*console.log(this.auth.getValue('jwt'))
			this.apiService.refreshToken(this.auth.getValue('jwt')).subscribe((response) => {
				if(response['token']){
					this.auth.sendToken(response['token']);
					console.log(this.auth.getValue('jwt'))
				}
			});*/
        }
	}
}
