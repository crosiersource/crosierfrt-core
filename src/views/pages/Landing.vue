<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onBeforeMount, ref } from 'vue';

const { layoutConfig, toggleDarkMode } = useLayout();
const parallaxBody = ref(null);
const collaboration = ref(null);
const events = ref(null);
const video = ref(null);
const features = ref(null);

onBeforeMount(() => {
  if (!layoutConfig.darkTheme) {
    toggleDarkMode();
  }
});

function scrollBehavior(el) {
  el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToElement($element) {
  setTimeout(() => {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }, 200);
}

function handleMouseEnter(event) {
  event.target.style.background = 'linear-gradient(110.43deg, rgba(134,140,208,.5) 0.04%, rgba(255,87,89,.5) 100.11%)';
}

function handleMouseLeave(event) {
  event.target.style.background = 'unset';
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950">
    <div style="height: 68px; backdrop-filter: blur(17px)" class="flex justify-between items-center z-30 px-8 bg-black/40 top-0 w-full fixed">
      <div>
        <img :draggable="false" src="/layout/images/logo/logo.png" alt="" />
      </div>

      <a v-styleclass="{ selector: '@next', hideOnOutsideClick: true, enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="cursor-pointer block lg:hidden text-white">
        <i class="pi pi-bars !text-4xl" />
      </a>

      <div id="menu" class="items-center grow hidden lg:flex absolute lg:static w-full lg:px-0 z-30 shadow lg:shadow-none animate-fadein" style="top: 68px; right: 0%">
        <ul class="list-none p-4 lg:p-0 m-0 ml-auto flex lg:items-center select-none flex-col lg:flex-row cursor-pointer">
          <li>
            <a v-styleclass="{ selector: '#menu', enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="flex m-0 md:ml-8 px-0 py-4 text-surface-900 dark:text-surface-0 leading-normal">
              <span>HOME</span>
            </a>
          </li>
          <li>
            <a v-styleclass="{ selector: '#menu', enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="flex m-0 md:ml-8 px-0 py-4 text-surface-900 dark:text-surface-0 leading-normal" @click="scrollToElement(features)">
              <span>FEATURES</span>
            </a>
          </li>
          <li>
            <a v-styleclass="{ selector: '#menu', enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="flex m-0 md:ml-8 px-0 py-4 text-surface-900 dark:text-surface-0 leading-normal" @click="scrollToElement(collaboration)">
              <span>COLLABORATION</span>
            </a>
          </li>
          <li>
            <a v-styleclass="{ selector: '#menu', enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="flex m-0 md:ml-8 px-0 py-4 text-surface-900 dark:text-surface-0 leading-normal" @click="scrollToElement(events)">
              <span>EVENTS</span>
            </a>
          </li>
          <li>
            <a v-styleclass="{ selector: '#menu', enterFromClass: 'hidden', leaveToClass: 'hidden' }" class="flex m-0 md:ml-8 px-0 py-4 text-surface-900 dark:text-surface-0 leading-normal" @click="scrollToElement(video)">
              <span>VIDEO</span>
            </a>
          </li>
          <li>
            <Button label="LET'S TRY" class="!bg-surface-0 !text-surface-900 !border-surface-900 m-0 mt-4 md:mt-0 md:ml-8" />
          </li>
        </ul>
      </div>
    </div>
    <div class="h-screen">
      <div style="perspective: 101px" class="h-screen overflow-x-hidden overflow-y-auto absolute top-0 left-0 right-0 bottom-0">
        <div class="hidden lg:block absolute top-0 right-0 bottom-0 left-0 parallax__layer__0">
          <img :draggable="false" src="/demo/images/landing/layer-0-opt.jpg" class="w-full h-full block absolute bottom-0" />
        </div>
        <div class="hidden lg:block absolute top-0 right-0 bottom-0 left-0 parallax__layer__1">
          <img :draggable="false" src="/demo/images/landing/layer-1-opt.png" class="w-full block absolute bottom-0" />
        </div>

        <div class="hidden lg:flex absolute right-0 bottom-0 left-0 parallax__layer__3 justify-center" style="top: 27%">
          <div>
            <h1 class="m-0 -mb-6 text-4xl text-white">LET'S</h1>
            <h1 class="m-0 text-white" style="font-size: 15rem">EXPLORE</h1>
            <div class="flex -mt-6 justify-end">
              <h1 class="m-0 text-white text-4xl">TO ULTIMA</h1>
            </div>
          </div>
        </div>
        <div class="hidden lg:block absolute top-0 right-0 bottom-0 left-0 parallax__layer__2">
          <img :draggable="false" src="/demo/images/landing/layer-2-opt.png" class="w-full block absolute bottom-0" />
        </div>

        <div class="absolute flex justify-center items-center w-full h-full parallax__layer__3" style="top: 112px">
          <Button
            label="GET STARTED"
            style="backdrop-filter: blur(7px)"
            class="!text-surface-0 !bg-white/20 !text-lg !px-8 !py-4 !font-semibold hover:!bg-white hover:!text-surface-900 !rounded-xl !border-white/30 border"
            text
            @click="scrollBehavior(features)"
          />
        </div>

        <div class="block lg:hidden h-[28rem] bg-center bg-no-repeat bg-cover" style="top: 68px; background: url(/demo/images/landing/landing-hero-image.jpg)">
          <div class="flex justify-center items-center h-full">
            <div class="flex flex-col">
              <span class="m-0 text-base text-white font-semibold">LET'S</span>
              <span class="m-0 text-4xl text-white font-semibold">EXPLORE</span>
              <div class="flex justify-end">
                <span class="m-0 text-white text-sm font-semibold">TO ULTIMA</span>
              </div>
              <div class="flex justify-center mt-2">
                <Button
                  label="GET STARTED"
                  style="backdrop-filter: blur(7px)"
                  class="!text-surface-0 !bg-white/20 !text-xs !font-semibold hover:!bg-white hover:!text-surface-900 !rounded-xl !border-white/30 border"
                  text
                  @click="scrollBehavior(parallaxBody)"
                />
              </div>
            </div>
          </div>
        </div>
        <div ref="parallaxBody" class="lg:top-full block absolute left-0 right-0 h-full z-20">
          <div>
            <div class="grid grid-cols-12 gap-4 grid-nogutter p-2 lg:p-8" style="background-color: #000">
              <div class="col-span-6 lg:col-span-3 flex items-center justify-center gap-4">
                <img :draggable="false" src="/demo/images/landing/landing-logo1.png" alt="" />
              </div>
              <div class="col-span-6 lg:col-span-3 flex items-center justify-center gap-4">
                <img :draggable="false" src="/demo/images/landing/landing-logo2.png" alt="" />
              </div>
              <div class="col-span-6 lg:col-span-3 flex items-center justify-center gap-4">
                <img :draggable="false" src="/demo/images/landing/landing-logo3.png" alt="" />
              </div>
              <div class="col-span-6 lg:col-span-3 flex items-center justify-center gap-4">
                <img :draggable="false" src="/demo/images/landing/landing-logo4.png" alt="" />
              </div>
            </div>
          </div>
          <div ref="features" class="pt-8" style="background-color: #000">
            <div ref="parallaxBody" class="flex flex-col items-center gap-4">
              <div class="bg-surface-500 dark:bg-surface-300 text-white text-sm p-2 rounded-lg">FEATURES</div>
              <span class="text-white text-2xl uppercase">All you need is the Ultima.</span>
              <h1 class="m-0 text-6xl" style="background: linear-gradient(110.43deg, #868cd0 0.04%, #ff5759 100.11%); background-clip: text; -webkit-background-clip: text; color: transparent">ULTIMA</h1>
            </div>
            <div class="flex flex-col items-center">
              <div class="grid grid-cols-12 gap-4 pt-12 p-6" style="max-width: 1200px">
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-palette !text-4xl text-white" />
                    <span class="font-semibold text-white">Creative Design</span>
                    <span class="text-white">Unleash your brand's full potential with our creative design services.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-mobile !text-4xl text-white" />
                    <span class="font-semibold text-white">Responsive Design</span>
                    <span class="text-white">Make sure your website looks great and functions seamlessly on any device with responsive design.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-sync !text-4xl text-white" />
                    <span class="font-semibold text-white">Cross Browser Support</span>
                    <span class="text-white">Don't let browser compatibility hold you back. Our cross browser support ensures your website works perfectly on all browsers.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-th-large !text-4xl text-white" />
                    <span class="font-semibold text-white">Well Organized</span>
                    <span class="text-white">Our well-organized approach guarantees a smooth design process from start to finish.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl text-white p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-code !text-4xl text-white" />
                    <span class="font-semibold text-white">Easy to Product</span>
                    <span class="text-white">We make product creation easy with straightforward and intuitive processes.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
                <div class="col-span-6 lg:col-span-4">
                  <div class="flex justify-center flex-col gap-4 border border-surface-50 dark:border-surface-800 rounded-2xl text-white p-8 cursor-pointer h-full" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                    <i class="pi pi-box !text-4xl" />
                    <span class="font-semibold">Top Notch Quality</span>
                    <span>Expect top notch quality in all of our work, delivering exceptional results every time.</span>
                    <span class="text-primary-300 font-medium flex items-center">Learn more <i class="pi pi-arrow-right ml-2" /></span>
                  </div>
                </div>
              </div>
              <div ref="collaboration" style="max-width: 1200px" class="flex flex-col lg:flex-row gap-20 mt-12 py-12 px-6 w-full">
                <div class="flex flex-col items-end justify-center">
                  <div class="bg-surface-50 dark:bg-surface-800 text-white text-sm p-2 rounded-lg mb-6">PLAY AS A TEAM</div>
                  <div>
                    <h1 class="m-0 text-6xl font-bold text-right" style="background: linear-gradient(110.43deg, #868cd0 0.04%, #ff5759 100.11%); background-clip: text; -webkit-background-clip: text; color: transparent">COLLABORATION</h1>
                    <p class="text-white text-right mt-4">
                      The Earth is a very small stage in a vast cosmic arena. Think of the rivers of blood spilled by all those generals and emperors so that, in glory and triumph, they could become the momentary masters of a fraction of a dot.
                    </p>
                  </div>
                </div>
                <img :draggable="false" src="/demo/images/landing/collaboration-image.png" alt="" />
              </div>
              <div ref="events" style="max-width: 1200px" class="flex flex-col lg:flex-row gap-20 mt-12 py-12 px-6 w-full">
                <img :draggable="false" src="/demo/images/landing/easyfollow-image.png" alt="" />
                <div class="flex flex-col items-start justify-center">
                  <div class="bg-surface-50 dark:bg-surface-800 text-white text-sm p-2 rounded-lg mb-6">EVENTS</div>
                  <div>
                    <h1 class="m-0 text-6xl font-bold" style="background: linear-gradient(110.43deg, #868cd0 0.04%, #ff5759 100.11%); background-clip: text; -webkit-background-clip: text; color: transparent">EASY FOLLOW</h1>
                    <p class="text-white mt-2">It has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world.</p>
                  </div>
                </div>
              </div>
              <div ref="video" style="max-width: 1200px" class="flex gap-6 mt-12 py-12 flex-col items-center w-full">
                <div class="bg-surface-50 dark:bg-surface-800 text-white text-sm p-2 rounded-lg">VIDEO</div>
                <h1 class="m-0 text-6xl font-bold" style="background: linear-gradient(110.43deg, #868cd0 0.04%, #ff5759 100.11%); background-clip: text; -webkit-background-clip: text; color: transparent">SHOWREELS</h1>
                <div class="mt-4 relative">
                  <iframe class="border-0 rounded-lg z-30 max-w-full" width="600" height="400" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
                  <div class="absolute z-0" style="top: -50px; left: -50px">
                    <img :draggable="false" class="opacity-40" src="/demo/images/landing/landing-ellipse.png" alt="" />
                  </div>
                  <div class="absolute z-0" style="bottom: -50px; right: -50px; filter: blur(4px)">
                    <img :draggable="false" class="opacity-40" src="/demo/images/landing/landing-ellipse2.png" alt="" />
                  </div>
                  <div class="absolute z-0" style="bottom: -50px; right: 10px; filter: blur(4px)">
                    <img :draggable="false" class="opacity-40" src="/demo/images/landing/landing-ellipse2.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="py-12 px-6 mt-12 w-full flex justify-center">
                <div class="p-8 flex flex-col gap-4 items-start justify-between lg:flex-row lg:items-center rounded-2xl w-full" style="background: linear-gradient(110.43deg, #868cd0 0.04%, #ff5759 100.11%); max-width: 1200px">
                  <div class="flex flex-col gap-2">
                    <h1 class="m-0 text-white font-bold text-2xl">NEWSLETTER</h1>
                    <p class="m-0 text-white">Sign up for our newsletter and stay up-to-date on the latest features and updates for our platform.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <InputText placeholder="Email Address" class="!bg-transparent !border-white !rounded-md placeholder:!text-white" />
                    <Button class="!text-white !border !border-white !rounded-md h-full" text label="JOIN" />
                  </div>
                </div>
              </div>
              <div class="w-full px-6" style="max-width: 1200px">
                <div class="grid grid-cols-12 gap-4 lg:gap-0 lg:grid-nogutter pb-12">
                  <div class="col-span-12 lg:col-span-3">
                    <div class="w-full text-white flex flex-col gap-4">
                      <h1 class="m-0 font-medium text-sm text-surface-500 dark:text-surface-300">CONTACT US</h1>
                      <div class="flex gap-8">
                        <a href="#"><i class="pi pi-github text-white !text-2xl" /></a>
                        <a href="#"><i class="pi pi-twitter text-white !text-2xl" /></a>
                        <a href="#"><i class="pi pi-linkedin text-white !text-2xl" /></a>
                      </div>
                      <p class="m-0 text-base lg:text-sm">
                        (415) 931-1624 794 Mcallister <br />
                        St San Francisco, 94102
                      </p>
                      <span class="text-base lg:text-sm">©Copyright 202X</span>
                    </div>
                  </div>
                  <div class="col-span-12 lg:col-span-3">
                    <div class="w-full text-white flex flex-col gap-4">
                      <h1 class="m-0 font-medium text-sm text-surface-500 dark:text-surface-300">ABOUT US</h1>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Our Values</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Our Team</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Our History</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Career & Join Us</span></a>
                    </div>
                  </div>
                  <div class="col-span-12 lg:col-span-3">
                    <div class="w-full text-white flex flex-col gap-4">
                      <h1 class="m-0 font-medium text-sm text-surface-500 dark:text-surface-300">SITE MAP</h1>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Dashboard</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">CRUD</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Invoice</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Help </span></a>
                    </div>
                  </div>
                  <div class="col-span-12 lg:col-span-3">
                    <div class="w-full text-white flex flex-col gap-4">
                      <h1 class="m-0 font-medium text-sm text-surface-500 dark:text-surface-300">CALENDAR</h1>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Widgets</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Documentation</span></a>
                      <a href="#"><span class="text-base lg:text-sm block text-white">Buy Now</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #fff;
}
</style>
