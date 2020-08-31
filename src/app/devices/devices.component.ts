import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ApiServiceService } from  '../api-service.service';
import { AuthService } from '../auth/auth.service';
import { HeaderComponentComponent } from '../header-component/header-component.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ExcelService } from '../service/excel.service';
import * as $ from 'jquery';
  
@Component({
	selector: 'app-devices',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
	jwtToken;
	code : string;
	name : string;
	assign_to : string;
	device_type : boolean = false;
	user_type : boolean = false;
	region_type : boolean = false;
	status_type : boolean = false;
	redFirst : boolean;
	yellowFirst : boolean;
	greyFirst : boolean;
	colourFirst : boolean;
	counter_count : string;
	rent_cost : string;
	key : string;
	region : string;
	type : string;
	location : string;
	comment : string;
	Client : string;
	deviceData: any;
	filterdeviceData: any;
	deviceList : {}
  	uniVal;
  	userrole;
  	listFields: Array<any> = [];
	showcheck;
	endDate;
	searchText:any;
	contract_data;
	excelData: Array<any> = [];
	colour: Array<any> = [];
	redcolour: Array<any> = [];
	yellowcolour: Array<any> = [];
	greycolour: Array<any> = [];
	colourfilter;
	selectedFields: Array<any> = [];
	dataModel;
	searchTextColour;
	colourSearchinput;
	selectedDatasource:any;
	config2 ={
		"displayKey":"description", //if objects array passed which key to be displayed defaults to description
	    "search":true, //true/false for the search functionlity defaults to false,
	    "height": 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	    "placeholder":"Search By color", // text to be displayed when no item is selected defaults to Select,
	    "customComparator": ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	   	//"limitTo": options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
	    "moreText": 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	    "noResultsFound": 'No results found!', // text to be displayed when no items are found while searching
	    "searchPlaceholder":'Filter', // label thats displayed in search input,
	    "searchOnKey": 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	}
	config5 = {
	    "displayKey":"description", //if objects array passed which key to be displayed defaults to description
	    "search":true, //true/false for the search functionlity defaults to false,
	    "height": 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	    "placeholder":'Select', // text to be displayed when no item is selected defaults to Select,
	    "customComparator": ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	   	//"limitTo": options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
	    "moreText": 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	    "noResultsFound": 'No results found!', // text to be displayed when no items are found while searching
	    "searchPlaceholder":'Filter', // label thats displayed in search input,
	    "searchOnKey": 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	}
	config4 = {
	    "displayKey":"description", //if objects array passed which key to be displayed defaults to description
	    "search":true, //true/false for the search functionlity defaults to false,
	    "height": 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	    "placeholder":'Select', // text to be displayed when no item is selected defaults to Select,
	    "customComparator": ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	   	//"limitTo": options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
	    "moreText": 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	    "noResultsFound": 'No results found!', // text to be displayed when no items are found while searching
	    "searchPlaceholder":'Filter', // label thats displayed in search input,
	    "searchOnKey": 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	}
	config3 = {
	    "displayKey":"description", //if objects array passed which key to be displayed defaults to description
	    "search":true, //true/false for the search functionlity defaults to false,
	    "height": 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	    "placeholder":'Select', // text to be displayed when no item is selected defaults to Select,
	    "customComparator": ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	   	//"limitTo": options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
	    "moreText": 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	    "noResultsFound": 'No results found!', // text to be displayed when no items are found while searching
	    "searchPlaceholder":'Filter', // label thats displayed in search input,
	    "searchOnKey": 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	}
	config = {
	    "displayKey":"description", //if objects array passed which key to be displayed defaults to description
	    "search":true, //true/false for the search functionlity defaults to false,
	    "height": 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	    "placeholder":'Select', // text to be displayed when no item is selected defaults to Select,
	    "customComparator": ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	   	//"limitTo": options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
	    "moreText": 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	    "noResultsFound": 'No results found!', // text to be displayed when no items are found while searching
	    "searchPlaceholder":'Filter', // label thats displayed in search input,
	    "searchOnKey": 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	}
	dList:any=[];
	regionList:any=[];
	userList:any=[];
	dropdownList = [];
    selectedItems = [];
    selectList=[];
    deselectList=[];
    deselectAll=[];
    selectAll=[];
    dropdownSettings = {};
	custval
	first = false;
	itemList = [];
	currentDate;
	expiredevices = [];
	eventVal:any
    headerListtemp = [];
	notificationLists:any
	TotalnotificationListnumbers :any
	__selectedItems:any
	monthArray = [
		{"id":0,"MonthName": "January"},
		{"id":1,"MonthName": "February"},
		{"id":2,"MonthName": "March"},
		{"id":3,"MonthName": "April"},
		{"id":4,"MonthName": "May"},
		{"id":5,"MonthName": "June"},
		{"id":6,"MonthName": "July"},
		{"id":7,"MonthName": "August"},
		{"id":8,"MonthName": "September"},
		{"id":9,"MonthName": "October"},
		{"id":10,"MonthName": "November"},
		{"id":11,"MonthName": "December"},
	];
	headerList = [
		{"id":"0","itemName": "Code"},
		{"id":"1","itemName": "Type"},
		{"id":"2","itemName": "Name"},
		{"id":"3","itemName": "User"},
		{"id":"4","itemName": "Region"},
		{"id":"5","itemName": "Location"},
		{"id":"6","itemName": "Contract"},
		{"id":"7","itemName": "Contract End Date"},
		{"id":"8","itemName": "Status"},
		{"id":"9","itemName": "Comment"},
		{"id":"10","itemName": "Key Number"},
		{"id":"11","itemName": "Last Counter"},
		{"id":"12","itemName": "Rent"},
		{"id":"13","itemName": "Efficiency"},
		{"id":"14","itemName": "Colour"},
		{"id":"15","itemName": "Client"},
	];
  	selectedheaderlist = [];
  	selectedNotificationList = [];
  	Settings = {};
  	NotificationSettings = {};
	constructor(
		private spinner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService:  ApiServiceService,
		private http: HttpClient,
		public auth: AuthService,
		private excelService:ExcelService,
		//private Header:HeaderComponentComponent
	) { 
		if(this.auth.getValue('assign_to') && this.auth.getValue('assign_to')!='undefined'){
			this.assign_to = localStorage.getItem("assign_to")?localStorage.getItem("assign_to"):"";
		}
		if(this.auth.getValue('type') && this.auth.getValue('type')!='undefined'){
			this.type = localStorage.getItem("type")?localStorage.getItem("type"):"";
		}
		if(this.auth.getValue('rent_cost') && this.auth.getValue('rent_cost')!='undefined'){
			this.rent_cost = localStorage.getItem("rent_cost")?localStorage.getItem("rent_cost"):"";
		}
		if(this.auth.getValue('region') && this.auth.getValue('region')!='undefined'){
			this.region = localStorage.getItem("region")?localStorage.getItem("region"):"";
		}
		if(this.auth.getValue('name') && this.auth.getValue('name')!='undefined'){
			this.name = localStorage.getItem("name")?localStorage.getItem("name"):"";
		}
		if(this.auth.getValue('location') && this.auth.getValue('location')!='undefined'){
			this.location = localStorage.getItem("location")?localStorage.getItem("location"):"";
		}
		if(this.auth.getValue('key') && this.auth.getValue('key')!='undefined'){
			this.key = localStorage.getItem("key")?localStorage.getItem("key"):"";
		}
		if(this.auth.getValue('counter_count') && this.auth.getValue('counter_count')!='undefined'){
			this.counter_count = localStorage.getItem("counter_count")?localStorage.getItem("counter_count"):"";
		}
		if(this.auth.getValue('comment') && this.auth.getValue('comment')!='undefined'){
			this.comment = localStorage.getItem("comment")?localStorage.getItem("comment"):"";
		}
		if(this.auth.getValue('code') && this.auth.getValue('code')!='undefined'){
			this.code = localStorage.getItem("code")?localStorage.getItem("code"):"";
		}
		this.colourSearchinput = false;
		this.colourFirst = true;
		this.redFirst = true;
		this.yellowFirst = true;
		this.greyFirst = true;
		this.currentDate = new Date()
		this.jwtToken = this.auth.getValue('jwt');
		
		//localStorage.removeItem("role")
	}
	ngOnInit() {
		var height = $(window).height() - 160;
		$('.table-responsive.device-page-angular').css('max-height',height);
		this.first = true
		this.Settings = {
			singleSelection: false,
			text: "Select",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			badgeShowLimit: 1,
			classes: "custom-class-example"
		};
		this.NotificationSettings = {
			singleSelection: true,
			text: "Select About Expire Devices",
			enableSearchFilter: false,
			badgeShowLimit: 1,
			classes: "custom-class-NotificationSettings"
		};
		this.getCurrentUser();
		this.getDevices();
		this.getFields();
	}

	getFields(){
		this.apiService.getVisibleFields(this.auth.getValue('jwt')).subscribe((response) => {
			if (response['fields']) {
				var fields = "";
				//console.log(response['fields'])
				for (var jk = 0; jk < response['fields'].length; jk++) {
					fields = ""
					this.itemList[jk] = {"itemName": response['fields'][jk]};
					fields = response['fields'][jk];
					this.selectedFields[jk] = response['fields'][jk]
					if (this.first == true) {
						this.selectedheaderlist.push(this.headerList.find(function (element) {
							return element.itemName == fields;
						})
						)
					};
				}
				if(response['fields'].includes("Colour")){
					this.colourSearchinput = true;
				}else{
					this.colourSearchinput = false;
				}
				this.first = false;
			}
		},(err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'Error getting visible fields!',
				buttons: [false,true],
				timer: 1500
			});
		});
	}
	onNotificationSelect(val: any) {
		var pagere = '/devices/'+val;
		//this.router.navigate([pagere])
	}
	onItemSelect(item: any) {
		this.selectList = [];
		this.selectList.push(item.itemName);
		this.updatefields('singleSelect');
	}
	
	OnItemDeSelect(item: any) {
		this.deselectList = [];
		this.deselectList.push(item.itemName);
		console.log(this.deselectList);
		this.updatefields('singledeSelect');
	}
	
	onSelectAll(items: any) {
		this.selectAll = items
		this.updatefields('selectAll');
	}
	
	onDeSelectAll(items: any) {
		this.deselectAll = items
		this.updatefields('deSelectAll');
	}

	updatefields(action) {
		if(action =='singleSelect'){
			this.selectedFields = this.selectedFields.concat(this.selectList);
			this.selectedFields = this.selectedFields.filter((item, i, ar) => ar.indexOf(item) === i);
		}
		if(action =='singledeSelect'){
			for (var i=0; i<this.deselectList.length; i++) {
				var index = undefined;
				while ((index = this.selectedFields.indexOf(this.deselectList[i])) !== -1) {
					this.selectedFields.splice(index, 1);
				}
			}
		}
		if(action =='selectAll'){
			for (var k=0; k<this.selectAll.length; k++) {
				this.selectedFields.push(this.selectAll[k].itemName);
			}
			this.selectedFields = this.selectedFields.filter((item, i, ar) => ar.indexOf(item) === i);
		}
		if(action =='deSelectAll'){
			this.selectedFields = this.deselectAll;
		}		
		this.apiService.updateSelectedFields(this.auth.getValue('jwt'),{"fields":this.selectedFields}).subscribe((response) => {
			this.getDevices();
		}, (err) => {
			console.log("errinFields :" + err);
		});
	}

	parsejosn(array,key){
		//var test = JSON.parse(array);
		//console.log(array_key['client_name']);
		//console.log(array);
		//console.log(test['client_name'])
		//return array.key

	}

	getDevices(){
		this.spinner.show();
		this.getFields();
		this.apiService.deviceList(this.auth.getValue('jwt')).subscribe((response) => {
			this.deviceData = response;
			this.spinner.hide();
			this.filterdeviceData = response;
			for(var kk=0;kk<this.deviceData.length;kk++){
				if(response[kk].contract !=null){
					this.endDate = this.getDateDiff(response[kk].contract.end_date, 'datetype');
					this.contract_data = response[kk].contract.name+' ('+this.getDateDiff(response[kk].contract.end_date,'differnce')+')';
				}else{
					this.endDate = 'None';
					this.contract_data = 'None';
				}
				var todayFullDate = new Date();
				var presentMonth = todayFullDate.getMonth();
				//var eff = response[kk].counter_count - response[kk].rent_cost;
				var counter_sum = 0 + 0 + 0;
				var coeffcient = response[kk].counter_divisor;
				var amount = counter_sum/coeffcient;
				var efficency = amount - response[kk].rent_cost - 0.25*amount;   
				var efficency_check = efficency == 0?"":0 >= 85 ?"High":"Low";
				this.excelData[kk]= {
					"Location": response[kk].location,
					"Date":"26-05-2018",
					"Device Type": response[kk].type,
					"Device": response[kk].name,
					"usage":"Other",
					"Quantity":"1",
					"serial no.":"BHAA0513 ",
					"Key Number": response[kk].key,
					"Product":"capsule",
					"Product price":"0.25",
					"coefficient":coeffcient,
					"Rent (VAT included)": response[kk].rent_cost
				}
				for(let i=0; i < presentMonth + 1; i++){
					var month = this.monthArray.find(obj=> obj.id == i);
					this.excelData[kk][month.MonthName + "Counter 1" ] = "0";
					this.excelData[kk][month.MonthName + "Counter 2"] = "0";
					this.excelData[kk][month.MonthName + "Counter 3"] = "0";
					this.excelData[kk][month.MonthName + "Counter sum"] = counter_sum;
					this.excelData[kk][month.MonthName + "Amount"] = amount;
					this.excelData[kk][month.MonthName + "efficency"] = efficency;
					this.excelData[kk][month.MonthName + "Efficency Check"] = efficency_check;
					this.excelData[kk][month.MonthName + "Rent"] = response[kk].rent_cost;
				}
			}
			this.uniVal = this.getUniqueValuesOfKey(this.deviceData, 'status');
			this.dList = this.getUniqueValuesOfKey(this.deviceData, 'type');
			this.regionList = this.getUniqueValuesOfKey(this.deviceData, 'region');
			this.userList = this.getUniqueValuesOfKey(this.deviceData, 'assign_to');
			this.config5.placeholder = "Showing " + this.userList.length + " fields";
			this.config4.placeholder = "Showing " + this.regionList.length + " fields";
			this.config3.placeholder = "Showing " + this.dList.length + " fields";
			this.config.placeholder = "Showing " + this.uniVal.length + " fields";
		},(err) => {
			this.auth.logout();
			console.log(err);
		});
	}

	getCurrentUser(){
		this.apiService.getUser(this.jwtToken).subscribe((response) => {
			if(response['id']){
				this.userrole = response['role'];	
				localStorage.setItem("role",this.userrole);
			}else{
				this.userrole = null
			}
		},(err) => {
			console.log(err)
			this.auth.logout();
		});
	}

	getUniqueValuesOfKey(array, key){
		return array.reduce(function(carry, item){
			if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
			return carry;
		}, []);
	}

	deviceCall(val){
		var pagere = '/devices/'+val;
		this.router.navigate([pagere])
	}

	selectionChanged(val){
		this.selectedFields = val.value
	}

	highlightDevice(device){
		this.showcheck = false;
		if(device.contract != null && !device.contract_ended) {
            var daysUntilContractEnd = moment(device.contract.end_date).diff(moment(Date.now()), 'days');
            if (daysUntilContractEnd <= 0) { //already ended
				this.showcheck = true;
				if(this.redFirst){
					this.colour.push("Red");
				}
				if(this.colourFirst){
					this.redcolour.push(device);	
				}
				this.redFirst = false;
                return "danger";
            }else if (daysUntilContractEnd <= 7) { //week remaining
				this.showcheck = false;
				if(this.yellowFirst){
					this.colour.push("Yellow");
				}
				if(this.colourFirst){
					this.yellowcolour.push(device);	
				}
				this.yellowFirst = false;
                return "warning";
            } else if (daysUntilContractEnd <= 30) { // month remaining
				this.showcheck = false;
				if(this.greyFirst){
					this.colour.push("Grey");
				}
				if(this.colourFirst){
					this.greycolour.push(device);	
				}
				this.greyFirst = false;
                return "active";
			}
			this.colourFirst = false;
			this.colourfilter = this.colour;
        }
	}

	labelType(type){
        switch (type) {
            case "online":
                return "label-success";
            case "offline":
                return "label-danger";
            case "service":
                return "label-warning";
            case "transporting":
                return "label-info";
            default:
                return "label-default"
        }
    }

    exportAsXLSX():void {
		this.excelService.exportAsExcelFile(this.excelData, 'alldevice');
	}

	getDateDiff(fromDate,type){
		var diffInDays;
		if(type="datetype"){
			diffInDays = moment(fromDate).format('dd, DD.MM.YYYY');
		}
		if(type="differnce"){			
			let firstDate = moment(fromDate);
			
			var secondDate = moment();
			diffInDays = Math.abs(firstDate.diff(secondDate, 'days'));
			
			if(diffInDays < 30){
				if(moment(firstDate).isAfter(secondDate)){
					diffInDays = '-'+diffInDays;
				}
				diffInDays = diffInDays+1;
				diffInDays = Math.round(diffInDays)+' '+'days ago';
				
			}
			
			if(diffInDays > 29 && diffInDays < 366){
				diffInDays = Math.abs(firstDate.diff(secondDate, 'months', true));

				if(moment(firstDate).isSameOrAfter(secondDate)){
					diffInDays = 'in '+Math.round(diffInDays)+' '+'months';
				}else{
					diffInDays = Math.round(diffInDays)+' '+'months ago';
				}
			}
			if(diffInDays > 365){
				diffInDays = Math.abs(firstDate.diff(secondDate, 'years', true));
				if(moment(firstDate).isSameOrAfter(secondDate)){
					diffInDays = 'in '+Math.round(diffInDays)+' '+'years';
				}else{
					diffInDays = Math.round(diffInDays)+' '+'years ago';
				}
			}
		}
		return diffInDays;
	}

	run(){
		swal({
			content: {
				element: "input",
				attributes: {
					placeholder: "Ex. 298-1401000011",
					type: "text",
				}
			},
			title: 'Create New Device',
			text: 'Device code:',
			buttons: [true,true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value != null){
				value = '/devices/'+value+'/add';
				this.router.navigate([value])
			}
		});
	}
 
	onSelect(event, type) {
		this.eventVal = event.value
		var arr = []
		if (type == "Device_type") {
			if (this.status_type || this.user_type || this.region_type) {
				if (event.value.length > 0) {
					for (let i = 0; i < this.deviceData.length; i++) {
						if (this.eventVal.includes(this.deviceData[i].type)) {
							arr.push(this.deviceData[i]);
						}
					}
					this.deviceData = arr
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			} else {
				if (event.value.length > 0) {
					for (let i = 0; i < this.filterdeviceData.length; i++) {
						if (this.eventVal.includes(this.filterdeviceData[i].type)) {
							arr.push(this.filterdeviceData[i]);
						}
					}
					this.deviceData = arr
					this.device_type = true;
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			}
		} 
		else if (type == "region_type") {
			if (this.status_type || this.user_type || this.device_type) {
				if (event.value.length > 0) {
					for (let i = 0; i < this.deviceData.length; i++) {

						if (this.eventVal.includes(this.deviceData[i].region)) {
							arr.push(this.deviceData[i]);
						}
					}
					this.deviceData = arr
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			} else {
				if (event.value.length > 0) {
					for (let i = 0; i < this.filterdeviceData.length; i++) {
						if (this.eventVal.includes(this.filterdeviceData[i].region)) {
							arr.push(this.filterdeviceData[i]);
						}
					}
					this.deviceData = arr
					this.region_type = true;
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			}

		}

		else if (type == "user_type") {
			if (this.status_type || this.region_type || this.device_type) {
				if (event.value.length > 0) {
					for (let i = 0; i < this.deviceData.length; i++) {
						if (this.eventVal.includes(this.deviceData[i].assign_to)) {
							arr.push(this.deviceData[i]);
						}
					}
					this.deviceData = arr;
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			} else {
				if (event.value.length > 0) {
					for (let i = 0; i < this.filterdeviceData.length; i++) {
						if (this.eventVal.includes(this.filterdeviceData[i].assign_to)) {
							arr.push(this.filterdeviceData[i]);
						}
					}
					this.deviceData = arr;
					this.user_type = true;
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			}

		} else if (type == "Status") {
			if (this.user_type || this.region_type || this.device_type) {
				if (event.value.length > 0) {
					for (let i = 0; i < this.deviceData.length; i++) {

						if (this.eventVal.includes(this.deviceData[i].status)) {
							arr.push(this.deviceData[i]);
						}
					}
					this.deviceData = arr
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			} else {
				if (event.value.length > 0) {
					for (let i = 0; i < this.filterdeviceData.length; i++) {
						if (this.eventVal.includes(this.filterdeviceData[i].status)) {
							arr.push(this.filterdeviceData[i]);
						}
					}
					this.deviceData = arr;
					this.status_type = true;
				}
				else {
					this.spinner.show();
					this.getDevices();
				}
			}
		}
		this.uniVal = this.getUniqueValuesOfKey(this.deviceData, 'status');
		this.dList = this.getUniqueValuesOfKey(this.deviceData, 'type');
		this.regionList = this.getUniqueValuesOfKey(this.deviceData, 'region');
		this.userList = this.getUniqueValuesOfKey(this.deviceData, 'assign_to');
		this.config5.placeholder = "Showing " + this.userList.length + " fields";
		this.config4.placeholder = "Showing " + this.regionList.length + " fields";
		this.config3.placeholder = "Showing " + this.dList.length + " fields";
		this.config.placeholder = "Showing " + this.uniVal.length + " fields";
	}

	onSelect2(event) {
		this.eventVal = event.value
		if (event.value.length > 0) {
				if (this.eventVal.includes("Red") && !this.eventVal.includes("Yellow") && !this.eventVal.includes("Grey")) {
					this.deviceData = this.redcolour;
				}
				if(this.eventVal.includes("Red") && this.eventVal.includes("Yellow")){
					this.deviceData = this.redcolour.concat(this.yellowcolour);
				}
				if(this.eventVal.includes("Grey") && this.eventVal.includes("Yellow")){
					this.deviceData = this.greycolour.concat(this.yellowcolour);
				}
				if(this.eventVal.includes("Grey") && this.eventVal.includes("Red")){
					this.deviceData = this.redcolour.concat(this.greycolour);
				}
				if(this.eventVal.includes("Red") && this.eventVal.includes("Yellow") &&  this.eventVal.includes("Grey")){
					var arr 		= this.redcolour.concat(this.greycolour);
					this.deviceData = arr.concat(this.yellowcolour);
				}
				if(this.eventVal.includes("Grey") && !this.eventVal.includes("Yellow") && !this.eventVal.includes("Red") ){
					this.deviceData = this.greycolour;
				}
				if(this.eventVal.includes("Yellow") && !this.eventVal.includes("Red") && !this.eventVal.includes("Grey")){
					this.deviceData = this.yellowcolour;
				}
		}
		else{
			this.spinner.show();
			this.getDevices();
		}
	}


	onSearchChange(event) {
		this.eventVal = event;
		if (this.eventVal.length > 0) {
			if ("red".includes(this.eventVal.toLowerCase()) && !"yellow".includes(this.eventVal.toLowerCase()) && !"grey".includes(this.eventVal.toLowerCase())) {
				this.deviceData = this.redcolour;
			}
			if("red".includes(this.eventVal.toLowerCase()) && "yellow".includes(this.eventVal.toLowerCase())){
				this.deviceData = this.redcolour.concat(this.yellowcolour);
			}
			if("grey".includes(this.eventVal.toLowerCase()) && "yellow".includes(this.eventVal.toLowerCase())){
				this.deviceData = this.greycolour.concat(this.yellowcolour);
			}
			if("grey".includes(this.eventVal.toLowerCase()) && "red".includes(this.eventVal.toLowerCase())){
				this.deviceData = this.redcolour.concat(this.greycolour);
			}
			if("red".includes(this.eventVal.toLowerCase()) && "yellow".includes(this.eventVal.toLowerCase()) &&  "grey".includes(this.eventVal.toLowerCase())){
				var arr 		= this.redcolour.concat(this.greycolour);
				this.deviceData = arr.concat(this.yellowcolour);
			}
			if("grey".includes(this.eventVal.toLowerCase()) && !"yellow".includes(this.eventVal.toLowerCase()) && !"red".includes(this.eventVal.toLowerCase())){
				this.deviceData = this.greycolour;
			}
			if("yellow".includes(this.eventVal.toLowerCase()) && !"red".includes(this.eventVal.toLowerCase()) && !"grey".includes(this.eventVal.toLowerCase())){
				this.deviceData = this.yellowcolour;
			}
			if(!"yellow".includes(this.eventVal.toLowerCase()) && !"red".includes(this.eventVal.toLowerCase()) && !"grey".includes(this.eventVal.toLowerCase())){
				this.deviceData = "";
			}
		}else {
			this.spinner.show();
			this.getDevices();
		}

	}
	OnDeSelect(event){
	}

}