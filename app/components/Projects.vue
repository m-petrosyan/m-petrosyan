<script setup>
import sheriffbot from '@/assets/images/projects/sheriffbot.jpg';
import Rentall from '@/assets/images/projects/rentall.jpg';
import AraxAlice from '@/assets/images/projects/arax.jpg';

const projects = [
  {
    title: 'SheriffBot',
    description: 'Admin bot/miniapp anti-spam, scheduler, stats & chat summary. Clean interface. Just add me as admin!',
    tags: ['Html','Css','Js','Vue.js', 'Php','Laravel', 'Tailwind CSS', 'MySQL','Рedis', 'Telegram Bot API','Inertia.js'],
    image: sheriffbot,
    color: 'from-amber-600 to-orange-700',
    link: 'https://t.me/BotSheriffBot'
  },
  {
    title: 'Rentall',
    description: 'A full-featured rental platform with a custom admin panel, payment gateway integration, and real-time inventory management.',
    tags: ['Html','Css','Js','Vue.js', 'Vuex', 'Php','Laravel', 'Tailwind CSS', 'MySQL'],
    image: Rentall,
    color: 'from-amber-500 to-orange-500',
    link: 'https://rentall.am'
  },
  {
    title: 'AraxAlice',
    description: 'Modern internal analytics dashboard with real-time data visualization, interactive charts, and exportable reports.',
    tags: ['Html','Css','Js','Vue.js', 'Vuex', 'Php','Laravel', 'Tailwind CSS', 'MySQL'],
    image: AraxAlice,
    color: 'from-slate-600 to-slate-800',
    link: 'https://araxalice.com'
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

        <!-- Project Image / Fallback Gradient -->
        <div class="h-52 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
          <!-- Fallback gradient is ALWAYS behind the image -->
          <div
            class="absolute inset-0 bg-gradient-to-br"
            :class="project.color || 'from-amber-500 to-orange-600'"
          ></div>

          <!-- Real image on top -->
          <img
            v-if="project.image"
            :src="project.image"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
            @error="(e) => e.target.style.display = 'none'"
          />

          <!-- Hover overlay -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-sm z-20">
            <a :href="project.link" target="_blank"
               class="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-full font-bold transition-all hover:scale-105 flex items-center gap-2">
              View Project
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