<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="isScrolled ? 'py-3 backdrop-blur-xl' : 'py-6'">
    <div class="mx-auto w-full max-w-6xl px-6">
      <nav class="glass-panel relative flex items-center justify-between overflow-hidden rounded-full px-6 py-4">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="group flex items-center gap-3">
            <div class="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-rose-soft/30 via-violet/35 to-aurora/30">
              <div class="absolute inset-0 rounded-full bg-white/10 blur-xl transition-opacity duration-500 group-hover:opacity-60"></div>
              <Sparkles class="relative h-5 w-5 text-rose-soft transition-transform duration-500 group-hover:scale-110 group-hover:text-rose-deep" />
            </div>
            <span class="font-heading text-xl font-semibold tracking-tight text-text-base">
              AstroCanvas
            </span>
          </NuxtLink>
        </div>

        <div class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="nav-pill"
          >
            <span>{{ item.label }}</span>
          </NuxtLink>
        </div>

        <div class="hidden items-center gap-3 lg:flex">
          <button class="hero-pill focus-visible:focus-outline">
            <Sparkles class="h-4 w-4 text-rose-soft" />
            <span class="font-semibold text-text-base">Live constellations</span>
          </button>
          <NuxtLink to="#astro" class="hero-cta focus-visible:focus-outline">
            Explore compatibility
            <ArrowUpRight class="h-4 w-4" />
          </NuxtLink>
        </div>

        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-base transition-colors duration-300 focus-visible:focus-outline lg:hidden"
          @click="toggleMenu"
        >
          <component :is="isMenuOpen ? X : Menu" class="h-5 w-5" />
        </button>
      </nav>

      <Transition
        enter-active-class="transition duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]"
        enter-from-class="-translate-y-4 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-3 opacity-0"
      >
        <div
          v-if="isMenuOpen"
          class="glass-panel mt-4 flex flex-col gap-3 rounded-3xl px-6 py-6 lg:hidden"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="nav-pill w-full justify-start"
            @click="closeMenu"
          >
            <span>{{ item.label }}</span>
          </NuxtLink>
          <NuxtLink to="#astro" class="hero-cta justify-center focus-visible:focus-outline" @click="closeMenu">
            Explore compatibility
            <ArrowUpRight class="h-4 w-4" />
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-vue-next'

const navItems = [
  { label: 'Forecast', href: '#forecast' },
  { label: 'Compatibility', href: '#astro' },
  { label: 'Tarot', href: '#tarot' },
  { label: 'Pricing', href: '#pricing' }
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
