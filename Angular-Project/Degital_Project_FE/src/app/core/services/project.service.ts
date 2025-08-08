import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PagedResult,
  ProjectCreateOrUpdateModel,
  ProjectDisplayedOnHeaderItem,
  ProjectModel,
  ReturnProjectData,
  ProjectSummary,
  ProjectsDisplayedOnOurProjectItem,
} from '../models/project.models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'https://localhost:7132/api';

  constructor(private http: HttpClient) {}

  // Ví dụ search trả về list phân trang
  getListProject(
    key?: string,
    structuralEngineer?: string,
    postingStartDate?: string,
    postingEndDate?: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResult<ProjectModel>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (key) {
      params = params.set('key', key);
    }
    if (structuralEngineer) {
      params = params.set('structuralEngineer', structuralEngineer);
    }
    if (postingStartDate) {
      params = params.set('postingStartDate', postingStartDate);
    }
    if (postingEndDate) {
      params = params.set('postingEndDate', postingEndDate);
    }

    return this.http.get<PagedResult<ProjectModel>>(
      `${this.baseUrl}/ProjectManagement/SearchByKey`,
      { params }
    );
  }

  getProjectById(id: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `${this.baseUrl}/ProjectManagement/${id}`
    );
  }

  createNewProject(
    request: ProjectCreateOrUpdateModel | FormData
  ): Observable<ReturnProjectData> {
    return this.http.post<ReturnProjectData>(
      `${this.baseUrl}/ProjectManagement`,
      request
    );
  }

  updateProject(
    request: ProjectCreateOrUpdateModel | FormData,
    projectId: number
  ): Observable<ReturnProjectData> {
    return this.http.put<ReturnProjectData>(
      `${this.baseUrl}/ProjectManagement/${projectId}`,
      request
    );
  }

  deleteProject(projectId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/ProjectManagement/${projectId}`,
      { responseType: 'text' as 'json' }
    );
  }

  getProjectsDisplayedOnHeader(
    pageNumber = 1,
    pageSize = 5
  ): Observable<PagedResult<ProjectDisplayedOnHeaderItem>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResult<ProjectDisplayedOnHeaderItem>>(
      `${this.baseUrl}/Project/ProjectsDisplayedOnHeader`,
      { params }
    );
  }

  getProjectsDisplayedOnHomePage(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectSummary[]>(
      `${this.baseUrl}/Project/ProjectsDisplayedOnHomePage`
    );
  }

  getProjectsDisplayedOnOurProject(
    pageNumber = 1,
    pageSize = 3
  ): Observable<PagedResult<ProjectsDisplayedOnOurProjectItem>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResult<ProjectsDisplayedOnOurProjectItem>>(
      `${this.baseUrl}/Project/ProjectsDisplayedOnOurProject`,
      { params }
    );
  }



  // getProjectsDisplayedOnProjectDetail(projectId: number): Observable<ProjectModel> {
  //   return this.http.get<ProjectModel>(
  //     `${this.baseUrl}/Project/ProjectsDisplayedOnProjectDetail/${projectId}`
  //   );
  // }
  getProjectsDisplayedOnProjectDetail(id: number): Observable<any> {
  // return this.http.get(`/api/Project/ProjectsDisplayedOnProjectDetail/${id}`);
  return  this.http.get(`${this.baseUrl}/Project/ProjectsDisplayedOnProjectDetail/${id}`)
}

}
