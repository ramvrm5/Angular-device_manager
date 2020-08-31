import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiServiceService } from  '../api-service.service';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	jwtToken;
	username;
	email;
	slack;
  	users;
  	role;
  	region;
  	location;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.allusers();
		this.getCurrentUser();
	}

	ngOnInit() {
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

	getCurrentUser(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.role = response['role'];
			}else{
				this.role = null
			}
		},(err) => {
			//this.auth.logout();
		});
	}

	newUser(){
		this.router.navigate(["users/add"]);
	}

	editUser(val){
		val = "users/edit/"+val
		this.router.navigate([val]);
	}

	disallowUser(vale){
		this.apiService.userStatus(this.jwtToken,vale,'disable').subscribe((response) => {
			this.allusers();
		},(err) => {
			if(err.statusText=="Unauthorized"){
				this.auth.logout();
			}else{
				console.log(err);
			}
		});
	}

	allowUser(vale){
		this.apiService.userStatus(this.jwtToken,vale,'enable').subscribe((response) => {
			this.allusers();
		},(err) => {
			if(err.statusText=="Unauthorized"){
				this.auth.logout();
			}else{
				console.log(err);
			}
		});
	}

}
