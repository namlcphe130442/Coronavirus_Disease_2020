import React from 'react';
import { Chart } from "react-google-charts";
import './geoChart.css'
import { withNamespaces } from 'react-i18next';

const GeoChart = ({ dataSummary, t }) => {
  const load = () => {
    if (dataSummary !== null) {
      const arrayData = [["CountryCode", "Country", t('TotalConfirmed'), t('TotalDeaths')]];
      dataSummary.Countries.forEach(element => {
        const dataElement = [];
        dataElement.push(element.CountryCode);
        dataElement.push(element.Country);
        dataElement.push(element.TotalConfirmed);
        dataElement.push(element.TotalDeaths);
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

export default withNamespaces()(GeoChart);
