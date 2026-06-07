
import { useSearchParams } from "react-router"
import type { Meal } from "../../types/types"
import useFetch from "../../hooks/useFetch"
import { MealCard } from "../../components/MealCard/MealCard"

interface MealListResponse {
    meals: Meal[] | null
}


export function MealList(){
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const url = category
    ?  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : search
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    : null
    const {data, loading, error} = useFetch<MealListResponse>(url) 

    const title = category ? category : search ? `Results for "${search}"` : "Meals"

    if (loading) return <p>Loading meals...</p>
    if (error) return <p>Something went wrong: {error}</p>

    return (
        <>
        <h1>{title}</h1>
        {
            !data?.meals ? (
                <p>No meals found. try something else.</p>
            ) : (
                <div>
                    {data.meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )
        }
        </>
    )
}