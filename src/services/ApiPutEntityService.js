import axios from "axios";
import ApiUtils from "./ApiUtils.js";

export async function apiPutEntity(apiResource, data) {
  apiResource = ApiUtils.parseApiResourceName(apiResource);

  const params = {
    headers: {
      Authorization: ApiUtils.getAuthorizationBearerToken(),
      "Content-Type": "application/ld+json",
    },
    validateStatus(status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  };

  return axios.put(`${apiResource}`, data, params);
}
