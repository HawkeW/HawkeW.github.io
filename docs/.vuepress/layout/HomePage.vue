<template>
  <div class="home-page">
    <!-- 3D Background -->
    <div class="bg-3d">
      <div class="polyhedron">
        <div class="face face-1"></div>
        <div class="face face-2"></div>
        <div class="face face-3"></div>
        <div class="face face-4"></div>
        <div class="face face-5"></div>
        <div class="face face-6"></div>
      </div>
    </div>

    <!-- Floating Decorations -->
    <div class="floating-decorations">
      <div class="float-orb orb-1"></div>
      <div class="float-orb orb-2"></div>
      <div class="float-orb orb-3"></div>
    </div>

    <div class="content-wrapper">
      <!-- Profile Card -->
      <div class="profile-card glow-card fade-in" @mousemove="handleMouseMove">
        <div class="avatar-wrapper">
          <img src="/logo.jpg" alt="一度" class="avatar" />
        </div>
        <h1 class="name">一度</h1>
        <p class="motto">无限进步</p>
        <div class="location">
          <span class="location-dot"></span>
          深圳
        </div>
        <a href="mailto:hughew@foxmail.com" class="email">hughew@foxmail.com</a>
      </div>

      <!-- Tech Stack Cards -->
      <div class="tech-container fade-in delay-1">
        <!-- Category Tabs -->
        <div class="tab-headers">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="tab-btn"
            :class="{ active: activeCategory === cat.key }"
            @click="switchCategory(cat.key)"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Cards Container with 3D Flip -->
        <div class="cards-stage">
          <div
            class="cards-wrapper"
            :style="{ transform: `rotateY(${activeIndex * -90}deg)` }"
          >
            <!-- Frontend Card -->
            <div class="tech-card face-front">
              <div class="card-inner glow-card" @mousemove="handleMouseMove">
                <div v-for="group in techStack.frontend" :key="group.group" class="tech-group">
                  <span v-if="group.group" class="group-label">{{ group.group }}</span>
                  <div class="tech-grid">
                    <span v-for="tech in group.items" :key="tech.name" class="tech-item">
                      <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
                      {{ tech.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Backend Card -->
            <div class="tech-card face-right">
              <div class="card-inner glow-card" @mousemove="handleMouseMove">
                <div v-for="group in techStack.backend" :key="group.group" class="tech-group">
                  <span v-if="group.group" class="group-label">{{ group.group }}</span>
                  <div class="tech-grid">
                    <span v-for="tech in group.items" :key="tech.name" class="tech-item">
                      <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
                      {{ tech.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- App Card -->
            <div class="tech-card face-back">
              <div class="card-inner glow-card" @mousemove="handleMouseMove">
                <div v-for="group in techStack.app" :key="group.group" class="tech-group">
                  <span v-if="group.group" class="group-label">{{ group.group }}</span>
                  <div class="tech-grid">
                    <span v-for="tech in group.items" :key="tech.name" class="tech-item">
                      <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
                      {{ tech.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Exploring Card -->
            <div class="tech-card face-left">
              <div class="card-inner glow-card" @mousemove="handleMouseMove">
                <div v-for="group in techStack.exploring" :key="group.group" class="tech-group">
                  <span v-if="group.group" class="group-label">{{ group.group }}</span>
                  <div class="tech-grid">
                    <span v-for="tech in group.items" :key="tech.name" class="tech-item">
                      <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
                      {{ tech.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="nav-container fade-in delay-2">
        <a href="/article/" class="nav-card glow-card" @mousemove="handleMouseMove">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div class="nav-content">
            <span class="nav-label">文章</span>
            <span class="nav-desc">记录学习与思考</span>
          </div>
          <span class="nav-arrow">→</span>
        </a>

        <a href="/resume/" class="nav-card glow-card" @mousemove="handleMouseMove">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="nav-content">
            <span class="nav-label">简历</span>
            <span class="nav-desc">了解更多关于我</span>
          </div>
          <span class="nav-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const techStack = {
  frontend: [
    { group: '', items: [
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
      { name: 'Vue', icon: 'https://cdn.simpleicons.org/vuedotjs' },
      { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite' },
      { name: 'Astro', icon: 'https://cdn.simpleicons.org/astro' },
    ]},
    { group: '', items: [
      { name: 'Cesium', icon: 'https://cdn.simpleicons.org/cesium' },
      { name: 'OpenLayers', icon: 'https://cdn.simpleicons.org/openlayers' },
    ]}
  ],
  backend: [
    { group: '', items: [
      { name: 'Go', icon: 'https://cdn.simpleicons.org/go' },
      { name: 'Gin', icon: 'https://cdn.simpleicons.org/gin' },
      { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite' },
    ]}
  ],
  app: [
    { group: '', items: [
      { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter' },
      { name: 'uni-app', icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni.png' },
    ]}
  ],
  exploring: [
    { group: '', items: [
      { name: '软件架构', icon: '' },
      { name: 'LLM', icon: '' },
      { name: '图形学', icon: '' },
      { name: '计算机视觉', icon: '' },
    ]},
    { group: '', items: [
      { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs' },
      { name: 'WebGL', icon: 'https://cdn.simpleicons.org/webgl' },
    ]},
    { group: '', items: [
      { name: '游戏开发', icon: '' },
    ]}
  ]
}

const categories = [
  { key: 'frontend', label: '前端' },
  { key: 'backend', label: '后端' },
  { key: 'app', label: 'APP' },
  { key: 'exploring', label: '探索中' }
]

const activeCategory = ref('frontend')

const activeIndex = computed(() => {
  return categories.findIndex(cat => cat.key === activeCategory.value)
})

function switchCategory(key: string) {
  activeCategory.value = key
}

// Card glow effect
function handleMouseMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)
}
</script>

<style scoped>
.home-page {
  height: 100vh;
  max-height: 100vh;
  background-color: #fafafa;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
  background-size: 26px 26px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* 3D Background */
.bg-3d {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 360px;
  perspective: 1000px;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

/* Floating Decorations */
.floating-decorations {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.float-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: rgba(120, 160, 255, 0.06);
  top: 15%;
  left: 10%;
  animation: float1 20s ease-in-out infinite;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: rgba(180, 120, 255, 0.05);
  top: 60%;
  right: 15%;
  animation: float2 25s ease-in-out infinite;
}

.orb-3 {
  width: 100px;
  height: 100px;
  background: rgba(255, 140, 180, 0.04);
  bottom: 20%;
  left: 30%;
  animation: float3 18s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(30px, -20px); }
  66% { transform: translate(-15px, 15px); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-25px, 20px); }
  66% { transform: translate(20px, -15px); }
}

@keyframes float3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -25px); }
}

/* Card Glow Effect */
.glow-card {
  position: relative;
  overflow: hidden;
}

.glow-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    300px circle at var(--mouse-x) var(--mouse-y),
    rgba(120, 160, 255, 0.08),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
  border-radius: inherit;
}

.glow-card:hover::before {
  opacity: 1;
}

.polyhedron {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate3d 20s linear infinite;
}

.face {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 50%;
  top: 50%;
  margin-left: -90px;
  margin-top: -90px;
  border: 1px solid rgba(120, 140, 180, 0.35);
  background: rgba(120, 140, 180, 0.02);
}

.face-1 { transform: rotateY(0deg) translateZ(90px); }
.face-2 { transform: rotateY(90deg) translateZ(90px); }
.face-3 { transform: rotateY(180deg) translateZ(90px); }
.face-4 { transform: rotateY(270deg) translateZ(90px); }
.face-5 { transform: rotateX(90deg) translateZ(90px); }
.face-6 { transform: rotateX(-90deg) translateZ(90px); }

@keyframes rotate3d {
  from { transform: rotateX(-15deg) rotateY(0deg); }
  to { transform: rotateX(-15deg) rotateY(360deg); }
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Profile Card */
.profile-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1.5rem 1.5rem 1.25rem;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
}

.avatar-wrapper {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #a8b5d6, #c4b5dc);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
}

.name {
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.35rem;
  letter-spacing: 0.03em;
}

.motto {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.85rem;
}

.location {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.35rem;
}

.location-dot {
  width: 6px;
  height: 6px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 6px #4ade80;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.email {
  display: block;
  font-size: 0.75rem;
  color: #999;
  text-decoration: none;
  transition: color 0.25s ease;
}

.email:hover {
  color: #555;
}

/* Tech Container */
.tech-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Tab Headers */
.tab-headers {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

.tab-btn {
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  color: #666;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.tab-btn:hover {
  color: #333;
  background: #f5f5f5;
}

.tab-btn.active {
  color: #1a1a1a;
  background: #f0f4ff;
  border-color: #c5d4f5;
}

/* 3D Cards Stage */
.cards-stage {
  height: 140px;
  perspective: 1000px;
}

.cards-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.face-front {
  transform: rotateY(0deg) translateZ(100px);
}

.face-right {
  transform: rotateY(90deg) translateZ(100px);
}

.face-back {
  transform: rotateY(180deg) translateZ(100px);
}

.face-left {
  transform: rotateY(270deg) translateZ(100px);
}

.card-inner {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  height: 100%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
}

.tech-group {
  margin-bottom: 0.6rem;
}

.tech-group:last-child {
  margin-bottom: 0;
}

.group-label {
  display: block;
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 0.3rem;
  text-align: center;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}

.tech-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.78rem;
  color: #444;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tech-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.tech-item:hover {
  background: #eef2ff;
  border-color: #c5d4f5;
  transform: translateY(-2px);
}

/* Navigation Container */
.nav-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.nav-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.nav-card:hover .nav-arrow {
  transform: translateX(4px);
  opacity: 1;
}

.nav-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4ff;
  border-radius: 10px;
  flex-shrink: 0;
}

.nav-icon svg {
  width: 18px;
  height: 18px;
  color: #6b82b8;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
}

.nav-desc {
  font-size: 0.68rem;
  color: #999;
}

.nav-arrow {
  font-size: 1rem;
  color: #aaa;
  opacity: 0.6;
  transition: all 0.25s ease;
}

/* Fade In Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.7s ease-out forwards;
  opacity: 0;
}

.delay-1 {
  animation-delay: 0.15s;
}

.delay-2 {
  animation-delay: 0.3s;
}

/* Responsive */
@media (max-width: 480px) {
  .home-page {
    padding: 1rem 2rem;
  }

  .content-wrapper {
    gap: 0.75rem;
    max-width: calc(100vw - 4rem);
  }

  .profile-card {
    padding: 1.25rem 1rem 1rem;
  }

  .avatar-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 0.75rem;
  }

  .name {
    font-size: 1.3rem;
  }

  .motto {
    margin-bottom: 0.65rem;
  }

  .cards-stage {
    height: 180px;
    perspective: 800px;
  }

  .face-front {
    transform: rotateY(0deg) translateZ(80px);
  }

  .face-right {
    transform: rotateY(90deg) translateZ(80px);
  }

  .face-back {
    transform: rotateY(180deg) translateZ(80px);
  }

  .face-left {
    transform: rotateY(270deg) translateZ(80px);
  }

  .card-inner {
    padding: 1rem;
  }

  .tech-group {
    margin-bottom: 0.5rem;
  }

  .group-label {
    font-size: 0.65rem;
    margin-bottom: 0.25rem;
  }

  .tech-grid {
    gap: 0.35rem;
  }

  .tech-item {
    padding: 0.3rem 0.55rem;
    font-size: 0.72rem;
  }

  .nav-container {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .nav-card {
    padding: 0.85rem;
  }

  .tab-btn {
    padding: 0.35rem 0.7rem;
    font-size: 0.72rem;
  }

  .bg-3d {
    width: 280px;
    height: 280px;
  }

  /* Hide floating decorations on mobile */
  .floating-decorations {
    display: none;
  }
}

@media (max-height: 700px) {
  .profile-card {
    padding: 1.25rem 1.25rem 1rem;
  }

  .avatar-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 0.75rem;
  }

  .name {
    font-size: 1.35rem;
  }

  .motto {
    font-size: 0.85rem;
    margin-bottom: 0.65rem;
  }

  .cards-stage {
    height: 150px;
  }

  .content-wrapper {
    gap: 0.75rem;
  }
}
</style>
