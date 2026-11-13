## ADDED Requirements

### Requirement: Tautan Tagihan Khusus Penyandang Dana (Payer Shareable Invoice)
Sistem SHALL menyediakan kemampuan untuk membuat tautan publik tagihan mandiri `/invoice/[id]` yang dapat dibagikan kepada orang tua atau penyandang dana via WhatsApp/SMS dengan format rincian yang jelas dan meyakinkan.

#### Scenario: Mahasiswa membagikan tautan pembayaran ke orang tua
- **WHEN** mahasiswa menekan tombol "Bagikan Tagihan ke Orang Tua (Payer)" pada halaman ringkasan pembayaran
- **THEN** sistem menyalin tautan khusus `/invoice/[id]` ke papan klip (*clipboard*) dan membuka dialog siap kirim WhatsApp dengan pesan format sopan yang mencantumkan ringkasan pesanan dan tautan pembayaran.

### Requirement: Halaman Invoice dan Simulasi Pembayaran Instan
Sistem SHALL menyediakan halaman antarmuka invoice yang ramah orang tua dengan tampilan badge verifikasi keamanan kampus, rincian biaya transparan (bebas pungli lapangan), dan simulasi pembayaran via QRIS dinamis atau Nomor Virtual Account (VA).

#### Scenario: Orang tua menyelesaikan pembayaran tagihan
- **WHEN** orang tua membuka tautan invoice dan menekan tombol "Simulasi Bayar Sekarang via QRIS"
- **THEN** sistem memverifikasi pembayaran secara instan, mengubah status pesanan menjadi "Lunas / Terkonfirmasi", dan mengirimkan sinyal konfirmasi ke halaman pelacakan pesanan mahasiswa.

