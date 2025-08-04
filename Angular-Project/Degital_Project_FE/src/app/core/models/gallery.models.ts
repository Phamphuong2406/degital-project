export interface GalleryModel {
  galleryId: number;
  imageUrl: string;
  galleryName: string;
  address: string;
  createAt: Date;
  posterId: number;
}
export interface GalleryCreateOrUpdateModel {
  image: File;
  galleryName: string;
  address: string;
  createAt: Date;
}
export interface ReturnGalleryData {
  message: string;
  result: boolean;
}
