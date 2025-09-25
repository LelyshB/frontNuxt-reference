<template>
  <section ref="sectionRef" class="astro-stage">
    <span class="astro-stage__glow" aria-hidden="true"></span>

    <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div class="space-y-3">
        <p class="astro-chip">live compatibility matrix</p>
        <h2 class="hero-title text-left text-3xl leading-tight md:text-5xl">
          Cards assemble from left to right as you enter the orbit
        </h2>
        <p class="max-w-xl text-sm text-text-muted md:text-base">
          Each tile inherits the gloss, gradients, and depth from the original React implementation. Scroll slowly to watch the grid stitch itself together in a deliberate cadence.
        </p>
      </div>
      <div class="flex flex-col gap-3 text-right text-sm text-text-muted">
        <div class="flex items-center justify-end gap-2">
          <div class="h-2 w-8 rounded-full bg-rose-soft/50"></div>
          <span>Assembly progress</span>
        </div>
        <div class="relative h-2 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div class="absolute inset-y-0 left-0 w-[74%] rounded-full bg-[linear-gradient(90deg,rgba(255,107,203,0.28),rgba(154,93,255,0.65))]"></div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="list">
      <article
        v-for="(tile, index) in tiles"
        :key="tile.title"
        :data-accent="tile.accent"
        :class="[
          'astro-tile',
          isVisible ? 'astro-tile--visible' : '',
          tile.size === 'lg' ? 'md:col-span-2 md:row-span-2' : tile.size === 'wide' ? 'md:col-span-2' : ''
        ]"
        :style="{ transitionDelay: `${index * 120}ms` }"
        role="listitem"
      >
        <component :is="tile.icon" class="h-6 w-6 text-[var(--tile-accent)]" />
        <div class="space-y-3">
          <p class="astro-tile__eyebrow">{{ tile.eyebrow }}</p>
          <h3 class="astro-tile__title">{{ tile.title }}</h3>
          <p class="astro-tile__copy">{{ tile.copy }}</p>
        </div>

        <div v-if="tile.type === 'compatibility'" class="mt-auto space-y-6">
          <div class="flex items-center gap-4">
            <div class="astro-avatar-ring">
              <span class="astro-avatar-initial">A</span>
            </div>
            <div class="astro-avatar-ring">
              <span class="astro-avatar-initial">S</span>
            </div>
            <div class="flex flex-col gap-1 text-left text-sm">
              <span class="font-heading font-semibold text-text-base">Cosmic link</span>
              <span class="text-text-muted">Gemini ☌ Aquarius</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted">
              <span>Soul resonance</span>
              <span>92%</span>
            </div>
            <div class="astro-meter">
              <div class="astro-meter__fill" style="width: 92%"></div>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted">
              <span>Element sync</span>
              <span>84%</span>
            </div>
            <div class="astro-meter">
              <div class="astro-meter__fill" style="width: 84%"></div>
            </div>
          </div>
        </div>

        <ul v-else-if="tile.list" class="mt-auto grid gap-2 text-sm text-text-muted/90">
          <li v-for="item in tile.list" :key="item" class="flex items-center gap-2">
            <ChevronRight class="h-4 w-4 text-[var(--tile-accent)]" />
            <span>{{ item }}</span>
          </li>
        </ul>

        <div v-else-if="tile.stats" class="mt-auto space-y-4">
          <div v-for="stat in tile.stats" :key="stat.label" class="space-y-2">
            <div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted">
              <span>{{ stat.label }}</span>
              <span>{{ stat.value }}</span>
            </div>
            <div class="astro-meter">
              <div class="astro-meter__fill" :style="{ width: stat.value }"></div>
            </div>
          </div>
        </div>

        <div v-else-if="tile.quote" class="mt-auto space-y-4">
          <p class="text-sm italic text-text-base/80">“{{ tile.quote }}”</p>
          <div class="flex items-center gap-3 text-xs text-text-muted">
            <Sparkles class="h-4 w-4 text-[var(--tile-accent)]" />
            <span>{{ tile.attribution }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Atom, ChevronRight, Handshake, LineChart, MoonStar, Sparkles, Stars } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Tile {
  title: string
  eyebrow: string
  copy: string
  accent: 'rose' | 'violet' | 'teal'
  size?: 'lg' | 'wide'
  type?: 'compatibility'
  list?: string[]
  stats?: { label: string; value: string }[]
  quote?: string
  attribution?: string
  icon: Component
}

const tiles: Tile[] = [
  {
    title: 'Compatibility Atlas',
    eyebrow: 'Primary focus',
    copy: 'Watch the pair analysis tile lock in first, unlocking every other insight block in a cascading reveal.',
    accent: 'rose',
    size: 'lg',
    type: 'compatibility',
    icon: Handshake
  },
  {
    title: 'Energy Forecast',
    eyebrow: 'Daily cadence',
    copy: 'Seven-day alignment pulses generate a dynamic heat signature for relationship flow.',
    accent: 'violet',
    stats: [
      { label: 'Harmony', value: '78%' },
      { label: 'Momentum', value: '64%' }
    ],
    icon: LineChart
  },
  {
    title: 'Elemental Signatures',
    eyebrow: 'Element ratio',
    copy: 'Fire, air, water, and earth in perfect proportion—highlighting reactive hotspots instantly.',
    accent: 'teal',
    list: ['Live percentile breakdown', 'Element flux monitor', 'Auto-balancing tips'],
    icon: Atom
  },
  {
    title: 'Neural tarot cues',
    eyebrow: 'Tarot overlay',
    copy: 'Major arcana resonance paints shimmering overlays across the matrix, echoing the React original.',
    accent: 'rose',
    list: ['Gloss gradients preserved', 'Card tilt micro-motion', 'Interleaved hover bloom'],
    icon: Stars
  },
  {
    title: 'Phase locked-in',
    eyebrow: 'Lunar cadence',
    copy: 'Phase-synced compatibility spikes ensure the gloss sheen tracks with your scroll position.',
    accent: 'violet',
    quote: 'This Nuxt version carries the same cinematic polish—only faster.',
    attribution: 'Astrologer in residence',
    icon: MoonStar
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

const createObserver = () => {
  if (!sectionRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.4 }
  )

  observer.observe(sectionRef.value)
}

onMounted(() => {
  createObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
