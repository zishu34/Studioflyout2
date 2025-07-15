// --- Password Protection ---
function checkPassword() {
  const passwordInput = document.getElementById('admin-pass').value;
  if (passwordInput === "studioflyout123") {
    document.getElementById('password-area').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    alert("Incorrect password. Try again.");
  }
}

// --- Save Prices ---
function savePrices() {
  const videoPrice = document.getElementById('new-video-price').value;
  const thumbPrice = document.getElementById('new-thumb-price').value;
  const brandPrice = document.getElementById('new-brand-price').value;

  if (videoPrice) localStorage.setItem('price-video', videoPrice);
  if (thumbPrice) localStorage.setItem('price-thumb', thumbPrice);
  if (brandPrice) localStorage.setItem('price-brand', brandPrice);

  document.getElementById('admin-status').innerText = "✅ Prices updated!";
  loadPrices(); // Apply instantly
}

// --- Load Prices to Homepage ---
function loadPrices() {
  const v = localStorage.getItem('price-video');
  const t = localStorage.getItem('price-thumb');
  const b = localStorage.getItem('price-brand');

  if (document.getElementById('price-video')) {
    document.getElementById('price-video').innerText = v || "₹999";
    document.getElementById('price-thumb').innerText = t || "₹399";
    document.getElementById('price-brand').innerText = b || "₹1499";
  }
}

// --- Add Media (Image/Video) ---
function addMedia() {
  const url = document.getElementById('media-url').value;
  const type = document.getElementById('media-type').value;

  if (!url) {
    alert("Please paste a valid URL.");
    return;
  }

  let mediaList = JSON.parse(localStorage.getItem('portfolio')) || [];
  mediaList.push({ type, url });

  localStorage.setItem('portfolio', JSON.stringify(mediaList));
  document.getElementById('admin-status').innerText = "✅ Media added!";
  document.getElementById('media-url').value = "";

  loadPortfolio(); // Refresh gallery immediately
}

// --- Load Media to Gallery ---
function loadPortfolio() {
  const gallery = document.getElementById('media-gallery');
  if (!gallery) return;

  gallery.innerHTML = ''; // Clear current items
  const mediaList = JSON.parse(localStorage.getItem('portfolio')) || [];

  mediaList.forEach(item => {
    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.url;
      gallery.appendChild(img);
    } else if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      gallery.appendChild(video);
    }
  });
}

// --- INIT ---
window.onload = function () {
  loadPrices();
  loadPortfolio();
};
