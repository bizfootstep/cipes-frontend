import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { createCategoryApi } from "./api/GroceryCategoryService"
import { Formik, Form, Field } from "formik"


export default function AddGroceryCategoryComponent() {
    const [categoryName, setCategoryName] = useState('')
    const navigate = useNavigate();

    function onSubmit(values) {
        const category = {
            categoryName: values.categoryName
        }
        setCategoryName(values.categoryName)
        createCategoryApi(category)
            .then(() => { navigate('/category') })
            .catch((error) => console.log(error));
    }

    function validate(values) {

        console.log(values)
    }
    return (
        <div className="container">
            <h1>Enter Grocery Category Details</h1>
            <div>
                <Formik initialValues={{ categoryName }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Category</label>
                                    <Field type="text" className="form-control" name="categoryName" />
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