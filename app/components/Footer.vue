<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 py-8 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-slate-600 dark:text-slate-400 text-sm">
        &copy; {{ new Date().getFullYear() }} Miqayel Petrosyan. All rights reserved.
      </div>
      <div class="flex items-center gap-4">
        <a href="#cv" class="text-sm text-slate-500 hover:text-primary-500 transition-colors">CV</a>
        <a href="#skills" class="text-sm text-slate-500 hover:text-primary-500 transition-colors">Skills</a>
        <a href="#portfolio" class="text-sm text-slate-500 hover:text-primary-500 transition-colors">Portfolio</a>
      </div>
    </div>
  </footer>
</template>
