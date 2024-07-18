import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-leader-details',
  templateUrl: './team-leader-details.component.html',
  styleUrls: ['./team-leader-details.component.css']
})

export class TeamLeaderDetailsComponent {
  userID :any;
  word: any;
  userType: any;
  maxDate : any;
  wordarr: any;
  firstName ="";
  lastName ="";
  contactNumber = "";
  altNumber ="";
  email ="";
  address = '';
  pinCode ="";
  state =""
  joiningDate = "";
  position = "";
  educationBackground = "";
  experience = "";
  expertise = "";
  isReadOnly: boolean = true;
  isButton: boolean = false;
  isVisible: boolean = false; 
  image : any;
  profileimg : any;
  profileimgOrg : any;
  stateList: any = [];
  assignTo = "" as any;
  shiftName : any;
  isShift:  boolean = false;
  isCapacity:  boolean = true;
  userList : any = [];
  capacity :any;
  positionList : any = [];
  Date:any;
  status = 1 as any;
  promoteTo: any;
  isPromote: boolean = false;
  shiftId = '';
  isReadMode: boolean = true;
  isDropdownDisabled: boolean = true;
  idarr: any;
  imgPath = "http://3.111.113.246:8088/uploads/images/";
  img: any;
  selectedDate : any;
  currentDate :any;
  days: any;
  daysDifference :any;
  isCapa: boolean = true;
  assignAt = "" ;
  

  constructor(private location: Location, private activateRoute: ActivatedRoute, private router:Router ,private common: CommonService, public userservice: UserService){
    this.userID = this.activateRoute.snapshot.paramMap.get('id');
    this.userType = localStorage.getItem('pmtuserType');
 

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.word = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;
    this.wordarr = this.word.split('&');
    this.idarr = this.wordarr[0];

    console.log(this.idarr);
    
    if (this.userID != 0) {
      this.getUserDetailsById();
    } 

    if(this.userType = 'Admin'){
      this.isCapacity = true;
    }
  }

  ngOnInit() {
    this.getStateList();
    this.getPositionList();
    this.getTeamManagerList();
    this.isReadOnly = true;
    this.isDropdownDisabled = true;
  }

  getPositionList(){
    this.positionList = this.common.positionList;
  }

  getTeamManagerList(){
    const data = { 
      userType : 'QA'
    }

    this.userservice.specificUserList(data).subscribe((res: any) => {
      if (res.success) {
        this.userList = res.response;
      }
    })
  }

  getExperience(){
    this.currentDate = new Date();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    this.selectedDate = new Date(this.joiningDate);
    this.days = this.calculateDateDifference(); 
    if(this.joiningDate > this.currentDate){ 
      this.experience = this.common.convertDaysToMonthsYears(this.days);
    }
  }


  calculateDateDifference(): void {
    if (this.selectedDate && this.currentDate) {
      const diffInMs = this.currentDate.getTime() - this.selectedDate.getTime();
      this.daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      return this.daysDifference;
    }
  }

  getStateList() {
    const data = {
      countryId: 8
    };

    this.common.getStateList(data).subscribe((res: any) => {
      if (res.success) {
        this.stateList = res.response;
      }
    })
  }

  getUserDetailsById(){
    const data = {
      userId: this.idarr
    };

    this.userservice.getUserDetailsById(data).subscribe((res: any) => {
      if (res.success) {
        console.log(res.response);
       
            this.getUsers();
           this.firstName = res.response.firstName;
           this.lastName = res.response.lastName;
           this.contactNumber = res.response.phoneNo;
           this.altNumber = res.response.altPhoneNo;
           this.address = res.response.address;
           this.email = res.response.email;
           this.pinCode = res.response.pinCode;
           
           this.capacity = res.response.capacity;
           this.state = res.response.stateId;
           this.Date = res.response.joiningDate;
           this.joiningDate = this.common.convertDateTime(this.Date);
           this.status = res.response.isActive;
           this.shiftId = res.response.shiftTo;
           this.promoteTo = res.response.promoteTo;
           this.position = res.response.userType;
           this.assignTo = res.response.assignTo;

           if(this.position == 'PM'){
            this.isVisible = false;
            this.isShift = false;
           }

          if(this.position == 'QA' || this.position == 'TL' || this.position == 'TM' || this.position == 'SSME' || this.position == 'SME'  || this.position == 'JSME' || this.position == 'ATL'){
              this.isVisible = true;
              if(this.assignTo){
                this.isShift = true;
              }else{
                this.isShift = false;
              }
          }

           this.educationBackground = res.response.educationBackground;
           this.experience = res.response.experience;
           this.expertise = res.response.expertise;
           this.profileimg = res.response.profileImg;
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
        this.location.back();
      }
    })
  }
  
  getUsers(){
    const data = { 
      userType : this.position
    }
    this.userservice.specificUserList(data).subscribe((res: any) => {
      if (res.success) {
        this.userList = res.response;
      }
    })
  }

  editProfile(userID: any){
    if(userID > 0){
      this.isVisible = true;
      this.isReadOnly = false;
      this.isButton = true;
      this.isDropdownDisabled = false;
      this.isReadMode = false;
      this.getUserType(userID);
      this.assignTo = "";
    }
  }

