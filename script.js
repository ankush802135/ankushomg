// Smooth scroll for "Get in Touch" button
document.getElementById('contactButton').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Back-to-top button functionality
window.addEventListener('scroll', () => {
  document.getElementById('backToTop').style.display = window.scrollY > 200 ? 'block' : 'none';
});
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Preloader removal and start hero typing effect on window load
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
  startTyping();
});

// Scroll progress bar update
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
});

// Typing effect for the hero section text
function startTyping() {
  const text = "Certified Safety Officer";
  let i = 0;
  const speed = 100;
  const typedTextElement = document.getElementById("typed-text");
  (function typeCharacter() {
    if (i < text.length) {
      typedTextElement.innerHTML += text.charAt(i++);
      setTimeout(typeCharacter, speed);
    }
  })();
}

function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('falling-flower');
  // Use a flower emoji (or replace with an image if desired)
  flower.textContent = '🌸';
  // Randomize horizontal position
  flower.style.left = Math.random() * 100 + '%';
  // Randomize the size between 20px and 40px
  flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
  // Randomize animation duration between 4s and 7s
  const duration = Math.random() * 3 + 4;
  flower.style.animationDuration = duration + 's';
  // Optionally, add a random delay so they don't all fall at once
  flower.style.animationDelay = Math.random() * 2 + 's';

  // Append the flower to the container in the About section
  const container = document.getElementById('flower-container');
  container.appendChild(flower);

  // Remove the flower after its animation completes to clean up the DOM
  setTimeout(() => {
    flower.remove();
  }, duration * 1000);
}

// Start the flower rain effect (one flower every 500ms)
setInterval(createFlower, 500);

// Generic typing function with optional callback
function typeText(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  (function typeCharacter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i++);
      setTimeout(typeCharacter, speed);
    } else if (callback) {
      callback();
    }
  })();
}

// Mobile menu toggle
document.getElementById("mobile-menu").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Animated Counters for Achievements
function animateCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}
const achievementsSection = document.getElementById("achievements");
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(achievementsSection);
    }
  });
}, { threshold: 0.5 }).observe(achievementsSection);

// Animate Skill Bars
const skillbarsSection = document.getElementById("skillbars");
if (skillbarsSection) {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skillbar-bar").forEach(bar => {
          bar.style.width = bar.getAttribute("data-percentage") + "%";
        });
        observer.unobserve(skillbarsSection);
      }
    });
  }, { threshold: 0.5 }).observe(skillbarsSection);
}

// FAQ Accordion with Typing Effect
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  answer.innerHTML = "";
  question.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      answer.innerHTML = "";
      answer.style.maxHeight = null;
    } else {
      item.classList.add('active');
      const fullText = answer.getAttribute('data-answer');
      typeText(answer, fullText, 50);
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// About Section Typing & Fade-In
const aboutSection = document.getElementById("about");
const aboutTitleElement = document.getElementById("about-title");
const aboutDescriptionElement = document.getElementById("about-description");
let aboutTypingStarted = false;
const aboutTitleText = "Safety Officer";
const aboutDescriptionText = "With over 2 years of experience in construction safety management, I specialize in risk mitigation, emergency planning, and safety audits. My mission is to create safer work environments and ensure regulatory compliance.";
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !aboutTypingStarted) {
      aboutTypingStarted = true;
      document.querySelector(".about-text-card").classList.add("visible");
      typeText(aboutTitleElement, aboutTitleText, 50, () => {
        typeText(aboutDescriptionElement, aboutDescriptionText, 50);
      });
    }
  });
}, { threshold: 0.5 }).observe(aboutSection);

// Reveal animations for various elements
document.querySelectorAll(
  '.about-text, .service-card, .experience-item, .education-item, .technical-item, .skills-content li, .languages-content li, .hobbies-content li'
).forEach(el => {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 }).observe(el);
});

// Scrollspy for active nav link update
const navLinks = document.querySelectorAll('.nav-links a.nav-link');
document.querySelectorAll('section').forEach(section => {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
        });
      }
    });
  }, { threshold: 0.6 }).observe(section);
});

// Dark mode toggle
document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const icon = this.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});
