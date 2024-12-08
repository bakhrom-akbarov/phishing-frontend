import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSendPhishingEmailMutation } from "../api/apiSlice";

const initialValues = { email: '' };

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export const Phishing: React.FC = () => {

  const [sendPhishing, { isLoading }] = useSendPhishingEmailMutation()

  const handleSubmit = async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      await sendPhishing({ email: values.email }).unwrap()
      alert(`Phishing email sent to ${values.email}`);
      resetForm();
    } catch (e) {
      alert('Failed to send email')
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
        Phishing Simulation
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                label="Target Email"
                name="email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Send Email
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
