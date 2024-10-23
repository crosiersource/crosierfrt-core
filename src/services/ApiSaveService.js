import axios from 'axios';

export async function saveEntityData(apiResource, data, authToken) {
  if (apiResource) {
    do {
      if (!apiResource || apiResource.slice(-1).match(/[a-z0-9]/i)) {
        break;
      }
      console.debug(`apiResource com formato inválido: ${apiResource}`);
      apiResource = apiResource.substring(0, apiResource.length - 1);
    } while (true);
  }

  const params = {
    headers: {
      'Content-Type': 'application/ld+json',
    },
    // validateStatus(status) {
    //   return status < 500; // Resolve only if the status code is less than 500
    // },
  };

  params.headers['Authorization'] = 'Bearer ' + authToken;
  console.log('data aqui');
  console.log(data);
  if (data?.id) {
    console.log('putttttting');
    return axios.put(`${apiResource}/${data.id}`, JSON.stringify(data), params);
  } else {
    console.log('postttttting');
    return axios.post(`${apiResource}`, JSON.stringify(data), params);
  }
}
