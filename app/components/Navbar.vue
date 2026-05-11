<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const colorMode = useColorMode()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
import cvUrl from '@/assets/cv.pdf';

const menu = [
  { name: 'CV', href: cvUrl },
  { name: 'Skills', href: '#skills' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contacts', href: '#contacts' }
]

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="[isScrolled ? 'glass py-3' : 'bg-transparent py-5']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <a href="#" class="text-2xl font-bold tracking-tighter hover:scale-105 transition-transform duration-300">
        <span class="text-gradient">M</span>iqayel.
      </a>

      <nav class="hidden md:flex items-center gap-8">
        <a v-for="item in menu" :key="item.name" :href="item.href"
           class="text-sm font-medium hover:text-primary-500 transition-colors duration-200">
          {{ item.name }}
        </a>

        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Theme">
          <Icon v-if="$colorMode.value === 'dark'" name="lucide:sun" class="w-5 h-5 text-yellow-400" />
          <Icon v-else name="lucide:moon" class="w-5 h-5 text-slate-700" />
        </button>
      </nav>

      <div class="md:hidden flex items-center gap-4">
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <Icon v-if="$colorMode.value === 'dark'" name="lucide:sun" class="w-5 h-5 text-yellow-400" />
          <Icon v-else name="lucide:moon" class="w-5 h-5 text-slate-700" />
        </button>
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 text-slate-700 dark:text-slate-300">
          <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden glass absolute top-full left-0 right-0 border-t border-slate-200 dark:border-slate-800">
      <div class="flex flex-col py-4 px-4 space-y-4">
        <a v-for="item in menu" :key="item.name" :href="item.href" @click="isMobileMenuOpen = false"
           class="block px-4 py-2 text-base font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
          {{ item.name }}
        </a>
      </div>
    </div>
  </header>
</template>
