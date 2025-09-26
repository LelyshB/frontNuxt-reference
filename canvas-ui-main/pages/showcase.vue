<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-bg-950 via-[#0d0a19] to-[#05030b] text-white">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--violet)/0.25),transparent_55%)]" />
    <div class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col pb-24">
      <CosmicNav />

      <main class="flex-1 px-6">
        <section class="mx-auto mt-24 max-w-3xl text-center">
          <h1 class="font-heading text-5xl leading-tight md:text-6xl">Pixel-perfect Nuxt recreation</h1>
          <p class="mt-6 text-base leading-relaxed text-text-muted">
            The navigation underline that stretches from the centre, the staggered build-in of astro tiles, and the glossy
            shimmer with 3D tilt — all rebuilt with Vue 3 + Nuxt 3, Tailwind CSS and the same animation primitives.
          </p>
        </section>

        <ZodiacGrid />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import CosmicNav from '~/components/showcase/CosmicNav.vue'
import ZodiacGrid from '~/components/showcase/ZodiacGrid.vue'
</script>

