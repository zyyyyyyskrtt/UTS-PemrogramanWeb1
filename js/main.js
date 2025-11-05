// =======================================================
// File: js/main.js (KODE UTUH FINAL)
// =======================================================

// --- LISTENER UTAMA: Dipanggil saat halaman dimuat ---
// Ini akan memeriksa halaman mana yang sedang aktif dan menjalankan fungsi yang sesuai.
document.addEventListener('DOMContentLoaded', function() {
    
    // Cek halaman mana yang sedang dibuka
    const bodyId = document.body.id || "";

    // Panggil fungsi berdasarkan ID body halaman
    switch (bodyId) {
        case 'page-login':
            setupLoginForm();
            setupModalButtons();
            break;
            
        case 'page-dashboard':
            displayGreeting(); 
            break;
            
        case 'page-stok':
            renderKatalog(); 
            setupStokForm(); // Menghubungkan form tambah stok
            break;
            
        case 'page-checkout':
            populateBookOptions(); // Mengisi dropdown
            displayOrderMaintenance(); // Menampilkan keranjang belanja
            setupOrderFormSubmission(); // Menghubungkan form checkout
            break;
            
        case 'page-tracking':
            checkUrlForTracking(); // Cek jika ada order ID dari URL
            setupTrackingForm(); // Menghubungkan form pencarian
            break;
    }
});


// ==========================================================
// --- FUNGSI GLOBAL UTILITY ---
// ==========================================================

// Shortcut untuk mengambil elemen berdasarkan ID
function $(id) {
    return document.getElementById(id);
}

// Shortcut untuk querySelectorAll (mengembalikan NodeList)
function $$(selector) {
    return document.querySelectorAll(selector);
}

// Format Angka ke Rupiah (Contoh: 100000 -> "Rp 100.000")
function formatRupiah(number) {
    // Cek jika input sudah string "Rp" (dari data.js)
    if (typeof number === 'string' && number.includes('Rp')) {
        return number;
    }
    if (isNaN(number)) return "Rp 0";
    return (
        "Rp " +
        parseInt(number, 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
}

// Mengubah string Rupiah (misal "Rp 180.000") kembali ke angka
function parseRupiah(rupiahString) {
    if (typeof rupiahString === 'number') {
        return rupiahString; // Sudah angka
    }
    if (typeof rupiahString !== 'string') {
        return 0; // Tipe data tidak dikenal
    }
    return parseInt(rupiahString.replace(/[^0-9]/g, ""), 10);
}

// Variabel Global untuk Keranjang Belanja
// Menggunakan localStorage agar data keranjang tidak hilang saat pindah halaman
let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// =======================================================
// --- MODUL 1: LOGIN & MODAL (index.html) ---
// =======================================================
function setupLoginForm() {
    const loginForm = $('login-form');

    if (loginForm) { // Cek apakah form ada
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah halaman reload

            // Mengambil nilai dari input ID "email" dan "password"
            const emailInput = $('email').value.trim();
            const passwordInput = $('password').value;

            // D. Validasi Form (data.js)
            if (!emailInput || !passwordInput) {
                alert("Email dan Password tidak boleh kosong.");
                return;
            }
            
            // Cek apakah data user ada di dataPengguna (dari data.js)
            const user = dataPengguna.find(
                (u) => u.email === emailInput && u.password === passwordInput
            );

            if (user) {
                // Simpan data user di localStorage agar bisa diakses halaman lain
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'dashboard.html'; // Arahkan ke Dashboard
            } else {
                // C. Interaksi UI: Alert (sesuai permintaan soal)
                alert("Email atau Password yang Anda masukkan salah."); 
            }
        });
    }
}

// Fungsi Modal (Pop-up)
function openModal(modalId) {
    const backdrop = $('modal-backdrop');
    const modal = $(modalId);
    if (backdrop) backdrop.style.display = 'block';
    if (modal) modal.style.display = 'block';
}

function closeModal(modalId) {
    const backdrop = $('modal-backdrop');
    const modal = $(modalId);
    if (backdrop) backdrop.style.display = 'none';
    if (modal) modal.style.display = 'none';
}

