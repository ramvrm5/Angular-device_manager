import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiServiceService } from '../api-service.service';
import { AuthService } from '../auth/auth.service';
import { ExcelService } from '../service/excel.service';
import * as $ from 'jquery';

@Pipe({
	name: 'personSearch'
})

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css'],
})

export class StatisticsComponent implements OnInit {
	jwtToken;
	viewId
	statistics;
	TotalCounts: any = 0;
	Totalefficiency: any = 0;
	TotalRent: any = 0;
	TotalValue: any = 0;
	period: any = {};
	year;
	periodType: any = "monthly";
	custDate;
	device: any = {};
	excelData: Array<any> = [];
	searchname: any;
	searchtype: any;
	searchregion: any;
	searchlocation: any;
	searchcode: any;
	statData;
	tooltip;
	status: boolean = false;
	monthForm;
	yearlyForm;
	custForm;
	quaterForm;
	startDate = new Date();
	endDate = new Date();

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private apiService: ApiServiceService,
		public auth: AuthService,
		private excelService: ExcelService
	) {
		this.jwtToken = this.auth.getValue('jwt');

		if (moment().month() == 1) {
			this.period.month = 12;
			this.period.year = moment().year() - 1;
		} else {
			this.period.month = moment().month() - 1;
			this.period.year = moment().year();
		}
		this.period.quarter = moment().month() / 3;
		this.period.start_date = moment().format('DD-MM-YYYY');
		this.period.end_date = moment().format('DD-MM-YYYY');
	}

	ngOnInit() {
		this.tooltip = true;
		this.monthForm = new FormGroup({
			month_val1: new FormControl(null),
			month_val2: new FormControl(null)
		});
		this.quaterForm = new FormGroup({
			quat_val1: new FormControl(null),
			quat_val2: new FormControl(null)
		});
		this.yearlyForm = new FormGroup({
			year_val1: new FormControl(null)
		});
		var d = new Date();
		var mOnth = d.getMonth() + 1;
		var yEar = d.getFullYear() - 1;
		this.monthForm.controls['month_val2'].setValue(mOnth);
		this.monthForm.controls['month_val1'].setValue(yEar);
		this.quaterForm.controls['quat_val1'].setValue(yEar);
		this.quaterForm.controls['quat_val2'].setValue('3');
		this.yearlyForm.controls['year_val1'].setValue(yEar);
		this.monthChange();
	}

	periodShow(val) {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		this.periodType = val;
		this.status = !this.status;
		if (this.periodType == 'monthly') {
			this.monthChange();
		}
		if (this.periodType == 'yearly') {
			this.yearChange();
		}
		if (this.periodType == 'quarterly') {
			this.qauterChange();
		}
		if (this.periodType == 'custom') {
			this.customStat();
		}
	}

	customStat() {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		var start_dAte = this.formatDate(this.startDate);
		var end_dAte = this.formatDate(this.endDate);
		this.apiService.getCustom(this.auth.getValue('jwt'), start_dAte, end_dAte).subscribe((response) => {
			this.statData = response;
			this.excelsheet();
			
		}, (err) => {
			console.log(err)
			//this.auth.logout();
		});
	}

	exportAsXLSX(): void {
		this.excelService.exportAsExcelFile(this.excelData, 'allStatics');
	}

	excelsheet(){
		for (var i = 0; i < this.statData.length; i++) {
			this.TotalRent += this.statData[i].device.pay_for_rent
			this.excelData[i] = {
				"S.No": i + 1,
				"Code": this.statData[i].device.code,
				"Name": this.statData[i].device.name,
				"Type": this.statData[i].device.type,
				"Region": this.statData[i].device.region,
				"Location": this.statData[i].device.location,
				"Rent": this.statData[i].device.pay_for_rent,
				"Counts": this.statData[i].counts,
				"Value": this.statData[i].value == "N/A" ? this.statData[i].value : this.statData[i].value,
				"Period Start": moment(this.statData[i].period.start.date).format('DD.MM.YYYY'),
				"Period End": moment(this.statData[i].period.end.date).format('DD.MM.YYYY'),
				"Days": moment(this.statData[i].period.end.date).diff(moment(this.statData[i].period.start.date), 'days'),
				"Calculate Counts": isNaN(this.calculatePeriodAvg( this.statData[i],'counts'))?0:this.calculatePeriodAvg( this.statData[i],'counts').toFixed(2),
				"Calculated Value": isNaN(this.calculatePeriodAvg( this.statData[i],'value'))?0:this.calculatePeriodAvg( this.statData[i],'value').toFixed(2),
				"Efficiency": isNaN(this.calrent(this.calculatePeriodAvg(this.statData[i], 'value'),this.statData[i].device.pay_for_rent))?0:this.calrent(this.calculatePeriodAvg(this.statData[i], 'value'),this.statData[i].device.pay_for_rent).toFixed(2),
				"Value/Rent Ratio": isNaN(this.getRowRatio(this.statData[i]))?0:this.getRowRatio(this.statData[i]).toFixed(2),
			}
		}
		this.excelData[this.statData.length+1] = {
			"S.No":"Total",
			"Code": this.statData.length,
			"Name": "",
			"Type": "",
			"Region": "",
			"Location": "",
			"Rent": "",
			"Counts": "",
			"Value": "",
			"Period Start": "",
			"Period End": "",
			"Days": "",
			"Calculate Counts": "",
			"Calculated Value": "",
			"Efficiency": "",
			"Value/Rent Ratio": "",
		}
	}

	formatDate(date) {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		return [day, month, year].join('-');
	}

	monthChange() {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		var yy = this.monthForm.get('month_val1').value;
		var dd = this.monthForm.get('month_val2').value;
		this.apiService.getMonthly(this.auth.getValue('jwt'), yy, dd).subscribe((response) => {
			this.statData = response;
			this.excelsheet();
		}, (err) => {
			console.log(err)
		});
	}

	qauterChange() {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		var yy = this.quaterForm.get('quat_val1').value;
		var dd = this.quaterForm.get('quat_val2').value;
		this.apiService.getQauterly(this.auth.getValue('jwt'), yy, dd).subscribe((response) => {
			this.statData = response;
			this.excelsheet();
			
		}, (err) => {
			console.log(err)
			//this.auth.logout();
		});
	}

	yearChange() {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		var yy = this.yearlyForm.get('year_val1').value;
		this.apiService.getYealry(this.auth.getValue('jwt'), yy).subscribe((response) => {
			this.statData = response;
			this.excelsheet();
			
		}, (err) => {
			console.log(err)
		});
	}

	startEvent(value) {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		this.customStat();
	}

	endEvent(value) {
		this.TotalCounts = 0;
		this.TotalValue = 0;
		this.customStat();
	}

	calrent(value,rent){
		var val = isNaN(value) ? 0 : value;
		var calculation = val - rent;
		this.Totalefficiency += calculation;
		return calculation;
	}

	calculatePeriodAvg(row, countsOrValue) {
		var daysBetween = moment(row.period.end.date).diff(moment(row.period.start.date), 'days');
		if (countsOrValue == "counts") {
			if (this.periodType == 'yearly') {
				if (this.isLeapYear(this.period.year)) {
					this.TotalCounts += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * 366 / daysBetween;
					return row.counts * 366 / daysBetween;
				} else {
					this.TotalCounts += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * 365 / daysBetween;
					return row.counts * 365 / daysBetween;
				}
			} else if (this.periodType == 'quarterly') {
				days = moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 1), "YYYY-M").daysInMonth()
					+ moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 2), "YYYY-M").daysInMonth()
					+ moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 3), "YYYY-M").daysInMonth();
				this.TotalCounts += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * days / daysBetween;
				return row.counts * days / daysBetween;
			} else if (this.periodType == 'monthly') {
				var mon = row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * moment(this.period.year + "-" + this.period.month, "YYYY-M").daysInMonth() / daysBetween;
				this.TotalCounts += mon;
				return row.counts * moment(this.period.year + "-" + this.period.month, "YYYY-M").daysInMonth() / daysBetween;
			} else {
				this.TotalCounts += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * moment(this.period.end_date, 'YYYY-MM-DD').diff(moment(this.period.start_date, 'YYYY-MM-DD'), 'days') / daysBetween;
				return row.counts * moment(this.period.end_date, 'YYYY-MM-DD').diff(moment(this.period.start_date, 'YYYY-MM-DD'), 'days') / daysBetween;
			}
		} else if (countsOrValue == "value") {
			if (this.periodType == 'yearly') {
				if (this.isLeapYear(this.period.year)) {
					this.TotalValue += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts / 366 * daysBetween / row.device.counter_divisor;
					return row.counts / 366 * daysBetween / row.device.counter_divisor;
				} else {
					this.TotalValue += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts / 365 * daysBetween / row.device.counter_divisor;
					return row.counts / 365 * daysBetween / row.device.counter_divisor;
				}
			} else if (this.periodType == 'quarterly') {
				var days = moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 1), "YYYY-M").daysInMonth()
					+ moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 2), "YYYY-M").daysInMonth()
					+ moment(this.period.year + "-" + ((this.period.quarter - 1) * 3 + 3), "YYYY-M").daysInMonth();
				this.TotalValue += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * days / daysBetween / row.device.counter_divisor;
				return row.counts * days / daysBetween / row.device.counter_divisor;
			} else if (this.periodType == 'monthly') {
				this.TotalValue += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * moment(this.period.year + "-" + this.period.month, "YYYY-M").daysInMonth() / daysBetween / row.device.counter_divisor;
				return row.counts * moment(this.period.year + "-" + this.period.month, "YYYY-M").daysInMonth() / daysBetween / row.device.counter_divisor;
			} else {
				this.TotalValue += row.counts == "N/A" || row.counts == 0 ? 0 : row.counts * moment(this.period.end_date, 'YYYY-MM-DD').diff(moment(this.period.start_date, 'YYYY-MM-DD'), 'days') / daysBetween / row.device.counter_divisor;
				return row.counts * moment(this.period.end_date, 'YYYY-MM-DD').diff(moment(this.period.start_date, 'YYYY-MM-DD'), 'days') / daysBetween / row.device.counter_divisor;
			}
		}
	}

	isLeapYear(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	getRowRatio(row) {
		return this.calculatePeriodAvg(row, 'value') / this.getRentPrice(row.device);
	}

	getRentPrice(device) {
		if (device.pay_for_rent) {
			switch (this.periodType) {
				case "monthly":
					return device.rent_cost;
				case "quarterly":
					return 3 * device.rent_cost;
				case "yearly":
					return 12 * device.rent_cost;
				default:
					return NaN;
			}
		} else {
			return 0;
		}
	}
}