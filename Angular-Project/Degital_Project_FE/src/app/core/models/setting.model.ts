// export interface SettingModel {
//   id: number;
//   key: string;
//   value: string;
//   settingType: string;
//   discription: string;
//   displayOnHome: boolean;
//   displayOrderOnHome: number;
// }

export interface Setting {
  id: number;
  key: string;
  value: string;
  settingType: string;
  discription: string;
  displayOnHome: boolean;
  displayOrderOnHome: number;
}

export interface SettingCreateOrUpdateModel {
  key: string;
  value: string;
  settingType: string;
  discription: string;
  displayOnHome: boolean;
  displayOrderOnHome: number;
}
export interface ReturnSettingData {
  message: string;
  result: boolean;
}
