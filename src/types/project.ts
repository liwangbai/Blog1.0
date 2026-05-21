export interface ProjectFrontmatter {
  name: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  featured?: boolean;
  order?: number;
  status: 'active' | 'completed' | 'archived';
  year?: number;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  source: string;
}
