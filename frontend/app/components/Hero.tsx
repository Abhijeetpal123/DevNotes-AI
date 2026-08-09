import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20">
      {/* Left Side */}
      <div className="flex-1">
        <p className="mb-4 font-mono text-sm text-[#6EE7B7]">
          AI Powered Learning
        </p>

        <h1 className="max-w-2xl text-5xl font-bold leading-tight text-[#ECEFF4] md:text-6xl">
          Learn Faster with{" "}
          <span className="text-[#FFB454]">DevNotes AI</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-[#97A1B0]">
          Save your notes, explain difficult concepts instantly, generate
          summaries, and revise smarter using Artificial Intelligence.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-[#FFB454] px-6 py-3 font-semibold text-[#171208] transition hover:bg-[#F2A53C]"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-[#232A38] px-6 py-3 text-[#ECEFF4] transition hover:bg-[#161B26]"
          >
            Live Demo
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#97A1B0]">
          <span>⚡ AI Explanations</span>
          <span>📚 Smart Notes</span>
          <span>🚀 Faster Revision</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden flex-1 justify-center lg:flex">
        <div className="w-[450px] rounded-xl border border-[#232A38] bg-[#161B26] p-6 shadow-2xl">

          <div className="mb-4 flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>

          <p className="font-mono text-sm text-[#6EE7B7]">
            $ explain "closures"
          </p>

          <div className="mt-5 rounded-lg border border-[#232A38] bg-[#10141C] p-5">

            <h3 className="mb-3 text-lg font-semibold text-[#ECEFF4]">
              JavaScript Closures
            </h3>

            <p className="leading-7 text-[#97A1B0]">
              A closure is a function that remembers variables from its
              outer scope even after that scope has finished execution.
            </p>

            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-[#FFB454]/10 px-3 py-1 text-xs text-[#FFB454]">
                #javascript
              </span>

              <span className="rounded-full bg-[#FFB454]/10 px-3 py-1 text-xs text-[#FFB454]">
                #closures
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}