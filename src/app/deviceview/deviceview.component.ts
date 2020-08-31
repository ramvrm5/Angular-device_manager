import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment'
import swal from 'sweetalert';
import sweetAlert from 'sweetalert2';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { UploadService } from  '../upload.service';
import { parse } from 'cfb/types';

@Component({
	selector: 'app-deviceview',
	templateUrl: './deviceview.component.html',
	styleUrls: ['./deviceview.component.css']
})
export class DeviceviewComponent implements OnInit {
	faCoins = faCoins;
	imgVal;	
	public uploader;
	viewId = 0;
	kk;
	jwtToken;
	coinboxval;
	coinboxHide;
	coinboxshow;
	key:any;
	upload: boolean = false;
	single_counter: boolean;
	multi_counter: boolean;
	historybutton: boolean;
	creatingContract: boolean;
	addContracttf: boolean;
	addContract: boolean;
	mainContent: boolean;
	ChangeContent: boolean;
	CorrectContent: boolean;
	markRetrieved: boolean;
	markRetrievedRed: boolean;
	firsttimecontent: boolean;
	changingWarranty_end_date: boolean;
	show;
	device;
	formval;
	changingComment;
	updateForm;
	commentForm;
	locationView;
	empty:any="";
	locationData;
	imagsrc;
	locClass;
	statusView;
	statusData;
	statClass;
	histClass;
	Client_name;
	Upload_contract_file;
	Address_1;
	Address_2;
	Contact_person;
	Contact_person_number;
	Register_code;
	VAT_code;
	Contact_person_position;
	ContractValue: any = {};
	multipleCounts: any = {};
	calculate_contact_time;
	Monthly_rent;
	addingCounts = 0;
	contractData: any = {};
	newCounter: any = {};
	globalValue: any = {};
	editedIssue: any = {};
	devicecontractId: any;
	contractHist;
	counter;
	counterCreate;
	counterForm;
	services;
	issueClosed;
	imagegetUrl;
	issueOpen;
	keyCheck;
	regions: Array<any> = [];
	devicetype: Array<any> = [];
	userList = [];
	regionList = [];
	DevicetypeList = [];
	issueEditing;
	deviceRange;
	first = false;
	users;
	selectedFieldsonly = ['Every Individual Counter','Counter Real', 'Counter Display', 'Counter Value', 'User', 'Timestamp'];
	selectList = [];
	deselectList = [];
	deselectAll = [];
	items = [];
	role;
	selectAll = [];
	itemList = [];
	selectedFields: Array<any> = [];
	selectedheaderlist = [];
	selectedNotificationList = [];
	Settings = {};
	updateContractdetails: any;
	newContractdetails: any;
	locationsField;
	Warranty_enddate: any;
	locations: any = [];
	previousArray: any = [];
	form: FormGroup;
	uploadResponse;
	counterVal: any = [];
	evenVal: any = [];
	unevenVal: any = [];
	ContractStatus = [
		{ "id": "0", "itemName": "Renewal" },
		{ "id": "1", "itemName": "Contract Sent" },
		{ "id": "2", "itemName": "Signed" }
	];
	headerList = [
		{ "id": "0", "itemName": "ID" },
		{ "id": "1", "itemName": "Every Individual Counter" },
		{ "id": "2", "itemName": "Counter Display" },
		{ "id": "3", "itemName": "Counter Real" },
		{ "id": "5", "itemName": "Counter Counts Added" },
		{ "id": "6", "itemName": "Counter Value" },
		{ "id": "7", "itemName": "Counter Output" },
		{ "id": "8", "itemName": "Output Counter Display" },
		{ "id": "9", "itemName": "Output Counter Real" },
		{ "id": "10", "itemName": "Output Counts Added" },
		{ "id": "11", "itemName": "Counter Real Sum" },
		{ "id": "12", "itemName": "Counter Value Sum" },
		{ "id": "13", "itemName": "Counter Added Sum" },
		{ "id": "14", "itemName": "Output Counts Sum" },
		{ "id": "13", "itemName": "Output Counts Added Sum" },
		{ "id": "16", "itemName": "User" },
		{ "id": "17", "itemName": "Timestamp" },
	]

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService: ApiServiceService,
		public auth: AuthService,
		private http: HttpClient,
		private location: Location,
		private uploadService: UploadService
	) {
		this.issueEditing = -1;
		this.editedIssue = {
			severity: "",
			message: "",
		}
		this.updateContractdetails = {
			name: "",
			start_date: "",
			end_date: "",
		}
		this.newContractdetails = {
			name: "",
			start_date: "",
			end_date: "",
		}
		this.creatingContract = false;
		this.historybutton = true;
		this.mainContent = true;
		this.ChangeContent = false;
		this.CorrectContent = false;
		this.role = localStorage.getItem("role") == "admin" ? true : false;
		this.updateForm = new FormGroup({
			type: new FormControl(null, Validators.required),
			name: new FormControl(null, Validators.required),
		});

		this.commentForm = new FormGroup({
			comment: new FormControl(null, Validators.required)
		});
		this.counterForm = new FormGroup({
			counter_display: new FormControl(null, Validators.required)
		});


		this.show = false;
		this.locClass = 'fa-chevron-down';
		this.statClass = 'fa-chevron-down';
		this.histClass = 'fa-chevron-down';
		this.formval = false;
		//this.counterShow = true;
		this.changingComment = false;
		this.changingWarranty_end_date = false;
		this.jwtToken = this.auth.getValue('jwt');
		this.activatedRoute.params.subscribe(params => {
			this.viewId = params['id'];
			this.getDevice();
		});
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
	      avatar: ['']
	    });
	    this.imgVal = this.formBuilder.group({
	      issue_image: [''],
	      issue_id: ['']
	    });
		this.first = true
		this.Settings = {
			singleSelection: false,
			text: "Select",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
			badgeShowLimit: 1,
			classes: "custom-class-example2"
		};
		//this.getFields();
		this.onItemSelect(this.selectedFieldsonly);
		this.allusers();
		this.allregions();
		this.allDevicetypes();
		this.getlocations();
		this.getContractField();
	}

	onFileSelect(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.form.get('avatar').setValue(file);
			this.upload = true;
		}
	}

	onFile_Select(event,id){
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.imgVal.get('issue_image').setValue(file);
			this.imgVal.get('issue_id').setValue(id);
		}
	}

	allDevicetypes(){
		this.apiService.getDeviceList(this.jwtToken).subscribe((response:any) => {
			this.devicetype = response;
			var devicetype = {}
			for (let i = 0; i < this.devicetype.length; i++) {
				devicetype = {}
				devicetype["id"] = this.devicetype[i].id
				devicetype["device_name"] = this.devicetype[i].device_name
				this.DevicetypeList.push(devicetype);
			}
		},(err) => {
			this.auth.logout();
			console.log(err);
		});
	}

	allregions(){
		this.apiService.getRegion(this.jwtToken).subscribe((response:any) => {
			this.regions = response;
			var regionList = {}
			for (let i = 0; i < this.regions.length; i++) {
				regionList = {}
				regionList["id"] = this.regions[i].id
				regionList["region_name"] = this.regions[i].region_name
				this.regionList.push(regionList);
			}
		},(err) => {
			console.log(err);
		});
	}

	onSubmit() {
		const formData = new FormData();
		formData.append('avatar', this.form.get('avatar').value);
		var url = 'contractfield/'+this.viewId+'/upload'
		this.uploadService.uploadFile(formData,url).subscribe((res) => {
			this.uploadResponse = res;
			this.getContractField();
			swal({
				title: "Success!",
				text: "Contract File uploaded!",
				timer: 500,
				icon: "success"
			});
		},(err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem in uploading contract file!",
				timer: 500,
				icon: "error"
			});
			}
	    );
	}

	helloDev(){
		const formData = new FormData();
		formData.append('avatar', this.imgVal.get('issue_image').value);
		formData.append('issue_id', this.imgVal.get('issue_id').value);
		var myval = this.imgVal.get('issue_id').value;
		var uploadUrl = 'devices/'+this.viewId+'/issues/'+myval
		this.uploadService.uploadFile(formData,uploadUrl).subscribe((res) => {
			this.getIssueOpen();
			swal({
				title: "Success!",
				text: "File uploaded!",
				timer: 500,
				icon: "success"
			});
		},(err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem in uploadinf contract file!",
				timer: 500,
				icon: "error"
			});
			}
	    );
	}

	on_Change(){
		console.log(this.multipleCounts);
	}

	onChange(event,id,type){
		if (type == "Counter_value") {
			this.counterVal[id] = { "counter_display": event };
		}
		if (type == "output") {
			this.evenVal[id]  = { "output": event };
		}
		if (type == "uneven_output") {
			this.unevenVal[id] = { "output_display": event};
		}
	}

	editIssue(issue) {
		this.issueEditing = issue.id;
		this.editedIssue.message = issue.message;
		this.editedIssue.severity = issue.severity;
	};

	saveIssue(issue) {
		this.issueEditing = -1;
		var data = {
			"message": this.editedIssue.message,
			"severity": this.editedIssue.severity
		}
		this.apiService.saveEditIssue(this.jwtToken, issue.id, data).subscribe((response) => {
			this.getIssueOpen();
			swal({
				title: "Success!",
				text: "issue Edited!",
				timer: 500,
				icon: "success"
			});
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem with saving the issue!",
				timer: 500,
				icon: "error"
			});
		});
	}

	markAsClosed(issue) {
		var data = issue.status = "closed";
		this.apiService.markedCloseIssue(this.jwtToken, issue.id, data).subscribe((response) => {
			this.getIssueOpen();
			this.getIssueClosed();
			swal({
				title: "Success!",
				text: "issue closed!",
				timer: 500,
				icon: "success"
			});
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem with closing the issue!",
				timer: 500,
				icon: "error"
			});
		});
	}


	markAsOpen(issue) {
		var data = issue.status = "open";
		this.apiService.markedOpenIssue(this.jwtToken, issue.id, data).subscribe((response) => {
			this.getIssueClosed();
			this.getIssueOpen();
			swal({
				title: "Success!",
				text: "issue opened!",
				timer: 500,
				icon: "success"
			});
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem with opening the issue!",
				timer: 500,
				icon: "error"
			});
		});
	}


	openCorrectPanel() {
		this.mainContent = false;
		this.CorrectContent = true;
	}

	openChangePanel() {
		this.mainContent = false;
		this.ChangeContent = true;
	}

	saveChangePanel() {
		var end_ = moment(this.updateContractdetails.start_date).format("YYYY-MM-DD");
		var end = { end_date: moment(end_, 'YYYY-MM-DD').subtract(1, 'days').format("YYYY-MM-DD") };
		this.apiService.updateChangedContract(this.jwtToken, this.devicecontractId, end).subscribe((response) => {
			this.apiService.addChangedContract(this.jwtToken, this.viewId, this.updateContractdetails).subscribe((response) => {
				swal({
					title: "Success!",
					text: "Contract changed!",
					timer: 500,
					icon: "success"
				});
				this.mainContent = true;
				this.ChangeContent = false;
				this.CorrectContent = false;
				this.updateContractdetails.start_date = moment(this.updateContractdetails.start_date).format("YYYY-MM-DD");
				this.updateContractdetails.end_date = moment(this.updateContractdetails.end_date).format("YYYY-MM-DD");
				this.contractData = this.updateContractdetails;
				this.contractGet();
				this.getContract();
				this.highlightControl(this.device)
			}, (err) => {
				console.log(err);
				swal({
					title: "Error!",
					text: "There was a problem with saving the contract!",
					timer: 500,
					icon: "error"
				});
			});
		}, (err) => { console.log(err); });

	}
	saveCorrectPanel() {
		this.apiService.saveCorrectedContract(this.jwtToken, this.devicecontractId, this.updateContractdetails).subscribe((response) => {
			swal({
				title: "Success!",
				text: "Contract edited!",
				timer: 500,
				icon: "success"
			});
			this.mainContent = true;
			this.ChangeContent = false;
			this.CorrectContent = false;
			this.updateContractdetails.start_date = moment(this.updateContractdetails.start_date).format("YYYY-MM-DD");
			this.updateContractdetails.end_date = moment(this.updateContractdetails.end_date).format("YYYY-MM-DD");
			this.contractData = this.updateContractdetails;
			this.highlightControl(this.device);
		}, (err) => {
			console.log(err);
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with correcting the contract!',
				buttons: [false, true],
				timer: 2000
			});
		});
	}
	setCreatingContract() {
		if (this.addContracttf) {
			this.addContract = false;
			this.creatingContract = true;
			this.historybutton = false;
			this.markRetrievedRed = false;
		} else {
			this.addContract = false;
			this.creatingContract = true;
			this.historybutton = false;
			this.markRetrievedRed = false;
		}

	}
	cancelContract() {
		if (this.addContracttf) {
			this.addContract = true;
			this.historybutton = true;
			this.creatingContract = false;
			this.markRetrievedRed = false;
		} else {
			this.addContract = true;
			this.historybutton = true;
			this.creatingContract = false;
			this.markRetrievedRed = true;
		}
	}
	cancelChangePanel() {
		this.mainContent = true;
		this.ChangeContent = false;
		this.CorrectContent = false;
	}
	markRetrievedClick() {
		var markRetrieved = { contract_ended: true }
		this.apiService.markRetrievedDevice(this.jwtToken, this.viewId, markRetrieved).subscribe((response) => {
			this.markRetrieved = false;
			this.markRetrievedRed = true;
			this.addContract = true;
			this.firsttimecontent = false;
			this.highlightControl(this.device);
		}, (err) => { console.log(err); });
	}
	markRetrievedRedClick() {
		var markRetrieved = { contract_ended: false }
		this.apiService.markRetrievedDevice(this.jwtToken, this.viewId, markRetrieved).subscribe((response) => {
			this.markRetrieved = true;
			this.markRetrievedRed = false;
			this.firsttimecontent = true;
			this.highlightControl(this.device);
			this.contractGet();
		}, (err) => { console.log(err); });
	}

	createContract() {
		this.newContractdetails.start_date = moment(this.newContractdetails.start_date).format("YYYY-MM-DD");
		this.newContractdetails.end_date = moment(this.newContractdetails.end_date).format("YYYY-MM-DD");
		this.apiService.addChangedContract(this.jwtToken, this.viewId, this.newContractdetails).subscribe((response) => {
			swal({
				title: "Success!",
				text: "Contract created!",
				timer: 500,
				icon: "success"
			});
			if (this.addContracttf) {
				this.contractData = this.newContractdetails;
				this.historybutton = true;
				this.creatingContract = false;
				this.markRetrievedRed = false;
				this.highlightControl(this.device);
				this.contractGet();
			} else {
			this.contractData = this.newContractdetails;
				this.historybutton = true;
				this.creatingContract = false;
				this.markRetrievedRed = true;
				this.highlightControl(this.device);
				this.contractGet();
			}
		}, (err) => {
			console.log(err);
			swal({
				title: "Error!",
				text: "There was a problem with creating the contract!",
				timer: 1000,
				icon: "error"
			});
		});
	}

	allusers() {
		this.apiService.getUsers(this.jwtToken).subscribe((response) => {
			this.users = response;
			var usersList = {}
			var testcode: any;
			for (let i = 0; i < this.users.length; i++) {
				usersList = {}
				usersList["id"] = this.users[i].id
				usersList["username"] = this.users[i].username
				this.userList.push(usersList);
			}
		}, (err) => {
			if (err.statusText == "Unauthorized") {
				this.auth.logout();
			} else {
				console.log(err);
			}
		});
	}

	getIssueOpen() {
		this.apiService.getIssueOpen(this.jwtToken, this.viewId).subscribe((response) => {
			this.issueOpen = response;
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	getIssueClosed() {
		this.apiService.getIssueClosed(this.jwtToken, this.viewId).subscribe((response) => {
			this.issueClosed = response;
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	getContract() {
		this.apiService.contractHistory(this.jwtToken, this.viewId).subscribe((response) => {
			this.contractHist = response;
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	getLocation() {
		this.apiService.getLocationHistory(this.jwtToken, this.viewId).subscribe((response) => {
			this.locationData = response;
			this.locationData = this.locationData.reverse();
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	getStatus() {
		this.apiService.getStatusHistory(this.jwtToken, this.viewId).subscribe((response) => {
			this.statusData = response;
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}
	
	device_variable_output(variable_output, uneven_output) {
		if (variable_output && !uneven_output) {
			return 'form-group col-sm-6';
		} else {
			return 'form-group col-xs-12';
		}
	}

	getDevice() {
		this.apiService.getDevice(this.jwtToken, this.viewId).subscribe((response) => {
			if (response['id']) {
				this.show = true;
				this.device = response;
				this.key = this.device.key;
				if (this.device.uneven_output == 1 && this.device.variable_output == 1) {
					this.multipleCounts = {
						counter_display: "",
						output: "",
						output_display: "",
					}
				}
				if (this.device.uneven_output == 1) {
					this.multipleCounts = {
						counter_display: "",
						output_display: "",
					}
				}
				if (this.device.variable_output == 1) {
				this.multipleCounts = {
					counter_display: "",
					output: "",
				}
				}
				this.device.counter_count
				if (this.device.counter_count == "2") {
					this.items.push("1", "2");
				} else if (this.device.counter_count == "3") {
					this.items.push("1", "2", "3");
				}
				if (this.device.contract_ended == 0) {
					this.markRetrievedRed = false;
					this.markRetrieved = true;
				}
				else {
					this.markRetrievedRed = true;
					this.addContract = true;
					this.markRetrieved = false;
				}
				this.deviceRange = Array(this.device.counter_count).fill(0).map((x, i) => i);
				this.updateForm.controls['type'].setValue(this.device.type);
				this.updateForm.controls['name'].setValue(this.device.name);
				//this.getUsers(this.device.assign_to)
				this.commentForm.controls['comment'].setValue(this.device.comment);
				this.Monthly_rent = response['rent_cost'];
				this.serviceList();
				this.getLocation();
				this.getStatus();
				this.getContract();
				this.getIssueOpen();
				this.getIssueClosed();
				this.contractGet();
				this.counterList();
			} else {
				this.show = false;
				this.router.navigate(['/devices'])
			}
		}, (error) => {
			if (error.status == 404 || error.status == 400) {
				swal({
					title: "Non-existent Device",
					text: "Do you want to create this device?",
					buttons: [true, true],
					closeOnClickOutside: false,
				}).then((value) => {
					if (value) {
						this.setRedirect(this.viewId, 'add');
					} else {
						this.router.navigate(['/devices'])
					}
				});
			} else {
				this.setRedirect(this.viewId, 'add');
			}
		});
	}

	serviceList() {
		this.apiService.getService(this.jwtToken, this.viewId).subscribe((response) => {
			this.services = response;
			this.services = this.services.reverse();
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	tableshow(val) {
		if ("device_counter_count1" == val) {
			if (this.device.counter_count <= 1) {
				return true;
			} else {
				return false;
			}
		}
		if ("device_counter_count2" == val) {
			if (this.device.counter_count >= 2) {
				return true;
			} else {
				return false;
			}
		}

		/* FOR SINGLE COUNTER STARTS*/

		if ("ID1" == val) {
			if (this.selectedFields.indexOf('ID') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Display1" == val) {
			if (this.selectedFields.indexOf('Counter Display') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Real1" == val) {
			if (this.selectedFields.indexOf('Counter Real') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Value1" == val) {
			if (this.selectedFields.indexOf('Counter Value') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Counts Added1" == val) {
			if (this.selectedFields.indexOf('Counter Counts Added') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counter Display1" == val) {
			if (this.selectedFields.indexOf('Output Counter Display') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counter Real1" == val) {
			if (this.selectedFields.indexOf('Output Counter Real') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output counts Added1" == val) {
			if (this.selectedFields.indexOf('Output counts Added') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("User1" == val) {
			if (this.selectedFields.indexOf('User') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Timestamp1" == val) {
			if (this.selectedFields.indexOf('Timestamp') >= 0) {
				return true;
			} else {
				return false;
			}
		}

		/* FOR SINGLE COUNTER ENDS */


		/* FOR MULTIPLE COUNTER STARTS */

		if ("ID" == val) {
			if (this.selectedFields.indexOf('ID') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Display" == val) {
			if (this.selectedFields.indexOf('Counter Display') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Real" == val) {
			if (this.selectedFields.indexOf('Counter Real') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Value" == val) {
			if (this.selectedFields.indexOf('Counter Value') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Output" == val) {
			if (this.selectedFields.indexOf('Counter Output') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0 && this.device.variable_output) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Counts Added" == val) {
			if (this.selectedFields.indexOf('Counter Counts Added') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counter Display" == val) {
			if (this.selectedFields.indexOf('Output Counter Display') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counter Real" == val) {
			if (this.selectedFields.indexOf('Output Counter Real') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counts Added" == val) {
			if (this.selectedFields.indexOf('Output Counts Added') >= 0 && this.selectedFields.indexOf('Every Individual Counter') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Real Sum" == val) {
			if (this.selectedFields.indexOf('Counter Real Sum') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Value Sum" == val) {
			if (this.selectedFields.indexOf('Counter Value Sum') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Counter Added Sum" == val) {
			if (this.selectedFields.indexOf('Counter Added Sum') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counts Sum" == val) {
			if (this.selectedFields.indexOf('Output counts Sum') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Output Counts Added Sum" == val) {
			if (this.selectedFields.indexOf('Output Counts Added Sum') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("User" == val) {
			if (this.selectedFields.indexOf('User') >= 0) {
				return true;
			} else {
				return false;
			}
		}
		if ("Timestamp" == val) {
			if (this.selectedFields.indexOf('Timestamp') >= 0) {
				return true;
			} else {
				return false;
			}
		}

		/* FOR MULTIPLE COUNTER ENDS */
	}

	counterList() {
		this.apiService.getCounter(this.jwtToken, this.viewId).subscribe((response: any[]) => {
			if (response.length > 0) {
				this.counter = response;
				this.counter = this.counter.reverse();
			} else {
				//this.counterShow = false;
			}
		}, (err) => { 
			console.log(err); 
		});
	}

	divide(divident, divisor){
		if(isNaN(divident) || isNaN(divisor)) {
			return null;
		} else {
			return divident / divisor;
		}
  	};

	calcCountsAdded(index, row, counter_label){
        if(counter_label === null) {
            if (typeof(this.counter[this.counter.length - index - 2]) !== "undefined") {
                return row.counter_real - this.counter[this.counter.length - index - 2].counter_real;
            } else if (typeof(row.counter_real) !== "undefined") {
                return row.counter_real;
            } else {
                return "";
            }
        } else {
            if (typeof(this.counter[this.counter.length - index - 2]) !== "undefined" &&
                    typeof(this.counter[this.counter.length - index - 2].children[counter_label - 1]) !== "undefined") {
                return row.children[counter_label - 1].counter_real -
                        this.counter[this.counter.length - index - 2].children[counter_label - 1].counter_real;
            } else if (typeof(row.children[counter_label - 1]) !== "undefined") {
                return row.children[counter_label - 1].counter_real;
            } else {
                return "";
            }
        }
    };

    calcOutputsAdded(index, row, counter_label){
        if(counter_label === null) {
            if (typeof(this.counter[this.counter.length - index - 2]) !== "undefined") {
                return row.output_real - this.counter[this.counter.length - index - 2].output_real;
            } else if (typeof(row.output_real) !== "undefined") {
                return row.output_real;
            } else {
                return "";
            }
        } else {
            if (typeof(this.counter[this.counter.length - index - 2]) !== "undefined" &&
                    typeof(this.counter[this.counter.length - index - 2].children[counter_label - 1]) !== "undefined") {
                return row.children[counter_label - 1].output_real -
                        this.counter[this.counter.length - index - 2].children[counter_label - 1].output_real;
            } else if (typeof(row.children[counter_label - 1]) !== "undefined") {
                return row.children[counter_label - 1].output_real;
            } else {
                return "";
            }
        }
    }

	changeContractField(title) {
		var inputValue = "";

		if (title == "Client name") {
			if (this.Client_name) {
				inputValue = this.Client_name;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Client name") {
						this.Client_name = value.value;
						this.ContractValue = { "client_name": this.Client_name };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Address 1") {
			if (this.Address_1) {
				inputValue = this.Address_1;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Address 1") {
						this.Address_1 = value.value;
						this.ContractValue = { "address_1": this.Address_1 };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Address 2") {
			if (this.Address_2) {
				inputValue = this.Address_2;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Address 2") {
						this.Address_2 = value.value;
						this.ContractValue = { "address_2": this.Address_2 };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Contact person") {
			if (this.Contact_person) {
				inputValue = this.Contact_person;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Contact person") {
						this.Contact_person = value.value;
						this.ContractValue = { "contact_person": this.Contact_person };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Contact person number") {
			if (this.Contact_person_number) {
				inputValue = this.Contact_person_number;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value ) {
							return 'You need to write something!'
						}else if(value.match(/[a-zA-Z]/i)){
							return 'only Numberic!'
						}
					}
				}).then((value) => {
					if (title == "Contact person number") {
						this.Contact_person_number = value.value;
						this.ContractValue = { "contact_person_number": this.Contact_person_number };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Register code") {
			if (this.Register_code) {
				inputValue = this.Register_code;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Register code") {
						this.Register_code = value.value;
						this.ContractValue = { "register_code": this.Register_code };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "VAT code") {
			if (this.VAT_code) {
				inputValue = this.VAT_code;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "VAT code") {
						this.VAT_code = value.value;
						this.ContractValue = { "vat_code": this.VAT_code };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
		else if (title == "Contact person position") {
			if (this.Contact_person_position) {
				inputValue = this.Contact_person_position;
				sweetAlert.fire({
					title: title,
					input: 'text',
					inputValue: inputValue,
					showCancelButton: true,
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'You need to write something!'
						}
					}
				}).then((value) => {
					if (title == "Contact person position") {
						this.Contact_person_position = value.value;
						this.ContractValue = { "Contact_person_position": this.Contact_person_position };
					}
					if (value) {
						this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
							swal({
								title: "Success!",
								text: "Contract Field Changed!",
								timer: 1000,
								icon: "success"
							});
							this.getContractField();
							this.serviceList();
						}, (err) => {
							swal({
								icon: 'error',
								title: 'Error!',
								text: 'There was a problem with changing a contract field!',
								buttons: [false, true],
								timer: 1000
							});
	
						});
					}
				});
			}else{
				this.contractfieldnewval(title);
			}
		}
	}

	contractfieldnewval(title){
		swal({
			content: {
				element: "input",
				attributes: {
					type: "text",
				}
			},
			title: title,
			text: 'Write something:',
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (title == "Client name") {
				this.Client_name = value;
				this.ContractValue = { "client_name": this.Client_name };
			}
			else if (title == "Address 1") {
				this.Address_1 = value;
				this.ContractValue = { "address_1": this.Address_1 };
			}
			else if (title == "Address 2") {
				this.Address_2 = value;
				this.ContractValue = { "address_2": this.Address_2 };
			}
			else if (title == "Contact person") {
				this.Contact_person = value
				this.ContractValue = { "contact_person": this.Contact_person };
			}
			else if (title == "Contact person number") {
				this.Contact_person_number = value;
				this.ContractValue = { "contact_person_number": this.Contact_person_number };
			}
			else if (title == "Register code") {
				this.Register_code = value;
				this.ContractValue = { "register_code": this.Register_code };
			}
			else if (title == "VAT code") {
				this.VAT_code = value;
				this.ContractValue = { "vat_code": this.VAT_code };
			}
			else if (title == "Contact person position") {
				this.Contact_person_position = value;
				this.ContractValue = { "Contact_person_position": this.Contact_person_position };
			}
			if (value) {
				this.apiService.changeContractFieldUpdate(this.jwtToken, this.viewId, this.ContractValue).subscribe((response) => {
					swal({
						title: "Success!",
						text: "Contract Field Changed!",
						timer: 1000,
						icon: "success"
					});
					this.serviceList();
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with changing a contract field!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	getContractField() {
		this.apiService.getContractField(this.jwtToken, this.viewId).subscribe((response) => {
			if (response['id']) {
				this.Client_name = response['client_name'];
				this.Address_1 = response['address_1'];
				this.Address_2 = response['address_2'];
				this.Contact_person = response['contact_person'];
				this.Contact_person_number = response['contact_person_number'];
				this.Register_code = response['register_code'];
				this.VAT_code = response['vat_code'];
				this.Contact_person_position = response['Contact_person_position'];
				//this.Upload_contract_file = response['contact_image'];
				var docx = response['contact_image'];
				var docx1 = docx.split('/');
				var docx2 = docx1.length - 1;
				this.Upload_contract_file = docx1[docx2];
			} else {
				swal({
					title: "Non-existent Device",
					text: "No contract filed exists?",
					buttons: [true, true],
					closeOnClickOutside: false,
				})
			}
		}, (error) => {

		});
	}

	getFields(selectedFields) {
		/* 		this.apiService.getVisibleFields(this.auth.getValue('jwt')).subscribe((response) => {
					if (response['counter']) {
						var fields = "";
						console.log(response['counter'])
						for (var jk = 0; jk < response['counter'].length; jk++) {
							fields = ""
							this.itemList[jk] = {"itemName": response['counter'][jk]};
							fields = response['counter'][jk];
							this.selectedFields[jk] = response['counter'][jk]
							if (this.first == true) {
								this.selectedheaderlist.push(this.headerList.find(function (element) {
									return element.itemName == fields
								})
								)
							};
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
				}); */
		if (selectedFields) {
			var fields = "";
			for (var jk = 0; jk < selectedFields.length; jk++) {
				fields = ""
				this.itemList[jk] = { "itemName": selectedFields[jk] };
				fields = selectedFields[jk];
				this.selectedFields[jk] = selectedFields[jk]
				if (this.first == true) {
					this.selectedheaderlist.push(this.headerList.find(function (element) {
						return element.itemName == fields
					})
					)
				};
			}
			this.first = false;
		}
	}

	onItemSelect(item: any) {
		this.selectList = [];
		if (item.itemName) {
			this.selectList.push(item.itemName);
		}
		else {
			this.selectList = item;
		}
		this.updatefields('singleSelect');
	}

	OnItemDeSelect(item: any) {
		this.deselectList = [];
		this.deselectList.push(item.itemName);
		this.updatefields('singledeSelect');
	}

	onSelectAll(items: any) {
		this.selectAll = items;
		this.updatefields('selectAll');
	}

	onDeSelectAll(items: any) {
		this.deselectAll = items;
		this.updatefields('deSelectAll');
	}

	updatefields(action) {
		if (action == 'singleSelect') {
			this.selectedFields = this.selectedFields.concat(this.selectList);
			this.selectedFields = this.selectedFields.filter((item, i, ar) => ar.indexOf(item) === i);
		}
		if (action == 'singledeSelect') {
			for (var i = 0; i < this.deselectList.length; i++) {
				var index = undefined;
				while ((index = this.selectedFields.indexOf(this.deselectList[i])) !== -1) {
					this.selectedFields.splice(index, 1);
				}
			}
		}
		if (action == 'selectAll') {
			for (var k = 0; k < this.selectAll.length; k++) {
				this.selectedFields.push(this.selectAll[k].itemName);
			}
			this.selectedFields = this.selectedFields.filter((item, i, ar) => ar.indexOf(item) === i);
		}
		if (action == 'deSelectAll') {
			this.selectedFields = this.deselectAll;
		}
		this.apiService.updateSelectedFields(this.auth.getValue('jwt'), { "counter": this.selectedFields }).subscribe((response) => {
			this.getFields(this.selectedFields);
		}, (err) => {
			console.log("errinFields :" + err);
		});
	}

	contractGet() {
		this.apiService.getContract(this.jwtToken, this.viewId).subscribe((response) => {
			if (response['start_date'] && response['end_date']) {
				this.contractData = response;
				this.devicecontractId = this.contractData.id;
				this.contractData.start_date = this.updateContractdetails.start_date ? moment(this.updateContractdetails.start_date).format("YYYY-MM-DD") : moment(this.contractData.start_date, 'YYYY-MM-DD').add(1, 'days').format("YYYY-MM-DD");
				this.contractData.end_date = this.updateContractdetails.end_date ? moment(this.updateContractdetails.end_date).format("YYYY-MM-DD") : moment(this.contractData.end_date, 'YYYY-MM-DD').add(1, 'days').format("YYYY-MM-DD");
				this.calculate_contact_time = moment(this.contractData.end_date).diff(moment(this.contractData.start_date), 'days');
				this.updateContractdetails = this.contractData;
				this.addContract = false;
				this.addContracttf = false;
				this.firsttimecontent = true;
			} else {
				this.contractData = {};
				this.addContract = true;
				this.addContracttf = true;
				this.markRetrievedRed = false;
			}
		}, (err) => { console.log(err); /*this.auth.logout();*/ });
	}

	markDevice(device) {
		console.log(device);
	}

	highlightDevice(type) {
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

	highlightStatus(type) {
		switch (type) {
			case "open":
				return "label label-danger";
			case "closed":
				return "label label-default";
			default:
				return "label label-default";
		}
	}

	highlightSeverity(type) {
		switch (type) {
			case "critical":
				return "label label-danger";
			case "major":
				return "label label-warning";
			case "minor":
				return "label label-info";
			case "cosmetic":
				return "label label-success";
			default:
				return "label label-default";
		}
	}

	highlightControl(deviceVal) {
		if (deviceVal != null && deviceVal.contract != null && !deviceVal.contract_ended) {
			var daysUntilContractEnd = moment(deviceVal.contract.end_date).diff(moment(Date.now()), 'days');
			if (daysUntilContractEnd <= 0) { //already ended
				//this.markRetrieved = true;
				//this.markRetrievedRed = false;
				if (this.markRetrievedRed) {
					this.firsttimecontent = false;
				}
				else {
					this.firsttimecontent = true;
				}
				return "panel-danger";
			} else if (daysUntilContractEnd <= 7) { //week remaining
				this.markRetrieved = false;
				this.markRetrievedRed = false;
				this.firsttimecontent = true;
				return "panel-warning";
			} else if (daysUntilContractEnd <= 30) { // month remaining
				this.markRetrieved = false;
				this.markRetrievedRed = false;
				this.firsttimecontent = true;
				return "panel-info";
			} else {
				return "panel-default";
			}
		} else {
			return "panel-default";
		}
	}

	location_view(val) {
		if (this.locationView == val) {
			this.locationView = -1;
			this.locClass = 'fa-chevron-down';
			this.statClass = 'fa-chevron-down';
			this.histClass = 'fa-chevron-down';
		} else {
			this.locationView = val;
			if (val == 'location') {
				this.locClass = 'fa-chevron-up';
				this.statClass = 'fa-chevron-down';
				this.histClass = 'fa-chevron-down';
			} else if (val == 'status') {
				this.histClass = 'fa-chevron-down';
				this.locClass = 'fa-chevron-down';
				this.statClass = 'fa-chevron-up';
			} else if (val == 'history') {
				this.histClass = 'fa-chevron-up';
				this.statClass = 'fa-chevron-down';
				this.locClass = 'fa-chevron-down';
			} else {
				this.locClass = 'fa-chevron-down';
				this.statClass = 'fa-chevron-down';
				this.histClass = 'fa-chevron-down';
			}
		}
	}

	edit() {
		this.formval = !this.formval;
	}

	commnet() {
		this.changingComment = !this.changingComment;
	}

	Warranty_end_date() {
		this.Warranty_enddate = this.device.Warranty_enddate;
		this.changingWarranty_end_date = !this.changingWarranty_end_date;
	}

	S_Counter(boolean) {
		this.addingCounts = Object.assign(this.device.counter_count);
        this.multipleCounts = {};
        this.newCounter = {};
        if(this.device.variable_output && this.counter.length > 0) {
            var previous = this.counter[0];
            if(typeof(previous.children) !== 'undefined' && previous.children.length > 0) {
                for(let i = 0; i < previous.children.length; i++) {
                    this.multipleCounts[i+1] = {};
                    this.multipleCounts[i+1].output = previous.children[i].output;
                }
            } else {
				for(let i = 0; i < this.items.length; i++) {
                    this.multipleCounts[i+1] = {};
                    this.multipleCounts[i+1].output = "";
                }
                //this.multipleCounts.output = previous.output;
            }
        }
		if (this.device.counter_count > 1) {
			this.multi_counter = boolean;
		} else {
			this.single_counter = boolean;
		}
	}

	showCounter(val = 'aa', hide) {
		this.counterCreate = hide;
		if (val == 'reset') {
			this.counterForm.reset();
		}
	}

	keyVal() {
		this.keyCheck = !this.keyCheck;
	}

	getlocations() {
		this.apiService.getlocation(this.jwtToken).subscribe((response) => {
			this.locationsField = response;
			var locations = {}
			for (let i = 0; i < this.locationsField.length; i++) {
				locations = {}
				locations["id"] = this.locationsField[i].id
				locations["locationname"] = this.locationsField[i].location_name
				this.locations.push(locations);
			}
		}, (err) => {
			console.log(err);
		});
	}

	move() {
		const items = this.locations;
		const inputOptions = new Map
		items.forEach(item => inputOptions.set(item.locationname, item.locationname))
		sweetAlert.fire({
			title: "Move Device",
			input: 'select',
			inputOptions,
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			console.log(value)
			if (value === false) return;
			this.globalValue.location = value.value;
			if (value) {
				this.apiService.moveDevice(this.jwtToken, this.viewId, this.globalValue).subscribe((response) => {
					this.device.location = value.value;
					this.getLocation();
					swal({
						title: "Success!",
						text: "Device moved!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with moving the device!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	addService() {
		swal({
			content: {
				element: "input",
				attributes: {
					placeholder: "Write something",
					type: "text",
				}
			},
			title: 'Enter service details!',
			text: 'Write something interesting:',
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			this.globalValue.message = value;
			if (value) {
				this.apiService.createService(this.jwtToken, this.viewId, this.globalValue).subscribe((response) => {
					swal({
						title: "Success!",
						text: "Service logged!",
						timer: 1000,
						icon: "success"
					});
					this.serviceList();
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with adding a service to the device!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	actionEmptyCoinbox() {
		swal({
			title: "Empty Coinbox?!",
			text: "Are you sure?",
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value) {
				this.apiService.emptyCoinbox(this.jwtToken, this.viewId).subscribe((response) => {
					this.serviceList();
					swal({
						title: "Success!",
						text: "Coinbox empty!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with emptying coinbox of the device!',
						buttons: [false, true],
						timer: 2000
					});

				});
			}
		});
	}

	changeregion() {
		const items = this.regionList
		const inputOptions = new Map
		items.forEach(item => inputOptions.set(item.region_name, item.region_name))
		sweetAlert.fire({
			title: "Change Region",
			input: 'select',
			inputOptions,
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			this.globalValue = value
			if (this.globalValue.dismiss) {
				return;
			}
			if (this.globalValue) {
				this.apiService.patchDevice(this.jwtToken, this.viewId, { 'region': this.globalValue.value }).subscribe((response) => {
					this.device.region = this.globalValue.value;
					swal({
						title: "Success!",
						text: "User Assigned!",
						timer: 1500,
						icon: "success"
					});

				}, (err) => {
					console.log(err)
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with updating device region!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	changetype() {
		const items = this.DevicetypeList
		const inputOptions = new Map
		items.forEach(item => inputOptions.set(item.device_name, item.device_name))
		sweetAlert.fire({
			title: "Change type",
			input: 'select',
			inputOptions,
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			this.globalValue = value
			if (this.globalValue.dismiss) {
				return;
			}
			if (this.globalValue) {
				this.apiService.patchDevice(this.jwtToken, this.viewId, { 'type': this.globalValue.value }).subscribe((response) => {
					this.device.type = this.globalValue.value;
					swal({
						title: "Success!",
						text: "User Assigned!",
						timer: 1500,
						icon: "success"
					});

				}, (err) => {
					console.log(err)
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with updating device type!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	changeUser() {
		const items = this.userList
		const inputOptions = new Map
		items.forEach(item => inputOptions.set(item.username, item.username))
		sweetAlert.fire({
			title: "Change User",
			input: 'select',
			inputOptions,
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			this.globalValue = value
			if (this.globalValue.dismiss) {
				return;
			}
			if (this.globalValue) {
				this.apiService.patchDevice(this.jwtToken, this.viewId, { 'assign_to': this.globalValue.value }).subscribe((response) => {
					this.device.assign_to = this.globalValue.value;
					swal({
						title: "Success!",
						text: "User Assigned!",
						timer: 1500,
						icon: "success"
					});

				}, (err) => {
					console.log(err)
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with updating device user!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	changeContractStatus() {
		const items = this.ContractStatus;
		const inputOptions = new Map
		items.forEach(item => inputOptions.set(item.itemName, item.itemName))
		sweetAlert.fire({
			title: "Change User",
			input: 'select',
			inputOptions,
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			this.globalValue = value
			if (this.globalValue.dismiss) {
				return;
			}
			if (this.globalValue) {
				this.apiService.patchDevice(this.jwtToken, this.viewId, { 'Contract_Status': this.globalValue.value }).subscribe((response) => {
					this.device.Contract_Status = this.globalValue.value;
					swal({
						title: "Success!",
						text: "User Assigned!",
						timer: 1500,
						icon: "success"
					});

				}, (err) => {
					console.log(err)
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with updating device user!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	getUsers(value) {
		if (value) {
			this.apiService.userbyName(this.jwtToken, { "id": value }).subscribe((response) => {
				if (response['id']) {
					return response['username']
				} else {
					return null
				}
			}, (err) => {
				console.log(err);
			});
		}
	}

	changeStatus() {
		sweetAlert.fire({
			title: "Change Status",
			input: 'select',
			inputOptions: {
				'online': 'Online',
				'offline': 'Offline',
				'error': 'Error',
				'transporting in': 'Transporting In',
				'transporting out': 'Transporting Out',
				'booked': 'Booked',
				'stored': 'Stored'
			},
			showCancelButton: true,
			cancelButtonText: 'Cancel'
			//inputPlaceholder: "ex. Tallinn, Shopping Center, 3rd floor"
		}).then((value) => {
			this.globalValue = value
			if (this.globalValue.dismiss) {
				return;
			}
			this.globalValue.status = value.value
			if (this.globalValue.status) {
				this.apiService.changeStatus(this.jwtToken, this.viewId, this.globalValue).subscribe((response) => {
					this.device.status = value.value;
					swal({
						title: "Success!",
						text: "Device status changed!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with changing the status of the device!',
						buttons: [false, true],
						timer: 2000
					});

				});
			}
		});
	}

	addIssue() {
		$("#swal2-content #callFile").click(function(){
			alert("The paragraph was clicked.");
		});
		sweetAlert.fire({
			title: "Create New Issue",
			html: '<div class="row"><div class="col-xs-5"><h4>Severity:</h4><fieldset>' +
				'<select class="form-control" id="newIssueSeverity"><option value="cosmetic">cosmetic</option>' +
				'<option value="minor">minor</option><option value="major">major</option>' +
				'<option value="critical">critical</option></select></fieldset></div><div class="col-xs-7">' +
				'<h4>Description</h4><div class="form-group">' +
				'<input type="text" class="form-control" id="newIssueDescription"></div></div></div></div>',
				/* '<button type="button" id="callFile" class="swal2-confirm swal2-styled" aria-label="" style="display: inline-block; border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);">BROWSE</button></div></div>', */
				/* '<div class="row"><div class="col-xs-5">video Upload:</div><div class="col-xs-7"><input type="file"(change)="onvideoChanged($event)"></div></div>', */
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((value) => {
			var abc = false;
			if (true == value.value) {

				var data = {
					"severity": $('#newIssueSeverity').val(),
					"message": $('#newIssueDescription').val(),
					/* "image1": formData, */
				}
		
				//setTimeout(function () {
				this.apiService.NewIssue(this.jwtToken, this.viewId, data).subscribe((response) => {
					this.getIssueOpen();
					swal({
						title: "Success!",
						text: "New issue created!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with creating the new issue!',
						buttons: [false, true],
						timer: 2000
					});
				});
				//}, 1000);
			}
		});
	}

	setRedirect(val, page) {
		var value = '/devices/' + val + '/' + page;
		this.router.navigate([value])
	}

	deleteDevice() {
		swal({
			title: "Delete Device?!",
			text: "Are you sure? This can ONLY be undone by a database administrator!",
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value) {
				this.apiService.deleteDevice(this.jwtToken, this.viewId).subscribe((response) => {
					swal({
						title: "Success!",
						text: "Device deleted!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with deleting this device!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	deleteCounterRow(id) {
		swal({
			title: 'Delete row?',
			text: "Are you sure? This can NOT be undone!",
			buttons: [true, true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if (value) {
				this.apiService.deleteCounter(this.jwtToken, id).subscribe((response) => {
					this.counterList();
					swal({
						title: "Success!",
						text: "Row deleted!",
						timer: 1000,
						icon: "success"
					});
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with deleting the counter value!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		});
	}

	update(val) {
		this.apiService.patchDevice(this.jwtToken, this.viewId, val).subscribe((response) => {
			this.device.type = val.type;
			this.device.name = val.name;
			this.getDevice();
			this.edit();
			swal({
				title: "Success!",
				text: "Device renamed!",
				timer: 1500,
				icon: "success"
			});

		}, (err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with updating device name!',
				buttons: [false, true],
				timer: 1000
			});

		});
	}

	comment(val) {
		this.apiService.changeComment(this.jwtToken, this.viewId, val).subscribe((response) => {
			this.device.comment = val.comment;
			this.commnet();
			swal({
				title: "Success!",
				text: "Comment Saved!",
				timer: 1000,
				buttons: [false, true],
				icon: "success"
			});
		}, (err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with saving comment!',
				buttons: [false, true],
				timer: 1000
			});
		});
	}

	changingWarranty() {
		var wrdate = { "Warranty_end_date": moment(this.Warranty_enddate).format("YYYY-MM-DD") };
		this.apiService.changeWarrantyEndDate(this.jwtToken, this.viewId, wrdate).subscribe((response) => {
			this.device.Warranty_end_date = wrdate.Warranty_end_date;
			this.Warranty_end_date();
			swal({
				title: "Success!",
				text: "Warranty end date Saved!",
				timer: 1000,
				buttons: [false, true],
				icon: "success"
			});
		}, (err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: 'There was a problem with saving Warranty end date!',
				buttons: [false, true],
				timer: 1000
			});

		});


	}

	submitCounter(val) {
		if (this.device.counter_count > 1) {
			for(var i=0;i<this.items.length;i++){
				var countval;
				var even_val;
				var enevn_val;
				if(!this.counterVal[i]){
					countval = {counter_display: ""}
				}else{
					countval = this.counterVal[i];
				}
	
				if(!this.evenVal[i]){
					even_val = {output: ""}
				}else{
					even_val = this.evenVal[i];
				}
	
				if(!this.unevenVal[i]){
					enevn_val = {output_display: ""}
				}else{
					enevn_val = this.unevenVal[i];
				}
				if(this.device.uneven_output == 1 ){
					this.previousArray[i+1] = Object.assign(countval,even_val,enevn_val);
				}else{
					this.previousArray[i+1] = Object.assign(countval,even_val);
				}
			}
			this.multipleCounts = Object.assign({},this.previousArray);
			this.multi_counter = false;
			if (this.multipleCounts.length < this.device.counter_count) {
				swal({
					title: "Success!",
					text: "One or more fields were left empty!",
					timer: 1000,
					icon: "error"
				});
			} else {
				var coinbox1 = this.coinboxval == "Hide" ? this.coinboxHide:this.coinboxshow;
				for(var i=1;i<this.items.length+1;i++){
					this.multipleCounts[i]["coinboxSH"] = coinbox1;
				}
				
				this.apiService.createCounter(this.jwtToken, this.viewId, this.multipleCounts).subscribe((response) => {
					this.showCounter('reset', false);
					swal({
						title: "Success!",
						text: "Counter logged!",
						timer: 1000,
						icon: "success"
					});
					this.counterList();
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with posting the counter value!',
						buttons: [false, true],
						timer: 1000
					});

				});
			}
		} else
			if (this.multipleCounts) {
				var coinbox = this.coinboxval == "Hide" ? this.coinboxHide:this.coinboxshow;
				this.multipleCounts["coinboxSH"] = coinbox;
				this.apiService.createCounter(this.jwtToken, this.viewId, this.multipleCounts).subscribe((response) => {
					this.showCounter('reset', false);
					this.single_counter = false;
					swal({
						title: "Success!",
						text: "Counter logged!",
						timer: 1000,
						icon: "success"
					});
					this.counterList();
				}, (err) => {
					swal({
						icon: 'error',
						title: 'Error!',
						text: 'There was a problem with posting the counter value!',
						buttons: [false, true],
						timer: 1000
					});

				});
			} else {
				swal({
					icon: 'error',
					title: 'Error!',
					text: 'There was a problem with posting the counter value!',
					buttons: [false, true],
					timer: 1000
				});
			}
	}

	onChangecoinbox(value){
		console.log(value);
		if(value == "Hide"){
			this.coinboxval = value;
			// $('#coinboxHide').prop('checked', true);
			this.coinboxHide = value;
		}else{
			this.coinboxval = value;
			// $('#coinboxshow').prop('checked', true);
			this.coinboxshow = value;
		}
	}

	checkcoinboxSH(array, i) {
		if (array.children.length > 0) {
			if (array.children[0].coinboxSH == "Show") {
				return true;
			} else {
				return false;
			}
		} else 
			if(array.coinboxSH == "Show"){
				return true;
			} else {
				return false;
			}
	}

	keyUpdate() {
		this.apiService.KeyOfDevice(this.jwtToken,this.viewId,{"key":this.key}).subscribe((response) => {
			this.keyCheck = !this.keyCheck;
			this.getDevice();
			swal({
				title: "Success!",
				text: "Key number saved!",
				timer: 1000,
				icon: "success"
			});
			this.counterList();
		}, (err) => {
			swal({
				icon: 'error',
				title: 'Error!',
				text: "There was a problem with changing the key number!",
				buttons: [false, true],
				timer: 1000
			});
		});
    }
}