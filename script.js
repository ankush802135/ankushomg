// Smooth scroll for "Get in Touch" button
document.getElementById('contactButton').addEventListener('click', function () {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Back-to-top button functionality
window.addEventListener('scroll', function () {
  document.getElementById('backToTop').style.display = window.scrollY > 200 ? 'block' : 'none';
});
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Preloader removal and start hero typing effect on window load
window.addEventListener('load', function () {
  document.getElementById('preloader').style.display = 'none';
  startTyping();
});

// Scroll progress bar update
window.addEventListener('scroll', function() {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});



// Typing effect for the hero section text
function startTyping() {
  const text = "Certified Safety Officer";
  let i = 0;
  const speed = 100; // milliseconds per character
  const typedTextElement = document.getElementById("typed-text");
  function typeCharacter() {
    if (i < text.length) {
      typedTextElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    }
  }
  typeCharacter();
}

// Generic typing function (used for FAQ answers and About section)
function typeText(element, text, speed) {
  let i = 0;
  element.innerHTML = "";
  function typeCharacter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    }
  }
  typeCharacter();
}

// Mobile menu toggle functionality
document.getElementById("mobile-menu").addEventListener("click", function() {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Animated Counters in Achievements Section
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200; // adjust speed if needed
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
const achievementsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      achievementsObserver.unobserve(achievementsSection);
    }
  });
}, { threshold: 0.5 });
achievementsObserver.observe(achievementsSection);

// Animate Skill Bars when Skill Proficiency section is in view
const skillbarsSection = document.getElementById("skillbars");
if (skillbarsSection) {
  const skillbarsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = document.querySelectorAll(".skillbar-bar");
        bars.forEach(bar => {
          const percentage = bar.getAttribute("data-percentage");
          bar.style.width = percentage + "%";
        });
        skillbarsObserver.unobserve(skillbarsSection);
      }
    });
  }, { threshold: 0.5 });
  skillbarsObserver.observe(skillbarsSection);
}

// FAQ Accordion with Typing Effect for Answers
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  // Initially clear the answer text
  answer.innerHTML = "";
  question.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      // Collapse and clear the answer
      item.classList.remove('active');
      answer.innerHTML = "";
    } else {
      // Expand and type out the answer
      item.classList.add('active');
      const fullText = answer.getAttribute('data-answer');
      typeText(answer, fullText, 50); // Adjust typing speed as desired
    }
  });
});

// About Section Typing & Fade-In Effect
const aboutSection = document.getElementById("about");
const aboutTitleElement = document.getElementById("about-title");
const aboutDescriptionElement = document.getElementById("about-description");
let aboutTypingStarted = false;
const aboutTitleText = "Safety Officer";
const aboutDescriptionText = "With over 2 years of experience in construction safety management, I specialize in risk mitigation, emergency planning, and safety audits. My mission is to create safer work environments and ensure regulatory compliance.";

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !aboutTypingStarted) {
      aboutTypingStarted = true;
      // Add the fade-in class to the text container
      document.querySelector(".about-text-card").classList.add("visible");
      // Type the title first
      typeText(aboutTitleElement, aboutTitleText, 50, function() {
        // After the title is typed, type the description
        typeText(aboutDescriptionElement, aboutDescriptionText, 50);
      });
    }
  });
}, { threshold: 0.5 });
aboutObserver.observe(aboutSection);

// Generic typing function with an optional callback
function typeText(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  function typeCharacter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    } else {
      if (callback) callback();
    }
  }
  typeCharacter();
}


// Intersection Observer for reveal animations.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
// Observe elements to animate on scroll
document.querySelectorAll(
  '.about-text, .service-card, .experience-item, .education-item, .technical-item, .skills-content li, .languages-content li, .hobbies-content li'
).forEach(el => {
  revealObserver.observe(el);
});

