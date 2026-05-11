<template>
  <section class="py-10">
    <div class="glass-card max-w-4xl mx-auto p-8 md:p-12 relative overflow-hidden">
      <!-- Glow -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex flex-col items-center text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Let's work <span class="text-gradient">together</span></h2>
        <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
          I'm currently available for freelance work and new opportunities. If you have a project that needs some creative touch, I'd love to hear about it.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-14 h-14 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <Icon name="lucide:mail" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <a href="mailto:contact@example.com" class="text-slate-800 dark:text-slate-200 font-medium hover:text-primary-500 transition-colors">contact@example.com</a>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 group">
            <div class="w-14 h-14 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <Icon name="lucide:map-pin" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Location</p>
              <p class="text-slate-800 dark:text-slate-200 font-medium">Available Worldwide</p>
            </div>
          </div>
        </div>
          
        <div class="flex items-center gap-4 pt-10">
          <a href="#" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:github" class="w-6 h-6" />
          </a>
          <a href="#" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:linkedin" class="w-6 h-6" />
          </a>
          <a href="#" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:telegram" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
