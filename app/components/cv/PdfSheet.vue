<script setup lang="ts">
// This sheet is never shown on screen — it is the pixel source for /cv.pdf.
defineProps<{ cv: any }>()
</script>

<template>
  <div id="cv-pdf-sheet" class="pdf-sheet" aria-hidden="true">
    <header class="pdf-head">
      <h1 class="pdf-name">{{ cv.basics.name }}</h1>
      <div class="pdf-title">{{ cv.basics.title }}</div>
      <div class="pdf-contacts">
        <span>{{ cv.basics.location }}</span>
        <span v-if="cv.basics.email">• {{ cv.basics.email }}</span>
        <span v-if="cv.basics.phone">• {{ cv.basics.phone }}</span>
        <span v-if="cv.basics.website">• {{ cv.basics.website.replace(/^https?:\/\//, '') }}</span>
      </div>
    </header>

    <section class="pdf-sec" v-if="cv.basics.summary?.length || cv.basics.highlights?.length">
      <h2 class="pdf-sec-title">Objective</h2>
      <p v-for="(p, i) in cv.basics.summary" :key="'s' + i" class="pdf-p">{{ p }}</p>
      <ul v-if="cv.basics.highlights?.length" class="pdf-ul">
        <li v-for="(h, i) in cv.basics.highlights" :key="'h' + i">{{ h }}</li>
      </ul>
    </section>

    <section class="pdf-sec" v-if="cv.experience?.length">
      <h2 class="pdf-sec-title">Professional Experience</h2>
      <article v-for="(job, i) in cv.experience" :key="'e' + i" class="pdf-job">
        <div class="pdf-job-head">
          <span class="pdf-role">{{ job.role }}</span>
          <span v-if="job.company" class="pdf-company">@ {{ job.company }}</span>
          <span v-if="job.period" class="pdf-period">· {{ job.period }}</span>
        </div>
        <ul class="pdf-ul" v-if="job.bullets?.length">
          <li v-for="(b, j) in job.bullets" :key="j">{{ b }}</li>
        </ul>
        <div v-if="job.stack" class="pdf-stack"><strong>Stack:</strong> {{ job.stack }}</div>
      </article>
    </section>

    <section class="pdf-sec" v-if="cv.skills?.length">
      <h2 class="pdf-sec-title">Technical Skills</h2>
      <div v-for="(g, i) in cv.skills" :key="'g' + i" class="pdf-skill-group">
        <span class="pdf-skill-label">{{ g.group }}:</span>
        <span v-for="(s, j) in g.items" :key="j" class="pdf-chip">{{ s }}</span>
      </div>
    </section>

    <section class="pdf-sec" v-if="cv.languages?.length">
      <h2 class="pdf-sec-title">Languages</h2>
      <div v-for="(l, i) in cv.languages" :key="'l' + i" class="pdf-lang">
        <span class="pdf-lang-name">{{ l.name }}</span>
        <span class="pdf-lang-level">{{ l.proficiency }}</span>
      </div>
    </section>

    <section class="pdf-sec" v-if="cv.education?.length">
      <h2 class="pdf-sec-title">Education</h2>
      <div v-for="(ed, i) in cv.education" :key="'ed' + i" class="pdf-row">
        <span class="pdf-row-title">{{ ed.title }}</span>
        <span v-if="ed.place" class="pdf-row-sub">{{ ed.place }}</span>
        <span v-if="ed.period" class="pdf-row-period">· {{ ed.period }}</span>
      </div>
    </section>

    <section class="pdf-sec" v-if="cv.certifications?.length">
      <h2 class="pdf-sec-title">Certifications</h2>
      <div v-for="(c, i) in cv.certifications" :key="'c' + i" class="pdf-row">
        <span class="pdf-row-title">{{ c.title }}</span>
        <span v-if="c.place" class="pdf-row-sub">{{ c.place }}</span>
        <span v-if="c.period" class="pdf-row-period">· {{ c.period }}</span>
      </div>
    </section>
  </div>
</template>

<style>
/* Print sheet used as the source for cv.pdf (A4 @ 96dpi => 794 x 1123 px) */
#cv-pdf-sheet {
  position: absolute;
  left: -120000px;
  top: 0;
  width: 794px;
  padding: 44px 48px 52px;
  background: #ffffff;
  color: #1f2937;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

#cv-pdf-sheet .pdf-head { margin-bottom: 14px; }
#cv-pdf-sheet .pdf-name {
  margin: 0 0 2px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #111827;
}
#cv-pdf-sheet .pdf-title {
  font-size: 11.5px;
  font-weight: 600;
  color: #b45309;
  letter-spacing: 0.3px;
  margin-bottom: 5px;
}
#cv-pdf-sheet .pdf-contacts {
  font-size: 9.5px;
  color: #4b5563;
  line-height: 1.6;
}
#cv-pdf-sheet .pdf-contacts span { margin-right: 1px; }

