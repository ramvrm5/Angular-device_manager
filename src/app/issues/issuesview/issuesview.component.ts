import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from  '../../api-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-issuesview',
  templateUrl: './issuesview.component.html',
  styleUrls: ['./issuesview.component.css']
})
export class IssuesviewComponent implements OnInit {
	jwtToken;
  	public issues : any;
	cosmetics: Array<any> = [];
	major: Array<any> = [];
	minor: Array<any> = [];
	critical: Array<any> = [];
	expandedIssue;
	expands;
	device;
	show;
	editVal;
	valtype;
	device_id;
	
	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
	) { 
		this.editVal = false;
		this.jwtToken = this.auth.getValue('jwt');
	}

	ngOnInit() {
		this.getIssues();
	}
	
	getIssues(){
		this.apiService.issuesList(this.auth.getValue('jwt')).subscribe((response) => {
			this.issues = response;
			this.sortArray(response)
		},(err) => {
			console.log(err);
			this.auth.logout();
		});
	}
	
	refresh(){
		this.getIssues();
	}
	
	showDetails(val,devices){
		if(val != -1){
			this.apiService.getDevice(this.auth.getValue('jwt'),devices).subscribe((res) => {
				if(res['id']){
					if(!res['contract']){
						res['contract'] = null;
						this.device = res;
						this.show = true;
					}else{
						this.device = res;
						this.show = true;
					}
					this.expands = val;
				}else{
					console.log(res);
				}
			},(err) =>{ console.log(err); this.auth.logout(); });
		}else{
			this.expands = -1;
		}		
	}
	
	editDetails(val,devices){
		if(val != -1){
			this.editVal = val;
		}else{
			this.editVal = -1;
		}
	}
	
	highlightDevice(type){
		switch (type) {
            case "online":
                return "label label-success";
            case "offline":
                return "label label-danger";
            case "error":
                return "label label-danger";
            case "stored":
                return "label label-warning";
            case "transporting":
                return "label label-info";
            default:
                return "label label-default";
        }
	}
	
	hideDetails(value){
		this.expands = -1;
	}
	
	sortArray(value){
		var mi = 0;
		var ma = 0;
		var cr = 0;
		var co = 0;
		for(var i=0;i<value.length;i++){
			//Major Array
			if(value[i].severity == 'major'){
				this.major[mi] = value[i];
				mi++;
			}
			
			//Minor Array
			if(value[i].severity == 'minor'){
				this.minor[ma] = value[i];
				ma++;
			}
			
			//Critical Array
			if(value[i].severity == 'critical'){
				this.critical[cr] = value[i];
				cr++;
			}
			
			//Cosmetic Array
			if(value[i].severity == 'cosmetic'){
				this.cosmetics[co] = value[i];
				co++;
			}
		}
		this.major = this.major.reverse();
		this.minor = this.minor.reverse();
		this.critical = this.critical.reverse();
		this.cosmetics = this.cosmetics.reverse();
	}
	
	updateIssue(){
		console.log('asfas');
		console.log(this.valtype);
		console.log(this.device_id);
	}

	upda(val,deviceId){
		console.log(val.target.value);
		console.log(deviceId);
		this.valtype = val.target.value
		this.device_id = deviceId;
	}
	
	
}
