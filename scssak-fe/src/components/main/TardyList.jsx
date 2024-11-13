import * as d3 from 'd3';
import cloud from 'd3-cloud';
import {useEffect} from 'react';

const width = 400;
const height = 200;

export default function TardyList({data}) {
  useEffect(() => {
    const layout = cloud()
      .size([width, height])
      .words(
        data.map(function (d) {
          return {text: d, size: 1};
        }),
      )
      .font('Impact')
      .fontSize(function (d) {
        return Math.min(60, Math.max(20, (100 / data.length) * 2));
      })
      .rotate(0)
      .on('end', end);

    layout.start();

    function end(words) {
      d3.select('#word-cloud')
        .append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' +
            layout.size()[0] / 2 +
            ',' +
            layout.size()[1] / 2 +
            ')',
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px';
        })
        .style('font-family', 'Impact')
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')';
        })
        .text(function (d) {
          return d.text;
        });
    }
  });

  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>오늘의 지각자</p>
      </div>

      <div id="word-cloud"></div>
    </div>
  );
}
