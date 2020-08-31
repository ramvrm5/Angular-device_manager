import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-androidapp',
  templateUrl: './androidapp.component.html',
  styleUrls: ['./androidapp.component.css']
})
export class AndroidappComponent implements OnInit {
	myAngularxQrCode: string = null;
	elementType : 'url' | 'canvas' | 'img' = 'url';
	canvas
	constructor(public auth: AuthService) {
		this.myAngularxQrCode = 'https://drive.google.com/open?id=0Bybav4dLzkCEZlFneFBPeDJCZ2M';
	}

	ngOnInit() {
	}

}
