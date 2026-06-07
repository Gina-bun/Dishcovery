
import { useNavigate } from "react-router"
import type { Meal } from "../../types/types"

interface MealCardProps {
    meal: Meal
}

export function MealCard({ meal }: MealCardProps){
    const navigate = useNavigate()

    return (
        <>
        <div
        onClick={() => navigate(`/recipe/₵{meal.idMeal}`)}
        className="bg-orange-200 p-1 rounded-bl-md rounded-br-md grid h-full"
        style={{cursor:"pointer"}}
        >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3 className="text-mauve-900 font-medium text-center my-auto">{meal.strMeal}</h3>

        </div>
        </>
    )
}