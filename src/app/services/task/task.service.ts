import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  API_ROOT = environment.API_ROOT;
  LTS_API_ROOT = environment.LTS_API_ROOT;

  constructor(private http: HttpClient) { }

  getAllTaskList(data: any) {
    return this.http.post(this.API_ROOT + 'task/taskAllocationList', data, httpOptions);
  }

  getTaskList(data: any){
    return this.http.post(this.API_ROOT + 'task/taskAllocationList', data, httpOptions);
  }

  getOtherTaskDetails(assignmentId: any, invoiceId: any, taskId: any, taskDetailsId: any){
    const encodedString = encodeURIComponent(taskId);
    return this.http.get(this.API_ROOT + 'task/'+ assignmentId + '?invoiceId=' + invoiceId + '&taskId=' + encodedString + '&taskDetailsId=' + taskDetailsId, httpOptions);
  }

  recentProjectList(){
    return this.http.get(this.API_ROOT + 'project/recentProjectList', httpOptions);
  }

  changeQueryStatus(data: any){
    return this.http.post(this.API_ROOT + 'task/taskQueryStatusChange', data, httpOptions);
  }

  getTaskCount(data: any){
    return this.http.post(this.API_ROOT + 'task/taskDashboard', data, httpOptions);
  }

  getTaskDetails(assignmentId: any, invoiceId: any, taskId: any){
    
    const encodedString = encodeURIComponent(taskId);
    return this.http.get(this.API_ROOT + 'task/'+ assignmentId + '?invoiceId=' + invoiceId + '&taskId=' + encodedString , httpOptions);
  }
  addAssignee(data: any){
    return this.http.post(this.API_ROOT + 'task/taskAssign', data, httpOptions);
  }

  getAssignedTaskList(data: any){
    return this.http.post(this.API_ROOT + 'task/taskAssignList', data, httpOptions);
  }


  sendTaskConfirmation(data: any){
    return this.http.post(this.API_ROOT + 'task/sendTaskConfirmation', data, httpOptions);
  }

  getAssigneeByTaskID(data: any){
    return this.http.post(this.API_ROOT + 'task/getassigneebytaskid', data, httpOptions);
  }

  getOngoingprojects(data: any){
    return this.http.post(this.API_ROOT + 'task/getongoingprojects', data, httpOptions);
  }

  getReworkprojects(data: any){
    return this.http.post(this.API_ROOT + 'task/getreworkprojects', data, httpOptions);
  }

  getRedoprojects(data: any){
    return this.http.post(this.API_ROOT + 'task/getredoprojects', data, httpOptions);
  }

  getResitprojects(data: any){
    return this.http.post(this.API_ROOT + 'task/getresitprojects', data, httpOptions);
  }

  getDeliveredTaskList(data: any){
    return this.http.post(this.API_ROOT + 'task/getdeliveredtasklist', data, httpOptions);
  }

  getDeadlineMissedTaskList(data: any){
    return this.http.post(this.API_ROOT + 'task/getdeadlinemissedtasklist', data, httpOptions);
  }

  addExtention(data: any){
    return this.http.post(this.API_ROOT + 'task/taskExtentions', data, httpOptions);
  }

  getallExtentions(data: any){
    return this.http.post(this.API_ROOT + 'task/taskExtentionsList', data, httpOptions);
  }

  changeExtentionstatus(data: any){
    return this.http.post(this.API_ROOT + 'task/changeextentionstatus', data, httpOptions);
  }

  getTaskExtentionDetails(data: any){
    return this.http.post(this.API_ROOT + 'task/gettaskextentiondetails', data, httpOptions);
  }

  addQuery(data: any){
    return this.http.post(this.API_ROOT + 'task/taskQuery', data, httpOptions);
  }

  checkQueryExists(data: any){
    return this.http.post(this.API_ROOT + 'task/checkqueryexists', data, httpOptions);
  }

  getQuery(data: any){
    return this.http.post(this.API_ROOT + 'task/taskQueryList', data, httpOptions);
  }

  sendQuery(data: any){
    return this.http.post(this.API_ROOT + 'task/sendquery', data, httpOptions);
  }

  taskQuerySolution(data: any){
    return this.http.post(this.API_ROOT + 'task/taskQuerySolution', data, httpOptions);
  }

  getallQuerybyTaskId(data: any){
    return this.http.post(this.API_ROOT + 'task/getallquerybytaskId', data, httpOptions); 
  }

  countQuerySolution(data: any){
    return this.http.post(this.API_ROOT + 'task/countquerysolution', data, httpOptions); 
  }

  getTaskConfirmationDetails(data: any){
    return this.http.post(this.API_ROOT + 'task/gettaskconfirmationdetails', data, httpOptions);
  }

  taskQueryDetails(data: any){
    return this.http.post(this.API_ROOT + 'task/taskQueryDetails', data, httpOptions);
  }

  taskMarkAsComplete(data: any){
    return this.http.post(this.API_ROOT + 'task/taskMarkAsComplete', data, httpOptions);
  }

  changeExtentionStatus(data: any){
    return this.http.post(this.API_ROOT + 'task/changeExtentionStatus', data, httpOptions);
  }

  assignmentUpdate(data: any){
    return this.http.post(this.API_ROOT + 'task/assignmentUpdate', data, httpOptions);
  }

}
