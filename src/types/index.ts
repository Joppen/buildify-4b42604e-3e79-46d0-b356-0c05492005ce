
export interface User {
  id: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  template: string;
  content: any;
  created_at: string;
  updated_at: string;
  published: boolean;
  published_url?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  components: any[];
}

export interface WebsitePrompt {
  type: string;
  description: string;
  features: string[];
  style: string;
}