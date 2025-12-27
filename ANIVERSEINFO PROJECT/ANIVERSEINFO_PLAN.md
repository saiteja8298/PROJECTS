# AniVerseInfo Transformation Plan
## From Manhwa 3.O to AniVerseInfo

### Current Assets (Reusable)
| Existing Feature | Maps To AniVerseInfo | Action |
|-----------------|----------------------|--------|
| ReferManhwa.jsx | Browse Page (Anime/Manga/Manhwa) | Refactor & Expand |
| MangaDetails.jsx | Media Entity Pages | Enhance with tabs |
| History.jsx | User Watchlist/History | Keep & Polish |
| GenerateManhwa.jsx | AI Manhwa Ingestion | Rename & Refactor |
| Home.jsx | Landing Page | Redesign |
| Navbar.jsx | Navigation | Rebrand & Expand |
| BackgroundManager.jsx | Background System | Keep |
| csvParser.js | Data Ingestion | Expand |
| Dataset folder | Media Database | Restructure |

---

## Phase 1: Rebranding & Core Structure (Week 1)
- [ ] Rename project name from "Akatsuki Chronicles" to "AniVerseInfo"
- [ ] Update Navbar with new branding and navigation structure
- [ ] Create new folder structure for scalability
- [ ] Update routing to match PRD URL patterns
- [ ] Add Browse page with category tabs (Anime/Manga/Manhwa)

## Phase 2: Media Entity Pages (Week 2)
- [ ] Enhance MangaDetails to EntityPage with:
  - Hero section with cover, title, synopsis
  - Metadata tabs (Info, Characters, Episodes/Chapters, Reviews)
  - Structured data (JSON-LD) for SEO
  - Related content recommendations
- [ ] Add separate routes: /anime/:slug, /manga/:slug, /manhwa/:slug

## Phase 3: Search & Filters (Week 2-3)
- [ ] Implement advanced search with autocomplete
- [ ] Add filter sidebar (Genre, Year, Status, Rating, Type)
- [ ] Create SearchResults page
- [ ] Add search to navbar

## Phase 4: Ratings & Reviews (Week 3)
- [ ] Add rating system (1-10 scale)
- [ ] Create ReviewCard component
- [ ] Implement review submission
- [ ] Display aggregate ratings

## Phase 5: User Accounts (Week 4)
- [ ] Create auth context
- [ ] Add Login/Register pages
- [ ] User profile page
- [ ] Watchlist/Favorites

## Phase 6: Admin & AI Features (Week 5)
- [ ] Refactor GenerateManhwa to AI Content submission
- [ ] Add content labeling (AI-generated badge)
- [ ] Create moderation queue (admin)

---

## New Folder Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── media/
│   │   ├── MediaCard.jsx
│   │   ├── MediaGrid.jsx
│   │   ├── EntityHero.jsx
│   │   └── RatingBadge.jsx
│   ├── reviews/
│   │   ├── ReviewCard.jsx
│   │   └── ReviewForm.jsx
│   └── filters/
│       ├── FilterSidebar.jsx
│       └── GenreTag.jsx
├── pages/
│   ├── Home.jsx
│   ├── Browse.jsx (replaces ReferManhwa)
│   ├── Search.jsx
│   ├── EntityPage.jsx (anime/manga/manhwa details)
│   ├── History.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Submit.jsx (AI content submission)
├── contexts/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useSearch.js
│   └── useLocalStorage.js
├── services/
│   ├── api.js
│   └── mediaService.js
├── data/
│   ├── genres.js
│   └── mockData.js
├── styles/
│   └── (existing + new)
└── utils/
    ├── csvParser.js
    ├── seoHelpers.js
    └── formatters.js
```

## New Routes (PRD Aligned)
```javascript
// App.jsx routes
<Route path="/" element={<Home />} />
<Route path="/browse" element={<Browse />} />
<Route path="/browse/:type" element={<Browse />} /> // anime, manga, manhwa
<Route path="/search" element={<Search />} />
<Route path="/anime/:slug" element={<EntityPage type="anime" />} />
<Route path="/manga/:slug" element={<EntityPage type="manga" />} />
<Route path="/manhwa/:slug" element={<EntityPage type="manhwa" />} />
<Route path="/character/:slug" element={<CharacterPage />} />
<Route path="/history" element={<History />} />
<Route path="/profile" element={<Profile />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/submit" element={<Submit />} />
<Route path="/about" element={<About />} />
```

## Priority Order
1. ✅ Phase 1: Rebranding (Start Now)
2. 🔜 Phase 2: Entity Pages
3. 🔜 Phase 3: Search & Filters
4. 📅 Phase 4: Ratings
5. 📅 Phase 5: Users
6. 📅 Phase 6: AI Features
