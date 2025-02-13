import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef, useEffect, useRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // 텍스트 입력 시 높이 자동 조절
    const handleInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // 높이를 초기화하여 줄어들도록 함
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 실제 내용 크기만큼 늘리기
      }
    };

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // 높이를 초기화하여 줄어들도록 함
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 실제 내용 크기만큼 늘리기
      }
    }, []);

    return (
      <textarea
        className={cn(
          `flex w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden read-only:border-none read-only:shadow-none read-only:focus-visible:ring-0`,
          className,
        )}
        ref={(el) => {
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
          textareaRef.current = el; // 내부 ref에도 저장
        }}
        onInput={handleInput}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
