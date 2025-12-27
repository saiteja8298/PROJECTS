import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function BackgroundManager() {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [folders, setFolders] = useState([]);
    const location = useLocation();

    // Define the specific anime folders relevant to the user's request
    const allowedAnime = [
        "One_Piece",
        "Naruto",
        "Naruto__Shippuuden",
        "Death_Note"
    ];

    // Load the list of folders once on mount, but filter for specific ones
    useEffect(() => {
        fetch('/local-images.json')
            .then(res => {
                if (!res.ok) throw new Error("Failed to load local images index");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    // Filter the data to only include the requested anime
                    const filteredFolders = data.filter(folder => allowedAnime.includes(folder));

                    if (filteredFolders.length > 0) {
                        setFolders(filteredFolders);
                        // Set an initial background immediately after loading only if not on home page
                        if (location.pathname !== '/') {
                            pickRandomWallpaper(filteredFolders);
                        }
                    } else {
                        // Fallback to all if none found (unlikely given correct names) or just the allowed list directly
                        console.warn("Could not find specific folders, using default list", allowedAnime);
                        setFolders(allowedAnime);
                        if (location.pathname !== '/') {
                            pickRandomWallpaper(allowedAnime);
                        }
                    }
                }
            })
            .catch(err => {
                console.error("BackgroundManager error:", err);
                // Fallback to hardcoded list if fetch fails
                setFolders(allowedAnime);
                pickRandomWallpaper(allowedAnime);
            });
    }, []);

    const pickRandomWallpaper = (folderList) => {
        if (!folderList || folderList.length === 0) return;

        const randomFolder = folderList[Math.floor(Math.random() * folderList.length)];

        // Randomize image selection slightly more since we have fewer folders now.
        // We assume _1.jpg always exists. Let's try to see if we can get a few others?
        // Without knowing exactly which exist, we can't reliably guess > 1. 
        // SAFEST BET: Always use _1.jpg.
        // If the user wants variety within the same show, we'd need to verify file existence.
        // For now, let's stick to the cover image to ensure no broken backgrounds.

        const imagePath = `/Dataset/${randomFolder}/${randomFolder}_1.jpg`;

        // Preload to avoid flicker
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            setBackgroundImage(imagePath);
        };
    };

    // Page-specific wallpapers mapping
    const pageWallpapers = {
        '/': '/images/HOME%20wallpaper.jpg',
        '/generate-manhwa': '/images/Genratemanhwapagewallpaper.jpg',
        '/refer-manhwa': '/images/refer%20manhwa%20wallpaper.jpg',
        '/about-me': '/images/Aboutmepagewallpaper.png',
        '/history': '/images/historypagewallpaper.jpg'
    };

    // Change background on route change
    useEffect(() => {
        const wallpaper = pageWallpapers[location.pathname];
        if (wallpaper) {
            // Preload to avoid flicker
            const img = new Image();
            img.src = wallpaper;
            img.onload = () => {
                setBackgroundImage(wallpaper);
            };
        } else if (folders.length > 0) {
            // Fallback to random for other pages like manga-details
            pickRandomWallpaper(folders);
        }
    }, [location.pathname, folders]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -3,
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 0.8s ease-in-out',
            }}
        />
    );
}

export default BackgroundManager;
