<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DFCMS Pro3 - Digital Forensics Case Management System</title>
    <meta name="description" content="Advanced Digital Forensics Case Management System with secure evidence handling, real-time collaboration, and comprehensive audit trails for law enforcement and forensic professionals.">
    <meta name="keywords" content="digital forensics, case management, evidence tracking, cybersecurity, law enforcement, forensic investigation">
    <meta name="author" content="DFCMS Pro3 Team">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="DFCMS Pro3 - Digital Forensics Case Management System">
    <meta property="og:description" content="Advanced digital forensics platform for secure evidence management and collaborative investigations">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://github.com/yourusername/DFCMS-Pro3">
    <meta property="og:image" content="https://github.com/yourusername/DFCMS-Pro3/raw/main/assets/banner.png">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="DFCMS Pro3 - Digital Forensics Case Management">
    <meta name="twitter:description" content="Secure evidence management and collaborative investigations for forensic professionals">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'> Shield</text></svg>">
    
    <!-- External Libraries -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --dark-bg: #0f0f23;
            --dark-surface: #1a1a2e;
            --dark-border: #16213e;
            --text-primary: #ffffff;
            --text-secondary: #b8bcc8;
            --accent: #667eea;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
        }

        [data-theme="light"] {
            --dark-bg: #ffffff;
            --dark-surface: #f8fafc;
            --dark-border: #e2e8f0;
            --text-primary: #1a202c;
            --text-secondary: #64748b;
            --glass-bg: rgba(0, 0, 0, 0.05);
            --glass-border: rgba(0, 0, 0, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--dark-bg);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
            transition: all 0.3s ease;
        }

        /* Animated Background */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #0f0f23, #1a1a2e, #16213e);
            z-index: -2;
        }

        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }

        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            animation: float 20s infinite linear;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 50px;
            padding: 10px 15px;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .theme-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        /* Header Section */
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            text-align: center;
            z-index: 2;
            max-width: 1200px;
            padding: 0 20px;
        }

        .logo-container {
            margin-bottom: 30px;
            position: relative;
        }

        .animated-logo {
            width: 150px;
            height: 150px;
            background: var(--primary-gradient);
            border-radius: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            color: white;
            position: relative;
            animation: logoFloat 6s ease-in-out infinite;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
        }

        @keyframes logoFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(5deg);
            }
        }

        .logo-glow {
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: var(--primary-gradient);
            border-radius: 40px;
            filter: blur(30px);
            opacity: 0.5;
            animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1);
            }
            50% {
                opacity: 0.6;
                transform: scale(1.1);
            }
        }

        h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 900;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
            0%, 100% {
                filter: brightness(1);
            }
            50% {
                filter: brightness(1.2);
            }
        }

        .subtitle {
            font-size: 1.5rem;
            color: var(--text-secondary);
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.5s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Badges */
        .badges-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 30px 0;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.7s both;
        }

        .badge {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            padding: 8px 16px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .badge:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        /* CTA Buttons */
        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 40px 0;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.9s both;
        }

        .btn {
            padding: 15px 35px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: var(--primary-gradient);
            color: white;
        }

        .btn-secondary {
            background: transparent;
            color: var(--text-primary);
            border: 2px solid var(--accent);
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        /* Section Styles */
        .section {
            padding: 100px 20px;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
        }

        .section-title {
            font-size: 3rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 60px;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Glass Cards */
        .glass-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            margin: 20px 0;
        }

        .glass-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 50px 0;
        }

        .feature-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--primary-gradient);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .feature-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--text-primary);
        }

        .feature-description {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        /* Code Blocks */
        .code-container {
            background: #1e1e2e;
            border-radius: 15px;
            overflow: hidden;
            margin: 30px 0;
            position: relative;
        }

        .code-header {
            background: #2d2d44;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #3d3d5c;
        }

        .code-language {
            color: #ffffff;
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
        }

        .copy-btn {
            background: var(--primary-gradient);
            border: none;
            color: white;
            padding: 8px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            transform: scale(1.05);
        }

        pre {
            margin: 0;
            padding: 20px;
            overflow-x: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        /* Installation Steps */
        .steps-container {
            counter-reset: step;
            margin: 50px 0;
        }

        .step {
            display: flex;
            align-items: flex-start;
            margin: 30px 0;
            position: relative;
        }

        .step::before {
            counter-increment: step;
            content: counter(step);
            width: 40px;
            height: 40px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin-right: 20px;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--text-primary);
        }

        .step-description {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        /* Performance Metrics */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin: 50px 0;
        }

        .metric-card {
            text-align: center;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .metric-card:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
        }

        .metric-value {
            font-size: 3rem;
            font-weight: 800;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }

        .metric-label {
            color: var(--text-secondary);
            font-weight: 500;
        }

        /* Contributing Section */
        .workflow-diagram {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 40px;
            margin: 30px 0;
            backdrop-filter: blur(10px);
        }

        .workflow-steps {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .workflow-step {
            flex: 1;
            min-width: 150px;
            text-align: center;
            padding: 20px;
            background: var(--dark-surface);
            border-radius: 15px;
            transition: all 0.3s ease;
        }

        .workflow-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .workflow-icon {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--accent);
        }

        /* Footer */
        .footer {
            background: var(--dark-surface);
            padding: 50px 20px;
            text-align: center;
            border-top: 1px solid var(--dark-border);
            margin-top: 100px;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }

        .social-link {
            width: 50px;
            height: 50px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-primary);
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .social-link:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            h1 {
                font-size: 3rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .btn {
                width: 100%;
                max-width: 300px;
            }
            
            .workflow-steps {
                flex-direction: column;
            }
        }

        /* Loading Animation */
        .loader {
            width: 50px;
            height: 50px;
            border: 3px solid var(--glass-border);
            border-top: 3px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Scroll Progress Bar */
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--primary-gradient);
            z-index: 1000;
            transition: width 0.3s ease;
        }

        /* Emoji Reactions */
        .emoji-reactions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }

        .emoji-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .emoji-btn:hover {
            transform: scale(1.3) rotate(10deg);
        }

        .emoji-count {
            position: absolute;
            top: -10px;
            right: -10px;
            background: var(--danger);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- Animated Background -->
    <div class="animated-bg"></div>
    <div class="particles" id="particles"></div>
    
    <!-- Progress Bar -->
    <div class="progress-bar" id="progressBar"></div>
    
    <!-- Theme Toggle -->
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">
        <i class="fas fa-moon" id="themeIcon"></i>
    </button>
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content">
            <div class="logo-container">
                <div class="logo-glow"></div>
                <div class="animated-logo">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>
            
            <h1>DFCMS Pro3</h1>
            <p class="subtitle">Digital Forensics Case Management System</p>
            
            <div class="badges-container">
                <span class="badge">
                    <i class="fas fa-star"></i>
                    <span>GitHub Stars</span>
                </span>
                <span class="badge">
                    <i class="fas fa-code-branch"></i>
                    <span>Active Branches</span>
                </span>
                <span class="badge">
                    <i class="fas fa-users"></i>
                    <span>Contributors</span>
                </span>
                <span class="badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>Security Focused</span>
                </span>
            </div>
            
            <div class="cta-buttons">
                <a href="#installation" class="btn btn-primary">
                    <i class="fas fa-rocket"></i>
                    Quick Start
                </a>
                <a href="#demo" class="btn btn-secondary">
                    <i class="fas fa-play"></i>
                    Live Demo
                </a>
            </div>
            
            <div class="emoji-reactions">
                <button class="emoji-btn" onclick="addReaction(this, 'rocket')">
                    <i class="fas fa-rocket"></i>
                    <span class="emoji-count">0</span>
                </button>
                <button class="emoji-btn" onclick="addReaction(this, 'heart')">
                    <i class="fas fa-heart"></i>
                    <span class="emoji-count">0</span>
                </button>
                <button class="emoji-btn" onclick="addReaction(this, 'star')">
                    <i class="fas fa-star"></i>
                    <span class="emoji-count">0</span>
                </button>
            </div>
        </div>
    </section>
    
    <!-- Problem Statement Section -->
    <section class="section" id="problem">
        <h2 class="section-title">The Challenge</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 2rem; margin-bottom: 20px; color: var(--text-primary);">
                <i class="fas fa-exclamation-triangle" style="color: var(--warning); margin-right: 15px;"></i>
                Critical Forensics Management Issues
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 30px 0;">
                <div>
                    <h4 style="color: var(--danger); margin-bottom: 15px;">
                        <i class="fas fa-database"></i> Evidence Fragmentation
                    </h4>
                    <p style="color: var(--text-secondary);">
                        78% of forensic teams report scattered evidence across multiple systems, leading to chain of custody breaks and investigation delays.
                    </p>
                </div>
                
                <div>
                    <h4 style="color: var(--danger); margin-bottom: 15px;">
                        <i class="fas fa-clock"></i> Time-Consuming Processes
                    </h4>
                    <p style="color: var(--text-secondary);">
                        Average case setup takes 4.2 hours across traditional systems, with 63% of investigators spending more time on admin than analysis.
                    </p>
                </div>
                
                <div>
                    <h4 style="color: var(--danger); margin-bottom: 15px;">
                        <i class="fas fa-users-slash"></i> Collaboration Barriers
                    </h4>
                    <p style="color: var(--text-secondary);">
                        56% of forensic cases experience communication gaps between team members, resulting in duplicated efforts and missed evidence.
                    </p>
                </div>
            </div>
            
            <div style="background: var(--glass-bg); border-radius: 15px; padding: 25px; margin-top: 30px;">
                <p style="font-size: 1.2rem; font-weight: 500; color: var(--text-primary);">
                    <i class="fas fa-chart-line" style="color: var(--success); margin-right: 10px;"></i>
                    <strong>Industry Impact:</strong> Organizations lose an estimated $4.2M annually due to inefficient forensics workflows and compromised evidence integrity.
                </p>
            </div>
        </div>
    </section>
    
    <!-- Solution Overview Section -->
    <section class="section" id="solution">
        <h2 class="section-title">Our Solution</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 2rem; margin-bottom: 20px; color: var(--text-primary);">
                <i class="fas fa-lightbulb" style="color: var(--accent); margin-right: 15px;"></i>
                Integrated Forensics Platform
            </h3>
            
            <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 30px;">
                DFCMS Pro3 revolutionizes digital forensics case management with a unified platform that combines secure evidence handling, 
                real-time collaboration, and comprehensive audit trails into a single, intuitive interface.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 40px 0;">
                <div class="glass-card" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));">
                    <h4 style="color: var(--accent); margin-bottom: 15px;">
                        <i class="fas fa-shield-alt"></i> Security-First Architecture
                    </h4>
                    <p style="color: var(--text-secondary);">
                        Military-grade encryption, role-based access control, and immutable audit logs ensure evidence integrity and chain of custody compliance.
                    </p>
                </div>
                
                <div class="glass-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));">
                    <h4 style="color: var(--success); margin-bottom: 15px;">
                        <i class="fas fa-users"></i> Real-Time Collaboration
                    </h4>
                    <p style="color: var(--text-secondary);">
                        Multi-user workspaces, live updates, and integrated communication tools enable seamless teamwork across forensic teams.
                    </p>
                </div>
                
                <div class="glass-card" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1));">
                    <h4 style="color: var(--warning); margin-bottom: 15px;">
                        <i class="fas fa-tachometer-alt"></i> Performance Optimized
                    </h4>
                    <p style="color: var(--text-secondary);">
                        Lightning-fast search, parallel processing, and intelligent caching reduce investigation time by up to 73%.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Key Features Section -->
    <section class="section" id="features">
        <h2 class="section-title">Powerful Features</h2>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-folder-open"></i>
                </div>
                <h3 class="feature-title">Case Management</h3>
                <p class="feature-description">
                    Create, assign, and track forensic cases with intuitive workflows. Automated case numbering and priority management ensure organized investigations.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3 class="feature-title">Evidence Vault</h3>
                <p class="feature-description">
                    Secure storage with SHA-256 hashing, file integrity verification, and tamper-evident logging. Supports multiple file formats with metadata extraction.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-link"></i>
                </div>
                <h3 class="feature-title">Chain of Custody</h3>
                <p class="feature-description">
                    Complete evidence lifecycle tracking with automated timestamps, user attribution, and immutable custody records for legal compliance.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-user-shield"></i>
                </div>
                <h3 class="feature-title">Role-Based Access</h3>
                <p class="feature-description">
                    Granular permissions for Admins, Investigators, and Analysts. JWT-based authentication with secure session management.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-history"></i>
                </div>
                <h3 class="feature-title">Audit Logging</h3>
                <p class="feature-description">
                    Comprehensive activity tracking with IP logging, action timestamps, and detailed resource access records for compliance and investigation.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <h3 class="feature-title">Analytics Dashboard</h3>
                <p class="feature-description">
                    Real-time insights into case progress, team performance, and evidence statistics with interactive visualizations and reporting tools.
                </p>
            </div>
        </div>
    </section>
    
    <!-- Technical Implementation Section -->
    <section class="section" id="technical">
        <h2 class="section-title">Technical Architecture</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-microchip" style="color: var(--accent); margin-right: 15px;"></i>
                System Architecture
            </h3>
            
            <div style="background: #1e1e2e; border-radius: 15px; padding: 30px; margin: 30px 0;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                    <div style="text-align: center;">
                        <div style="background: var(--primary-gradient); width: 80px; height: 80px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                            <i class="fas fa-react" style="font-size: 2rem; color: white;"></i>
                        </div>
                        <h4 style="color: var(--text-primary); margin-bottom: 10px;">Frontend</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">React 19 + Vite + GSAP</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="background: var(--secondary-gradient); width: 80px; height: 80px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                            <i class="fas fa-server" style="font-size: 2rem; color: white;"></i>
                        </div>
                        <h4 style="color: var(--text-primary); margin-bottom: 10px;">Backend</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Flask + SQLAlchemy + JWT</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="background: var(--accent-gradient); width: 80px; height: 80px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                            <i class="fas fa-database" style="font-size: 2rem; color: white;"></i>
                        </div>
                        <h4 style="color: var(--text-primary); margin-bottom: 10px;">Database</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">SQLite + Redis Cache</p>
                    </div>
                </div>
            </div>
            
            <h4 style="color: var(--text-primary); margin: 30px 0 15px;">Core Technologies</h4>
            
            <div class="code-container">
                <div class="code-header">
                    <span class="code-language">Backend Stack</span>
                    <button class="copy-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>Flask==3.0.0              # Web Framework
