import api from './api';
import { validateFormData } from './ValidateFormData';

// import { api, validateFormData } from "crosier-vue";

export async function submitForm({
  apiResource,
  authToken,
  formData = null,
  $store = null,
  formDataStateName = null,
  schemaValidator = null,
  setUrlId = true,
  fnBeforeSave = null,
  fnAfterGet = null,
  commitFormDataAfterSave = true,
}) {
  console.log('vou para ' + apiResource);

  if (!formData) {
    formData = $store.fields;
  }

  console.log(formData);

  if (!formData) {
    console.error(`$store.state[${formDataStateName}] n/d`);
    return false;
  }

  if (schemaValidator) {
    validateFormData({ $store, schemaValidator });
  }

  let response;

  if (fnBeforeSave) {
    await fnBeforeSave(formData);
  }

  response = await api.save(apiResource, formData, authToken);

  if (response?.status && [200, 201].includes(response.status)) {
    formData = response.data;
    if (fnAfterGet) {
      formData = fnAfterGet(formData);
    }

    if (setUrlId) {
      window.history.pushState('form', 'id', `/${formData.id}`);
    }

    if (commitFormDataAfterSave) {
      $store.fields = formData;
    }
    return response;
  }
  // else...

  const errMsg = response.data['hydra:description'] || msgErro;

  console.error(errMsg);

  return false;
}
