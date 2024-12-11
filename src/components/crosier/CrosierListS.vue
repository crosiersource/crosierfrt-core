<template>
  <ConfirmDialog group="confirmDialog_crosierListS" />
  <Toast group="toast_crosierListS" class="mb-5" />

  <Drawer
    v-if="comFiltragem && filtrosNaSidebar"
    v-model:visible="visibleRight"
    class="!w-full md:!w-80 lg:!w-[30rem]"
    position="right"
  >
    <div class="card">
      <div class="card-body">
        <div class="h5 card-title"><i class="fas fa-search" /> Filtros</div>
        <form @submit.prevent="doFilter()">
          <slot name="filter-fields" />
          <div class="row mt-3">
            <div class="col-12">
              <InlineMessage severity="info">
                <small>
                  {{ totalRecords }} registro(s) encontrado(s)
                  <span v-show="isFiltering">(com filtros aplicados)</span>.
                </small>
              </InlineMessage>
            </div>
          </div>

          <div class="form-row mt-2">
            <div class="col-6">
              <button type="submit" class="btn btn-primary btn-sm btn-block">
                <i class="fas fa-search" /> Filtrar
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-sm btn-secondary btn-block"
                @click="doClearFilters()"
              >
                <i class="fas fa-backspace" /> Limpar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Drawer>

  <div v-if="!withoutCard" :class="containerClass">
    <div class="card" style="margin-bottom: 50px">
      <div class="card-header">
        <div class="d-flex flex-wrap align-items-center">
          <div class="mr-1">
            <div class="h3">{{ titulo }}</div>
            <div v-if="subtitulo" class="h6">{{ subtitulo }}</div>
          </div>
          <div class="d-sm-flex flex-nowrap ml-auto">
            <a
              v-if="formUrl"
              type="button"
              class="btn btn-outline-info"
              :href="formUrl"
              title="Novo"
            >
              <i class="fas fa-file" aria-hidden="true" />
            </a>

            <button
              v-if="comFiltragem"
              type="button"
              :class="'btn btn-' + (!isFiltering ? 'outline-' : '') + 'warning ml-1'"
              @click="toggleFiltros"
            >
              <i class="fas fa-search" />
            </button>

            <button
              v-if="comFiltragem"
              type="button"
              class="btn btn-outline-secondary ml-1"
              title="Limpar filtros"
              @click="doClearFilters()"
            >
              <i class="fas fa-backspace" />
            </button>

            <slot name="headerButtons" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="comFiltragem && !filtrosNaSidebar">
          <Accordion :activeIndex="accordionActiveIndex">
            <AccordionTab>
              <template #header>
                <span>Filtros</span>
                <i class="pi pi-filter" />
              </template>
              <form class="notSubmit" @submit.prevent="doFilter()">
                <slot name="filter-fields" />
                <div class="row mt-3">
                  <div class="col-8">
                    <InlineMessage severity="info">
                      <small>
                        {{ totalRecords }} registro(s) encontrado(s)
                        <span v-show="isFiltering">(com filtros aplicados)</span>.
                      </small>
                    </InlineMessage>
                  </div>
                  <div class="col-4 text-right">
                    <button type="submit" class="btn btn-primary btn-sm">
                      <i class="fas fa-search" /> Filtrar
                    </button>

                    <button
                      type="button"
                      class="btn btn-sm btn-secondary ml-1"
                      @click="doClearFilters()"
                    >
                      <i class="fas fa-backspace" /> Limpar
                    </button>
                  </div>
                </div>
              </form>
            </AccordionTab>
          </Accordion>
        </div>

        <DataTable
          ref="dt"
          :stateStorage="stateStorage"
          class="p-datatable-sm p-datatable-striped"
          :stateKey="dataTableStateKey"
          :value="tableData"
          :totalRecords="totalRecords"
          :lazy="true"
          :paginator="comPaginador"
          :rows="rows"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 100, 200, 500]"
          currentPageReportTemplate="{first}-{last} de {totalRecords}"
          :selection="selection"
          :selectionMode="selectionMode"
          :metaKeySelection="metaKeySelection"
          dataKey="id"
          :resizableColumns="true"
          columnResizeMode="fit"
          :first="firstRecordIndex"
          :rowHover="true"
          :multiSortMeta="multiSortMeta"
          :removableSort="removableSort"
          :sortMode="sortMode"
          :rowGroupMode="rowGroupMode"
          :groupRowsBy="groupRowsBy"
          :sortField="sortField"
          :sortOrder="sortOrder"
          :responsiveLayout="responsiveLayout"
          :showGridlines="showGridlines"
          @page="doFilter($event)"
          @sort="doFilter($event)"
          @update:selection="onUpdateSelection($event)"
          @row-select="onRowSelect"
          @row-unselect="onRowUnselect"
        >
          <template #groupheader="groupheader">
            <slot name="groupheader" :groupheader="groupheader" />
          </template>

          <template #footer>
            <div v-if="comExportCSV" style="text-align: right">
              <button
                type="button"
                class="btn btn-sm btn-outline-info"
                title="Exportar para CSV"
                @click="exportCSV($event)"
              >
                <i class="fas fa-file-csv" />
              </button>
            </div>
            <slot name="footer" />
          </template>

          <Column v-if="selecao" field="id" :sortable="true">
            <template #header>
              <Checkbox
                v-model="tudoSelecionado"
                :binary="true"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                @change="tudoSelecionadoClick()"
              />&nbsp; Id
            </template>
            <template #body="r">
              {{ ('0'.repeat(zerofillId) + r.data.id).slice(-zerofillId) }}
            </template>
          </Column>
          <slot name="columns" />
        </DataTable>

        <div v-if="exibirBtnLimparConfiguracoesDaTabela" class="d-flex justify-content-end">
          <button
            id="btnLimparConfiguracoesDaTabela01"
            type="button"
            class="btn btn-outline-info btn-sm ml-1 mt-3"
            title="Limpar configurações da tabela"
            @click="limparConfiguracoesDaTabela"
          >
            <i class="fas fa-sync-alt" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div v-if="comFiltragem && !filtrosNaSidebar">
      <Accordion :activeIndex="accordionActiveIndex">
        <AccordionTab>
          <template #header>
            <span>Filtros</span>
            <i class="pi pi-filter" />
          </template>
          <form class="notSubmit" @submit.prevent="doFilter()">
            <slot name="filter-fields" />
            <div class="row mt-3">
              <div class="col-8">
                <InlineMessage severity="info">
                  <small>
                    {{ totalRecords }} registro(s) encontrado(s)
                    <span v-show="isFiltering">(com filtros aplicados)</span>.
                  </small>
                </InlineMessage>
              </div>
              <div class="col-4 text-right">
                <button type="submit" class="btn btn-primary btn-sm">
                  <i class="fas fa-search" /> Filtrar
                </button>

                <button
                  type="button"
                  class="btn btn-sm btn-secondary ml-1"
                  @click="doClearFilters()"
                >
                  <i class="fas fa-backspace" /> Limpar
                </button>
              </div>
            </div>
          </form>
        </AccordionTab>
      </Accordion>
    </div>

    <DataTable
      ref="dt"
      :stateStorage="stateStorage"
      class="p-datatable-sm p-datatable-striped"
      :stateKey="dataTableStateKey"
      :value="tableData"
      :totalRecords="totalRecords"
      :lazy="true"
      :paginator="comPaginador"
      :rows="rows"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink
           LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25, 50, 100, 200, 500]"
      currentPageReportTemplate="{first}-{last} de {totalRecords}"
      :selection="selection"
      :selectionMode="selectionMode"
      :metaKeySelection="metaKeySelection"
      dataKey="id"
      :resizableColumns="true"
      columnResizeMode="fit"
      :first="firstRecordIndex"
      :rowHover="true"
      :multiSortMeta="multiSortMeta"
      :removableSort="removableSort"
      :sortMode="sortMode"
      :rowGroupMode="rowGroupMode"
      :groupRowsBy="groupRowsBy"
      :sortField="sortField"
      :sortOrder="sortOrder"
      :responsiveLayout="responsiveLayout"
      :showGridlines="showGridlines"
      @page="doFilter($event)"
      @sort="doFilter($event)"
      @update:selection="onUpdateSelection($event)"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
    >
      <template #groupheader="groupheader">
        <slot name="groupheader" :groupheader="groupheader" />
      </template>

      <template #footer>
        <div v-if="comExportCSV" style="text-align: right">
          <button
            type="button"
            class="btn btn-sm btn-outline-info"
            title="Exportar para CSV"
            @click="exportCSV($event)"
          >
            <i class="fas fa-file-csv" />
          </button>
        </div>
        <slot name="footer" />
      </template>

      <Column v-if="ativarSelecao" field="id" :sortable="true">
        <template #header>
          <Checkbox
            v-model="tudoSelecionado"
            :binary="true"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            @change="tudoSelecionadoClick()"
          />&nbsp; Id
        </template>
        <template #body="r">
          {{ ('0'.repeat(zerofillId) + r.data.id).slice(-zerofillId) }}
        </template>
      </Column>

      <slot name="columns" />
    </DataTable>

    <div v-if="exibirBtnLimparConfiguracoesDaTabela" class="d-flex justify-content-end">
      <button
        id="btnLimparConfiguracoesDaTabela02"
        type="button"
        class="btn btn-outline-info btn-sm ml-1 mt-3"
        title="Limpar configurações da tabela"
        @click="limparConfiguracoesDaTabela"
      >
        <i class="fas fa-sync-alt" />
      </button>
    </div>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ConfirmDialog from 'primevue/confirmdialog';
