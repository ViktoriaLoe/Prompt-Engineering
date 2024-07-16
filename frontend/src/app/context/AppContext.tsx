import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextProps {
  application: string;
  setApplication: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  promptName: string;
  setPromptName: (value: string) => void;
  result: string;
  setResult: (value: string) => void;
  instructions: string;
  setInstructions: (value: string) => void;
  prompts: Record<string, string>;
  setPrompts: (value: Record<string, string>) => void;
  mockdata: Record<string, string>;
  setMockdata: (value: Record<string, string>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [application, setApplication] = useState('');
  const [prompt, setPrompt] = useState('');
  const [promptName, setPromptName] = useState('default');
  const [result, setResult] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const [mockdata, setMockdata] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/get_prompts');
      const data = await response.json();
      setPrompts(data);
    };

    const fetchMockdata = async () => {
      const response = await fetch('/api/get_mockdata');
      const data = await response.json();
      setMockdata(data);
    };

    fetchPrompts();
    fetchMockdata();
  }, []);

  return (
    <AppContext.Provider value={{ application, setApplication, prompt, setPrompt, promptName, setPromptName, result, setResult, instructions, setInstructions, prompts, setPrompts, mockdata, setMockdata }}>
      {children}
    </AppContext.Provider>
  );
};
