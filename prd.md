# Product Requirement Document (PRD): Teszta World E-Commerce Platform

**Dokumen Kontrol**
*   **Peran Penulis:** Senior Product Manager & Tech Lead E-Commerce UI/UX
*   **Nama Proyek:** teszta-world E-Commerce Showcase & Store
*   **Tanggal Efektif:** 2026-06-20
*   **Status Dokumen:** DRAF DISETUJUI (Siap Eksekusi)

---

## 1. PROJECT OVERVIEW & VISUAL OBJECTIVES

### 1.1 Product Vision
**Teszta World** adalah platform digital e-commerce fashion avant-garde yang memadukan fungsionalitas belanja retail yang mulus (*seamless*) dengan pengalaman visual interaktif tingkat tinggi (*immersive digital experience*). 

Situs ini dirancang untuk menghancurkan stereotip toko online biasa. Melalui estetika **streetwear Y2K / cyberpunk / industrial** yang kental dengan dominasi warna gelap (*dark-mode dominant*), situs ini memposisikan dirinya sebagai media ekspresi branding teszta-world yang antimainstream, berani, dan interaktif.

### 1.2 Core Tech Stack Recommendation
Untuk memastikan performa memuat halaman di bawah 3 detik dengan rendering animasi 60fps yang stabil, berikut adalah rekomendasi arsitektur teknologi:

*   **Pilihan A: Next.js (React) + Tailwind CSS + Framer Motion + GSAP (Rekomendasi Utama)**
    *   *Kelebihan:* Mendukung Server-Side Rendering (SSR) untuk SEO katalog yang optimal, optimasi gambar otomatis (`next/image`), sistem *routing* halaman yang cepat, dan integrasi mulus dengan Framer Motion (untuk animasi transisi UI) dan GSAP (untuk animasi koordinat kursor/scroll tingkat lanjut).
*   **Pilihan B: Vite + React + Tailwind CSS + Framer Motion + GSAP (Sederhana & Ringan)**
    *   *Kelebihan:* Sangat ringan, waktu build sangat instan, performa Client-Side Rendering (CSR) sangat cepat, cocok untuk arsitektur Single Page Application (SPA) mandiri yang tidak membutuhkan kompleksitas server backend di awal.

---

## 2. FUNCTIONAL REQUIREMENTS & INTERACTIVE FEATURES

### 2.1 MoSCoW Prioritization Table

| Kode Fitur | Area Fitur | Deskripsi Kebutuhan | Kategori (MoSCoW) |
| :--- | :--- | :--- | :--- |
| **FR-01** | Hero Section | *Interactive 3D/Vektor Logo*: Logo utama di tengah layar dengan efek *Mouse Tracking* (miring/berotasi mengikuti gerakan kursor secara 3D). | **Must Have** |
| **FR-02** | Navigation | *Floating Navigation Bar*: Header tipis melayang yang bersih, responsif, dan memudar/menyusut secara dinamis saat di-scroll. | **Must Have** |
| **FR-03** | Showcase | *Scroll-Driven Video/Image Sequence*: Pemutaran video/frame produk berputar layar penuh di latar belakang yang dikendalikan oleh scroll layar. | **Must Have** |
| **FR-04** | Catalog | *3D Floating Carousel / Drag & Spin Gallery*: Tampilan katalog produk interaktif berbentuk kartu 3D melayang yang dapat digeser (*drag*) dan diputar oleh pengguna. | **Must Have** |
| **FR-05** | Product Detail | *Click to Expand & Quick View*: Kartu produk yang diklik akan membesar secara mulus (*layoutId transition*) menampilkan deskripsi, tabel ukuran, dan link order. | **Must Have** |
| **FR-06** | Redirect Links | *Direct Purchase Redirection*: Link CTA pembelian menuju Shopee, Tokopedia, Instagram, dan TikTok. | **Must Have** |
| **FR-07** | Brand Story | *About Page/Section*: Bagian narasi brand mengenai material pakaian (heavyweight fabric) dan konsep desain. | **Should Have** |
| **FR-08** | Transitions | *Running Marquee Text*: Teks berjalan horizontal otomatis sebagai pembatas estetik antar section (menampilkan slogan/campaign). | **Should Have** |
| **FR-09** | Interaction | *Interactive Glitch Transition*: Efek kedipan/glitch transisi visual tipis saat berpindah tab atau memuat modal. | **Could Have** |
| **FR-10** | Checkout | *Native Checkout & Payment*: Integrasi checkout mandiri dengan Midtrans/RajaOngkir (ditunda ke Fase 2). | **Won't Have (Fase 2)** |

### 2.2 Spesifikasi Detail Fitur Interaktif Utama

#### A. Hero Section: Logo Vektor Berbasis Mouse Tracking
*   **Deskripsi Visual:** Logo vektor "TESZTA" diletakkan di bagian tengah atas halaman. Ketika kursor mouse bergerak di layar, logo akan condong, miring, dan berotasi secara halus (efek 3D tilt) mengarah ke koordinat kursor.
*   **Panduan Teknis (Framer Motion & React):**
    *   Gunakan hook `useMotionValue` untuk menangkap koordinat kursor mouse `x` dan `y`.
    *   Gunakan `useTransform` untuk memetakan koordinat piksel menjadi rotasi sudut derajat (maksimal rotasi: `rotateX: -15deg` sampai `15deg`, dan `rotateY: -15deg` sampai `15deg`).
    *   Terapkan animasi `spring` (`stiffness: 150`, `damping: 20`) agar gerakan miring logo terasa kenyal dan natural, tidak kaku.

