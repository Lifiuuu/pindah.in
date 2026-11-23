"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah biaya sewa pikap di Pindah.in pasti tanpa tawar-menawar?",
      a: "Ya, 100% fixed dan transparan. Tarif dihitung otomatis berdasarkan jarak tempuh, jenis kendaraan, dan tingkat lantai kos. Tanpa biaya tersembunyi di lokasi.",
    },
    {
      q: "Apakah sudah termasuk helper bantu angkat barang?",
      a: "Tentu! Setiap pemesanan armada sudah termasuk 1 helper profesional yang membantu angkut door-to-door dari kamar lama hingga masuk kamar baru.",
    },
    {
      q: "Bagaimana jika orang tua yang ingin membayar?",
      a: "Sangat mudah. Di halaman konfirmasi, barcode QRIS resmi langsung tampil. Cukup screenshot barcode dan kirimkan via WhatsApp ke orang tua untuk di-scan via m-banking atau e-wallet apa saja.",
    },
    {
      q: "Apakah barang terikat aman selama perjalanan?",
      a: "Ya, armada dilengkapi tali pengikat standar logistik dan terpal pelindung hujan/panas untuk memastikan semua barang kos sampai dalam kondisi aman.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-surface-50 border-t border-surface-200/80 mb-8 sm:mb-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-surface-950">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            Informasi seputar operasional, helper, dan pembayaran
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-surface-200/80 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-surface-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-surface-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-surface-600 leading-relaxed border-t border-surface-100 pt-3">
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
