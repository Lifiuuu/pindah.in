"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah biaya sewa pikap di Pindah.in benar-benar fix tanpa tawar-menawar?",
      a: "Ya, 100% pasti. Sistem kami mengkalkulasi tarif secara otomatis berdasarkan jarak tempuh, jenis kendaraan, dan tingkat lantai kos. Harga yang tertera di aplikasi saat konfirmasi adalah harga final tanpa ada biaya tersembunyi.",
    },
    {
      q: "Apakah sudah termasuk orang yang bantu angkat barang (helper)?",
      a: "Tentu! Setiap pemesanan armada sudah otomatis mengikutsertakan 1 tenaga helper profesional yang bertugas membantu proses bongkar-muat door-to-door, mulai dari dalam kamar kos asal hingga masuk ke kamar kos baru.",
    },
    {
      q: "Bagaimana jika orang tua saya yang ingin membayarkan biaya pindahan?",
      a: "Pindah.in menyediakan fitur 'Bagi Tagihan ke Orang Tua'. Setelah menentukan pesanan, mahasiswa dapat langsung membagikan tautan invoice khusus ke WhatsApp orang tua. Orang tua bisa melihat rincian barang dan membayarnya langsung via QRIS atau Transfer Bank.",
    },
    {
      q: "Mengapa Pindah.in tidak menjual kardus bekas atau bubble wrap secara terpisah?",
      a: "Berdasarkan hasil survei validasi kuesioner mahasiswa (BAB V Refleksi Tim), mahasiswa umumnya sudah memiliki wadah mandiri (box kontainer plastik / tas besar) dan lebih memprioritaskan kepastian kendaraan serta tenaga helper. Oleh karena itu, kami meniadakan stok kardus fisik demi efisiensi biaya layanan.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50 border-t border-slate-100 mb-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="h-3.5 w-3.5 text-brand-600" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">FAQ Pindah.in Surabaya</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-brand-600" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
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

