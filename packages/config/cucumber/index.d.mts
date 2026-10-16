export type CucumberProfile = {
  paths: string[];
  import: string[];
  format: string[];
  [option: string]: unknown;
};

export declare function cucumber(overrides?: Partial<CucumberProfile>): CucumberProfile;

declare const profile: CucumberProfile;
export default profile;
