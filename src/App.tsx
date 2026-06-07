import { Navbar } from "./components/Navbar/Navbar";
import "./App.css";
import { Route, Routes } from "react-router";
import { HomePage } from "./features/HomePage/HomePage";
import { Categories } from "./features/Categories/Categories";
import { MealList } from "./features/MealList/MealList";
import { RecipeDetail } from "./features/RecipeDetail/RecipeDetail";
import { Saved } from "./features/Saved/Saved";

function App() {
  return (
    <>
      <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/meals" element={<MealList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
    </>
  );
}

export default App;
