// Website Enhancements JavaScript

(function() {
  'use strict';

  // Scroll to top functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form validation enhancement
  const workRequestForm = document.querySelector('.work-request');
  
  if (workRequestForm) {
    workRequestForm.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const checkboxes = workRequestForm.querySelectorAll('input[type="checkbox"]');
      const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

      let isValid = true;
      let errorMessage = '';

      // Validate name
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your name.\n';
      }

      // Validate email
      if (!emailInput.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your email.\n';
      } else if (!isValidEmail(emailInput.value)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
      }

      // Validate at least one service is selected
      if (!isAnyChecked) {
        isValid = false;
        errorMessage += 'Please select at least one service.\n';
      }

      if (!isValid) {
        e.preventDefault();
        alert(errorMessage);
      }
    });

    // Add 'has-value' class to inputs with values
    const textInputs = workRequestForm.querySelectorAll('input[type="text"], input[type="email"]');
    textInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          this.classList.add('has-value');
        } else {
          this.classList.remove('has-value');
        }
      });
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Keyboard navigation for side nav
  const sideNavItems = document.querySelectorAll('.side-nav li');
  
  sideNavItems.forEach((item, index) => {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Update header nav toggle aria-expanded
  const navToggle = document.querySelector('.header--nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Add smooth scroll behavior to the whole page
  document.documentElement.style.scrollBehavior = 'smooth';

  // Console message
  console.log('%cPCBILM Website Enhanced', 'color: #0f33ff; font-size: 20px; font-weight: bold;');
  console.log('%cReady for your next interactive experience!', 'color: #fff; font-size: 14px;');

  // Loading animation (fade in on load)
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // Smooth entrance animation for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe intro options
  const introOptions = document.querySelectorAll('.intro--options > a');
  introOptions.forEach(option => observer.observe(option));

  // Add hover effect sound feedback (visual feedback enhancement)
  const buttons = document.querySelectorAll('button, .cta');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Preload critical images
  const criticalImages = [
    'assets/img/introduction-visual.png',
    'assets/img/about-visual.png',
    'assets/img/contact-visual.png'
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

})();
