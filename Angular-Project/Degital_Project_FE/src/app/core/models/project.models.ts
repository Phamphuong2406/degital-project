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
  displayOnhome: boolean;
  displayOrderOnHome: number;
  displayOnHeader: boolean;
  displayOrderOnHeader: number;
  expirationTimeOnHeader: Date;
  idPoster: number;
}

export interface ProjectCreateOrUpdateModel{
  projectName: string;
  projectType: string;
  avataUrl: File;
  shortDescription: string;
  detailedDescription: string;
  architect: string;
  structuralEngineer: string;
  constructionStartTime: Date;
  constructionEndTime: Date;
  postedTime: Date;
  displayOnhome: boolean;
  displayOrderOnHome: number;
  displayOnHeader: boolean;
  displayOrderOnHeader: number;
  expirationTimeOnHeader: Date
}
