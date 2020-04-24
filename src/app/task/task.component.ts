import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Service} from '../services/services.service';

export interface DialogTask {
  task: any;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class DialogTaskComponent implements OnInit {

  departments: any;
  roles: any;
  assignedUsers: any;

  constructor(public dialogRef: MatDialogRef<DialogTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogTask, private service: Service, private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data)
    console.log(this.data.task.task)
    this.getDepartments();
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  getDepartments() {
    this.service.getDepartments().subscribe((data: any) => {
      this.departments = data.results;
      this.getRoles();
    }, err => {
    });
  }

  getRoles() {
    this.service.getRoles(this.data.task.task.department.id).subscribe((data: any) => {
      this.roles = data.results;
      this.getAssignedTo();
    }, err => {
    });
  }

  getAssignedTo() {
    this.service.getAssignedUsers(this.data.task.task.role.id).subscribe((data: any) => {
      this.assignedUsers = data.results;
    }, err => {
    });
  }

  onChangeDepartment(event) {
    this.data.task.task.department.id = event.value;
    this.getRoles();
    this.data.task.task.role.id = null;
    this.data.task.task.assigned_to.id = null;
  }
  onChangeRole(event) {
    this.data.task.task.role.id = event.value;
    this.getAssignedTo();
    this.data.task.task.assigned_to.id = null;
  }
  onChangeAssignedTo(event) {
    this.data.task.task.assigned_to.id = event.value;
  }
  onChangePriority(event) {
    this.data.task.task.priority.id = event.value;
  }
  onChangeTrackedRoadmap(event) {
    this.data.task.tracker_roadmap.id = event.value;
  }

}
