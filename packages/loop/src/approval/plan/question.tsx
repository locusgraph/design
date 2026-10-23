import { Button, Input, Textarea } from "@locusgraph/components";
import {
  ArrowRight as ArrowRightIcon,
  Question as MessageCircleQuestionIcon,
} from "@phosphor-icons/react/ssr";
import { useId, useState } from "react";
import {
  ApprovalPanel,
  LiveStatus,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelTitle,
} from "../../shared/panel";
import { DecisionSummary } from "../shared/decision-line";
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
  return (
    <ApprovalPanel
      data-slot="question"
      data-answered={answer ? true : undefined}
      className={className}
    >
      <PanelHeader
        icon={<MessageCircleQuestionIcon weight="bold" aria-hidden />}
        eyebrow="Agent question"
        status={answer ? "Answered" : "Waiting for you"}
        tone={answer ? "done" : "waiting"}
      />
      <PanelTitle className={answer ? "text-muted-foreground" : undefined}>{question}</PanelTitle>
      {answer ? (
        <PanelBody>
          <DecisionSummary
            decision={{ approved: true, by: answer.by, at: answer.at }}
            approvedVerb="Answered"
            result={answerText(answer, options) || "No answer"}
          />
        </PanelBody>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit) return;
            onAnswer({ optionId, text: trimmed === "" ? undefined : trimmed });
          }}
        >
          <PanelBody className="gap-3">
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
                onChange={(event) => changeText(event.target.value)}
              />
            )}
          </PanelBody>
          <PanelFooter className="justify-between">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              {textOnly ? "The run is paused" : `Press 1–${options.length} to pick`}
            </span>
            <Button type="submit" size="sm" disabled={!canSubmit}>
              {submitLabel}
              <ArrowRightIcon weight="bold" aria-hidden />
            </Button>
          </PanelFooter>
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
