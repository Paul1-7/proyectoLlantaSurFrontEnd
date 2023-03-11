import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import BaseOptionChart from './BaseOptionChart';

export default function ChartBar({ rows = [], columns = [] }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: columns,
    },
  });

  ChartBar.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
  };

  return <ReactApexChart type="bar" series={rows} options={chartOptions} height={320} />;
}
