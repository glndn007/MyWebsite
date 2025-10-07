document.addEventListener('DOMContentLoaded', function() {
  // --- Modal open/close/scroll ---
  const modal = document.getElementById('jacketModal');
  const shopBtn = document.querySelector('.shop-now-btn');
  const closeBtn = modal ? modal.querySelector('.close') : null;
  const slider = modal ? modal.querySelector('.jacket-slider') : null;

  if (shopBtn && modal) {
    shopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  function closeModal(){
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  window.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // scroll controls
  const leftBtn = document.getElementById('scrollLeftJacket');
  const rightBtn = document.getElementById('scrollRightJacket');
  if (slider && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => slider.scrollBy({ left: -300, behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => slider.scrollBy({ left: 300, behavior: 'smooth' }));
  }

  // --- Cart logic (merged) ---
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function attachBuyButtons() {
    document.querySelectorAll('.buy-button').forEach(btn => {
      if (btn.dataset.listener) return; // avoid double attaching
      btn.dataset.listener = '1';
      btn.addEventListener('click', function() {
        const container = btn.closest('.jacket-item') || btn.closest('.price') || btn.parentElement;
        const nameEl = container ? container.querySelector('h4, h3') : null;
        const priceEl = container ? container.querySelector('p') : null;
        const name = nameEl ? nameEl.innerText.trim() : (btn.getAttribute('data-product') || 'Product');
        const priceText = priceEl ? priceEl.innerText.trim() : '0';
        const price = parseFloat(priceText.replace(/[^0-9\.]/g,'')) || 0;
        const id = btn.getAttribute('data-product') || name;

        const product = { id, name, price, quantity: 1 };
        const existing = cart.find(item => item.id === product.id);
        if (existing) existing.quantity += 1;
        else cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
      });
    });
  }

  // Attach buy buttons now
  attachBuyButtons();

  // If you dynamically add items later, call attachBuyButtons() again.

  // Checkout button behavior inside modal (send user to cart page)
  document.querySelectorAll('.checkout-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Option: automatically add this item first (we use same behavior as buy-button if needed)
      const parent = btn.closest('.jacket-item');
      if (parent) {
        const addBtn = parent.querySelector('.buy-button');
        if (addBtn) addBtn.click(); // add one to cart before checkout
      }
      // Navigate to cart page
      window.location.href = 'cart.html';
    });
  });

}); // DOMContentLoaded


  document.querySelectorAll(".buy-button").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("productModal").style.display = "flex";
    });
  });

  // Close button
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
  });

  
  window.addEventListener("click", (e) => {
    let modal = document.getElementById("productModal");
    if (e.target === modal) modal.style.display = "none";
  });


  document.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("productModal").style.display = "flex";
    });
  });

   // Add to Cart button
  document.getElementById("addToCart").addEventListener("click", () => {
    let size = document.getElementById("size").value;
    let qty = document.getElementById("quantity").value;
    let product = document.getElementById("productName").innerText;

    alert(product + " (" + size + " x" + qty + ") added to cart!");
    // dito ka na maglalagay ng real cart logic kung meron ka na
  });

  // Checkout button
  document.getElementById("checkout").addEventListener("click", () => {
    
    window.location.href = "checkout.php";
  });


  document.addEventListener('DOMContentLoaded', function () {
  const searchBar = document.getElementById('searchBar');
  const productRows = document.querySelectorAll('#products .row'); // matches your code (.row per product)
  const noResults = document.getElementById('noResults');

  if (!searchBar || productRows.length === 0) return;

  function updateNoResults() {
    const anyVisible = Array.from(productRows).some(r => r.style.display !== 'none');
    noResults.style.display = anyVisible ? 'none' : 'block';
  }

  // filter by STARTS WITH (first letters). Case-insensitive.
  searchBar.addEventListener('input', function (e) {
    const q = e.target.value.trim().toLowerCase();

    if (q === '') {
      productRows.forEach(r => r.style.display = '');
      updateNoResults();
      return;
    }

    productRows.forEach(r => {
      // your product name is in <h4> inside .price
      const nameEl = r.querySelector('.price h4') || r.querySelector('h4');
      const name = nameEl ? nameEl.innerText.trim().toLowerCase() : '';
      if (name.startsWith(q)) r.style.display = '';
      else r.style.display = 'none';
    });

    updateNoResults();
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // Get all modal triggers (you'll need to add these to your product buttons)
  const productButtons = document.querySelectorAll("[data-modal-target]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  // Open modal
  productButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "block";
    });
  });

  // Close modal when clicking the close button
  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", event => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});



document.querySelectorAll(".addToCart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    // kunin quantity ng input sa loob ng modal na pinindot
    const modal = button.closest(".modal");
    const quantityInput = modal.querySelector("input[type='number']");
    const quantity = parseInt(quantityInput.value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity}x ${name} added to cart!`);
    window.location.href = "cart.html";
  });
});


document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Upper White Cotton Longsleeve";
  const price = 63.90;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "P-Pants Black";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Upper White Cotton Longsleeve";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Basic Upper White T-Shirt";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Summer SED T-Shirt";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Mac & Bernt Sweatwear";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});
document.getElementById("addToCart2").addEventListener("click", () => {
  const name = "Loose Wide Leg Pants";
  const price = 9.45;
  const quantity = 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
});

document.querySelectorAll("#addToCart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const quantity = 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
    window.location.href = "cart.html";
  });
});


function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// One global click handler for all modals
window.onclick = function(event) {
  const modals = ["menModal", "womenModal", "jacketModal"]; // ← Dinagdagan ng jacketModal
  modals.forEach(function(id) {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}



function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === product.name && item.size === product.size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " (" + product.size + ") added to cart!");
}
