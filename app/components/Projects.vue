<script setup>
const projects = [
  {
    title: 'Rentall',
    description: 'A full-featured online store with a custom admin panel, payment gateway integration, and real-time inventory management.',
    tags: ['Vue.js', 'Laravel', 'Tailwind CSS', 'MySQL'],
    color: 'from-emerald-500 to-lime-500',
    link: '#'
  },
  {
    title: 'Telegram Management Bot',
    description: 'Advanced Telegram bot for community management with automated moderation, anti-spam, and role-based access.',
    tags: ['PHP', 'Telegram API', 'Laravel', 'Redis'],
    color: 'from-purple-500 to-pink-500',
    link: '#'
  },
  {
    title: 'Corporate Dashboard',
    description: 'Modern internal analytics dashboard with real-time data visualization, interactive charts, and exportable reports.',
    tags: ['Nuxt', '.NET', 'C#', 'SQL Server'],
    color: 'from-emerald-500 to-teal-500',
    link: '#'
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
        <div class="h-48 overflow-hidden relative">
          <!-- Placeholder background gradient for project image -->
          <div class="absolute inset-0 bg-gradient-to-br" :class="project.color"></div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-sm">
            <a :href="project.link" target="_blank" class="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:scale-105 transition-transform">
              View Project
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
                  class="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>