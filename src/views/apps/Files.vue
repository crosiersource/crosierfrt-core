<script setup>
import { FileService } from '@/service/FileService';
import { ref } from 'vue';

const metrics = ref([]);
const files = ref([]);
const folders = ref([]);
const chartData = ref([]);
const chartOptions = ref({});
const chartPlugins = ref({});
const menuItems = ref([
  { label: 'View', icon: 'pi pi-search' },
  { label: 'Refresh', icon: 'pi pi-refresh' }
]);
const menuRef = ref(null);
const fileUploaderRef = ref(null);
const uploadFiles = ref([]);
FileService.getFiles().then((data) => (files.value = data));
FileService.getMetrics().then((data) => (metrics.value = data));
FileService.getFoldersLarge().then((data) => (folders.value = data));

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');

chartPlugins.value = [
  {
    beforeDraw: function (chart) {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const fontSize = 1.5;
      const oldFill = ctx.fillStyle;

      ctx.restore();
      ctx.font = fontSize + 'rem sans-serif';
      ctx.textBaseline = 'middle';

      const text = 'Free Space';
      const text2 = 50 + 'GB / ' + 80 + 'GB';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = (height + chart.chartArea.top) / 2.25;

      const text2X = Math.round((width - ctx.measureText(text).width) / 2.1);
      const text2Y = (height + chart.chartArea.top) / 1.75;

      ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[0];
      ctx.fillText(text, textX, textY);
      ctx.fillText(text2, text2X, text2Y);
      ctx.fillStyle = oldFill;
      ctx.save();
    }
  }
];
chartData.value = {
  datasets: [
    {
      data: [300, 100],
      backgroundColor: [documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-100')],
      hoverBackgroundColor: [documentStyle.getPropertyValue('--p-primary-700'), documentStyle.getPropertyValue('--p-primary-200')],
      borderColor: 'transparent',
      fill: true
    }
  ]
};

chartOptions.value = {
  animation: {
    duration: 0
  },
  responsive: true,
  maintainAspectRatio: false,
  cutout: '90%',
  plugins: {
    legend: {
      labels: {
        color: textColor
      }
    }
  }
};

function toggleMenuItem(event, index) {
  menuRef.value[index].toggle(event);
}

function onChooseUploadFiles() {
  fileUploaderRef.value.choose();
}

function onSelectedFiles(event) {
  uploadFiles.value = event.files;
}

function onRemoveFile(removeFile) {
  uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
}
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div v-for="(metric, i) in metrics" :key="i" class="col-span-12 md:col-span-6 lg:col-span-3">
      <div class="card h-full">
        <div class="flex items-center justify-between mb-4">
          <span class="text-surface-900 dark:text-surface-0 text-xl font-semibold">{{ metric.title }}</span>
          <div>
            <Button :icon="metric.icon" size="small" text rounded @click="toggleMenuItem($event, i)" />
            <Menu ref="menuRef" popup :model="menuItems" />
          </div>
        </div>
        <div>
          <div class="rounded" :class="metric.color" :style="{ height: '6px' }">
            <div class="!h-full rounded" :class="metric.fieldColor" :style="{ width: '34%' }" />
          </div>
          <div class="flex align-item-center justify-between">
            <span class="text-surface-900 dark:text-surface-0 mt-4 text-md font-medium">{{ metric.files }}</span>
            <span class="text-surface-900 dark:text-surface-0 mt-4 text-md font-medium">{{ metric.fileSize }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 md:col-span-5 xl:col-span-3">
      <div class="card">
        <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Account Storage</div>
        <div class="flex flex-row justify-center" style="height: 200px">
          <Chart type="doughnut" :plugins="chartPlugins" :data="chartData" :options="chartOptions" />
        </div>
        <div class="mt-8 flex gap-4">
          <Button icon="pi pi-search" class="flex-1" label="Details" outlined />
          <Button icon="pi pi-upload" class="flex-1" label="Upgrade" />
        </div>
      </div>

      <div class="card">
        <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Categories</div>
        <ul class="list-none p-0 m-0">
          <li class="p-4 mb-4 flex items-center justify-between cursor-pointer rounded bg-indigo-50 text-indigo-900">
            <div class="flex items-center">
              <i class="pi pi-image text-2xl mr-4" />
              <span class="ext-lg font-medium">Images</span>
            </div>
            <span class="text-lg font-bold">85</span>
          </li>
          <li class="p-4 mb-4 flex items-center justify-between cursor-pointer rounded bg-purple-50 text-purple-900">
            <div class="flex items-center">
              <i class="pi pi-file text-2xl mr-4" />
              <span class="ext-lg font-medium">Documents</span>
            </div>
            <span class="text-lg font-bold">231</span>
          </li>
          <li class="p-4 flex items-center justify-between cursor-pointer rounded bg-teal-50 text-teal-900">
            <div class="flex items-center">
              <i class="pi pi-video text-2xl mr-4" />
              <span class="ext-lg font-medium">Videos</span>
            </div>
            <span class="text-lg font-bold">40</span>
          </li>
        </ul>
      </div>

      <div class="card p-0">
        <div class="card">
          <FileUpload
            id="files-fileupload"
            ref="fileUploaderRef"
            name="demo[]"
            url="./upload.php"
            accept="image/*"
            custom-upload
            multiple
            auto
            class="upload-button-hidden w-full"
            invalid-file-size-message="Invalid File Size"
            invalid-file-type-message="Invalid File Type"
            :max-file-size="1000000"
            :pt="{
              header: { class: '!hidden' },
              root: { class: '!border-0' }
            }"
            @select="onSelectedFiles"
          >
            <template #content>
              <div v-if="uploadFiles.length > 0" class="w-full py-4" :style="{ cursor: 'copy' }">
                <div v-for="file in uploadFiles" :key="file.name" class="flex flex-wrap gap-8">
                  <div class="remove-file-wrapper relative w-28 h-28 border-4 border-transparent rounded hover:bg-primary hover:text-primary-contrast duration-100 cursor-auto" :style="{ padding: '1px' }">
                    <img :src="file.objectURL" :alt="file.name" class="w-full h-full rounded shadow" />
                    <Button icon="pi pi-times" class="remove-button text-sm absolute justify-center items-center cursor-pointer" rounded :style="{ top: '-10px', right: '-10px', display: 'none' }" @click="onRemoveFile(file)" />
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div v-if="uploadFiles.length < 1" class="w-full py-4" :style="{ cursor: 'copy' }" @click="onChooseUploadFiles">
                <div class="h-full flex flex-col justify-center items-center">
                  <i class="pi pi-upload text-surface-900 dark:text-surface-0 text-2xl mb-4" />
                  <span class="font-bold text-surface-900 dark:text-surface-0 text-xl mb-4">Upload Files</span>
                  <span class="font-medium text-surface-600 dark:text-surface-200 text-md text-center">Drop or select files</span>
                </div>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-7 xl:col-span-9">
      <div class="card">
        <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Folders</div>
        <div class="grid grid-cols-12 gap-4">
          <div v-for="(folder, i) in folders" :key="i" class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="p-4 border border-surface-200 dark:border-surface-700 flex items-center justify-between hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer rounded">
              <div class="flex items-center">
                <i class="text-2xl mr-4" :class="folder.icon" />
                <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">{{ folder.name }}</span>
              </div>
              <span class="text-surface-600 dark:text-surface-200 text-lg font-semibold">{{ folder.size }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Recent Uploads</div>
        <DataTable :value="files" data-key="id" paginator :rows="8">
          <Column field="name" header="Name" sortable :header-style="{ minWidth: '12rem' }">
            <template #body="{ data }">
              <div class="flex items-center">
                <i class="text-xl text-primary mr-2" :class="data.icon" />
                <span>{{ data.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="date" header="Date" header-class="whitespace-nowrap" :header-style="{ minWidth: '12rem' }" />
          <Column field="fileSize" header="File Size" sortable :header-style="{ minWidth: '12rem' }" />
          <Column class="w-40">
            <template #body>
              <div class="text-center">
                <Button icon="pi pi-times" class="mr-2" severity="danger" text rounded />
                <Button icon="pi pi-search" text rounded />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.remove-file-wrapper:hover {
  .remove-button {
    display: flex !important;
  }
}
</style>
