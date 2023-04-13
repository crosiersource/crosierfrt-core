import { apiFetchData } from "./ApiFetchDataService.js";
import { apiFetchTableData } from "./ApiFetchTableDataService.js";
import { apiPostEntity } from "./ApiPostEntityService.js";
import { apiPutEntity } from "./ApiPutEntityService.js";
import { apiDeleteEntity } from "./ApiDeleteEntityService.js";

export default {
  get: apiFetchData,
  getTable: apiFetchTableData,
  post: apiPostEntity,
  put: apiPutEntity,
  delete: apiDeleteEntity,
};
