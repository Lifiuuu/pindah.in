import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-4xl font-extrabold text-brand-700">404</span>
      <h1 className="text-xl sm:text-2xl font-bold text-surface-900 mt-2">Halaman Tidak Ditemukan</h1>
      <p className="text-xs sm:text-sm text-surface-500 mt-1 max-w-sm">
        Halaman yang kamu tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link href="/" className="mt-6">
        <Button size="md" className="text-xs sm:text-sm">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

