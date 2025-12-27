// AniVerseInfo Media Service - ENHANCED with Top 15000 Anime Dataset
// Extracts rich anime data from multiple datasets

// In-memory cache
let cachedMedia = null;
let isLoading = false;
let loadPromise = null;

// Complete list of all local image folders
const LOCAL_FOLDERS = [
    'Akame_ga_Kill', 'Angel_Beats', 'Ano_Hi_Mita_Hana_no_Namae_wo_Bokutachi_wa_Mada_Shiranai',
    'Another', 'Ansatsu_Kyoushitsu', 'Ansatsu_Kyoushitsu_2nd_Season', 'Ao_no_Exorcist',
    'Bakemonogatari', 'Black_Clover', 'Bleach', 'Boku_dake_ga_Inai_Machi',
    'Boku_no_Hero_Academia', 'Boku_no_Hero_Academia_2nd_Season', 'Boku_no_Hero_Academia_3rd_Season',
    'Boku_no_Hero_Academia_4th_Season', 'Bungou_Stray_Dogs', 'Charlotte',
    'Chuunibyou_demo_Koi_ga_Shitai', 'Clannad', 'Clannad__After_Story',
    'Code_Geass__Hangyaku_no_Lelouch', 'Code_Geass__Hangyaku_no_Lelouch_R2', 'Cowboy_Bebop',
    'Darling_in_the_FranXX', 'Deadman_Wonderland', 'Death_Note', 'Death_Parade', 'Dr_Stone',
    'Dragon_Ball_Z', 'Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka', 'Durarara',
    'Elfen_Lied', 'Fairy_Tail', 'Fate_Zero', 'Fullmetal_Alchemist', 'Fullmetal_Alchemist__Brotherhood',
    'Guilty_Crown', 'Haikyuu', 'Haikyuu_Second_Season', 'Hataraku_Maou-sama', 'High_School_DxD',
    'Highschool_of_the_Dead', 'Howl_no_Ugoku_Shiro', 'Hunter_x_Hunter_2011', 'Hyouka',
    'JoJo_no_Kimyou_na_Bouken_TV', 'Jujutsu_Kaisen_TV', 'Kakegurui',
    'Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen', 'Kaichou_wa_Maid-sama',
    'Kill_la_Kill', 'Kimetsu_no_Yaiba', 'Kimi_no_Na_wa',
    'Kiseijuu__Sei_no_Kakuritsu', 'Koe_no_Katachi',
    'Kono_Subarashii_Sekai_ni_Shukufuku_wo', 'Kono_Subarashii_Sekai_ni_Shukufuku_wo_2',
    'Made_in_Abyss', 'Mirai_Nikki_TV',
    'Mob_Psycho_100', 'Mob_Psycho_100_II', 'Nanatsu_no_Taizai', 'Naruto',
    'Naruto__Shippuuden', 'Neon_Genesis_Evangelion', 'No_Game_No_Life',
    'Noragami', 'Noragami_Aragoto', 'One_Piece', 'One_Punch_Man', 'One_Punch_Man_2nd_Season',
    'Overlord', 'Owari_no_Seraph',
    'Psycho-Pass', 'Re_Zero_kara_Hajimeru_Isekai_Seikatsu',
    'Sakura-sou_no_Pet_na_Kanojo', 'Samurai_Champloo',
    'Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_wo_Minai',
    'Sen_to_Chihiro_no_Kamikakushi', 'Shigatsu_wa_Kimi_no_Uso',
    'Shingeki_no_Kyojin', 'Shingeki_no_Kyojin_Season_2', 'Shingeki_no_Kyojin_Season_3',
    'Shingeki_no_Kyojin_Season_3_Part_2', 'Shingeki_no_Kyojin__The_Final_Season',
    'Shokugeki_no_Souma', 'Soul_Eater', 'Steins_Gate',
    'Sword_Art_Online', 'Sword_Art_Online_II',
    'Tate_no_Yuusha_no_Nariagari', 'Tengen_Toppa_Gurren_Lagann',
    'Tensei_shitara_Slime_Datta_Ken', 'Tokyo_Ghoul', 'Tokyo_Ghoul_√A',
    'Toradora', 'Violet_Evergarden',
    'Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru',
    'Yakusoku_no_Neverland'
];

