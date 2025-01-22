import Navbar from "./components/header/navbar";
import Home from "./pages/home-page";

function App() {
  return (
    <>
      <div className="grid min-h-svh grid-rows-[minmax(3.5rem,_auto)_1fr_minmax(3.5rem,_auto)] overflow-y-auto font-['Geist'] antialiased">
        <header className="flex items-center px-4 lg:px-6">
          <Navbar />
        </header>

        <main>
          <Home />
        </main>

        <footer></footer>
      </div>
    </>
  );
}

export default App;
