export default class ResourceService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUri(resourceName) {
    return this.baseUrl + resourceName;
  }
}