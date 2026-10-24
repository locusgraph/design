import { Fragment, isValidElement, type ReactNode } from "react";

const turnGapPx = 32;
const answerAfterQuestionGapPx = 16;

type RoleCarryingProps = { "data-role"?: string; message?: { role?: string } };

function roleOf(node: ReactNode): string | undefined {
  if (!isValidElement<RoleCarryingProps>(node)) {
    return undefined;
  }
  return node.props["data-role"] ?? node.props.message?.role;
}

export function gapBeforeItem(items: ReactNode[], index: number): number {
  if (index === 0) {
    return 0;
  }
  const answersQuestion =
    roleOf(items[index - 1]) === "user" && roleOf(items[index]) === "assistant";
  return answersQuestion ? answerAfterQuestionGapPx : turnGapPx;
}

export function isPositionable(node: ReactNode): node is React.ReactElement {
  return isValidElement(node) && node.type !== Fragment && typeof node.type !== "string";
}
