import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiServiceService } from  '../../api-service.service';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
	jwtToken;
	username;
  	users;
  	role;
  	userId
  	updateForm;
  	regions;

	constructor(
		formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getCurrentUser();
		this.getRegions();
		this.activatedRoute.params.subscribe(params => {
			this.userId = params['id'];
			this.getUsers();
		});	
		this.updateForm = formBuilder.group({
			email: new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
			slack: new FormControl(null, Validators.required),
			location: new FormControl(null, Validators.required),
			region: new FormControl(null, Validators.required),
			role: new FormControl(null, Validators.required)
		});
	}

	ngOnInit() {

	}

	getRegions(){
		this.apiService.getRegion(this.jwtToken).subscribe((response) => {
			this.regions = response;
		},(err) => {
			console.log(err);
		});
	}

	getCurrentUser(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.role = response['role'];
				if(this.role=='user'){
					this.router.navigate(["users"]);
				}
			}else{
				this.role = null
			}
		},(err) => {
			console.log(err)
			//this.auth.logout();
		});
	}

	getUsers(){
		this.apiService.userbyName(this.jwtToken,{"id":this.userId}).subscribe((response) => {
			this.users = response;
			this.updateForm.controls['email'].setValue(response['email']);
			this.updateForm.controls['slack'].setValue(response['slack']);
			this.updateForm.controls['region'].setValue(response['region'], {onlySelf: true});
			this.updateForm.controls['location'].setValue(response['location']);
			this.updateForm.controls['role'].setValue(response['role'], {onlySelf: true});
		},(err) => {
			this.router.navigate(["users"]);
		});
	}

	return(){
		this.router.navigate(["users"]);
	}

	updateuser(values){
		values.username = this.users.username;
		this.apiService.updateUsersOther(this.jwtToken,values).subscribe((response) => {
			swal({
				icon: 'success',
				title: 'Success!',
				text: 'User successfully Updated!',
				buttons: [false,false],
				timer: 1000
			});
		},(err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'Something went wrong!',
				buttons: [false,false],
				timer: 1500
			});
		});
	}

}
