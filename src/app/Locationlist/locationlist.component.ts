import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from  '../api-service.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.css']
})
export class LocationlistComponent implements OnInit {
	jwtToken;
	locations;
	role;
	location;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getlocations();
		this.getCurrentUser();
	}

	ngOnInit() {
	}

	getlocations(){
		this.apiService.getlocation(this.jwtToken).subscribe((response) => {
			this.locations = response;
		},(err) => {
			console.log(err);
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
			console.log(err)
		});
	}

	newlocation(){
		swal({
       		content: {
				element: "input",
				attributes: {
					placeholder: "ex. Tallinn, Shopping Center, 3rd floor",
					type: "text",
				}
			},
            title: "Location Name",
            buttons: [true,true],
			closeOnClickOutside: false
        }).then((value) => {
        	if (value === false) return;
			if(value){
				
				this.apiService.createLocation(this.jwtToken,{"location_value":value}).subscribe((response) => {
					this.getlocations();
					swal({
		                title: "Success!",
		               	text: "Location Created!",
                        timer: 1000,
		                icon: "success"
		            });
				},(err) =>{ 
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with Creating New Location!',
						buttons: [false,true],
						timer: 1000
					});

				});
			}
		});
	}

	editLocation(value){
		console.log(value)
		this.apiService.createLocation(this.jwtToken,{"location_value":value}).subscribe((response) => {
			swal({
                title: "Success!",
               	text: "Location Created!",
                timer: 1000,
                icon: "success"
            });
		},(err) =>{ 
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with Creating New Location!',
				buttons: [false,true],
				timer: 1000
			});

		});
	}

	delete(val){
		swal({
			title: "Delete Location?!",
            text: "Are you sure? This cannot be undone!",
			buttons: [true,true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if(value){
				this.apiService.deleteLocation(this.jwtToken,val).subscribe((response) => {
					this.getlocations();
					swal({
		                title: "Success!",
		                text: "Location deleted!",
		                timer: 1000,
		                icon: "success"
		            });
				},(err) =>{ 
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with deleting this Location!',
						buttons: [false,true],
						timer: 1000
					});

				});
		   	}
		});
	}
}