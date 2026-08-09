import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#232A38] bg-[#10141C]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-lg text-[#ECEFF4]"
        >
          <span className="text-[#FFB454]">&lt;</span>
          DevNotes
          <span className="text-[#FFB454]">/&gt;</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-[#97A1B0] transition hover:text-[#ECEFF4]"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-[#97A1B0] transition hover:text-[#ECEFF4]"
          >
            How it Works
          </a>

          <Link
            href="/register"
            className="rounded-lg bg-[#FFB454] px-5 py-2.5 font-medium text-[#171208] transition hover:bg-[#F2A53C]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}