import { Column } from '@ant-design/plots';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFreq } from '../features/FreqSlice';

const VolumesChart = ({
  volumes: { dailyVolumes, weeklyVolumes, yearVolumes },
  id,
}) => {
  const freq = useSelector(selectFreq);

  const config = {
    data:
      freq === '1' ? dailyVolumes : freq === '7' ? weeklyVolumes : yearVolumes,
    xField: freq === '1' ? 'dia' : freq === '7' ? 'semana' : 'anio',
    yField: 'precio',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
  };
  return (
    <div className='volumeChart'>
      <Column {...config} />
    </div>
  );
};

export default VolumesChart;
