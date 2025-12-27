import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import spainImg01 from '../images/spain_1.webp';
import spainImg02 from '../images/spain_2.jpeg';
import spainImg03 from '../images/spain_3.jpg';
import spainImg04 from '../images/spain_4.jpeg';
import thaiImg01 from '../images/thai_1.webp';
import thaiImg02 from '../images/thai_2.webp';
import thaiImg03 from '../images/thai_3.jpg';
import thaiImg04 from '../images/thai_4.jpg';
import IndImg01 from '../images/india_1.png';
import IndImg02 from '../images/india_2.jpg';
import IndImg03 from '../images/india_3.jpeg';
import IndImg04 from '../images/india_4.jpg';
import FraImg01 from '../images/france_1.jpg';
import FraImg02 from '../images/france_2.jpg';
import FraImg03 from '../images/france_3.jpg';
import gerImg01 from '../images/germany_1.jpeg';
import gerImg02 from '../images/germany_2.jpeg';
import gerImg03 from '../images/germany_3.jpg';
import gerImg04 from '../images/germany_4.jpg';
import indoImg01 from '../images/indo_1.jpg';
import indoImg02 from '../images/indo_2.jpg';
import indoImg03 from '../images/indo_3.jpg';
import indoImg04 from '../images/indo_4.webp';
import itaImg01 from '../images/italy_1.jpeg';
import itaImg02 from '../images/italy_2.jpeg';
import itaImg03 from '../images/italy_3.webp';
import itaImg04 from '../images/italy_4.jpg';
import japImg01 from '../images/japan_1.jpeg';
import japImg02 from '../images/japan_2.jpeg';
import japImg03 from '../images/japan_3.jpg';
import japImg04 from '../images/japan_4.jpeg';
import ukImg01 from '../images/uk_1.jpg';
import ukImg02 from '../images/uk_2.jpg';
import ukImg03 from '../images/uk_3.jpg';
import ukImg04 from '../images/uk_4.jpg';
import chiImg01 from '../images/china_1.jpg';
import chiImg02 from '../images/china_2.jpg';
import chiImg03 from '../images/china_3.jpeg';
import chiImg04 from '../images/china_4.jpg';

















