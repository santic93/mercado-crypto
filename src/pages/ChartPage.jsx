import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseEndPoint from "../apis/coinGecko";
import PriceChart from "../components/PriceChart";
import VolumesChart from "../components/VolumesChart";

const ChartPage = () => {
  const { id } = useParams();
  const [prices, setPrices] = useState({});
  const [volumes, setVolumes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [day, week, year] = await Promise.all([
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: "ars", days: "1" },
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: "ars", days: "7" },
        }),
        baseEndPoint.get(`/coins/${id}/market_chart/`, {
          params: { vs_currency: "ars", days: "365" },
        }),
      ]);
      setPrices({
        dailyPrices: day.data.prices,
        weeklyPrices: week.data.prices,
        yearPrices: year.data.prices,
      });
      setVolumes({
        dailyVolumes: day.data.total_volumes,
        weeklyVolumes: week.data.total_volumes,
        yearVolumes: year.data.total_volumes,
      });
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return (
    <div>
      {isLoading ? (
        <div className="lds-roller">
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
        <div>
          <PriceChart prices={prices} id={id} />
          <VolumesChart volumes={volumes} id={id} />
        </div>
      )}
    </div>
  );
};

export default ChartPage;
