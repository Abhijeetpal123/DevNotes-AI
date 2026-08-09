"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

const EXAMPLES = [
  {
    file: "closures.js",
    prompt: '$ devnotes explain "closures"',
    title: "Understanding closures",
    body: "A closure is a function that remembers the variables from where it was created, even after that scope has closed.",
    tags: ["#javascript", "#fundamentals"],
  },
  {
    file: "decorators.py",
    prompt: '$ devnotes explain "decorators"',
    title: "Understanding decorators",
    body: "A decorator wraps a function to extend its behavior without changing its source code — Python resolves it at definition time.",
    tags: ["#python", "#patterns"],
  },
  {
    file: "hooks.jsx",
    prompt: '$ devnotes explain "useEffect"',
    title: "Understanding useEffect",
    body: "useEffect runs side effects after render and re-runs when its dependencies change — cleanup functions handle teardown.",
    tags: ["#react", "#hooks"],
  },
];
const API_BASE = process.env.NEXT_PUBLIC_URL ?? "http://localhost:5000";

type FormState = {
  fullName: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const STRENGTH_LABEL = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["#232A38", "#FB7185", "#FFB454", "#FFB454", "#6EE7B7"];

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0-4
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  else if (values.fullName.trim().length < 2) errors.fullName = "Name is too short.";

  if (!values.email.trim()) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";

  if (!values.password) errors.password = "Create a password.";
  else if (values.password.length < 8) errors.password = "Use at least 8 characters.";

  return errors;
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.4 20.4 0 0 1-3.22 4.44M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeExample, setActiveExample] = useState(0);

  const strength = getPasswordStrength(form.password);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const next = { ...form, [name]: value } as FormState;
    setForm(next);
    if (touched[name as keyof FormState]) {
      setErrors(validate(next));
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, password: true });
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    console.log("API BASE:", API_BASE);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.fullName,
          email: form.email,
          passWord: form.password,
          role:"Student"
        }),
      });

      const data = await res.json();

if (!res.ok) {
  setFormError(data.message || "Couldn't create your account. Try again.");
  return;
}

// Registration successful
router.push("/login");
    } catch {
      setFormError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputBase =
    "w-full rounded-lg border bg-[#161B26] px-4 py-3 text-[15px] text-[#ECEFF4] placeholder:text-[#5B6472] outline-none transition focus:ring-2 focus:ring-[#FFB454]/40";

  return (
    <main className="min-h-screen bg-[#0A0E14] lg:grid lg:grid-cols-2">
      {/* Left panel — shows what the product actually does. Hidden below lg. */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden border-r border-[#232A38] bg-[#10141C] p-10 lg:flex"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A2030 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="font-mono text-lg text-[#ECEFF4]">
          <span className="text-[#FFB454]">&lt;</span>DevNotes
          <span className="text-[#FFB454]">/&gt;</span>
        </div>

        <div className="max-w-sm">
        <div className="mb-2 flex gap-1">
  {EXAMPLES.map((ex, i) => (
    <button
      key={ex.file}
      type="button"
      onClick={() => setActiveExample(i)}
      className={`rounded-t-md px-3 py-1.5 font-mono text-xs transition-colors ${
        i === activeExample ? "bg-[#161B26] text-[#ECEFF4]" : "text-[#5B6472] hover:text-[#8C8D94]"
      }`}
    >
      {ex.file}
    </button>
  ))}
</div>
<div className="rounded-lg border border-[#232A38] bg-[#161B26] p-5">
  <div className="mb-2 font-mono text-xs text-[#6EE7B7]">{EXAMPLES[activeExample].prompt}</div>
  <div className="mb-1.5 text-sm font-medium text-[#ECEFF4]">{EXAMPLES[activeExample].title}</div>
  <p className="text-[13px] leading-relaxed text-[#97A1B0]">
    {EXAMPLES[activeExample].body}
    <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-[blink_1s_step-start_infinite] bg-[#6EE7B7] align-middle motion-reduce:animate-none" />
  </p>
  <div className="mt-3 flex flex-wrap gap-1.5">
    {EXAMPLES[activeExample].tags.map((tag) => (
      <span key={tag} className="rounded-full bg-[#FFB454]/10 px-2 py-1 font-mono text-[11px] text-[#FFB454]">
        {tag}
      </span>
    ))}
  </div>
</div>
        </div>

        <div className="font-mono text-xs text-[#5B6472]">
          2,400+ explanations saved this week
        </div>
      </div>

      {/* Right panel — the form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 font-mono text-lg text-[#ECEFF4] lg:hidden">
            <span className="text-[#FFB454]">&lt;</span>DevNotes
            <span className="text-[#FFB454]">/&gt;</span>
          </div>

          <div className="mb-1 font-mono text-xs text-[#6EE7B7]">$ create-account</div>
          <h1 className="text-2xl font-semibold text-[#ECEFF4]">Create your account</h1>
          <p className="mt-2 text-[15px] text-[#97A1B0]">
            Explain, remember, and revisit any concept you learn.
          </p>

          {formError && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-[#FB7185]/30 bg-[#FB7185]/10 px-4 py-3 text-sm text-[#FB7185]"
            >
              {formError}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm text-[#97A1B0]">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`${inputBase} ${
                  errors.fullName ? "border-[#FB7185]" : "border-[#232A38] focus:border-[#FFB454]"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-[13px] text-[#FB7185]">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-[#97A1B0]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ada@devnotes.ai"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`${inputBase} ${
                  errors.email ? "border-[#FB7185]" : "border-[#232A38] focus:border-[#FFB454]"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-[13px] text-[#FB7185]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-[#97A1B0]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`${inputBase} pr-11 ${
                    errors.password ? "border-[#FB7185]" : "border-[#232A38] focus:border-[#FFB454]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6472] transition hover:text-[#97A1B0]"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {form.password.length > 0 && (
                <div className="mt-2.5">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-colors"
                        style={{
                          backgroundColor: i < strength ? STRENGTH_COLOR[strength] : "#232A38",
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-[#5B6472]">{STRENGTH_LABEL[strength]}</p>
                </div>
              )}

              {errors.password && (
                <p id="password-error" className="mt-1.5 text-[13px] text-[#FB7185]">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFB454] py-3 font-semibold text-[#171208] transition hover:bg-[#F2A53C] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#171208]/30 border-t-[#171208]" />
              )}
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[15px] text-[#97A1B0]">
            Already have an account?{" "}
            <a href="/login" className="text-[#FFB454] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}