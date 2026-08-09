export default function Footer() {
  return (
    <footer className="border-t border-[#232A38] bg-[#10141C]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">

        <div className="font-mono text-[#ECEFF4]">
          <span className="text-[#FFB454]">&lt;</span>
          DevNotes
          <span className="text-[#FFB454]">/&gt;</span>
        </div>

        <p className="text-sm text-[#97A1B0]">
          © 2026 DevNotes AI. Built for developers.
        </p>

      </div>
    </footer>
  );
}