export interface AppSettings {
  navPos?: 'side' | 'top';
  theme?: 'light' | 'dark';
  dir?: 'ltr' | 'rtl';
  showHeader?: boolean;
  headerPos?: 'fixed' | 'static' | 'above';
  showUserPanel?: boolean;
  sidenavOpened?: boolean;
  sidenavCollapsed?: boolean;
  language?: string;
  debugMode?: boolean;
}

export const defaults: AppSettings = {
  navPos: 'side',
  theme: 'dark',
  dir: 'ltr',
  showHeader: true,
  headerPos: 'above',
  showUserPanel: false,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
  debugMode: true,
};
