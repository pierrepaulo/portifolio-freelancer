// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile Menu Toggle
  hamburger.addEventListener("click", function () {
    // alterna estado do menu
    const isActive = hamburger.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = isActive ? "hidden" : "auto";
    hamburger.setAttribute("aria-expanded", isActive);
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  /*
   * Header scroll effect
   *
   * The original implementation added another scroll listener here to toggle
   * the `.scrolled` class on the header. Later in this file a throttled
   * version of the same behaviour is registered. Having two listeners
   * performing the exact same work results in duplicate operations on each
   * scroll event and can impact performance on mobile devices.  The
   * throttled implementation defined at the bottom of this file is now the
   * single source of truth for updating the header state.
   */
  // Note: the actual scroll listener is defined later (see requestTick()).

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

  // Button hover effects
  const buttons = document.querySelectorAll(".whatsapp-btn");
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

  console.log("Portfolio Pierre Paulo - JavaScript loaded successfully!");
});

// ===== HERO NOTEBOOK TYPING EFFECT =====
// Este script cria um efeito de digitação suave para alternar entre
// duas frases na nova seção de hero.
document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const phrases = [
    "Developer: “Código limpo e escalável para soluções robustas e duradouras.”",
    "Designer: “Transformo ideias em experiências digitais que encantam e convertem.”",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  const typingSpeed = 80;
  const erasingSpeed = 50;
  const delayBetweenPhrases = 2000;

  function type() {
    if (charIndex < phrases[phraseIndex].length) {
      typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Espera um pouco e inicia o apagar
      setTimeout(erase, delayBetweenPhrases);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = phrases[phraseIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      // Move para a próxima frase e reinicia a digitação
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    }
  }

  // Inicia o efeito de digitação
  type();
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
  const header = document.getElementById("header");

  // Header scroll effect
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

// Replace the existing scroll event listeners with throttled version
window.addEventListener("scroll", requestTick, { passive: true });

// Service buttons functionality
document.addEventListener("DOMContentLoaded", function () {
  const serviceButtons = document.querySelectorAll(".service-btn");

  serviceButtons.forEach((button, index) => {
    // Add staggered animation delay
    button.style.transitionDelay = `${index * 0.1}s`;

    // Enhanced hover effects
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
      this.style.boxShadow = "0 8px 25px rgba(0, 191, 255, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 15px rgba(0, 191, 255, 0.2)";
    });

    // Click effect
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Add click animation
      this.style.transform = "translateY(-1px) scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(0) scale(1)";
      }, 150);

      // You can add actual functionality here
      console.log(`Service button ${index + 1} clicked: Saiba mais`);
    });

    // Touch support for mobile
    button.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-2px) scale(1.01)";
    });

    button.addEventListener("touchend", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .service-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
