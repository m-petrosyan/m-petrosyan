<script setup>
useHead({
  title: 'Miqayel Petrosyan | Full Stack Developer',
  meta: [
    { name: 'description', content: 'Portfolio of Miqayel Petrosyan, a passionate Full Stack Developer specializing in Vue.js, Laravel, and modern web technologies.' }
  ]
})
</script>

<template>
  <div class="min-h-screen selection:bg-primary-500/30">
    <Navbar />

    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
      <Info id="cv" />
      <Skills id="skills" />
      <Projects id="portfolio" />
      <Contact id="contacts" />
    </main>

    <Footer />
  </div>
</template>

<style>
/* Smooth scroll behavior for the whole page is defined in main.css */
</style>
