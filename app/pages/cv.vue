<script setup lang="ts">
useHead({
  title: 'CV — Miqayel Petrosyan',
  meta: [
    { name: 'description', content: 'Resume / CV of Miqayel Petrosyan, Full Stack Web Developer (PHP/Laravel, Vue 3/Nuxt, Telegram bots, browser extensions).' },
    { name: 'robots', content: 'index, follow' },
  ],
})

const { data: fetched } = await useFetch('/api/cv')

const defaultCv = () => ({
  basics: {
    name: 'Miqayel Petrosyan',
    title: 'Full Stack Web Developer',
    roleBadge: 'Open to freelance & new opportunities',
    location: 'Yerevan, Armenia',
    email: 'miqayelpetrosyan@gmail.com',
    phone: '+374 95 101 585',
    website: 'https://mpetrosyan.info',
    github: '',
    linkedin: '',
    telegram: '',
    summary: ['Full Stack Web Developer.'],
    highlights: [],
  },
  experience: [],
  skills: [],
  languages: [],
  education: [],
  certifications: [],
})

const cv = ref<any>(defaultCv())
watch(fetched, () => {
  if (fetched.value?.data) cv.value = JSON.parse(JSON.stringify(fetched.value.data))
}, { immediate: true })

function contactLink (url?: string) {
  if (!url) return '#'
  return url.startsWith('http') ? url : `https://${url}`
}

