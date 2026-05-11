<template>
  <section class="py-10">
    <div class="glass-card max-w-4xl mx-auto p-8 md:p-12 relative overflow-hidden">
      <!-- Glow -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-400/15 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex flex-col items-center text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Get in <span class="text-gradient">Touch</span></h2>
        <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
          I'm currently available for freelance work and new opportunities. Have a project in mind? Let's talk!
        </p>

        <div class="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center">
          <div class="flex flex-col items-center gap-3 group">
            <div class="w-14 h-14 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <Icon name="lucide:mail" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <a href="mailto:miqayelpetrosyan@gmail.com" class="text-slate-800 dark:text-slate-200 font-medium hover:text-primary-500 transition-colors">miqayelpetrosyan@gmail.com</a>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 group">
            <div class="w-14 h-14 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <Icon name="lucide:map-pin" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Location</p>
              <p class="text-slate-800 dark:text-slate-200 font-medium">Yerevan, Armenia</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 group">
            <div class="w-14 h-14 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <Icon name="lucide:phone" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Phone</p>
              <a href="tel:+37495101585" class="text-slate-800 dark:text-slate-200 font-medium hover:text-primary-500 transition-colors">+374 95 101 585</a>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 pt-10">
          <a href="https://github.com/m-petrosyan" target="_blank" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:github" class="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/miqayel-petrosyan-754349185" target="_blank" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:linkedin" class="w-6 h-6" />
          </a>
          <a href="https://t.me/mpetrosyan1" target="_blank" class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
            <Icon name="mdi:telegram" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
