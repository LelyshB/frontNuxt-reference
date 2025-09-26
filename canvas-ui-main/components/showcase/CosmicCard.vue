<template>
  <article
    ref="cardRef"
    class="card-frame group cursor-pointer focus-cosmic"
    tabindex="0"
    role="button"
    @mouseenter="handlePointerMove"
    @mousemove="handlePointerMove"
    @mouseleave="resetTilt"
  >
    <div class="card-inner">
      <div class="card-glare" aria-hidden="true" />
      <div class="relative z-10 flex items-start justify-between gap-4">
        <span class="text-4xl leading-none text-white/90" aria-hidden="true">{{ icon }}</span>
        <span
          class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/80"
          :style="{ color: accent }"
        >
          {{ subtitle }}
        </span>
      </div>
      <div class="relative z-10 mt-6 space-y-3">
        <h3 class="font-heading text-2xl text-white">{{ title }}</h3>
        <p class="text-sm leading-relaxed text-text-muted">
          {{ description }}
        </p>
      </div>
      <div class="relative z-10 mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.32em] text-text-muted">
        <span class="inline-block h-2 w-2 rounded-full" :style="{ backgroundColor: accent }" />
        Explore Insights
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'

const props = defineProps<{
  title: string
  subtitle: string
  description: string
  icon: string
  accent: string
}>()

const { title, subtitle, description, icon, accent } = toRefs(props)

const cardRef = ref<HTMLElement | null>(null)
const reduceMotion = ref(true)
let frameId: number | null = null
let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null

const scheduleFrame = (callback: () => void) => {
  if (typeof window === 'undefined') return
  if (frameId !== null) {
    cancelAnimationFrame(frameId)
  }
  frameId = requestAnimationFrame(() => {
    frameId = null
    callback()
  })
}

const applyTransform = (transform: string) => {
  const element = cardRef.value
  if (!element) return
  scheduleFrame(() => {
    element.style.transform = transform
  })
}

const resetTilt = () => {
  if (reduceMotion.value) return
  applyTransform('')
}

const handlePointerMove = (event: MouseEvent) => {
  if (reduceMotion.value) return
  const element = cardRef.value
  if (!element) return
  const rect = element.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const offsetY = event.clientY - rect.top
  const rotateY = ((offsetX - rect.width / 2) / rect.width) * 20
  const rotateX = -((offsetY - rect.height / 2) / rect.height) * 18

  applyTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mediaQuery.matches

  mediaQueryListener = (event: MediaQueryListEvent) => {
    reduceMotion.value = event.matches
    if (reduceMotion.value) {
      applyTransform('')
    }
  }

  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', mediaQueryListener)
  } else {
    mediaQuery.addListener(mediaQueryListener)
  }
})

onBeforeUnmount(() => {
  if (mediaQuery && mediaQueryListener) {
    if ('removeEventListener' in mediaQuery) {
      mediaQuery.removeEventListener('change', mediaQueryListener)
    } else {
      mediaQuery.removeListener(mediaQueryListener)
    }
  }
  applyTransform('')
})
</script>
