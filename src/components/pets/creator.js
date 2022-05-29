import { Box, Button, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const PetSchema = Yup.object({
  name: Yup.string().required('Name is required').min(2, 'Minimum 2 characters').max(16, 'Maximum 16 characters'),
  type: Yup.string().required('Type is required').min(2, 'Minimum 2 characters').max(16, 'Maximum 16 characters'),
});

export default function PetCreator({ mutation: petCreateMutation, petData, isEditting, petUpdateMutation }) {
  return (
    <Box
      borderRadius="4px"
      maxWidth="700px"
      margin="20px auto"
      padding="3"
      bgColor="gray.700"
      boxShadow="base" // https://chakra-ui.com/docs/features/style-props
    >
      <Formik
        initialValues={{
          name: petData?.name || '',
          type: petData?.type || '',
          image: petData?.image || null,
        }}
        validationSchema={PetSchema}
        onSubmit={(values, actions) => {
          if (isEditting) {
            console.log('enterd');
            petUpdateMutation.mutate(values, {
              onSettled: () => {
                actions.setSubmitting(false);
              }
            });
          } else {
            petCreateMutation.mutate(values, {
              onSettled: () => {
                actions.setSubmitting(false);
              }
            });
          }
        }}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form>
            <label htmlFor="name">Name</label>
            {errors.name && <Box color="red">{errors.name}</Box>}
            <Input as={Field} autoComplete="off" id="name" name="name" placeholder="Pet's name" />

            <label htmlFor="type">Type</label>
            {errors.type && <Box color="red">{errors.type}</Box>}
            <Input as={Field} autoComplete="off" id="type" name="type" placeholder="Pet's type" />

            <label htmlFor="image">Photo</label>
            <Input type="file" onChange={(event) => {
              const file = event.currentTarget.files[0];
              toBase64(file).then((result) => {
                setFieldValue('image', result);
              })
            }} autoComplete="off" id="image" name="image" />

            
            <Button isLoading={isSubmitting} isDisabled={Object.keys(errors).length !== 0} type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}