function setupModalButtons() {
    const forgotPassBtn = $('btnForgot'); 
    const registerBtn = $('btnRegister'); 
    const backdrop = $('modal-backdrop');
    
    // Cek jika elemen-elemen ini ada (hanya di halaman login)
    if (forgotPassBtn) {
        forgotPassBtn.onclick = (e) => { e.preventDefault(); openModal('modal-lupa-password'); }
    }
    if (registerBtn) {
        registerBtn.onclick = (e) => { e.preventDefault(); openModal('modal-daftar'); }
    }
    if (backdrop) {
        backdrop.onclick = () => {
            closeModal('modal-lupa-password');
            closeModal('modal-daftar');
        };
    }

    // Listener untuk tombol close (X) di dalam modal
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            // Temukan modal parent terdekat dari tombol close yang diklik
            let modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
            // Sembunyikan backdrop juga
            if(backdrop) backdrop.style.display = 'none';
        }
    });
    
    // Set info login di modal daftar (sesuai permintaan soal)
    const demoInfo = $("demo-info");
    if (demoInfo) {
      demoInfo.innerHTML = `<p>Gunakan akun admin:</p>
                            <p><strong>Email:</strong> ${akunDemo.email}</p>
                            <p><strong>Password:</strong> ${akunDemo.password}</p>`;
    }
}

// =======================================================
// --- MODUL 2: GREETING DINAMIS (dashboard.html) ---
// =======================================================
function displayGreeting() {
    const greetingElement = $('greetingText');
    if (!greetingElement) return; // Hanya jalankan jika elemen ada

    const hour = new Date().getHours();
    let greetingText;

    if (hour >= 4 && hour < 11) {
        greetingText = "Selamat Pagi";
    } else if (hour >= 11 && hour < 15) {
        greetingText = "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
        greetingText = "Selamat Sore";
    } else {
        greetingText = "Selamat Malam";
    }

    // Ambil nama pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const userName = user ? user.nama.split(' ')[0] : "Pengunjung"; // Ambil nama depan

    greetingElement.textContent = `${greetingText}, ${userName}!`; 
}

// =======================================================
// --- MODUL 3: TAMPILAN KATALOG (stok.html) ---
// =======================================================

// Fungsi untuk menampilkan data dari dataKatalogBuku
function renderKatalog() {
    const container = $('katalog-container');
    if (!container) return; // Hanya jalan jika di halaman stok.html

    container.innerHTML = ''; // Kosongkan dulu

    dataKatalogBuku.forEach((buku) => {
        const card = document.createElement('div'); 
        card.className = 'book-card';
        card.setAttribute('data-id', buku.id); // 'id' sesuai data.js Anda

        card.innerHTML = `
            <img src="${buku.cover}" alt="${buku.namaBarang}" onerror="this.src='img/default.jpg'"> 
            <h4>${buku.namaBarang}</h4> 
            <p class="author">${buku.penulis}</p>
            <p class="price">${formatRupiah(parseRupiah(buku.harga))}</p>
            <p class="stock-info">Stok: <strong id="stok-${buku.id}">${buku.stok}</strong></p>
            
            <div classKA="card-actions">
                <button class="btn-keranjang" onclick="tambahKeKeranjang('${buku.id}')">Tambah ke Keranjang</button>
            </div>
        `;

        // F. Kreativitas Tambahan: Highlight stok rendah (sesuai data.js)
        const stokElement = card.querySelector(`#stok-${buku.id}`);
        if (buku.stok < 10) { // Stok di bawah 10 akan berwarna merah
            stokElement.style.color = '#dc3545'; // Warna merah
            stokElement.style.fontWeight = 'bold';
        }

        container.appendChild(card);
    });
}

// Fungsi untuk menangani form tambah stok baru
function setupStokForm() {
    const addStockForm = $('addStockForm');
    if (!addStockForm) return;

    addStockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = $('newId').value.trim(); 
        const judul = $('newJudul').value.trim();
        const penulis = $('newPenulis').value.trim(); 
        const harga = parseInt($('newHarga').value, 10);
        const stok = parseInt($('newStok').value, 10); 
        const cover = $('newCover').value.trim() || 'img/default.jpg';
        
        // D. Validasi Form sederhana
        if (!id || !judul || !penulis || isNaN(harga) || isNaN(stok)) { 
            alert('Lengkapi data dengan benar. Stok dan Harga harus angka.'); 
            return; 
        }

        // Tambahkan buku baru ke array (hanya di memori)
        dataKatalogBuku.push({
            id: id,
            namaBarang: judul,
            penulis: penulis,
            jenisBarang: "Buku Ajar", // Default
            edisi: "1", // Default
            stok: stok,
            harga: harga, // Simpan sebagai angka
            cover: cover,
        });

        renderKatalog(); // Render ulang katalog
        addStockForm.reset();
        
        alert(`Buku "${judul}" berhasil ditambahkan ke katalog.`);
    });
}