import InlineMessage from 'primevue/inlinemessage';
import Drawer from 'primevue/drawer';
// import { api, CrosierBlock } from "crosier-vue";
import api from '@/services/api';
import { useLoadingStore } from '@/stores/loading.store.js';
import { useAuthStore } from '@/stores/auth.store.js';

export default {
  name: 'CrosierListS',

  components: {
    Accordion,
    AccordionTab,
    Checkbox,
    ConfirmDialog,
    DataTable,
    Column,
    InlineMessage,
    Toast,
    Drawer,
  },

  props: {
    store: {
      type: Object,
      required: true,
    },
    filtersStoreName: {
      type: String,
      default: 'filters',
    },
    withoutCard: {
      type: Boolean,
      default: false,
    },
    titulo: {
      type: String,
      required: true,
    },
    subtitulo: {
      type: String,
      default: '',
    },
    formUrl: {
      type: String,
      required: false,
      default: 'form',
    },
    apiResource: {
      type: String,
      required: true,
    },
    containerClass: {
      type: String,
      default: 'container-fluid',
    },
    comFiltragem: {
      type: Boolean,
      default: true,
    },
    comPaginador: {
      type: Boolean,
      default: true,
    },
    comExportCSV: {
      type: Boolean,
      default: false,
    },
    sempreMostrarFiltros: {
      type: Boolean,
      default: false,
    },
    defaultOrder: {
      type: Array,
      default: null,
    },
    selection: {
      type: [Array, Object],
      default: null,
    },
    ativarSelecao: {
      type: Boolean,
      default: false,
    },
    preselecao: {
      // se for preselecao, então a seleção será fornecida
      type: Boolean,
      default: false,
    },
    selectionMode: {
      type: String,
      default: 'multiple',
    },
    metaKeySelection: {
      type: Boolean,
      default: false,
    },
    filtrosNaSidebar: {
      type: Boolean,
      default: false,
    },
    dtStateName: {
      type: String,
      default: null,
    },
    stateStorage: {
      type: String,
      default: 'local',
    },
    properties: {
      type: Array,
      default: null,
    },
    zerofillId: {
      type: Number,
      default: 0,
    },
    rows: {
      type: Number,
      default: 10,
    },
    filterOnLoad: {
      type: Boolean,
      default: true,
    },
    removableSort: {
      type: Boolean,
      default: true,
    },
    sortMode: {
      type: String,
      default: 'multiple', // single ou multiple
    },
    rowGroupMode: {
      type: String,
      default: '',
    },
    groupRowsBy: {
      type: String,
      default: '',
    },
    sortField: {
      type: String,
      default: 'updated',
    },
    sortOrder: {
      type: Number,
      default: -1,
    },
    responsiveLayout: {
      type: String,
      default: 'scroll',
    },
    showGridlines: {
      type: Boolean,
      default: false,
    },
    staticFilters: {
      type: Object,
      default: null,
    },
    exibirBtnLimparConfiguracoesDaTabela: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'beforeFilter',
    'afterFilter',
    'row-select',
    'row-unselect',
    'update:selection',
    'tudoSelecionadoClick',
  ],

  data() {
    return {
      savedFilter: {},
      totalRecords: 0,
      tableData: null,
      firstRecordIndex: 0,
      multiSortMeta: [],
      accordionActiveIndex: null,
      tudoSelecionado: false,
      visibleRight: false,
      loadingStore: useLoadingStore(),
      authStore: useAuthStore(),
    };
  },

  computed: {
    filters() {
      let filters = null;
      if (this.filtersStoreName) {
        filters = this.store[this.filtersStoreName];
      }
      if (this.staticFilters) {
        filters = { ...filters, ...this.staticFilters };
      }
      return filters;
    },

    defaultFilters() {
      if (this.filtersStoreName) {
        return this.store[this.filtersStoreName + 'Default'] || null;
      }
      return null;
    },

    filtersOnLocalStorage() {
      return `filters${this.apiResource}_${this.filtersStoreName}`;
    },

    dataTableStateKey() {
      return `dt-state_${this.dtStateName ?? this.apiResource}`;
    },

    isFiltering() {
      if (this.sempreMostrarFiltros) {
        return true;
      }
      if (this.filters && Object.keys(this.filters).length > 0) {
        for (const [, value] of Object.entries(this.filters)) {
          if (value ?? false) {
            return true;
          }
        }
      }
      return false;
    },
  },

  created() {
    if (this.preselecao) {
      console.debug('Atenção: preselecao >> localStorage.removeItem(this.dataTableStateKey)');
      localStorage.removeItem(this.dataTableStateKey);
    }
  },

  async mounted() {
    this.loadingStore.setLoading(true);

    this.setColumnWidthsByLocalStorage();

    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);

    if (this.filtersStoreName) {
      this.savedFilter =
        params.get('filters') || localStorage.getItem(this.filtersOnLocalStorage) || '{}';
      if (this.savedFilter && this.savedFilter !== 'undefined') {
        try {
          const filtersParsed = JSON.parse(this.savedFilter);
          this.setFilters(filtersParsed);
        } catch (e) {
          console.error(`Não foi possível recuperar os filtros (${this.savedFilter})`);
          console.error(e);
        }
      }
    }

    if (this.filterOnLoad) {
      await this.doFilter();
    }

    try {
      const dtState = localStorage.getItem(this.dataTableStateKey);
      const dtStateParsed = dtState ? JSON.parse(dtState) : {};

      if (!dtStateParsed?.multiSortMeta || dtStateParsed?.multiSortMeta?.length === 0) {
        dtStateParsed.multiSortMeta = [
          {
            field: this.sortField,
            order: this.sortOrder,
          },
        ];
        const dtStateJson = JSON.stringify(dtStateParsed);
        localStorage.setItem(this.dataTableStateKey, dtStateJson);
      }
    } catch (e) {
      console.error('Erro ao setar o "multiSortMeta"');
      console.error(e);
    }

    this.accordionActiveIndex = this.isFiltering ? 0 : null;
    this.loadingStore.setLoading(false);

    this.setColumnWidthsByLocalStorage();
  },

  methods: {
    setFilters(filters) {
      if (this.filtersStoreName) {
        this.store[this.filtersStoreName] = filters;
      }
    },

    toggleFiltros() {
      this.accordionActiveIndex = this.accordionActiveIndex === 0 ? null : 0;
      this.visibleRight = !this.visibleRight;
    },

    async doFilter(event) {
      this.loadingStore.setLoading(true);

      await this.$emit('beforeFilter');

      const lsItem = localStorage.getItem(this.dataTableStateKey);

      const dtStateLS = lsItem ? JSON.parse(lsItem) : null;

      let rows = Number.MAX_SAFE_INTEGER;
      let page = 1;

      if (this.comPaginador) {
        rows = event?.rows ?? dtStateLS?.rows ?? 10;

        if (event?.first) {
          page = Math.ceil((event.first + 1) / event.rows);
        } else if (lsItem?.first) {
          page = Math.ceil((dtStateLS.first + 1) / dtStateLS.rows);
        }
      }

      let apiOrder = null;

      // Prioridades:
      if (event?.multiSortMeta?.length > 0) {
        // 1- evento
        apiOrder = event.multiSortMeta;
      } else if (dtStateLS?.multiSortMeta?.length > 0) {
        // 2- state do datatable
        apiOrder = dtStateLS.multiSortMeta;
      } else if (this.defaultOrder) {
        // 3- defaultOrder
        this.multiSortMeta = [];
        Object.keys(this.defaultOrder).forEach((campo) => {
          this.multiSortMeta.push({
            field: campo,
            order: this.defaultOrder[campo] === 'ASC' ? 1 : -1,
          });
        }, this);
        apiOrder = this.multiSortMeta;
      }

      console.log('carregar de ' + import.meta.env.VITE_CROSIER_API + this.apiResource);

      const response = await api.get({
        apiResource: import.meta.env.VITE_CROSIER_API + this.apiResource,
        authToken: this.authStore.token,
        page,
        rows,
        order: apiOrder,
        filters: this.filters,
        defaultFilters: this.defaultFilters,
        properties: this.properties,
      });

      this.totalRecords = response.data['hydra:totalItems'];
      this.tableData = response.data['hydra:member'];

      // salva os filtros no localStorage
      localStorage.setItem(this.filtersOnLocalStorage, JSON.stringify(this.filters));

      this.totalRecords = response.data['hydra:totalItems'];
      this.tableData = response.data['hydra:member'];
      this.setFilters(this.filters);

      this.$emit('afterFilter', this.tableData);
      this.handleTudoSelecionado();

      if (this.filtrosNaSidebar) {
        this.visibleRight = false;
      }

      this.setColumnWidthsByLocalStorage();

      this.loadingStore.setLoading(false);
    },

    async doClearFilters() {
      this.setFilters({});
      localStorage.setItem(this.filtersOnLocalStorage, null);
      this.$refs.dt.resetPage();
      await this.doFilter({ event: { first: 0 } });
    },

    tudoSelecionadoClick() {
      this.$emit('update:selection', this.tudoSelecionado ? [...this.tableData] : null);
    },

    onUpdateSelection($event) {
      this.handleTudoSelecionado();
      this.$emit('update:selection', $event);
    },

    handleTudoSelecionado() {
      this.$nextTick(() => {
        if (this.selection && this.tableData) {
          try {
            const selectionIds = this.selection.map((e) => e.id).sort();
            const values = this.tableData;
            const valuesIds = values.map((e) => e.id).sort();
            this.tudoSelecionado = JSON.stringify(selectionIds) === JSON.stringify(valuesIds);
          } catch (e) {
            console.error('Erro - handleTudoSelecionado');
            console.error(e);
          }
        }
      });
    },

    onRowSelect($event) {
      this.$emit('row-select', $event);
      this.handleTudoSelecionado();
    },

    onRowUnselect($event) {
      this.$emit('row-unselect', $event);
      this.handleTudoSelecionado();
    },

    setColumnWidthsByLocalStorage() {
      const dtStateKey = this.dataTableStateKey;
      if (dtStateKey) {
        const keyColumnWidths = `${dtStateKey}_columnWidths`;
        const columnWidthsNoLocalStorage = localStorage.getItem(keyColumnWidths);
        const dtStateKeyDecoded = JSON.parse(localStorage.getItem(dtStateKey));
        if (dtStateKeyDecoded?.columnWidths) {
          dtStateKeyDecoded.columnWidths = columnWidthsNoLocalStorage;
          const dtStateKeyEncoded = JSON.stringify(dtStateKeyDecoded);
          localStorage.setItem(dtStateKey, dtStateKeyEncoded);
        }
      }
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    deletar(id) {
      this.$confirm.require({
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        message: 'Confirmar a operação?',
        header: 'Atenção!',
        icon: 'pi pi-exclamation-triangle',
        group: 'confirmDialog_crosierListS',
        accept: async () => {
          this.loadingStore.setLoading(true);
          try {
            const deleteUrl = `${this.apiResource}${id}`;
            const rsDelete = await api.delete(deleteUrl);
            if (!rsDelete) {
              throw new Error('rsDelete n/d');
            }
            if (rsDelete?.status === 204) {
              this.$toast.add({
                group: 'mainToast',
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Registro deletado com sucesso',
                life: 5000,
              });
              await this.doFilter();
            } else if (rsDelete?.data && rsDelete.data['hydra:description']) {
              throw new Error(`status !== 204: ${rsDelete?.data['hydra:description']}`);
            } else if (rsDelete?.statusText) {
              throw new Error(`status !== 204: ${rsDelete?.statusText}`);
            } else {
              throw new Error('Erro ao deletar (erro n/d, status !== 204)');
            }
          } catch (e) {
            console.error(e);
            this.$toast.add({
              group: 'mainToast',
              severity: 'error',
              summary: 'Erro',
              detail: 'Ocorreu um erro ao deletar',
              life: 5000,
            });
          }
          this.loadingStore.setLoading(false);
        },
      });
    },

    limparConfiguracoesDaTabela() {
      this.$confirm.require({
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        message: 'Confirmar a operação?',
        header: 'Atenção!',
        icon: 'pi pi-exclamation-triangle',
        group: 'confirmDialog_crosierListS',
        accept: () => {
          try {
            this.loadingStore.setLoading(true);
          } catch (e) {
            console.error(e);
          }
          localStorage.removeItem(this.dataTableStateKey);
          localStorage.removeItem(`${this.dataTableStateKey}_columnWidths`);
          window.location.reload();
        },
      });
    },
  },
};
</script>
