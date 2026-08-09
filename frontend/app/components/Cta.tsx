import Link from "next/link";

export default function Cta() {
  return (
    <section className="border-t border-[#232A38] bg-[#0A0E14] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-[#232A38] bg-[#161B26] p-12 text-center">

          <p className="font-mono text-sm text-[#6EE7B7]">
            $ get-started
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#ECEFF4]">
            Ready to Learn Smarter?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#97A1B0]">
            Save your technical notes, explain difficult concepts with AI,
            generate summaries, and prepare for interviews more efficiently.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-lg bg-[#FFB454] px-8 py-3 font-semibold text-[#171208] transition hover:bg-[#F2A53C]"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-[#232A38] px-8 py-3 text-[#ECEFF4] transition hover:bg-[#10141C]"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}