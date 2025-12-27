// Anime image fallback URLs organized by title/theme
export const animeImages = {
  'solo-leveling': [
    'https://cdn.pixabay.com/photo/2023/02/28/03/42/anime-7818755_1280.jpg',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80'
  ],
  'naruto': [
    'https://cdn.pixabay.com/photo/2022/02/23/16/08/naruto-7030316_1280.jpg',
    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80'
  ],
  'one-piece': [
    'https://cdn.pixabay.com/photo/2021/12/15/18/33/anime-6874248_1280.jpg',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80'
  ],
  'preview': [
    'https://cdn.pixabay.com/photo/2023/02/28/03/42/anime-7818755_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/12/15/18/33/anime-6874248_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/02/23/16/08/naruto-7030316_1280.jpg'
  ],
  'history': [
    'https://cdn.pixabay.com/photo/2023/02/28/03/42/anime-7818755_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/02/23/16/08/naruto-7030316_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/12/15/18/33/anime-6874248_1280.jpg'
  ],
  'profile': [
    'https://cdn.pixabay.com/photo/2022/02/23/16/08/naruto-7030316_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/12/15/18/33/anime-6874248_1280.jpg'
  ]
};

// Helper function to get fallback image based on type
export const getFallbackImage = (type, index = 0) => {
  const images = animeImages[type] || animeImages['solo-leveling'];
  return images[index % images.length];
};

