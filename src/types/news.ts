export type NewsStatus = "draft" | "published";

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date (YYYY-MM-DD)
  content: string; // sanitized HTML z WYSIWYG editoru
  image_url: string | null;
  status: NewsStatus;
  created_at: string;
  updated_at: string;
};

export type NewsInput = {
  title: string;
  slug: string;
  date: string;
  content: string;
  image_url: string | null;
  status: NewsStatus;
};
