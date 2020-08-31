import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { AuthService } from '../auth/auth.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment'
import swal from 'sweetalert';
import sweetAlert from 'sweetalert2';
import { ExcelService } from '../service/excel.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  selected_Month;
  realcountercashtotal;
  creditcardpaymentstotal;
  region;
  admin: any = {};
  adminData: any = [];
  regionList: any = [];
  selectedregion: any = [];
	device:any = {};
	excelData: Array<any> = [];
  role;
	regions;
  jwtToken;
  Settings = {};
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
  constructor(
    public auth: AuthService,
    private apiService: ApiServiceService,
		private excelService:ExcelService) {
    this.admin = {
      selected_Month: "",
      realcountercashtotal: "",
      creditcardpaymentstotal: "",
      region:"",
    }
    this.jwtToken = this.auth.getValue('jwt');
		this.getRegions();
    this.getCurrentUser();
    this.getList();
  }

  ngOnInit() {
    this.Settings = {
			singleSelection: true,
			text: "Select",
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			enableSearchFilter: true,
      badgeShowLimit: 1,
			classes: "custom-class-example"
		};
  }

  getRegions(){
		this.apiService.getRegion(this.jwtToken).subscribe((response) => {
      this.regions = response;
      for (let i = 0; i < this.regions.length; i++) {
        this.regionList.push({"id":this.regions[i].id,"itemName": this.regions[i].region_name});
      }
		},(err) => {
			console.log(err);
		});
	}
	
  exportAsXLSX():void {
		this.excelService.exportAsExcelFile(this.excelData, 'allStatics');
  }
  
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };     
    container.setViewMode('month');
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

  getList() {
    console.log(this.regionList);
    this.apiService.getDashbordAdmin(this.jwtToken).subscribe((response) => {
      this.adminData = response;
			for(var i=0;i<this.adminData.length;i++){
				this.excelData[i]= {
					"S.No": i+1,
					"Selected Month": this.adminData[i].selected_Month,
					"Region": this.adminData[i].region,
					"Real Counter Cash": this.adminData[i].realcountercashtotal,
					"Credit Card payment": this.adminData[i].creditcardpaymentstotal,
				}
			}
      console.log(response);
    }, (err) => {
      console.log(err);
    });
  }

  Create() {
    this.admin.selected_Month = moment(this.admin.selected_Month).format("YYYY-MM");
    this.admin.region = this.selectedregion[0].itemName;
    this.apiService.createDashbordAdmin(this.jwtToken, this.admin).subscribe((response) => {
      this.admin.selected_Month = "";
      this.admin.realcountercashtotal = "";
      this.admin.creditcardpaymentstotal = "";
      this.admin.region = "";
      this.selectedregion = [];
      this.getList();
      swal({
        title: "Success!",
        text: "Dashboard admin Created!",
        timer: 1000,
        icon: "success"
      });
    }, (err) => {
      swal({
        icon: 'error',
        title: 'Error!',
        text: 'There was a problem with Creating New Dashboard admin!',
        buttons: [false, true],
        timer: 1000
      });
    });
  }

  edit(id) {
    for (let i = 0; i < this.adminData.length; i++) {
      if (this.adminData[i].id == id) {
        this.admin.selected_Month = this.adminData[i].selected_Month;
        this.admin.realcountercashtotal = this.adminData[i].realcountercashtotal;
        this.admin.creditcardpaymentstotal = this.adminData[i].creditcardpaymentstotal;
        if (this.adminData[i].region) {
          this.selectedregion = [];
          var region = this.adminData[i].region;
          this.selectedregion.push(this.regionList.find(function (element) {
            return element.itemName == region;
          }))
        } else {
          this.selectedregion = [];
        }
      }
    }
  }

  delete(val){
    swal({
			title: "Delete Dashboard Payment?!",
            text: "Are you sure? This cannot be undone!",
			buttons: [true,true],
			closeOnClickOutside: false,
		}).then((value) => {
			if (value === false) return;
			if(value){
				this.apiService.deleteDashbordAdmin(this.jwtToken,val).subscribe((response) => {
          this.getList();
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