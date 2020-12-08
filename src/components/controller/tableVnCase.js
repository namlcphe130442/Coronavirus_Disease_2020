import React from 'react';
import { Table } from 'antd';
import './tableVnCase.css';

const TableVnCase = ({ dataSource, dataDevelopCase }) => {

  const columns = [
    {
      title: 'Bệnh nhân',
      dataIndex: 'patient',
      key: 'patient',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'detectionPosition',
      key: 'detectionPosition',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Quốc tịch',
      dataIndex: 'nationality',
      key: 'nationality',
    },
  ];

  const content = (
    <>{dataDevelopCase.map((element, index) =>
      <div key={index} className="timeline-detail">
        <div className="timeline-head">
          <h3>{element.head}</h3>
        </div>
        <div className="timeline-content">
          {element.content.map((data, index) => <p key={index}>{data}</p>)}
        </div>
      </div>
    )}</>
  )

  return (
    <div>
      <div className="tableContainer">
        <Table key={1} dataSource={dataSource} columns={columns} />
      </div>
      <div className="container">
        <h4 style={{ fontSize: '1.5rem', color: 'red' }}>DIỄN BIẾN DỊCH</h4>
        {content}
      </div>
    </div>
  )
}

export default TableVnCase
