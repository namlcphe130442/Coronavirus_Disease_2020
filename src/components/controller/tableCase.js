import React from "react";
import { Row, Col } from "antd";
import "./tableCase.css";
import { withNamespaces } from "react-i18next";

const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = 1 + date.getMonth();
  const day = date.getDate().toString();
  return day + "/" + month + "/" + year;
};

const TableCase = ({ dataGlobal, dateUpdated, t }) => {
  return (
    <div className="number-card-container">
      <Row>
        <Col className="gutter-row" xs={24} lg={8}>
          <div className="number-card-three-tier">
            <h4>{t("TOTAL CASES")}</h4>
            <h2>{formatNumber(dataGlobal.TotalConfirmed)}</h2>
            <span>+{formatNumber(dataGlobal.NewConfirmed)} {t('New Cases')}</span>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} lg={8}>
          <div className="number-card-three-tier">
            <h4>{t("TOTAL DEATHS")}</h4>
            <h2>{formatNumber(dataGlobal.TotalDeaths)}</h2>
            <span>+{formatNumber(dataGlobal.NewDeaths)} {t('New Deaths')}</span>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} lg={8}>
          <div className="number-card-three-tier">
            <h4>{t("TOTAL RECOVERED")}</h4>
            <h2>{formatNumber(dataGlobal.TotalRecovered)}</h2>
            <span>+{formatNumber(dataGlobal.NewRecovered)} {t('New Recovered')}</span>
          </div>
        </Col>
      </Row>
      <span>{t('Updated')}: {getFormattedDate(new Date(dateUpdated))}</span>
    </div>
  );
};

export default withNamespaces()(TableCase);
