import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ApiServiceService } from '../../api-service.service';
import { AuthService } from '../../auth/auth.service';
import { PasswordValidation } from './password-validation';
import swal from 'sweetalert';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	jwtToken;
	username;
	email;
	slack;
	emailForm;
	slackForm;
	userVal;
	emamil;
	changePass: FormGroup;
	oldPass;
	newPass;
	confirmPass;
	slack_data;

	constructor(
		fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService: ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getUserInfo();
		this.emailForm = fb.group({
			emailVal: new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
		});
		this.slackForm = fb.group({
			slackname: new FormControl(null, Validators.required)
		});
		this.changePass = fb.group({
			oldPassword: new FormControl(null, Validators.required),
			newPassword: new FormControl(null, Validators.required),
			confirmPass: new FormControl(null, Validators.required)
		},{
			validator: PasswordValidation.MatchPassword // your validation method
		});
	}

	ngOnInit() {
	}

	getUserInfo(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.username = response['username'];
				this.emamil = response['email'];
				this.slack_data = response['slack'];
				this.slackForm.controls['slackname'].setValue(response['slack']);
				this.emailForm.controls['emailVal'].setValue(response['email']);
			}
		},(err) => {
			this.auth.logout();
		});
	}

	slack_hide(){
		this.slack = !this.slack;
	}

	email_hide(){
		this.email = !this.email;
	}

	slackupdate(value){
		this.apiService.updateUsers(this.jwtToken,{"slack":value.slackname}).subscribe((response) => {
			this.slack_data = value.slackname;
			this.slack_hide();
			this.slackForm.reset();
			swal({
				icon: 'success',
				title: 'Success!',
				text: 'Slack successfully saved!',
				buttons: [false,true],
				timer: 1000
			});
		},(err) => {
			swal({
				icon: 'error',
				title: 'Invalid Access!',
				text: 'Something Went Wrong!',
				buttons: [true,false]
			});
		});
	}

	emailupdate(value){
		this.apiService.updateUsers(this.jwtToken,{"email":value.emailVal}).subscribe((response) => {
			this.emamil = value.emailVal;
			this.email_hide();
			this.emailForm.reset();
			swal({
				icon: 'success',
				title: 'Success!',
				text: 'E-Mail successfully saved!',
				buttons: [false,true],
				timer: 1000
			});
		},(err) => {
			swal({
				icon: 'error',
				title: 'Invalid Access!',
				text: 'Something Went Wrong!',
				buttons: [true,false]
			});
		});
	}

	updatePass(value){
		this.apiService.updatePassword(this.jwtToken,{"newPassword":value.newPassword,"oldPassword":value.oldPassword}).subscribe((response) => {
			swal({
				icon: 'success',
				title: 'Success!',
				text: 'Password Successfully Updated!',
				buttons: [false,true],
				timer: 1000
			}).then(() => {
				this.auth.logout();
			});
		},(err) => {
			swal({
				icon: 'error',
				title: 'Invalid Access!',
				text: 'Something Went Wrong!',
				buttons: [true,false]
			});
		});
	}

}
