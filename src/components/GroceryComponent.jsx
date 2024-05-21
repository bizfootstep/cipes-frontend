import { useState, useEffect } from "react";
import { retrieveAllGroceryApi, deleteGroceryByIdApi } from "./api/GroceryService";
import { useNavigate } from "react-router-dom";

export default function GroceryComponent() {

    const [groceries, setGroceries] = useState([]);

    useEffect(() => refreshGrocery(), [])

    const navigate = useNavigate()

    function refreshGrocery() {
        retrieveAllGroceryApi()
            .then((response) => {
                setGroceries(response.data.data)
            })
            .catch((error) => console.log(error));
    }

    function deleteGroceryById(id) {
        deleteGroceryByIdApi(id).then(response => {refreshGrocery()})
            .catch(error => console.log(error))
    }

    function addNewGrocery() {
        navigate('/addGrocery')
    }
    
    return (
        <div className="container">
            <h1>List of Groceries</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groceries.map(
                                grocery => (
                                    <tr key={grocery.groceryId}>
                                        <td>{grocery.groceryId}</td>
                                        <td>{grocery.groceryName}</td>
                                        <td>{grocery.category.categoryName}</td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteGroceryById(grocery.groceryId)}>Delete</button></td>
                                        <td><button className="btn btn-success">Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

            </div>
            <div className="btn btn-success" onClick={addNewGrocery}>Add New Grocery</div>
        
        </div>
    )
}