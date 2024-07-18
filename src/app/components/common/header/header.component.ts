import { Component,ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  logoutSubject: any;
  pageName: any;
  pagename: any;
  currentUrl: string = '';
  userId: any;
  userType: any;
  loginName: any;
  isVisible: boolean = false;
  isUlOpen = true;

  constructor(private eRef: ElementRef, private location: Location,private router: Router, private common: CommonService,private activateRoute: ActivatedRoute) {
    
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    this.loginName = localStorage.getItem('pmtfirstName');
 
  }

  ngOnInit() {
    this.pageName = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;
    if(this.pageName > 0){
      this.pageName = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 2].path;
    }
    if (this.pageName.includes('&')) {
      this.currentUrl = this.router.url;
      this.activateRoute.url.subscribe(urlSegment => {
        if (urlSegment.length > 0) {
          this.pageName = urlSegment[0].path; // Get the first segment
        }
      });
    }
   
    this.titleCaseWord(this.pageName);
  }


  toggleUl() {
    this.isUlOpen = !this.isUlOpen;
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.showPopup(2,event);
    event.stopPropagation()  
  }

  opened: any = false;
  showPopup(id: any, event: any) {
    if(id == 1) {
      this.opened = true;
      event.stopPropagation()
    } else {
      this.opened = false;
    }
  }



  titleCaseWord(word: any) {
    if (!word) return word;
   var str =  word[0].toUpperCase() + word.substr(1).toLowerCase();
    this.pagename = str.replace(/-/g, ' ');
  }

  goBack(){
    this.location.back();
  }

  logout() {
    localStorage.removeItem('pmtuserId');
    localStorage.removeItem('pmtuserType');
    this.common.logoutSubject.next(1);
    this.router.navigate(['/']);
  }

  // toggleVisibility(){
  //    this.isVisible = !this.isVisible;
  //    alert(this.isVisible);
  //    var element = document.getElementById("threeDotsMenu");
  //    element?.classList.toggle('three_dots_box')
  // }
}