// Scrollspy for active nav link update
const navLinks = document.querySelectorAll('.nav-links a.nav-link');
const sections = document.querySelectorAll('section');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.6 });
sections.forEach(section => {
  navObserver.observe(section);
});

// Dark mode toggle functionality
document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const icon = this.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

// Smooth scroll for "Get in Touch" button
document.getElementById('contactButton').addEventListener('click', function () {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Back-to-top button functionality
window.addEventListener('scroll', function () {
  document.getElementById('backToTop').style.display = window.scrollY > 200 ? 'block' : 'none';
});
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Preloader removal and start hero typing effect on window load
window.addEventListener('load', function () {
  document.getElementById('preloader').style.display = 'none';
  startTyping();
});

// Scroll progress bar update
window.addEventListener('scroll', function() {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Typing effect for the hero section text
function startTyping() {
  const text = "Certified Safety Officer | Risk Management Specialist";
  let i = 0;
  const speed = 100; // milliseconds per character
  const typedTextElement = document.getElementById("typed-text");
  function typeCharacter() {
    if (i < text.length) {
      typedTextElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    }
  }
  typeCharacter();
}

// Generic typing function (used for FAQ answers and About section)
function typeText(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  function typeCharacter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    } else {
      if (callback) callback();
    }
  }
  typeCharacter();
}

// Mobile menu toggle functionality
document.getElementById("mobile-menu").addEventListener("click", function() {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Animated Counters in Achievements Section
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200; // adjust speed if needed
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
const achievementsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      achievementsObserver.unobserve(achievementsSection);
    }
  });
}, { threshold: 0.5 });
achievementsObserver.observe(achievementsSection);

// Animate Skill Bars when Skill Proficiency section is in view
const skillbarsSection = document.getElementById("skillbars");
if (skillbarsSection) {
  const skillbarsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = document.querySelectorAll(".skillbar-bar");
        bars.forEach(bar => {
          const percentage = bar.getAttribute("data-percentage");
          bar.style.width = percentage + "%";
        });
        skillbarsObserver.unobserve(skillbarsSection);
      }
    });
  }, { threshold: 0.5 });
  skillbarsObserver.observe(skillbarsSection);
}

// FAQ Accordion with Typing Effect for Answers
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  // Initially clear the answer text
  answer.innerHTML = "";
  question.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      // Collapse and clear the answer
      item.classList.remove('active');
      answer.innerHTML = "";
    } else {
      // Expand and type out the answer
      item.classList.add('active');
      const fullText = answer.getAttribute('data-answer');
      typeText(answer, fullText, 50);
    }
  });
});

// About Section Typing & Fade-In Effect for Card (Title and Description)
const aboutSectionEl = document.getElementById("about");
const aboutTypedEl = document.getElementById("about-typed");
let aboutTypingInProgress = false;
const aboutTitleText = "Professional Safety Officer";
const aboutDescriptionText = "With over 8 years of experience in industrial safety management, I specialize in risk mitigation, emergency planning, and safety audits. My mission is to create safer work environments and ensure regulatory compliance.";
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !aboutTypingInProgress) {
      aboutTypingInProgress = true;
      // Add the fade-in class to trigger CSS transition
      aboutTypedEl.classList.add("visible");
      // First type the title, then after it finishes, type the description.
      typeText(aboutTypedEl, aboutTitleText + "<br><br>" + aboutDescriptionText, 50, function() {
        aboutTypingInProgress = false;
      });
    }
  });
}, { threshold: 0.5 });
aboutObserver.observe(aboutSectionEl);

// Intersection Observer for reveal animations.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(
  '.about-text, .service-card, .experience-item, .education-item, .technical-item, .skills-content li, .languages-content li, .hobbies-content li'
).forEach(el => {
  revealObserver.observe(el);
});

// Scrollspy for active nav link update
const navLinks = document.querySelectorAll('.nav-links a.nav-link');
const sections = document.querySelectorAll('section');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.6 });
sections.forEach(section => {
  navObserver.observe(section);
});
});