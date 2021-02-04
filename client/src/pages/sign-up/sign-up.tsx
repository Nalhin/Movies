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
import { axiosErrorHandler } from '../../shared/shared/axios-error-handler/axios-error-handler';
import { apiErrorsToObject } from '../../shared/shared/api-errors-to-object/api-errors-to-object';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
});

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
      axiosErrorHandler(e, {
        400: () => helper.setErrors(apiErrorsToObject(e)),
      });
    }
  };

  return (
    <View style={tailwind('h-full justify-center')}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={signUp}
        validationSchema={schema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <Card>
            <Input
              accessibilityLabel="username"
              label="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              errorMessage={errors.username}
            />
            <Input
              accessibilityLabel="email"
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={errors.email}
            />
            <Input
              accessibilityLabel="password"
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              errorMessage={errors.password}
            />
            <Button
              title="Sign up"
              onPress={() => handleSubmit()}
              loading={isLoading}
              disabled={isLoading}
            />
          </Card>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
