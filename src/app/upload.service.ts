import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	SERVER_URL: string = "http://api.webspero.com/device-api/";
	jwtToken
	constructor(private httpClient: HttpClient,public auth: AuthService) { }

	public uploadFile(data,url) {
		this.jwtToken = this.auth.getValue('jwt');
		let uploadURL = this.SERVER_URL+''+url;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + this.jwtToken);
		return  this.httpClient.post(uploadURL, data,{ headers: headers });
	}

}
