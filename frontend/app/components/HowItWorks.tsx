import { UserPlus, FileText, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up securely and access your personal workspace from anywhere.",
  },
  {
    icon: FileText,
    title: "Write your notes",
    description:
      "Store programming concepts, interview preparation notes, and documentation in one place.",
  },
  {
    icon: Sparkles,
    title: "Learn with AI",
    description:
      "Use AI Explain to understand concepts and AI Summarize to revise quickly before interviews.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-[#232A38] bg-[#10141C] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-mono text-sm text-[#6EE7B7]">
            $ workflow
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#ECEFF4]">
            How DevNotes AI Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#97A1B0]">
            A simple workflow designed for developers to capture, understand,
            and revise technical knowledge faster.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-xl border border-[#232A38] bg-[#161B26] p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFB454]/10">
                  <Icon className="text-[#FFB454]" size={28} />
                </div>

                <span className="font-mono text-sm text-[#6EE7B7]">
                  Step {index + 1}
                </span>

                <h3 className="mt-3 text-xl font-semibold text-[#ECEFF4]">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[#97A1B0]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}