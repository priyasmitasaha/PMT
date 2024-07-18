import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.css']
})


export class ProfileCreationComponent {
  firstName : any;
  lastName : any;
  contactNumber : any;
  email : any;
  altNumber : any;
  address : any;
  pinCode : any;
  state : any;
  assignTo :any;
  shiftName : any;
  joining_date : any;
  position : any;
  assign_to : any;
  education_background : any;
  experience : any;
  expertise : any;
  currentDate :any;
  stateList: any = [];
  users :any =[];
  positionList : any = [];
  disabledSubmit: boolean = false;
  isReadOnly: boolean = false;
  isVisible: boolean = false; // Initially invisible
  image : any;
  profileimg : any;
  profileimgOrg : any;
  maxDate : any;
  daysBetween: any;
  selectedDate : any;
  startDateFormatted : any;
  endDateFormatted : any;
  difference: any;
  daysDifference :any;
  userID : any;
  userType : any;
  userList : any = [];
  capacity : number =  0;
  userName: any;
  password: any;
  counter= 0;
  days: any;
  img: any;
  isCapacity:  boolean = false;
  isShift:  boolean = false;
  imgPath = "http://3.111.113.246:8088/uploads/images/";
  promoteTo: any;
  educationBackground: any;


  constructor(private location: Location, private datePipe: DatePipe ,private common: CommonService, private activateRoute: ActivatedRoute, private router: Router , private userservice: UserService){

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
   

    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
  
    if(this.userType = 'Admin'){
        this.isCapacity = true;
    }
  }
  
