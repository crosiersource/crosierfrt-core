import axios from "axios";
import ApiUtils from "./ApiUtils";
import router from "../router/router.js";
import store from "../store/index.js";

export async function apiFetchData(apiResource, params = null) {
  apiResource = ApiUtils.parseApiResourceName(apiResource);

  const queryString = ApiUtils.buildFiltersQueryString(params, true);

  try {
    console.log("returning axios.get");
    const rs = await axios.get(`${apiResource}${queryString}`, {
      headers: {
        Authorization: ApiUtils.getAuthorizationBearerToken(),
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    console.log("passou");
    console.log(rs);
    return rs;
  } catch (e) {
    console.log("erro no apiFetchData");
    console.log(e);
    if (e.response.data.msg === "not logged" || e.response.data.message === "Expired JWT Token") {
      console.log("não tá logado vai logar zé");
      // call auth module login failure
      await store.commit("auth/loginFailure", {
        message: "Por favor, efetue o login para continuar!",
      });
      console.log("commitei o loginFailure");
      await router.push({ name: "login" });
    }
    console.error("erro");
    console.error(e);
  }
}
