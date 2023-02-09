import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import axios from 'axios';

const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
};

const Dropdown = () => {

    const [list, setList] = useState([])
    const [initialState, setInitialState] = useState("")

    const getData = async () => {
        const data = await axios.get('https://jsonplaceholder.typicode.com/comments')
        const requiredData = data.data.slice(0, 50);
        setList(requiredData)
        setInitialState(requiredData[0].email)
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <h1>My Form</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{ color: initialState }}
                onSubmit={(values, actions) => {
                    console.log(values)
                }}
            >
                {(props) => (
                    <Form>
                        <Field as="select" name="color" style={{ padding: "3px 10px" }}>
                            {
                                list?.map((data, index) => {
                                    return (
                                        <>
                                            <option value={data.email} >{data.email}</option>
                                        </>
                                    )
                                })
                            }
                        </Field>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )

};

export default Dropdown
