import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from  '@angular/common/http';
@Injectable({
	providedIn: 'root'
})

export class ApiServiceService {
	//API_URL  =  'https://cc.webspero.com/api/';
	//API_URL  =  'http://sow.webspero.com/device-api/';
	API_URL  =  'http://api.webspero.com/device-api/';
	constructor(private  httpClient:  HttpClient) {	}

	loginUser(customer){
		return  this.httpClient.post(this.API_URL+'auth',customer);
	}

	refreshToken(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'auth/refresh',null,{ headers: headers });
	}

	expireToken(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'auth/logout',null,{ headers: headers });
	}

	deviceList(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices',{headers});
	}

	getDevice(token,deviceId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+deviceId,{ headers: headers });
	}

	getUsers(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'users',{ headers: headers });
	}

	getUser(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'user',{ headers: headers });
	}

	getActivity(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'activity',{ headers: headers });
	}

	getVisibleFields(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'fields',{ headers: headers });
	}

	updateSelectedFields(token,fields){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.put(this.API_URL+'fields',fields,{ headers: headers });
	}
	
	getStatusHistory(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/statusHistory',{ headers: headers });
	}
	
	getLocationHistory(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/locationHistory',{ headers: headers });
	}
	
	getContract(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/contract',{ headers: headers });
	}
	
	saveCorrectedContract(token,devicecontractId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+ '/contracts/' + devicecontractId,data,{ headers: headers });
	}
	
	updateChangedContract(token,devicecontractId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+ '/contracts/' + devicecontractId,data,{ headers: headers });
	}
	
	addChangedContract(token,deviceCode,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+ '/devices/' + deviceCode + '/contract',data,{ headers: headers });
	}
	contractHistory(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/contractHistory',{ headers: headers });
	}
	
	getCounter(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/counter',{ headers: headers });
	}
	
	getService(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/services',{ headers: headers });
	}

	markedCloseIssue(token,issueId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'issues/' + issueId + "/close",data,{ headers: headers });
	}

	markedOpenIssue(token,issueId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'issues/' + issueId + "/open",data,{ headers: headers });
	}

	saveEditIssue(token,issueId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'issues/'+issueId,data,{ headers: headers });
	}
	
	getIssueClosed(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/issues/closed',{ headers: headers });
	}
	
	getIssueOpen(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devices/'+device+'/issues/open',{ headers: headers });
	}

	NewIssue(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devices/'+device+'/issues',data,{ headers: headers });
	}
	getMonthly(token,year,month){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'statistics/basic/monthly/'+year+'/'+month,{ headers: headers });
	}

	getYealry(token,year){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'statistics/basic/yearly/'+year,{ headers: headers });
	}

	getQauterly(token,year,month){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'statistics/basic/quaterly/'+year+'/'+month,{ headers: headers });
	}

	getCustom(token,date1,date2){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'statistics/custom/'+date1+'/'+date2,{ headers: headers });
	}
	
	issuesList(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'issues',{ headers: headers });
	}
	
	createDevice(token,device){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devices',device,{ headers: headers });
	}

	createUser(token,value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'user',value,{ headers: headers });
	}

	forgotPass(value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		//headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'user/forgot/'+value,{ headers: headers });
	}
	
	updateUsers(token,value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'user',value,{ headers: headers });
	}

	updateUsersOther(token,value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'users',value,{ headers: headers });
	}

	userbyName(token,value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'userby',value,{ headers: headers });
	}
	
	updatePassword(token,value){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'changepassword',value,{ headers: headers });
	}
	
	resetPassword(username,data){
		let headers: HttpHeaders = new HttpHeaders();
		return  this.httpClient.post(this.API_URL+'/user/recover/' + username,data);
	}

	createCounter(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devices/'+device+'/counter',data,{ headers: headers });
	}

	deleteCounter(token,countId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'counter/'+countId,{ headers: headers });
	}

	patchDevice(token,deviceId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+deviceId,data,{ headers: headers });
	}
	markRetrievedDevice(token,deviceId,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'/devices/'+deviceId,data,{ headers: headers });
	}

	createService(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devices/'+device+'/services/service',data,{ headers: headers });
	}

	emptyCoinbox(token,device,data=''){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devices/'+device+'/services/empty',data,{ headers: headers });
	}

	moveDevice(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+device+'/move',data,{ headers: headers });
	}

	changeStatus(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+device+'/status',data,{ headers: headers });
	}

	changeComment(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+device,data,{ headers: headers });
	}

	changeContractFieldUpdate(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'contractfield/'+device,data,{ headers: headers });
	}

	getContractField(token,deviceId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'contractfield/'+deviceId,{ headers: headers });
	}

	changeWarrantyEndDate(token,device,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+device,data,{ headers: headers });
	}

	deleteDevice(token,deviceId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'devices/'+deviceId,{ headers: headers });
	}

	userStatus(token,username,status){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'user/'+username+'/'+status,'',{ headers: headers });
	}

	getlocation(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'locationlist',{ headers: headers });
	}

	createLocation(token,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'locationcreate',data,{ headers: headers });
	}

	createDashbordAdmin(token,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'dashbordAdmin',data,{ headers: headers });
	}

	getDashbordAdmin(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'dashbordAdmin',{ headers: headers });
	}


	deleteDashbordAdmin(token,id){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'dashbordAdmin/'+id,{ headers: headers });
	}

	deleteLocation(token,locationId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'location/'+locationId,{ headers: headers });
	}

	updateRegion(token,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'regionupadte',data,{ headers: headers });
	}

	getRegion(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'regionlist',{ headers: headers });
	}

	createRegion(token,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'regioncreate',data,{ headers: headers });
	}

	deleteRegion(token,regionId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'region/'+regionId,{ headers: headers });
	}

	getDeviceList(token){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.get(this.API_URL+'devicelist',{ headers: headers });
	}

	createDevicetype(token,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.post(this.API_URL+'devicecreate',data,{ headers: headers });
	}

	deleteDevicetype(token,typeId){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.delete(this.API_URL+'devicetype/'+typeId,{ headers: headers });
	}
	KeyOfDevice(token,key,data){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return  this.httpClient.patch(this.API_URL+'devices/'+key,data,{ headers: headers });
	}
	

}