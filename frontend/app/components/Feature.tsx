import { Brain, FileText, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Explain",
    description:
      "Understand difficult programming concepts instantly with simple AI-powered explanations.",
  },
  {
    icon: FileText,
    title: "AI Summarize",
    description:
      "Convert lengthy notes into concise summaries so revision becomes faster and easier.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Notes",
    description:
      "JWT authentication ensures your personal notes remain private and accessible only by you.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-[#232A38] bg-[#0A0E14] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-mono text-sm text-[#6EE7B7]">
            $ features
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#ECEFF4]">
            Built for Developers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#97A1B0]">
            Everything you need to organize, understand and revise your
            technical notes using Artificial Intelligence.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-[#232A38] bg-[#161B26] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#FFB454]/40"
              >
                <div className="mb-5 inline-flex rounded-lg bg-[#FFB454]/10 p-3">
                  <Icon
                    size={28}
                    className="text-[#FFB454]"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#ECEFF4]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-[#97A1B0]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}