import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRegisterMutation } from "../api/apiSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat password is required'),
});


export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await register(values).unwrap()
      navigate('/login');
    } catch (e) {
      alert('Registration failed')
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: 'auto',
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={{ email: '', password: '', repeat_password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                label="Repeat Password"
                name="repeat_password"
                type="password"
                variant="outlined"
                error={touched.repeat_password && Boolean(errors.repeat_password)}
                helperText={touched.repeat_password && errors.repeat_password}
              />
            </Box>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/login">Login</Link>
    </Box>
  );
};
