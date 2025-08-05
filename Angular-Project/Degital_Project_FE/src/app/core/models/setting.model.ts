export interface Setting {
  id: number;
  key: string;
  value: string;
  settingType: string;
  discription: string;
  displayOnHome: boolean;
  displayOrderOnHome: number;
}
