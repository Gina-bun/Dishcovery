
import { createContext, useState, useEffect } from "react"
import { Meal } from "../types/types"

interface SavedMealsContextType {
    savedMeals: Meal[]
    saveMeal: (meal: Meal) => void
    removeMeal: (id: string) => void
    isSaved: (id: string) => boolean
}

const SavedMealsContext = createContext<SavedMealsContextType | undefined>(undefined)

export const SavedMealsProvider = ({children} : {children: React.ReactNode}) => {
    const [savedMeals, setSavedMeals] = useState<Meal[]>(() => {
        const stored = localStorage.getItem("savedMeals")
        return stored ? JSON.parsed(stored) : []
    })

    useEffect(() => {
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals))

    }, [savedMeals])

    const savedMeal = (meal: Meal) => {
        setSavedMeals((prev) => [...prev, meal])
    }

    const removeMeal = (id: string) => {
        setSavedMeals((prev) => prev.filter((meal) => meal.idMeal !== id))
    }

    const isSaved = (id: string) => {
        return savedMeals.some((meal) => meal.idMeal === id)
    }

    return (
        <SavedMealsContext.Provider
        value={{savedMeals, saveMeal, removeMeal, isSaved}}
        >
            {children}
        </SavedMealsContext.Provider>
    )
}

export const useSavedMeals = () => {
  const context = useContext(SavedMealsContext);
  if (!context) throw new Error("useSavedMeals must be used within SavedMealsProvider");
  return context;
};