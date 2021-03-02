import React, { useState } from 'react';
import { Button, Input, Overlay } from 'react-native-elements';
import { View, Text } from 'react-native';
import { useQuery } from 'react-query';
import tailwind from 'tailwind-rn';
import { getPlotQuestion } from '../../core/api/movie/movie-plot-question.api';

interface Props {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}

const PlotQuestionModal = ({ movieId, isOpen, onClose }: Props) => {
  const [question, setQuestion] = useState('');

  const { data, refetch, isLoading, remove, error } = useQuery(
    [movieId, 'question'],
    () => getPlotQuestion(movieId, question),
    { enabled: false, select: (resp) => resp.data },
  );

  return (
    <Overlay isVisible={isOpen} onBackdropPress={onClose}>
      <View style={tailwind('w-80')}>
        <Text style={tailwind('font-bold text-lg text-center mb-1')}>
          Question
        </Text>
        <Input onChangeText={(text) => setQuestion(text)} value={question} />
        <Button
          title="Ask"
          onPress={() => {
            remove();
            refetch();
          }}
          loading={isLoading}
          disabled={isLoading}
        />
        {error && (
          <Text
            style={tailwind(
              'font-bold text-base text-center mt-2 text-red-600',
            )}
          >
            The question couldn't be answered
          </Text>
        )}
        {data?.answer && (
          <>
            <Text style={tailwind('font-bold text-lg text-center mt-2')}>
              Your answer
            </Text>
            <Text style={tailwind('text-sm text-center')}>{data?.answer}</Text>
          </>
        )}
      </View>
    </Overlay>
  );
};

export default PlotQuestionModal;
