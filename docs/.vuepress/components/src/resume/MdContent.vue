<template>
  <div class="text-sm leading-loose" v-for="(ctt, index) in content" :key="index" v-html="ctt" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  value: string | string[]
}>()

const content = ref<string[]>([])
const md = new MarkdownIt()

if (typeof props.value === 'string') {
  content.value = [md.render(props.value)]
} else {

  content.value = props.value.map((c) => md.render(c))
}
</script>