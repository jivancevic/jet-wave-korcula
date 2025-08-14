// Initialize i18n first
if (typeof i18n !== "undefined") {
  i18n.init();
}

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: true,
  offset: -100,
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navBackdrop = document.getElementById("navBackdrop");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    console.log("hamburger clicked");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle(
      "no-scroll",
      navMenu.classList.contains("active")
    );
    if (navBackdrop)
      navBackdrop.classList.toggle(
        "active",
        navMenu.classList.contains("active")
      );
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  const handler = (ev) => {
    console.log("link", link);
    const href = link.getAttribute("href") || "";
    const isAnchor = href.startsWith("#") && href.length > 1;
    if (!isAnchor) return; // let external links work normally

    ev.preventDefault();

    // Close the menu
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
    document.body.classList.remove("no-scroll");
    if (navBackdrop) navBackdrop.classList.remove("active");

    const target = document.querySelector(href);
    if (target) {
      // Wait for slide-out animation (~300ms); give a little buffer
      const HEADER_OFFSET = 70; // approx fixed header height
      setTimeout(() => {
        const top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }, 350);
    }
  };
  link.addEventListener("click", handler);
  // Also handle touchend explicitly for some mobile browsers
  link.addEventListener("touchend", handler, { passive: false });
});

// Close when clicking backdrop
if (navBackdrop) {
  navBackdrop.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
    document.body.classList.remove("no-scroll");
    navBackdrop.classList.remove("active");
  });
}

// Language switcher functionality (supports inline EN | HR)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-btn, .lang-link");
  if (btn) {
    e.stopPropagation();
    const lang = btn.getAttribute("data-lang");
    if (lang && typeof i18n !== "undefined" && lang !== i18n.currentLang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      document.title = `Jet Wave - ${i18n.t("hero.subtitle")}`;
      // Update inline active state
      document.querySelectorAll(".lang-link").forEach((l) => {
        l.classList.toggle("active", l.getAttribute("data-lang") === lang);
      });
    }
  }
});

// Initialize inline active state on load
window.addEventListener("load", () => {
  document.querySelectorAll(".lang-link").forEach((l) => {
    l.classList.toggle(
      "active",
      typeof i18n !== "undefined" &&
        l.getAttribute("data-lang") === i18n.currentLang
    );
  });
});

// Navbar background change on scroll (keep black)
window.addEventListener(
  "scroll",
  () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("scrolled");
    }
  },
  { passive: true }
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling with i18n support
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Basic validation with i18n
    if (
      !data.name ||
      !data.email ||
      !data.message ||
      !data.date ||
      !data.time
    ) {
      const message =
        typeof i18n !== "undefined"
          ? i18n.t("validation.required")
          : "Please fill in all fields.";
      showNotification(message, "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      const message =
        typeof i18n !== "undefined"
          ? i18n.t("validation.invalidEmail")
          : "Please enter a valid email address.";
      showNotification(message, "error");
      return;
    }

    // Simulate form submission with i18n
    const sendingMessage =
      typeof i18n !== "undefined"
        ? i18n.t("validation.sending")
        : "Sending message...";
    showNotification(sendingMessage, "info");

    setTimeout(() => {
      const successMessage =
        typeof i18n !== "undefined"
          ? i18n.t("validation.success")
          : "Message sent successfully! We will contact you soon.";
      showNotification(successMessage, "success");
      contactForm.reset();
    }, 2000);
  });
}

