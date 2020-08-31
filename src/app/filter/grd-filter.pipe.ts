import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter',
  pure: true
})
export class GrdFilterPipe implements PipeTransform {
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter){
      return items;
    }

    if (!Array.isArray(items)){
      return items;
    }

    if (filter && Array.isArray(items)) {
      localStorage.setItem("code",filter.code);
      localStorage.setItem("type",filter.type);
      localStorage.setItem("name",filter.name);
      localStorage.setItem("assign_to",filter.assign_to);
      localStorage.setItem("region",filter.region);
      localStorage.setItem("location",filter.location);
      localStorage.setItem("comment",filter.comment);
      localStorage.setItem("key",filter.key);
      localStorage.setItem("counter_count",filter.counter_count);
      localStorage.setItem("rent_cost",filter.rent_cost);
      if(localStorage.getItem('code') && localStorage.getItem('code')!='undefined'){
        filter.code = localStorage.getItem("code")?localStorage.getItem("code"):undefined;
      }
      if(localStorage.getItem('type') && localStorage.getItem('type')!='undefined'){
        filter.type = localStorage.getItem("type") ? localStorage.getItem("type") : undefined;
      }
      if (localStorage.getItem('name') && localStorage.getItem('name') != 'undefined') {
        filter.name = localStorage.getItem("name") ? localStorage.getItem("name") : undefined;
      }

      if (localStorage.getItem('assign_to') && localStorage.getItem('assign_to') != 'undefined') {
        filter.assign_to = localStorage.getItem("assign_to") ? localStorage.getItem("assign_to") : undefined;
      }
      if (localStorage.getItem('region') && localStorage.getItem('region') != 'undefined') {
        filter.region = localStorage.getItem("region") ? localStorage.getItem("region") : undefined;
      } 
      if (localStorage.getItem('location') && localStorage.getItem('location') != 'undefined') {
        filter.location = localStorage.getItem("location") ? localStorage.getItem("location") : undefined;
      } 
      if (localStorage.getItem('comment') && localStorage.getItem('comment') != 'undefined') {
        filter.comment = localStorage.getItem("comment") ? localStorage.getItem("comment") : undefined;
      } 
      if (localStorage.getItem('key') && localStorage.getItem('key') != 'undefined') {
        filter.key = localStorage.getItem("key") ? localStorage.getItem("key") : undefined;
      }
      if (localStorage.getItem('counter_count') && localStorage.getItem('counter_count') != 'undefined') {
        filter.counter_count = localStorage.getItem("counter_count") ? localStorage.getItem("counter_count") : undefined;
      }
      if (localStorage.getItem('rent_cost') && localStorage.getItem('rent_cost') != 'undefined') {
        filter.rent_cost = localStorage.getItem("rent_cost") ? localStorage.getItem("rent_cost") : undefined;
      }
      let filterKeys = Object.keys(filter);
      if (defaultFilter) {
        
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName],'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
        
      }
      else {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName],'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
    }
  }
}