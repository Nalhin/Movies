import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { useMutation } from 'react-query';
import { postSignUp } from '../../core/api/user/auth.api';

const SignUp = () => {
  const { mutate, isLoading } = useMutation(postSignUp);

  return (
    <View style={tailwind('h-full justify-center')}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={(values) => mutate(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Card>
            <Input
              label="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <Input
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
            <Button
              title="Sign up"
              onPress={() => handleSubmit()}
              loading={isLoading}
            />
          </Card>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