// Notification system with i18n support
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#28a745"
            : type === "error"
            ? "#dc3545"
            : "#17a2b8"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

  // Add animation styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
            .notification-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1; }
            .notification-close:hover { opacity: 0.7; }
        `;
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// rAF-scoped scroll effects for smoother scrolling
let scrollScheduled = false;
let modelsTop = 0;
let modelsHeight = 1;
const modelsSection = document.getElementById("models");
const heroBackgroundEl = document.querySelector(".hero-background");
const heroScrollIndicator = document.querySelector(".scroll-indicator");

function recomputeModelsMetrics() {
  if (modelsSection) {
    const rect = modelsSection.getBoundingClientRect();
    modelsTop = window.scrollY + rect.top;
    modelsHeight = modelsSection.offsetHeight || 1;
  }
}

function applyParallax() {
  if (!heroBackgroundEl) return;
  const scrolled = window.pageYOffset;
  heroBackgroundEl.style.transform = `translateY(${scrolled * 0.35}px)`;
}

function updateActiveModel() {
  const leftCards = document.querySelectorAll(".model-card.from-left");
  if (!modelsSection || !leftCards.length) return;
  const viewportAnchor = window.scrollY + window.innerHeight * 0.4;
  const progress = Math.max(
    0,
    Math.min(1, (viewportAnchor - modelsTop) / Math.max(1, modelsHeight))
  );
  const activeIndex = Math.max(
    0,
    Math.min(leftCards.length - 1, Math.floor(progress * leftCards.length))
  );
  leftCards.forEach((card, idx) => {
    if (idx === activeIndex) card.classList.add("active");
    else card.classList.remove("active");
  });
}

function updateScrollIndicator() {
  if (!heroScrollIndicator) return;
  if (window.pageYOffset <= 50) {
    heroScrollIndicator.classList.remove("hidden");
  } else {
    heroScrollIndicator.classList.add("hidden");
  }
}

function runScrollEffects() {
  applyParallax();
  updateActiveModel();
  updateScrollIndicator();
  scrollScheduled = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(runScrollEffects);
    }
  },
  { passive: true }
);

window.addEventListener("resize", () => {
  recomputeModelsMetrics();
  // Run one frame after resize settles
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(runScrollEffects);
  }
});

window.addEventListener("load", () => {
  recomputeModelsMetrics();
  runScrollEffects();
  updateScrollIndicator();
});

// CTA button click handler
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Social media link handlers
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log("Social link clicked:", link.href);
  });
});

// Contact info click handlers
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("click", function () {
    const text = this.querySelector("p a")?.getAttribute("href") || "";
    if (text.startsWith("https://wa.me/")) {
      window.open(text, "_blank");
    } else if (text.startsWith("tel:")) {
      window.open(text, "_blank");
    }
  });
});

// Lazy loading for images
const images = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});
images.forEach((img) => imageObserver.observe(img));

// Team mobile scroll-triggered flip
(function setupTeamFlipOnScroll() {
  const cards = document.querySelectorAll(".team-card.flip .flip-inner");
  if (!cards.length) return;
  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  // Tap to toggle flip on mobile
  cards.forEach((c) => {
    c.addEventListener("click", () => {
      if (!isMobile()) return;
      const flipped = c.dataset.flipped === "true";
      if (flipped) {
        c.style.transform = "rotateY(0)";
        c.dataset.flipped = "false";
      } else {
        c.style.transform = "rotateY(180deg)";
        c.dataset.flipped = "true";
      }
    });
  });

  // Auto flip once after crossing 50% in view, with slight delay
  const flippedOnce = new WeakSet();
  const timers = new WeakMap();
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!isMobile()) return; // Only on mobile
        const el = entry.target;
        if (entry.isIntersecting && !flippedOnce.has(el)) {
          const t = setTimeout(() => {
            el.style.transform = "rotateY(180deg)";
            el.dataset.flipped = "true";
            flippedOnce.add(el);
            timers.delete(el);
          }, 250);
          timers.set(el, t);
        } else if (!entry.isIntersecting && !flippedOnce.has(el)) {
          const t = timers.get(el);
          if (t) {
            clearTimeout(t);
            timers.delete(el);
          }
        }
      });
    },
    { threshold: 0.8 }
  );
  cards.forEach((c) => obs.observe(c));

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      cards.forEach((c) => {
        c.style.transform = "";
        c.dataset.flipped = "false";
      });
    }
  });
})();

// Models: desktop carousel auto-rotation
(function setupModelsCarousel() {
  const carousel = document.querySelector(".models-carousel");
  if (!carousel) return;
  const items = Array.from(carousel.querySelectorAll(".carousel-item"));
  if (items.length !== 3) return;
  let focusIndex = 0;
  let intervalId;

  function applyPositions() {
    items.forEach((item) => {
      item.classList.remove("left", "center", "right");
      item.style.zIndex = "1";
      item.style.pointerEvents = "none";
    });
    const left = (focusIndex + 2) % 3;
    const center = focusIndex % 3;
    const right = (focusIndex + 1) % 3;
    items[left].classList.add("left");
    items[center].classList.add("center");
    items[right].classList.add("right");
    items[center].style.zIndex = "5";
    items[center].style.pointerEvents = "auto";
  }

  function rotateOnce() {
    focusIndex = (focusIndex + 1) % 3;
    applyPositions();
  }

  function startRotation() {
    stopRotation();
    intervalId = setInterval(rotateOnce, 5000);
  }
  function stopRotation() {
    if (intervalId) clearInterval(intervalId);
  }

  applyPositions();

  // Pause on hover of center item
  carousel.addEventListener("mouseenter", (e) => {
    const center = items[focusIndex % 3];
    if (e.target === center || center.contains(e.target)) stopRotation();
  });
  carousel.addEventListener("mouseleave", () => {
    const mq = window.matchMedia("(min-width: 901px)");
    if (mq.matches) startRotation();
  });

  // Click on side items to focus them
  items.forEach((item, idx) => {
    item.addEventListener("click", () => {
      const centerIdx = focusIndex % 3;
      if (idx === centerIdx) return;
      focusIndex = idx;
      applyPositions();
    });
  });

  const mq = window.matchMedia("(min-width: 901px)");
  function handleMQ(e) {
    if (e.matches) startRotation();
    else stopRotation();
  }
  mq.addEventListener
    ? mq.addEventListener("change", handleMQ)
    : mq.addListener(handleMQ);
  handleMQ(mq);
  window.addEventListener("visibilitychange", () => {
    document.hidden ? stopRotation() : handleMQ(mq);
  });
})();

// Console welcome message
console.log(`\n🚤 Jet Wave - Korčula\nWelcome devs to the Jet Wave website!\n`);
