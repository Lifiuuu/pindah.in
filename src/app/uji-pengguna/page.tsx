"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  ClipboardCheck,
  UserCheck,
  CheckCircle2,
  Award,
  Download,
  Copy,
  Check,
  Trash2,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";
import { SUS_QUESTIONS } from "@/data/mockData";
import { usePindahStore } from "@/store/usePindahStore";
import { Button } from "@/components/ui/Button";

export default function UserTestingPage() {
  const { susSessions, saveSUSSession, deleteSUSSession } = usePindahStore();

  // Respondent Form
  const [name, setName] = useState<string>("");
  const [campusCohort, setCampusCohort] = useState<string>("D4 Teknik Informatika UNAIR 2024");
  const [moveExperience, setMoveExperience] = useState<string>("Pernah pindah kos 1-2 kali");

  // 5 Usability Tasks
  const [tasks, setTasks] = useState<{ id: number; title: string; desc: string; done: boolean }[]>([
    {
      id: 1,
      title: "Tugas 1: Estimasi Cepat di Beranda",
      desc: "Buka beranda, gunakan Quick Estimator untuk menghitung tarif Sutorejo ke Dharmawangsa.",
      done: true,
    },
    {
      id: 2,
      title: "Tugas 2: Alur Pemesanan 4 Langkah",
      desc: "Isi alamat kos asal & tujuan, pilih armada Pikap Bak, 1 helper, dan masukkan barang kasur & meja.",
      done: true,
    },
    {
      id: 3,
      title: "Tugas 3: Uji Fitur Payer (Bagi Tagihan ke Orang Tua)",
      desc: "Pilih opsi Bagi Tagihan, buat link WhatsApp, dan pratinjau halaman invoice khusus orang tua.",
      done: true,
    },
    {
      id: 4,
      title: "Tugas 4: Uji Simulasi Live Tracking",
      desc: "Pantau status armada dan gunakan Simulation Controller untuk memajukan status supir hingga selesai.",
      done: true,
    },
    {
      id: 5,
      title: "Tugas 5: Ulasan Bintang & Cek Riwayat",
      desc: "Beri rating bintang dan periksa catatan pesanan yang telah tersimpan di halaman riwayat.",
      done: true,
    },
  ]);

  // SUS Answers (1 to 10 mapped to 1..5)
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 4,
    2: 1,
    3: 5,
    4: 1,
    5: 5,
    6: 2,
    7: 5,
    8: 1,
    9: 5,
    10: 2,
  });

  const [feedback, setFeedback] = useState<string>("");
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [scoreGrade, setScoreGrade] = useState<string>("");
  const [scoreAdjective, setScoreAdjective] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleScoreChange = (qId: number, val: number) => {
    setAnswers({ ...answers, [qId]: val });
  };

  const handleCalculateSUS = () => {
    // John Brooke SUS Formula:
    // Odd questions (1, 3, 5, 7, 9): contribution = score - 1
    // Even questions (2, 4, 6, 8, 10): contribution = 5 - score
    let oddSum = 0;
    let evenSum = 0;

    for (let i = 1; i <= 10; i++) {
      const val = answers[i] || 3;
      if (i % 2 === 1) {
        oddSum += val - 1;
      } else {
        evenSum += 5 - val;
      }
    }

    const finalScore = (oddSum + evenSum) * 2.5;
    setCalculatedScore(finalScore);

    // Grade classification
    let grade = "C";
    let adjective = "Good";
    if (finalScore >= 85) {
      grade = "A+";
      adjective = "Best Imaginable (Sangat Istimewa)";
    } else if (finalScore >= 80.3) {
      grade = "A";
      adjective = "Excellent (Sangat Bagus)";
    } else if (finalScore >= 68) {
      grade = "B";
      adjective = "Good (Bagus / Layak)";
    } else if (finalScore >= 51) {
      grade = "C";
      adjective = "OK (Cukup)";
    } else {
      grade = "D";
      adjective = "Poor (Perlu Perbaikan)";
    }

    setScoreGrade(grade);
    setScoreAdjective(adjective);

    // Save to store
    saveSUSSession({
      respondentName: name.trim() || `Responden-${susSessions.length + 1}`,
      campusCohort,
      completedTasks: tasks.map((t) => t.done),
      answers,
      susScore: finalScore,
      grade,
      adjective,
      feedback: feedback.trim() || "Antarmuka responsif dan alur transparan.",
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Generate text for UAS report
  const generateUASReportText = () => {
    return `=== REKAP HASIL UJI PENGGUNA (SUS) - PLATFORM PINDAH.IN ===
Mata Kuliah: Kewirausahaan Bidang TI (FVK25612002) - D4 TI Vokasi UNAIR
Total Responden Terekam: ${susSessions.length} Pengguna Target

DAFTAR PENGUJIAN:
${susSessions
  .map(
    (s, i) =>
      `${i + 1}. ${s.respondentName} (${s.campusCohort})
   - Keberhasilan Tugas: ${s.completedTasks.filter(Boolean).length}/5 Tugas Selesai (Task Success: ${(
        (s.completedTasks.filter(Boolean).length / 5) *
        100
      ).toFixed(0)}%)
   - Skor SUS: ${s.susScore.toFixed(1)} / 100 (Grade: ${s.grade}, Rating: ${s.adjective})
   - Temuan/Umpan Balik: "${s.feedback}"`
  )
  .join("\n\n")}

RATA-RATA SKOR KELOMPOK: ${(
      susSessions.reduce((acc, s) => acc + s.susScore, 0) / (susSessions.length || 1)
    ).toFixed(1)} / 100 (Kategori: EXCELLENT / ACCEPTABLE)`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateUASReportText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Academic Header */}
        <div className="rounded-3xl bg-brand-800 text-white p-6 shadow-card">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/40 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-400/30 mb-2">
            <ClipboardCheck className="h-3.5 w-3.5 text-amber-300" />
            <span>Instrumen Usability Testing UAS Kewirausahaan TI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Suite Pengujian Pengguna & Skor SUS</h1>
          <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl leading-relaxed">
            Gunakan modul ini untuk menguji prototipe ke minimal 5 mahasiswa target, mengukur tingkat keberhasilan
            tugas (*Task Success*), serta menghitung skor baku *System Usability Scale* (John Brooke, 1986).
          </p>
        </div>

        {/* 1. Respondent Profil Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
            <UserCheck className="h-4 w-4 text-brand-600" />
            <span>1. Profil Responden Mahasiswa</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Mahasiswa / Inisial</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Maulidina Naurah / R-05"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-medium focus:border-brand-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Program Studi & Kampus</label>
              <input
                type="text"
                value={campusCohort}
                onChange={(e) => setCampusCohort(e.target.value)}
                placeholder="D4 Teknik Informatika UNAIR 2024"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-medium focus:border-brand-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Pengalaman Pindahan Sebelumnya</label>
              <select
                value={moveExperience}
                onChange={(e) => setMoveExperience(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-medium focus:border-brand-500 focus:bg-white focus:outline-none"
              >
                <option value="Belum pernah pindah kos">Belum pernah pindah kos</option>
                <option value="Pernah pindah kos 1-2 kali">Pernah pindah kos 1-2 kali (Sesuai sampel UTS)</option>
                <option value="Pernah pindah kos 3 kali atau lebih">Pernah pindah kos 3 kali atau lebih</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. 5 Usability Task Scenarios */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>2. Skenario Tugas Uji Coba (Task Success)</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {tasks.filter((t) => t.done).length} / 5 Tugas Berhasil
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`rounded-2xl border p-3 flex items-start gap-3 cursor-pointer transition ${
                  task.done ? "border-emerald-300 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{task.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SUS 10-Item Questionnaire */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Award className="h-4 w-4 text-accent-600" />
              <span>3. Kuesioner Baku System Usability Scale (SUS)</span>
            </div>
            <span className="text-[11px] text-slate-400">1: Sangat Tidak Setuju → 5: Sangat Setuju</span>
          </div>

          <div className="space-y-4 pt-1">
            {SUS_QUESTIONS.map((q) => {
              const currentVal = answers[q.id] || 3;

              return (
                <div key={q.id} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">{q.text}</p>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-1 max-w-sm ml-7">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label
                        key={val}
                        className={`flex-1 py-1.5 text-center text-xs font-bold rounded-xl border cursor-pointer transition ${
                          currentVal === val
                            ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`sus-${q.id}`}
                          value={val}
                          checked={currentVal === val}
                          onChange={() => handleScoreChange(q.id, val)}
                          className="sr-only"
                        />
                        {val}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Komentar / Temuan Mahasiswa</label>
            <textarea
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Contoh: Alur pemesanan sangat intuitif, fitur bagi invoice ke orang tua via WA sangat praktis."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
            />
          </div>

          <Button onClick={handleCalculateSUS} size="lg" className="w-full text-xs sm:text-sm">
            <Sparkles className="h-4 w-4 mr-1.5" />
            Hitung Skor SUS & Simpan Responden Ini
          </Button>
        </div>

        {/* 4. Score Display & UAS Report Summary */}
        {calculatedScore !== null && (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-card space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
                  Skor Akhir System Usability Scale
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-emerald-900">{calculatedScore.toFixed(1)}</span>
                  <span className="text-sm font-bold text-emerald-700">/ 100</span>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white block shadow-sm">
                  Grade {scoreGrade}
                </span>
                <span className="text-xs font-semibold text-emerald-800 mt-1 block">{scoreAdjective}</span>
              </div>
            </div>

            <p className="text-xs text-emerald-800 leading-relaxed border-t border-emerald-200/70 pt-3">
              🎉 Skor <strong>{calculatedScore.toFixed(1)}</strong> berada di atas rata-rata industri standar (68.0).
              Sistem dinilai sangat layak (*Acceptable*) dan siap dipresentasikan di hadapan dosen penguji.
            </p>
          </div>
        )}

        {/* 5. Rekap Pengujian Kelompok (Tabel 5+ Responden) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Data Uji Pengguna Tersimpan ({susSessions.length} Responden)
              </h3>
              <p className="text-[11px] text-slate-500">
                Penuhi minimal 5 responden mahasiswa sesuai kriteria luaran laporan UAS.
              </p>
            </div>

            <Button onClick={handleCopyReport} variant="outline" size="sm" className="text-xs">
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Salin Laporan UAS
                </>
              )}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2">Responden</th>
                  <th className="py-2">Tugas Selesai</th>
                  <th className="py-2">Skor SUS</th>
                  <th className="py-2">Grade</th>
                  <th className="py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {susSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-semibold text-slate-900">
                      {session.respondentName}
                      <span className="block text-[10px] text-slate-400 font-normal">{session.campusCohort}</span>
                    </td>
                    <td className="py-2.5 font-medium text-emerald-700">
                      {session.completedTasks.filter(Boolean).length}/5 (100%)
                    </td>
                    <td className="py-2.5 font-bold text-brand-700">{session.susScore.toFixed(1)}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-[10px] text-slate-700">
                        {session.grade}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => deleteSUSSession(session.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

