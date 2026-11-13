"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah biaya sewa pikap di Pindah.in benar-benar pasti tanpa tawar-menawar?",
      a: "Ya, 100% fixed dan transparan. Sistem kami mengkalkulasi tarif secara otomatis berdasarkan jarak tempuh, jenis kendaraan, dan tingkat lantai kos. Harga yang tertera di aplikasi saat konfirmasi adalah harga final tanpa ada biaya tersembunyi.",
    },
    {
      q: "Apakah sudah termasuk orang yang bantu angkat barang (helper)?",
      a: "Tentu! Setiap pemesanan armada sudah otomatis mengikutsertakan 1 tenaga helper profesional yang bertugas membantu proses bongkar-muat door-to-door, mulai dari dalam kamar kos asal hingga masuk ke kamar kos baru.",
    },
    {
      q: "Bagaimana jika orang tua saya yang ingin membayarkan biaya pindahan?",
      a: "Sangat praktis! Di halaman konfirmasi, barcode QRIS resmi langsung tampil di layar. Mahasiswa cukup screenshot barcode QRIS tersebut lalu kirimkan via WhatsApp ke orang tua untuk di-scan melalui aplikasi m-banking (BCA, Mandiri, BRI, dll) atau e-wallet apa saja.",
    },
    {
      q: "Mengapa Pindah.in tidak menjual kardus bekas atau bubble wrap secara terpisah?",
      a: "Berdasarkan riset survei kebutuhan mahasiswa di Surabaya, mahasiswa umumnya sudah memiliki wadah mandiri (box kontainer plastik / tas besar) dan lebih memprioritaskan kepastian armada pikap serta tenaga helper. Oleh karena itu, kami fokus pada kepastian armada dan helper demi efisiensi biaya layanan mahasiswa.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-surface-50 border-t border-surface-200/80 mb-8 sm:mb-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-surface-700 bg-white border border-surface-200 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
            <HelpCircle className="h-4 w-4 text-brand-600" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-surface-950">FAQ Pindah.in Surabaya</h2>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Informasi lengkap seputar operasional, armada, dan pembayaran
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-3xl border border-surface-200/90 bg-white overflow-hidden transition-all shadow-subtle hover:shadow-card"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-surface-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-surface-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-surface-600 leading-relaxed border-t border-surface-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
