<script setup>
import sheriffbot from '@/assets/images/projects/sheriffbot.jpg';
import Rentall from '@/assets/images/projects/rentall.jpg';
import AraxAlice from '@/assets/images/projects/arax.jpg';
import Rocker from '@/assets/images/projects/rocker.jpg';
import Volumemax from '@/assets/images/projects/volumemax.jpg';

const projects = [
  {
    title: 'SheriffBot',
    description: 'Telegram assistant for managing channels and groups. Features post scheduling with repeat options, anti-spam moderation, AI-powered chat summaries, analytics tracking, subscriber growth insights, and a visual content calendar.',
    tags: ['Html','Css','Js','Vue.js', 'Php','Laravel', 'Tailwind CSS', 'MySQL','Рedis', 'Telegram Bot API','Inertia.js'],
    image: sheriffbot,
    color: 'from-amber-600 to-orange-700',
    links: [
      { text: 'View Project', href: 'https://t.me/BotSheriffBot' },
    ]
  },
  {
    title: 'Rocker.am',
    description: 'Event platform with a website, Telegram bot, and mini app for discovering concerts and music events. Includes event listings, photo galleries, artist/band pages, and community updates.',
    tags: ['Html','Css','Js','Vue.js', 'Php','Laravel', 'Tailwind CSS', 'MySQL','Рedis', 'Telegram Bot API','Inertia.js'],
    image: Rocker,
    color: 'from-amber-500 to-orange-500',
    links: [
      { text: 'Website', href: 'https://rocker.am' },
      { text: 'Telegram bot', href: 'https://t.me/RockMetalEventsbot' }
    ]
  },
  {
    title: 'Rentall',
    description: 'Equipment rental platform for photo and video gear. Users can browse available equipment, view detailed information, and book rentals online for specific dates.',
    tags: ['Html','Css','Js','Vue.js', 'Vuex', 'Php','Laravel', 'Tailwind CSS', 'MySQL'],
    image: Rentall,
    color: 'from-amber-500 to-orange-500',
    links: [
      { text: 'View Project', href: 'https://rentall.am' },
    ]
  },
  {
    title: 'Volume Max – Sound Booster',
    description: 'Browser extension that enhances and controls tab audio with up to 500% volume boost. Features include global volume control, per-tab priority audio, customizable startup modes, and a modern privacy-focused interface for managing sound across multiple tabs.',
    tags: ['Html','Css','Js','Vue.js'],
    image: Volumemax,
    color: 'from-amber-500 to-orange-500',
    links: [
      { text: 'View Project', href: 'https://chromewebstore.google.com/detail/volume-max-sound-booster/kncgnhjkalclfiiffejefdjcmdgbcbfm' },
    ]
  },
  {
    title: 'AraxAlice',
    description: 'Personal portfolio website of artist and creature designer Araks, showcasing illustrations, sculptures, concept art, and imaginative creature designs, along with art direction and storytelling projects',
    tags: ['Html','Css','Js','Vue.js', 'Vuex', 'Php','Laravel', 'Tailwind CSS', 'MySQL'],
    image: AraxAlice,
    color: 'from-slate-600 to-slate-800',
    links: [
      { text: 'View Project', href: 'https://araxalice.com' },
    ]
  }
]
</script>

<template>
  <section class="py-10">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Featured <span class="text-gradient">Projects</span></h2>
      <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Here are a few of my recent works. Each project showcases my skills in full-stack development and modern UI design.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(project, index) in projects" :key="index"
           class="glass-card overflow-hidden group flex flex-col">

        <div class="h-52 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
          <div
            class="absolute inset-0 bg-gradient-to-br"
            :class="project.color || 'from-amber-500 to-orange-600'"
          ></div>

          <img
            v-if="project.image"
            :src="project.image"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
            @error="(e) => e.target.style.display = 'none'"
          />

          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/70 backdrop-blur-sm z-20">
            <a v-for="link in project.links" :key="link.text"
               :href="link.href" target="_blank"
               class="w-48 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-full font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm">
              {{ link.text }}
              <Icon name="lucide:external-link" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-white">{{ project.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-2 mt-auto">
            <span v-for="tag in project.tags" :key="tag"
                  class="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-700/30">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>