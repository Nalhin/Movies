import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { format } from 'date-fns';

interface Props {
  budget: number;
  revenue: number;
  releaseDate: string;
  runtime: number | null;
}

function currencyFormat(num: number) {
  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const MovieStats = ({ budget, revenue, releaseDate, runtime }: Props) => {
  return (
    <View style={tailwind('mt-2')}>
      <View style={tailwind('flex flex-row my-1')}>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold text-lg text-center')}>
            Release date
          </Text>
          <Text style={tailwind('text-sm text-center')}>
            {format(new Date(releaseDate), 'yyyy-MM-dd')}
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold text-lg text-center')}>Runtime</Text>
          <Text style={tailwind('text-sm text-center')}>
            {runtime ? `${runtime} minutes` : 'no info'}
          </Text>
        </View>
      </View>
      <View style={tailwind('flex flex-row my-1')}>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold text-lg text-center')}>Budget</Text>
          <Text style={tailwind('text-sm text-center')}>
            {currencyFormat(budget)}
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold text-lg text-center')}>Revenue</Text>
          <Text style={tailwind('text-sm text-center')}>
            {currencyFormat(revenue)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MovieStats;
