document.addEventListener('DOMContentLoaded', () => {
  const unlockScreen = document.getElementById('unlock-screen');
  const countdownScreen = document.getElementById('countdown-screen');
  const birthdayCard = document.getElementById('birthday-card');
  const unlockBtn = document.getElementById('unlock-btn');
  const countdownNumber = document.getElementById('countdown-number');
  const fireworkDisplay = document.getElementById('firework-display');
  const balloonsContainer = document.getElementById('balloons-container');
  const particlesContainer = document.getElementById('particles');

  const fireworks = [
    "💥 ✨ 🎆 ✨ 💥",
    "🎇 💥 🎇 💥 🎇",
    "✨ 🎆 💥 🎆 ✨",
    "💥 🎇 ✨ 🎇 💥"
  ];

  const balloonEmojis = ["🎈", "💖", "🎁", "⭐", "🎉"];

  // Create ambient background particles
  createAmbientParticles();

  // Unlock button click handler
  unlockBtn.addEventListener('click', startSurprise);

  // Allow unlocking by pressing Enter anywhere
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !unlockScreen.classList.contains('hidden')) {
      startSurprise();
    }
  });

  function startSurprise() {
    // Transition Screen 1 -> Screen 2
    unlockScreen.classList.add('fade-out');
    
    setTimeout(() => {
      unlockScreen.classList.add('hidden');
      countdownScreen.classList.remove('hidden');
      countdownScreen.classList.add('fade-in');
      runCountdown();
    }, 500);
  }

  function runCountdown() {
    let timeLeft = 10;
    
    // Spawn initial burst of balloons
    spawnBalloons(20);

    const interval = setInterval(() => {
      timeLeft--;
      
      if (timeLeft > 0) {
        // Update countdown text
        countdownNumber.textContent = timeLeft;
        
        // Cycle fireworks emoji
        fireworkDisplay.textContent = fireworks[timeLeft % fireworks.length];
        
        // Spawn more balloons every second
        spawnBalloons(15);
      } else {
        clearInterval(interval);
        showBirthdayCard();
      }
    }, 1000);
  }

  function spawnBalloons(count) {
    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      
      // Randomize emoji
      const emoji = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
      balloon.textContent = emoji;
      
      // Randomize properties
      const left = Math.random() * 100; // Left position in %
      const delay = Math.random() * 0.8; // Delay in seconds
      const duration = 3 + Math.random() * 3; // Float duration (3-6s)
      const size = 30 + Math.random() * 30; // Size (30-60px)
      
      balloon.style.left = `${left}%`;
      balloon.style.fontSize = `${size}px`;
      balloon.style.animationDelay = `${delay}s`;
      balloon.style.animationDuration = `${duration}s`;
      
      balloonsContainer.appendChild(balloon);
      
      // Clean up DOM after animation completes
      setTimeout(() => {
        balloon.remove();
      }, (duration + delay) * 1000);
    }
  }

  function showBirthdayCard() {
    // Transition Screen 2 -> Screen 3
    countdownScreen.classList.add('fade-out');
    
    setTimeout(() => {
      countdownScreen.classList.add('hidden');
      birthdayCard.classList.remove('hidden');
      
      // Trigger continuous celebratory effects
      celebrateContinuous();
    }, 500);
  }

  function celebrateContinuous() {
    // Periodically spawn decorative floating balloons on the final card
    setInterval(() => {
      if (!birthdayCard.classList.contains('hidden')) {
        spawnBalloons(3);
      }
    }, 1500);

    // Create extra sparkly elements
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        if (!birthdayCard.classList.contains('hidden')) {
          createSparkle();
        }
      }, i * 200);
    }
  }

  function createAmbientParticles() {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      
      const size = 3 + Math.random() * 6;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${6 + Math.random() * 6}s`;
      
      particlesContainer.appendChild(p);
    }
  }

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'particle';
    sparkle.style.background = 'radial-gradient(circle, #fff 10%, rgba(255,182,193,0.8) 70%)';
    
    const size = 8 + Math.random() * 12;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.bottom = `-20px`;
    
    const duration = 2 + Math.random() * 3;
    sparkle.style.animation = `floatUp ${duration}s ease-out forwards`;
    
    particlesContainer.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, duration * 1000);
  }
});