// =======================================================
// --- MODUL 4: CHECKOUT / FORM PEMESANAN ---
// =======================================================

// Fungsi untuk menambah item ke keranjang (cart)
function tambahKeKeranjang(id) {
    const buku = dataKatalogBuku.find((b) => b.id === id); 
    if (!buku) {
        alert("Buku tidak ditemukan!");
        return;
    }
    
    if (buku.stok <= 0) {
        alert(`Maaf, stok untuk ${buku.namaBarang} sudah habis.`);
        return;
    }

    const itemDiKeranjang = cart.find((item) => item.id === id);

    if (itemDiKeranjang) {
        if (itemDiKeranjang.qty < buku.stok) {
            itemDiKeranjang.qty++;
        } else {
            alert(`Stok untuk ${buku.namaBarang} hanya tersisa ${buku.stok}.`);
            return;
        }
    } else {
        cart.push({
            id: buku.id,
            judul: buku.namaBarang,
            harga: parseRupiah(buku.harga), 
            qty: 1,
            stok: buku.stok
        });
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cart)); 
    
    // Update stok di array utama (simulasi)
    buku.stok--;
    
    // Perbarui tampilan di halaman stok (jika kita masih di sana)
    if ($('katalog-container')) {
        renderKatalog();
    }
    
    // Jika user ada di halaman checkout, update tabel keranjang
    if ($('tabel-order-body')) {
        displayOrderMaintenance();
    }

    // Pindah ke halaman checkout jika tombol ditekan dari halaman stok
    if (document.body.id === 'page-stok') {
        if(confirm(`"${buku.namaBarang}" telah ditambahkan. Lanjut ke halaman checkout?`)) {
            window.location.href = 'checkout.html';
        }
    } else {
        alert(`"${buku.namaBarang}" telah ditambahkan ke keranjang.`);
    }
}


// FUNGSI 4.1: Mengisi opsi buku di Form Pemesanan (Halaman Checkout)
function populateBookOptions() {
    const selectBook = $("judul_buku_dropdown"); 
    if (!selectBook) return; 

    dataKatalogBuku.forEach(buku => {
        const option = document.createElement('option');
        option.value = buku.id; 
        option.textContent = `${buku.namaBarang} (Stok: ${buku.stok})`;
        selectBook.appendChild(option);
    });
    
    const addButton = $('add-to-cart-btn');
    if (addButton) {
        addButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            const selectedId = selectBook.value;
            if (selectedId) {
                tambahKeKeranjang(selectedId);
            } else {
                alert("Silakan pilih buku terlebih dahulu.");
            }
        });
    }
}

// FUNGSI 4.2: Menampilkan Riwayat Pesanan di Tabel (Maintenance Data)
function displayOrderMaintenance() {
    const tabelBody = $("tabel-order-body");
    if (!tabelBody) return; 

    tabelBody.innerHTML = ""; 
    let totalKeseluruhan = 0;

    cart.forEach((order) => {
        const row = document.createElement("tr");
        const subtotal = order.harga * order.qty;
        totalKeseluruhan += subtotal;

        row.innerHTML = `
            <td>${order.judul}</td>
            <td>${formatRupiah(order.harga)}</td>
            <td>
                <input type="number" class="qty-input" value="${order.qty}" data-id="${order.id}" min="1" max="${order.stok}" style="width: 60px;">
            </td>
            <td>${formatRupiah(subtotal)}</td>
            <td>
                <button class="btn-delete" data-id="${order.id}">Hapus</button>
            </td>
        `;
        tabelBody.appendChild(row);
    });

    const totalEl = $("total-semua");
    if (totalEl) totalEl.textContent = formatRupiah(totalKeseluruhan);

    setupCartListeners(); 
}

