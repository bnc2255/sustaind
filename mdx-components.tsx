import type { MDXComponents } from "mdx/types";

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
