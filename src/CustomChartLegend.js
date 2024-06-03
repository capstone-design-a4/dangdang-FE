import React from 'react';
import styled from 'styled-components';

const legends = [
  { key: 'sugar', label: '당', color: '#ffbb00' },
  { key: 'caffeine', label: '카페인', color: '#00bbff' },
  { key: 'calorie', label: '칼로리', color: '#ff0000' },
];

const CustomChartLegend = ({ disable, setDisable }) => {
  const handleClick = (key) => {
    setDisable((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <LegendContainer>
      {legends.map((legend) => (
        <LegendItem key={legend.key} onClick={() => handleClick(legend.key)}>
          <ColorBox color={legend.color} disabled={disable.includes(legend.key)} />
          <Label disabled={disable.includes(legend.key)}>{legend.label}</Label>
        </LegendItem>
      ))}
    </LegendContainer>
  );
};

export default CustomChartLegend;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const ColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.disabled ? '#ddd' : props.color)};
  margin-right: 5px;
`;

const Label = styled.span`
  color: ${(props) => (props.disabled ? '#ddd' : '#000')};
`;
