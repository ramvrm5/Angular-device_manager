import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ApiServiceService } from '../api-service.service';
import swal from 'sweetalert';
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  jwtToken;
  username;
  key;
  user: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
    public auth: AuthService,
  ) {
    this.user={
      key:"",
      username:"",
      password:"",
      password2:"",

    }

		this.activatedRoute.params.subscribe(params => {
      this.user.username = this.username = params['username'];
      this.user.key = this.key = params['key'];
		});
  }

  ngOnInit() {
  }

  login() {
    this.apiService.resetPassword(this.username,this.user).subscribe((response) => {
      this.auth.sendValue('jwt', response['token']);
      this.router.navigate(['/account']);
      swal({
        title: "Success!",
        text: "issue Edited!",
        timer: 500,
        icon: "success"
      });
    }, (err) => {
      console.log(err);
      swal({
        title: "Error!",
        text: "There was a problem with saving the issue!",
        timer: 500,
        icon: "error"
      });
    });
  }
}
