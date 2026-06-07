import { MealCard } from "../../components/MealCard/MealCard"
import { useSavedMeals } from "../../context/SavedMealsContext"




export function Saved(){
    const {savedMeals} = useSavedMeals()

    return (
        <>
        <h1>Saved Recipe</h1>
        {savedMeals.length === 0 ? (
            <div>
                <p>No saved recipes yet.</p>
                <p>Go explore and save something delicious.</p>
            </div>
        ) : 
        (
            <div>
                {
                    savedMeals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))
                }
            </div>
        )
        }
        </>
    )
}