<template>
  <section class="min-h-[80vh] flex flex-col justify-center items-center text-center relative mt-10">
    <!-- Background glow effect -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

    <div class="space-y-6 max-w-3xl animate-fade-in-up">
      <div class="inline-block px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 backdrop-blur-sm">
        👋 Welcome to my portfolio
      </div>
      
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Hi, I'm <span class="text-gradient">Miqayel Petrosyan</span>
      </h1>
      
      <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        A passionate Full Stack Web Developer crafting modern, scalable, and user-centric digital experiences.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <a href="#portfolio" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2">
          View Portfolio <Icon name="lucide:arrow-right" class="w-5 h-5" />
        </a>
        <a href="#contacts" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 text-slate-800 dark:text-white font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80">
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
