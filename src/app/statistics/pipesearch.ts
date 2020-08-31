import {Pipe, PipeTransform } from '@angular/core';
import { StatisticsComponent } from '../statistics/statistics.component';
import * as moment from 'moment';
@Pipe({
    name: 'personSearch'
})
export class PersonSearchPipe implements PipeTransform {
    constructor(private Statics: StatisticsComponent) { }
    transform(items: Array<any>, searchcode: string,searchname: string, searchtype: string, searchregion: string, searchlocation: string){
        if (items && items.length){
		    this.Statics.TotalCounts = 0;
		    this.Statics.TotalValue = 0;
            this.Statics.excelData = [];
            return items.filter(item =>{
                if (searchcode && item.device.code.toLowerCase().indexOf(searchcode.toLowerCase()) === -1){
                    return false;
                }
                if (searchname && item.device.name.toLowerCase().indexOf(searchname.toLowerCase()) === -1){
                    return false;
                }
                if (searchtype && item.device.type.toLowerCase().indexOf(searchtype.toLowerCase()) === -1){
                    return false;
                }
                if (searchregion && item.device.region.toLowerCase().indexOf(searchregion.toLowerCase()) === -1){
                    return false;
                }
                if (searchlocation && item.device.location.toLowerCase().indexOf(searchlocation.toLowerCase()) === -1){
                    return false;
                }
                this.Statics.excelData.push({
					"Code": item.device.code,
					"Name": item.device.name,
					"Type": item.device.type,
					"Region": item.device.region,
					"Location": item.device.location,
                    "Rent": item.device.pay_for_rent,
					"Counts": item.counts,
					"Value": item.value == "N/A"? item.value : item.value,
					"Period Start": moment(item.period.start.date).format('DD.MM.YYYY'),
					"Period End": moment(item.period.end.date).format('DD.MM.YYYY'),
                    "Days": moment(item.period.end.date).diff(moment(item.period.start.date), 'days'),                
		            "Calculate Counts": 0,
					"Calculated Value": 0,
					"Efficiency": 0,
					"Value/Rent Ratio": 0,
				})
                return true;
           })
        }
        else{
            return items;
        }
    }
}