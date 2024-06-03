import React from 'react';
import styled from 'styled-components';

const CustomChartTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <TooltipContainer>
      <Header>{data.date}</Header>
      <Item>
        <ColorBox color="#ffbb00" />
        <Label>당: </Label>
        <Value>{data.sugar} g</Value>
      </Item>
      <Item>
        <ColorBox color="#00bbff" />
        <Label>카페인: </Label>
        <Value>{data.caffeine} mg</Value>
      </Item>
      <Item>
        <ColorBox color="#ff0000" />
        <Label>칼로리: </Label>
        <Value>{data.calorie} kcal</Value>
      </Item>
    </TooltipContainer>
  );
};

export default CustomChartTooltip;

const TooltipContainer = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`;

const Label = styled.span`
  margin-right: 5px;
`;

const Value = styled.span`
  font-weight: bold;
`;