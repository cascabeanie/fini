import Navbar from "./components/header/navbar";
import TodoContextProvider from "./contexts/todo-context";
import LoadingContextProvider from "./contexts/loading-context";
import Home from "./pages/home-page";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <div className="grid min-h-svh grid-rows-[minmax(3.5rem,_auto)_1fr_minmax(3.5rem,_auto)] overflow-y-auto font-['Geist'] antialiased">
        <header className="flex items-center px-4 lg:px-6">
          <Navbar />
        </header>

        <main>
          <TodoContextProvider>
            <LoadingContextProvider>
              <Home />
            </LoadingContextProvider>
          </TodoContextProvider>
        </main>

        <footer className="flex items-center justify-center">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
