# formik-playground

## Stack: React.js and Formik
Working through a tutorial for a React front end that leverages the Formik library 
___

https://jaredpalmer.com/formik/docs/tutorial

What is Formik? 
"Formik is a small group of React components and hooks for building forms in React and React Native. It helps with the three most annoying parts:
1. Getting values in and out of form state
1. Validation and error messages
1. Handling form submission
By colocating all of the above in one place, Formik keeps things organized--making testing, refactoring, and reasoning about your forms a breeze."

### Using Formik's Field component: 
```js
// <input className="form-input" placeHolder="Jane"  />
<Field name="firstName" className="form-input" placeholder="Jane" />

// <textarea className="form-textarea"/></textarea>
<Field name="message" as="textarea"  className="form-input"/>

// <select className="my-select"/>
<Field name="colors" as="select" className="my-select">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>

// with styled-components/emotion
const MyStyledInput = styled.input`
  padding: .5em;
  border: 1px solid #eee;
  /* ... */
`
const MyStyledTextarea = MyStyledInput.withComponent('textarea');

// <input className="czx_123" placeHolder="google.com"  />
<Field name="website" as={MyStyledInput} placeHolder="google.com"/>

// <textarea  placeHolder="Post a message..." rows={5}></textarea>
<Field name="message" as={MyStyledTextArea} placeHolder="Post a message.." rows={5}/>
```
"React is all about composition, and while we've cut down on a lot of the prop-drilling, we are still repeating ourselves with a label, <Field>, and <ErrorMessage> for each of our inputs. We can do better with an abstraction! With Formik, you can and should build reusable input primitive components that you can share around your application. Turns out our <Field> render-prop component has a sister and her name is useField that's going to do the same thing, but via React Hooks! Check this out..."
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import styled from '@emotion/styled';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  /** ... * /
`;

const StyledErrorMessage = styled.div`
  /** ... * /
`;

const StyledLabel = styled.label`
 /** ...* /
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
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
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
```
