import {Pipe, PipeTransform } from '@angular/core';
import { DevicesComponent } from '../devices/devices.component';
@Pipe({
    name: 'deviceSearch'
})
export class DeviceSearchPipe implements PipeTransform {
    filterdata:any= [];
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
    constructor(private Devices: DevicesComponent) { }
    transform(items: Array<any>, code: string,type: string, name: string, assign_to: string, region: string, location: string, Client: string, comment: string, key: string, counter_count: string, rent_cost: number){
        this.filterdata = [];
        if (items && items.length){
            this.Devices.excelData = [];
            return items.filter(item =>{
                if (code && item.code.toLowerCase().indexOf(code.toLowerCase()) === -1){
                    return false;
                }
                if (type && item.type.toLowerCase().indexOf(type.toLowerCase()) === -1){
                    return false;
                }
                if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                if (assign_to && item.assign_to.toLowerCase().indexOf(assign_to.toLowerCase()) === -1){
                    return false;
                }
                if (region && item.region.toLowerCase().indexOf(region.toLowerCase()) === -1){
                    return false;
                }
                if (location && item.location.toLowerCase().indexOf(location.toLowerCase()) === -1){
                    return false;
                }
                if (Client) {
                    if (Client && !item.contractField_client_name) {
                        return false;
                    }
                }
                if (comment && item.comment.toLowerCase().indexOf(comment.toLowerCase()) === -1){
                    return false;
                }
                if (key && item.key.toLowerCase().indexOf(key.toLowerCase()) === -1){
                    return false;
                }
                if(counter_count){
                    if (counter_count != item.counter_count){
                        return false;
                    }
                }
                if(rent_cost){
                    if (rent_cost != item.rent_cost){
                        return false;
                    }
                }
                    var todayFullDate = new Date();
                    var presentMonth = todayFullDate.getMonth();
                    var counter_sum = 0 + 0 + 0;
                    var coeffcient = item.counter_divisor;
                    var amount = counter_sum/coeffcient;
                    var efficency = amount - item.rent_cost - 0.25*amount;   
                    var efficency_check = efficency == 0?"":0 >= 85 ?"High":"Low";
                    this.Devices.excelData.push({
                        "Location": item.location,
                        "Date":"26-05-2018",
                        "Device Type": item.type,
                        "Device": item.name,
                        "usage":"Other",
                        "Quantity":"1",
                        "serial no.":"BHAA0513 ",
                        "Key Number": item.key,
                        "Product":"capsule",
                        "Product price":"0.25",
                        "coefficient":coeffcient,
                        "Rent (VAT included)": item.rent_cost
                    });
                    var index = this.Devices.excelData.findIndex(x => x.Location === item.location);
                    for(let i=0; i < presentMonth + 1; i++){
                        var month = this.monthArray.find(obj=> obj.id == i);
                        this.Devices.excelData[index][month.MonthName + "Counter 1" ] = "0";
                        this.Devices.excelData[index][month.MonthName + "Counter 2"] = "0";
                        this.Devices.excelData[index][month.MonthName + "Counter 3"] = "0";
                        this.Devices.excelData[index][month.MonthName + "Counter sum"] = counter_sum;
                        this.Devices.excelData[index][month.MonthName + "Amount"] = amount;
                        this.Devices.excelData[index][month.MonthName + "efficency"] = efficency;
                        this.Devices.excelData[index][month.MonthName + "Efficency Check"] = efficency_check;
                        this.Devices.excelData[index][month.MonthName + "Rent"] =  item.rent_cost;
                    } 
                return true;
           })
        }
        else{
            return items;
        }
    }
}