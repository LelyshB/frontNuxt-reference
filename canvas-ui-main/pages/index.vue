<template>
  <div class="min-h-screen bg-gradient-to-b from-bg-950 via-bg-900/90 to-bg-950">
    <AppHeader />

    <main class="relative pt-40 pb-32">
      <div class="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_top,rgba(154,93,255,0.38),transparent_65%)] blur-3xl"></div>
      <div class="absolute inset-x-0 bottom-32 -z-10 h-[420px] bg-[radial-gradient(circle_at_50%_80%,rgba(63,224,197,0.28),transparent_65%)] blur-3xl"></div>

      <section class="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
        <div class="hero-pill">
          <Sparkles class="h-4 w-4 text-rose-soft" />
          <span class="uppercase tracking-[0.35em] text-xs">Nuxt 4 showcase</span>
        </div>

        <h1 class="hero-title">
          Seamless cosmic insights, rebuilt for Vue &amp; Nuxt
        </h1>

        <p class="hero-subtitle max-w-3xl">
          Pixel-perfect recreation of the original React experience with elevated hover feedback, hypnotic gradients, and a compatibility module that assembles tile-by-tile as you scroll.
        </p>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink to="#astro" class="hero-cta focus-visible:focus-outline">
            Try the astro builder
            <ArrowUpRight class="h-4 w-4" />
          </NuxtLink>
          <button class="hero-pill focus-visible:focus-outline">
            <Orbit class="h-4 w-4 text-violet" />
            <span class="font-semibold text-text-base">Smooth scroll &amp; gloss</span>
          </button>
        </div>
      </section>

      <AstroAssembly id="astro" class="mt-24" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, Orbit, Sparkles } from 'lucide-vue-next'

useHead({
  title: 'Cosmic Nuxt Showcase',
  meta: [
    {
      name: 'description',
      content: 'Demonstration of Nuxt 4 + Tailwind v4 recreation with advanced hover and assembly animations.'
    }
  ]
})
</script>
