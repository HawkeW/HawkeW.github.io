<template>
  <div class="mb-5">
    <h1 class="text-xl font-bold mb-5">{{ name }}</h1>
    <section class="grid gap-y-2 gap-3 lg:grid-cols-2 grid-cols-1">
      <div class="bg-slate-100 px-4 py-2 flex items-center text-xs" :key="intro.key" v-for="(intro, index) in items">
        <label class="inline-block w-[80px] case-capital" :for="intro.key">{{ intro.key }} </label>
        <span :name="intro.key" class="text-wrap">
          <template v-if="Array.isArray(intro.value)">
            <span v-for="(val, index) in intro.value" :key="index">
              {{ val }}
              <span class="mx-1" v-if="index !== intro.value.length - 1">|</span>
            </span>
          </template>
          <template v-else>
            {{ intro.value }}
          </template>
        </span>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string;
  phone: string;
  'e-mail': string;
  certificates: string[];
  education: string;
  base: string
}>()

const introKeys = Object.keys(props).filter(item => item !== 'name')
const items = introKeys.map(item => ({
  key: item,
  value: props[item]
}))
  .filter(item => item.value)
</script>