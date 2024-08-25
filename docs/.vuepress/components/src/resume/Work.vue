<template>
  <div aria-label="Experience">
    <section class="flex flex flex-wrap mb-4 lg:mb-0 lg:flex-nowrap lg:justify-between ">
      <h4 aria-label="Experience Short" class="font-normal flex items-center mb-3">
        <span aria-label="Name" class="mr-2 ">{{ company }}</span>
        <span aria-label="Dev Role" class="text-sm font-bold">{{ role }}</span>
      </h4>
      <span class="text-sm" aria-label="Period" v-if="startTime || endTime">{{ startTime }} ~ {{ endTime }}</span>
    </section>
    <p aria-label="Experience Detail" class="flex flex-col">
      <MdContent :value="descriptions"></MdContent>
    </p>
  </div>
</template>
<script setup lang="ts">
import MdContent from './MdContent.vue'
defineProps<{
  company: string;
  startTime: string;
  endTime: string;
  role: string;
  descriptions: string[];
}>();
</script>
<style></style>