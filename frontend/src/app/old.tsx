

// app/page.tsx
import {AppProvider} from './context/AppContext';
import {  prompt, mockdata } from '../../types';
import Link from 'next/link';

 const fetchPrompts = async () => {
      try {
        console.log("Fetching prompts data");
        const response = await fetch("/api/get_all_data");
        if (!response.ok) {
          throw new Error("Failed to fetch prompt data");
        }
        const data : prompt[]= await response.json();
        console.log("Fetched prompts data:", data);
        // setAllPrompts(data);
        return data;
      } catch (error) {
        console.error("Error fetching mock data:", error);
        return [];
      }
    };

const Home = async () => {
  const initialData : prompt[] = await fetchPrompts();
    console.log("initialData", initialData);
  return (
    <AppProvider>
      <div>
        <h1 className="text-6xl font-bold">Welcome to the Home Page</h1>
        <p>This is a server component fetching initial data.</p>
        <Link href="/prompt-engineering">PROMPT ENGINEERING
        </Link>
        {/* Optionally render initial data */}
        <pre>{JSON.stringify(initialData, null, 2)}</pre>
      </div>
    </AppProvider>
  );
};

export default Home;
