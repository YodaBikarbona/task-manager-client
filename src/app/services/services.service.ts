import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../app.constants';

@Injectable({providedIn: 'root'})
export class Service {
  constructor(public http: HttpClient) {
  }

  getPriorities() {
    return this.http.get(`${API_URL}/v1/priorities`);
  }

  getDepartments() {
    return this.http.get(`${API_URL}/v1/departments`);
  }

  getRoles(departmentId: number) {
    const queryString = `?department_id=${departmentId}`;
    return this.http.get(`${API_URL}/v1/roles` + queryString);
  }

  getAssignedUsers(roleId: number) {
    const queryString = `?role_id=${roleId}`;
    return this.http.get(`${API_URL}/v1/tasks/assigned-users` + queryString);
  }

  getTrackedRoadmaps() {
    return this.http.get(`${API_URL}/v1/tracker-roadmaps`);
  }

  getTrackedRoadmapTasks(departmentId: number, roleId: number, priorityId: number, assignedToId: number, trackedRoadmapId: number) {
    const queryString = `?department_id=${departmentId}&role_id=${roleId}&assigned_to_id=${assignedToId}&priority_id=${priorityId}`;
    return this.http.get(`${API_URL}/v1/tracker-roadmaps/${trackedRoadmapId}/tracker-roadmap-tasks` + queryString);
  }
}
