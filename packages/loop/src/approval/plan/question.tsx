import { Button, cn, Input, Textarea } from "@locusgraph/components";
import {
  ArrowRight as ArrowRightIcon,
  Question as MessageCircleQuestionIcon,
} from "@phosphor-icons/react/ssr";
import { useId, useState } from "react";
import { DecisionSummary } from "../../shared/decision-summary";
import { lineObjectClass } from "../../shared/line";
import { LiveStatus } from "../../shared/live-status";
import { PendingLine, SettledLine } from "../shared/approval-line";
import { useFocusOnMount } from "../shared/use-focus-on-mount";
import type { DecidedAt, QuestionAnswer, QuestionOption } from "../types";
import { QuestionChoices } from "./question-choices";

export type AnsweredQuestion = QuestionAnswer & { by?: string; at?: DecidedAt };

export type QuestionProps = {
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

const filledFieldClass =
  "border-transparent bg-muted shadow-none placeholder:text-faint dark:bg-muted";

function answerText(answer: AnsweredQuestion, options: QuestionOption[]) {
  const option = options.find((item) => item.id === answer.optionId);
  return [option?.label, answer.text].filter(Boolean).join(" · ");
}

export function Question({
  question,
  options = [],
  allowText = options.length === 0,
  textLabel = options.length > 0 ? "Something else" : "Your answer",
  textPlaceholder = options.length > 0 ? "Something else…" : "Type an answer for the agent",
  submitLabel = "Send answer",
  answer,
  onAnswer,
  autoFocus = true,
  className,
}: QuestionProps) {
  const textId = useId();
  const [optionId, setOptionId] = useState<string>();
  const [text, setText] = useState("");
  const trimmed = text.trim();
  const canSubmit = optionId !== undefined || trimmed !== "";
  const textOnly = options.length === 0;
  const textRef = useFocusOnMount<HTMLTextAreaElement>(autoFocus && !answer && textOnly);
  const changeText = (value: string) => {
    setText(value);
    if (value.trim() !== "") setOptionId(undefined);
  };
  const icon = <MessageCircleQuestionIcon weight="bold" aria-hidden />;
  return (
    <section
      data-slot="question"
      aria-label={question}
      data-answered={answer ? true : undefined}
      className={cn("flex min-w-0 flex-col", !answer && "gap-3", className)}
    >
      {answer ? (
        <SettledLine name={question} verb="Asked" icon={icon}>
          <DecisionSummary
            decision={{ approved: true, by: answer.by, at: answer.at }}
            approvedVerb="Answered"
            result={answerText(answer, options) || "No answer"}
          />
        </SettledLine>
      ) : (
        <>
          <PendingLine icon={icon} wrap>
            for your answer: <span className={lineObjectClass}>{question}</span>
          </PendingLine>
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!canSubmit) return;
              onAnswer({ optionId, text: trimmed === "" ? undefined : trimmed });
            }}
          >
            {!textOnly && (
              <QuestionChoices
                label={question}
                options={options}
                selectedId={optionId}
                onSelect={(id) => {
                  setOptionId(id);
                  setText("");
                }}
                autoFocus={autoFocus}
              />
            )}
            {allowText && !textOnly && (
              <Input
                id={textId}
                aria-label={textLabel}
                value={text}
                placeholder={textPlaceholder}
                className={filledFieldClass}
                onChange={(event) => changeText(event.target.value)}
              />
            )}
            {textOnly && (
              <Textarea
                id={textId}
                ref={textRef}
                aria-label={textLabel}
                value={text}
                placeholder={textPlaceholder}
                className={filledFieldClass}
                onChange={(event) => changeText(event.target.value)}
              />
            )}
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="sm" disabled={!canSubmit}>
                {submitLabel}
                <ArrowRightIcon weight="bold" aria-hidden />
              </Button>
              <span className="hidden text-xs text-faint sm:inline">
                {textOnly ? "The run is paused" : `Press 1–${options.length} to pick`}
              </span>
            </div>
          </form>
        </>
      )}
      <LiveStatus
        message={
          answer ? `Answered: ${answerText(answer, options)}` : `The agent asks: ${question}`
        }
      />
    </section>
  );
}