// FUNGSI 4.3: Fungsi untuk tombol Hapus dan Ubah Kuantitas di tabel checkout
function setupCartListeners() {
    // Hapus item
    $$(".btn-delete").forEach((button) => {
        button.addEventListener("click", (e) => {
            const idToDel = e.target.getAttribute("data-id");
            
            const cartItem = cart.find(item => item.id === idToDel);
            const catalogItem = dataKatalogBuku.find(buku => buku.id === idToDel);
            if (catalogItem && cartItem) {
                catalogItem.stok += cartItem.qty; 
            }
            
            cart = cart.filter((item) => item.id !== idToDel);
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            displayOrderMaintenance();
        });
    });

    // Ubah kuantitas
    $$(".qty-input").forEach((input) => {
        input.addEventListener("change", (e) => {
            const idToUpdate = e.target.getAttribute("data-id");
            let newQty = parseInt(e.target.value, 10) || 1;
            
            const itemInCart = cart.find((i) => i.id === idToUpdate);
            const itemInCatalog = dataKatalogBuku.find(b => b.id === idToUpdate);
            
            const originalQtyInCart = itemInCart ? itemInCart.qty : 0;
            const originalStock = itemInCatalog.stok + originalQtyInCart; 

            if (newQty > originalStock) {
                alert(`Stok tidak mencukupi! Sisa stok asli: ${originalStock}.`);
                e.target.value = itemInCart.qty; 
                return;
            }
            
            if (itemInCart && newQty > 0) {
                itemInCatalog.stok = originalStock - newQty;
                itemInCart.qty = newQty;
            } else if (itemInCart && newQty <= 0) {
                itemInCatalog.stok = originalStock; 
                cart = cart.filter((c) => c.id !== idToUpdate);
            }
            
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            displayOrderMaintenance();
        });
    });
}

// FUNGSI 4.4: Menangani form submit pemesanan
function setupOrderFormSubmission() {
    const orderForm = $("pemesanan-form");
    if (!orderForm) return;

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // D. Validasi Form Checkout
        const nama = $("nama-pemesan").value.trim();
        const alamat = $("alamat").value.trim();
        const noHp = $("no-hp").value.trim();
        const metodeBayar = $("metode-bayar").value;

        if (cart.length === 0) {
            alert("Keranjang kosong. Silakan pilih buku terlebih dahulu.");
            return;
        }

        if (!nama || !alamat || !noHp || !metodeBayar) {
            alert("Semua kolom data pemesan harus diisi.");
            return;
        }

        const total = $("total-semua").textContent;
        const nomorDO = 'DO-' + (Math.floor(Math.random() * 9000) + 10000); 

        if (confirm(`✅ Konfirmasi Pesanan: \n\nPemesan: ${nama}\nTotal: ${total}\nMetode: ${metodeBayar}\n\nLanjutkan pemesanan?`)) {
            
            // Simpan data order
            const newOrder = {
                nomorDO: nomorDO,
                nama: nama,
                status: "PROCESSING", 
                ekspedisi: "JNE Express",
                tanggalKirim: new Date().toLocaleDateString('id-ID'),
                paket: "Reguler",
                total: total,
                perjalanan: [
                    {
                        waktu: new Date().toLocaleString('id-ID'),
                        keterangan: "Pesanan Diterima oleh Razy Store."
                    },
                    {
                        waktu: new Date(Date.now() + 3600000).toLocaleString('id-ID'), 
                        keterangan: "Pesanan sedang disiapkan untuk pengiriman."
                    }
                ]
            };
            
            localStorage.setItem(nomorDO, JSON.stringify(newOrder));

            // Kosongkan keranjang
            cart = [];
            localStorage.removeItem("shoppingCart"); 
            
            alert(`🎉 Pemesanan berhasil dikonfirmasi! \nNomor Delivery Order (DO) Anda: ${newOrder.nomorDO}\nSimpan nomor ini untuk melacak pesanan.`);
            
            window.location.href = `tracking.html?order=${newOrder.nomorDO}`;
        }
    });
}


// =======================================================
// --- MODUL 5: TRACKING PENGIRIMAN (tracking.html) ---
// =======================================================

