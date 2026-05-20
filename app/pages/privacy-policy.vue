<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 14C9 11.239 11.239 9 14 9C16.761 9 19 11.239 19 14C19 16.761 16.761 19 14 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
          </svg>
        </div>
        <span class="badge">Privacy Policy</span>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="hero">
          <p class="effective-date">Effective date: {{ effectiveDate }}</p>
          <h1 class="title">Privacy Policy</h1>
          <p class="subtitle">
            This policy applies to all Chrome extensions developed and published by
            <strong>{{ developerName }}</strong>
          </p>
        </div>

        <nav class="toc">
          <p class="toc-label">Contents</p>
          <ul class="toc-list">
            <li v-for="(section, index) in sections" :key="index">
              <a :href="`#section-${index}`" class="toc-link">
                <span class="toc-num">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="sections">
          <section
              v-for="(section, index) in sections"
              :key="index"
              :id="`section-${index}`"
              class="section"
          >
            <div class="section-header">
              <span class="section-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <h2 class="section-title">{{ section.title }}</h2>
            </div>
            <div class="section-body">
              <p v-for="(para, pIndex) in section.paragraphs" :key="pIndex" class="para">
                {{ para }}
              </p>
              <ul v-if="section.items" class="item-list">
                <li v-for="(item, iIndex) in section.items" :key="iIndex" class="item">
                  <span class="item-dot" aria-hidden="true"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div class="contact-card">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/>
              <path d="M2 7L10 12L18 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <p class="contact-title">Questions about this policy?</p>
            <a :href="`mailto:${contactEmail}`" class="contact-email">{{ contactEmail }}</a>
          </div>
        </div>

        <footer class="footer">
          <p>© {{ currentYear }} {{ developerName }}. All extensions. All rights reserved.</p>
          <p class="footer-note">Last updated: {{ effectiveDate }}</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const developerName = 'Miqayel Petrosyan'
const contactEmail = 'miqayelpetrosyan@email.com'

const effectiveDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const currentYear = new Date().getFullYear()

const sections = [
  {
    title: 'Overview',
    paragraphs: [
      'This Privacy Policy explains how our Chrome extensions handle your data. We are committed to transparency and protecting your privacy. This policy covers all extensions published under this developer account.',
    ],
  },
  {
    title: 'Data we do not collect',
    paragraphs: [
      'Our extensions do not collect, transmit, sell, or share any personal data. Specifically, we do not collect:',
    ],
    items: [
      'Browsing history or visited URLs',
      'Personally identifiable information (name, email, IP address)',
      'Usage analytics or telemetry',
      'Any data from your device or browser',
    ],
  },
  {
    title: 'Data stored locally',
    paragraphs: [
      'Some extensions store configuration data — such as domain lists or user preferences — locally on your device using Chrome\'s built-in storage APIs (chrome.storage.local and chrome.storage.sync).',
      'This data never leaves your devices unless you explicitly use Chrome Sync, in which case it is synced between your own Chrome profiles via Google\'s infrastructure — it is never sent to our servers.',
    ],
  },
  {
    title: 'Permissions',
    paragraphs: [
      'Our extensions request only the permissions strictly necessary for their functionality. No permission is used to monitor, record, or transmit your activity.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'Our extensions do not integrate with any third-party analytics, advertising, or tracking services. No external scripts, SDKs, or APIs are loaded at runtime.',
    ],
  },
  {
    title: 'Children\'s privacy',
    paragraphs: [
      'Our extensions are not directed at children under the age of 13, and we do not knowingly collect any information from children.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy from time to time. When we do, the effective date at the top of this page will be revised. Continued use of any extension after changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'If you have any questions or concerns about this Privacy Policy, please contact us at the email address listed below.',
    ],
  },
]
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  min-height: 100vh;
  background: #f8f7f4;
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #1a1916;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(248, 247, 244, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e0ddd6;
}

.header-inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1a1916;
}

.logo-text {
  font-family: 'Courier New', monospace;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.badge {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b6860;
  border: 1px solid #c8c5be;
  padding: 4px 10px;
  border-radius: 20px;
}

.main { padding: 0 2rem 6rem; }

.container {
  max-width: 760px;
  margin: 0 auto;
}

.hero {
  padding: 5rem 0 3rem;
  border-bottom: 1px solid #e0ddd6;
}

.effective-date {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9b9890;
  margin-bottom: 1.25rem;
}

.title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #0f0e0c;
}

.subtitle {
  font-size: 17px;
  line-height: 1.75;
  color: #4a4843;
  max-width: 580px;
}

.subtitle strong {
  color: #1a1916;
  font-weight: 600;
}

.toc {
  padding: 2.5rem 0;
  border-bottom: 1px solid #e0ddd6;
}

.toc-label {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9b9890;
  margin-bottom: 1.25rem;
}

.toc-list {
  list-style: none;
  columns: 2;
  gap: 0;
}

@media (max-width: 520px) { .toc-list { columns: 1; } }

.toc-link {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 6px 0;
  font-size: 14px;
  color: #4a4843;
  text-decoration: none;
  transition: color 0.15s;
}

.toc-link:hover { color: #0f0e0c; }

.toc-num {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #b0ada6;
  flex-shrink: 0;
}

.sections { padding: 1rem 0; }

.section {
  padding: 3rem 0;
  border-bottom: 1px solid #e0ddd6;
  scroll-margin-top: 80px;
}

.section:last-child { border-bottom: none; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 1.25rem;
}

.section-num {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #b0ada6;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.35rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #0f0e0c;
}

.section-body { padding-left: calc(16px + 12px + 1em); }

.para {
  font-size: 16px;
  line-height: 1.8;
  color: #3d3c39;
  margin-bottom: 1rem;
}

.para:last-child { margin-bottom: 0; }

.item-list {
  list-style: none;
  margin-top: 1rem;
}

.item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 5px 0;
  font-size: 15px;
  line-height: 1.7;
  color: #3d3c39;
}

.item-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #b0ada6;
  flex-shrink: 0;
  position: relative;
  top: -3px;
}

.contact-card {
  margin: 2rem 0 3rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e0ddd6;
  border-radius: 12px;
}

.contact-icon {
  width: 44px;
  height: 44px;
  background: #f0ede6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #6b6860;
}

.contact-title {
  font-size: 13px;
  color: #9b9890;
  margin-bottom: 4px;
}

.contact-email {
  font-family: 'Courier New', monospace;
  font-size: 15px;
  color: #1a1916;
  text-decoration: none;
  border-bottom: 1px solid #c8c5be;
  transition: border-color 0.15s;
}

.contact-email:hover { border-color: #1a1916; }

.footer {
  padding: 2rem 0;
  border-top: 1px solid #e0ddd6;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #9b9890;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>