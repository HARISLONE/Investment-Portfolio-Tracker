import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <header className="border-b p-4 font-semibold">Investment Portfolio Tracker</header>
        <main className="p-4">Dashboard placeholder</main>
      </div>
    </QueryClientProvider>
  );
}
