// pages/index.js
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import styles from '../styles/styles.css';


const ADAFRUIT_IO_KEY = process.env.ADAFRUIT_IO_KEY;
const ADAFRUIT_IO_USERNAME = process.env.ADAFRUIT_IO_USERNAME;

const PAULURL = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/paul-temperature/data`;
const LUISURL = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/luis-temperature/data`;
const headers = {
    "X-AIO-Key": ADAFRUIT_IO_KEY
};

const Index = () => {
  const [paulData, setPaulData] = useState(null);
  const [luisData, setLuisData] = useState(null);
  let chart;

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const paulResponse = await fetch(PAULURL, { headers });
      const luisResponse = await fetch(LUISURL, { headers });

      if (paulResponse.ok && luisResponse.ok) {
        const paulData = await paulResponse.json();
        const luisData = await luisResponse.json();

        setPaulData(paulData);
        setLuisData(luisData);
        updateChart(paulData, luisData);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const updateChart = (paulData, luisData) => {
    const ctx = document.getElementById('chart').getContext('2d');

    if (!chart) {
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: paulData.map(entry => entry.created_at),
          datasets: [
            {
              label: 'Paul_Temperature',
              data: paulData.map(entry => parseFloat(entry.value)),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15
            },
            {
              label: 'Luis_Temperature',
              data: luisData.map(entry => parseFloat(entry.value)),
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15
            }
          ]
        }
      });
    } else {
      chart.data.labels = paulData.map(entry => entry.created_at);
      chart.data.datasets[0].data = paulData.map(entry => parseFloat(entry.value));
      chart.data.datasets[1].data = luisData.map(entry => parseFloat(entry.value));
      chart.update();
    }
  };

  return (
    <div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" strategy="beforeInteractive" />

      <h1>CHECK UR TEMPERATURE HERE</h1>
      <button onClick={fetchData} id="fetchButton">Fetch Data</button>
      <div id="liveData">
        {paulData && (
          <p>
            ID: {paulData[0].id} <br />
            Temperature: {paulData[0].value} <br />
            Feed ID: {paulData[0].feed_id} <br />
            Feed Key: {paulData[0].feed_key} <br />
            Created At: {paulData[0].created_at}
          </p>
        )}
      </div>
      <canvas id="chart" height="50"></canvas>
      <img
        id="topRightImage"
        src="https://i.kym-cdn.com/photos/images/newsfeed/002/486/154/c06.gif"
        alt="Description of the image"
      />
    </div>
  );
};

export default Index;

