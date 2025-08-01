import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ProjectCreateOrUpdateModel,
  ProjectModel,
  ReturnProjectData,
} from '../models/project.models';

@Injectable({
  providedIn: 'root',
})
export class projectService {
  constructor(private http: HttpClient) {}

  getListProject(
    key: string,
    structuralEngineer: string,
    postingStartDate: string,
    postingEndDate: string,
    pageNumber: number,
    pageSize: number
  ): Observable<ProjectModel> {
    const params = new HttpParams()
      .set('key', key)
      .set('structuralEngineer', structuralEngineer)
      .set('postingStartDate', postingStartDate.toString())
      .set('postingEndDate', postingEndDate.toString())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ProjectModel>(
      `https://localhost:7132/api/ProjectManagement/SearchByKey`,
      {
        params,
      }
    );
  }
  getProjectById(id: any): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `https://localhost:7132/api/ProjectManagement/${id}`
    );
  }

  createNewProject(
    request: ProjectCreateOrUpdateModel | FormData
  ): Observable<ReturnProjectData> {
    return this.http.post<ReturnProjectData>(
      `https://localhost:7132/api/ProjectManagement`,
      request
    );
  }
  updateProject(
    request: ProjectCreateOrUpdateModel | FormData,
    projectId: any
  ): Observable<ReturnProjectData> {
    return this.http.put<ReturnProjectData>(
      `https://localhost:7132/api/ProjectManagement/${projectId}`,
      request
    );
  }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(
      `https://localhost:7132/api/ProjectManagement/${projectId}`,
      { responseType: 'text' as 'json' }
    );
  }
}
