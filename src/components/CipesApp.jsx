import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeComponent from './RecipeComponent';
import DashboardComponent from './DashboardComponent';
import AddRecipeComponent from './AddRecipeComponent';
import GroceryComponent from './GroceryComponent';
import AddGroceryComponent from './AddGroceryComponent';
import HeaderComponent from './HeaderComponent';
import GroceryCategoryComponent from './GroceryCategoryComponent';
import AddGroceryCategoryComponent from './AddGroceryCategoryComponent'
import ErrorComponent from './ErrorComponent';


export default function CipesApp() {
    return (
        <div className="CipesApp">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={<DashboardComponent />} />
                    <Route path='/home' element={<DashboardComponent />} />
                    <Route path='/recipe' element={<RecipeComponent />} />
                    <Route path='/addrecipe' element={<AddRecipeComponent />} />
                    <Route path="/grocery" element={<GroceryComponent />} />
                    <Route path="/addgrocery" element={<AddGroceryComponent />} />
                    <Route path="/category" element={<GroceryCategoryComponent />} />
                    <Route path="/addcategory" element={<AddGroceryCategoryComponent />} />
                    <Route path="/error" element={<ErrorComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}


