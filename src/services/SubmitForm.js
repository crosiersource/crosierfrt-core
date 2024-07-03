import api from "./api";
import { validateFormData } from "./ValidateFormData";
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
  $toast = null,
  commitFormDataAfterSave = true,
  msgSucesso = "Registro salvo com sucesso",
  msgErro = "Ocorreu um erro ao salvar",
}) {
  console.log("vou para " + apiResource);

  if (!formData) {
    formData = $store.fields;
  }

  console.log(formData);

  if (!formData) {
    console.error(`$store.state[${formDataStateName}] n/d`);
    return false;
  }

  if (
    schemaValidator &&
    !validateFormData({ $store, formDataStateName, schemaValidator, $toast })
  ) {
    return false;
  }

  let response;

  if (fnBeforeSave) {
    await fnBeforeSave(formData);
  }

  if (formData?.id) {
    console.log("vou para put");
    try {
      response = await api.save(
        apiResource + "/" + formData.id,
        JSON.stringify(formData),
        authToken
      );
    } catch (e) {
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao efetuar a requisição PUT",
          life: 5000,
        });
      }
      console.error("Erro ao efetuar a requisição PUT");
      console.error(e);
      return false;
    }
  } else {
    try {
      response = await api.save(apiResource, JSON.stringify(formData), authToken);
    } catch (e) {
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao efetuar a requisição POST",
          life: 5000,
        });
      }
      console.error("Erro ao efetuar a requisição POST");
      console.error(e);
    }
  }

  if (response?.status && [200, 201].includes(response.status)) {
    formData = response.data;
    if (fnAfterGet) {
      formData = fnAfterGet(formData);
    }

    if (setUrlId) {
      window.history.pushState("form", "id", `?id=${formData.id}`);
    }
    if ($toast && msgSucesso) {
      $toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: msgSucesso,
        life: 5000,
      });
    }
    if (commitFormDataAfterSave) {
      $store.fields = formData;
    }
    return response;
  }
  // else...

  const errMsg = response.data["hydra:description"] || msgErro;

  console.error(errMsg);

  if ($toast) {
    $toast.add({
      severity: "error",
      summary: "Erro",
      detail: errMsg,
      life: 5000,
    });
  }
  return false;
}
