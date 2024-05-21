import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGroceryApi } from "./api/GroceryService"
import { retrieveAllCategoryApi } from "./api/GroceryCategoryService"
import { Formik, Form, Field } from "formik"


export default function AddGroceryComponent() {
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [groceryName, setGroceryName] = useState('')
    const navigate = useNavigate();

    useEffect(() => retrieveCategories(), [])

    function retrieveCategories() {
        retrieveAllCategoryApi()
            .then((response) => {
                setCategories(response.data.data)
            })
            .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const grocery = {
            groceryName: values.groceryName,
            categoryId: values.categoryId
        }
        setCategoryId(values.categoryId)
        setGroceryName(values.setGroceryName)
        createGroceryApi(grocery)
            .then(() => { navigate('/grocery') })
            .catch((error) => console.log(error));
    }

    function validate(values) {

        console.log(values)
    }
    return (
        <div className="container">
            <h1>Enter Grocery Details</h1>
            <div>
                <Formik initialValues={{ categoryId: '', groceryName: '' }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Grocery Name</label>
                                    <Field type="text" className="form-control" name="groceryName" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Category</label>
                                    <Field as="select" className="form-control" name="categoryId">
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}