// Fungsi Pembantu untuk mendapatkan detail visual status
function getStatusDetails(statusKey) {
    if (!statusKey) statusKey = 'unknown'; 
    const statusLower = statusKey.toLowerCase();
    
    if (statusLower.includes('dikirim') || statusLower.includes('selesai') || statusLower.includes('delivered')) {
        return { text: 'Pesanan Telah Tiba (100%)', width: '100%', color: '#28a745' };
    } else if (statusLower.includes('perjalanan') || statusLower.includes('in_transit')) {
        return { text: 'Dalam Pengiriman (75%)', width: '75%', color: 'orange' };
    } else if (statusLower.includes('loket') || statusLower.includes('diproses') || statusLower.includes('processing')) {
        return { text: 'Sedang Dikemas (25%)', width: '25%', color: '#007bff' };
    } else {
        return { text: 'Status Tidak Dikenal', width: '0%', color: '#dc3545' };
    }
}

// Fungsi utama untuk mencari dan menampilkan status tracking
function searchTracking() {
    const doNumberInput = $("do-number");
    const resultDiv = $("tracking-result");
    if (!doNumberInput || !resultDiv) return;

    const doNumber = doNumberInput.value.trim().toUpperCase(); 
    
    if (!doNumber) {
        alert("Nomor Delivery Order (DO) tidak boleh kosong.");
        return;
    }

    // Cek data dummy dari data.js (untuk pesanan yang sudah ada)
    let foundOrder = dataTracking[doNumber.replace(/-/g, '')];
    
    // Jika tidak ada di data.js, cek di localStorage (untuk orderan yang baru saja dibuat)
    if (!foundOrder) {
        const storedOrder = localStorage.getItem(doNumber);
        if (storedOrder) {
            foundOrder = JSON.parse(storedOrder);
        }
    }

    if (foundOrder) {
        const details = getStatusDetails(foundOrder.status);

        // Balik urutan riwayat perjalanan (terbaru di atas)
        const riwayatPerjalanan = [...foundOrder.perjalanan].reverse();
        let riwayatHtml = '';
        riwayatPerjalanan.forEach(item => {
            riwayatHtml += `<tr><td>${item.waktu}</td><td>${item.keterangan}</td></tr>`;
        });

        let html = `
            <h3>Hasil Pelacakan Nomor DO: ${foundOrder.nomorDO}</h3>
            
            <p><strong>Nama Pemesan:</strong> ${foundOrder.nama}</p>
            <p><strong>Status Pengiriman:</strong> <span style="color: ${details.color}; font-weight: bold;">${foundOrder.status}</span></p>
            
            <h4>Status Progress 📦</h4>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${details.width}; background-color: ${details.color};">
                    ${details.text}
                </div>
            </div>

            <h4>Detail Pengiriman 📝</h4>
            <ul>
                <li>Ekspedisi: ${foundOrder.ekspedisi}</li>
                <li>Tanggal Kirim: ${foundOrder.tanggalKirim}</li>
                <li>Jenis Paket: ${foundOrder.paket}</li>
                <li>Total Pembayaran: ${foundOrder.total}</li>
            </ul>

            <h4>Riwayat Perjalanan 📍 (Terbaru di atas)</h4>
            <table>
                <thead>
                    <tr><th>Waktu</th><th>Keterangan</th></tr>
                </thead>
                <tbody>
                    ${riwayatHtml}
                </tbody>
            </table>
        `;
        resultDiv.innerHTML = html;
        
    } else {
        // C. Interaksi UI: Alert Box
        alert(`Nomor Delivery Order ${doNumber} tidak ditemukan.`);
        resultDiv.innerHTML = `<p class="error">Nomor Delivery Order <b>${doNumber}</b> tidak ditemukan.</p>`;
    }
}

// Fungsi untuk menghubungkan tombol 'Cari' di halaman tracking
function setupTrackingForm() {
    const trackingForm = $("trackingForm");
    if (!trackingForm) return;

    trackingForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        searchTracking();
    });
}

// Fungsi untuk mengecek jika ada query param 'order' di URL (saat dialihkan dari checkout)
function checkUrlForTracking() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order');
    if (orderId && $("trackingForm")) {
        $("do-number").value = orderId;
        searchTracking(); // Otomatis jalankan pencarian jika ada orderId
    }
}
