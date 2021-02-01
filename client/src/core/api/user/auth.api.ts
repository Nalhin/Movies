import {
  AuthResponseDto,
  LoginRequestDto,
  SignUpRequestDto,
} from '../api.types';
import { axios } from '../axios';

export const postLogin = (body: LoginRequestDto) =>
  axios.post<AuthResponseDto>('/auth/login', body);

export const postSignUp = (body: SignUpRequestDto) =>
  axios.post<AuthResponseDto>('/auth/sign-up', body);
