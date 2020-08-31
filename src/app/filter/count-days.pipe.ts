import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'countDays'
})
export class CountDaysPipe implements PipeTransform {

	transform(fromDate: any, args: any, args1:any, args2:any): any {
		var diffInDays;
		var invalue = '';
		var agovalue = '';
		if(args == 'getdiff'){
			let firstDate = moment(fromDate);
			if(!args2){
				var secondDate = moment();
			}else{
				var secondDate = moment(args2);
			}
			  
			diffInDays = Math.abs(firstDate.diff(secondDate, 'days'));
			
			if(diffInDays < 30  || args1 =='wout'){
				if(moment(firstDate).isAfter(secondDate)){
					diffInDays = Math.abs(secondDate.diff(firstDate, 'days'));
					invalue = 'in ';
					diffInDays = diffInDays+1;
				}else{
					agovalue = ' ago';
				}
				
				if(args1!= 'wout'){
					diffInDays = diffInDays;
					diffInDays = invalue+Math.round(diffInDays)+' '+'days'+agovalue;
				}else{
					diffInDays = Math.round(diffInDays)+' '+'days';
				}	
			}
			
			if(diffInDays > 29 && diffInDays < 366  && args1 !='wout'){
				diffInDays = Math.abs(firstDate.diff(secondDate, 'months', true));

				if(moment(firstDate).isSameOrAfter(secondDate)){
					diffInDays = 'in '+Math.round(diffInDays)+' '+'months';
				}else{
					diffInDays = Math.round(diffInDays)+' '+'months ago';
				}
			}
			if(diffInDays > 365 && args1 !='wout'){
				diffInDays = Math.abs(firstDate.diff(secondDate, 'years', true));
				if(moment(firstDate).isSameOrAfter(secondDate)){
					diffInDays = 'in '+Math.round(diffInDays)+' '+'years';
				}else{
					diffInDays = Math.round(diffInDays)+' '+'years ago';
				}
			}
		}
		
		if(args == 'dateType'){
			diffInDays = moment(fromDate).format('dd, DD.MM.YYYY');
		}
		
		if(args == 'dateTime'){
			diffInDays = moment(fromDate).format('dd, DD.MM.YYYY HH:ss');
		}

		if(args == 'custdate'){
			diffInDays = moment(fromDate).format(args1);
		}
		return diffInDays;
	}

}
