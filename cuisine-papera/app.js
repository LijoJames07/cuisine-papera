/* ==========================================================================
   CUISINE PAPERA - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

// Restaurant WhatsApp Contact Number (Gonikoppa Store)
const RESTAURANT_WHATSAPP_NUMBER = "+91 8884667890";

// Digital Menu Database
const menuDatabase = [
    // Kodava Pork Specials
    
    { id: 2, name: "Pork Chudal (Sizzling Fry)", category: "kodava", price: "₹350", desc: "Crispy fried pork pieces with roasted bird's eye chili and curry leaves.", isChefSpecial: false, isVeg: false },
    { id: 3, name: "Pandi Curry (Classic)", category: "kodava", price: "₹310", desc: "Traditional dark Kodava pork gravy cooked in black pepper & coriander paste.", isChefSpecial: false, isVeg: false },
    { id: 4, name: "Adivasi Claypot Pork", category: "kodava", price: "₹350", desc: "Tribal recipe cooked with wild green chilies and ginger-garlic in clayware.", isChefSpecial: true, isVeg: false },
    { id: 5, name: "Coorg Pork Pepper Roast", category: "kodava", price: "₹330", desc: "Dry roasted pork tossed in freshly crushed Coorg black pepper.", isChefSpecial: false, isVeg: false },

    // Biryanis & Dum Rice
    { id: 6, name: "Bamboo Pork Biryani", category: "biryani", price: "₹380", desc: "Fragrant rice & spiced pork slow-steamed inside raw bamboo stalks.", isChefSpecial: true, isVeg: false },
    { id: 7, name: "Chicken Pot Biryani", category: "biryani", price: "₹310", desc: "Dum-cooked claypot biryani with tender chicken pieces & Coorg cardamoms.", isChefSpecial: false, isVeg: false },
    { id: 8, name: "Mutton Dum Biryani", category: "biryani", price: "₹420", desc: "Rich royal mutton biryani cooked with pure desi ghee and saffron.", isChefSpecial: false, isVeg: false },
    { id: 9, name: "Veg Pot Biryani", category: "biryani", price: "₹260", desc: "Seasonal vegetables, paneer & mushrooms steamed with aromatic spices.", isChefSpecial: false, isVeg: true },
    { id: 10, name: "Coorg Ney Choru (Ghee Rice)", category: "biryani", price: "₹180", desc: "Short-grain jeerakasala rice cooked in rich cow ghee and cashew nuts.", isChefSpecial: false, isVeg: true },

    // Chicken & Mutton
    { id: 11, name: "Kodava Koli Curry (Chicken Gravy)", category: "chicken", price: "₹290", desc: "Traditional country chicken curry cooked with roasted coconut & spices.", isChefSpecial: false, isVeg: false },
    { id: 12, name: "Coorg Chicken Pepper Fry", category: "chicken", price: "₹280", desc: "Spicy pan-fried chicken chunks loaded with crushed black pepper.", isChefSpecial: false, isVeg: false },
    { id: 13, name: "Mutton Erachi Curry", category: "chicken", price: "₹390", desc: "Tender goat meat slow-cooked in rich Coorg style thick dark gravy.", isChefSpecial: true, isVeg: false },

    // Pure Veg Specialties
    { id: 14, name: "Baimbale Curry (Bamboo Shoot)", category: "veg", price: "₹230", desc: "Tender fresh seasonal bamboo shoot cooked in Kodava chili masala.", isChefSpecial: true, isVeg: true },
    { id: 15, name: "Kummu Fry (Wild Mushroom)", category: "veg", price: "₹240", desc: "Fresh hill mushrooms sauteed with onions, pepper, and coconut oil.", isChefSpecial: false, isVeg: true },
    { id: 16, name: "Coorg Mixed Veg Curry", category: "veg", price: "₹210", desc: "Garden fresh vegetables simmered in aromatic coconut spice paste.", isChefSpecial: false, isVeg: true },
    { id: 17, name: "Kadu Mange Curry (Wild Mango)", category: "veg", price: "₹220", desc: "Sweet & tangy Coorg wild mango curry (Seasonal availability).", isChefSpecial: false, isVeg: true },

    // Kodava Breads & Sides
    { id: 18, name: "Kadambuttu (Steamed Rice Balls - 4 pcs)", category: "breads", price: "₹80", desc: "Traditional melt-in-mouth steamed broken rice balls. Best with Pandi Curry.", isChefSpecial: true, isVeg: true },
    { id: 19, name: "Akki Oti (Coorg Rice Roti - 2 pcs)", category: "breads", price: "₹60", desc: "Soft flattened rice bread roasted on tawa.", isChefSpecial: false, isVeg: true },
    { id: 20, name: "Noolputtu (String Hoppers - 4 pcs)", category: "breads", price: "₹90", desc: "Fine steamed rice noodles served with coconut milk.", isChefSpecial: false, isVeg: true }
];

let currentCategory = 'all';
let selectedDishForModal = { name: '', price: '' };

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupMobileNav();
    setupScrollHeader();
    setupDefaultDate();
});

// Setup Default Date to Today in Reservation Form
function setupDefaultDate() {
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
}

// Sticky Navbar Scroll Effect
function setupScrollHeader() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '14px 0';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

// Mobile Nav Toggle
function setupMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

// Render Digital Menu Items
function renderMenu() {
    const container = document.getElementById('menuListContainer');
    const searchVal = document.getElementById('menuSearchInput')?.value.toLowerCase().trim() || '';
    
    if (!container) return;

    let filtered = menuDatabase.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchVal) || 
                              item.desc.toLowerCase().includes(searchVal) ||
                              item.price.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: white; border-radius: 12px;">
                <i class="fa-solid fa-utensils" style="font-size: 2.5rem; color: var(--accent-terracotta); margin-bottom: 12px;"></i>
                <h3 style="color: var(--primary-brown);">No matching dishes found</h3>
                <p style="color: var(--text-muted);">Try searching for "Pork", "Biryani", "Kadambuttu", or choose another category.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="menu-item-row">
            <div class="mi-info">
                <h4>
                    ${item.name}
                    ${item.isVeg ? '<span style="color:#2E7D32; font-size:0.75rem;"><i class="fa-solid fa-circle"></i> Veg</span>' : '<span style="color:#A84A2A; font-size:0.75rem;"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>'}
                    ${item.isChefSpecial ? '<span style="background:var(--accent-gold); color:var(--primary-dark); padding:2px 8px; border-radius:10px; font-size:0.65rem; font-weight:700;">CHEF\'S CHOICE</span>' : ''}
                </h4>
                <p>${item.desc}</p>
            </div>
            <div class="mi-action">
                <span class="mi-price">${item.price}</span>
                <button class="mi-btn" onclick="openOrderModal('${escapeHtml(item.name)}', '${item.price}')" title="Inquire on WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Category Tab Switcher
function setMenuCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('#menuTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderMenu();
}

// Real-time Search Handler
function filterMenu() {
    renderMenu();
}

// Helper to escape HTML characters
function escapeHtml(str) {
    return str.replace(/'/g, "\\'");
}

// ORDER MODAL LOGIC
function openOrderModal(dishName, price) {
    selectedDishForModal = { name: dishName, price: price };
    document.getElementById('modalDishName').innerText = dishName;
    document.getElementById('modalDishPrice').innerText = price;
    document.getElementById('orderModal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function submitModalWhatsApp() {
    const custName = document.getElementById('modalCustomerName').value.trim() || 'Guest';
    const message = `Hello Cuisine Papera! My name is ${custName}. I am interested in inquiring/ordering: ${selectedDishForModal.name} (${selectedDishForModal.price}). Please confirm availability!`;
    const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    closeOrderModal();
}

// MASONRY GALLERY FILTER
function filterGallery(category, btn) {
    document.querySelectorAll('.g-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// LIGHTBOX LOGIC
function openLightbox(imgUrl, captionText) {
    const lightbox = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    
    img.src = imgUrl;
    caption.innerText = captionText;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightboxModal').style.display = 'none';
}

// RESERVATION & EVENT TAB SWITCH
function switchResTab(tabType) {
    const tabTableBtn = document.getElementById('tabTableBtn');
    const tabEventBtn = document.getElementById('tabEventBtn');
    const bookingTypeInput = document.getElementById('bookingType');

    if (tabType === 'table') {
        tabTableBtn.classList.add('active');
        tabEventBtn.classList.remove('active');
        bookingTypeInput.value = "Table Reservation";
    } else {
        tabEventBtn.classList.add('active');
        tabTableBtn.classList.remove('active');
        bookingTypeInput.value = "Private Party / Event Booking";
    }
}

// HANDLE RESERVATION FORM SUBMISSION
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const type = document.getElementById('bookingType').value;
    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;
    const seating = document.getElementById('resSeating').value;
    const notes = document.getElementById('resNotes').value.trim() || 'None';

    const waText = 
`📌 *NEW ${type.toUpperCase()} REQUEST - CUISINE PAPERA*
---------------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📅 *Date:* ${date}
⏰ *Time:* ${time}
👥 *Guests:* ${guests}
🪑 *Seating:* ${seating}
📝 *Special Notes:* ${notes}
---------------------------------------
Please reply to confirm my table!`;

    const targetUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    
    // Open WhatsApp in new window
    window.open(targetUrl, '_blank');
    
    alert(`Thank you, ${name}! Your ${type} details have been prepared. Sending via WhatsApp to Cuisine Papera Gonikoppa now!`);
    document.getElementById('reservationForm').reset();
    setupDefaultDate();
}
