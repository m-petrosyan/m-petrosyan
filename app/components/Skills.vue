<script setup>
const skills = [
  { name: 'HTML 5', icon: 'vscode-icons:file-type-html' },
  { name: 'CSS 3', icon: 'vscode-icons:file-type-css' },
  { name: 'JavaScript', icon: 'vscode-icons:file-type-js-official' },
  { name: 'PHP', icon: 'logos:php' },
  { name: 'C#', icon: 'vscode-icons:file-type-csharp2' },
  { name: '.NET', icon: 'logos:dotnet' },
  { name: 'SQL', icon: 'vscode-icons:file-type-sql' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Vuex', icon: 'material-icon-theme:vuex-store' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Livewire', icon: 'simple-icons:livewire', color: 'text-pink-500' },
  { name: 'Inertia.js', icon: 'simple-icons:inertia', color: 'text-purple-500' },
  { name: 'Alpine.js', icon: 'logos:alpinejs-icon' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Bootstrap', icon: 'logos:bootstrap' },
  { name: 'Git', icon: 'logos:git-icon' },
  { name: 'Telegram Bot', icon: 'logos:telegram' }
]
</script>

<template>
  <section class="py-10">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">My <span class="text-gradient">Skills</span></h2>
      <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        A diverse set of tools and technologies I use to build robust and scalable applications.
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div v-for="skill in skills" :key="skill.name"
           class="glass-card p-6 flex flex-col items-center justify-center gap-3 group cursor-default">
        <div class="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 group-hover:scale-110 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-all duration-300">
          <Icon :name="skill.icon"
                class="w-8 h-8 transition-all"
                :class="skill.color || (skill.icon.includes('logos') || skill.icon.includes('vscode') ? '' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary-500')" />
        </div>
        <span class="font-medium text-sm text-slate-800 dark:text-slate-200">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>