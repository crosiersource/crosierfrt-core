export function validateFormData({
  $store,
  storePrefix,
  formDataStateName,
  schemaValidator,
  $toast = null,
}) {
  console.log("aqui o store state é");
  console.log($store.state);
  const formData = $store.state[storePrefix][formDataStateName];

  const commitFormErrors = `${storePrefix}/set${formDataStateName
    .charAt(0)
    .toUpperCase()}${formDataStateName.slice(1)}Errors`;

  try {
    $store.commit(commitFormErrors, {});
    schemaValidator.validateSync(formData, { abortEarly: false });
  } catch (err) {
    console.error(err);
    if (err?.inner) {
      console.error(err.inner);
      const formErrors = {};

      err.inner?.forEach((element) => {
        if (element?.path) {
          const msg = element.message || "Valor inválido";
          formErrors[element.path] = msg;
          console.error(msg);
          if ($toast) {
            $toast.add({
              severity: "error",
              summary: "Erro",
              detail: msg,
              life: 5000,
            });
          }
        }
      });

      $store.commit(commitFormErrors, formErrors);
    } else {
      const msgGl = err?.inner || "Erro ao validar dados";
      console.error(msgGl);
      if ($toast) {
        $toast.add({
          severity: "error",
          summary: "Erro",
          detail: msgGl,
          life: 5000,
        });
      }
    }
    return false;
  }
  return true;
}

export default {
  validateFormData,
};
