import type { SetState } from "@json-render/react";

export type PickedAction = { actionId: string; target: string };

export type SettledAction = PickedAction & { label: string };

export type GuardedRun = (
  picked: PickedAction,
  state: Record<string, unknown>
) => Promise<string | null>;

function isLocked(state: Record<string, unknown>) {
  return Boolean(state.pending || state.settled || state.locked);
}

export function guardAction(run: GuardedRun) {
  let running = false;
  return async (_params: unknown, setState: SetState, state: Record<string, unknown>) => {
    const picked = state.picked as PickedAction | undefined;
    if (!picked || running || isLocked(state)) return;
    running = true;
    setState((previous) => ({ ...previous, pending: picked }));
    try {
      const label = await run(picked, state);
      const settled: SettledAction | null = label ? { ...picked, label } : null;
      setState((previous) => ({ ...previous, pending: null, settled }));
    } catch (error) {
      setState((previous) => ({ ...previous, pending: null }));
      throw error;
    } finally {
      running = false;
    }
  };
}
