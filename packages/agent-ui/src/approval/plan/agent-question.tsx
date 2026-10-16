import { Button, Label, Textarea } from "@locusgraph/components";
import { MessageCircleQuestionIcon } from "lucide-react";
import { useId, useState } from "react";
import { ApprovalPanel, LiveStatus } from "../shared/panel";
import { formatDecidedAt, isoOf } from "../shared/time";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { DecidedAt, QuestionAnswer, QuestionOption } from "../types";
import { QuestionChoices } from "./question-choices";

export type AnsweredQuestion = QuestionAnswer & { by?: string; at?: DecidedAt };

export type AgentQuestionProps = {
  question: string;
  options?: QuestionOption[];
  allowText?: boolean;
  textLabel?: string;
  textPlaceholder?: string;
  submitLabel?: string;
  answer?: AnsweredQuestion;
  onAnswer: (answer: QuestionAnswer) => void;
  autoFocus?: boolean;
  className?: string;
};

function answerText(answer: AnsweredQuestion, options: QuestionOption[]) {
  const option = options.find((item) => item.id === answer.optionId);
  return [option?.label, answer.text].filter(Boolean).join(" · ");
}

function AnswerLine({ answer, options }: { answer: AnsweredQuestion; options: QuestionOption[] }) {
  return (
    <div
      data-slot="question-answer"
      className="flex flex-col gap-1 border-l-2 border-primary pl-3 text-sm"
    >
      <p className="font-medium">{answerText(answer, options) || "No answer"}</p>
      {(answer.by || answer.at !== undefined) && (
        <p className="text-muted-foreground">
          Answered{answer.by ? ` by ${answer.by}` : ""}
          {answer.at !== undefined && (
            <>
              {" · "}
              <time dateTime={isoOf(answer.at)}>{formatDecidedAt(answer.at)}</time>
            </>
          )}
        </p>
      )}
    </div>
  );
}

export function AgentQuestion({
  question,
  options = [],
  allowText = options.length === 0,
  textLabel = options.length > 0 ? "Or write your own answer" : "Your answer",
  textPlaceholder = "Type an answer for the agent",
  submitLabel = "Send answer",
  answer,
  onAnswer,
  autoFocus = true,
  className,
}: AgentQuestionProps) {
  const textId = useId();
  const [optionId, setOptionId] = useState<string>();
  const [text, setText] = useState("");
  const trimmed = text.trim();
  const canSubmit = optionId !== undefined || trimmed !== "";
  const textRef = useFocusOnMount<HTMLTextAreaElement>(
    autoFocus && !answer && options.length === 0
  );
  return (
    <ApprovalPanel
      data-slot="agent-question"
      data-answered={answer ? true : undefined}
      className={className}
    >
      <p className="flex items-start gap-2 text-sm font-medium">
        <MessageCircleQuestionIcon
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
        />
        {question}
      </p>
      {answer ? (
        <AnswerLine answer={answer} options={options} />
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit) return;
            onAnswer({ optionId, text: trimmed === "" ? undefined : trimmed });
          }}
        >
          {options.length > 0 && (
            <QuestionChoices
              label={question}
              options={options}
              selectedId={optionId}
              onSelect={setOptionId}
              autoFocus={autoFocus}
            />
          )}
          {allowText && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={textId}>{textLabel}</Label>
              <Textarea
                id={textId}
                ref={textRef}
                value={text}
                placeholder={textPlaceholder}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
          )}
          <Button type="submit" size="sm" className="self-start" disabled={!canSubmit}>
            {submitLabel}
          </Button>
        </form>
      )}
      <LiveStatus
        message={
          answer ? `Answered: ${answerText(answer, options)}` : `The agent asks: ${question}`
        }
      />
    </ApprovalPanel>
  );
}
