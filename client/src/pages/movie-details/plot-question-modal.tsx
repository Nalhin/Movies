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

  const { data, refetch, isLoading } = useQuery(
    [movieId, 'question'],
    () => getPlotQuestion(movieId, question),
    { enabled: false, select: (resp) => resp.data },
  );

  return (
    <Overlay isVisible={isOpen} onBackdropPress={onClose}>
      <View style={tailwind('w-80 h-40')}>
        <Input onChangeText={(text) => setQuestion(text)} value={question} />
        <Button
          title="Answer"
          onPress={() => refetch()}
          loading={isLoading}
          disabled={isLoading}
        />
        <Text>{data?.answer}</Text>
      </View>
    </Overlay>
  );
};

export default PlotQuestionModal;
