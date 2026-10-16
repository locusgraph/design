export function cucumber(overrides = {}) {
  return {
    paths: ["features/**/*.feature"],
    import: ["features/support/**/*.mts", "features/**/*.steps.mts"],
    format: ["summary"],
    ...overrides,
  };
}

export default cucumber();
