import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Area } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FREQ, selectFreq } from '../features/FreqSlice';

const PriceChart = ({
  prices: { dailyPrices, weeklyPrices, yearPrices },
  id,
}) => {
  const freq = useSelector(selectFreq);
  const dispatch = useDispatch();
  const config = {
    data: freq === '1' ? dailyPrices : freq === '7' ? weeklyPrices : yearPrices,
    xField: freq === '1' ? 'dia' : freq === '7' ? 'semana' : 'anio',
    yField: 'precio',
    xAxis: {
      tickCount: 5,
    },
    animation: true,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: {
        isArea: true,
      },
    },
  };

  return (
    <div>
      <h1>
        {freq === '1'
          ? `Precio por Dia ${id}`
          : freq === '7'
          ? `Precio por Semana ${id}`
          : `Precio por Año ${id}`}
      </h1>
      <Area {...config} />
      <Button
        variant='contained'
        endIcon={<AccessTimeFilledIcon />}
        onClick={() => dispatch(SET_FREQ('1'))}
      >
        24 Hrs
      </Button>
      <Button
        variant='contained'
        endIcon={<CalendarMonthIcon />}
        onClick={() => dispatch(SET_FREQ('7'))}
      >
        1 Semana
      </Button>
      <Button
        variant='contained'
        endIcon={<TimelineIcon />}
        onClick={() => dispatch(SET_FREQ('365'))}
      >
        1 Año
      </Button>
    </div>
  );
};

export default PriceChart;
