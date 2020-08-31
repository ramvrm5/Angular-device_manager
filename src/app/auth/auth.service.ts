import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from  '@angular/common/http';
import { share, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ApiServiceService } from  '../api-service.service';

@Injectable()
export class AuthService {
	jwtToken
	constructor(
		private myRoute: Router,
		private  httpClient:  HttpClient,
		private location: Location,
		private apiService:  ApiServiceService
	) { }

	sendValue(key: string,token: string) {
		localStorage.setItem(key, token)
	}
	
	getValue(key: string) {
		return localStorage.getItem(key)
	}

	isLoggedIn() {
		return this.getValue('jwt') !== null;
	}

	goBack() {
		this.location.back();
	}

	logout() {
		this.jwtToken = this.getValue('jwt');
		this.apiService.expireToken(this.jwtToken).subscribe((response) => {
			localStorage.clear();
			this.myRoute.navigate(["login"]);
		},(err) => {
			localStorage.clear();
			this.myRoute.navigate(["login"]);
		});
	}
}