import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../Context/CryptoContext";
import { chartDays } from "../../config/days";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { ColorRing } from "react-loader-spinner";
import "./index.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { currency } = CryptoState();
  const { id } = useParams();

  const getCoinInfoData = async () => {
    try {
      const response = await fetch(HistoricalChart(id, days, currency));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const fetchedData = await response.json();
        setHistoricalData(fetchedData.prices);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to Fetch:-", error);
    }
  };

  useEffect(() => {
    getCoinInfoData();
    // eslint-disable-next-line
  }, [days, currency]);

  const renderCoinChart = () => (
    <>
      <Line
        data={{
          labels: historicalData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicalData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className="buttons-container">
        {chartDays.map((day) => {
          const selectedButton = day.value === days ? "highlight btn" : "btn";
          return (
            <button
              className={selectedButton}
              selected={day.value === days}
              key={day.value}
              onClick={() => {
                setDays(day.value);
              }}
            >
              {day.label}
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="coin-chart-container">
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        renderCoinChart()
      )}
    </div>
  );
};

export default CoinChart;
