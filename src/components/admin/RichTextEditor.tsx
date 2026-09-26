"use client";

import { useRef, useEffect, useState } from "react";

type Props = {
  name: string;
  defaultValue?: string;
};

const buttons: { label: string; command: string; icon: string }[] = [
  { label: "Tučné", command: "bold", icon: "B" },
  { label: "Kurzíva", command: "italic", icon: "I" },
  { label: "Podtržené", command: "underline", icon: "U" },
];

export function RichTextEditor({ name, defaultValue = "" }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultValue);

  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue]);

  function exec(command: string) {
    document.execCommand(command, false);
    editorRef.current?.focus();
    setHtml(editorRef.current?.innerHTML ?? "");
  }

  function execList(ordered: boolean) {
    document.execCommand(
      ordered ? "insertOrderedList" : "insertUnorderedList",
      false
    );
    editorRef.current?.focus();
    setHtml(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="flex flex-wrap gap-1 border-b border-line bg-paper p-2">
        {buttons.map((btn) => (
          <button
            key={btn.command}
            type="button"
            title={btn.label}
            onClick={() => exec(btn.command)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-ink transition-colors hover:bg-white"
          >
            {btn.icon}
          </button>
        ))}
        <button
          type="button"
          title="Odrážky"
          onClick={() => execList(false)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-ink transition-colors hover:bg-white"
        >
          •≡
        </button>
        <button
          type="button"
          title="Číslovaný seznam"
          onClick={() => execList(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-ink transition-colors hover:bg-white"
        >
          1.
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setHtml((e.target as HTMLDivElement).innerHTML)}
        className="min-h-[200px] px-4 py-3 text-ink outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        aria-label="Text aktuality"
        data-placeholder="Napište text aktuality…"
      />

      <textarea name={name} value={html} readOnly hidden />
    </div>
  );
}
