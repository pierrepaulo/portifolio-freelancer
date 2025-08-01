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

// ===== HERO SPLIT SCREEN INTERACTIVE EFFECT =====
document.addEventListener("DOMContentLoaded", function () {
  const splitContainer = document.querySelector(".split-container");
  const splitLeft = document.querySelector(".split-left");
  const splitRight = document.querySelector(".split-right");

  if (!splitContainer || !splitLeft || !splitRight) {
    console.warn("Split screen elements not found");
    return;
  }

  let isDesktop = window.innerWidth > 768;
  let currentMouseX = 0;
  let targetMouseX = 0;
  let animationId = null;

  // Função para detectar se é desktop
  function checkDevice() {
    isDesktop = window.innerWidth > 768;
  }

  // Função de interpolação suave (lerp)
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // Função para animar as transições suavemente
  function animateTransition() {
    // Interpolação suave para o movimento do mouse
    currentMouseX = lerp(currentMouseX, targetMouseX, 0.08);

    // Calcular as larguras baseadas na posição do mouse
    const leftWidth = (1 - currentMouseX) * 100;
    const rightWidth = currentMouseX * 100;

    // Aplicar as larguras com limites mínimos e máximos
    const minWidth = 15;
    const maxWidth = 85;

    const finalLeftWidth = Math.max(minWidth, Math.min(maxWidth, leftWidth));
    const finalRightWidth = Math.max(minWidth, Math.min(maxWidth, rightWidth));

    // Aplicar as transformações
    splitLeft.style.width = `${finalLeftWidth}%`;
    splitRight.style.width = `${finalRightWidth}%`;

    // Efeito de cobertura: adicionar z-index para o lado ativo
    if (currentMouseX < 0.5) {
      splitLeft.classList.add("active");
      splitRight.classList.remove("active");
    } else {
      splitRight.classList.add("active");
      splitLeft.classList.remove("active");
    }

    // Continuar a animação se ainda há diferença significativa
    if (Math.abs(currentMouseX - targetMouseX) > 0.001) {
      animationId = requestAnimationFrame(animateTransition);
    } else {
      animationId = null;
    }
  }

  // Função para iniciar a animação suave
  function startSmoothAnimation() {
    if (!animationId) {
      animationId = requestAnimationFrame(animateTransition);
    }
  }

  // Event listener para movimento do mouse (desktop)
  function handleMouseMove(e) {
    if (!isDesktop) return;

    const rect = splitContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;

    // Normalizar a posição do mouse (0 a 1)
    targetMouseX = Math.max(0, Math.min(1, mouseX / containerWidth));

    // Iniciar animação suave
    startSmoothAnimation();
  }

  // Event listener para quando o mouse sai do container
  function handleMouseLeave() {
    if (!isDesktop) return;

    // Retornar ao estado inicial (50/50)
    targetMouseX = 0.5;
    startSmoothAnimation();

    // Remover classes de ativo
    setTimeout(() => {
      splitLeft.classList.remove("active");
      splitRight.classList.remove("active");
    }, 800);
  }

  // Função para ativar o lado esquerdo (mobile)
  function activateLeft() {
    if (isDesktop) return;

    splitContainer.classList.remove("right-active");
    splitContainer.classList.add("left-active");
    resetMobileTimeout();
  }

  // Função para ativar o lado direito (mobile)
  function activateRight() {
    if (isDesktop) return;

    splitContainer.classList.remove("left-active");
    splitContainer.classList.add("right-active");
    resetMobileTimeout();
  }

  // Função para resetar o estado (mobile)
  function resetState() {
    splitContainer.classList.remove("left-active", "right-active");
  }

  // Reset timeout para mobile
  let mobileTimeout;
  function resetMobileTimeout() {
    clearTimeout(mobileTimeout);
    mobileTimeout = setTimeout(resetState, 3000);
  }

  // Event listeners para mobile (toque)
  function addMobileListeners() {
    splitLeft.addEventListener("click", activateLeft);
    splitRight.addEventListener("click", activateRight);
    splitLeft.addEventListener("touchstart", activateLeft);
    splitRight.addEventListener("touchstart", activateRight);
  }

  // Remover todos os listeners
  function removeAllListeners() {
    splitContainer.removeEventListener("mousemove", handleMouseMove);
    splitContainer.removeEventListener("mouseleave", handleMouseLeave);
    splitLeft.removeEventListener("click", activateLeft);
    splitRight.removeEventListener("click", activateRight);
    splitLeft.removeEventListener("touchstart", activateLeft);
    splitRight.removeEventListener("touchstart", activateRight);
  }

  // Função para adicionar efeitos de desktop
  function addDesktopListeners() {
    splitContainer.addEventListener("mousemove", handleMouseMove);
    splitContainer.addEventListener("mouseleave", handleMouseLeave);

    // Inicializar posição do mouse no centro
    currentMouseX = 0.5;
    targetMouseX = 0.5;

    // Resetar larguras para o estado inicial
    splitLeft.style.width = "50%";
    splitRight.style.width = "50%";
  }

  // Inicializar baseado no dispositivo
  function initializeSplitScreen() {
    removeAllListeners();
    checkDevice();

    if (isDesktop) {
      addDesktopListeners();
      resetState(); // Remove classes mobile se existirem
    } else {
      addMobileListeners();
      // Resetar larguras para mobile
      splitLeft.style.width = "";
      splitRight.style.width = "";
    }
  }

  // Inicializar
  initializeSplitScreen();

  // Reinicializar quando a janela for redimensionada
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    clearTimeout(mobileTimeout);

    resizeTimeout = setTimeout(function () {
      resetState();

      // Cancelar animação em andamento
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      // Remover classes de ativo
      splitLeft.classList.remove("active");
      splitRight.classList.remove("active");

      initializeSplitScreen();
    }, 250);
  });

  // Animação de entrada suave
  setTimeout(function () {
    const heroSplit = document.querySelector(".hero-split");
    if (heroSplit) {
      heroSplit.style.opacity = "1";
      heroSplit.classList.add("loaded");
    }
  }, 100);

  // Debug info
  console.log("Hero Split Screen Interactive initialized successfully!");
  console.log("Device type:", isDesktop ? "Desktop" : "Mobile");
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
