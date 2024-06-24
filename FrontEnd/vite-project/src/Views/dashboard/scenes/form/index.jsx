import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { styled } from "@mui/material/styles";
import { useNotify } from "../../../../Provider/NotifyProvider";

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  "& .PhoneInputInput": {
    width: "100%",
    padding: "16.5px 14px",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: "16px",
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const FormComponent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { notifySuccess, notifyError } = useNotify();

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3000/admin/users", values);
      console.log("User created successfully:", response.data);
      notifySuccess("User created successfully");
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response.data.code === "auth/email-already-exists") {
        notifyError("Email already exists");
      }
      else if (error.response.data.code === "auth/invalid-email") {
        notifyError("Invalid email");
      }
      else {
        notifyError("Error creating user");
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField fullWidth variant="filled" type="text" label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={!!touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName" error={!!touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{ gridColumn: "span 4" }} />
              <Field name="contact">
                {({ field }) => (
                  <>
                    <StyledPhoneInput {...field} international defaultCountry="US" value={values.contact} onChange={(value) => setFieldValue("contact", value)} onBlur={handleBlur} />
                    {touched.contact && errors.contact && <div style={{ color: "red", gridColumn: "span 4" }}>{errors.contact}</div>}
                  </>
                )}
              </Field>
              <TextField fullWidth variant="filled" type="text" label="Address" onBlur={handleBlur} onChange={handleChange} value={values.address} name="address" error={!!touched.address && !!errors.address} helperText={touched.address && errors.address} sx={{ gridColumn: "span 4" }} />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp = /^\+[1-9]\d{1,14}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid. Must be E.164 compliant.").required("required"),
  address: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
};

export default FormComponent;
