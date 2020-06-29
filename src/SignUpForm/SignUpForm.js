import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...formik.getFieldProps('firstName')} />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...formik.getFieldProps('lastName')} />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input id="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

  //have access to handleSubmit, handleChange, and values via formik object

  //use the same exact handleChange for each HTML input
  //pass id and name for input that matches initialValues above 


// Like errors and values, Formik can keep track of which fields have been visited. It stores this information in an object called touched that also mirrors the shape of values/initialValues, but each key can only be a boolean true/false.

// To take advantage of touched, we can pass formik.handleBlur to each input's onBlur prop. This function works similarly to formik.handleChange in that it uses the name attribute to figure out which field to update.

//Formik recommends Yup over PropTypes for validation 

//to save you time, useFormik() returns a helper method called formik.getFieldProps() to make it faster to wire up inputs. Given some field-level info, it returns to you the exact group of onChange, onBlur, value, checked for a given field. You can then spread that on an input, select, or textarea.

//To save you even more time, Formik comes with React Context-powered API/component make life easier and less verbose: <Formik />, <Form />, <Field />, and <ErrorMessage />. More explicitly, they use React Context implicitly to connect to the parent <Formik /> state/methods. --> context API is built into Formik

//The <Field> component by default will render an <input> component that given a name prop will implicitly grab the respective onChange, onBlur, value props and pass them to the element as well as any props you pass to it. However, since not everything is an input, <Field> also accepts a few other props to let you render whatever you want. Some examples..