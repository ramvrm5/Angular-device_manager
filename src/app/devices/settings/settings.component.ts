import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { ApiServiceService } from '../../api-service.service';
import * as moment from 'moment'
import swal from 'sweetalert';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
	viewId
	Variableoutput: boolean;
	Unevenoutput: boolean;
	Spacerental: boolean;
	CounterSettings: boolean;
	device:any = {};
	saving: boolean;
	settings: any = {};
	period: any = {};
	periodType;
	jwtToken;
	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService: ApiServiceService,
		public auth: AuthService,
		private http: HttpClient,
		private _location: Location
	) {
		this.jwtToken = this.auth.getValue('jwt');
		this.activatedRoute.params.subscribe(params => {
			this.viewId = params['id'];
		});
		this.getDevice();
		this.period = {
			month:"",
			year:"",
			quarter:"",
			start_date:"",
			end_date:"",
		}
		this.settings = {
			counter_max: "",
			counter_divisor: "",
			counter_count: "",
			rent_cost: "",
		}
		this.Variableoutput = false;
		this.Unevenoutput = false;
		this.Spacerental = false;
		this.CounterSettings = false;
		this.saving = false;
	}

	ngOnInit() {
	}

	goBack() {
		this._location.back();
	}
									
	getDevice(){
		this.device.coinbox_enabled =false;
		this.apiService.getDevice(this.jwtToken,this.viewId).subscribe((response) => {
				this.device = response;
				this.getSettingsFromDevice("");
		},(error) =>{
			if (error.status == 404 || error.status == 400 ) {
				swal({
					title: "Non-existent Device",
		            text:  "Non-existent Device!",
				timer: 1000,
				});
			}
		});
	}

	setEnabled(variable, boolean) {
			var reqdata = {};
			reqdata[variable] = boolean;
		this.apiService.markRetrievedDevice(this.jwtToken, this.viewId, reqdata).subscribe((response) => {
			this.device[variable] = boolean;
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "Failed to toggle state!",
				timer: 1000,
			});
		});
	}

	setCounterCount(int) {
			var reqdata = {counter_count: int};
			this.apiService.markRetrievedDevice(this.jwtToken, this.viewId, reqdata).subscribe((response) => {
				this.device.counter_count = int;
				this.settings.counter_count = int;
			}, (err) => {
				console.log(err);
				swal({
					title: "Error!",
					text: "Failed to toggle state!",
					timer: 1000,
				});
			});
    };

	getSettingsFromDevice(what) {
		switch(what){
			case "counter":
				this.settings.counter_max = this.device.counter_max;
				this.settings.counter_divisor = this.device.counter_divisor;
				this.settings.counter_count = this.device.counter_count;
				break;
			case "rental":
				this.settings.rent_cost = this.device.rent_cost;
				break;
			default:
				this.settings.counter_max = this.device.counter_max;
				this.settings.counter_divisor = this.device.counter_divisor;
				this.settings.counter_count = this.device.counter_count;
				this.settings.rent_cost = this.device.rent_cost;
		}
	 };

	save(fieldset) {
		if (fieldset == "counter") {
			var reqdata = {};
				reqdata["counter_max"] 		= this.settings.counter_max,
				reqdata["counter_divisor"] 	= this.settings.counter_divisor,
				reqdata["counter_count"] 	= this.settings.counter_count
		}
		if (fieldset == "rental") {
			var reqdata1 = {};
				reqdata1["rent_cost"] = this.settings.rent_cost
		}
		this.saving = true;
		this.apiService.markRetrievedDevice(this.jwtToken, this.viewId, reqdata?reqdata:reqdata1).subscribe((response) => {
			this.saving = false;
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "Failed to toggle state!",
				timer: 1000,
			});
		});
	}

/*     getDevices () {
		this.rows = null;
		var  url = "";
        if(this.periodType == 'custom') {
        	url = "/statistics/custom/" + this.period.start_date + "/" + this.period.end_date;
        } else if (this.periodType == 'monthly') {
            url = "/statistics/basic/monthly/" + this.period.year + "/" + this.period.month;
        } else if (this.periodType == 'quarterly') {
            url = "/statistics/basic/quarterly/" + this.period.year + "/" + this.period.quarter;
        } else {
            url = "/statistics/basic/yearly/" + this.period.year;
        }
        $http.get(apiBase + url).success(
            function(data) {
                this.rows = data;
            }
        );
    }; */

}