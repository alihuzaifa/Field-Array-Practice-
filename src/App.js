import React, { useState } from "react"
import { useFormik } from "formik/dist"
import * as Yup from "yup"

const App = () => {

  const initialValues = { email: "", password: "", gender: "", state: "", check: false };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required").min(7, "Minimum 8 characters is required"),
    check: Yup.boolean().oneOf([true], "Are you agree to the above conditions"),
    state: Yup.string().required("Please select any state"),
    gender: Yup.string().required('Gender is required')
  })

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ((values) => {
      console.log(values)
    })
  })

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="form-control" id="inputEmail4" />
        </div>
        {errors.email && errors.email}
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="form-control" id="inputPassword4" />
        </div>
        {errors.password && errors.password}
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">State</label>
          <select id="inputState" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} className="form-select">
            <option selected>Choose...</option>
            <option value={'Hello1'}>Hello1</option>
            <option value={'Hello2'}>Hello2</option>
            <option value={'Hello3'}>Hello3</option>
            <option value={'Hello4'}>Hello4</option>
          </select>
        </div>
        {errors.state && errors.state}

        <div className="form-check">
          <input className="form-check-input" type="radio"
            value="Male"
            checked={values.gender === 'Male'}
            onChange={handleChange}
            onBlur={handleBlur}
            name="gender" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        {errors.gender && errors.gender}

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="check" onChange={handleChange} onBlur={handleBlur} id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        {errors.check && errors.check}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </>
  )
}
export default App