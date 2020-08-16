export interface IHeroSection {
  Title: string;
  Copy: string;
  Image: IImage;
  ImageOpacity: number;
  Logo: IImage;
}

export interface IImage {
  url: string;
}

export interface ISection {
  id: string;
  Order: number;
  Header: string;
  Copy: string;
  Gallery: IImage[];
}

export interface IContactDetails {
  CompanyName: string;
  Email: string;
  Phone: string;
  EnquirySubmittedMessage: string;
}

export interface IEnquiry {
  Name: string;
  Email: string;
  Phone?: string;
  Enquiry: string;
}
