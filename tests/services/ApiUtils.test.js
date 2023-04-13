import ApiUtils from "@/src/services/ApiUtils";

test("deve retornar objeto vazio quando não há parâmetros", () => {
  // Arrange
  const queryParams = [];

  // Act
  const result = ApiUtils.genPropertiesQueryString(queryParams);

  // Assert
  expect(result).toEqual("");
});

test("deve fazer o parsing correto dos parâmetros da URL", () => {
  // Arrange
  const queryParams = [
    "campo1",
    "campo2",
    "campo3",
    "campo4.subCampo4",
    "campo5.subCampo5.subSubCampo5",
  ];

  // Act
  const result = ApiUtils.genPropertiesQueryString(queryParams);

  // Assert
  expect(result).toEqual(
    "&properties[]=campo1&properties[]=campo2&properties[]=campo3&properties[campo4][]=subCampo4&properties[campo5][subCampo5][]=subSubCampo5"
  );
});

test("apiResource não pode conter a última barra", () => {
  // Arrange
  const apiResource = "/api/nomeDoRecurso/";

  // Act
  const result = ApiUtils.parseApiResourceName(apiResource);

  // Assert
  expect(result).toEqual("/api/nomeDoRecurso");
});

test("testando a construção de queryString com os filters", () => {
  // Arrange
  const filters = {
    campo1: "valorDoCampo1",
    campo2: "valorDoCampo2",
    campo3: {
      from: "campo3Inicio",
      to: "campo3Fim",
    },
  };

  // Act
  const result = ApiUtils.buildFiltersQueryString(filters);

  // Assert
  expect(result).toEqual(
    "&campo1=valorDoCampo1&campo2=valorDoCampo2&campo3[from]=campo3Inicio&campo3[to]=campo3Fim"
  );
});
