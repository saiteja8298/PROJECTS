# 🍲 Online Food Donation System

> 🌍 **“Don’t waste food — donate it to someone in need.”**  
A simple, static web project that connects **food donors** with **recipients/NGOs**, making food sharing quick and meaningful. Built entirely with **HTML** and **CSS**, and enhanced by **EmailJS** for instant email notifications.

---

## ✨ Features

🌟 **Home Page**  
Beautiful hero section with inspiring quote and a floating “**Donate Now**” button.  

📦 **Donate Page**  
Interactive form that collects:  
`Name`, `Email`, `Phone`, `Address`, `Food Details`, `Quantity`, `Comments`, and `Terms Consent`.

📧 **Email Notifications**  
Donation details are sent instantly via **EmailJS** using the client-side CDN — no backend required.

🗺️ **Live Map Integration**  
An embedded **Google Maps iframe** on the Donate page helps donors and NGOs locate each other easily.

🎥 **About Page**  
Explains project motivation and includes a local **demo video**.

💬 **Contact Page**  
Displays contact info and a visually styled (non-functional) chat-style contact form.

👤 **Profile Page**  
Static example profile page with **donation history** — ready for future integration.

---

## 🧠 Tech Stack

| Category | Tools & Technologies |
|-----------|----------------------|
| 🎨 **Frontend** | HTML5, CSS3 |
| 💌 **Email Service** | [EmailJS](https://www.emailjs.com/) via CDN |
| 🗺️ **Maps** | Google Maps Embed (iframe) |
| ⚙️ **Hosting** | GitHub Pages / Netlify / Vercel |

---

## 📁 Project Structure
```
Online Food Donation System/
├── index.html
├── donate.html
├── about.html
├── contact.html
├── profile.html
├── style.css
└── Food donation system motivation video.mp4
```

---

## 🚀 Getting Started

### 🖥️ Option 1: Open Locally
1. Clone or download the repository.  
2. Open `index.html` in your browser.

### ⚡ Option 2: Run with Live Server
- In VS Code, install the **Live Server** extension.  
- Right-click `index.html` → **“Open with Live Server.”**

---

## 🔧 Configure EmailJS

Update the placeholders in **`donate.html`** with your own EmailJS keys:

```js
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', event.target);
```

✅ Ensure your EmailJS template fields match:
`name`, `email`, `phone`, `address`, `foodDetails`, `quantity`, `comments`, `terms`

---

## 🎯 Usage

- 🏠 Open `index.html` → Home Page  
- 💖 Click “Donate Now” → Fill donation form  
- 📍 See live location map below form  
- 📹 Visit `about.html` for project story  
- 📞 Open `contact.html` for details  
- 👤 Check `profile.html` for static sample profile

---

## ☁️ Deployment

Deploy easily on any static host:
- **GitHub Pages** → Push & enable Pages for the `main` branch  
- **Netlify / Vercel** → Drag-and-drop or connect your repo  
- **Custom Server** → Serve static files directly

---

## 🔒 Security & Privacy

⚠️ Don’t upload your real **EmailJS keys** to public repos.  
🧾 The contact form is static — **no backend message handling**.  
🚫 Avoid entering sensitive or personal information.

---

## 🌱 Future Improvements

- 🔐 Add real **authentication** & user login  
- 📊 Implement **backend/database** for donation tracking  
- 🧑‍💼 Build an **NGO/Admin Dashboard**  
- 🪄 Add form validation & success/error UI feedback  

---

## 💖 Acknowledgements

- 💌 [EmailJS](https://www.emailjs.com/) — for serverless email handling  
- 🗺️ [Google Maps](https://maps.google.com/) — for the map integration  
- 🙏 To everyone fighting food waste one meal at a time ❤️  
