import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'deviceSort'
})
export class DeviceSortPipe implements PipeTransform {

	transform(value: any): any {
		return dataSo(value);
		 
		function dataSo (items) {
			var bDate;
			var aDate;
			var filtered = [];
			var a_status;
			var b_status;
			var b_until;
			var a_until
			items.forEach(item=> {
				filtered.push(item);
			});

			filtered.sort(function (a, b) {
				
				switch (a.status) {
					case 'offline':
						a_status = 1;
					default:
						a_status = 2;
				}

				switch (b.status) {
					case 'offline':
						b_status = 1;
					default:
						b_status = 2;
				}

				if(b.contract){
					if(b.contract.end_date){
						bDate = b.contract.end_date;
					}
			
				}else{
					bDate = Date.now();
				}

				if(a.contract){
					if(a.contract.end_date){
						aDate = a.contract.end_date;
					}
				}else{
					aDate = Date.now()
				}

				b_until = moment(bDate).diff(moment(Date.now()), 'days');
				a_until = moment(aDate).diff(moment(Date.now()), 'days');

				if (a_status < b_status) {
					return 1;
				} else if (a_status > b_status) {
					return -1;
				} else {
					if (a.contract == null && b.contract == null) {
						
						return 0;
					} else if (a.contract == null) {
						
						if (b_until <= 30) {
							return 1;
						} else {
							return -1;
						}
					} else if (b.contract == null) {
						//console.log('null b '+' '+b.contract)
						if (a_until <= 30) {
							return -1;
						} else {
							return 1;
						}
					} else {
						if (a_until > b_until) {
							return 1;
						} else if (a_until < b_until) {
							return -1;
						} else {
							return 0;
						}
					}
				}
			});
			return filtered;
		};

		
	}
}