import { fetchTableData } from "./ApiDataFetchService";
import { saveEntityData } from "./ApiSaveService";
import { deleteEntityData } from "./ApiDeleteService";

export default {
  get: fetchTableData,
  save: saveEntityData,
  delete: deleteEntityData,
};
