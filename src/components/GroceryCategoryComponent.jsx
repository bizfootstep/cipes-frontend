import { useState, useEffect } from "react";
import { retrieveAllCategoryApi, deleteCategoryByIdApi } from "./api/GroceryCategoryService";
import { useNavigate } from "react-router-dom";

export default function GroceryCategoryComponent() {

    const [categories, setCategories] = useState([]);

    useEffect(() => refreshCategory(), [])
    const navigate = useNavigate()

    function refreshCategory() {
        //call the api and populate category
        retrieveAllCategoryApi()
            .then((response) => {
                setCategories(response.data.data)
            })
            .catch((error) => console.log(error));
    }

    function deleteCategoryById(id) {
        deleteCategoryByIdApi(id)
            .then((response) => { refreshCategory() })
            .catch((error) => console.log(error))
    }

    function addNewCategory(){
        navigate('/addCategory')
    }

    return (
        <div className="container">
            <h1>List of Categories</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(
                                category => (
                                    <tr key={category.categoryId}>
                                        <td>{category.categoryId}</td>
                                        <td>{category.categoryName}</td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteCategoryById(category.categoryId)}>Delete</button></td>
                                        <td><button className="btn btn-success">Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

            </div>
            <div className="btn btn-success m-5" onClick={addNewCategory}>Add New Category</div>
        
        </div>
    )
}