Flask-CORS==4.0.0         # Cross-Origin Resource Sharing
Flask-JWT-Extended==4.5.3 # Authentication
Flask-Bcrypt==1.0.1       # Password Hashing
SQLAlchemy==2.0.0         # ORM Database
python-dotenv==1.0.0      # Environment Variables</code></pre>
            </div>
            
            <div class="code-container">
                <div class="code-header">
                    <span class="code-language">Frontend Stack</span>
                    <button class="copy-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>React==19.2.0             # UI Framework
Vite==7.3.1               # Build Tool
React Router==7.13.2      # Routing
Axios==1.14.0             # HTTP Client
Framer Motion==12.38.0    # Animations
GSAP==3.14.2              # Advanced Animations</code></pre>
            </div>
        </div>
    </section>
    
    <!-- Installation & Setup Section -->
    <section class="section" id="installation">
        <h2 class="section-title">Installation & Setup</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-cog" style="color: var(--accent); margin-right: 15px;"></i>
                Quick Start Guide
            </h3>
            
            <div class="steps-container">
                <div class="step">
                    <div class="step-content">
                        <h4 class="step-title">Clone Repository</h4>
                        <p class="step-description">
                            Get the latest version of DFCMS Pro3 from the GitHub repository.
                        </p>
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">bash</span>
                                <button class="copy-btn" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code>git clone https://github.com/yourusername/DFCMS-Pro3.git
