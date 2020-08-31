import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})

export class CustomFunction{
	constructor() { }
	statusOrderer(item) {
		switch (item.status) {
			case 'offline':
				return 1;
			default:
				return 2;
		}
	}

	daysUntil(item) {
		return moment(item.contract.end_date).diff(moment(Date.now()), 'days');
	}
}