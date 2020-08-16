export interface IResourceService {
  getUri(resourceName: string): string;
}

export default class ResourceService {

  constructor(private readonly baseUrl: string) { }

  getUri(resourceName: string): string {
    return this.baseUrl + resourceName;
  }

}
