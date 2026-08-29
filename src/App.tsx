import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./Routes/Routes";
import { Toaster } from "sonner";
import ReduxProvider from "./services/provider/ReduxProvider";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <ReduxProvider>
        <AuthInitializer>
          <RouterProvider router={Routes} />
        </AuthInitializer>
      </ReduxProvider>
    </>
  );
}

export default App;


