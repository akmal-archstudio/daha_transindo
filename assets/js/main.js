(function(){
  "use strict";

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var header = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
    document.querySelectorAll('#mainNav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
      });
    });
  }

  // Header shadow on scroll
  var onScroll = function () {
    if (window.scrollY > 12) {
      header.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Lightbox gallery
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var full = item.getAttribute('data-full');
      var alt = item.querySelector('img') ? item.querySelector('img').alt : '';
      lightboxImg.src = full;
      lightboxImg.alt = alt;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Contact form -> WhatsApp message
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  var WA_NUMBER = '6281386151517';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var route = form.route.value.trim();
      var message = form.message.value.trim();

      if (!name || !phone) {
        formNote.textContent = 'Mohon isi nama dan nomor WhatsApp terlebih dahulu.';
        return;
      }

      var text = 'Halo CV. Daha Citra Transindo, saya ingin menanyakan pengiriman barang.%0A%0A' +
        'Nama: ' + encodeURIComponent(name) + '%0A' +
        'No. WhatsApp: ' + encodeURIComponent(phone) +
        (route ? '%0AAsal - Tujuan: ' + encodeURIComponent(route) : '') +
        (message ? '%0ADetail: ' + encodeURIComponent(message) : '');

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + text;
      window.open(url, '_blank', 'noopener');
      formNote.textContent = 'Membuka WhatsApp… jika tidak terbuka otomatis, hubungi kami langsung.';
    });
  }
})();