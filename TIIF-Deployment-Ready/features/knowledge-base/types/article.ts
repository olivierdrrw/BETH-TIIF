export type ArticleCategory =
  | "trauma"
  | "identity"
  | "relationships"
  | "growth"
  | "mindfulness"
  | "purpose";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string[];
  readTimeMinutes: number;
}