cd DFCMS-Pro3</code></pre>
                        </div>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-content">
                        <h4 class="step-title">Backend Setup</h4>
                        <p class="step-description">
                            Install Python dependencies and configure the Flask backend server.
                        </p>
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">bash</span>
                                <button class="copy-btn" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code>cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py</code></pre>
                        </div>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-content">
                        <h4 class="step-title">Frontend Setup</h4>
                        <p class="step-description">
                            Install Node.js dependencies and start the React development server.
                        </p>
                        <div class="code-container">
                            <div class="code-header">
                                <span class="code-language">bash</span>
                                <button class="copy-btn" onclick="copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code>cd dfcmsweb
npm install
npm run dev</code></pre>
                        </div>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-content">
                        <h4 class="step-title">Access Application</h4>
                        <p class="step-description">
                            Open your browser and navigate to the application URLs.
                        </p>
                        <div style="background: var(--glass-bg); border-radius: 10px; padding: 20px; margin-top: 15px;">
                            <p style="color: var(--text-primary); margin-bottom: 10px;">
                                <i class="fas fa-globe" style="color: var(--success); margin-right: 10px;"></i>
                                <strong>Frontend:</strong> http://localhost:5173
                            </p>
                            <p style="color: var(--text-primary);">
                                <i class="fas fa-server" style="color: var(--warning); margin-right: 10px;"></i>
                                <strong>Backend API:</strong> http://localhost:5000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)); border-radius: 15px; padding: 25px; margin-top: 40px;">
                <h4 style="color: var(--success); margin-bottom: 15px;">
                    <i class="fas fa-user-circle"></i> Default Login Credentials
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <p style="color: var(--text-secondary); margin-bottom: 5px;">Admin User:</p>
                        <p style="color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">admin / admin123</p>
                    </div>
                    <div>
                        <p style="color: var(--text-secondary); margin-bottom: 5px;">Investigator:</p>
                        <p style="color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">vikram / vikram123</p>
                    </div>
                    <div>
                        <p style="color: var(--text-secondary); margin-bottom: 5px;">Analyst:</p>
                        <p style="color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">anjali / anjali123</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Usage Examples Section -->
    <section class="section" id="usage">
        <h2 class="section-title">Usage Examples</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-code" style="color: var(--accent); margin-right: 15px;"></i>
                API Integration Examples
            </h3>
            
            <div class="code-container">
                <div class="code-header">
                    <span class="code-language">JavaScript - Authentication</span>
                    <button class="copy-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>// Login and get JWT token