const tours = [
  {
    id: "01",
    title: "Westminister Bridge",
    city: "London",
    distance: 300,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 10,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },

      {
        name: "jhon doe",
        rating: 5,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Bali, Indonesia",
    city: "Indonesia",
    distance: 400,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Snowy Mountains, Thailand",
    city: "Thailand",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Beautiful Sunrise, Thailand",
    city: "Thailand",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Nusa Pendia Bali, Indonesia",
    city: "Indonesia",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Cherry Blossoms Spring",
    city: "Japan",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Holmen Lofoten",
    city: "France",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Snowy Mountains, Thailand",
    city: "Thailand",
    distance: 500,
    address:'SomeWhere',
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg03,
    featured: false,
  },
  {
   id:"09",
   title: "Cox's Bazar Sea Beach",
    city: "Chittagong",
    address: "Somewhere in Chittagong",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "this is the description",
    reviews: [],
    photo: spainImg01,
    featured: false,
  },
  {
    id:"10",
    "title": "Barcelona - La Barceloneta Beach & Cityscape",
    "city": "Barcelona",
    "address": "Barceloneta Beach, Barcelona",
    "distance": 400,
    "price": 90,
    "maxGroupSize": 15,
    "desc": "Enjoy the vibrant energy of Barcelona with a visit to the famous Barceloneta Beach. Relax on golden sands, swim in the Mediterranean, and explore the city's stunning skyline.",
    "reviews": [],
    "photo": spainImg02,
    "featured": true,
  },
  {
    id:"11",
    "title": "Mallorca - Hidden Coves & Yacht Adventure",
    "city": "Mallorca",
    "address": "Sa Calobra, Mallorca",
    "distance": 500,
    "price": 150,
    "maxGroupSize": 8,
    "desc": "Sail through the crystal-clear waters of Mallorca, exploring hidden coves and secluded beaches. Swim, snorkel, and relax in a Mediterranean paradise.",
    "reviews": [],
    "photo":spainImg03,
    "featured": true
  },
  {
    id:"12",
    "title": "Seville - Plaza de España & Old Town",
    "city": "Seville",
    "address": "Plaza de España, Seville",
    "distance": 200,
    "price": 110,
    "maxGroupSize": 10,
    "desc": "Step into the grandeur of Plaza de España, a masterpiece of Spanish architecture. Explore Seville’s old town, with its charming streets, flamenco performances, and historical landmarks.",
    "reviews": [],
    "photo": spainImg04,
    "featured": true
  },
  {
    id:"13",
    "title": "Doi Inthanon - Twin Pagodas",
    "city": "Chiang Mai",
    "address": "Doi Inthanon National Park, Chiang Mai, Thailand",
    "distance": 120,
    "price": 150,
    "maxGroupSize": 10,
    "desc": "Experience the breathtaking beauty of the Twin Pagodas at Doi Inthanon, the highest mountain in Thailand. Surrounded by lush gardens and stunning views, this site is a must-visit.",
    "reviews": [],
    "photo":thaiImg01,
    "featured": true
  },
  {
    id:"14",
    "title": "Phi Phi Islands - Paradise Escape",
    "city": "Krabi",
    "address": "Phi Phi Islands, Krabi, Thailand",
    "distance": 200,
    "price": 180,
    "maxGroupSize": 15,
    "desc": "Explore the stunning beauty of Phi Phi Islands, with crystal-clear waters, towering limestone cliffs, and pristine beaches. Enjoy snorkeling, island hopping, and breathtaking sunsets.",
    "reviews": [],
    "photo":thaiImg02,
    "featured": true
  },
  {
   id:"15",
   "title": "Wat Arun - The Temple of Dawn",
    "city": "Bangkok",
    "address": "Wat Arun, Bangkok, Thailand",
    "distance": 15,
    "price": 80,
    "maxGroupSize": 8,
    "desc": "Admire the mesmerizing beauty of Wat Arun, one of Bangkok’s most iconic temples. Visit at sunset for a spectacular view of its golden glow over the Chao Phraya River.",
    "reviews": [],
    "photo": thaiImg03,
    "featured": true
  },
  {
    id:"16",
    "title": "Wat Bang Phli Yai Klang - Giant Buddha",
    "city": "Samut Prakan",
    "address": "Wat Bang Phli Yai Klang, Samut Prakan, Thailand",
    "distance": 30,
    "price": 90,
    "maxGroupSize": 12,
    "desc": "Discover the massive golden Buddha statue at Wat Bang Phli Yai Klang, a serene and spiritual destination by the riverside. Experience the cultural richness of Thailand.",
    "reviews": [],
    "photo": thaiImg04,
    "featured": true
  },
  {
   id:"17",
   "title": "Erawan Waterfall",
    "city": "Kanchanaburi",
    "address": "Erawan National Park, Kanchanaburi, Thailand",
    "distance": 120,
    "price": 300,
    "maxGroupSize": 15,
    "desc": "Explore the stunning Erawan Waterfall, known for its emerald green ponds and lush jungle surroundings. Perfect for swimming and photography.",
    "reviews": [],
    "photo": indoImg01,
    "featured": true
  },
  {
        id:"18",
      "title": "Kelingking Beach",
      "city": "Nusa Penida",
      "address": "Kelingking Beach, Nusa Penida, Bali, Indonesia",
      "distance": 40,
      "price": 150,
      "maxGroupSize": 10,
      "desc": "Visit Kelingking Beach, a breathtaking spot with dramatic cliffs and turquoise waters. Enjoy stunning views and a relaxing atmosphere.",
      "reviews": [],
      "photo": indoImg02,
      "featured": true
  },
  {
    id:"19",
    "title": "Komodo Island",
    "city": "Labuan Bajo",
    "address": "Komodo National Park, Labuan Bajo, Indonesia",
    "distance": 60,
    "price": 250,
    "maxGroupSize": 8,
    "desc": "Discover the beauty of Komodo Island, home to the famous Komodo dragons and stunning landscapes. A paradise for nature lovers.",
    "reviews": [],
    "photo": indoImg03,
    "featured": true
  },
  {
    id:"20",
    "title": "Ulun Danu Beratan Temple",
    "city": "Bali",
    "address": "Ulun Danu Beratan Temple, Bali, Indonesia",
    "distance": 70,
    "price": 200,
    "maxGroupSize": 12,
    "desc": "Visit the picturesque Ulun Danu Beratan Temple, located on the shores of Lake Beratan. A beautiful and serene cultural site.",
    "reviews": [],
    "photo": indoImg04,
    "featured": true
  },
  {
    id:"21",
    "title": "India Gate",
    "city": "Delhi",
    "address": "Rajpath, India Gate, New Delhi, India",
    "distance": 5,
    "price": 0,
    "maxGroupSize": 0,
    "desc": "Explore India Gate, a war memorial dedicated to Indian soldiers. An iconic symbol of Delhi, especially beautiful at night.",
    "reviews": [],
    "photo": IndImg01,
    "featured": true
  },
  {
    id:"22",
    "title": "Kandariya Mahadeva Temple",
    "city": "Khajuraho",
    "address": "Kandariya Mahadeva Temple, Khajuraho, India",
    "distance": 600,
    "price": 500,
    "maxGroupSize": 20,
    "desc": "Visit the exquisite Kandariya Mahadeva Temple, known for its intricate carvings and historical significance in the Khajuraho group of temples.",
    "reviews": [],
    "photo": IndImg02,
    "featured": true
  },
  {
    id:"23",
    "title": "Munnar Tea Gardens",
    "city": "Munnar",
    "address": "Munnar Tea Gardens, Kerala, India",
    "distance": 145,
    "price": 100,
    "maxGroupSize": 18,
    "desc": "Experience the lush greenery of Munnar's tea gardens, a stunning landscape perfect for nature walks and photography.",
    "reviews": [],
    "photo": IndImg03,
    "featured": true
  },
  {
    id:"24",
    "title": "Taj Mahal",
    "city": "Agra",
    "address": "Taj Mahal, Agra, India",
    "distance": 200,
    "price": 1000,
    "maxGroupSize": 25,
    "desc": "Visit the Taj Mahal, an iconic symbol of love and a UNESCO World Heritage site. Marvel at its stunning architecture and beautiful gardens.",
    "reviews": [],
    "photo": IndImg04,
    "featured": true
  },
  {
    id:"25",
    "title": "Lake Braies",
    "city": "Bolzano",
    "address": "Lago di Braies, Bolzano, Italy",
    "distance": 300,
    "price": 800,
    "maxGroupSize": 20,
    "desc": "Experience the stunning beauty of Lake Braies, known for its enchanting turquoise waters and surrounding mountains.",
    "reviews": [],
    "photo": gerImg01,
    "featured": true
  },
  {
    id:"26",
    "title": "Neuschwanstein Castle",
    "city": "Bavaria",
    "address": "Neuschwanstein Castle, Bavaria, Germany",
    "distance": 500,
    "price": 1200,
    "maxGroupSize": 25,
    "desc": "Explore the fairy-tale Neuschwanstein Castle, a magnificent structure surrounded by lush forests and mountains.",
    "reviews": [],
    "photo": gerImg02,
    "featured": true
  },
  {
    id:"27",
    "title": "Berlin Skyline",
    "city": "Berlin",
    "address": "Berlin, Germany",
    "distance": 100,
    "price": 700,
    "maxGroupSize": 30,
    "desc": "Take in the stunning skyline of Berlin, featuring iconic landmarks illuminated against the night sky.",
    "reviews": [],
    "photo": gerImg03,
    "featured": true
  },
  {
    id:"28",
    "title": "Cologne Cathedral",
    "city": "Cologne",
    "address": "Kölner Dom, Cologne, Germany",
    "distance": 150,
    "price": 600,
    "maxGroupSize": 40,
    "desc": "Visit the Cologne Cathedral, an architectural marvel and UNESCO World Heritage site, famous for its stunning Gothic designs.",
    "reviews": [],
    "photo": gerImg04,
    "featured": true
  },
  {
    id:"29",
    "title": "Alexander Bridge",
    "city": "Paris",
    "address": "Pont Alexandre III, Paris, France",
    "distance": 200,
    "price": 500,
    "maxGroupSize": 15,
    "desc": "Stroll across the beautiful Alexander Bridge, known for its intricate sculptures and stunning views of the Seine.",
    "reviews": [],
    "photo": FraImg01,
    "featured": true
  },
  {
    id:"30",
    "title": "Villefranche-sur-Mer",
    "city": "Côte d'Azur",
    "address": "Villefranche-sur-Mer, France",
    "distance": 400,
    "price": 900,
    "maxGroupSize": 30,
    "desc": "Discover the charming coastal village of Villefranche-sur-Mer, famous for its picturesque old town and stunning bay.",
    "reviews": [],
    "photo": FraImg02,
    "featured": true
  },
  {
    id:"31",
    "title": "Louvre Pyramid",
    "city": "Paris",
    "address": "Rue de Rivoli, 75001 Paris, France",
    "distance": 200,
    "price": 1200,
    "maxGroupSize": 20,
    "desc": "Visit the iconic Louvre Pyramid, a glass and metal structure that serves as the entrance to the world-renowned Louvre Museum.",
    "reviews": [],
    "photo": FraImg03,
    "featured": true
  },
  {
    id:"32",
    "title": "Newquay",
    "city": "Cornwall",
    "address": "Newquay, Cornwall, UK",
    "distance": 200,
    "price": 500,
    "maxGroupSize": 30,
    "desc": "Enjoy the scenic beaches and vibrant nightlife of Newquay.",
    "reviews": [],
    "photo": ukImg01,
    "featured": true
  },
  {
    id:"33",
    "title": "Buckingham Palace",
    "city": "London",
    "address": "Buckingham Palace, London, UK",
    "distance": 250,
    "price": 300,
    "maxGroupSize": 50,
    "desc": "Visit the historic residence of the British monarch.",
    "reviews": [],
    "photo": ukImg02,
    "featured": false
  },
  {
    id:"34",
    "title": "Tower Bridge",
    "city": "London",
    "address": "Tower Bridge, London, UK",
    "distance": 260,
    "price": 400,
    "maxGroupSize": 50,
    "desc": "One of the most iconic landmarks of London, showcasing stunning architecture.",
    "reviews": [],
    "photo": ukImg03,
    "featured": true
  },
  {
    id:"35",
    "title": "Durdle Door",
    "city": "Dorset",
    "address": "Durdle Door, Dorset, UK",
    "distance": 280,
    "price": 150,
    "maxGroupSize": 20,
    "desc": "Marvel at the natural limestone arch and beautiful beach.",
    "reviews": [],
    "photo":ukImg04,
    "featured": true
  },
  {
    id:"36",
    "title": "The Colosseum",
    "city": "Rome",
    "address": "Colosseum, Rome, Italy",
    "distance": 500,
    "price": 250,
    "maxGroupSize": 40,
    "desc": "Explore the ancient amphitheater known for gladiatorial contests.",
    "reviews": [],
    "photo": itaImg01,
    "featured": true
  },
  {
    id:"37",
    "title": "Himeji Castle",
    "city": "Himeji",
    "address": "Himeji, Hyogo, Japan",
    "distance": 700,
    "price": 200,
    "maxGroupSize": 30,
    "desc": "Experience the beauty of Himeji Castle during cherry blossom season.",
    "reviews": [],
    "photo": japImg01,
    "featured": true
  },
  {
    id:"38",
    "title": "Daigo-ji Temple",
    "city": "Kyoto",
    "address": "Daigo-ji, Kyoto, Japan",
    "distance": 650,
    "price": 180,
    "maxGroupSize": 25,
    "desc": "Enjoy the breathtaking autumn scenery at Daigo-ji Temple.",
    "reviews": [],
    "photo": japImg02,
    "featured": true
  },
  {
    id:"39",
    "title": "Kinkaku-ji",
    "city": "Kyoto",
    "address": "Kinkaku-ji, Kyoto, Japan",
    "distance": 600,
    "price": 220,
    "maxGroupSize": 35,
    "desc": "Visit the famous Golden Pavilion and its stunning reflection.",
    "reviews": [],
    "photo": japImg03,
    "featured": true
  },
  {
    id:"40",
    "title": "Mount Fuji",
    "city": "Yamanashi",
    "address": "Mount Fuji, Japan",
    "distance": 800,
    "price": 250,
    "maxGroupSize": 50,
    "desc": "Hike or enjoy the scenic views of Japan’s iconic Mount Fuji.",
    "reviews": [],
    "photo": japImg04,
    "featured": true
  
  },
  {
    id:"41",
    "title": "Milan Cathedral",
    "city": "Milan",
    "address": "Milan Cathedral, Milan, Italy",
    "distance": 400,
    "price": 230,
    "maxGroupSize": 30,
    "desc": "Admire the stunning gothic architecture of the Milan Cathedral.",
    "reviews": [],
    "photo": itaImg02,
    "featured": true
  },
  {
    id:"42",
    "title": "Venice Grand Canal",
    "city": "Venice",
    "address": "Grand Canal, Venice, Italy",
    "distance": 300,
    "price": 280,
    "maxGroupSize": 20,
    "desc": "Experience a romantic gondola ride through the Grand Canal in Venice.",
    "reviews": [],
    "photo": itaImg03,
    "featured": true
  },
  {
    id:"43",
    "title": "Cinque Terre",
    "city": "Manarola",
    "address": "Cinque Terre, Italy",
    "distance": 600,
    "price": 270,
    "maxGroupSize": 15,
    "desc": "Explore the colorful seaside villages of Cinque Terre.",
    "reviews": [],
    "photo": itaImg04,
    "featured": true
  },
  {
    id:"44",
    "title": "Wat Paknam Phasi Charoen",
    "address": "Bangkok, Thailand",
    "distance": 200,
    "price": 150,
    "maxGroupSize": 10,
    "desc": "Visit the giant golden Buddha and beautiful temple.",
    "reviews": [],
    "photo": thaiImg01,
    "featured": true
  },
  {
    id:"45",
    "title": "Wat Arun",
    "address": "Bangkok, Thailand",
    "distance": 300,
    "price": 180,
    "maxGroupSize": 12,
    "desc": "Explore the stunning architecture of Wat Arun at sunset.",
    "reviews": [],
    "photo": thaiImg02,
    "featured": true
  },
  {
    id:"46",
    "title": "Phi Phi Islands",
    "address": "Phuket, Thailand",
    "distance": 500,
    "price": 320,
    "maxGroupSize": 20,
    "desc": "Discover the breathtaking views and clear waters.",
    "reviews": [],
    "photo": thaiImg03,
    "featured": true
  },
  {
    id:"47",
    "title": "Doi Inthanon",
    "address": "Chiang Mai, Thailand",
    "distance": 600,
    "price": 220,
    "maxGroupSize": 15,
    "desc": "Visit the highest peak in Thailand surrounded by flowers.",
    "reviews": [],
    "photo": thaiImg04,
    "featured": true
  },
  {
    id:"48",
    "title": "Chongqing",
    "address": "China",
    "distance": 800,
    "price": 400,
    "maxGroupSize": 30,
    "desc": "Experience the vibrant nightlife and stunning skyline.",
    "reviews": [],
    "photo": chiImg01,
    "featured": true
  },
  {
    id:"49",
    "title": "Great Wall of China",
    "address": "Beijing, China",
    "distance": 1000,
    "price": 300,
    "maxGroupSize": 25,
    "desc": "Walk along the historical Great Wall.",
    "reviews": [],
    "photo": chiImg02,
    "featured": true
  },
  {
    id:"50",
    "title": "Fenghuang Ancient Town",
    "address": "Hunan, China",
    "distance": 450,
    "price": 210,
    "maxGroupSize": 15,
    "desc": "Explore the ancient town along the river.",
    "reviews": [],
    "photo": chiImg03,
    "featured": true
  },
  {
    id:"51",
    "title": "Great Wall of China – Simatai Section",
    "address": "Beijing, China",
    "distance": 1200,
    "price": 330,
    "maxGroupSize": 30,
    "desc": "Stunning views from the Simatai section during sunrise.",
    "reviews": [],
    "photo": chiImg04,
    "featured": true
  }






  
];



export default tours;
