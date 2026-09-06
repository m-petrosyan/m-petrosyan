<div align="center">

<!-- HEADER WAVE -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Miqayel%20Petrosyan&fontSize=44&fontColor=ffffff&animation=twinkling&fontAlignY=36&desc=Full%20Stack%20Developer&descAlignY=57&descSize=18&descColor=aaaacc" width="100%"/>

<!-- TYPING ANIMATION -->
<a href="https://mpetrosyan.info">
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=58A6FF&center=true&vCenter=true&width=520&lines=Full+Stack+Web+Developer;Building+with+Laravel+%26+PHP;Working+with+Vue+3+%26+Nuxt;Telegram+Bot+%26+Mini+App+developer;Learning+C%23+%26+.NET+Core;Coding+clean+%26+functional+apps" alt="Typing SVG" />
</a>
<br/>
<br/>
</div>

---

##  About Me

```php
<?php

class Developer
{
    public function getName(): string
    {
        return "Mikayel Petrosyan";
    }

    public function getGitHub(): string
    {
        return "github.com/m-petrosyan";
    }

    public function getLocation(): string
    {
        return "Yerevan, Armenia";
    }

    public function getStack(): array
    {
        return [
            "PHP", "Laravel", "Filament", "Livewire",
            "Vue 3", "Nuxt", "Inertia.js",
            "Node.js", "Nest.js",
            "Redis", "MySQL","PostgreSQL",
        ];
    }
}
```

---

##  Tech Stack

**Backend**

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Filament](https://img.shields.io/badge/Filament-f59e0b?style=for-the-badge&logo=laravel&logoColor=white)
![Livewire](https://img.shields.io/badge/Livewire-FB70A9?style=for-the-badge&logo=livewire&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)

**Frontend**

![Vue.js](https://img.shields.io/badge/Vue_3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=for-the-badge&logo=alpine.js&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD700?style=for-the-badge&logo=pinia&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Database & Tools**

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


---

## Featured Projects

<div align="center">

<a href="https://t.me/BotSheriffBot">
  <img src="app/assets/images/projects/sheriffbot.jpg" width="20%" alt="SheriffBot" />
</a>
&nbsp;
<a href="https://rocker.am">
  <img src="app/assets/images/projects/rocker.jpg" width="20%" alt="Rocker.am" />
</a>
&nbsp;
<a href="https://chromewebstore.google.com/detail/volume-max-sound-booster/kncgnhjkalclfiiffejefdjcmdgbcbfm">
  <img src="app/assets/images/projects/volumemax.jpg" width="20%" alt="Volume Max" />
</a>
&nbsp;
<a href="https://rentall.am"> 
  <img src="app/assets/images/projects/rentall.jpg" width="20%" alt="Rentall" />
</a>


</div>

---

##  CV Page (`/cv`) & auto PDF

The site has an editable **CV page at `/cv`** — press **Edit CV** on the page, change any field (profile, summary, experience, skills, languages, education, certifications) and every change is saved automatically to [`data/cv.json`](data/cv.json).

On every save the page also **regenerates `public/cv.pdf` automatically** (A4, print-friendly) and uploads it through the built-in API (`PUT /api/cv`, `PUT /api/cv/pdf`), so the “Download CV” links always serve the latest version.

> Note: generated `cv.pdf` is rendered from the browser (html2canvas + jspdf) — the “Download CV” button triggers it on first edit. The old one-page PDF in `public/cv.pdf` is kept until you edit.

**Securing edits (optional):** by default the edit API is open. To lock it, set the `CV_EDIT_KEY` environment variable on the server (e.g. in the pm2 ecosystem file). When set, the Edit dialog asks for that key before saving.

> If saving fails in production, make sure the server process (pm2 user) can write to `data/` and `public/`.


<!-- FOOTER WAVE -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>
