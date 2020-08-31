import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from  '../api-service.service';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	formdata;
	isUserLoggedIn;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) {
		if (this.auth.isLoggedIn()) { 
			this.router.navigate(['/devices']);
		}
	}

	ngOnInit() {
	  	this.formdata = new FormGroup({
			username: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required),
			remember_token: new FormControl(null),
		});
	}

	login(logdetails){
		this.apiService.loginUser(logdetails).subscribe((response) => {
			if(response['token']){
				if(!logdetails.remember_token){
					logdetails.remember_token = false
				}
				this.auth.sendValue('refresh',logdetails.remember_token);
				this.auth.sendValue('jwt',response['token']);
				swal({
					icon: 'success',
				  	title: 'Success!',
				  	text: 'Login Successful!',
				  	buttons: [false,true],
				  	timer: 1000
				}).then(() => {
					this.router.navigate(['/devices']);
				});
			}else{
				swal({
					icon: 'error',
					title: 'Invalid Access!',
					text: 'Something Went Wrong!',
					buttons: [true,false]
				});
			}
		},(err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'Are you sure the username and password were correct!',
				buttons: [false,true]
			});
		});
	}


	forgotpass(){
		swal({
			content: {
				element: "input",
				attributes: {
					placeholder: "Username",
					type: "text",
				}
			},
			title: 'Forgot Password',
			text: 'Your username:',
			buttons: [true,true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value != null){
				//value = '/devices/'+value+'/add';
				//this.router.navigate([value])
				console.log(value);
				this.apiService.forgotPass(value).subscribe((response) => {
					console.log(response);
					swal({
						title: "Success!",
						text: "E-mail sent to this userId!",
						timer: 1000,
						icon: "success"
					});
				},(err) => {
					console.log(err);
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'Nope!',
						buttons: [false,true]
					});
				});
			}
		});



/*
		*/
	}

}
