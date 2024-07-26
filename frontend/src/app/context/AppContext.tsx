"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { tokens, prompt, mockdata, result } from "../../../types";

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
  result: result | null;
  setResult: (value: result) => void;
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
  const [result, setResult] = useState<result | null>(null);
  const [allPrompts, setAllPrompts] = useState<prompt[]>([]);
  const [mockdata, setMockdata] = useState<mockdata>({ _id: "", name: "", data: "" });
  const [allMockdata, setAllMockdata] = useState<mockdata[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log("Fetching prompts data");
        const response = await fetch("/api/get_all_data");
        if (!response.ok) {
          throw new Error("Failed to fetch prompt data");
        }
        const data = await response.json();
        console.log("Fetched prompts data now", data);
        setAllPrompts(data?.prompts);
        setAllMockdata(data?.mockdata);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };
    if (allPrompts === undefined) {
    }
      fetchAllData();
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
