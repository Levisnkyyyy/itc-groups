import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import { useQueryClient } from "react-query";
import useUser from "../../hooks/useUser";
import moment from "moment";
import AuthContext from "../../contexts/authContext";


const UserSchema = Yup.object({
  bio: Yup.string().notRequired(),
  newpassword: Yup.string().notRequired(),
  confirmnewpassword: Yup.string().when('newpassword', {
    is: (val) => !!val,
    then: (schema) => schema.required('Confirm your password'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function UserPage() {
  const queryClient = useQueryClient();
  const { updateInfo } = useUser();
  const { isLoggedIn: userInfo } = useContext(AuthContext);
  return (
    <Box
      bgColor="gray.600"
      maxWidth="500px"
      margin="20px auto"
      padding="4"
      borderRadius="4px"
    >
      <Flex mb="5" align="center">
          <Box width="160px">Email</Box>
          <Box>{userInfo?.email}</Box>
      </Flex>
      <Flex mb="5" align="center">
          <Box width="160px">Created at</Box>
          <Box>{moment(userInfo?.createdAt).fromNow()}</Box>
      </Flex>
      <Flex mb="5" align="center">
          <Box width="160px">Updated at</Box>
          <Box>{moment(userInfo?.updatedAt).fromNow()}</Box>
      </Flex>
      {userInfo && Object.keys(userInfo).length !== 0 && (
        <Formik
          validationSchema={UserSchema}
          initialValues={{
            bio: userInfo.bio || '',
            newpassword: '',
            confirmnewpassword: '',
          }}
          onSubmit={(values) => {
            updateInfo.mutate(values);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <label htmlFor="bio">Bio</label>
              {errors.bio && <Box color="red">{errors.bio}</Box>}
              <Textarea as={Field} autoComplete="off" id="bio" name="bio" placeholder="Your bio" />

              <label htmlFor="password">New Password</label>
              {errors.newpassword && <Box color="red">{errors.newpassword}</Box>}
              <Input as={Field} autoComplete="off" id="newpassword" name="newpassword" placeholder="Password" />

              <label htmlFor="confirmnewpassword">Confirm New Password</label>
              {errors.confirmnewpassword && <Box color="red">{errors.confirmnewpassword}</Box>}
              <Input as={Field} autoComplete="off" id="confirmnewpassword" name="confirmnewpassword" placeholder="Confirm Password" />

              <Button isDisabled={Object.keys(errors).length !== 0} type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}