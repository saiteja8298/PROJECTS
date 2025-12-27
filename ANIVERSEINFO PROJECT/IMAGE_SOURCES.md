# Anime Image Sources Reference

This document lists all the anime images used as fallbacks in the website, organized by section.

## 🎨 Image Sources by Title

### Solo Leveling
- **Primary**: `/images/solo-leveling.jpg` (local)
- **Fallback 1**: Pixabay anime image (Dark fantasy theme)
- **Fallback 2**: Unsplash placeholder

### Naruto
- **Primary**: `/images/naruto.jpg` (local)
- **Fallback 1**: Pixabay Naruto-themed image
- **Fallback 2**: Unsplash placeholder

### One Piece
- **Primary**: `/images/one-piece.jpg` (local)
- **Fallback 1**: Pixabay anime adventure theme
- **Fallback 2**: Unsplash placeholder

## 📍 Image Locations

### Home Page - Anime Gallery
- Solo Leveling card → Tries local, then Pixabay, then placeholder
- Naruto card → Tries local, then Pixabay, then placeholder
- One Piece card → Tries local, then Pixabay, then placeholder

### Refer Manhwa Page
- Preview images → Uses anime-themed fallbacks from Pixabay
- Inspiration gallery → Same as Home page gallery

### History Page
- History cards → Rotates through anime images based on item ID

### About Me Page
- Profile image → Uses anime-themed fallback

## 🔄 Fallback System

The website uses a **cascading fallback system**:

1. **First**: Tries to load local image from `/images/` directory
2. **Second**: Falls back to Pixabay anime images (free, high-quality)
3. **Third**: Uses Unsplash placeholders
4. **Final**: Shows styled placeholder with text

## 📝 Notes

- All fallback images are from **free sources** (Pixabay, Unsplash)
- Images are automatically rotated/cycled if one fails to load
- The system gracefully handles missing images without breaking the layout
- All images maintain the dark anime theme aesthetic

## 🎯 Recommended: Adding Your Own Images

For best results, download anime wallpapers from:
- **Pixabay**: https://pixabay.com/images/search/anime/
- **Unsplash**: https://unsplash.com/s/photos/anime
- **Wallpapers.com**: https://wallpapers.com/anime-background

Place them in the appropriate directories:
- `/public/images/solo-leveling.jpg`
- `/public/images/naruto.jpg`
- `/public/images/one-piece.jpg`
- `/public/images/profile.jpg`
- `/public/images/preview/preview-1.jpg`, etc.
- `/public/images/history/1.jpg`, `2.jpg`, etc.

