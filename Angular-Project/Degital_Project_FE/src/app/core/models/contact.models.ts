export interface ContactModel {
  requestId: number;
  custommerName: string;
  customerPhoneNumber: string;
  customerEmail: string;
  customerMessage: string;
  requestType: string;
  requestTime: Date;
  status: string;
  note: string;
  respondentId: number;
  responseTime: Date;
  ipAddress: string;
}

export interface ContactCreateModel {
  custommerName: string;
  customerPhoneNumber: string;
  customerEmail: string;
  customerMessage: string;
  requestType: string;
  status: string;
  ipAddress: string;
}
export interface ContactUpdateModel {
  CustommerName: string;
  CustomerPhoneNumber: string;
  CustomerEmail: string;
  CustomerMessage: string;
  RequestType: string;
}

export interface ReturnContactData {
  message: string;
  result: boolean;
}
