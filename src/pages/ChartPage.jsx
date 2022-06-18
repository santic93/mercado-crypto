import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseEndPoint from '../apis/coinGecko';
import PriceChart from '../components/PriceChart';
import VolumesChart from '../components/VolumesChart';
const formatData = (data) => {
  //   var date = new Date(timestamp);
  // console.log(date.getTime())
  // console.log(date)
  return data.map((coordenadas) => {
    const data = new Date(coordenadas[0]);
    return {
      dia: data.getHours() + ':' + data.getMinutes(),
      semana: data.getDate() + '/' + (data.getMonth() + 1),
      anio: data.getMonth() + 1 + '/' + data.getFullYear(),

      //vertical,horario,timestamp
      precio: coordenadas[1], //horizontal, precio,volumen
    };
  });
};

const ChartPage = () => {
  const { id } = useParams();
  const [prices, setPrices] = useState({});
  const [volumes, setVolumes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [day, week, year] = await Promise.all([
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: 'ars', days: '1' },
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: 'ars', days: '7' },
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: 'ars', days: '365' },
        }),
      ]);
      setPrices({
        dailyPrices: formatData(day.data.prices),
        weeklyPrices: formatData(week.data.prices),
        yearPrices: formatData(year.data.prices),
      });
      setVolumes({
        dailyVolumes: formatData(day.data.total_volumes),
        weeklyVolumes: formatData(week.data.total_volumes),
        yearVolumes: formatData(year.data.total_volumes),
      });
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div >
          <div>
            <PriceChart prices={prices} id={id} />
            <hr />
            <VolumesChart volumes={volumes} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartPage;
