import React, { useState, useEffect } from 'react';
import { Layout, Select } from 'antd';
import TableCase from '../controller/tableCase';
import loader from '../../image/loader.gif'
import Chart from '../controller/chart';
import { withNamespaces } from 'react-i18next';
import GeoChart from '../controller/geoChart';
import TableVnCase from '../controller/tableVnCase';

const Content = ({ t }) => {
  const { Content } = Layout;
  const { Option } = Select;
  const [dataSummary, setDataSummary] = useState(null);
  const [dataCountry, setDataCountry] = useState(null)
  const [countries, setCountries] = useState(null);
  const [dataVietNam, setDataVietNam] = useState(null);
  const [dataTableVN, setDataTableVN] = useState(null)

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(data => {
        setDataSummary({ data }.data)
        setDataVietNam({ data }.data.Countries.find(element => element.CountryCode === 'VN'))
      });
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then(data => {
        setCountries({ data }.data)
      });
    fetch('https://alerthumg.tech/covid')
      .then(res => res.json())
      .then(data => {
        setDataTableVN({ data }.data)
      });
  }, []);

  const onChange = (value) => {
    setDataCountry(dataSummary.Countries.find(element => element.Slug === value));
  }

  return (
    <Content className="site-layout" style={{ margin: '64px 0 100px 0' }}>
      {(!dataSummary || !countries || !dataTableVN)
        ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={loader} alt="loading" />
        </div>
        : <div className="site-layout-background" style={{ padding: '15px', minHeight: '480' }}>
          <h1>{t('Global COVID-19 Cases, Deaths and Recovered')}</h1>
          <TableCase dataGlobal={dataSummary.Global} dateUpdated={dataSummary.Date} />
          <GeoChart dataSummary={dataSummary} />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '10px' }}>
            <Select showSearch defaultValue="vietnam" onChange={onChange} style={{ width: 250, marginRight: '20px' }} placeholder="Select a country" optionFilterProp="children">
              {countries.map(country => <Option key={country.Slug} value={country.Slug}>{country.Country}</Option>)}
            </Select>
            <div><span>{t('COVID-19 Cases, Deaths and Recovered')}</span></div>
          </div>
          {(dataCountry)
            ? <>
              <TableCase dataGlobal={dataCountry} dateUpdated={dataCountry.Date} />
              <Chart slug={dataCountry.Slug} />
            </>
            : (dataVietNam && typeof dataCountry !== 'undefined')
              ? <>
                <TableCase dataGlobal={dataVietNam} dateUpdated={dataVietNam.Date} />
                <Chart slug={dataVietNam.Slug} />
              </>
              : <p style={{ textAlign: 'center', fontSize: '20px', color: ' #007c91' }}>{t('Data not found')}</p>
          }
          <div style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>THÔNG TIN CHI TIẾT TÌNH HÌNH DỊCH BỆNH TẠI VIỆT NAM</h1>
            </div>
            <div style={{ marginTop: '20px' }}>
              <TableVnCase dataSource={dataTableVN.dataTableCase} dataDevelopCase={dataTableVN.dataDevelopCase} />
            </div>
          </div>
        </div>
      }
    </Content>
  )
}

export default withNamespaces()(Content);