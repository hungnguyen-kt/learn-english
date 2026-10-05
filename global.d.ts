declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "node-english-irregular-verbs" {
  const data: {
    verbs: Array<{
      infinitive: string;
      past_simple: string;
      past_participle: string;
    }>;
  };
  export default data;
}
