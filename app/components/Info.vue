<template>
  <section class="min-h-[85vh] flex flex-col justify-center items-center text-center relative">
    <!-- Glow blobs -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/20 dark:bg-amber-600/15 rounded-full blur-[160px] -z-10 pointer-events-none"></div>
    <div class="absolute top-1/2 right-0 w-64 h-64 bg-orange-400/10 dark:bg-orange-400/8 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

    <div class="max-w-3xl space-y-6 animate-fade-in-up">

      <!-- Main Heading -->
      <h1 class="text-5xl font-bold tracking-tight leading-[1.5]">
        <span class="text-gradient md:text-7xl">MiqayelPetrosyan</span><br/>
        <span class="text-slate-900 dark:text-white md:text-6xl ">Fullstack developer</span>
      </h1>

      <!-- Sub -->
      <p class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        A passionate Full Stack Web Developer crafting modern, scalable, and user-centric digital experiences.
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap justify-center gap-4 pt-4">
        <a href="#portfolio"
           class="group px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 flex items-center gap-2">
          View Portfolio
          <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#contacts"
           class="px-8 py-3.5 rounded-xl border border-amber-400/30 dark:border-amber-400/20 bg-amber-50/50 dark:bg-amber-400/5 text-slate-800 dark:text-amber-100 font-semibold hover:border-amber-400/60 dark:hover:border-amber-400/40 transition-all">
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.9s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
<script setup lang="ts">
</script>