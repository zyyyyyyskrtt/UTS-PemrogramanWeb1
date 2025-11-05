// =======================================================
// File: js/data.js (Data Statis)
// =======================================================

// --- Akun Demo untuk Login (Modul 1) ---
const akunDemo = { 
  email: "razyalfarisi30@gmail.com", 
  password: "uts12345" 
};

// Data Pengguna (Untuk cari nama)
const dataPengguna = [
  { id: 1, nama: "Rina Wulandari", email: "rina@gmail.com", password: "rina123", role: "User"},
  { id: 2, nama: "Agus Pranoto", email: "agus@gmail.com", password: "agus123", role: "User"},
  { id: 3, nama: "Siti Marlina", email: "siti@gmail.com", password: "siti123", role: "Admin"},
  { id: 4, nama: "Razy Al Farisi", email: "razyalfarisi30@gmail.com", password: "uts12345", role: "Admin"}
];

// --- Data Katalog Buku (Modul 3) ---
// Pastikan nama file di "cover" SAMA PERSIS dengan nama file di folder img/
const dataKatalogBuku = [
  {
    id: "B001",
    namaBarang: "Pengantar Ilmu Komunikasi",
    penulis: "Prof. Agus",
    harga: 99000,
    stok: 10,
    cover: "img/pengantar_komunikasi.jpg" 
  },
  {
    id: "B002",
    namaBarang: "Manajemen Keuangan",
    penulis: "Rafi Ahmad",
    harga: 85000,
    stok: 8,
    cover: "img/manajemen_keuangan.jpg"
  },
  {
    id: "B003",
    namaBarang: "Mikrobiologi Dasar",
    penulis: "Velly",
    harga: 120000,
    stok: 5,
    cover: "img/mikrobiologi.jpg" 
  },
  {
    id: "B004",
    namaBarang: "Kepemimpinan",
    penulis: "Natasya",
    harga: 110000,
    stok: 6,
    cover: "img/kepemimpinan.jpg"
  },
  {
    id: "B005",
    namaBarang: "Perkembangan Anak Usia Dini",
    penulis: "Razy Al Farisi",
    harga: 250000,
    stok: 12,
    cover: "img/paud_perkembangan.jpg" 
  }
];

// --- Data Awal Riwayat Pemesanan (Modul 4) ---
// Ini adalah array yang akan diisi oleh form checkout.
let dataPesanan = [
  { 
    id: 1, // ID pesanan
    kodeBuku: "B003", // Kode dari dataKatalogBuku
    judul_buku: "Mikrobiologi Dasar", 
    jumlah: 1, 
    nama_pembeli: "Salsa Nabila",
    metode_pembayaran: "COD" 
  },
  { 
    id: 2, // ID pesanan
    kodeBuku: "B005", // Kode dari dataKatalogBuku
    judul_buku: "Perkembangan Anak Usia Dini", 
    jumlah: 1, 
    nama_pembeli: "Putri Zahwa",
    metode_pembayaran: "VA" 
  }
];

// --- Data Simulasi Tracking (Modul 5) ---
// Ini adalah data dummy untuk dilacak menggunakan Nomor DO
// Kuncinya (e.g., "DO2025001") harus unik
const dataTrackingSimulasi = {
  "DO-2025001": {
    nomorDO: "DO-2025001",
    nama: "Salsa Nabila",
    status: "IN_TRANSIT", // Status: PROCESSING, IN_TRANSIT, DELIVERED
    ekspedisi: "JNE",
    tanggalKirim: "2025-10-20",
    paket: "0JKT01",
    total: "Rp 120.000",
    perjalanan: [
      { waktu: "2025-10-20 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Razy Store" },
      { waktu: "2025-10-20 14:07:56", keterangan: "Tiba di Hub: TANGERANG SELATAN" },
      { waktu: "2025-10-21 08:00:00", keterangan: "Diteruskan ke Hub: JAKARTA BARAT" },
    ]
  },
  "DO-2025002": {
    nomorDO: "DO-2025002",
    nama: "Putri Zahwa",
    status: "DELIVERED",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-10-22",
    paket: "0UPBJJBDG",
    total: "Rp 250.000",
    perjalanan: [
      { waktu: "2025-10-22 11:00:00", keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Razy Store" },
      { waktu: "2025-10-23 09:15:00", keterangan: "Tiba di Hub: BANDUNG" },
      { waktu: "2025-10-23 14:30:00", keterangan: "Selesai Antar. Penerima: Putri" }
    ]
  }
};
