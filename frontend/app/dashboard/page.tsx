"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import AIModal from "../components/AIModal";

const API_BASE = process.env.NEXT_PUBLIC_URL ?? "http://localhost:5000";

type Note = {
  _id: string;
  title: string;
  content: string;
  category?: string;
  // Adjust these to match your actual schema — used for the stat cards below.
  aiExplanation?: string;
  aiSummary?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [justCreated, setJustCreated] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiTitle, setAiTitle] = useState("");
  const [aiContent, setAiContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        // Token expired or invalid — don't leave the user on a dead dashboard.
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setLoadError(data?.message || "couldn't load your notes");
        return;
      }

      setNotes(data.notes ?? []);
      setLoadError("");
    } catch {
      setLoadError("couldn't reach the server");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  async function handleSaveNote(e: FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      setCreateError("title and content are required");
      return;
    }

    setIsCreating(true);
    setCreateError("");
    try {
      const token = localStorage.getItem("token");
      const isEditing = Boolean(editingNoteId);
      const url = isEditing
        ? `${API_BASE}/api/notes/${editingNoteId}`
        : `${API_BASE}/api/notes`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCategory || undefined,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setCreateError(
          data?.message ||
            (isEditing
              ? "couldn't update the note"
              : "couldn't create the note"),
        );
        return;
      }

      if (isEditing) {
        setNotes((prev) =>
          prev.map((n) => (n._id === editingNoteId ? data.note : n)),
        );
      } else {
        setNotes((prev) => [data.note, ...prev]);
      }

      setNewTitle("");
      setNewContent("");
      setNewCategory("");
      setEditingNoteId(null);
      setOpenModal(false);
      setJustCreated(true);
      setTimeout(() => setJustCreated(false), 3000);
    } catch {
      setCreateError("couldn't reach the server");
    } finally {
      setIsCreating(false);
    }
  }

  function handleOpenNewNote() {
    setEditingNoteId(null);
    setNewTitle("");
    setNewContent("");
    setNewCategory("");
    setCreateError("");
    setOpenModal(true);
  }

  function handleEditClick(note: Note) {
    setEditingNoteId(note._id);
    setNewTitle(note.title);
    setNewContent(note.content);
    setNewCategory(note.category || "");
    setCreateError("");
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setEditingNoteId(null);
    setCreateError("");
  }

  async function handleExplain(note: Note) {
    setAiModalOpen(true);
    setAiLoading(true);
    setAiTitle("AI Explanation");
    setAiContent("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/ai/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: note.content,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setAiContent("Your session expired — please sign in again.");
        router.push("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setAiContent(data.explanation);
      } else {
        setAiContent(data.message || "Failed to generate explanation.");
      }
    } catch {
      setAiContent("Couldn't connect to AI server.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSummary(note: Note) {
    setAiModalOpen(true);
    setAiLoading(true);
    setAiTitle("AI Summary");
    setAiContent("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/ai/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          note: note.content,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setAiContent("Your session expired — please sign in again.");
        router.push("/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setAiContent(data.summary);
      } else {
        setAiContent(data.message || "Failed to summarize.");
      }
    } catch {
      setAiContent("Couldn't connect to AI server.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleDeleteNote(noteId: string) {
    const confirmed = window.confirm("Delete this note? This can't be undone.");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.message || "couldn't delete the note");
        return;
      }

      setNotes((prev) => prev.filter((n) => n._id !== noteId));
    } catch {
      alert("couldn't reach the server");
    }
  }
 const filteredNotes = notes.filter((note) => {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return true;
  const title = (note.title || "").toLowerCase();
  const content = (note.content || "").toLowerCase();
  return title.includes(q) || content.includes(q);
});

  const totalNotes = notes.length;
  const explainedCount = notes.filter((n) => n.aiExplanation).length;
  const summarizedCount = notes.filter((n) => n.aiSummary).length;

  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#ECEFF4] antialiased selection:bg-[#FFB454]/30">
      <AIModal
        open={aiModalOpen}
        title={aiTitle}
        loading={aiLoading}
        content={aiContent}
        onClose={() => setAiModalOpen(false)}
      />
      <nav className="sticky top-0 z-50 border-b border-[#232A38] bg-[#10141C]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 cursor-pointer">
          <div
            onClick={() => router.push("/")}
            className="font-mono text-lg tracking-wide text-[#ECEFF4]"
          >
            <span className="text-[#FFB454]">&lt;</span>
            DevNotes
            <span className="text-[#FFB454]">/&gt;</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenNewNote}
              className="rounded-lg bg-[#FFB454] px-5 py-2.5 font-semibold text-[#171208] transition hover:bg-[#F2A53C]"
            >
              + new note
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-[#232A38] px-5 py-2.5 text-[#97A1B0] transition hover:border-[#FFB454] hover:text-white"
            >
              logout
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-2 font-mono text-xs text-[#6EE7B7]">$ dashboard</div>
        <h1 className="text-4xl font-bold tracking-tight text-[#ECEFF4]">
          Welcome back 👋
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#97A1B0]">
          Explain, summarize and organize everything you learn using AI.
        </p>

        {justCreated && (
          <div className="mt-6 border-l-2 border-[#7FB855] pl-3 text-sm text-[#7FB855]">
            + note created
          </div>
        )}

        <div className="mt-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search your notes..."
            className="w-full rounded-xl border border-[#232A38] bg-[#161B26] px-5 py-4 text-[#ECEFF4] placeholder:text-[#5B6472] outline-none transition-all duration-200 focus:border-[#FFB454] focus:ring-2 focus:ring-[#FFB454]/20"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#232A38] bg-[#161B26] p-6 transition-all duration-200 hover:border-[#FFB454]/40 hover:-translate-y-1">
            <p className="font-mono text-xs text-[#6EE7B7]">$ notes</p>
            <h2 className="mt-2 text-3xl font-bold">{totalNotes}</h2>
            <p className="mt-1 text-sm text-[#97A1B0]">total notes</p>
          </div>
          <div className="rounded-xl border border-[#232A38] bg-[#161B26] p-6">
            <p className="font-mono text-xs text-[#6EE7B7]">$ explained</p>
            <h2 className="mt-2 text-3xl font-bold">{explainedCount}</h2>
            <p className="mt-1 text-sm text-[#97A1B0]">ai explanations</p>
          </div>
          <div className="rounded-xl border border-[#232A38] bg-[#161B26] p-6">
            <p className="font-mono text-xs text-[#6EE7B7]">$ summarized</p>
            <h2 className="mt-2 text-3xl font-bold">{summarizedCount}</h2>
            <p className="mt-1 text-sm text-[#97A1B0]">ai summaries</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs text-[#D9A441]">$ recent-notes</p>
          <h2 className="text-xl font-semibold text-[#ECEFF4]">Recent notes</h2>

          <div className="mt-6">
            {loading ? (
              <p className="text-sm text-[#8C8D94]">loading notes...</p>
            ) : loadError ? (
              <div className="border-l-2 border-[#E0685A] pl-3 text-sm text-[#E0685A]">
                // {loadError}
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#232A38] bg-[#161B26] p-10 text-center">
                <p className="text-sm text-[#8C8D94]">
                  {notes.length === 0
                    ? "no notes yet — create your first one"
                    : "no notes match your search"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    className="group rounded-xl border border-[#232A38] bg-[#161B26] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB454]/40 hover:shadow-[0_0_40px_rgba(255,180,84,0.08)]"
                  >
                    <h3 className="text-xl font-semibold text-[#ECEFF4] transition-colors group-hover:text-[#FFB454]">
                      {note.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#97A1B0] line-clamp-4">
                      {note.content}
                    </p>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => handleExplain(note)}
                        className="rounded-lg bg-[#FFB454] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F2A53C]"
                      >
                        ✨ Explain AI
                      </button>

                      <button
                        onClick={() => handleSummary(note)}
                        className="rounded-lg border border-[#232A38] px-4 py-2 text-sm text-[#ECEFF4] transition hover:border-[#FFB454]"
                      >
                        📄 Summarize
                      </button>
                      <button
                        onClick={() => handleEditClick(note)}
                        className="rounded-lg border border-[#232A38] px-4 py-2 text-sm text-[#ECEFF4] transition hover:border-[#FFB454]"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="rounded-lg border border-[#232A38] px-4 py-2 text-sm text-[#E0685A] transition hover:border-[#E0685A]"
                      >
                        🗑 Delete
                      </button>
                    </div>
                    {note.category && (
                      <div className="mt-5">
                        <span className="rounded-full bg-[#FFB454]/10 px-3 py-1 text-xs font-mono text-[#FFB454]">
                          #{note.category}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <form
            onSubmit={handleSaveNote}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl border border-[#232A38] bg-[#161B26] p-8 shadow-2xl"
          >
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#ECEAE3]">
                {editingNoteId ? "# Edit note" : "# New note"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close"
                className="text-[#55565E] hover:text-[#8C8D94]"
              >
                ✕
              </button>
            </div>

            {createError && (
              <div className="mt-4 border-l-2 border-[#E0685A] pl-3 text-sm text-[#E0685A]">
                // {createError}
              </div>
            )}

            <div className="mt-5">
              <label
                htmlFor="new-title"
                className="mb-1.5 block text-xs text-[#55565E]"
              >
                # title
              </label>
              <input
                id="new-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Understanding closures"
                className="w-full border-0 border-b border-[#2B2D35] bg-transparent py-2 text-sm text-[#ECEAE3] outline-none placeholder:text-[#3E3F47] focus:border-[#D9A441]"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="new-content"
                className="mb-1.5 block text-xs text-[#55565E]"
              >
                # content
              </label>
              <textarea
                id="new-content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write or paste what you want explained..."
                rows={4}
                className="w-full resize-none border border-[#2B2D35] bg-transparent px-3 py-2 text-sm text-[#ECEAE3] outline-none placeholder:text-[#3E3F47] focus:border-[#D9A441]"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="new-category"
                className="mb-1.5 block text-xs text-[#55565E]"
              >
                # category (optional)
              </label>
              <input
                id="new-category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="javascript"
                className="w-full border-0 border-b border-[#2B2D35] bg-transparent py-2 text-sm text-[#ECEAE3] outline-none placeholder:text-[#3E3F47] focus:border-[#D9A441]"
              />
            </div>

            <button
  type="submit"
  disabled={isCreating}
  className="mt-8 flex w-full items-center justify-center rounded-lg bg-[#FFB454] py-3 font-semibold text-[#171208] transition-all duration-200 hover:bg-[#F2A53C] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isCreating ? "$ saving..." : editingNoteId ? "$ update-note →" : "$ save-note →"}
</button>
          </form>
        </div>
      )}
    </main>
  );
}
