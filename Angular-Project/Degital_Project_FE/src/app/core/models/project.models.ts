export interface ProjectModel {
  projectId: number;
  projectName: string;
  projectType: string;
  avatarUrl: string;
  shortDescription: string;
  detailedDescription: string;
  architect: string;
  structuralEngineer: string;
  constructionStartTime: Date;
  constructionEndTime: Date;
  postedTime: Date;
  displayOnHome: boolean;
  displayOrderOnHome: number;
  displayOnHeader: boolean;
  displayOrderOnHeader: number;
  expirationTimeOnHeader: Date;
  idPoster: number;
}

export interface ProjectDetail {
  projectName: string;
  avatarUrl: string;
  detailedDescription: string;
}


export interface ProjectCreateOrUpdateModel {
  projectName: string;
  projectType: string;
  avatar: File;
  avatarOld: string;
  shortDescription: string;
  detailedDescription: string;
  architect: string;
  structuralEngineer: string;
  constructionStartTime: Date;
  constructionEndTime: Date;
  displayOnHome: boolean;
  displayOrderOnHome: number;
  displayOnHeader: boolean;
  displayOrderOnHeader: number;
  expirationTimeOnHeader: Date;
  idPoster: number;
}
export interface ReturnProjectData {
  message: string;
  result: boolean;
}

export interface ProjectDisplayedOnHeaderItem {
  projectId: number;
  projectName: string;
  avatarUrl: string;
  shortDescription: string;
  detailedDescription: string;
  displayOrderOnHeader: number;
}

export interface ProjectsDisplayedOnOurProjectItem {
  projectId: number;
  projectName: string;
  avatarUrl: string;
  shortDescription: string;
  detailedDescription: string;
  displayOrderOnHeader: number;
}

// export interface ProjectSummary {
//   projectId: number;
//   projectName: string;
//   avatarUrl: string;
//   shortDescription: string;
//   detailedDescription: string;
//   displayOrderOnHome: number;
// }
export interface ProjectSummary {
  projectId: number;
  projectName: string;
  avatarUrl: string;
  shortDescription: string;
}

export type ProjectsDisplayedOnOurProject = PagedResult<ProjectSummary>;
export interface PagedResult<T> {
  data: T[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
}

// ---------------------------------------------------------

export interface GetListDisplayedOnFooter {}

export interface GetListDisplayedOnContactInfor {}

export interface GalleryDisplayedOnPhotoGallery {}
