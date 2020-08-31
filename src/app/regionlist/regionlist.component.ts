import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import swal from 'sweetalert';
import sweetAlert from 'sweetalert2';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from '../api-service.service';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-regionlist',
	templateUrl: './regionlist.component.html',
	styleUrls: ['./regionlist.component.css']
})
export class RegionlistComponent implements OnInit {
	jwtToken;
	regions;
	role;
	region;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService: ApiServiceService,
		private http: HttpClient,
		public auth: AuthService
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.getRegions();
		this.getCurrentUser();
	}

	ngOnInit() {
	}

	getRegions() {
		this.apiService.getRegion(this.jwtToken).subscribe((response) => {
			this.regions = response;
		}, (err) => {
			console.log(err);
		});
	}

	getCurrentUser() {
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if (response['id']) {
				this.role = response['role'];
			} else {
				this.role = null
			}
		}, (err) => {
			console.log(err)
		});
	}

	newRegion() {
		swal({
			content: {
				element: "input",
				attributes: {
					placeholder: "ex. Tallinn, Shopping Center, 3rd floor",
					type: "text",
				}
			},
			title: "Region Name",
			buttons: [true, true],
			closeOnClickOutside: false
		}).then((value) => {
			if (value === false) return;
			if (value) {

				this.apiService.createRegion(this.jwtToken, { "reg_value": value }).subscribe((response) => {
					this.getRegions();
					swal({
						title: "Success!",
						text: "Region Created!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with Creating New Region!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	editRegion(id, value) {
		console.log(value)
		sweetAlert.fire({
			title: "Region Name",
			inputPlaceholder: "ex. Tallinn, Shopping Center, 3rd floor",
			input: 'text',
			inputValue: value,
			showCancelButton: true,
		}).then((value) => {
			if (value === false) return;
			if (value) {
				this.apiService.createRegion(this.jwtToken, { "reg_value": value.value,"id":id}).subscribe((response) => {
					this.getRegions();
					swal({
						title: "Success!",
						text: "Region Created!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with Creating New Region!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	delete(val) {
		swal({
			title: "Delete Region?!",
			text: "Are you sure? This cannot be undone!",
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value) {
				this.apiService.deleteRegion(this.jwtToken, val).subscribe((response) => {
					this.getRegions();
					swal({
						title: "Success!",
						text: "Region deleted!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with deleting this Region!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}
}