import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrandingIndex from "./pages/index";
import BrandingLayout from "./pages/_layout";
import BrandingSection from "./pages/$section";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BrandingLayout />}>
          <Route index element={<BrandingIndex />} />
          <Route path=":section" element={<BrandingSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
