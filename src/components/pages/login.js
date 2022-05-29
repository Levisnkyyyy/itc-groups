import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext';


const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(2, 'Minimum 2 characters').max(16, 'Maximum 16 characters'),
});

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  return (
    <Box
      w="400px"
      m="20px auto"
      borderRadius="4px"
      p="2"
      bgColor="gray.500"
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          login.mutate(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <label htmlFor="email">Email</label>
            {errors.email && <Box color="red">{errors.email}</Box>}
            <Input as={Field} autoComplete="off" id="email" name="email" placeholder="Put your email in" />

            <label htmlFor="password">Password</label>
            {errors.password && <Box color="red">{errors.password}</Box>}
            <Input as={Field} autoComplete="off" id="password" name="password" placeholder="Password" />
          
            <Button isLoading={login.isLoading} isDisabled={Object.keys(errors).length !== 0} type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}