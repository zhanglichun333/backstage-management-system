import { Card, Col, Icon, Row, Table } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';
import moment from 'moment';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';

const columns = [
  {
    title: <FormattedMessage id="dashboardandanalysis.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandanalysis.table.search-keyword"
        defaultMessage="Search keyword"
      />
    ),
    dataIndex: 'keyword',
    key: 'keyword',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.users" defaultMessage="Users" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandanalysis.table.weekly-range"
        defaultMessage="Weekly Range"
      />
    ),
    dataIndex: 'range',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const data = [];
for (let i = 0; i < 5; i++) {
  let beforeTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * (5 - i - 1));
  console.log(beforeTime);
  data.push({
    date: moment(beforeTime).format('YYYY/MM/DD'),
    value: Math.floor(Math.random() * 111) + 10,
  });
}
console.log(data);
const cols = {
  value: {
    alias: '时间',
    min: 0,
  },
  date: {
    alias: '日期',
    range: [0, 1],
    formatter: val => {
      console.log(val);
    },
  },
};

const TopSearch = ({ loading, visitData2, searchData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title="平均维修时长"
    style={{
      height: '100%',
    }}
  >
    <Chart height={400} data={data} scale={cols} padding={['auto', 30, 'auto', 'auto']} forceFit>
      <Axis name="date" />
      <Axis
        name="value"
        label={{
          formatter: val => `${val}分`,
        }}
      />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom type="line" position="date*value" size={2} />
      <Geom
        type="point"
        position="date*value"
        size={4}
        shape={'circle'}
        style={{
          stroke: '#fff',
          lineWidth: 1,
        }}
      />
    </Chart>
  </Card>
);

export default TopSearch;
