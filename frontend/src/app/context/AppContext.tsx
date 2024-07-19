"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { tokens, prompt, mockdata } from "../../../types";

interface AppContextProps {
  application: string;
  setApplication: (value: string) => void;
  prompt: prompt;
  setPrompt: (value: prompt) => void;
  allPrompts: prompt[];
  setAllPrompts: (value: prompt[]) => void;
  mockdata: mockdata;
  setMockdata: (value: mockdata) => void;
  allMockdata: mockdata[];
  setAllMockdata: (value: mockdata[]) => void;
  result: string;
  setResult: (value: string) => void;
  tokens: tokens | null;
  setTokens: (value: tokens) => void;
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
  const [application, setApplication] = useState("");
  const [prompt, setPrompt] = useState<prompt>({ promptName: "", promptText: "" });
  const [result, setResult] = useState("");
  const [allPrompts, setAllPrompts] = useState<prompt[]>([]);
  const [mockdata, setMockdata] = useState<mockdata>({ _id: "", name: "", data: "" });
  const [allMockdata, setAllMockdata] = useState<mockdata[]>([]);
  const [tokens, setTokens] = useState<tokens | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/get_prompts");
      const data = await response.json();
      setAllPrompts(data);
    };

    const fetchMockdata = async () => {
      try {
        const response = await fetch("/api/get_mockdata");
        if (!response.ok) {
          throw new Error("Failed to fetch mock data");
        }
        const data = await response.json();
        setAllMockdata(data);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };

    fetchPrompts();
    fetchMockdata();
  }, []);

  return (
    <AppContext.Provider
      value={{
        application,
        setApplication,
        prompt,
        setPrompt,
        allPrompts,
        setAllPrompts,
        mockdata,
        setMockdata,
        allMockdata,
        setAllMockdata,
        result,
        setResult,
        tokens,
        setTokens,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
