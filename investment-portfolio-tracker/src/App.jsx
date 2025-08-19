import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import logo from "./assets/woliul-hasan-aAvzCO-B5aA-unsplash.jpg";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <header className="flex items-center space-x-3 p-4 border-b">
          <img
            src={logo}
            alt="Investment Portfolio Tracker Logo"
            className="h-14 w-14 rounded-full"
          />
          <h1 className="text-xl font-bold">Investment Portfolio Tracker</h1>
        </header>
        <main className="p-4">Dashboard placeholder</main>
      </div>
    </QueryClientProvider>
  );
}
