import axios from "axios";
import ApiUtils from "./ApiUtils";

export async function apiFetchData(apiResource, params = null) {
  apiResource = ApiUtils.parseApiResourceName(apiResource);

  const queryString = ApiUtils.buildFiltersQueryString(params, true);

  return axios.get(`${apiResource}${queryString}`, {
    headers: {
      Authorization: ApiUtils.getAuthorizationBearerToken(),
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
