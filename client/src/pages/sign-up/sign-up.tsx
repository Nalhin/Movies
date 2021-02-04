import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import { useMutation } from 'react-query';
import { postSignUp } from '../../core/api/user/auth.api';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { SignUpRequestDto } from '../../core/api/api.types';
import { useNavigation } from '@react-navigation/native';
import { ROOT_ROUTES } from '../root.routes';

const SignUp = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const { mutateAsync, isLoading } = useMutation(postSignUp);

  const signUp = async (
    values: SignUpRequestDto,
    helper: FormikHelpers<SignUpRequestDto>,
  ) => {
    try {
      const response = await mutateAsync(values);
      await auth.authenticateUser(
        {
          user: response.data.user,
          token: response.data.token,
        },
        { onAuth: () => navigation.navigate(ROOT_ROUTES.MAIN) },
      );
    } catch (e) {
      helper.resetForm();
    }
  };

  return (
    <View style={tailwind('h-full justify-center')}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={signUp}
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