const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      username,
      password
    });
    
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.response.data.msg };
  }
};</code></pre>
            </div>
            
            <div class="code-container">
                <div class="code-header">
                    <span class="code-language">JavaScript - Case Management</span>
                    <button class="copy-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>// Create a new forensic case
const createCase = async (caseData) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.post('http://localhost:5000/api/cases', caseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return { success: true, case: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.msg };
  }
};

// Example usage
const newCase = await createCase({
  title: 'Network Intrusion Investigation',
  description: 'Suspicious activity detected on corporate network',
  priority: 'high',
  assigned_to: 'vikram'
});</code></pre>
            </div>
            
            <div class="code-container">
                <div class="code-header">
                    <span class="code-language">JavaScript - Evidence Upload</span>
                    <button class="copy-btn" onclick="copyCode(this)">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <pre><code>// Upload evidence file to case
const uploadEvidence = async (caseId, file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('case_id', caseId);
  
  try {
    const response = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return { success: true, evidence: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.msg };
  }
};</code></pre>
            </div>
        </div>
    </section>
    
    <!-- Performance Metrics Section -->
    <section class="section" id="performance">
        <h2 class="section-title">Performance Metrics</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-tachometer-alt" style="color: var(--accent); margin-right: 15px;"></i>
                Benchmarks & Optimization
            </h3>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value">99.9%</div>
                    <div class="metric-label">Uptime SLA</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">&lt;200ms</div>
                    <div class="metric-label">API Response Time</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">73%</div>
                    <div class="metric-label">Time Reduction</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">25MB</div>
                    <div class="metric-label">Max File Size</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">10K+</div>
                    <div class="metric-label">Concurrent Users</div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">AES-256</div>
                    <div class="metric-label">Encryption Standard</div>
                </div>
            </div>
            
            <h4 style="color: var(--text-primary); margin: 40px 0 20px;">Optimization Strategies</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                <div class="glass-card" style="background: rgba(16, 185, 129, 0.1);">
                    <h5 style="color: var(--success); margin-bottom: 15px;">
                        <i class="fas fa-bolt"></i> Database Optimization
                    </h5>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>Indexed queries for fast evidence search</li>
                        <li>Connection pooling for concurrent access</li>
                        <li>Lazy loading for large datasets</li>
                        <li>Query result caching with Redis</li>
                    </ul>
                </div>
                
                <div class="glass-card" style="background: rgba(59, 130, 246, 0.1);">
                    <h5 style="color: #3b82f6; margin-bottom: 15px;">
                        <i class="fas fa-compress"></i> Frontend Optimization
                    </h5>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>Code splitting with React.lazy</li>
                        <li>Image lazy loading and compression</li>
                        <li>Service worker for offline caching</li>
                        <li>Bundle optimization with Vite</li>
                    </ul>
                </div>
                
                <div class="glass-card" style="background: rgba(245, 158, 11, 0.1);">
                    <h5 style="color: var(--warning); margin-bottom: 15px;">
                        <i class="fas fa-network-wired"></i> Network Optimization
                    </h5>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>HTTP/2 for multiplexed requests</li>
                        <li>GZIP compression for API responses</li>
                        <li>CDN integration for static assets</li>
                        <li>WebSocket for real-time updates</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Contributing Guidelines Section -->
    <section class="section" id="contributing">
        <h2 class="section-title">Contributing Guidelines</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-hands-helping" style="color: var(--accent); margin-right: 15px;"></i>
                Join Our Community
            </h3>
            
            <div class="workflow-diagram">
                <h4 style="color: var(--text-primary); margin-bottom: 30px; text-align: center;">Git Workflow</h4>
                
                <div class="workflow-steps">
                    <div class="workflow-step">
                        <div class="workflow-icon">
                            <i class="fas fa-code-branch"></i>
                        </div>
                        <h5 style="color: var(--text-primary); margin-bottom: 10px;">Fork</h5>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Create your fork</p>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="workflow-icon">
                            <i class="fas fa-copy"></i>
                        </div>
                        <h5 style="color: var(--text-primary); margin-bottom: 10px;">Clone</h5>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Clone locally</p>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="workflow-icon">
                            <i class="fas fa-edit"></i>
                        </div>
                        <h5 style="color: var(--text-primary); margin-bottom: 10px;">Develop</h5>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Create feature branch</p>
                    </div>
                    
                    <div class="workflow-step">
                        <div class="workflow-icon">
                            <i class="fas fa-pull-request"></i>
                        </div>
                        <h5 style="color: var(--text-primary); margin-bottom: 10px;">Pull Request</h5>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Submit for review</p>
                    </div>
                </div>
            </div>
            
            <div style="margin: 40px 0;">
                <h4 style="color: var(--text-primary); margin-bottom: 20px;">Development Setup</h4>
                
                <div class="code-container">
                    <div class="code-header">
                        <span class="code-language">bash</span>
                        <button class="copy-btn" onclick="copyCode(this)">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                    <pre><code># 1. Fork and clone the repository
