import { axios } from '../axios';
import { PlotQuestionResponseDto } from '../api.types';

export const getPlotQuestion = (movieId: number, question: string) =>
  axios.get<PlotQuestionResponseDto>(`/movies/${movieId}/plot-question`, {
    params: { question },
  });
