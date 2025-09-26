<template>
  <div
    ref="badgeRef"
    class="astro-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 px-8 py-10 text-center"
    :class="{ 'astro-card--visible': isVisible }"
    :style="styleVars"
    role="article"
    :aria-label="`${name} zodiac sign card`"
    tabindex="0"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
    @focusin="handleFocus"
    @focusout="handlePointerLeave"
  >
    <span class="astro-card__border" aria-hidden="true" />
    <span class="astro-card__glow" aria-hidden="true" />
    <span class="astro-card__sheen" aria-hidden="true" />

    <div class="relative z-10 flex flex-1 flex-col items-center gap-6">
      <div class="relative flex justify-center">
        <OrbitIcon :iconName="iconName" size="md" />
      </div>

      <div class="space-y-2">
        <h3 class="font-heading text-xl font-semibold text-text-base transition-colors duration-300 group-hover:gradient-hero group-focus-visible:gradient-hero">
          {{ name }}
        </h3>
        <p class="text-sm font-semibold text-starlight/90">
          {{ dateRange }}
        </p>
        <p class="text-sm leading-relaxed text-text-muted">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  name: string
  dateRange: string
  iconName: string
  description: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0
})

const { reduced: motionReduced } = useMotion()

const badgeRef = ref<HTMLElement>()
const isVisible = ref(false)

const tiltX = ref('0deg')
const tiltY = ref('0deg')
const tiltScale = ref('0.94')
const glowPosition = ref('50% 35%')
const animationFrame = ref<number | null>(null)
let visibilityTimer: number | null = null
let observer: IntersectionObserver | null = null

const styleVars = computed<CSSProperties>(() => ({
  '--tilt-x': tiltX.value,
  '--tilt-y': tiltY.value,
  '--tilt-scale': tiltScale.value,
  '--glow-position': glowPosition.value
}))

const resetTilt = () => {
  tiltX.value = '0deg'
  tiltY.value = '0deg'
  tiltScale.value = '1'
  glowPosition.value = '50% 35%'
}

const handlePointerMove = (event: PointerEvent) => {
  if (motionReduced.value || !badgeRef.value) return

  const rect = badgeRef.value.getBoundingClientRect()
  const relativeX = (event.clientX - rect.left) / rect.width
  const relativeY = (event.clientY - rect.top) / rect.height
  const clampedX = Math.min(Math.max(relativeX, 0), 1)
  const clampedY = Math.min(Math.max(relativeY, 0), 1)

  const tiltAmount = 7
  const nextTiltX = `${(0.5 - clampedY) * tiltAmount}deg`
  const nextTiltY = `${(clampedX - 0.5) * tiltAmount}deg`
  const nextGlow = `${clampedX * 100}% ${clampedY * 100}%`

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }

  animationFrame.value = requestAnimationFrame(() => {
    tiltX.value = nextTiltX
    tiltY.value = nextTiltY
    tiltScale.value = '1.03'
    glowPosition.value = nextGlow
  })
}

const handlePointerLeave = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }

  if (!isVisible.value) {
    tiltScale.value = '0.94'
    tiltX.value = '0deg'
    tiltY.value = '0deg'
    glowPosition.value = '50% 35%'
  } else {
    resetTilt()
  }
}

const handleFocus = () => {
  if (motionReduced.value) return
  tiltScale.value = '1.02'
  glowPosition.value = '50% 28%'
}

const observeVisibility = () => {
  if (!badgeRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          if (visibilityTimer) {
            window.clearTimeout(visibilityTimer)
          }

          visibilityTimer = window.setTimeout(() => {
            isVisible.value = true
            resetTilt()
            visibilityTimer = null
          }, props.delay)
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  observer.observe(badgeRef.value)
}

onMounted(() => {
  observeVisibility()
})

onBeforeUnmount(() => {
  if (observer && badgeRef.value) {
    observer.unobserve(badgeRef.value)
    observer.disconnect()
  }

  if (visibilityTimer) {
    window.clearTimeout(visibilityTimer)
  }

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<style scoped>
.astro-card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --tilt-scale: 0.94;
  --glow-position: 50% 35%;
  position: relative;
  background: var(--card-backdrop);
  opacity: 0;
  transform: translateY(32px) perspective(960px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale));
  transition:
    transform 0.55s var(--ease-cosmic),
    opacity 0.55s var(--ease-cosmic),
    box-shadow 0.55s var(--ease-cosmic),
    border-color 0.35s ease;
  box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.08);
}

.astro-card--visible {
  opacity: 1;
  transform: translateY(0) perspective(960px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale));
}

.astro-card:hover,
.astro-card:focus-visible {
  border-color: hsla(var(--amethyst), 0.45);
  box-shadow:
    inset 0 1px 0 hsla(0, 0%, 100%, 0.18),
    0 24px 65px hsla(var(--amethyst), 0.2);
}

.astro-card__border,
.astro-card__glow,
.astro-card__sheen {
  position: absolute;
  inset: 0;
  border-radius: 1.75rem;
  pointer-events: none;
  transition: opacity 0.45s var(--ease-cosmic), transform 0.6s var(--ease-cosmic);
  opacity: 0;
}

.astro-card__border {
  border: 1px solid transparent;
  background: var(--gradient-accent) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.astro-card__glow {
  background: radial-gradient(120% 120% at var(--glow-position), hsla(var(--amethyst), 0.28), rgba(14, 7, 29, 0) 70%);
}

.astro-card__sheen {
  border-radius: 1.65rem;
  background: var(--gloss-specular);
  transform: translateX(-120%);
}

.astro-card:hover .astro-card__border,
.astro-card:focus-visible .astro-card__border,
.astro-card:hover .astro-card__glow,
.astro-card:focus-visible .astro-card__glow {
  opacity: 1;
}

.astro-card:hover .astro-card__sheen,
.astro-card:focus-visible .astro-card__sheen {
  opacity: 1;
  transform: translateX(0%);
}

@media (prefers-reduced-motion: reduce) {
  .astro-card {
    transition: opacity 0.4s ease, border-color 0.3s ease;
    transform: translateY(24px);
  }

  .astro-card--visible {
    transform: translateY(0);
  }
}
</style>
