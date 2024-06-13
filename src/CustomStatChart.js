import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from 'recharts';
import CustomChartLegend from './CustomChartLegend';
import CustomChartTooltip from './CustomChartTooltip';

const API_BASE_URL = 'http://localhost:8080/api/record/customStat';

const fetchData = async (startDate, endDate) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

const parseChartData = (data, startDate, endDate) => {
  if (!data.customStat || !data.customStat.dayStatList) return [];

  const start = moment(startDate);

  return data.customStat.dayStatList.map((item, index) => {
    const date = start.clone().add(index, 'days').format('YYYY-MM-DD');
    return {
      date: date,
      sugar: item.sugarIntake,
      caffeine: item.caffeineIntake,
      calorie: item.calorieIntake,
    };
  });
};

const CustomStatChart = ({ startDate, endDate, dateRange }) => {
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState([]);

  useEffect(() => {
    const initializeData = async (startDate, endDate) => {
      const fetchedData = await fetchData(startDate, endDate);
      const chartData = parseChartData(fetchedData, startDate, endDate);
      setData(chartData);
    };

    if (dateRange) {
      const endDate = moment().format('YYYY-MM-DD');
      const startDate = dateRange === '999'
        ? '1970-01-01'
        : moment().subtract(dateRange, 'days').format('YYYY-MM-DD');
      initializeData(startDate, endDate);
    } else if (startDate && endDate) {
      initializeData(startDate, endDate);
    }
  }, [startDate, endDate, dateRange]);

  const tickFormatX = (tickItem) => moment(tickItem).format('M/D');

  const tickFormatY = (tickItem) => tickItem.toLocaleString();

  return (
    <StyledWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            left: -25,
            right: -10,
          }}
        >
          <CartesianGrid strokeDasharray={0} vertical={false} orientation={0} />

          <XAxis
            dataKey="date"
            style={chartStyle}
            interval={data?.length >= 30 ? parseInt(`${data.length / 30}`) : 0}
            tickLine={false}
            axisLine={false}
            tickFormatter={tickFormatX}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            style={chartStyle}
            interval={0}
            tickLine={false}
            axisLine={false}
            tickFormatter={tickFormatY}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            style={chartStyle}
            interval={0}
            tickLine={false}
            axisLine={false}
            tickFormatter={tickFormatY}
          />
          <Tooltip
            content={<CustomChartTooltip />}
          />
          <Legend
            content={
              <CustomChartLegend
                disable={disable}
                setDisable={setDisable}
              />
            }
          />
          <CartesianGrid stroke="#f5f5f5" />

          {disable.includes('sugar') ? null : (
            <Bar
              yAxisId="left"
              dataKey="sugar"
              barSize={20}
              fill="#ffbb00"
            />
          )}
          {disable.includes('caffeine') ? null : (
            <Bar
              yAxisId="left"
              dataKey="caffeine"
              barSize={20}
              fill="#00bbff"
            />
          )}
          {disable.includes('calorie') ? null : (
            <Line
              yAxisId="right"
              dataKey="calorie"
              stroke="#ff0000"
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </StyledWrapper>
  );
};

export default CustomStatChart;

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const chartStyle = {
  fontSize: '12px',
  fill: '#b8b8b8',
  fontWeight: 'bold',
};
