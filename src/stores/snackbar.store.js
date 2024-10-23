import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', {
  state: () => {
    return {
      showing: false,
      mensagem: '',
      detalhes: '',
      cor: 'indigo'
    };
  },
  actions: {
    show(mensagem, detalhes) {
      this.showing = true;
      this.mensagem = mensagem;
      this.detalhes = detalhes;
    },

    info(mensagem, detalhes) {
      this.show(mensagem, detalhes);
      this.cor = 'indigo';
    },

    success(mensagem, detalhes) {
      this.show(mensagem, detalhes);
      this.cor = 'green';
    },

    warning(mensagem, detalhes) {
      this.show(mensagem, detalhes);
      this.cor = 'yellow';
    },

    error(mensagem, detalhes) {
      this.show(mensagem, detalhes);
      this.cor = 'red';
    }
  }
});
