import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { useMutation } from 'react-query';
import { postLogin } from '../../core/api/user/auth.api';
import { LoginRequestDto } from '../../core/api/api.types';
import { Formik, FormikHelpers } from 'formik';
import { ROOT_ROUTES } from '../root.routes';
import tailwind from 'tailwind-rn';
import { Button, Card, Input } from 'react-native-elements';
import { axiosErrorHandler } from '../../shared/shared/axios-error-handler/axios-error-handler';
import { apiErrorsToObject } from '../../shared/shared/api-errors-to-object/api-errors-to-object';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const { mutateAsync, isLoading } = useMutation(postLogin);

  const login = async (
    values: LoginRequestDto,
    helper: FormikHelpers<LoginRequestDto>,
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
        initialValues={{ username: '', password: '' }}
        onSubmit={login}
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
              accessibilityLabel="password"
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              errorMessage={errors.password}
            />
            <Button
              title="Login"
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

export default Login;
