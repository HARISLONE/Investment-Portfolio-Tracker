import React from "react";
import Kpis from "./components/Kpis.jsx";
import PortfolioLine from "./components/charts/PortfolioLine.jsx";
import PortfolioPie from "./components/charts/PortfolioPie.jsx";
import AssetList from "./components/AssetList.jsx";
import AssetDrawer from "./components/AssetDrawer.jsx";
import logo from "./assets/woliul-hasan-aAvzCO-B5aA-unsplash.jpg";

// MOCKS
import holdings from "./mocks/holdings.json";
import quotes from "./mocks/quotes.json";
import history from "./mocks/history.json";

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-4 shadow">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Simple header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <img
             src={logo}
             alt="Investment Portfolio Tracker Logo"
             className="h-14 w-14 rounded-full"
           />
          <h1 className="text-[15px] font-semibold text-slate-900">Investment Portfolio Tracker</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Kpis holdings={holdings} quotes={quotes} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Panel title="Portfolio Value">
              <PortfolioLine data={history} />
            </Panel>
            <Panel title="Allocation">
              {/* build allocation from helpers inline to keep it simple */}
              <PortfolioPie
                data={holdings.reduce((acc, h) => {
                  const t = h.type;
                  const price = quotes[h.symbol]?.price ?? 0;
                  const v = h.qty * price;
                  const i = acc.findIndex((x) => x.name === t);
                  if (i === -1) acc.push({ name: t, value: v });
                  else acc[i].value += v;
                  return acc;
                }, [])}
              />
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel title="Holdings">
              <AssetList
                holdings={holdings}
                quotes={quotes}
                onSelect={(h) => setSelected(h)}
              />
            </Panel>
          </div>
        </div>
      </main>

      <AssetDrawer
        asset={selected}
        quote={selected ? quotes[selected.symbol] : null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