const year = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen bg-[#0b0f17] text-slate-300 selection:bg-[#f5c542]/30">
    <!-- subtle glows -->
    <div class="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#f5c542]/10 blur-[160px]"></div>
      <div class="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-[#f5c542]/5 blur-[120px]"></div>
    </div>

    <!-- Top bar -->
    <header class="relative z-10 border-b border-[#1e2430] bg-[#0b0f17]/80 backdrop-blur-md">
      <div class="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-3">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="grid place-items-center w-8 h-8 rounded-lg bg-[#f5c542] text-slate-900 font-extrabold text-sm group-hover:scale-105 transition-transform">M</span>
          <span class="font-bold text-white tracking-tight">Miqayel<span class="text-[#f5c542]">.</span></span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <NuxtLink to="/" class="text-slate-400 hover:text-white transition-colors">Portfolio</NuxtLink>
          <a href="/cv.pdf" download class="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="lucide:download" class="w-3.5 h-3.5" /> Download CV
          </a>
        </nav>
      </div>
    </header>

    <main class="relative z-[1] max-w-5xl mx-auto px-5 pt-16 pb-8">
      <!-- Hero -->
      <section class="text-center mb-20">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5c542]/25 bg-[#f5c542]/8 text-[#f5c542] text-xs font-semibold">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          {{ cv.basics.roleBadge }}
        </span>

        <h1 class="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">{{ cv.basics.name }}</h1>
        <p class="mt-3 text-lg md:text-xl text-slate-400">{{ cv.basics.title }}</p>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <a :href="`mailto:${cv.basics.email}`" class="flex items-center gap-2 hover:text-[#f5c542] transition-colors">
            <Icon name="lucide:mail" class="w-4 h-4" />{{ cv.basics.email }}
          </a>
          <a :href="`tel:${cv.basics.phone}`" class="flex items-center gap-2 hover:text-[#f5c542] transition-colors">
            <Icon name="lucide:phone" class="w-4 h-4" />{{ cv.basics.phone }}
          </a>
          <span class="flex items-center gap-2">
            <Icon name="lucide:map-pin" class="w-4 h-4" />{{ cv.basics.location }}
          </span>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/cv.pdf" download
             class="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#f5c542] hover:bg-[#ffd75e] text-slate-900 font-bold shadow-lg shadow-[#f5c542]/20 transition-all hover:shadow-[#f5c542]/30">
            <Icon name="lucide:download" class="w-5 h-5" />
            Download CV
          </a>
          <NuxtLink to="/#portfolio"
                    class="flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1e2430] hover:border-[#f5c542]/50 text-slate-200 font-semibold transition-all">
            Portfolio
            <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </section>

      <!-- Objective -->
      <section class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Objective
        </h2>
        <div class="space-y-4">
          <p v-for="(p, i) in cv.basics.summary" :key="'sp' + i" class="text-slate-300 leading-relaxed">{{ p }}</p>
        </div>
        <ul v-if="cv.basics.highlights?.length" class="mt-6 space-y-2.5 max-w-3xl">
          <li v-for="(h, i) in cv.basics.highlights" :key="'sh' + i" class="flex items-start gap-3">
            <Icon name="lucide:chevron-right" class="w-4 h-4 mt-1 shrink-0 text-[#f5c542]" />
            <span class="text-slate-300 leading-relaxed">{{ h }}</span>
          </li>
        </ul>
      </section>

      <!-- Experience -->
      <section class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Professional Experience
        </h2>

        <div v-if="cv.experience?.length" class="space-y-5">
          <article v-for="(job, i) in cv.experience" :key="'job' + i"
                   class="relative overflow-hidden rounded-2xl border border-[#1e2430] bg-[#0e131d] p-6 md:p-7 pl-7 md:pl-8">
            <span class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#f5c542] to-[#f5c542]/10"></span>
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 class="text-lg md:text-xl font-bold text-white">{{ job.role }}</h3>
                <p class="text-sm md:text-base font-medium text-[#f5c542] mt-0.5">{{ job.company }}</p>
              </div>
              <span v-if="job.period" class="rounded-full border border-[#1e2430] bg-[#0b0f17] px-3 py-1 text-xs text-slate-400">{{ job.period }}</span>
            </div>
            <ul v-if="job.bullets?.length" class="mt-4 space-y-2">
              <li v-for="(b, j) in job.bullets" :key="j" class="flex items-start gap-3">
                <span class="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c542]/70"></span>
                <span class="text-slate-300 leading-relaxed text-[15px]">{{ b }}</span>
              </li>
            </ul>
            <p v-if="job.stack" class="mt-4 text-[13px] text-slate-500">
              <span class="font-bold tracking-widest text-slate-300">STACK:</span> <span class="text-slate-400">{{ job.stack }}</span>
            </p>
          </article>
        </div>
        <p v-if="!cv.experience?.length" class="text-sm italic text-slate-500">Nothing here yet.</p>
      </section>

      <!-- Technical skills -->
      <section class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Technical Skills
        </h2>
        <div v-if="cv.skills?.length" class="space-y-6">
          <div v-for="(g, i) in cv.skills" :key="'skg' + i" :class="i > 0 ? 'pt-5 border-t border-[#151b26]' : ''">
            <p v-if="g.group" class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{{ g.group }}</p>
            <div class="flex flex-wrap gap-2.5">
              <span v-for="(s, j) in g.items" :key="j"
                    class="rounded-lg border border-[#1e2430] bg-[#0e131d] px-3.5 py-1.5 text-[13px] font-medium text-slate-200 transition-colors hover:border-[#f5c542]/40">
                {{ s }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Languages -->
      <section v-if="cv.languages?.length" class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Languages
        </h2>
        <div class="flex flex-wrap gap-3">
          <div v-for="(l, i) in cv.languages" :key="'lang' + i"
               class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3">
            <span class="text-white font-semibold">{{ l.name }}</span>
            <span class="h-1 w-1 rounded-full bg-[#f5c542]/60"></span>
            <span class="text-sm text-slate-400">{{ l.proficiency }}</span>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section v-if="cv.education?.length" class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Education
        </h2>
        <div class="space-y-3">
          <div v-for="(ed, i) in cv.education" :key="'edu' + i"
               class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-5 py-4">
            <div>
              <p class="text-white font-semibold">{{ ed.title }}</p>
              <p v-if="ed.place" class="text-sm text-slate-400 mt-0.5">{{ ed.place }}</p>
            </div>
            <span v-if="ed.period" class="text-sm text-slate-500">{{ ed.period }}</span>
          </div>
        </div>
      </section>

      <!-- Certifications -->
      <section v-if="cv.certifications?.length" class="mb-16">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Certifications
        </h2>
        <div class="space-y-3">
          <div v-for="(c, i) in cv.certifications" :key="'cert' + i"
               class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-5 py-4">
            <div>
              <p class="text-white font-semibold">{{ c.title }}</p>
              <p v-if="c.place" class="text-sm text-slate-400 mt-0.5">{{ c.place }}</p>
            </div>
            <span v-if="c.period" class="text-sm text-slate-500">{{ c.period }}</span>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="mb-10">
        <h2 class="mb-8 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#f5c542]">
          <span class="inline-block w-8 h-px bg-[#f5c542]/60"></span>Contact
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <a :href="`mailto:${cv.basics.email}`" class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3.5 hover:border-[#f5c542]/40 transition-colors group">
            <Icon name="lucide:mail" class="w-4 h-4 text-[#f5c542]" />
            <span class="min-w-0">
              <span class="block text-xs text-slate-500">Email</span>
              <span class="block text-sm text-slate-200 truncate">{{ cv.basics.email }}</span>
            </span>
          </a>
          <a :href="contactLink(cv.basics.website)" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3.5 hover:border-[#f5c542]/40 transition-colors group">
            <Icon name="lucide:globe" class="w-4 h-4 text-[#f5c542]" />
            <span class="min-w-0">
              <span class="block text-xs text-slate-500">Website</span>
              <span class="block text-sm text-slate-200 truncate">{{ (cv.basics.website || '').replace(/^https?:\/\//, '') }}</span>
            </span>
          </a>
          <a :href="contactLink(cv.basics.github)" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3.5 hover:border-[#f5c542]/40 transition-colors group">
            <Icon name="mdi:github" class="w-4 h-4 text-[#f5c542]" />
            <span class="min-w-0">
              <span class="block text-xs text-slate-500">GitHub</span>
              <span class="block text-sm text-slate-200 truncate">{{ (cv.basics.github || '').replace(/^https?:\/\//, '') }}</span>
            </span>
          </a>
          <a :href="contactLink(cv.basics.linkedin)" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3.5 hover:border-[#f5c542]/40 transition-colors group">
            <Icon name="mdi:linkedin" class="w-4 h-4 text-[#f5c542]" />
            <span class="min-w-0">
              <span class="block text-xs text-slate-500">LinkedIn</span>
              <span class="block text-sm text-slate-200 truncate">{{ (cv.basics.linkedin || '').replace(/^https?:\/\//, '') }}</span>
            </span>
          </a>
          <a :href="contactLink(cv.basics.telegram)" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-[#1e2430] bg-[#0e131d] px-4 py-3.5 hover:border-[#f5c542]/40 transition-colors group">
            <Icon name="mdi:telegram" class="w-4 h-4 text-[#f5c542]" />
            <span class="min-w-0">
              <span class="block text-xs text-slate-500">Telegram</span>
              <span class="block text-sm text-slate-200 truncate">{{ (cv.basics.telegram || '').replace(/^https?:\/\//, '') }}</span>
            </span>
          </a>
        </div>
      </section>
    </main>

    <footer class="relative z-[1] border-t border-[#151b26] py-7">
      <div class="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-slate-500">© {{ year }} Miqayel Petrosyan</p>
        <div class="flex items-center gap-5 text-sm">
          <a href="/cv.pdf" download class="text-slate-500 hover:text-[#f5c542] transition-colors">Download PDF</a>
          <NuxtLink to="/" class="text-slate-500 hover:text-[#f5c542] transition-colors">Portfolio</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
