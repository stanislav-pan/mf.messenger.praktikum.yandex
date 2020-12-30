// declaration.d.ts
declare module '*.njk' {
  const content: (props: Record<string, any>) => string;

  export default content;
}
