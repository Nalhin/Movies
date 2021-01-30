import { axios } from '../axios';
import {
  AuthResponseDto,
  LoginRequestDto,
  SignUpRequestDto,
  UserResponseDto,
} from '../api.types';

export const postLogin = (body: LoginRequestDto) =>
  axios.post<AuthResponseDto>('/auth/login', body);

export const postSignUp = (body: SignUpRequestDto) =>
  axios.post<AuthResponseDto>('/auth/sign-up', body);

export const getMe = () => axios.get<UserResponseDto>('/me');
