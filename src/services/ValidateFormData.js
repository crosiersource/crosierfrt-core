export function validateFormData({ $store, schemaValidator }) {
  const formData = $store.fields;

  console.log('store é');
  console.log($store);

  try {
    $store.fieldsErrors = {};
    schemaValidator.validateSync(formData, { abortEarly: false });
  } catch (err) {
    console.log('Erro ao validar!');
    console.error(err);
    if (err?.inner) {
      console.error(err.inner);
      const formErrors = {};

      err.inner?.forEach((element) => {
        if (element?.path) {
          const msg = element.message || 'Valor inválido';
          formErrors[element.path] = msg;
          console.error(msg);
        }
      });

      $store.fieldsErrors = formErrors;
      console.log('Erros de validação:');
      console.log(formErrors);
      throw new Error('Erros de validação');
    } else {
      const msgGl = err?.inner || 'Erro ao validar dados';
      console.error(msgGl);
    }
    return false;
  }
  return true;
}

export default {
  validateFormData
};
