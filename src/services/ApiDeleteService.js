import axios from 'axios';

export async function deleteEntityData(apiResource, authToken) {
  console.log('Vou deletar o ' + apiResource);

  return axios.delete(apiResource, {
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: 'Bearer ' + authToken,
    },
    validateStatus(status) {
      return status < 500;
    },
  });
}
