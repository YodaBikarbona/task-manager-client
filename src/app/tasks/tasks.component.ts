import { Component, OnInit } from '@angular/core';
import {Service} from '../services/services.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DialogTaskComponent} from '../task/task.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  priorities: any;
  departments: any;
  roles: any;
  trackerRoadmaps: any;
  trackedRoadMapTasks: any;
  assignedUsers: any;
  trackedRoadMapTasksList = [];
  departmentId = 0;
  roleId = 0;
  priorityId = 0;
  trackedRoadMapId = 0;
  assignedToId = 0;

  backlogList = [];
  todoList = [];
  doingList = [];
  reviewList = [];
  doneList = [];

  constructor(private service: Service, private dialog: MatDialog) { }

  ngOnInit() {
    this.getPriorities();
    this.getDepartments();
    this.getTrackedRoadMap();
  }

  onChangeDepartment(event) {
    this.departmentId = event.value;
    console.log("tu sam")
    console.log(this.departmentId)
    this.getRoles();
    this.roleId = null;
    this.assignedToId = null;
    this.getTrackedRoadMapTasks();
  }
  onChangeRole(event) {
    this.roleId = event.value;
    this.getAssignedTo();
    this.assignedToId = null;
    this.getTrackedRoadMapTasks();
  }
  onChangeAssignedTo(event) {
    this.assignedToId = event.value;
    this.getTrackedRoadMapTasks();
  }
  onChangePriority(event) {
    this.priorityId = event.value;
    this.getTrackedRoadMapTasks();
  }
  onChangeTrackedRoadmap(event) {
    this.trackedRoadMapId = event.value;
    this.getTrackedRoadMapTasks();
  }

  color(event) {
    console.log(event)
  }

  clearFilters() {
    this.departmentId = null;
    this.roleId = null;
    this.assignedToId = null;
    this.priorityId = null;
    this.trackedRoadMapId = null;
    this.getPriorities();
    this.getDepartments();
    this.getTrackedRoadMap();
    // this.getTrackedRoadMapTasks();
  }

  getTrackedRoadMap() {
    this.service.getTrackedRoadmaps().subscribe((data: any) => {
      this.trackerRoadmaps = data.results;
      this.getTrackedRoadMapTasks();
      // if (this.trackerRoadmaps !== undefined) {
      //   for (let i = 0; i < this.trackerRoadmaps.length; i++) {
      //     this.getTrackedRoadMapTasks(this.trackerRoadmaps[i].id, i);
      //   }
      // }
    }, err => {
    });
  }

  getPriorities() {
    this.service.getPriorities().subscribe((data: any) => {
      this.priorities = data.results;
    }, err => {
    });
  }

  getDepartments() {
    this.service.getDepartments().subscribe((data: any) => {
      this.departments = data.results;
      this.getRoles();
    }, err => {
    });
  }

  getRoles() {
    if (this.departmentId === null) {
      this.departmentId = 0;
    }
    this.service.getRoles(this.departmentId).subscribe((data: any) => {
      this.roles = data.results;
      this.getAssignedTo();
    }, err => {
    });
  }

  getAssignedTo() {
    if (this.roleId === null) {
      this.roleId = 0;
    }
    this.service.getAssignedUsers(this.roleId).subscribe((data: any) => {
      this.assignedUsers = data.results;
    }, err => {
    })
  }

  getTrackedRoadMapTasks() {
    if (this.trackedRoadMapId == null) {
      this.trackedRoadMapId = 0;
    }
    if (this.departmentId == null) {
      this.departmentId = 0;
    }
    if (this.roleId == null) {
      this.roleId = 0;
    }
    if (this.assignedToId == null) {
      this.assignedToId = 0;
    }
    if (this.priorityId == null) {
      this.priorityId = 0;
    }
    console.log(this.departmentId, "ovdje sam sada")
    this.service.getTrackedRoadmapTasks(this.departmentId, this.roleId, this.priorityId, this.assignedToId, this.trackedRoadMapId).subscribe((data: any) => {
      this.trackedRoadMapTasks = data.results;
      console.log("tasks", data.results)
      // if (this.trackerRoadmaps[index].name === 'Backlog') {
      //   this.backlogList = this.trackedRoadMapTasks;
      // } else if (this.trackerRoadmaps[index].name === 'To-do') {
      //   this.todoList = this.trackedRoadMapTasks;
      // } else if (this.trackerRoadmaps[index].name === 'Doing') {
      //   this.doingList = this.trackedRoadMapTasks;
      // } else if (this.trackerRoadmaps[index].name === 'Review') {
      //   this.reviewList = this.trackedRoadMapTasks;
      // } else if (this.trackerRoadmaps[index].name === 'Done') {
      //   this.doneList = this.trackedRoadMapTasks;
      // }
      console.log(this.trackerRoadmaps)
    }, err => {
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openTask(request): void {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      width: '1280px',
      disableClose: true,
      data: {task: request,
      priorities: this.priorities,
      trackerRoadmaps: this.trackerRoadmaps}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true) {
        this.getTrackedRoadMapTasks();
      }
    });
  }

}
