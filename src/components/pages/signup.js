import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/authContext'
import { useState, useContext } from 'react';


const SignupSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(2, 'Minimum 2 characters').max(16, 'Maximum 16 characters'),
  confirmpassword: Yup.string().required('Password is required').min(2, 'Minimum 2 characters').max(16, 'Maximum 16 characters'),
});


export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

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
          confirmpassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          if (values.password === values.confirmpassword) {
            console.log('Signup is fine', values);
            signup.mutate(values);
          }
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

            <label htmlFor="confirmpassword">Confirm Password</label>
            {errors.confirmpassword && <Box color="red">{errors.confirmpassword}</Box>}
            <Input as={Field} autoComplete="off" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" />

            <Button isLoading={signup.isLoading} isDisabled={Object.keys(errors).length !== 0} type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
      <Box color="red">{error}</Box>
    </Box>
  )
}