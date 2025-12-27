<div align="center">

# 🌟 AniVerseInfo 🌟

### ✨ Your Ultimate Anime, Manga & Manhwa Database ✨

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with Love">
  <img src="https://img.shields.io/badge/Made%20in-🇮🇳%20India-orange?style=for-the-badge" alt="Made in India">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/Anime-15000+-purple?style=flat-square" alt="Anime Count">
</p>

<br>

```
    ╔═══════════════════════════════════════════════════════════╗
    ║  🎬 ANIME  •  📖 MANGA  •  📚 MANHWA  •  ⭐ RATINGS      ║
    ║                                                           ║
    ║     The Most Comprehensive Asian Media Database           ║
    ╚═══════════════════════════════════════════════════════════╝
```

<br>

[🌐 Live Demo](#) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [💖 Support](#-support)

</div>

---

<br>

## 🎯 About The Project

<img align="right" width="400" src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" alt="Anime GIF">

**AniVerseInfo** is a stunning, feature-rich web application that serves as your ultimate companion for discovering and exploring:

- 🎬 **15,000+** Anime titles with detailed information
- 📖 **Manga** collection with ratings & synopsis
- 📚 **Manhwa** (Korean comics) database
- ⭐ **Community ratings** and user reviews

Think of it as the **IMDb for Anime** - but better, prettier, and made with ❤️ in India!

<br clear="right"/>

---

## 🌟 Features

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful UI/UX**
- 🌙 Stunning dark theme design
- 🎭 Smooth animations & transitions
- 📱 Fully responsive (mobile-first)
- ✨ Modern glassmorphism effects

</td>
<td width="50%">

### 🔍 **Powerful Search**
- ⚡ Lightning-fast search
- 🏷️ Filter by genre, year, rating
- 📊 Sort by popularity, score, members
- 🎯 Smart recommendations

</td>
</tr>
<tr>
<td width="50%">

### 📊 **Rich Data**
- 📈 Rank & popularity stats
- 👥 Member counts & favorites
- 🎬 Episodes, duration, source
- 🏢 Studios & producers info

</td>
<td width="50%">

### 💾 **Personal Features**
- ⭐ Rate your watched anime
- ❤️ Add to favorites
- 📜 Viewing history
- 🔖 Bookmarks & tracking

</td>
</tr>
</table>

---

## 🖼️ Screenshots

<div align="center">

| 🏠 Home Page | 📋 Entity Details |
|:---:|:---:|
| Hero carousel with 15+ rotating anime | Complete anime information display |
| ![Home](https://via.placeholder.com/400x250/1a1a2e/667eea?text=🏠+Home+Page) | ![Details](https://via.placeholder.com/400x250/1a1a2e/f093fb?text=📋+Details+Page) |

| 🔍 Browse & Search | 👤 About Page |
|:---:|:---:|
| Filter & discover new content | Creator information |
| ![Browse](https://via.placeholder.com/400x250/1a1a2e/4facfe?text=🔍+Browse+Page) | ![About](https://via.placeholder.com/400x250/1a1a2e/ff6b6b?text=👤+About+Page) |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Description | Badge |
|:---:|:---|:---:|
| ⚛️ **React 18** | UI Library | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) |
| ⚡ **Vite** | Build Tool | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| 🎨 **CSS3** | Styling | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) |
| 🛣️ **React Router** | Navigation | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) |
| 📊 **Large Datasets** | 15000+ Anime | ![Data](https://img.shields.io/badge/Data-15K+-green?style=flat) |
| 🌐 **JavaScript ES6+** | Language | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |

</div>

---

## 📁 Project Structure

```
📦 AniVerseInfo
├── 📂 public
│   └── 📂 Dataset           # Large anime/manga datasets (CSV)
│       ├── 📄 top_15000_anime.csv
│       ├── 📄 data.csv
│       └── 📂 [Anime Folders with covers]
├── 📂 src
│   ├── 📂 components        # Reusable UI components
│   │   └── 📄 Navbar.jsx
│   ├── 📂 pages             # Application pages
│   │   ├── 📄 Home.jsx      # 🏠 Landing page with carousel
│   │   ├── 📄 Browse.jsx    # 🔍 Browse & filter
│   │   ├── 📄 EntityPage.jsx # 📋 Detailed view
│   │   ├── 📄 History.jsx   # 📜 Viewing history
│   │   └── 📄 About.jsx     # 👤 About page
│   ├── 📂 services          # Data services
│   │   └── 📄 mediaService.js # 📊 Data loading & processing
│   ├── 📂 styles            # CSS stylesheets
│   │   ├── 📄 Home.css
│   │   ├── 📄 EntityPage.css
│   │   ├── 📄 About.css
│   │   └── 📄 ...
│   ├── 📄 App.jsx           # Main app component
│   └── 📄 main.jsx          # Entry point
├── 📄 package.json
├── 📄 vite.config.js
└── 📄 README.md             # 📖 You are here!
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- 📦 **Node.js** (v16 or higher)
- 📦 **npm** or **yarn**

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/aniverse-info.git

# 2️⃣ Navigate to project directory
cd aniverse-info

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm run dev

# 5️⃣ Open in browser 🎉
# http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 📊 Dataset Information

<div align="center">

| 📁 Dataset | 📈 Records | 📝 Description |
|:---|:---:|:---|
| `top_15000_anime.csv` | **15,000+** | Comprehensive anime data with ratings, studios, episodes |
| `data.csv` | **5,000+** | Manga & Manhwa collection |
| Cover Images | **1,000+** | High-quality anime cover images |

</div>

### Data Fields Available:

```yaml
🎬 Anime Data:
  - title, english_name, japanese_name
  - score, rank, popularity, favorites
  - episodes, duration, premiered
  - genres, themes, demographics
  - studios, producers, source
  - synopsis, age_rating
```

---

## ✨ Key Features Breakdown

<details>
<summary>🏠 <b>Home Page</b> (Click to expand)</summary>

- 🎠 **Hero Carousel** - Rotating showcase of 15 anime titles
- ⏱️ **Auto-advance** - Changes every 10 seconds
- 📊 **Stats Bar** - Live counts of anime, manga, manhwa
- 🏆 **Top Rated** - Grid of highest-rated titles
- 🎨 **Browse Cards** - Quick access to each category

</details>

<details>
<summary>📋 <b>Entity Page</b> (Click to expand)</summary>

- 🖼️ **Hero Section** - Beautiful backdrop with cover image
- 📊 **Stats Row** - Rank, popularity, members, favorites
- 📝 **Synopsis** - Full description of the anime
- 🏢 **Production** - Studios and producers
- 🏷️ **Genres & Themes** - Categorization tags
- ⭐ **User Rating** - Personal 1-10 rating system

</details>

<details>
<summary>🔍 <b>Browse Page</b> (Click to expand)</summary>

- 🔎 **Search** - Find by title, genre, or keyword
- 🎛️ **Filters** - Type, genre, year, rating
- 📑 **Sort Options** - Rating, popularity, A-Z, year
- 📱 **Responsive Grid** - Adapts to screen size

</details>

---

## 🎨 Color Palette

<div align="center">

| Color | Hex | Usage |
|:---:|:---:|:---|
| 🔴 Primary | `#E50914` | Buttons, accents |
| 🔵 Anime | `#667eea → #764ba2` | Anime badges |
| 🟣 Manga | `#f093fb → #f5576c` | Manga badges |
| 🔵 Manhwa | `#4facfe → #00f2fe` | Manhwa badges |
| ⚫ Background | `#0a0a0a` | Main background |
| ⬛ Card BG | `#0f0f0f` | Card backgrounds |

</div>

---

## 👨‍💻 Created By

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   👨‍💻  SAI TEJA AMBHILIGE                                    ║
║                                                              ║
║   📍  Hyderabad, India 🇮🇳                                   ║
║   📧  asaitejar@gmail.com                                    ║
║                                                              ║
║   🚀 Full Stack Developer | 🎬 Anime Enthusiast              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

<br>

<a href="mailto:asaitejar@gmail.com">
  <img src="https://img.shields.io/badge/Email-asaitejar%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
</a>

</div>

---

## 🤝 Contributing

Contributions are what make the open source community amazing! 🎉

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the Branch (`git push origin feature/AmazingFeature`)
5. 🎁 Open a Pull Request

---

## 📜 License

<div align="center">

Distributed under the **MIT License**. See `LICENSE` for more information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 💖 Support

<div align="center">

If you found this project helpful, please consider:

⭐ **Starring** this repository

🍴 **Forking** for your own use

📢 **Sharing** with friends

<br>

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🙏 Thank you for visiting AniVerseInfo!                    ║
║                                                               ║
║   Made with 💖 in Hyderabad, India 🇮🇳                        ║
║                                                               ║
║   "The best anime database you'll ever need!"                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

---

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/aniverse-info&type=Date)](https://star-history.com/#yourusername/aniverse-info&Date)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%">

**Built with ❤️ by [SAI TEJA AMBHILIGE](mailto:asaitejar@gmail.com) | 🇮🇳 India**

*© 2024 AniVerseInfo. All rights reserved.*

</div>
