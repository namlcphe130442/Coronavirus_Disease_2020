import React from 'react';
import { Chart } from "react-google-charts";
import './geoChart.css'

function GeoChart({ dataSummary }) {
  const load = () => {
    if (dataSummary !== null) {
      const arrayData = [["CountryCode", "Country", "TotalConfirmed",
        "TotalDeaths"]];
      dataSummary.Countries.forEach(element => {
        const dataElement = [];
        dataElement.push(element.CountryCode);
        dataElement.push(element.Country);
        dataElement.push(element.TotalConfirmed);
        // dataElement.push(element.NewConfirmed);
        dataElement.push(element.TotalDeaths);
        // dataElement.push(element.NewDeaths);
        // dataElement.push(element.TotalRecovered);
        // dataElement.push(element.NewRecovered);
        arrayData.push(dataElement)
      });
      return arrayData;
    }
  }

  var options = {
    colorAxis: { colors: ["#F7F7F7", '#C5C573', '#FF7907', '#F70202'] },
    backgroundColor: '#F0F2F5',
    datalessRegionColor: '#FFFFFF',
    defaultColor: '#f5f5f5',
    border:'1px'
  };

  const data = load();

  return (
    <div className='chart-container'>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            }
          }
        ]}
        chartType="GeoChart"
        width= "100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
}

export default GeoChart;
