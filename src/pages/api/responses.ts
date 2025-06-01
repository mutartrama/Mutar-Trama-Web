export interface NewsTabItem {
  key: string;
  title: string;
  image: string;
  epigraph: string;
  paragraph: string;
  btnLabel: string;
  btnUrl: string;
  lang: string;
}

export interface AboutTabItem {
  key: string;
  title: string;
  image: string;
  paragraph: string;
  btnLabel: string;
  btnUrl: string;
  lang: string;
}

export interface ProjectsTabItem {
  key: string;
  image: string;
  title: string;
  subtitle: string;
  paragraph: string;
  tags: string[];
  btnUrl: string;
  lang: string;
}

export interface StaticTextSection {
  section: string;
  title: string;
  paragraph: string;
  epigraph: string;
  lang: string;
}

export interface StaticTexts {
  hero: StaticTextSection;
  about_us: StaticTextSection;
  participate: StaticTextSection;
  modal_res: StaticTextSection;
  modal_colab: StaticTextSection;
  modal_prop: StaticTextSection;
  footer: StaticTextSection;
}

export interface GoogleSheetsResponse {
  news_tab: NewsTabItem[];
  about_tab: AboutTabItem[];
  projects_tab: ProjectsTabItem[];
  static_texts: StaticTexts;
}
