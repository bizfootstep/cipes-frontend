import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createRecipeApi } from "./api/RecipeService"
import { retrieveAllGroceryApi } from "./api/GroceryService"
import { Formik, Form, Field } from "formik"


export default function AddRecipeComponent() {
    const [groceries, setGroceries] = useState([])
    const [recipeType, setRecipeType] = useState('')
    const navigate = useNavigate();

    useEffect(() => retrieveGroceries(), [])

    function retrieveGroceries() {
        retrieveAllGroceryApi()
            .then((response) => {
                setGroceries(response.data.data)
            })
            .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const recipe = {
            recipeType: values.recipeType,
            steps: values.steps,
            groceryIds: values.groceryIds
        }
        createRecipeApi(recipe)
            .then(() => { navigate('/recipe') })
            .catch((error) => console.log(error));
    }

    function validate(values) {

        console.log(values)
    }
    return (
        <div className="container">
            <h1>Enter Recipe Details</h1>
            <div>
                <Formik initialValues={{ recipeType: '', steps: '' }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Recipe Type</label>
                                    <Field type="text" className="form-control" name="recipeType" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Steps</label>
                                    <Field type="text" className="form-control" name="steps" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Groceries</label>
                                    <Field as="select" className="form-control" name="groceryIds" multiple>
                                        {groceries.map(grocery => (
                                            <option key={grocery.groceryId} value={grocery.groceryId}>
                                                {grocery.groceryName}
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