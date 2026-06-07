import { useEffect } from "react";
import { MealCard } from "../../components/MealCard/MealCard";
import { useSavedMeals } from "../../context/SavedMealsContext";
import { Heart } from "lucide-react";

export function Saved() {
  const { savedMeals } = useSavedMeals();

  useEffect(() => {
    document.title = "Dishcovery | Saved";
  }, []);

  return (
    <>
      <div className="max-h-fit pb-10">
        <h1 className="font-medium py-3 pb-5 text-rose-600 sm:text-xl">
          Saved Recipe
        </h1>
        {savedMeals.length === 0 ? (
          <div>
            <p>No saved recipes yet.</p>
            <p>Go explore and save something delicious.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {savedMeals.map((meal) => (
               <div className="relative">
                 <MealCard key={meal.idMeal} meal={meal} />
                 <Heart style={{position: "absolute", top: "0", right: "0", fill: "red", margin:".5rem", color: "darkred"}}/>
               </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
