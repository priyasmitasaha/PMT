import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  userName = "";
  password = "";
  counter= 0;

  constructor(private router: Router ,private common: CommonService,private userservice: UserService) { }

  ngOnInit() {

  }

  passwordShowHide() {
    this.counter++;
    var passField: any = document.getElementById('inputPassword');
    var passview: any = document.getElementById('passview');
    if (this.counter % 2 != 0) {
      passField.setAttribute("type", "text");
      passview.setAttribute("class", "fa fa-fw fa-eye-slash");
    } else {
      passField.setAttribute("type", "password");
      passview.setAttribute("class", "fa fa-fw fa-eye");
    }
  }

  login() {
    if (this.userName == "" || this.userName == null || this.userName == undefined) {
      this.common.showAlertMessage("Please enter username", this.common.errContent);
      return;
    }

    if (this.password == "" || this.password == null || this.password == undefined) {
      this.common.showAlertMessage("Please enter password", this.common.errContent);
      return;
    }
    const data = {
      userName : this.userName,
      password: this.password
    }

    this.userservice.login(data).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('pmtuserId', res.response.userId);
        localStorage.setItem('pmtuserType', res.response.userType);
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('pmtfirstName', res.response.firstName);
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.router.navigate(['pages/home']);
      } else {
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    })
  }

}
