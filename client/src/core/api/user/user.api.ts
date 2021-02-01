import { axios } from '../axios';
import { UserResponseDto } from '../api.types';

export const getMe = () => axios.get<UserResponseDto>('/me');