  ngOnInit() {

    this.getStateList();
    this.getPositionList();

    const joining_date = this.joining_date ;
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

  getStateList() {
    const data = {
      countryId: 8
    };

    this.common.getStateList(data).subscribe((res: any) => {
      if (res.success) {
        this.stateList = res.response;
        console.log(this.stateList);
      }
    })
  }

  getPositionList(){
    this.positionList = this.common.positionList;
  }

  profileUpload(){
    const profile = document.getElementById('profileimg') as HTMLInputElement;
    const file: any = profile.files;
   
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.common.imageUpload(fileData).subscribe((res: any) => {
          if (res.success) {
            this.common.showAlertMessage(res.message, this.common.succContent);
            this.profileimgOrg = res.response.originalFilename;
             this.img = res.response.newFilename;
          }
        })
      }
    }
  }

  calculateDateDifference(): void {
    if (this.selectedDate && this.currentDate) {
      const diffInMs = this.currentDate.getTime() - this.selectedDate.getTime();
      this.daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      return this.daysDifference;
    }
  }

  getExperience(){
    this.currentDate = new Date();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    this.selectedDate = new Date(this.joining_date);
    this.days = this.calculateDateDifference();  
    this.experience = this.common.convertDaysToMonthsYears(this.days);
  }

  titleCase(word:any){
    return word[0].toUpperCase()+ word.slice(1);
  }

  createProfile(){
   
    if (this.firstName == "" || this.firstName == null || this.firstName == undefined) {
      this.common.showAlertMessage("Please enter first name", this.common.errContent);
      return;
    }
   
    if (this.lastName == "" || this.lastName == null || this.lastName == undefined) {
      this.common.showAlertMessage("Please enter last name", this.common.errContent);
      return;
    }

    if (this.contactNumber == "" || this.contactNumber == null || this.contactNumber == undefined) {
      this.common.showAlertMessage("Please enter contact number", this.common.errContent);
      return;
    }

    if (this.contactNumber != null && this.contactNumber != "" && this.contactNumber != undefined) {
      if (this.common.phoneNumberFormat(this.contactNumber) == false) {
        this.common.showAlertMessage("Please enter valid phone no", this.common.errContent);
        return;
      }
    }

    if (this.email == "" || this.email == null || this.email == undefined) {
      this.common.showAlertMessage("Please enter email", this.common.errContent);
      return;
    }

    if (this.email != null && this.email != "" && this.email != undefined) {
      if (this.common.mailFormatCheck(this.email) == false) {
        this.common.showAlertMessage("Please enter valid email", this.common.errContent);
        return;
      }
    }

    if (this.address == "" || this.address == null || this.address == undefined) {
      this.common.showAlertMessage("Please enter address", this.common.errContent);
      return;
    }

    if (this.pinCode == "" || this.pinCode == null || this.pinCode == undefined) {
      this.common.showAlertMessage("Please enter pincode", this.common.errContent);
      return;
    }

    if (this.state == "" || this.state == null || this.state == undefined) {
      this.common.showAlertMessage("Please select state", this.common.errContent);
      return;
    }

    if (this.joining_date == "" || this.joining_date == null || this.joining_date == undefined) {
      this.common.showAlertMessage("Please select joining date", this.common.errContent);
      return;
    }

    if(this.joining_date > this.maxDate){
      this.common.showAlertMessage("Joining Date should not be greater than current date", this.common.errContent);
      return;
    }

    if (this.position == "" || this.position == null || this.position == undefined) {
      this.common.showAlertMessage("Please select position", this.common.errContent);
      return;
    }

    if (this.educationBackground == "" || this.educationBackground == null || this.educationBackground == undefined) {
      this.common.showAlertMessage("Please enter education background", this.common.errContent);
      return;
    }
    if (this.experience == "" || this.experience == null || this.experience == undefined) {
      this.common.showAlertMessage("Please enter experience", this.common.errContent);
      return;
    }
    if (this.expertise == "" || this.expertise == null || this.expertise == undefined) {
      this.common.showAlertMessage("Please enter expertise", this.common.errContent);
      return;
    }

    if(this.position == 'SSME' || this.position == 'SME' || this.position == 'JSME' || this.position == 'ATL'){
      if (!this.capacity || this.capacity == null || this.capacity == undefined) {
        this.common.showAlertMessage("Please enter capacity", this.common.errContent);
        return;
      }

      if (typeof(this.capacity) != 'number') {
        this.common.showAlertMessage("Please enter number in capacity", this.common.errContent);
        return;
      }
    }

    if (this.education_background == "" || this.education_background == null || this.education_background == undefined) {
      this.common.showAlertMessage("Please enter education background", this.common.errContent);
      return;
    }

    if (this.userName == "" || this.userName == null || this.userName == undefined) {
      this.common.showAlertMessage("Please enter username", this.common.errContent);
      return;
    }

    if (this.password == "" || this.password == null || this.password == undefined) {
      this.common.showAlertMessage("Please enter password", this.common.errContent);
      return;
    }

    if (this.expertise == "" || this.expertise == null || this.expertise == undefined) {
      this.common.showAlertMessage("Please enter expertise", this.common.errContent);
      return;
    }

    const firstname = this.titleCase(this.firstName);
    const lastname = this.titleCase(this.lastName);
   
    const data = {
      firstName: firstname,
      lastName: lastname,
      contactNumber: this.contactNumber,
      altNumber: this.altNumber ? this.altNumber : '',
      email: this.email,
      address: this.address,
      pinCode: this.pinCode,
      state: this.state,
      joiningDate: this.joining_date,
      position: this.position,
      assignTo : this.assignTo ? this.assignTo : '',
      shiftName : this.shiftName ? this.shiftName : '',
      promoteTo : this.promoteTo ? this.promoteTo : '',
      capacity : this.capacity ? this.capacity : '',
      educationBackground: this.education_background,
      experience: this.experience,
      expertise: this.expertise,
      profileImg : this.img ? this.img : '',
      country:8,
      userName: this.userName,
      password: this.password
    };

    console.log(data);

    this.disabledSubmit = true;
    this.userservice.createProfile(data).subscribe((res: any) => {
      if (res.success) {
       
        this.disabledSubmit = false;
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.firstName = "";
        this.lastName = "";
        this.contactNumber = "";
        this.altNumber = "";
        this.email = "";
        this.address = "";
        this.pinCode = "";
        this.state = "";
        this.joining_date = "";
        this.education_background = "";
        this.experience = "";
        this.userName = "";
        this.password = "";
        this.capacity = 0;
        this.expertise = "";
        this.profileimg = "";
        this.position = "";
        this.assignTo = "";
        this.shiftName = "";
        this.img = "";
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
        this.router.navigate(['pages/profile-creation']);
      }
    });
  }

  assign(){
    const position = this.position;

      if(position == 'PM'){
        this.isVisible = false;
        this.isReadOnly = true;
        this.isCapacity = true;
        this.isShift = false;
      
        const data = { 
          position : this.position
        }
        this.userservice.getTotalCapacity(data).subscribe((res: any) => {

        })


      }else if(position == 'TM'){
        this.isVisible = true;
        this.isReadOnly = true;
        this.isCapacity = true;
        this.isShift = false;
     
        const data = { 
          userType : this.position
        }
        this.userservice.specificUserList(data).subscribe((res: any) => {
          if (res.success) {
            this.userList = res.response;
          }
        })

        const data2 = { 
          position : this.position
        }
        this.userservice.getTotalCapacity(data2).subscribe((res: any) => {

        })
      

      }else if(position == 'TL'){
        this.isVisible = true;
        this.isReadOnly = true;
        this.isCapacity = true;
        this.isShift = false;

        const data = { 
          userType : this.position
        }

        this.userservice.specificUserList(data).subscribe((res: any) => {
          if (res.success) {
            this.userList = res.response;
          }
        })
       
        const data2 = { 
          position : this.position
        }
        this.userservice.getTotalCapacity(data2).subscribe((res: any) => {

        })
        

     }else if(position == 'SSME' || position == 'SME' || position == 'JSME' || position == 'ATL'){
        this.isVisible = true;
        this.isReadOnly = false;
        this.isCapacity = true;
        this.isShift = false;

        const data = { 
          userType : this.position
        }

        this.userservice.specificUserList(data).subscribe((res: any) => {
          if (res.success) {
            this.userList = res.response;
          }
        })

     }else if(position == 'QA'){
        this.isCapacity = false;
        this.isShift = false;
        this.isVisible = true;

        const data = { 
          userType : this.position
        }

        this.userservice.specificUserList(data).subscribe((res: any) => {
          if (res.success) {
            this.userList = res.response;
          }
        })
     }
  }

 

  

}
