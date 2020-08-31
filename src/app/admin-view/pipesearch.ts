import {Pipe, PipeTransform } from '@angular/core';
import { AdminViewComponent } from '../admin-view/admin-view.component';
@Pipe({
    name: 'dashboardSearch'
})
export class DashboardSearchPipe implements PipeTransform {
    constructor(private AdminView: AdminViewComponent) { }
    transform(items: Array<any>, selected_Month: string,region: string, realcountercashtotal: string, creditcardpaymentstotal: string){
        if (items && items.length){
            this.AdminView.excelData = [];
            return items.filter(item =>{
                if (selected_Month && item.selected_Month.toLowerCase().indexOf(selected_Month.toLowerCase()) === -1){
                    return false;
                }
                if (region && item.region.toLowerCase().indexOf(region.toLowerCase()) === -1){
                    return false;
                }
                if (realcountercashtotal && item.realcountercashtotal.toLowerCase().indexOf(realcountercashtotal.toLowerCase()) === -1){
                    return false;
                }
                if (creditcardpaymentstotal && item.creditcardpaymentstotal.toLowerCase().indexOf(creditcardpaymentstotal.toLowerCase()) === -1){
                    return false;
                }
                this.AdminView.excelData.push({
					"Selected Month": item.selected_Month,
					"Region": item.region,
					"Real Counter Cash": item.realcountercashtotal,
					"Credit Card payment": item.creditcardpaymentstotal,
				})
                return true;
           })
        }
        else{
            return items;
        }
    }
}