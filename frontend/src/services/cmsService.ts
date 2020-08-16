import { AxiosInstance, AxiosResponse } from 'axios';
import {
  IHeroSection,
  ISection,
  IContactDetails,
  IEnquiry,
} from 'models/Sections';

export interface ICmsService {
  getHeroSection(): Promise<IHeroSection>;
  getSections(): Promise<ISection[]>;
  getContactDetails(): Promise<IContactDetails>;
  submitEnquiry(enquiry: IEnquiry): Promise<void>;
}

export class CmsService implements ICmsService {

  constructor(private readonly httpService: AxiosInstance) { }

  async getHeroSection(): Promise<IHeroSection> {
    const res = await this.httpService.get('/hero-section');

    return res.data;
  }

  async getSections(): Promise<ISection[]> {
    const res: AxiosResponse<ISection[]> = await this.httpService.get('/site-sections');

    const { data } = res;
    data.sort((a, b) => a.Order - b.Order);

    return data;
  }

  async getContactDetails(): Promise<IContactDetails> {
    const res = await this.httpService.get('/contact-details');

    return res.data;
  }

  async submitEnquiry(enquiry: IEnquiry): Promise<void> {
    await this.httpService.post('/enquiries', enquiry);
  }

}
