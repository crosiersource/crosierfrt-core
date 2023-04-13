export default class ApiUtils {
  static genPropertiesQueryString(properties) {
    let sQueryString = "";
    if (properties) {
      sQueryString = "&";
      Object.values(properties).forEach((property) => {
        if (property.includes(".")) {
          let sMult = "properties[";
          const campos = property.split(".");
          for (let i = 0; i <= campos.length - 2; i++) {
            sMult += `${campos[i]}][`;
          }
          sMult += `]=${campos[campos.length - 1]}`;
          sQueryString += `${sMult}&`;
        } else {
          sQueryString += `properties[]=${property}&`;
        }
      });
      sQueryString = sQueryString.substring(0, sQueryString.length - 1);
    }
    return sQueryString;
  }

  static parseApiResourceName(apiResource) {
    if (!apiResource || apiResource.trim() === "") {
      throw new Error("apiResource não pode ser nula ou vazia");
    }

    do {
      if (!apiResource || apiResource.slice(-1).match(/[a-z0-9]/i)) {
        break;
      }
      console.debug(`apiResource com formato inválido: ${apiResource}`);
      const newApiResource = apiResource.substring(0, apiResource.length - 1);
      if (newApiResource === apiResource) {
        console.debug(`apiResource não pode ser mais alterada: ${apiResource}`);
        break;
      }
      apiResource = newApiResource;
      // eslint-disable-next-line no-constant-condition
    } while (true);
    return apiResource;
  }

  static getAuthorizationBearerToken() {
    const token = localStorage.getItem("crsrTkn").replace(/"/g, "");
    return token ? `Bearer ${token}` : "";
  }

  static buildRequestHeaders() {
    return {
      headers: {
        Authorization: ApiUtils.getAuthorizationBearerToken(),
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }

  static recursiveIterate(item, nivel = 0, auxs = { prefixos: {}, qs: "" }) {
    try {
      if (typeof item === "object" && !Array.isArray(item) && item !== null) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(item)) {
          auxs.prefixos[nivel] = key;
          ApiUtils.recursiveIterate(value, nivel + 1, auxs);
        }
      } else if (item || typeof item === "boolean") {
        for (let i = 0; i < nivel; i++) {
          auxs.qs += i === 0 ? auxs.prefixos[0] : `[${auxs.prefixos[i]}]`;
        }
        auxs.qs += `=${item}&`;
      }
      return nivel === 0 ? `&${auxs.qs}`.slice(0, -1) : auxs.qs;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static buildFiltersQueryString(filters, starting = false) {
    let queryFilter = "";
    // eslint-disable-next-line no-restricted-syntax
    if (filters) {
      if (filters instanceof Array) {
        filters.forEach((e) => {
          const entries = Object.entries(e);
          queryFilter = `${queryFilter}&${entries[0][0]}=${entries[0][1]}`;
        });
      } else if (filters) {
        queryFilter = ApiUtils.recursiveIterate(filters);
      }
    }
    if (starting) {
      queryFilter = `?${queryFilter.slice(1)}`;
    }
    return queryFilter;
  }
}
