import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { Bar } from './Charts';
import styles from '../style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const rankingListData = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage(
      {
        id: 'dashboardandanalysis.analysis.test',
      },
      {
        no: i,
      },
    ),
    total: 323234,
  });
}

const SalesCard = ({ rangePickerValue, salesData, isActive, handleRangePickerChange, loading }) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding: 0,
    }}
  >
    <div className={styles.salesCard}>
      <Tabs>
        <TabPane tab="各系统出现故障比率" key="sales">
          <Row type="flex">
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar height={295} title="故障比率趋势（%）" data={salesData} />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>故障比率排名</h4>
                <ul className={styles.rankingList}>
                  {salesData.slice(0, 7).map((item, i) => (
                    <li key={i}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.x}>
                        {item.x}
                      </span>
                      <span className={styles.rankingItemValue}>{item.y}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default SalesCard;
