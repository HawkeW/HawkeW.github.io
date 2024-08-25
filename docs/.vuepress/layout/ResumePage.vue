<template>
  <div class="resume-page flex flex-row items-center flex-wrap w-full justify-around max-h-screen overflow-auto">
    <div class="techstack">
      <div class="lg:fixed lg:top-5 lg:left-20 my-10 flex flex-col items-center justify-center">
        <div class="self-start text-start mb-5">无限进步
          <HopeIcon icon="print" color="red" />
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col mb-5">
            <span class="font-bold">使用中(过) </span>
            <span>HTML/CSS/JS+Typescript</span>
            <span>Vue/Vite/Astro</span>
            <span>Cesium/Openlayer</span>
            <span>Flutter/uni-app</span>
            <span>GO/gin/sqlite</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">感兴趣/学习中： </span>
            <span>软件架构</span>
            <span>AI</span>
            <span>图形学</span>
            <span>ThreeJS</span>
            <span>WebGL</span>
            <span>计算机视觉</span>
            <span>游戏开发</span>
          </div>
        </div>
      </div>
    </div>
    <div id="resume" class="a4 p-5  md:p-[20mm] lg:p-[20mm];">
      <Intro class="mb-8" v-bind="resume.intro" />
      <section class="mb-8">
        <h3 class="mb-5">工作经历</h3>
        <Work class="mb-5" v-for="(work, index) in resume.works" :key="index" v-bind="work" />
      </section>
      <section class="mb-8">
        <h3 class="mb-5">项目经验</h3>
        <Project class="mb-5" v-for="(project, index) in resume.projects" :key="index" v-bind="project"
          :value="project" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Introduction, ProjectExperience, WorkExperience } from '@components/resume/types';
import { Project, Intro, Work } from '../components/src'
import { PageFrontmatter, useClientData } from 'vuepress/client'
const {
  pageFrontmatter,
} = useClientData()
interface ResumePageFrontMatter extends PageFrontmatter {
  resume: {
    intro: Introduction,
    works: WorkExperience[]
    projects: ProjectExperience[]
  }
}
const resume = (pageFrontmatter.value as ResumePageFrontMatter).resume
</script>

<style scoped>
* {
  font-family: PingFangSC-Thin, sans-serif;
  overflow: hidden;
}

@media print {
  body {
    overflow: visible !important;
    height: auto !important;
    width: auto !important;
  }

  .techstack,
  .self {
    display: none;
  }

  .a4,
  .resume-page {
    overflow: visible !important;
    height: auto !important;
    width: auto !important;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }

  .a4::-webkit-scrollbar,
  .resume-page::-webkit-scrollbar {
    display: none;
  }
}

.a4 {
  background-color: white;
  width: 210mm;
  min-height: 297mm;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>