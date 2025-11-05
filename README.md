# Proyek Aplikasi Toko Buku - UTS Pemrograman Web 1

Ini adalah proyek aplikasi web sederhana untuk simulasi pemesanan buku online. Proyek ini dibuat untuk memenuhi tugas Ujian Tengah Semester mata kuliah Pemrograman Web 1.

Aplikasi ini dibangun murni menggunakan HTML, CSS, dan JavaScript (ES6+), dengan data yang disimpan secara lokal di dalam file `data.js` (Array JSON) dan `localStorage` peramban.

---

## 1. Halaman Login (index.html)

Halaman autentikasi pengguna dengan validasi input dan modal untuk fitur tambahan.

**Fitur:**
* Input email dan password dengan validasi format.
* Alert pop-up untuk notifikasi error saat login gagal.
* Tombol "Lupa Password" dan "Daftar" (dalam bentuk modal box/pop up).
* Kredensial Login: `razyalfarisi30@gmail.com` / `uts12345`

![Tampilan Halaman Login](img/Index.jpg)  ---

## 2. Dashboard Menu (dashboard.html)

Halaman utama setelah berhasil login.

**Fitur:**
* Menampilkan "greeting" (Selamat Pagi/Siang/Sore) berdasarkan waktu lokal pengguna.
* Menu navigasi utama berbasis *grid* untuk mengakses semua modul aplikasi.

![Tampilan Dashboard](img/Dashboard.jpg) ---

## 3. Informasi Stok/Katalog (stok.html)

Menampilkan daftar buku yang tersedia.

**Fitur:**
* Menampilkan data buku secara dinamis (menggunakan `document.createElement` dan `.appendChild`) dari *Array JSON* di `data.js`.
* Tampilan menggunakan *Card Layout* yang responsif.
* Fitur untuk menambahkan baris/data stok baru menggunakan JavaScript DOM.

![Tampilan Katalog Stok](img/Stok.jpg) 

## 4. Halaman Pemesanan (checkout.html)

Halaman untuk mengelola keranjang belanja dan menyelesaikan pesanan.

**Fitur:**
* Formulir input untuk data pemesan (Nama, Alamat, HP) dan metode pembayaran.
* Menampilkan data pemesanan (keranjang) yang dapat ditambah atau diubah jumlahnya (Maintenance Data).
* Data keranjang disimpan di `localStorage` agar tidak hilang saat berpindah halaman.
* Menghasilkan Nomor Delivery Order (DO) acak setelah pesanan dikonfirmasi.

![Tampilan Checkout](img/Checkout.jpg) 

## 5. Informasi Pengiriman (tracking.html)

Halaman untuk melacak status pengiriman pesanan (simulasi).

**Fitur:**
* Form input untuk memasukkan Nomor Delivery Order (DO).
* Menampilkan status pengiriman (disimulasikan dengan *progress bar* dan tabel riwayat).
* Menampilkan detail nama pemesan, ekspedisi, dan total pembayaran.

![Tampilan Tracking](img/Tracking.jpg) ```




1.  **Ganti Nama File Gambar:** Ubah nama-nama file seperti `ss-login.jpg`, `ss-dashboard.jpg`, dll., di dalam kode di atas sesuai dengan nama *file screenshot* yang Anda ambil.
2.  **Upload:** Pastikan Anda sudah meng-upload semua file HTML, CSS, JS, dan folder `img` (yang berisi gambar buku DAN gambar *screenshot* Anda) ke GitHub.
3.  **Simpan:** Simpan file `README.md` ini di GitHub.
