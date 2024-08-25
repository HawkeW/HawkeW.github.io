<template>
  <div aria-label="Project" class="bg-slate-100 px-4 py-6">
    <section class="flex justify-between">
      <h4 aria-label="Project Short" class="font-normal mb-5">
        <span aria-label="Name" class="mr-2">{{ name }}</span>
        <span aria-label="Dev Role" class="mr-2">{{ role }}</span>
      </h4>
      <span class="text-sm" aria-label="Period" v-if="startTime || endTime">{{ startTime }} ~ {{ endTime }}</span>
    </section>
    <p aria-label="Project Detail" class="flex flex-col">
      <MdContent :value="descriptions"></MdContent>
    </p>
  </div>
</template>
<script setup lang="ts">
import MdContent from './MdContent.vue'
defineProps<{
  startTime: string;
  endTime: string;
  name: string;
  role: string;
  descriptions: string[];
}>();
</script>
<style></style>
