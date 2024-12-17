import { defineAsyncComponent } from 'vue';

export async function loadSubComponents(app) {
  const subprojetos = import.meta.env.VITE_SUBPROJETOS.split(',');

  for (const subprojeto of subprojetos) {
    try {
      // Base do caminho de componentes de cada subprojeto
      const basePath = `../${subprojeto}/src/components`;

      // Lista manual dos componentes que você deseja carregar, se souber o nome
      const componentes = [
        'HelloWorld.vue', // Adicione mais componentes conforme necessário
      ];

      for (const componente of componentes) {
        const path = `${basePath}/${componente}`;

        console.log(`Carregando componenteeeee: ${path}`);

        // Importa o componente dinamicamente
        const componentName = componente.replace('.vue', '');
        app.component(
          componentName,
          defineAsyncComponent(() => import(/* @vite-ignore */ path)), // Usa o import dinâmico
        );

        console.log(`Componente ${componentName} do subprojeto ${subprojeto} carregado.`);
      }

      console.log(`Componentes do subprojeto ${subprojeto} carregados com sucesso.`);
    } catch (error) {
      console.error(`Erro ao carregar componentes do subprojeto ${subprojeto}:`, error);
    }
  }
}