#### B. Transition Elements: Running Marquee Text
*   **Deskripsi Visual:** Baris teks berjalan horizontal tanpa henti yang membelah halaman secara asimetris. Teks memuat kampanye seperti: `// ALTERED DIMENSION // TESZTA STUDIOS // BATCH.01 RELEASE // RAW STREETWEAR`.
*   **Panduan Teknis:**
    *   Dibuat menggunakan loop animasi CSS tak terbatas (`infinite linear animation`) atau GSAP Marquee Track untuk performa *hardware acceleration* (hanya mengubah properti `transform: translateX`).

#### C. Interactive Product Display: 3D Floating Drag & Spin Gallery
*   **Deskripsi Visual:** Pengguna disuguhkan tumpukan kartu produk 3D yang melayang di layar. Pengguna dapat mengklik dan menggeser (*drag*) ke kiri/kanan untuk memutar posisi kartu-kartu produk tersebut secara melingkar (*carousel melayang*).
*   **Panduan Teknis:**
    *   Setiap kartu produk diatur posisinya di dalam ruang 3D (`transform-style: preserve-3d`) dengan jarak sumbu Z kustom.
    *   Gunakan properti `drag="x"` dari Framer Motion pada kontainer pembungkus.
    *   Petakan nilai pergeseran `x` menjadi rotasi sudut lingkaran (`angle = (dragX / width) * 360`) untuk menciptakan ilusi carousel 3D melingkar yang berputar saat digeser kursor.
*   **Fungsi Mobile:** Fitur geser kursor (*drag*) ini dikonversi otomatis oleh Framer Motion menjadi deteksi *swipe/touch gesture* yang responsif pada layar ponsel pintar.

#### D. Click to Expand & Quick View (Seamless Zoom)
*   **Deskripsi Visual:** Saat salah satu kartu produk di dalam carousel diklik, kartu tersebut akan meluncur membesar menjadi modal detail produk secara penuh (*zoom-in transition*) tanpa perpindahan halaman yang kasar.
*   **Panduan Teknis:**
    *   Implementasikan properti `layoutId` dari Framer Motion pada elemen gambar dan kartu produk.
    *   Saat state `selectedId` aktif, React akan merender modal detail produk di mana elemen yang memiliki `layoutId` yang sama akan dianimasikan membesar secara otomatis oleh mesin layout Framer Motion.

---

## 3. NON-FUNCTIONAL REQUIREMENTS

### 3.1 Micro-Interactions & Hover Effects (Anti-Boring UI)
*   Setiap tombol CTA (seperti tombol Shopee/Tokopedia) harus memiliki efek hover mikro: melebarkan spasi huruf secara halus (`letter-spacing`) atau mengubah warna latar secara perlahan.
*   Semua link navigasi akan memiliki garis bawah interaktif yang tumbuh dari tengah ke sisi kiri-kanan saat di-hover (`scaleX` transisi dari 0 ke 1).

### 3.2 Performance & Asset Optimization
Mengingat tingginya intensitas penggunaan animasi dan pemutaran visual interaktif, optimasi berikut bersifat **wajib**:
*   **Frame Preloading:** Seluruh rangkaian gambar (Image Sequence) harus dimuat terlebih dahulu menggunakan state preloader di awal kunjungan sebelum halaman utama ditampilkan.
*   **Lazy Loading:** Komponen sekunder yang tidak terlihat di layar awal (seperti halaman About atau modal detail) akan dimuat secara malas (*lazy loaded*) menggunakan `React.lazy()` atau Next.js `dynamic()`.
*   **Ukuran Aset Gambar:** Semua gambar katalog produk batch awal dikompresi ke format `.webp` dengan resolusi maksimal `1080x1080` piksel dan ukuran file di bawah **150KB** per gambar.

### 3.3 Mobile-First Responsiveness
*   Navigasi melayang (*Floating Navbar*) akan menciut di mobile dan menyatukan menu ke dalam ikon hamburger minimalis.
*   Efek 3D mouse tracking dinonaktifkan pada perangkat mobile (karena tidak ada kursor fisik) dan digantikan oleh efek kemiringan berbasis giroskop (*device orientation*) jika didukung, atau dinonaktifkan sepenuhnya untuk menghemat baterai ponsel.
*   Carousel 3D dikonversi menjadi galeri geser horizontal sederhana dengan *scroll snap* agar mudah dinavigasi dengan satu jempol.

---

## 4. MVP RELEASE PLAN

### 4.1 Fase 1 (MVP - Peluncuran Awal Interaktif)
*   Halaman Utama dengan animasi pembuka (loader minimalis).
*   Hero Section dengan logo vektor interaktif miring 3D (Mouse Tracking).
*   Video-scroll rotasi produk 360° yang sangat mulus di latar belakang.
*   Carousel 3D produk melayang (3 produk awal) yang dapat digeser (*drag*) dan diklik.
*   Popup Detail Produk yang memuat panduan ukuran (*Size Chart*) dan tombol CTA redirect ke Shopee, Tokopedia, Instagram, dan TikTok.
*   Footer minimalis yang bersih.

### 4.2 Fase 2 (Pengembangan Lanjutan)
*   Integrasi keranjang belanja lokal dan checkout langsung di dalam situs (*native checkout*) menggunakan Payment Gateway (Midtrans/Xendit) dan RajaOngkir.
*   Panel Admin (CMS) untuk mengelola stok, detail produk, dan melacak transaksi masuk secara otomatis.
*   Pengembangan animasi 3D WebGL asli menggunakan model `.glb` / `.gltf` di Three.js / React Three Fiber untuk pengalaman 3D nyata yang lebih dalam.
