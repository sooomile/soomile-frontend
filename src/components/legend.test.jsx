import React from 'react';
import styles from '../styles/legend.module.scss';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

const Legend = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.highlight}>초미세먼지</span> 범례
        </h3>
        <button className={styles.button}>
          <span>각 측정소별 월 미세먼지 평균보기</span>
          <ArrowIcon className={styles.arrowIcon} />
        </button>
      </div>
      <div className={styles.legend}>
        <div className={styles.labels}>
          <span>점검중</span>
          <span>좋음</span>
          <span>보통</span>
          <span>나쁨</span>
          <span>매우나쁨</span>
        </div>
        <div className={styles.colors}>
          <div className={styles.checking}></div>
          <div className={styles.good}></div>
          <div className={styles.moderate}></div>
          <div className={styles.bad}></div>
          <div className={styles.veryBad}></div>
        </div>
        <div className={styles.ranges}>
          <span></span>
          <span>0-30</span>
          <span>31-80</span>
          <span>81-150</span>
          <span>150초과</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
