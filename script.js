/* =============================================
   lung ta lung lung — Memory Plushies
   script.js
   ============================================= */

// ── LOADER ──────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ── CUSTOM CURSOR ────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .emotion-card, .plushie-card, .video-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorGlow.style.width = '50px';
    cursorGlow.style.height = '50px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(217,184,168,0.5) 0%, transparent 70%)';
  });
  el.addEventListener('mouseleave', () => {
    cursorGlow.style.width = '28px';
    cursorGlow.style.height = '28px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(217,184,168,0.4) 0%, transparent 70%)';
  });
});

// ── NAVBAR SCROLL ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── RAIN EFFECT ──────────────────────────────────
function createRain() {
  const container = document.getElementById('rain');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.height = (Math.random() * 60 + 30) + 'px';
    drop.style.animationDuration = (Math.random() * 1.5 + 0.6) + 's';
    drop.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(drop);
  }
}
createRain();

// ── PARTICLES ────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    container.appendChild(p);
  }
}
createParticles();

// ── SCROLL REVEAL ────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.emotion-card, .plushie-card, .pricing-card, .video-card, .timeline-step, .wall-note, .section-header'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ── MUSIC TOGGLE (nhạc nền) ──────────────────────
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let musicPlaying = false;

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    // Nếu đang phát nhạc cảm xúc thì dừng trước
    stopEmotionMusic();

    if (musicPlaying) {
      bgMusic.pause();
      musicToggle.style.color = 'rgba(217,184,168,0.4)';
      musicToggle.textContent = '♪';
    } else {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {});
      musicToggle.style.color = '#D9B8A8';
      musicToggle.textContent = '♫';
    }
    musicPlaying = !musicPlaying;
  });
}

// ── EMOTION MUSIC ────────────────────────────────
const emotionMusic = document.getElementById('emotionMusic');
let activeEmotionCard = null;

function stopEmotionMusic() {
  if (emotionMusic) {
    emotionMusic.pause();
    emotionMusic.currentTime = 0;
  }
  if (activeEmotionCard) {
    activeEmotionCard.classList.remove('emotion-active');
    activeEmotionCard = null;
  }
}

document.querySelectorAll('.emotion-card').forEach(card => {
  card.addEventListener('click', () => {
    const musicSrc = card.getAttribute('data-music');
    if (!musicSrc) return;

    // Nếu nhấn lại card đang phát → dừng
    if (activeEmotionCard === card) {
      stopEmotionMusic();
      // Khôi phục nhạc nền nếu đang bật
      if (musicPlaying) bgMusic.play().catch(() => {});
      return;
    }

    // Dừng nhạc nền khi phát nhạc cảm xúc
    bgMusic.pause();

    stopEmotionMusic();

    emotionMusic.src = musicSrc;
    emotionMusic.volume = 0.5;
    emotionMusic.play().catch(() => {});

    activeEmotionCard = card;
    card.classList.add('emotion-active');
  });
});

// ── FORM SUBMISSION ──────────────────────────────
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = orderForm.querySelector('.btn-submit span');
    const originalText = btn.textContent;
    btn.textContent = 'Memory Received ♡';
    orderForm.style.pointerEvents = 'none';
    orderForm.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent = originalText;
      orderForm.style.pointerEvents = '';
      orderForm.style.opacity = '';
      orderForm.reset();

      // Show thank-you toast
      showToast('Your memory is on its way to us ♡');
    }, 3000);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: 'rgba(217,184,168,0.15)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(217,184,168,0.3)',
    color: '#F6EDE3',
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    padding: '1rem 2rem',
    borderRadius: '50px',
    zIndex: '9000',
    opacity: '0',
    transition: 'all 0.4s ease',
    fontSize: '0.9rem',
  });
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── VIDEO CARD CLICK (PLACEHOLDER) ───────────────
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    showToast('Video previews coming soon ♡');
  });
});

// ── SMOOTH SECTION ENTRY GRADIENT ────────────────
// Adds a soft color shift to nav based on scroll position
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Could extend to change nav accent color per section
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => sectionObserver.observe(s));

/* =============================================
   THÊM VÀO CUỐI script.js (hoặc trước </body>)
   
   Thay APPS_SCRIPT_URL bằng URL bạn deploy từ
   Google Apps Script (xem hướng dẫn bên dưới)
   ============================================= */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyem0lgGADjP4pKfzhUdmm1y_jIydiQLpaRTo4MmWGSPZuxuHyssSFQheSn0R-FCpEmPw/exec";

/* Ghi đơn hàng vào Google Sheets */
async function submitOrderToSheet() {
  const name     = document.getElementById('cf-name').value.trim();
  const phone    = document.getElementById('cf-phone').value.trim();
  const email    = document.getElementById('cf-email').value.trim();
  const addr     = document.getElementById('cf-addr').value.trim();
  const district = document.getElementById('cf-district').value.trim();
  const city     = document.getElementById('cf-city').value;
  const note     = document.getElementById('cf-note').value.trim();

  const orderData = {
    name,
    phone,
    email,
    address:      addr,
    district,
    city,
    note,
    plushie:      _plushie.name,
    emotion:      _plushie.emotion,
    package:      _pkg.name,
    packagePrice: _pkg.price,
    shipping:     SHIPPING,
    total:        _pkg.price + SHIPPING
  };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      // Apps Script doPost nhận text, không cần Content-Type JSON header
      // vì CORS sẽ chặn preflight — dùng text/plain là an toàn nhất
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(orderData)
    });
  } catch (err) {
    // Không block người dùng nếu lỗi mạng — đơn vẫn hiển thị thành công
    console.warn("Không thể ghi sheet:", err);
  }
}

/* ── OVERRIDE checkoutNext để gọi submitOrderToSheet ở bước 3 ──
   Copy đoạn này vào, nó sẽ override hàm checkoutNext() cũ       */
function checkoutNext() {
  if (_step === 1) {
    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const addr = document.getElementById('cf-addr').value.trim();
    const city = document.getElementById('cf-city').value;
    if (!name || !phone || !addr || !city) {
      showCheckoutToast('Vui lòng điền đầy đủ: Họ tên, SĐT, Địa chỉ và Thành phố nhé 🧸');
      return;
    }
    buildOrderSummary(name, phone, addr);
    _step = 2;

  } else if (_step === 2) {
    const total = _pkg.price + SHIPPING;
    document.getElementById('momoFinalAmount').textContent = fmtVND(total);
    document.getElementById('momoContent').textContent = 'LTLL-' + _plushie.name.toUpperCase();
    _step = 3;

  } else if (_step === 3) {
    // ── Người dùng bấm "Đã chuyển khoản ✓" ──
    const btn = document.getElementById('mmBtnNext');
    btn.textContent = 'Đang ghi đơn hàng...';
    btn.disabled = true;

    submitOrderToSheet().finally(() => {
      btn.disabled = false;
      _step = 4;
      renderCheckoutStep();
    });
    return; // renderCheckoutStep sẽ được gọi trong finally
  }

  renderCheckoutStep();
}