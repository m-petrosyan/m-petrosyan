<script setup lang="ts">
const props = defineProps<{
  cv: any
  open: boolean
  needsKey: boolean
}>()
const emit = defineEmits<{
  close: []
  'save-now': []
}>()

const key = ref(typeof window !== 'undefined' ? sessionStorage.getItem('cv-edit-key') || '' : '')
const keyError = ref(false)
const hasKey = computed(() => !props.needsKey || !!key.value)

watch(() => props.open, (o) => {
  if (o) keyError.value = false
})

function syncLines (arr: any[], text: string) {
  arr.splice(0, arr.length, ...text.split('\n'))
}
function onLines (e: Event, arr: any[]) {
  syncLines(arr, (e.target as HTMLTextAreaElement).value)
}

function storeKey () {
  sessionStorage.setItem('cv-edit-key', key.value)
  keyError.value = false
}
function removeEntry (list: any[], index: number) {
  list.splice(index, 1)
}
function addEntry (list: any[], item: any) {
  list.push(item)
}
function addSkillGroup () {
  props.cv.skills.push({ group: 'New group', items: [] })
}
function removeSkillGroup (i: number) {
  props.cv.skills.splice(i, 1)
}

const emptySkill = () => ({ group: '', items: [] })
</script>

<template>
  <Teleport to="body">
    <Transition name="cv-modal">
      <div v-if="open" class="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/75 backdrop-blur-sm py-6 px-4"
           @click.self="emit('close')">
        <div class="w-full max-w-3xl rounded-2xl border border-[#232b3a] bg-[#0e131d] shadow-2xl my-auto">

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#1e2430]">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <Icon name="lucide:pencil" class="w-4 h-4 text-[#f5c542]" />
                Edit CV
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">Changes save automatically and regenerate <span class="text-slate-200">cv.pdf</span>.</p>
            </div>
            <div class="flex items-center gap-2">
              <a :href="`/cv.pdf?v=${Date.now()}`" download
                 class="text-xs font-semibold px-3 py-2 rounded-lg border border-[#f5c542]/40 text-[#f5c542] hover:bg-[#f5c542]/10 transition">
                Download cv.pdf
              </a>
              <button @click="emit('close')" class="p-2 rounded-lg hover:bg-white/10 transition text-slate-300" aria-label="Close">
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Auth -->
          <div v-if="needsKey && !hasKey" class="mx-6 mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <p class="text-sm text-amber-200 mb-2">This page is protected. Enter the CV edit key to unlock editing.</p>
            <div class="flex gap-2">
              <input v-model="key" type="password" placeholder="Edit key"
                     class="flex-1 rounded-lg border border-[#232b3a] bg-[#0b0f17] px-3 py-2 text-sm text-white outline-none focus:border-[#f5c542]/60" />
              <button @click="storeKey"
                      class="px-4 py-2 rounded-lg bg-[#f5c542] text-slate-900 text-sm font-bold hover:bg-[#ffd75e] transition">
                Unlock
              </button>
            </div>
            <p v-if="keyError" class="text-xs text-rose-400 mt-2">Wrong key.</p>
          </div>

          <div class="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto" :class="{ 'opacity-40 pointer-events-none select-none': needsKey && !hasKey }">

            <!-- Basics -->
            <section class="space-y-3">
              <h4 class="cv-ed-label">Profile</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="cv-ed-field">
                  <span>Full name</span>
                  <input v-model="cv.basics.name" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Title</span>
                  <input v-model="cv.basics.title" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Badge (status)</span>
                  <input v-model="cv.basics.roleBadge" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Location</span>
                  <input v-model="cv.basics.location" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Email</span>
                  <input v-model="cv.basics.email" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Phone</span>
                  <input v-model="cv.basics.phone" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Website</span>
                  <input v-model="cv.basics.website" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>GitHub</span>
                  <input v-model="cv.basics.github" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>LinkedIn</span>
                  <input v-model="cv.basics.linkedin" type="text" />
                </label>
                <label class="cv-ed-field">
                  <span>Telegram</span>
                  <input v-model="cv.basics.telegram" type="text" />
                </label>
              </div>
              <label class="cv-ed-field">
                <span>Summary (one paragraph per line)</span>
                <textarea :value="cv.basics.summary?.join('\n')" rows="3" @input="onLines($event, cv.basics.summary)" />
              </label>
              <label class="cv-ed-field">
                <span>Key highlights (one per line)</span>
                <textarea :value="cv.basics.highlights?.join('\n')" rows="5" @input="onLines($event, cv.basics.highlights)" />
              </label>
            </section>

            <!-- Experience -->
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="cv-ed-label !mb-0">Experience</h4>
                <button @click="addEntry(cv.experience, { role: 'New role', company: 'Company', period: '20XX – Present', bullets: ['Describe what you did.'], stack: 'Your stack' })"
                        class="cv-ed-add">+ Add position</button>
              </div>
              <div v-for="(job, i) in cv.experience" :key="i" class="cv-ed-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-[#f5c542] uppercase tracking-wider">Position {{ i + 1 }}</span>
                  <button @click="removeEntry(cv.experience, i)" class="cv-ed-remove">Remove</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label class="cv-ed-field"><span>Role</span><input v-model="job.role" type="text" /></label>
                  <label class="cv-ed-field"><span>Company</span><input v-model="job.company" type="text" /></label>
                  <label class="cv-ed-field"><span>Period</span><input v-model="job.period" type="text" /></label>
                </div>
                <label class="cv-ed-field">
                  <span>Bullets (one per line)</span>
                  <textarea :value="job.bullets?.join('\n')" rows="4" @input="onLines($event, job.bullets)" />
                </label>
                <label class="cv-ed-field">
                  <span>Stack</span>
                  <input v-model="job.stack" type="text" />
                </label>
              </div>
            </section>

            <!-- Skills -->
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="cv-ed-label !mb-0">Skills</h4>
                <button @click="cv.skills.push(emptySkill())" class="cv-ed-add">+ Add group</button>
              </div>
              <div v-for="(g, i) in cv.skills" :key="i" class="cv-ed-card">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-[#f5c542] uppercase tracking-wider">Group {{ i + 1 }}</span>
                  <button @click="removeSkillGroup(i)" class="cv-ed-remove">Remove group</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  <label class="cv-ed-field"><span>Group name</span><input v-model="g.group" type="text" /></label>
                  <label class="cv-ed-field sm:col-span-2">
                    <span>Skills (one per line)</span>
                    <textarea :value="g.items?.join('\n')" rows="3" @input="onLines($event, g.items)" />
                  </label>
                </div>
              </div>
            </section>

            <!-- Languages -->
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="cv-ed-label !mb-0">Languages</h4>
                <button @click="addEntry(cv.languages, { name: 'Language', proficiency: 'Level' })" class="cv-ed-add">+ Add language</button>
              </div>
              <div v-for="(l, i) in cv.languages" :key="i" class="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                <label class="cv-ed-field !mb-0"><input v-model="l.name" type="text" placeholder="Language" /></label>
                <label class="cv-ed-field !mb-0"><input v-model="l.proficiency" type="text" placeholder="Level" /></label>
                <button @click="removeEntry(cv.languages, i)" class="cv-ed-remove">Remove</button>
              </div>
            </section>

            <!-- Education -->
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="cv-ed-label !mb-0">Education</h4>
                <button @click="addEntry(cv.education, { title: 'Degree / course', place: 'Institution', period: '20XX – 20XX' })" class="cv-ed-add">+ Add</button>
              </div>
              <p v-if="!cv.education.length" class="text-xs text-slate-500 italic">Nothing added yet — press “+ Add”.</p>
              <div v-for="(ed, i) in cv.education" :key="i" class="grid grid-cols-1 sm:grid-cols-[1fr_1fr_0.7fr_auto] gap-3 items-center">
                <label class="cv-ed-field !mb-0"><input v-model="ed.title" type="text" placeholder="Degree / course" /></label>
                <label class="cv-ed-field !mb-0"><input v-model="ed.place" type="text" placeholder="Institution" /></label>
                <label class="cv-ed-field !mb-0"><input v-model="ed.period" type="text" placeholder="Period" /></label>
                <button @click="removeEntry(cv.education, i)" class="cv-ed-remove">Remove</button>
              </div>
            </section>

            <!-- Certifications -->
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="cv-ed-label !mb-0">Certifications</h4>
                <button @click="addEntry(cv.certifications, { title: 'Certification', place: 'Issuer', period: '20XX' })" class="cv-ed-add">+ Add</button>
              </div>
              <p v-if="!cv.certifications.length" class="text-xs text-slate-500 italic">Nothing added yet — press “+ Add”.</p>
              <div v-for="(c, i) in cv.certifications" :key="i" class="grid grid-cols-1 sm:grid-cols-[1fr_1fr_0.7fr_auto] gap-3 items-center">
                <label class="cv-ed-field !mb-0"><input v-model="c.title" type="text" placeholder="Certification" /></label>
                <label class="cv-ed-field !mb-0"><input v-model="c.place" type="text" placeholder="Issuer" /></label>
                <label class="cv-ed-field !mb-0"><input v-model="c.period" type="text" placeholder="Year" /></label>
                <button @click="removeEntry(cv.certifications, i)" class="cv-ed-remove">Remove</button>
              </div>
            </section>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-[#1e2430] flex items-center justify-between gap-3">
            <button @click="emit('close')" class="px-4 py-2 text-sm text-slate-300 hover:text-white transition">Done</button>
            <button @click="emit('save-now')" class="px-5 py-2 rounded-xl bg-[#f5c542] hover:bg-[#ffd75e] text-slate-900 text-sm font-bold transition flex items-center gap-2">
              <Icon name="lucide:save" class="w-4 h-4" />
              Save & update PDF
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cv-ed-label {
  @apply text-xs font-bold uppercase tracking-wider text-[#f5c542] mb-3 block;
}
.cv-ed-field { @apply block mb-3; }
.cv-ed-field > span {
  @apply block text-[11px] font-medium text-slate-400 mb-1;
}
.cv-ed-field input, .cv-ed-field textarea {
  @apply w-full rounded-lg border border-[#232b3a] bg-[#0b0f17] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 resize-y;
}
.cv-ed-field input:focus, .cv-ed-field textarea:focus {
  @apply border-[#f5c542]/60 ring-1 ring-[#f5c542]/30;
}
.cv-ed-card {
  @apply border border-[#1e2430] rounded-xl p-4 bg-[#0b0f17]/60;
}
.cv-ed-add {
  @apply text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#f5c542]/40 text-[#f5c542] hover:bg-[#f5c542]/10 transition;
}
.cv-ed-remove {
  @apply text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2 py-1 rounded-md transition;
}
.cv-modal-enter-active, .cv-modal-leave-active { transition: opacity 0.2s ease; }
.cv-modal-enter-from, .cv-modal-leave-to { opacity: 0; }
</style>
