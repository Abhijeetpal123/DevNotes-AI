"use client";

import ReactMarkdown from "react-markdown";

type Props = {
  open: boolean;
  title: string;
  loading: boolean;
  content: string;
  onClose: () => void;
};

export default function AIModal({
  open,
  title,
  loading,
  content,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl border border-[#232A38] bg-[#161B26] shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#232A38] px-6 py-5">
          <div>
            <p className="font-mono text-xs text-[#6EE7B7]">$ ai-result</p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-[#5B6472] hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[65vh] overflow-y-auto p-6">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#232A38] border-t-[#FFB454]" />

              <p className="mt-6 text-[#97A1B0]">
                AI is thinking...
              </p>

            </div>
          ) : (
            <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#CBD5E1] prose-strong:text-[#FFB454] prose-code:text-[#6EE7B7]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-[#232A38] p-5">

          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="mr-3 rounded-lg border border-[#232A38] px-5 py-2 text-[#97A1B0] hover:border-[#FFB454]"
          >
            Copy
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-[#FFB454] px-5 py-2 font-semibold text-black hover:bg-[#F2A53C]"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}