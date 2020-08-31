import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from  '../../api-service.service';
import { MatSelect } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
 
@Component({
  selector: 'app-devicenew',
  templateUrl: './devicenew.component.html',
  styleUrls: ['./devicenew.component.css']
})
export class DevicenewComponent implements OnInit {
	jwtToken;
	deviceId;
	userrole;
	public code : any;
	public type : string;
	public name : string;
	public address : string;
	public location : string;
	public key : string;
  	public status : any;
	showName:boolean;
	users;
	deviceForm;
	regions;
	dList;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
	) {
		this.jwtToken = this.auth.getValue('jwt');
		if(this.jwtToken){
			this.getCurrentUser();
			this.getRegions();
			this.getDList();
			this.allusers();
		}
		
		this.showName = false;
		this.deviceForm = new FormGroup({
			code: new FormControl(null, Validators.required),
			type: new FormControl(null, Validators.required),
			name: new FormControl(null, Validators.required),
			address: new FormControl(null, Validators.required),
			location: new FormControl(null, Validators.required),
			key: new FormControl(null),
			status: new FormControl(null),
			assign_to: new FormControl(null),
		});
		this.activatedRoute.params.subscribe(params => {
			this.deviceId = params['id'];
			this.deviceForm.controls['status'].setValue('online');
			if(this.deviceId){
				this.deviceForm.controls['code'].setValue(this.deviceId);
			}			
		},(err) => {
			this.auth.logout();
		});
	}

	ngOnInit() {
	}

	getRegions(){
		this.apiService.getRegion(this.jwtToken).subscribe((response) => {
			this.regions = response;
		},(err) => {
			if(err.statusText === "Unauthorized"){
				this.auth.logout();
			}
		});
	}

	getDList(){
		this.apiService.getDeviceList(this.jwtToken).subscribe((response) => {
			this.dList = response;
		},(err) => {
			if(err.statusText === "Unauthorized"){
				this.auth.logout();
			}
		});
	}

	allusers(){
		this.apiService.getUsers(this.jwtToken).subscribe((response) => {
			this.users = response;
		},(err) => {
			if(err.statusText=="Unauthorized"){
				this.auth.logout();
			}else{
				console.log(err);
			}
		});
	}
	
	createDevice(values){
		this.apiService.createDevice(this.jwtToken,values).subscribe((response) => {
			swal({
				icon: 'success',
				title: 'Success!',
				text: 'New device created!',
				buttons: [false,true],
				timer: 1000
			}).then(() => {
				var pagere = '/devices/'+values.code;
				this.router.navigate([pagere])
			});
		},(err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with adding the device!',
				timer: 2000,
				buttons: [false,true]
			});
		});
	}

	getCurrentUser(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.userrole = response['role'];
				if(this.userrole==='user'){
					this.router.navigate(['/devices'])
				}
			}else{
				this.userrole = null
			}
		},(err) => {
			if(err.statusText === "Unauthorized"){
				this.auth.logout();
			}
		});
	}
	
	device_type(val){ 
		this.deviceForm.controls['type'].setValue(val);
		if(val === 'Massage Chair'){ this.showName = true; }else{ this.showName = false; }
	}
	
	device_name(val){
		this.deviceForm.controls['name'].setValue(val);
	}

}
