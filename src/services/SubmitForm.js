import api from './api';
import { validateFormData } from './ValidateFormData';
import { useAuthStore } from '@/stores/auth.store';

// import { api, validateFormData } from "crosier-vue";

export async function submitForm({
  apiResource,
  formData = null,
  $store = null,
  formDataStateName = null,
  schemaValidator = null,
  setUrlId = true,
  fnBeforeSave = null,
  fnAfterGet = null,
  $toast = null,
  commitFormDataAfterSave = true,
}) {
  console.log('vou para ' + apiResource);

  console.log('authToken:');
  const authStore = useAuthStore();
  console.log('authStore.token', authStore.token);

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

  if (fnBeforeSave) {
    await fnBeforeSave(formData);
  }

  console.log('import.meta.env.VITE_CROSIER_API:', import.meta.env.VITE_CROSIER_API);

  const response = await api.save(
    import.meta.env.VITE_CROSIER_API + apiResource,
    formData,
    authStore.token,
  );

  console.log('response', response);

  if (response?.status && [200, 201].includes(response.status)) {
    formData = response.data;
    if (fnAfterGet) {
      formData = fnAfterGet(formData);
    }

    if (setUrlId) {
      const url = new URL(window.location.href);
      url.searchParams.set('id', response.data.id);
      window.history.pushState({}, '', url);
    }

    if (commitFormDataAfterSave) {
      $store.fields = formData;
    }

    $toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'O registro foi salvo com sucesso!',
      life: 5000,
    });

    return response;
  }
  // else...

  const errMsg = response.data['hydra:description'] || msgErro;

  console.error(errMsg);

  return false;
}
