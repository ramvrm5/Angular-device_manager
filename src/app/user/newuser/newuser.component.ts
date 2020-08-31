import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from  '../../api-service.service';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
	formdata: FormGroup;
	jwtToken;
	isUserLoggedIn;
	errormsg;
	msgClass;
	regions;
	//emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getRegions();
	}

	ngOnInit() {
		this.formdata = new FormGroup({
			username: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
			slack: new FormControl(null, [Validators.required]),
			region: new FormControl(null, [Validators.required]),
			location: new FormControl(null, [Validators.required]),
			method: new FormControl(null, [Validators.required]),
		});
		this.formdata.controls['region'].setValue('North-Estonia', {onlySelf: true});
		this.formdata.controls['method'].setValue('slack');
	}

	getRegions(){
		this.apiService.getRegion(this.jwtToken).subscribe((response) => {
			this.regions = response;
		},(err) => {
			console.log(err);
		});
	}

	newaccount(value){
		this.apiService.createUser(this.jwtToken,value).subscribe((response) => {
			console.log(response);
			this.errormsg = "User Registered";
			this.msgClass = "alert alert-success";
			this.formdata.reset();
			swal({
				title: "Success!",
				text: "user added!",
				timer: 1000,
				icon: "success"
			});
		},(err) => {
			this.msgClass = "alert alert-danger";
			if(err.statusText=="Conflict"){
				this.errormsg = "User Already Registered.";
			}else{
				this.errormsg = "Something Went Wrong!";
			}
			swal({
				icon: 'error',
				title: 'Error!',
				text: "There was a problem with adding the user!",
				buttons: [false, true],
				timer: 1000
			});
		});

	}

}
