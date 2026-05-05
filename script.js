/* ── Global Start Function ── */
let invitationStarted = false;

function startInvitation() {
  if (invitationStarted) return;
  invitationStarted = true;

  // 1. Hide Cover with a smooth transition
  const cover = document.getElementById('invitation-cover');
  if (cover) {
    cover.style.opacity = '0';
    cover.style.pointerEvents = 'none'; // Prevent double clicks
    cover.style.transform = 'scale(1.1)';
    setTimeout(() => {
      cover.style.display = 'none';
      document.body.classList.remove('overflow-hidden'); // Unlock scroll
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 1500);
  }

  // 2. Play Music
  const music = document.getElementById('wedding-music');
  const musicBtn = document.getElementById('music-toggle');
  if (music) {
    music.play().catch(err => console.log("Music play blocked by browser:", err));
    if (musicBtn) musicBtn.classList.remove('hidden');
  }

  // 3. Trigger GSAP Hero Animation Immediately
  if (window.runHeroAnimation) {
    window.runHeroAnimation();
  } else {
    // Fallback if GSAP is still loading or runHeroAnimation isn't defined yet
    window.pendingHeroAnimation = true;
  }
}

/* ── Music Toggle Logic ── */
function toggleMusic() {
  const music = document.getElementById('wedding-music');
  const playIcon = document.getElementById('music-icon-play');
  const pauseIcon = document.getElementById('music-icon-pause');
  const waves = document.querySelector('.music-waves');

  if (music.paused) {
    music.play();
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    if (waves) waves.classList.remove('hidden');
  } else {
    music.pause();
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    if (waves) waves.classList.add('hidden');
  }
}

/* ── Invitation Logic ── */

/* ── Gift Section Copy Logic ── */
function copyToClipboard(text, btnId) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Tersalin!</span>';
    btn.classList.add('bg-sage', 'text-white');

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-sage', 'text-white');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

/* ── RSVP Modal ── */
function openRSVP() {
  const modal = document.getElementById('rsvpModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeRSVP() {
  const modal = document.getElementById('rsvpModal');
  if (modal) {
    modal.classList.add('hidden');
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 400);
  }
}

/* ── Intersection Observer for Scroll Animations (Native) ── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[class*="animate-"]').forEach(el => {
    observer.observe(el);
  });
})();

/* ── Countdown Timer ── */
(function () {
  const target = new Date('2026-06-14T10:00:00+07:00').getTime();

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');
  const sEl = document.getElementById('cd-seconds');

  if (!dEl || !hEl || !mEl || !sEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    dEl.textContent = pad(days);
    hEl.textContent = pad(hours);
    mEl.textContent = pad(minutes);
    sEl.textContent = pad(seconds);
  }

  setInterval(tick, 1000);
  tick();
})();

/* ── Golden Curtain Entrance Removed ── */

/* ── GSAP ANIMATIONS ── */
// Wrap in load event to guarantee GSAP CDN has fully loaded before we run anything
window.addEventListener('load', function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero Section GSAP ── */
  window.runHeroAnimation = function () {
    if (window.heroAnimationRun) return;
    window.heroAnimationRun = true;

    gsap.set(".hero-name-left, .hero-name-right", { filter: "blur(20px)", scale: 1.1, opacity: 0, y: 40 });
    gsap.set(".hero-and span", { opacity: 0, scale: 0.5 });
    gsap.set(".hero-and .gold-line", { scaleX: 0, opacity: 0 });
    gsap.set(".hero-label, .hero-info p, .hero-cta, .hero-bottom-label", { opacity: 0, y: 20 });
    gsap.set(".hero-countdown", { opacity: 0, scale: 0.95 });
    gsap.set(".hero-top-line", { width: 0, opacity: 0 });
    gsap.set(".hero-divider .gold-line", { scaleX: 0, opacity: 0 });
    gsap.set(".hero-divider span", { opacity: 0, y: 10 });

    const tl = gsap.timeline({ delay: 1.2 });

    tl.to(".hero-label", { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" })
      .to(".hero-top-line", { width: "80px", opacity: 1, duration: 1.5, ease: "expo.inOut" }, "-=1.2")
      .to(".hero-name-left", { filter: "blur(0px)", scale: 1, opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }, "-=0.8")
      .to(".hero-and .gold-line", { scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "expo.out" }, "-=1.8")
      .to(".hero-and span", { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.75)" }, "-=1.5")
      .to(".hero-name-right", { filter: "blur(0px)", scale: 1, opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }, "-=2.2")
      .to(".hero-divider .gold-line", { scaleX: 1, opacity: 1, duration: 2, stagger: 0.3, ease: "expo.inOut" }, "-=1.8")
      .to(".hero-divider span", { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power2.out" }, "-=1.5")
      .to(".hero-info p", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }, "-=1.2")
      .to(".hero-countdown", { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }, "-=0.8")
      .to(".hero-cta", { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.6")
      .to(".hero-bottom-label", { opacity: 0.6, duration: 2.5, ease: "none" }, "-=1");

    gsap.from("#hero", { scale: 1.05, duration: 6, ease: "power2.out" });
  };

  // If startInvitation was already called before GSAP loaded, run it now
  if (window.pendingHeroAnimation) {
    window.runHeroAnimation();
  }

  /* ── Couple Section GSAP ── */
  (function () {
    const greetingTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".couple-greeting",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    greetingTl.from(".greeting-title", { y: 30, opacity: 0, filter: "blur(10px)", duration: 1.5, ease: "expo.out" })
      .from(".greeting-quote", { y: 20, opacity: 0, duration: 2, ease: "power2.out" }, "-=1")
      .from(".greeting-cite", { scaleX: 0, opacity: 0, duration: 1.2, transformOrigin: "center", ease: "expo.inOut" }, "-=1.5");

    const animatePerson = (wrapper, delay = 0) => {
      const isGroom = wrapper.includes("groom");
      const photoReveal = isGroom ? ".groom-photo-reveal" : ".bride-photo-reveal";
      const img = isGroom ? ".groom-img" : ".bride-img";
      const floralFrame = isGroom ? ".groom-frame-floral" : ".bride-frame-floral";
      const info = isGroom ? ".groom-info > *" : ".bride-info > *";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        delay: delay
      });

      tl.from(photoReveal, { clipPath: "inset(0 50% 0 50%)", duration: 2, ease: "power4.inOut" })
        .from(img, { scale: 1.2, filter: "blur(10px) grayscale(100%)", duration: 3, ease: "power2.out" }, "-=1.5")
        .from(floralFrame, { opacity: 0, scale: 0.8, duration: 2, ease: "expo.out" }, "-=2")
        .from(info, { y: 30, opacity: 0, stagger: 0.15, duration: 1.5, ease: "expo.out" }, "-=1.8");
    };

    animatePerson(".groom-wrapper");
    animatePerson(".bride-wrapper", 0.2);
  })();

  /* ── Event Section GSAP ── */
  (function () {
    // Header
    gsap.from(".event-header > *", {
      scrollTrigger: { trigger: ".event-header", start: "top 85%" },
      y: 30, opacity: 0, stagger: 0.2, duration: 1.2, ease: "expo.out"
    });

    // Venue Card
    const cardTl = gsap.timeline({
      scrollTrigger: { trigger: ".venue-card", start: "top 80%" }
    });
    cardTl.from(".venue-card", { y: 50, opacity: 0, duration: 1.5, ease: "expo.out" })
      .from([".venue-corner-tl", ".venue-corner-br"], { width: 0, height: 0, duration: 1.2, stagger: 0.3, ease: "power2.inOut" }, "-=0.8")
      .from([".venue-icon", ".venue-title", ".venue-date"], { y: 20, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out" }, "-=0.5")
      .from(".timeline-item", { scale: 0.9, opacity: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" }, "-=0.3")
      .from([".venue-address", ".venue-cta"], { y: 20, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out" }, "-=0.5");

    // Agenda Header
    gsap.from(".agenda-header > *", {
      scrollTrigger: { trigger: ".agenda-header", start: "top 85%" },
      y: 30, opacity: 0, stagger: 0.2, duration: 1.2, ease: "expo.out"
    });

    // Agenda Line
    gsap.from(".agenda-line", {
      scrollTrigger: { trigger: ".agenda-container", start: "top 80%", end: "bottom 80%", scrub: 1 },
      scaleY: 0, transformOrigin: "top", ease: "none"
    });

    // Individual Agenda Items - Matches The Love Story style
    const agendaItems = document.querySelectorAll(".agenda-item-wrapper");
    agendaItems.forEach((item, i) => {
      // FIX: querySelector(".absolute.left-1/2") is INVALID - the '/' in Tailwind
      // class names breaks querySelector. Use querySelectorAll + classList check instead.
      const allAbsolute = item.querySelectorAll('.absolute');
      let node = null;
      allAbsolute.forEach(el => {
        if (el.classList.contains('left-1/2')) node = el;
      });

      // Find the div that contains h4 (the text content block)
      const content = Array.from(item.children).find(el => el.querySelector && el.querySelector('h4'));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // 1. Scale in the node (the circle)
      if (node) {
        tl.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      }

      // 2. Slide in the content (text) from opposite sides alternately
      if (content) {
        tl.from(content, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, node ? "-=0.3" : "0");
      }
    });

    // MC Footer
    const mcFooter = document.querySelector(".agenda-section .mt-32");
    if (mcFooter) {
      gsap.from(mcFooter, {
        scrollTrigger: { trigger: mcFooter, start: "top 90%" },
        y: 40, opacity: 0, duration: 1.5, ease: "expo.out"
      });
    }
  })();

  /* ── Love Story GSAP ── */
  (function () {
    gsap.from("#love-story .story-header > *", {
      scrollTrigger: { trigger: "#love-story .story-header", start: "top 80%" },
      y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out"
    });

    gsap.from(".timeline-line", {
      scrollTrigger: { trigger: "#love-story", start: "top 40%", end: "bottom 80%", scrub: 1 },
      scaleY: 0, transformOrigin: "top center", ease: "none"
    });

    const items = document.querySelectorAll('.story-item');
    items.forEach((item, index) => {
      const text = item.querySelector('.story-text');
      const image = item.querySelector('.story-image');
      const dot = item.querySelector('.story-dot');

      const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 75%" } });
      tl.from(dot, { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" })
        .from(text, { x: index % 2 === 0 ? -100 : 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.3")
        .from(image, { x: index % 2 === 0 ? 100 : -100, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");
    });
  })();

  /* ── Gift Section GSAP ── */
  (function () {
    gsap.from(".gift-header > *", {
      scrollTrigger: { trigger: ".gift-header", start: "top 90%" },
      y: 30, opacity: 0, stagger: 0.15, duration: 1, ease: "expo.out"
    });

    gsap.from(".gift-card-item", {
      scrollTrigger: { trigger: ".gift-cards", start: "top 85%" },
      y: 40, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power3.out",
      clearProps: "all"
    });

    gsap.from(".gift-address", {
      scrollTrigger: { trigger: ".gift-address", start: "top 95%" },
      scale: 0.9, opacity: 0, duration: 1, ease: "power2.out"
    });
  })();

  // Refresh ScrollTrigger after everything is settled
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});
