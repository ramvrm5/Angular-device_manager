import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from  '../../api-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({ 
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
	jwtToken;
	public type : string;
	public device : string;
	public username : string;
	actvities:any;
	target_device;
	description;
	base_url;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) { }

	ngOnInit() {
		this.jwtToken = localStorage.getItem('jwt');
		this.getAct(this.jwtToken);
	}

	getAct(token){
		this.apiService.getActivity(token).subscribe((response) => {
			this.actvities = response;
		},(err) => {
			this.auth.logout();
		});
	}
}

