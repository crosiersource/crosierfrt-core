import axios from "axios";
import router from "@/router/router.js";
import ApiUtils from "./ApiUtils.js";
import { useAuthStore } from '@/stores/auth';

export async function apiPostEntity(apiResource, data) {
  apiResource = ApiUtils.parseApiResourceName(apiResource);

  const params = {
    headers: {
      Authorization: ApiUtils.getAuthorizationBearerToken(),
      "Content-Type": "application/ld+json",
    },
    // validateStatus(status) {
    //   return status < 500;
    // },
  };

  try {
    console.log("vou fazer o post");
    const rs = await axios.post(`${apiResource}`, data, params);
    console.log("passou");
    console.log(rs);
    return rs;
  } catch (e) {
    console.log("erro no post");
    console.log(e);
    if (e.response.data.msg === "not logged" || e.response.data.message === "Expired JWT Token") {
      console.log("não tá logado vai logar zé");
      // call auth module login failure
      await useAuthStore().loginFailure( {
        message: "Por favor, efetue o login para continuar!",
      });
      console.log("commitei o loginFailure");
      await router.push({ name: "login" });
    }
    console.error("erro");
    console.error(e);
  }
}
