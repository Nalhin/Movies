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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

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
            {formatter.format(budget)}
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('font-bold text-lg text-center')}>Revenue</Text>
          <Text style={tailwind('text-sm text-center')}>
            {formatter.format(revenue)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MovieStats;
