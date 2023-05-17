import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../redux/slice/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userRole = useSelector((state) => state.users.item.role);

  // const handleRedirect = () => {
  //   userRole ? navigate('/admin') : navigate('/');
  // };

  return (
    <div className="login">
      <center>
        <h1>LogIn your account</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};

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
            // console.log(values);
            dispatch(logIn(values));
            navigate('/');
          }}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Enter email address"
              />
              <ErrorMessage name="email" component="div" />

              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />

              <button
                type="submit"
                // onClick={handleRedirect}
                disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        Don't have account?
        <Link to="/signup">signUp</Link>
      </center>
    </div>
  );
}
export default Login;
