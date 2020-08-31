import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterissue'
})
export class FilterissuePipe implements PipeTransform {
	
	transform(value: any): any {
		var filtered = [];
		filtered = value;
		
		function SeverityOrder(item){
			switch(item) {
				case 'critical':
					return 5;
				case 'major':
					return 4;
				case 'minor':
					return 3;
				case 'cosmetic':
					return 2;
				default:
					return 1;
			}
		}

		function StatusOrder(item){
			switch(item) {
				case 'open':
					return 3;
				case 'closed':
					return 2;
				default:
					return 1;
			}
		}
	
		
		filtered.sort(function (a, b) {
			if (StatusOrder(a.status) < StatusOrder(b.status)) {
				return 1;
			} else if (StatusOrder(a.status) > StatusOrder(b.status)) {
				return -1;
			} else {
				if (SeverityOrder(a.severity) < SeverityOrder(b.severity)) {
					return 1;
				} else if (SeverityOrder(a.severity) > SeverityOrder(b.severity)) {
					return -1;
				} else {
					if (a.id < b.id) {
						return 1;
					} else {
						return -1;
					}
				}
			}
		});
		return filtered;
	}
}
