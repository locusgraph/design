import { type RefObject, useLayoutEffect } from "react";

function supportsFieldSizing(): boolean {
  return typeof CSS !== "undefined" && CSS.supports?.("field-sizing", "content") === true;
}

export function useAutoGrow(textareaRef: RefObject<HTMLTextAreaElement | null>, text: string) {
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || supportsFieldSizing()) {
      return;
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [textareaRef, text]);
}