// Create a lookup map for faster matching
const folderLookup = new Map();
LOCAL_FOLDERS.forEach(folder => {
    const normalized = folder.toLowerCase().replace(/[^a-z0-9]/g, '');
    folderLookup.set(normalized, folder);
    if (normalized.length > 8) {
        folderLookup.set(normalized.slice(0, 8), folder);
    }
});

// Match title to local folder
const matchLocalFolder = (title) => {
    if (!title) return null;
    const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (folderLookup.has(normalized)) {
        return folderLookup.get(normalized);
    }

    for (const [key, folder] of folderLookup) {
        if (normalized.includes(key) || key.includes(normalized.slice(0, 10))) {
            return folder;
        }
    }

    const titleWords = normalized.slice(0, 15);
    for (const folder of LOCAL_FOLDERS) {
        const folderNorm = folder.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (folderNorm.startsWith(titleWords) || titleWords.startsWith(folderNorm.slice(0, 10))) {
            return folder;
        }
    }

    return null;
};

// Enhanced CSV Parser with quoted field support
const parseCSVLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
};

// Create slug
export const createSlug = (title) => {
    if (!title) return '';
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 50);
};

// Clean tags/genres from string or array
export const cleanTags = (tagString) => {
    if (!tagString) return [];
    if (Array.isArray(tagString)) return tagString;

    // Handle JSON-like arrays in strings
    let cleaned = tagString.replace(/[\[\]'"]/g, '');

    return cleaned
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 1 && t.length < 30)
        .slice(0, 10);
};

// Parse genres from the top_15000_anime format
const parseGenres = (genreString) => {
    if (!genreString) return [];
    return genreString
        .replace(/["]/g, '')
        .split(',')
        .map(g => g.trim())
        .filter(g => g.length > 0);
};

// Main loader with enhanced anime data
export async function loadAllMedia() {
    if (cachedMedia) {
        return cachedMedia;
    }

    if (isLoading && loadPromise) {
        return loadPromise;
    }

    isLoading = true;

    loadPromise = (async () => {
        try {
            const allMedia = [];
            const seenTitles = new Set();
            let id = 0;

            // ===========================================
            // LOAD TOP 15000 ANIME (Primary Rich Dataset)
            // ===========================================
            try {
                const response = await fetch('/Dataset/top_15000_anime.csv');
                const text = await response.text();
                const lines = text.split('\n');

                // Parse header to get column indices
                const header = parseCSVLine(lines[0]);
                const cols = {};
                header.forEach((h, i) => cols[h.trim()] = i);

                for (let i = 1; i < Math.min(lines.length, 8000); i++) {
                    const line = lines[i];
                    if (!line || line.length < 10) continue;

                    const values = parseCSVLine(line);
                    const originalTitle = values[cols['name']]?.trim();
                    const englishTitle = values[cols['english_name']]?.trim();

                    // Use English title as primary if available, otherwise use original
                    const title = (englishTitle && englishTitle !== 'Unknown' && englishTitle.length > 0)
                        ? englishTitle
                        : originalTitle;

                    if (!title || seenTitles.has(title.toLowerCase())) continue;
                    seenTitles.add(title.toLowerCase());
                    // Also track original title to avoid duplicates
                    if (originalTitle && originalTitle !== title) {
                        seenTitles.add(originalTitle.toLowerCase());
                    }

                    const folder = matchLocalFolder(originalTitle) || matchLocalFolder(title);
                    const localCover = folder ? `/Dataset/${folder}/${folder}_1.jpg` : '';
                    const externalCover = values[cols['image_url']]?.trim() || '';
                    const cover = localCover || externalCover;

                    const score = parseFloat(values[cols['score']]) || 0;
                    const rank = parseInt(values[cols['rank']]) || 0;
                    const popularity = parseInt(values[cols['popularity']]) || 0;
                    const favorites = parseInt(values[cols['favorites']]) || 0;
                    const scoredBy = parseInt(values[cols['scored_by']]) || 0;
                    const members = parseInt(values[cols['members']]) || 0;

                    // Parse premiered to extract year and season
                    const premiered = values[cols['premiered']]?.trim() || '';
                    const yearMatch = premiered.match(/\d{4}/);
                    const year = yearMatch ? yearMatch[0] : '';
                    const season = premiered.replace(/\d{4}/, '').trim();

                    allMedia.push({
                        id: `top-${id++}`,
                        animeId: values[cols['anime_id']]?.trim() || '',
                        title,
                        originalTitle: originalTitle || '',
                        englishTitle: englishTitle || '',
                        japaneseTitle: values[cols['japanese_names']]?.trim() || '',
                        description: (values[cols['synopsis']] || '').slice(0, 1000),
                        rating: score > 10 ? score / 10 : score,
                        score: score,
                        rank: rank,
                        popularity: popularity,
                        favorites: favorites,
                        scoredBy: scoredBy,
                        members: members,
                        year: year,
                        season: season,
                        premiered: premiered,
                        genres: parseGenres(values[cols['genres']]),
                        themes: parseGenres(values[cols['themes']]),
                        demographics: values[cols['demographics']]?.trim() || '',
                        tags: parseGenres(values[cols['genres']]),
                        type: values[cols['type']]?.trim() || 'TV',
                        episodes: values[cols['episodes']]?.trim() || '',
                        duration: values[cols['duration']]?.trim() || '',
                        ageRating: values[cols['rating']]?.trim() || '',
                        source: values[cols['source']]?.trim() || '',
                        studios: values[cols['studios']]?.trim() || '',
                        producers: values[cols['producers']]?.trim() || '',
                        cover,
                        externalCover,
                        hasCover: !!localCover || !!externalCover,
                        hasLocalCover: !!localCover,
                        mediaType: 'anime',
                        slug: createSlug(title),
                        url: values[cols['anime_url']]?.trim() || ''
                    });
                }

                console.log(`Loaded ${allMedia.length} from top_15000_anime.csv`);
            } catch (e) {
                console.warn('Could not load top_15000_anime.csv:', e.message);
            }

            // ===========================================
            // LOAD DATA.CSV (Manga/Manhwa data)
            // ===========================================
            try {
                const response = await fetch('/Dataset/data.csv');
                const text = await response.text();
                const lines = text.split('\n');

                for (let i = 1; i < Math.min(lines.length, 5000); i++) {
                    const line = lines[i];
                    if (!line || line.length < 5) continue;

                    const values = parseCSVLine(line);
                    if (values.length < 4 || !values[0]) continue;

                    const title = values[0].trim();
                    if (!title || seenTitles.has(title.toLowerCase())) continue;
                    seenTitles.add(title.toLowerCase());

                    const folder = matchLocalFolder(title);
                    const cover = folder ? `/Dataset/${folder}/${folder}_1.jpg` : '';
                    const rating = parseFloat(values[2]) || 0;

                    // Determine media type from tags
                    const tagStr = (values[4] || '').toLowerCase();
                    let mediaType = 'manga';
                    if (tagStr.includes('manhwa') || tagStr.includes('korean')) {
                        mediaType = 'manhwa';
                    } else if (tagStr.includes('anime')) {
                        mediaType = 'anime';
                    }

                    allMedia.push({
                        id: `m-${id++}`,
                        title,
                        description: (values[1] || '').slice(0, 500),
                        rating: rating > 10 ? rating / 10 : rating,
                        year: (values[3] || '').match(/\d{4}/)?.[0] || '',
                        tags: cleanTags(values[4]),
                        genres: cleanTags(values[4]),
                        cover,
                        hasCover: !!folder,
                        hasLocalCover: !!folder,
                        mediaType,
                        slug: createSlug(title),
                        members: 0,
                        type: mediaType === 'anime' ? 'TV' : 'Manga'
                    });
                }

                console.log(`Total items now: ${allMedia.length}`);
            } catch (e) {
                console.warn('Could not load data.csv:', e.message);
            }

            // ===========================================
            // SORT: Items with local covers FIRST, then external covers, then by rating
            // ===========================================
            allMedia.sort((a, b) => {
                // First priority: has local cover
                if (a.hasLocalCover && !b.hasLocalCover) return -1;
                if (!a.hasLocalCover && b.hasLocalCover) return 1;
                // Second priority: has any cover
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                // Third priority: rating
                return (b.rating || 0) - (a.rating || 0);
            });

            cachedMedia = allMedia;

            const withLocalCovers = allMedia.filter(m => m.hasLocalCover).length;
            const withAnyCovers = allMedia.filter(m => m.hasCover).length;
            const animeCount = allMedia.filter(m => m.mediaType === 'anime').length;
            const mangaCount = allMedia.filter(m => m.mediaType === 'manga').length;
            const manhwaCount = allMedia.filter(m => m.mediaType === 'manhwa').length;

            console.log(`Total: ${allMedia.length}, Local covers: ${withLocalCovers}, Any covers: ${withAnyCovers}`);
            console.log(`Anime: ${animeCount}, Manga: ${mangaCount}, Manhwa: ${manhwaCount}`);

            return allMedia;

        } catch (error) {
            console.error('Error loading media:', error);
            return [];
        } finally {
            isLoading = false;
        }
    })();

    return loadPromise;
}

// Filter by type
export function filterByType(mediaList, type) {
    if (!type || type === 'all') return mediaList;
    return mediaList.filter(item => item.mediaType === type);
}

// Search
export function searchMedia(mediaList, query) {
    if (!query || query.length < 2) return mediaList;
    const lowerQuery = query.toLowerCase();

    const withCovers = [];
    const withoutCovers = [];

    for (const item of mediaList) {
        if (withCovers.length + withoutCovers.length >= 100) break;

        const matchTitle = item.title.toLowerCase().includes(lowerQuery);
        const matchEnglish = item.englishTitle?.toLowerCase().includes(lowerQuery);
        const matchGenres = item.genres?.some(g => g.toLowerCase().includes(lowerQuery));

        if (matchTitle || matchEnglish || matchGenres) {
            if (item.hasCover) {
                withCovers.push(item);
            } else {
                withoutCovers.push(item);
            }
        }
    }

    return [...withCovers, ...withoutCovers].slice(0, 100);
}

// Sort
export function sortMedia(mediaList, sortBy = 'rating') {
    const sorted = [...mediaList];

    switch (sortBy) {
        case 'title':
            sorted.sort((a, b) => {
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                return a.title.localeCompare(b.title);
            });
            break;
        case 'year':
            sorted.sort((a, b) => {
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
            });
            break;
        case 'popularity':
            sorted.sort((a, b) => {
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                return (a.popularity || 999999) - (b.popularity || 999999);
            });
            break;
        case 'rank':
            sorted.sort((a, b) => {
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                return (a.rank || 999999) - (b.rank || 999999);
            });
            break;
        case 'members':
            sorted.sort((a, b) => {
                if (a.hasCover && !b.hasCover) return -1;
                if (!a.hasCover && b.hasCover) return 1;
                return (b.members || 0) - (a.members || 0);
            });
            break;
        case 'rating':
        default:
            // Already sorted by cover priority + rating
            break;
    }

    return sorted;
}

// Get stats
let cachedStats = null;
export function getMediaStats(mediaList) {
    if (cachedStats && cachedMedia === mediaList) return cachedStats;

    cachedStats = {
        total: mediaList.length,
        anime: mediaList.filter(m => m.mediaType === 'anime').length,
        manga: mediaList.filter(m => m.mediaType === 'manga').length,
        manhwa: mediaList.filter(m => m.mediaType === 'manhwa').length,
        withCovers: mediaList.filter(m => m.hasCover).length
    };

    return cachedStats;
}

// Get top rated
export function getTopRated(mediaList, limit = 10) {
    return mediaList.slice(0, limit);
}

// Get most popular (by member count or popularity rank)
export function getMostPopular(mediaList, limit = 10) {
    return [...mediaList]
        .sort((a, b) => {
            if (a.hasCover && !b.hasCover) return -1;
            if (!a.hasCover && b.hasCover) return 1;
            return (b.members || 0) - (a.members || 0);
        })
        .slice(0, limit);
}

// Get all genres from the data
export function getAllGenres(mediaList) {
    const genreCount = {};

    for (let i = 0; i < Math.min(mediaList.length, 5000); i++) {
        for (const genre of mediaList[i].genres || []) {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        }
    }

    return Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40)
        .map(([genre]) => genre);
}

// Get media by slug
export function getMediaBySlug(mediaList, slug) {
    return mediaList.find(item => item.slug === slug);
}

// Clear cache
export function clearCache() {
    cachedMedia = null;
    cachedStats = null;
    loadPromise = null;
}

export default {
    loadAllMedia,
    filterByType,
    searchMedia,
    sortMedia,
    getMediaStats,
    getTopRated,
    getMostPopular,
    getAllGenres,
    getMediaBySlug,
    cleanTags,
    createSlug,
    clearCache
};
