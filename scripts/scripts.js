// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile Menu Toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Hero button smooth scroll
  const heroBtn = document.querySelector(".hero-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector("#projects");
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes and observe elements
  const animateElements = document.querySelectorAll(
    ".section-header, .project-card, .service-card, .about-text, .about-skills"
  );
  animateElements.forEach((element, index) => {
    element.classList.add("fade-in");
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });

  // Skill items animation
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    item.classList.add("fade-in");
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Project cards staggered animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  // Service cards staggered animation
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });

  // Parallax effect for hero shapes
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + header.offsetHeight + 50;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  });

  // Typing animation for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typing animation after a delay
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 80);
    }
  }, 1500);

  // Button hover effects
  const buttons = document.querySelectorAll(".hero-btn, .whatsapp-btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Card tilt effect
  const cards = document.querySelectorAll(".project-card, .service-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // Smooth reveal animation for sections
  const revealElements = document.querySelectorAll(
    ".about-content, .contact-content"
  );
  revealElements.forEach((element) => {
    observer.observe(element);
    element.classList.add("fade-in");
  });

  // WhatsApp button pulse animation
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (whatsappBtn) {
    setInterval(() => {
      whatsappBtn.style.animation = "none";
      setTimeout(() => {
        whatsappBtn.style.animation = "pulse 0.6s ease-in-out";
      }, 10);
    }, 5000);
  }

  // Social links hover effect
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) rotate(5deg)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotate(0deg)";
    });
  });

  // Loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Trigger hero animations
    const heroElements = document.querySelectorAll(
      ".hero-name, .hero-title, .hero-description, .hero-btn"
    );
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 200);
    });
  });

  // Scroll to top functionality
  let scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #00bfff, #ffd700);
        color: #1a1a1a;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 191, 255, 0.3);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Scroll to top button hover effect
  scrollToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)";
    this.style.boxShadow = "0 10px 25px rgba(0, 191, 255, 0.4)";
  });

  scrollToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 5px 15px rgba(0, 191, 255, 0.3)";
  });

  // Performance optimization: Throttle scroll events
  let ticking = false;

  function updateScrollEffects() {
    // Header scroll effect
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax effect
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }

  // Replace the existing scroll event listeners with throttled version
  window.addEventListener("scroll", requestTick);

  console.log("Portfolio Pierre Paulo - JavaScript loaded successfully!");
});

// Hero Section Split Screen Interactive Script
document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero-new");
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");

  if (!heroSection || !heroLeft || !heroRight) {
    console.warn("Hero section elements not found");
    return;
  }

  let isDesktop = window.innerWidth > 768;
  let mobileTimeout;

  // Função para detectar se é desktop
  function checkDevice() {
    isDesktop = window.innerWidth > 768;
  }

  // Função para ativar o lado esquerdo (mobile)
  function activateLeft() {
    heroSection.classList.remove("right-active");
    heroSection.classList.add("left-active");
    resetMobileTimeout();
  }

  // Função para ativar o lado direito (mobile)
  function activateRight() {
    heroSection.classList.remove("left-active");
    heroSection.classList.add("right-active");
    resetMobileTimeout();
  }

  // Função para resetar o estado (mobile)
  function resetState() {
    heroSection.classList.remove("left-active", "right-active");
  }

  // Reset timeout para mobile
  function resetMobileTimeout() {
    clearTimeout(mobileTimeout);
    mobileTimeout = setTimeout(resetState, 3000);
  }

  // Event listeners para mobile (toque)
  function addMobileListeners() {
    heroLeft.addEventListener("click", activateLeft);
    heroRight.addEventListener("click", activateRight);

    // Touch events para melhor experiência mobile
    heroLeft.addEventListener("touchstart", activateLeft);
    heroRight.addEventListener("touchstart", activateRight);
  }

  // Remover todos os listeners
  function removeAllListeners() {
    heroLeft.removeEventListener("click", activateLeft);
    heroRight.removeEventListener("click", activateRight);
    heroLeft.removeEventListener("touchstart", activateLeft);
    heroRight.removeEventListener("touchstart", activateRight);
  }

  // Efeitos adicionais para desktop
  function addDesktopEffects() {
    const heroHalves = [heroLeft, heroRight];

    heroHalves.forEach((half) => {
      // Efeito de zoom sutil na imagem
      half.addEventListener("mouseenter", function () {
        this.style.backgroundSize = "110%";
      });

      half.addEventListener("mouseleave", function () {
        this.style.backgroundSize = "cover";
      });

      // Efeito de movimento do mouse
      half.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;

        const content = this.querySelector(".hero-content-new");
        if (content) {
          content.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });

      half.addEventListener("mouseleave", function () {
        const content = this.querySelector(".hero-content-new");
        if (content) {
          content.style.transform =
            "translate(-50%, -50%) perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
      });
    });
  }

  // Inicializar baseado no dispositivo
  function initializeHero() {
    removeAllListeners();
    checkDevice();

    if (isDesktop) {
      addDesktopEffects();
      resetState(); // Remove classes mobile se existirem
    } else {
      addMobileListeners();
    }
  }

  // Inicializar
  initializeHero();

  // Reinicializar quando a janela for redimensionada
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    clearTimeout(mobileTimeout);
    resizeTimeout = setTimeout(function () {
      resetState();
      initializeHero();
    }, 250);
  });

  // Efeito de parallax no scroll (opcional e sutil)
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;

    if (scrolled < window.innerHeight) {
      const rate = scrolled * 0.3;
      heroLeft.style.transform = `translateY(${rate}px)`;
      heroRight.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
  }

  function requestParallaxTick() {
    if (!ticking && isDesktop) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestParallaxTick);

  // Animação de entrada suave
  setTimeout(function () {
    heroSection.style.opacity = "1";
    heroSection.classList.add("loaded");
  }, 100);

  // Preloader para as imagens
  function preloadImages() {
    const images = [
      "../assets/images/designer-image.jpg",
      "../assets/images/developer-image.jpg",
    ];

    let loadedImages = 0;
    const totalImages = images.length;

    images.forEach(function (src) {
      const img = new Image();
      img.onload = function () {
        loadedImages++;
        if (loadedImages === totalImages) {
          heroSection.classList.add("images-loaded");
        }
      };
      img.src = src;
    });
  }

  // Iniciar preload
  preloadImages();

  // Debug info
  console.log("Hero Split Screen initialized successfully!");
  console.log("Device type:", isDesktop ? "Desktop" : "Mobile");
});

// Função para adicionar CSS dinâmico (caso necessário)
function addDynamicStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .hero-new {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .hero-new.loaded {
      opacity: 1;
    }
    
    .hero-new.images-loaded .hero-half {
      background-size: cover;
    }
    
    /* Smooth transitions para todos os estados */
    .hero-half,
    .hero-content-new,
    .hero-title-new,
    .hero-description-new {
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  `;
  document.head.appendChild(style);
}

// Adicionar estilos dinâmicos quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addDynamicStyles);
} else {
  addDynamicStyles();
}
