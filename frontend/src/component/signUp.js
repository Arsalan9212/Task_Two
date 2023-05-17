import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../redux/slice/userSlice';

function Signup() {
  const dispatch = useDispatch();

  return (
    <div className="Signup">
      <center>
        <h1>Register a new account</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = 'Required';
            }

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            dispatch(signUp(values));
          }}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Enter your fullname"
              />
              <ErrorMessage name="username" component="div" />

              <Field
                type="email"
                name="email"
                placeholder="Enter email address"
              />
              <ErrorMessage name="email" component="div" />

              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        if already have account?
        <Link to="/login">LOGIN</Link>
      </center>
    </div>
  );
}
export default Signup;
