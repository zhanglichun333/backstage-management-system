<<<<<<< HEAD
import React from 'react'
import { Card, Progress, Button } from 'antd'
import style from './index.less'
import router from 'umi/router'

export default function Cards(props) {
  const { title, extra, width } = props
  const cardsData = [
    {
      color: '#B3E0FD',
      name: '每日检查工单',
      total: 200,
      finished: 102,
      unfinished: 98
    },
    {
      color: '#CBE7A1',
      name: '每月保养记录',
      total: 116,
      finished: 92,
      unfinished: 24
    },
    {
      color: '#B9EBF7',
      name: '每日维修工单',
      total: 6,
      finished: 4,
      unfinished: 2,
    },
    {
      color: '#FFCDCA',
      name: '每日外派工单',
      total: 3,
      finished: 2,
      unfinished: 1,
    },
  ]
  const hoproute = (index) => {
    if (index === 0) {
      router.push('/pointCheck/pointCheckOrder')
    } else if (index === 1) {
      router.push('/upKeep/upKeepOrder')
    } else if (index === 2) {
      router.push('/maintain')
    } else if (index === 3) {
      router.push('/maintain')
    }
  }
  return (
    <Card title={title} extra={extra ? <Button style={{ backgroundColor: '#E6F7FF' }} onClick={() => { props.exportDaily(cardsData) }}>{extra}</Button> : null}>
        {
          cardsData.map((item, i) => (
            <Card.Grid className={style.gridStyle}  key={i} style={{ backgroundColor: item.color, width: width}} onClick={() => hoproute(i)}>
              <div className={style.header}>{item.name}</div>
              <div className={style.section}>供{item.total}份</div>
              <Progress percent={(item.finished / item.total).toFixed(2) * 100} status="active" strokeColor="white" />
              <div className={style.footer}>共完成{item.unfinished}份</div>
            </Card.Grid>
          ))
        }
      </Card>
    )
}
    
=======
import React from 'react';
import { Card, Progress, Button } from 'antd';
import style from './index.less';
import router from 'umi/router';

export default function Cards(props) {
  const { title, extra, width } = props;
  const cardsData = [
    {
      color: '#B3E0FD',
      name: '每日检查工单',
      total: 200,
      finished: 102,
      unfinished: 98,
    },
    {
      color: '#CBE7A1',
      name: '每月保养记录',
      total: 116,
      finished: 92,
      unfinished: 24,
    },
    {
      color: '#B9EBF7',
      name: '每日维修工单',
      total: 6,
      finished: 4,
      unfinished: 2,
    },
    {
      color: '#FFCDCA',
      name: '每日外派工单',
      total: 3,
      finished: 2,
      unfinished: 1,
    },
  ];
  const hoproute = index => {
    if (index === 0) {
      router.push('/pointCheck/pointCheckOrder');
    } else if (index === 1) {
      router.push('/upKeep/upKeepOrder');
    } else if (index === 2) {
      router.push('/maintain');
    } else if (index === 3) {
      router.push('/maintain');
    }
  };
  return (
    <Card
      title={title}
      extra={
        extra ? (
          <Button
            style={{ backgroudColor: '#E6F7FF' }}
            onClick={() => {
              props.exportDaily(cardsData);
            }}
          >
            {extra}
          </Button>
        ) : null
      }
      style={{ marginBottom: 20 }}
    >
      {cardsData.map((item, i) => (
        <Card.Grid
          className={style.gridStyle}
          key={i}
          style={{ backgroundColor: item.color, width: width }}
          onClick={() => hoproute(i)}
        >
          <div className={style.header}>{item.name}</div>
          <div className={style.section}>供{item.total}份</div>
          <Progress
            percent={(item.finished / item.total).toFixed(2) * 100}
            status="active"
            strokeColor="white"
          />
          <div className={style.footer}>共完成{item.unfinished}份</div>
        </Card.Grid>
      ))}
    </Card>
  );
}
>>>>>>> 最终提交
