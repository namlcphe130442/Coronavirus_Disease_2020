import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Tabs } from "antd";
import { withNamespaces } from "react-i18next";

import "./chart.css";

const getFormattedDate = (date) => {
  const month = 1 + date.getMonth();
  const day = date.getDate().toString();
  return day + "/" + month;
};

const Chart = ({ slug, t }) => {
  const [dataAllDay, setAllDataDay] = useState([]);
  const { TabPane } = Tabs;
  useEffect(() => {
    const fetchBusinesses = () => {
      fetch(`https://api.covid19api.com/total/dayone/country/${slug}`)
        .then((response) => response.json())
        .then((data) => {
          setAllDataDay({ data }.data);
        });
    };
    fetchBusinesses();
  }, [slug]);

  const getData = () => {
    const date = [];
    const cases = [];
    const deaths = [];
    const recovered = [];
    let oldCases = 0;
    let oldDeaths = 0;
    let oldRecovered = 0;
    let i;
    for (i = dataAllDay.length - 7; i < dataAllDay.length; i++) {
      if (i === dataAllDay.length - 7) {
        const oldDataDay = dataAllDay[i - 1];
        oldCases = oldDataDay.Confirmed;
        oldDeaths = oldDataDay.Deaths;
        oldRecovered = oldDataDay.Recovered;
      }
      const dataDay = dataAllDay[i];
      date.push(getFormattedDate(new Date(dataDay.Date)));
      deaths.push(dataDay.Deaths - oldDeaths);
      cases.push(dataDay.Confirmed - oldCases);
      recovered.push(dataDay.Recovered - oldRecovered);
      oldCases = dataDay.Confirmed;
      oldDeaths = dataDay.Deaths;
      oldRecovered = dataDay.Recovered;
    }
    return { date, cases, deaths, recovered };
  };

  const LineChart = (labels, data, color) => {
    return (
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              borderColor: color,
              data: data,
              fill: false,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
          },
        }}
      />
    );
  };

  const chartCases = () => {
    return LineChart(getData().date, getData().cases, "#CC0000");
  };

  const chartDeaths = () => {
    return LineChart(getData().date, getData().deaths, "#333300");
  };

  const chartRecovery = () => {
    return LineChart(getData().date, getData().recovered, "#00CC33");
  };

  const charts = () => (
    <>
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        size={"large"}
        centered
        style={{ margin: "50px auto 0 auto", maxWidth: "500px", height: "50%" }}
      >
        <TabPane
          tab={
            <p style={{ fontSize: "70%", color: "#CC0000" }}>{t('NUMBER OF CASES')}</p>
          }
          key="1"
        >
          {chartCases()}
        </TabPane>
        <TabPane
          tab={
            <p style={{ fontSize: "70%", color: "#333300" }}>
              {t('NUMBER OF DEATHS')}
            </p>
          }
          key="3"
        >
          {chartDeaths()}
        </TabPane>
        <TabPane
          tab={
            <p style={{ fontSize: "70%", color: "#00CC33" }}>
              {t('NUMBER OF RECOVERY CASES')}
            </p>
          }
          key="2"
        >
          {chartRecovery()}
        </TabPane>
      </Tabs>
      <div className="tabs2" style={{ marginTop: "50px", textAlign: "center" }}>
        <div>
          {chartCases()}
          <h5 style={{ color: "#CC0000" }}>{t('NUMBER OF CASES')}</h5>
        </div>
        <div>
          {chartDeaths()}
          <h5 style={{ color: "#333300" }}>{t('NUMBER OF DEATHS')}</h5>
        </div>
        <div>
          {chartRecovery()}
          <h5 style={{ color: "#00CC33" }}>{t('NUMBER OF RECOVERY CASES')}</h5>
        </div>
      </div>
    </>
  );

  return <>{dataAllDay.length > 0 && charts()}</>;
};

export default withNamespaces()(Chart);
