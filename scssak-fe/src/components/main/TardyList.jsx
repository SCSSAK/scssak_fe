import * as d3 from 'd3';
import cloud from 'd3-cloud';
import {useEffect} from 'react';

import {iconSiren} from '../../assets/images';

import styles from '../../styles/components/main/TardyList.module.css';

export default function TardyList({data}) {
  const width = 380;
  const height = 300;

  // 단어 개수에 따른 기본 폰트 크기 계산
  const fontSize = wordCount => {
    if (wordCount === 1) return 80;
    if (wordCount <= 2) return 60;
    if (wordCount <= 4) return 50;
    if (wordCount <= 6) return 40;
    if (wordCount <= 8) return 30;
    if (wordCount <= 10) return 25;
    return 20;
  };

  useEffect(() => {
    if (data === null || data.length === 0) {
      return;
    }

    // 기존 svg 삭제
    d3.select('#word-cloud svg').remove();

    const svg = d3
      .select('#word-cloud')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const layout = cloud()
      .size([width, height])
      .words(
        data.map(function (d) {
          return {text: d, size: 1};
        }),
      )
      .fontSize(function () {
        return fontSize(data.length);
      })
      .rotate(0)
      .spiral('rectangular')
      .on('end', end)
      .start();

    function end(words) {
      svg
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px';
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return `translate(${d.x}, ${d.y})rotate(${d.rotate})`;
        })
        .text(function (d) {
          return d.text;
        });
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <img className={styles.imgSiren} src={iconSiren} alt="" />
        <span className={styles.textTitle}>오늘의 지각자</span>
      </div>

      <div className={styles.containerTardyList} id="word-cloud"></div>
    </div>
  );
}
