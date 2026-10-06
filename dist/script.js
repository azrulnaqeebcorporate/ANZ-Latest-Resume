/* Haesak/Azrul landing page — interactions
   1. Hero keyword rotator ("Website" -> "Web App" -> "Social Media GFX" -> "Infographics" -> "Videos" -> "Landing Pages")
   2. Scroll reveal (sections fade/slide up on scroll)
*/

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Word rotator (horizontal, left-to-right) ---------- */
const rotator = document.getElementById("rotator");

if (rotator) {
  const track = rotator.querySelector(".rotator__track");
  const words = Array.from(track.children);
  const HOLD = 2400; // ms each word stays visible
  const ANIM = 560; // ms — matches CSS transition

  // Clone the first word to the end so the loop wraps seamlessly
  track.appendChild(words[0].cloneNode(true));

  let index = 0;

  const show = () => {
    const el = track.children[index];
    rotator.style.width = el.offsetWidth + "px";
    track.style.transform = `translateX(${-el.offsetLeft}px)`;
  };

  // Measure once fonts are in so widths/offsets are correct
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(show);
  }
  show();
  window.addEventListener("resize", show);

  if (!reduceMotion) {
    setInterval(() => {
      index += 1;
      show();

      // Just past the cloned first word — snap back to the real one
      if (index === words.length) {
        setTimeout(() => {
          track.style.transition = "none";
          rotator.style.transition = "none";
          index = 0;
          show();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              track.style.transition = "";
              rotator.style.transition = "";
            });
          });
        }, ANIM);
      }
    }, HOLD);
  }
}

/* ---------- 2. Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- 3. Portfolio tabs ---------- */
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tab.dataset.tab;
    });
  });
});

/* ---------- 4. Atlas project details ---------- */
const atlasCard = document.querySelector(".card--expandable");
const atlasModal = document.getElementById("atlas-modal");

if (atlasCard && atlasModal) {
  const closeAtlasModal = () => {
    atlasModal.hidden = true;
    atlasCard.focus();
  };
  const openAtlasModal = () => {
    atlasModal.hidden = false;
    atlasModal.querySelector(".project-modal__close").focus();
  };
  atlasCard.addEventListener("click", (event) => {
    if (!event.target.closest(".card__btn")) openAtlasModal();
  });
  atlasCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAtlasModal();
    }
  });
  atlasModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-modal-close]")) closeAtlasModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !atlasModal.hidden) closeAtlasModal();
  });
}
