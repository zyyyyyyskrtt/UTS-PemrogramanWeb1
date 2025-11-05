# Proyek Aplikasi Toko Buku (UTS Pemrograman Web 1)

Ini adalah proyek aplikasi front-end sederhana yang menyimulasikan fungsionalitas dasar toko buku online. Aplikasi ini dibuat murni menggunakan HTML, CSS, dan JavaScript, dengan data yang dikelola secara lokal menggunakan JSON array di dalam file JavaScript.

## Fitur Utama

* **Login Pengguna**: Halaman login statis yang memvalidasi input pengguna terhadap data yang tersimpan di `js/data.js`.
* **Modal Pop-up**: Termasuk modal untuk "Lupa Password" dan "Daftar" sebagai bagian dari persyaratan UI.
* **Dashboard Dinamis**: Menampilkan sapaan "Selamat Pagi/Siang/Sore" berdasarkan waktu lokal pengguna.
* **Katalog Produk Dinamis**: Halaman `stok.html` secara dinamis mengambil data dari `js/data.js` dan menampilkannya sebagai *card* produk.
* **Manajemen Stok**: Fungsionalitas (di `stok.html`) untuk menambahkan item buku baru ke dalam *array* `dataKatalogBuku` (hanya untuk sesi ini, akan reset jika di-*refresh*).
* **Keranjang Belanja (Checkout)**: Halaman `checkout.html` memungkinkan pengguna menambah/mengubah/menghapus item dari keranjang belanja.
* **Simulasi Checkout**: Pengguna dapat mengisi *form* data diri dan "memesan" barang, yang kemudian menghasilkan Nomor Delivery Order (DO) unik.
* **Pelacakan Pengiriman (Tracking)**: Halaman `tracking.html` memungkinkan pengguna memasukkan Nomor DO untuk melihat status simulasi pengiriman, lengkap dengan *progress bar* dan riwayat perjalanan.

## Struktur Folder Proyek
