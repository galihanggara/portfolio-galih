import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

type Lang = 'en' | 'id';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  t: (en: string, id: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  setLang: () => {},
  t: (en: string, _id: string) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang') as Lang;
      return saved === 'id' ? 'id' : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLangState(prev => prev === 'en' ? 'id' : 'en');
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  const t = useCallback((en: string, id: string) => {
    return lang === 'en' ? en : id;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}