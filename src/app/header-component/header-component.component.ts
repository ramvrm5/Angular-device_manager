import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from  '../api-service.service';
import { AuthService } from '../auth/auth.service';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { DevicesComponent } from '../devices/devices.component';
import * as moment from 'moment'

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
	faBell = faBell;
	isCollapsed = true;
	render:boolean = false;
	myNavbar = true;
	TotalnotificationListnumber=0;
	notificationList:any
	isUserLoggedIn;
	refreshToken;
	jwtToken;
	currentDate;
	expiredevices = [];
	deviceData: any;
	role; 
	constructor(private myRoute: Router,public auth: AuthService, private router: Router, private apiService:  ApiServiceService, private device:  DevicesComponent) {
		this.currentDate = new Date()
	}
	
	ngOnInit() {
		var url = this.myRoute.url[0].split("/");
		this.auth.sendValue('refreshToken','false');
		this.jwtToken = this.auth.getValue('jwt');
		if(this.jwtToken ){
			this.getCurrentUser();
			this.getDevices();
		}else{
			if(this.myRoute.url[0].indexOf("/users/recover/") == -1){
				
			}else{
				this.myRoute.navigate(["login"]);
			}
		}
	}

	toggleBar() {
		var x = document.getElementById("myNavbar");
		if (x.style.display === "block") {
		  x.style.display = "none";
		} else {
		  x.style.display = "block";
		}
	  }

	getDevices(){
		this.apiService.deviceList(this.auth.getValue('jwt')).subscribe((response) => {
			this.deviceData = response;
			this.notifications();
		},(err) => {
			this.auth.logout();
		});
	}

	
	notifications() {
		setTimeout(() => {
			var currentDate = this.currentDate;
			var arr = []
			var dateplus30FormatlongNumber = currentDate.setDate(currentDate.getDate() + 30);
			var month = currentDate.getMonth().length > 2 ? currentDate.getMonth() : +"0" + currentDate.getMonth();
			var date = currentDate.getDate().length > 2 ? currentDate.getDate() : +0 + currentDate.getDate();
			var month2 = parseInt(month) + parseInt('1')
			var fullFromatdate = currentDate.getFullYear() + "-" + month2 + "-" + date;
			for (let i = 0; i < this.deviceData.length; i++) {
				if (this.deviceData[i].contract) {
					var d1 = Date.parse(this.deviceData[i].contract.end_date);
					var d2 = Date.parse(fullFromatdate);
					if (d1 <= d2) {
						this.expiredevices.push(this.deviceData[i])
					}
				}
			}
			for (let i = 0; i < this.expiredevices.length; i++) {
				arr.push({ "id": i + "", "itemName": this.expiredevices[i].code + " " + "About To Expire","urlId":this.expiredevices[i].code})
			}
			this.TotalnotificationListnumber = arr.length;
			this.notificationList = arr;
		}, 250);
	}

	getCurrentUser(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.role = response['role'];
				this.render = true;
			}else{
				this.role = null
			}
		},(err) => {
			if(err.statusText === "Unauthorized"){
				this.auth.logout();
			}
		});
	}

}
