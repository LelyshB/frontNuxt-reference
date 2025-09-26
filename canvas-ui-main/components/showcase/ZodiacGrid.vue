<template>
  <section class="mx-auto mt-20 w-full max-w-6xl px-4">
    <div class="text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.4em] text-text-muted">Interaction showcase</p>
      <h2 class="mt-4 font-heading text-4xl text-white md:text-5xl">Nuxt recreation of the cosmic UI</h2>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
        Scroll to watch each badge assemble itself with a staggered reveal, then hover to experience the glossy shimmer and
        parallax tilt. All behaviour mirrors the original React implementation.
      </p>
    </div>

    <div class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      <CosmicCard
        v-for="(card, index) in cards"
        :key="card.title"
        :ref="(el: Element | null) => setCardRef(el, index)"
        v-bind="card"
        class="opacity-0 translate-y-8"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue'

import CosmicCard from './CosmicCard.vue'

type CardInfo = {
  title: string
  subtitle: string
  description: string
  icon: string
  accent: string
}

const cards: CardInfo[] = [
  {
    title: 'Aries',
    subtitle: 'Cardinal Fire',
    description: 'Ignite bold beginnings and channel unstoppable drive into your next mission.',
    icon: '♈︎',
    accent: 'hsl(var(--rose))'
  },
  {
    title: 'Taurus',
    subtitle: 'Fixed Earth',
    description: 'Savour grounded abundance while building something timeless and tangible.',
    icon: '♉︎',
    accent: 'hsl(var(--amber))'
  },
  {
    title: 'Gemini',
    subtitle: 'Mutable Air',
    description: 'Spin dual perspectives into one dazzling narrative that keeps minds in orbit.',
    icon: '♊︎',
    accent: 'hsl(var(--mint))'
  },
  {
    title: 'Cancer',
    subtitle: 'Cardinal Water',
    description: 'Lead with intuition and weave safe harbours for the people closest to your heart.',
    icon: '♋︎',
    accent: 'hsl(var(--violet))'
  },
  {
    title: 'Leo',
    subtitle: 'Fixed Fire',
    description: 'Stage a radiant performance that leaves every audience basking in your glow.',
    icon: '♌︎',
    accent: 'hsl(var(--rose))'
  },
  {
    title: 'Virgo',
    subtitle: 'Mutable Earth',
    description: 'Refine cosmic details with surgical precision until the entire plan sings.',
    icon: '♍︎',
    accent: 'hsl(var(--mint))'
  }
]

const cardRefs = ref<HTMLElement[]>([])
const mediaQuery = ref<MediaQueryList | null>(null)
let observer: IntersectionObserver | null = null
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null
let prefersReducedMotion = true

const setCardRef = (element: Element | null, index: number) => {
  if (!(element instanceof HTMLElement)) return
  cardRefs.value[index] = element
}

onBeforeUpdate(() => {
  cardRefs.value = []
})

const disconnectObserver = () => {
  observer?.disconnect()
  observer = null
}

const hydrateCardsImmediately = () => {
  cardRefs.value.forEach((card) => {
    card.style.opacity = '1'
    card.style.transform = 'none'
    card.classList.remove('opacity-0', 'translate-y-8', 'animate-fade-in-up')
  })
}

onMounted(() => {
  if (typeof window === 'undefined') return

  mediaQuery.value = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = mediaQuery.value.matches

  mediaListener = (event: MediaQueryListEvent) => {
    prefersReducedMotion = event.matches
    if (prefersReducedMotion) {
      disconnectObserver()
      hydrateCardsImmediately()
    } else {
      initialiseObserver()
    }
  }

  if ('addEventListener' in mediaQuery.value) {
    mediaQuery.value.addEventListener('change', mediaListener)
  } else {
    mediaQuery.value.addListener(mediaListener)
  }

  if (prefersReducedMotion) {
    hydrateCardsImmediately()
  } else {
    initialiseObserver()
  }
})

const initialiseObserver = () => {
  disconnectObserver()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        const delay = target.dataset.enterDelay ?? '0ms'
        target.style.animationDelay = delay
        target.style.animationFillMode = 'both'
        target.classList.add('animate-fade-in-up')
        target.classList.remove('opacity-0', 'translate-y-8')
        observer?.unobserve(target)
      })
    },
    { threshold: 0.35, rootMargin: '0px 0px -10%' }
  )

  cardRefs.value.forEach((card, index) => {
    const delay = `${index * 140}ms`
    card.dataset.enterDelay = delay
    card.style.opacity = '0'
    card.style.transform = 'translateY(24px)'
    observer?.observe(card)
  })
}

onBeforeUnmount(() => {
  disconnectObserver()
  if (mediaQuery.value && mediaListener) {
    if ('removeEventListener' in mediaQuery.value) {
      mediaQuery.value.removeEventListener('change', mediaListener)
    } else {
      mediaQuery.value.removeListener(mediaListener)
    }
  }
})
</script>
