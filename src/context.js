import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https:/www.themealdb.com/api/json/v1/1/random.php/'

const  AppProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchMeal = async (url) => {
        setLoading(true);

        try {
            const {data} = await axios(url);
            if(data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            
        } catch (error) {
            console.log(error.response);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchMeal(allMealsUrl);
    }, [])

    useEffect(() => {
        if(!searchTerm ) return
        fetchMeal(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    const fetchRandomMeal = () => {
        fetchMeal(randomMealUrl);
    };    
    


    return <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal }}>
        {children}
    </AppContext.Provider>
}
 
// custom hook to use context API
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