#cv-pdf-sheet .pdf-sec { margin-top: 13px; }
#cv-pdf-sheet .pdf-sec-title {
  margin: 0 0 7px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #b45309;
  border-bottom: 1.5px solid #e5e7eb;
  padding-bottom: 4px;
}
#cv-pdf-sheet .pdf-p {
  margin: 0 0 4px;
  font-size: 9.8px;
  line-height: 1.5;
  color: #374151;
}
#cv-pdf-sheet .pdf-ul { margin: 3px 0 0; padding: 0 0 0 14px; }
#cv-pdf-sheet .pdf-ul li {
  font-size: 9.8px;
  line-height: 1.5;
  color: #374151;
  margin: 0 0 2px;
  padding-left: 2px;
}

#cv-pdf-sheet .pdf-job { margin-bottom: 9px; break-inside: avoid; }
#cv-pdf-sheet .pdf-job-head { margin-bottom: 2px; line-height: 1.6; }
#cv-pdf-sheet .pdf-role { font-size: 11px; font-weight: 700; color: #111827; }
#cv-pdf-sheet .pdf-company { font-size: 10px; font-weight: 600; color: #b45309; }
#cv-pdf-sheet .pdf-period { font-size: 9px; color: #6b7280; }
#cv-pdf-sheet .pdf-job > .pdf-ul { margin-top: 2px; }
#cv-pdf-sheet .pdf-stack {
  margin-top: 3px;
  font-size: 8.8px;
  line-height: 1.5;
  color: #6b7280;
}
#cv-pdf-sheet .pdf-stack strong { color: #374151; }

#cv-pdf-sheet .pdf-skill-group { margin-bottom: 4px; line-height: 1.9; }
#cv-pdf-sheet .pdf-skill-label {
  font-size: 8.8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b45309;
  margin-right: 4px;
}
#cv-pdf-sheet .pdf-chip {
  display: inline-block;
  font-size: 8.6px;
  color: #374151;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0.5px 7px;
  margin: 0 3px 3px 0;
  white-space: nowrap;
}

#cv-pdf-sheet .pdf-lang { margin-bottom: 2px; font-size: 9.8px; color: #374151; }
#cv-pdf-sheet .pdf-lang-name { font-weight: 600; color: #111827; margin-right: 6px; }
#cv-pdf-sheet .pdf-lang-level { color: #6b7280; }  #cv-pdf-sheet .pdf-row { margin-bottom: 5px; line-height: 1.6; }
#cv-pdf-sheet .pdf-row-title {
  font-size: 9.8px;
  font-weight: 600;
  color: #111827;
  margin-right: 8px;
}
#cv-pdf-sheet .pdf-row-sub {
  font-size: 9px;
  color: #6b7280;
  margin-right: 8px;
}
#cv-pdf-sheet .pdf-row-period {
  font-size: 9px;
  color: #6b7280;
}
</style>