  getUserType(userID: any){
    const data = {
      userId : userID
    }
    this.userservice.getUserDetailsById(data).subscribe((res: any) => {
      if (res.success) {
        this.promoteTo = this.common.getPromotionLevel(res.response.userType);
      }
    })
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
            this.profileimg = res.response.newFilename;
            console.log(this.profileimg);
          }
        })
      }
    }
  }

  titleCase(word:any){
    return word[0].toUpperCase()+ word.slice(1);
  }

  updateProfile(){
 
    if (this.firstName == "" || this.firstName == null || this.firstName == undefined) {
      this.common.showAlertMessage("Please enter first name", this.common.errContent);
      return;
    }
    
    if (this.lastName == "" || this.lastName == null || this.lastName == undefined) {
      this.common.showAlertMessage("Please enter last name", this.common.errContent);
      return;
    }
   
    if (this.contactNumber == "" || this.contactNumber == null || this.contactNumber == undefined) {
      if (this.common.phoneNumberFormat(this.contactNumber) == false) {
        this.common.showAlertMessage("Please enter contact number", this.common.errContent);
        return;
      }
    }
    if (this.altNumber != null && this.altNumber != "" && this.altNumber != undefined) {
      if (this.common.phoneNumberFormat(this.altNumber) == false) {
        this.common.showAlertMessage("Please enter valid alternate phone no", this.common.errContent);
        return;
      }
    }

    if (this.contactNumber == this.altNumber) {
      this.common.showAlertMessage("Alternate phone no must be different", this.common.errContent);
      return;
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

    if (this.joiningDate == "" || this.joiningDate == null || this.joiningDate == undefined) {
      this.common.showAlertMessage("Please select joining no", this.common.errContent);
      return;
    }

    if(this.joiningDate > this.maxDate){
      this.common.showAlertMessage("Joining Date should not be greater than current date", this.common.errContent);
      this.experience = "";
      return;
    }

    if (this.position == null || this.position == "" || this.position == undefined) {
        this.common.showAlertMessage("Please enter position", this.common.errContent);
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

    if(this.assignTo != null && this.shiftName != null){
      if(this.assignTo == this.shiftName){
        this.common.showAlertMessage("Must select different user", this.common.errContent);
        return;
      }
     }

    const firstname = this.titleCase(this.firstName);
    const lastname = this.titleCase(this.lastName);

    if(this.position == 'PM'){
      this.assignTo = "";
    }else if(this.position != 'PM'){
      this.assignTo = this.assignTo;

    }


    const data = {
      userId: this.idarr,
      firstName: firstname,
      lastName: lastname,
      contactNumber: this.contactNumber ? this.contactNumber : null,
      altNumber: this.altNumber ? this.altNumber : null,
      address: this.address ? this.address : null,
      pinCode: this.pinCode ? this.pinCode.toString() : null,
      email: this.email,
      state: this.state,
      joiningDate: this.joiningDate,
      position: this.position ? this.position : null,
      educationBackground: this.educationBackground ? this.educationBackground : null,
      experience: this.experience ? this.experience : null,
      expertise: this.expertise ? this.expertise : null,
      profileImg : this.profileimg ? this.profileimg : null,
      assignTo : this.assignTo ? this.assignTo : '',
      shiftName : this.shiftName ? this.shiftName : '',
      promoteTo : this.promoteTo ? this.promoteTo : '',
      capacity : this.capacity ? this.capacity : 0,
      country : 8,
      status: this.status ?this.status: '' 
    };

    console.log(data);

    this.userservice.profileUpdate(data).subscribe((res: any) => {
      if (res.success) {
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.location.back();
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
        this.location.back();
      }
    })
  }

  assign(){
  
    const position = this.position;

      if(position == 'PM'){
        this.isVisible = false;
        this.isReadOnly = true;
        this.isCapacity = true;
        this.isShift = false;
        this.isPromote = false;
        this.isCapa = true;
      
        const data = { 
          position : this.position
        }
        this.userservice.getTotalCapacity(data).subscribe((res: any) => {

        })

      }else if(position == 'TM'){
        this.isVisible = true;
        this.isReadOnly = false;
        this.isCapacity = true;
        if(this.assignTo){
          this.isShift = true;
        }
        this.isPromote = true;
        this.isDropdownDisabled = false;
        this.isCapa = true;
        this.promoteTo = this.common.getPromotionLevel(position);

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
        if(this.assignTo){
          this.isShift = true;
        }else{
          this.isShift = false;
        }
        this.isPromote = true;
        this.isReadMode = false;
        this.isCapa = true;

        //this.isDropdownDisabled = true;

        this.promoteTo = this.common.getPromotionLevel(position);
     
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
        if(this.assignTo){
          alert(this.assignTo);
          this.isShift = true;
        }else{
          this.isShift = false;
        }
        this.isPromote = true;
        this.isCapa = false;

        this.promoteTo = this.common.getPromotionLevel(position);

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
        if(this.assignTo){
          this.isShift = true;
        }else{
          this.isShift = false;
        }
        this.isVisible = true;
        this.isPromote = true;
        this.promoteTo = this.common.getPromotionLevel(position);

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
