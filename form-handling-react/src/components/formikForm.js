import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Mock API call
    console.log("Sending data to API:", values);

    alert("User registered successfully!");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <h2>Register (Formik)</h2>

        <Field name="username" placeholder="Username" />
        <ErrorMessage name="username" component="p" style={{ color: "red" }} />

        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="p" style={{ color: "red" }} />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="p" style={{ color: "red" }} />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}

export default FormikForm;
