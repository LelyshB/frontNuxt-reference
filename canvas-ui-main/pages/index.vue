<template>
  <div>
    <AppHeader />
    
    <main>
      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Background Effects -->
        <StarfieldCanvas />
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-[18%] left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet/35 via-rose/20 to-aurora-teal/30 blur-[140px] opacity-80"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(155,92,255,0.12),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(63,224,197,0.08),transparent_60%)]"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 container mx-auto px-6 text-center">
          <div class="mx-auto flex max-w-4xl flex-col items-center gap-10">
            <!-- Animated Badge -->
            <div class="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-starlight shadow-[0_18px_40px_rgba(7,6,11,0.45)]">
              <span class="absolute inset-0 rounded-full bg-gradient-to-r from-white/15 via-white/5 to-transparent opacity-70 blur-xl" aria-hidden="true"></span>
              <span class="relative flex items-center gap-2">
                <IconSparkles :size="16" class="text-starlight" />
                Your Cosmic Blueprint
              </span>
            </div>

            <!-- Main Headline -->
            <h1 class="font-heading text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Unlock Your <span class="gradient-hero">Cosmic</span> Destiny
            </h1>

            <!-- Subtitle -->
            <p class="text-lg text-text-muted md:text-xl lg:text-2xl">
              Discover the ancient wisdom of the stars with personalized astrology readings that illuminate your path forward.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <NuxtLink
                to="/astro"
                class="btn-cosmic text-base sm:text-lg"
              >
                Start Your Journey
                <IconSparkles :size="18" />
              </NuxtLink>
              <button
                @click="scrollToExplore"
                class="relative inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-text-base transition-all duration-300 hover:border-rose/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950"
              >
                Explore Services
                <IconChevronDown :size="20" />
              </button>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-starlight/80">
          <IconChevronDown :size="28" />
        </div>
      </section>
      
      <!-- Teaser Sections -->
      <ZodiacTeaser />
      <TarotTeaser />
      <CompatibilityTeaser />
      
      <!-- Full Zodiac Guide Section -->
      <section class="py-32 relative">
        <div class="container mx-auto px-6">
          <SectionHeader
            subtitle="Complete Astrological Guide"
            title="All Zodiac Signs"
            description="Dive deep into the characteristics, traits, and cosmic influences of each zodiac sign."
            titleGradient
            className="mb-20"
          />
          
          <!-- Zodiac Grid -->
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ZodiacBadge
              v-for="(sign, index) in zodiacSigns"
              :key="sign.name"
              :name="sign.name"
              :dateRange="sign.dateRange"
              :iconName="sign.iconName"
              :description="sign.description"
              :delay="index * 100"
            />
          </div>
        </div>
      </section>
      
      <!-- Services Section -->
      <ServicesCarousel />
      
      <!-- CTA Section -->
      <section class="py-32">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <GlowCard className="text-center p-12" glowIntensity="high">
              <div class="space-y-6">
                <h2 class="font-heading font-bold text-4xl gradient-text">
                  Ready to Begin Your Journey?
                </h2>
                <p class="text-xl text-text-muted max-w-2xl mx-auto">
                  Let the cosmos guide you towards clarity, purpose, and profound understanding 
                  of your place in the universe.
                </p>
                <NuxtLink
                  to="/auth"
                  class="btn-cosmic inline-flex items-center gap-2 px-8 py-4 text-lg"
                >
                  Start Your Reading
                  <IconArrowRight :size="20" />
                </NuxtLink>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import IconSparkles from '~/components/Icon/Sparkles.vue'
import IconChevronDown from '~/components/Icon/ChevronDown.vue'
import IconArrowRight from '~/components/Icon/ArrowRight.vue'

const scrollToExplore = () => {
  const element = document.querySelector('#services')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const zodiacSigns = [
  { name: 'Aries', dateRange: 'Mar 21 - Apr 19', iconName: 'Flame', description: 'Bold and pioneering spirit' },
  { name: 'Taurus', dateRange: 'Apr 20 - May 20', iconName: 'Gem', description: 'Steady and reliable nature' },
  { name: 'Gemini', dateRange: 'May 21 - Jun 20', iconName: 'Twins', description: 'Curious and adaptable mind' },
  { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', iconName: 'Shell', description: 'Nurturing and intuitive soul' },
  { name: 'Leo', dateRange: 'Jul 23 - Aug 22', iconName: 'Crown', description: 'Confident and creative heart' },
  { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', iconName: 'Sparkles', description: 'Analytical and perfectionist approach' },
  { name: 'Libra', dateRange: 'Sep 23 - Oct 22', iconName: 'Scales', description: 'Harmonious and diplomatic essence' },
  { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', iconName: 'Zap', description: 'Intense and transformative power' },
  { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', iconName: 'Target', description: 'Adventurous and philosophical mind' },
  { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', iconName: 'Shield', description: 'Ambitious and disciplined approach' },
  { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', iconName: 'Wind', description: 'Innovative and humanitarian vision' },
  { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', iconName: 'Droplet', description: 'Compassionate and artistic soul' },
]

// Legacy React parallax effect not required; animations handled per-component

// SEO
useHead({
  title: 'Cosmic Astrology - Premium Astrology Readings',
  meta: [
    { name: 'description', content: 'Unlock your cosmic destiny with premium astrology readings. Expert astrologers provide personalized insights to guide your celestial journey.' },
    { name: 'keywords', content: 'astrology, horoscope, zodiac signs, birth chart, cosmic guidance, personalized readings' },
    { property: 'og:title', content: 'Cosmic Astrology - Premium Astrology Readings' },
    { property: 'og:description', content: 'Discover the profound wisdom written in the stars with our expert astrology services.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>