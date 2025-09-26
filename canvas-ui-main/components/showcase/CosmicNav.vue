<template>
  <header class="flex w-full justify-center pt-16">
    <nav
      class="glass-surface glass-hover flex items-center gap-1 rounded-full border border-white/10 bg-bg-900/70 px-2 py-2 shadow-glass backdrop-blur-2xl"
      aria-label="Cosmic navigation demo"
    >
      <button
        v-for="item in items"
        :key="item"
        type="button"
        class="nav-pill focus-cosmic"
      >
        <span class="relative z-10">{{ item }}</span>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
const items = [
  'Overview',
  'Readings',
  'Astro Tools',
  'Testimonials',
  'Pricing'
] as const
</script>
