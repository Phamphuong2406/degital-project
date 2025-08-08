import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/project.models';
import {
  GalleryCreateOrUpdateModel,
  GalleryModel,
  ReturnGalleryData,
} from '../models/gallery.models';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private baseUrl = 'https://localhost:7132/api';
  constructor(private http: HttpClient) {}

  getListGallery(
    address?: string,
    postingStartDate?: string,
    postingEndDate?: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResult<GalleryModel>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (address) {
      params = params.set('address', address);
    }
    if (postingStartDate) {
      params = params.set('postingStartDate', postingStartDate);
    }
    if (postingEndDate) {
      params = params.set('postingEndDate', postingEndDate);
    }

    return this.http.get<PagedResult<GalleryModel>>(
      `${this.baseUrl}/GalleryManagement/SearchByKey`,
      { params }
    );
  }

  getGalleryId(id: number): Observable<GalleryModel> {
    return this.http.get<GalleryModel>(
      `${this.baseUrl}/GalleryManagement/${id}`
    );
  }

  createNewGallery(
    request: GalleryCreateOrUpdateModel | FormData
  ): Observable<ReturnGalleryData> {
    return this.http.post<ReturnGalleryData>(
      `${this.baseUrl}/GalleryManagement`,
      request
    );
  }

  updateGallery(
    request: GalleryCreateOrUpdateModel | FormData,
    galleryId: number
  ): Observable<ReturnGalleryData> {
    return this.http.put<ReturnGalleryData>(
      `${this.baseUrl}/GalleryManagement/${galleryId}`,
      request
    );
  }

  deleteGallery(galleryId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/GalleryManagement/${galleryId}`,
      { responseType: 'text' as 'json' }
    );
  }

  getAllGallery(): Observable<GalleryModel[]> {
  return this.http.get<GalleryModel[]>(`${this.baseUrl}/GalleryManagement`);
}

}