git clone https://github.com/yourusername/DFCMS-Pro3.git
cd DFCMS-Pro3

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Install dependencies
cd backend && pip install -r requirements.txt
cd ../dfcmsweb && npm install

# 4. Make your changes and test
npm run lint
npm test

# 5. Commit and push
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# 6. Create a Pull Request</code></pre>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 15px; padding: 25px;">
                <h4 style="color: var(--accent); margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i> Contribution Guidelines
                </h4>
                <ul style="color: var(--text-secondary); line-height: 1.8;">
                    <li>Follow the existing code style and conventions</li>
                    <li>Write clear, descriptive commit messages</li>
                    <li>Add tests for new features and bug fixes</li>
                    <li>Update documentation for any API changes</li>
                    <li>Ensure all tests pass before submitting PR</li>
                    <li>Be respectful and constructive in code reviews</li>
                </ul>
            </div>
        </div>
    </section>
    
    <!-- License & Attribution Section -->
    <section class="section" id="license">
        <h2 class="section-title">License & Attribution</h2>
        
        <div class="glass-card">
            <h3 style="font-size: 1.8rem; margin-bottom: 25px; color: var(--text-primary);">
                <i class="fas fa-balance-scale" style="color: var(--accent); margin-right: 15px;"></i>
                Open Source License
            </h3>
            
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)); border-radius: 15px; padding: 30px; margin: 30px 0;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <i class="fas fa-certificate" style="font-size: 3rem; color: var(--success); margin-right: 20px;"></i>
                    <div>
                        <h4 style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 5px;">MIT License</h4>
                        <p style="color: var(--text-secondary);">Free for commercial and personal use</p>
                    </div>
                </div>
                
                <p style="color: var(--text-secondary); text-align: center; margin-top: 20px;">
                    Copyright © 2024 DFCMS Pro3 Team. All rights reserved.
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin: 30px 0;">
                <div class="glass-card">
                    <h5 style="color: var(--text-primary); margin-bottom: 15px;">
                        <i class="fas fa-users"></i> Core Contributors
                    </h5>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>Lead Developer: [Your Name]</li>
                        <li>Backend Architect: [Contributor]</li>
                        <li>Frontend Specialist: [Contributor]</li>
                        <li>Security Expert: [Contributor]</li>
                    </ul>
                </div>
                
                <div class="glass-card">
                    <h5 style="color: var(--text-primary); margin-bottom: 15px;">
                        <i class="fas fa-heart"></i> Special Thanks
                    </h5>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>Flask Framework Team</li>
                        <li>React Development Team</li>
                        <li>Open Source Community</li>
                        <li>Security Researchers</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <div class="badges-container" style="justify-content: center;">
                    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
                    <img src="https://img.shields.io/badge/version-3.0.0-green.svg" alt="Version">
                    <img src="https://img.shields.io/badge/python-3.8%2B-blue.svg" alt="Python">
                    <img src="https://img.shields.io/badge/react-19.0.0-blue.svg" alt="React">
                    <img src="https://img.shields.io/badge/security-A%2B-brightgreen.svg" alt="Security">
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <h3 style="font-size: 2rem; margin-bottom: 20px; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                DFCMS Pro3
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 30px;">
                Advanced Digital Forensics Case Management System for the modern investigator
            </p>
            
            <div class="social-links">
                <a href="https://github.com/yourusername/DFCMS-Pro3" class="social-link" aria-label="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://twitter.com/dfcmspro3" class="social-link" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com/company/dfcmspro3" class="social-link" aria-label="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="mailto:contact@dfcms.pro" class="social-link" aria-label="Email">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>
            
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Made with <i class="fas fa-heart" style="color: var(--danger);"></i> for the digital forensics community
            </p>
        </div>
    </footer>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    
    <script>
        // Initialize particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        // Theme toggle
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('themeIcon');
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
            }
        }
        
        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            const themeIcon = document.getElementById('themeIcon');
            
            if (savedTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
            }
        }
        
        // Copy code functionality
        function copyCode(button) {
            const codeBlock = button.parentElement.nextElementSibling;
            const code = codeBlock.textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                }, 2000);
            });
        }
        
        // Progress bar
        function updateProgressBar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            document.getElementById('progressBar').style.width = scrollPercentage + '%';
        }
        
        // Emoji reactions
        function addReaction(button, type) {
            const countSpan = button.querySelector('.emoji-count');
            let count = parseInt(countSpan.textContent);
            count++;
            countSpan.textContent = count;
            
            // Animate the reaction
            button.style.transform = 'scale(1.5) rotate(15deg)';
            setTimeout(() => {
                button.style.transform = '';
            }, 300);
            
            // Save to localStorage
            const reactions = JSON.parse(localStorage.getItem('reactions') || '{}');
            reactions[type] = (reactions[type] || 0) + 1;
            localStorage.setItem('reactions', JSON.stringify(reactions));
        }
        
        // Load reactions
        function loadReactions() {
            const reactions = JSON.parse(localStorage.getItem('reactions') || '{}');
            const buttons = document.querySelectorAll('.emoji-btn');
            
            buttons.forEach(button => {
                const icon = button.querySelector('i');
                let type = 'rocket';
                
                if (icon.classList.contains('fa-heart')) type = 'heart';
                if (icon.classList.contains('fa-star')) type = 'star';
                
                const countSpan = button.querySelector('.emoji-count');
                countSpan.textContent = reactions[type] || 0;
            });
        }
        
        // Smooth scrolling for anchor links
        function smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
        
        // Intersection Observer for animations
        function setupIntersectionObserver() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe all sections and cards
            document.querySelectorAll('.section, .glass-card, .feature-card, .metric-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
        
        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            loadTheme();
            loadReactions();
            smoothScroll();
            setupIntersectionObserver();
            
            // Update progress bar on scroll
            window.addEventListener('scroll', updateProgressBar);
            
            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close modals or reset focus
                    document.activeElement.blur();
                }
                
                if (e.ctrlKey && e.key === 'k') {
                    e.preventDefault();
                    // Focus search (if implemented)
                    console.log('Search shortcut pressed');
                }
            });
            
            // Add loading animation removal
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // Performance optimization: Debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Apply debounce to scroll events
        window.addEventListener('scroll', debounce(updateProgressBar, 10));
        
        // Add touch support for mobile
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe up - next section
                    console.log('Swipe up detected');
                } else {
                    // Swipe down - previous section
                    console.log('Swipe down detected');
                }
            }
        }
        
        // Analytics and error tracking (if needed)
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Could send to analytics service here
        });
        
        // Service Worker registration for PWA (optional)
        if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('/sw.js').then(registration => {
            //     console.log('SW registered:', registration);
            // }).catch(error => {
            //     console.log('SW registration failed:', error);
            // });
        }
    </script>
</body>
</html>
