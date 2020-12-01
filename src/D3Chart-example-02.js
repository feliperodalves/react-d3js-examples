import * as d3 from 'd3';

const men_url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const women_url = 'https://udemy-react-d3.firebaseio.com/tallest_women.json';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 50, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 40)
      .attr('text-anchor', 'middle');

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .text(`Height in centimeters`)
      .attr('transform', 'rotate(-90)');

    vis.xAxisGroup = vis.svg.append('g').attr('transform', `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.svg.append('g');

    Promise.all([d3.json(men_url), d3.json(women_url)]).then((datasets) => {
      const [men, women] = datasets;

      vis.menData = men;
      vis.womenData = women;

      vis.update('men');
    });
  }

  update(gender) {
    const vis = this;

    vis.data = gender === 'men' ? vis.menData : vis.womenData;
    vis.xLabel.text(`The world's tallest ${gender}`);

    const min = d3.min(vis.data, (d) => d.height) * 0.95;
    const max = d3.max(vis.data, (d) => d.height) * 1.05;

    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);
    const y = d3.scaleLinear().domain([min, max]).range([HEIGHT, 0]);

    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);

    vis.xAxisGroup.transition().duration(500).call(xAxisCall);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // INFO: Data Join - Carregar os dados
    const rects = vis.svg.selectAll('rect').data(vis.data);

    // INFO: Exit - Excluir os elementos antigos, se preciso
    rects.exit().transition().duration(500).attr('height', 0).attr('y', HEIGHT).remove();
    // INFO: Update - Atualizar os elementos antigos, se preciso
    rects
      .transition()
      .duration(500)
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.height))
      .attr('width', x.bandwidth)
      .attr('height', (d) => HEIGHT - y(d.height));

    // INFO: Enter - Adicionar novos elementos, se preciso
    rects
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name))
      .attr('width', x.bandwidth)
      .attr('fill', 'grey')
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('height', (d) => HEIGHT - y(d.height))
      .attr('y', (d) => y(d.height));
  }
}

export default D3Chart;
