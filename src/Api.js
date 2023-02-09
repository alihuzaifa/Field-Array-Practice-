import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from "axios"





const Api = () => {

    const [data, setData] = useState([])

    const getData = async () => {
        const data = await axios.get("https://jsonplaceholder.typicode.com/users")
        const response = data.data
        setData(response)
    }

    useEffect(() => {
        getData()
    }, [])

    const style = {
        margin: '1em 0em',
        fontSize: '1.5em',
        backgroundColor: 'white',
    };

    const styleError = {
        margin: '1em 10em',
        fontSize: '1.5em',
    };

    return <>
        <Formik
            enableReinitialize={true}
            initialValues={{ friends: data, drop: { email: '', color: 'red', firstName: '', lastName: '' } }}
            onSubmit={values =>
                console.log(values)
            }
            render={({ values }) => (
                <Form>
                    <FieldArray
                        name="friends"
                        render={arrayHelpers => (
                            <div>
                                {values.friends && values.friends.length > 0 ? (
                                    values.friends.map((friend, index) => (
                                        <div key={index}>
                                            <Field name={`friends.${index}.email`} />
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                        {/* show this when user has removed all friends from the list */}
                                        Add a friend
                                    </button>
                                )}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>


                        )}
                    />
                </Form>
            )}
        />
    </>


}

export default Api