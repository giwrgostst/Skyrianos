document.addEventListener('DOMContentLoaded', () => {
  // === 1. ANIMATION ACTIVATION ===
  const animated = document.querySelectorAll('.info-box, .footer-bar');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  animated.forEach(el => observer.observe(el));

  // === 2. HISTORY POPUP ===
  const openHistory = document.getElementById('openHistory');
  const historyPopup = document.getElementById('historyPopup');
  const closeHistory = document.getElementById('closePopup');
  const historyContent = historyPopup.querySelector('.popup-content');

  openHistory.addEventListener('click', (e) => {
    e.preventDefault();

    // Υπολόγισε την κεντρική θέση της οθόνης του χρήστη
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Βεβαιώσου ότι εμφανίζεται και έχει διαστάσεις
    historyPopup.classList.add('active');
    historyContent.style.opacity = 0;

    // Περίμενε να "ζωντανέψει" το στοιχείο ώστε να μετρήσει το ύψος
    requestAnimationFrame(() => {
      const popupHeight = historyContent.offsetHeight;
      const topPosition = scrollY + (viewportHeight / 2) - (popupHeight / 2);
      historyContent.style.top = `${topPosition}px`;
      historyContent.style.opacity = 1;
    });
  });

  closeHistory.addEventListener('click', () => {
    historyPopup.classList.remove('active');
    historyContent.style.top = '';
  });

  // === BEACHES POPUP ===
  const beaches = [
    {
      title: 'Molos',
      img: 'images/beaches/molos.png',
      desc: 'A long, organized beach near the town, perfect for swimming and sunbathing.'
    },
    {
      title: 'Atsitsa',
      img: 'images/beaches/atsitsa.png',
      desc: 'A lush green beach with turquoise waters and pine trees reaching the sea.'
    },
    {
      title: 'Kalamitsa',
      img: 'images/beaches/kalamitsa.png',
      desc: 'A peaceful sandy beach ideal for families and calm swimming.'
    },
    {
      title: 'Agalipa',
      img: 'images/beaches/agalipa.png',
      desc: 'A hidden gem only accessible by boat, with crystal clear water.'
    },
    {
      title: 'Pefko',
      img: 'images/beaches/pefko.png',
      desc: 'A secluded beach surrounded by rocks and nature, perfect for relaxing.'
    }
  ];

  let currentBeach = 0;
  const openBeaches = document.getElementById('openBeaches');
  const beachesPopup = document.getElementById('beachesPopup');
  const closeBeaches = document.getElementById('closeBeaches');
  const beachesContent = beachesPopup.querySelector('.popup-content');
  const beachImg = document.getElementById('beachImage');
  const beachTitle = document.getElementById('beachTitle');
  const beachDesc = document.getElementById('beachDescription');

  function updateBeach(index) {
    beachImg.style.opacity = 0;
    setTimeout(() => {
      beachImg.src = beaches[index].img;
      beachImg.alt = beaches[index].title;
      beachTitle.textContent = beaches[index].title;
      beachDesc.textContent = beaches[index].desc;
      beachImg.style.opacity = 1;
    }, 300);
  }

  if (openBeaches) {
    openBeaches.addEventListener('click', e => {
      e.preventDefault();

      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      beachesPopup.classList.add('active');
      beachesContent.style.opacity = 0;
      updateBeach(currentBeach);

      requestAnimationFrame(() => {
        const popupHeight = beachesContent.offsetHeight;
        const topPosition = scrollY + (viewportHeight / 2) - (popupHeight / 2);
        beachesContent.style.top = `${topPosition}px`;
        beachesContent.style.opacity = 1;
      });
    });
  }

  if (closeBeaches) {
    closeBeaches.addEventListener('click', () => {
      beachesPopup.classList.remove('active');
      beachesContent.style.top = '';
    });
  }

  document.getElementById('prevBeach').addEventListener('click', () => {
    currentBeach = (currentBeach - 1 + beaches.length) % beaches.length;
    updateBeach(currentBeach);
  });

  document.getElementById('nextBeach').addEventListener('click', () => {
    currentBeach = (currentBeach + 1) % beaches.length;
    updateBeach(currentBeach);
  });

  // --- SIGHTS LOGIC ---
  const sights = [
    {
      image: 'images/sights/17.png',
      title: 'Monastery of Agios Georgios & Byzantine Castle',
      description: 'A stunning hilltop monastery built in the 10th century offering panoramic views and deep religious heritage.'
    },
    {
      image: 'images/sights/18.png',
      title: 'Brooke Square',
      description: 'Commemorates Rupert Brooke with a statue surrounded by whitewashed houses and island charm.'
    },
    {
      image: 'images/sights/24.png',
      title: 'Chora',
      description: 'The capital village of Skyros, full of winding alleys, traditional houses, and vibrant local life.'
    },
    {
      image: 'images/sights/20.png',
      title: 'Traditional Skyrian House',
      description: 'Step into a preserved 19th-century Skyrian house and experience authentic island living.'
    },
    {
      image: 'images/sights/19.png',
      title: 'Agios Nikolaos',
      description: 'A peaceful beach chapel by the sea offering a serene spiritual escape.'
    },
    {
      image: 'images/sights/25.png',
      title: 'Skyrian Horse',
      description: 'A rare breed of miniature horse native to Skyros, known for its beauty and historical significance.'
    },
    {
      image: 'images/sights/28.png',
      title: 'Archaeological Site of Palamari',
      description: 'An early Bronze Age settlement revealing Skyros’ ancient urban structure.'
    },
    {
      image: 'images/sights/29.png',
      title: 'Sea Caves',
      description: 'Natural sea caves carved into the island’s rugged coast, perfect for exploration by boat.'
    }
  ];

  let currentSight = 0;
  const openSights = document.getElementById('openSights');
  const sightsPopup = document.getElementById('sightsPopup');
  const closeSights = document.getElementById('closeSightsPopup');
  const sightsContent = sightsPopup.querySelector('.popup-content');

  function showSight(index) {
    const sight = sights[index];
    const image = document.getElementById('sightImage');
    const title = document.getElementById('sightTitle');
    const desc = document.getElementById('sightDesc');

    // Animation
    image.style.opacity = 0;
    setTimeout(() => {
      image.src = sight.image;
      title.textContent = sight.title;
      desc.textContent = sight.description;
      image.style.opacity = 1;
    }, 250);
  }

  document.getElementById('openSights').addEventListener('click', (e) => {
    e.preventDefault();

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    sightsPopup.classList.add('active');
    sightsContent.style.opacity = 0;
    currentSight = 0;
    showSight(currentSight);

    requestAnimationFrame(() => {
      const popupHeight = sightsContent.offsetHeight;
      const topPosition = scrollY + (viewportHeight / 2) - (popupHeight / 2);
      sightsContent.style.top = `${topPosition}px`;
      sightsContent.style.opacity = 1;
    });
  });

  document.getElementById('closeSightsPopup').addEventListener('click', () => {
    document.getElementById('sightsPopup').classList.remove('active');
    sightsContent.style.top = '';
  });

  document.getElementById('nextSight').addEventListener('click', () => {
    currentSight = (currentSight + 1) % sights.length;
    showSight(currentSight);
  });

  document.getElementById('prevSight').addEventListener('click', () => {
    currentSight = (currentSight - 1 + sights.length) % sights.length;
    showSight(currentSight);
  });

  // === FOOD POPUP ===
  const foodBtn = document.getElementById('openFood') || document.querySelector('a[href="#food"]');
  const foodPopup = document.getElementById('foodPopup');
  const closeFood = document.getElementById('closeFood');
  const foodContent = foodPopup.querySelector('.popup-content');

  const foodData = [
    {
      img: 'images/food/16.png',
      title: 'Slow Cooked Lamb with Potatoes',
      desc: 'Traditional Skyros dish with a wonderful lemon aroma, cooked with potatoes in the oven or pot.'
    },
    {
      img: 'images/food/15.png',
      title: 'Lobster Pasta',
      desc: 'Local gourmet dish with fresh lobster and prawns, ideal for a summer meal by the sea.'
    },
    {
      img: 'images/food/14.png',
      title: 'Ladopita with Xinotyri and Honey',
      desc: 'Sweet pie with local sour cheese, olive oil, and honey — a rare traditional combination.'
    },
    {
      img: 'images/food/12.png',
      title: 'Teroptaria',
      desc: 'Small cheese pies with traditional flavor, filled with local cheese and trachana.'
    },
    {
      img: 'images/food/13.png',
      title: 'Marmarites',
      desc: 'Delicious fried pies filled with sweet pumpkin — an old traditional dessert.'
    }
  ];

  let foodIndex = 0;

  function updateFoodPopup() {
    const img = document.getElementById('foodImage');
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = foodData[foodIndex].img;
      img.onload = () => {
        img.style.opacity = 1;
      };
      document.getElementById('foodTitle').textContent = foodData[foodIndex].title;
      document.getElementById('foodDescription').textContent = foodData[foodIndex].desc;
    }, 250); // χρόνο fade
  }

  document.getElementById('nextFood').addEventListener('click', () => {
    foodIndex = (foodIndex + 1) % foodData.length;
    updateFoodPopup();
  });

  document.getElementById('prevFood').addEventListener('click', () => {
    foodIndex = (foodIndex - 1 + foodData.length) % foodData.length;
    updateFoodPopup();
  });

  foodBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    updateFoodPopup();
    foodPopup.classList.add('active');
    foodContent.style.opacity = 0;

    requestAnimationFrame(() => {
      const popupHeight = foodContent.offsetHeight;
      const topPosition = scrollY + (viewportHeight / 2) - (popupHeight / 2);
      foodContent.style.top = `${topPosition}px`;
      foodContent.style.opacity = 1;
    });
  });

  closeFood.addEventListener('click', () => {
    foodPopup.classList.remove('active');
    foodContent.style.top = '';
  });

  // === CARNIVAL POPUP LOGIC ===
  const openCarnival = document.getElementById('openCarnival');
  const carnivalPopup = document.getElementById('carnivalPopup');
  const closeCarnival = document.getElementById('closeCarnivalPopup');
  const carnivalContent = carnivalPopup.querySelector('.popup-content');

  openCarnival.addEventListener('click', (e) => {
    e.preventDefault();

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    carnivalPopup.classList.add('active');
    carnivalContent.style.opacity = 0;

    requestAnimationFrame(() => {
      const popupHeight = carnivalContent.offsetHeight;
      const topPosition = scrollY + (viewportHeight / 2) - (popupHeight / 2);
      carnivalContent.style.top = `${topPosition}px`;
      carnivalContent.style.opacity = 1;
    });
  });

  closeCarnival.addEventListener('click', () => {
    carnivalPopup.classList.remove('active');
    carnivalContent.style.top = '';
  });

  // Close popup with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      carnivalPopup.classList.remove('active');
    }
  });

  // Κλείσιμο όλων των popups όταν κάνεις κλικ έξω από το περιεχόμενο
  document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      const content = overlay.querySelector('.popup-content');
      const isClickOutside = !content.contains(e.target);

      if (isClickOutside) {
        overlay.classList.remove('active');
        content.style.top = ''; // reset position αν χρησιμοποιείς κεντράρισμα
      }
    });
  });

  // === SCROLL TO TOP ===
  document.getElementById('backToTopBtn').addEventListener('click', () => {
    const start = window.scrollY;
    const duration = 800; // milliseconds
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out effect (quadratic)
      const ease = 1 - Math.pow(1 - progress, 2);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  });

});

// === 4. CURSOR REPEL (excluding popup images) ===
document.addEventListener('mousemove', (e) => {
  const elements = document.querySelectorAll('body *');

  elements.forEach(el => {
    // Skip if element is a popup image
    if (el.classList.contains('popup-img')) return;

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

    if (distance < 120 && distance > 5) {
      const moveX = -(offsetX / distance) * 3;
      const moveY = -(offsetY / distance) * 3;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      el.style.transform = '';
    }
  });
});