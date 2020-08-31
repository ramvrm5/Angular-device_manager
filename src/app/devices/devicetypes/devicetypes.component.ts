import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from  '../../api-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-devicetypes',
  templateUrl: './devicetypes.component.html',
  styleUrls: ['./devicetypes.component.css']
})
export class DevicetypesComponent implements OnInit {
	jwtToken;
	devices;
	role;
	device;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getdList();
		this.getCurrentUser();
	}

	ngOnInit() {
	}

	getdList(){
		this.apiService.getDeviceList(this.jwtToken).subscribe((response) => {
			this.devices = response;
		},(err) => {
			this.auth.logout();
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

	newDevice(){
		swal({
       		content: {
				element: "input",
				attributes: {
					placeholder: "ex. Tallinn, Shopping Center, 3rd floor",
					type: "text",
				}
			},
            title: "Device Name",
            buttons: [true,true],
			closeOnClickOutside: false
        }).then((value) => {
        	if (value === false) return;
			if(value){
				this.apiService.createDevicetype(this.jwtToken,{"dev_value":value}).subscribe((response) => {
					this.getdList();
					swal({
		                title: "Success!",
		               	text: "Device Type Created!",
                        timer: 1000,
		                icon: "success"
		            });
				},(err) =>{ 
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with Creating New Device Type!',
						buttons: [false,true],
						timer: 1000
					});

				});
			}
		});
	}

	editdevice(value){
		console.log(value)
	}

	delete(val){
		swal({
			title: "Delete Device Type?!",
			text: "Are you sure? This cannot be undone!",
			buttons: [true,true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if(value){
				this.apiService.deleteDevicetype(this.jwtToken,val).subscribe((response) => {
					this.getdList();
					swal({
		                title: "Success!",
		                text: "Device Type deleted!",
		                timer: 1000,
		                icon: "success"
		            });
				},(err) =>{ 
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with deleting this Device Type!',
						buttons: [false,true],
						timer: 1000
					});

				});
		   	}
		});
	}

}
