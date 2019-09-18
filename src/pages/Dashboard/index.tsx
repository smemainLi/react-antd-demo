import BgImg from '../../assets/images/bg_img.png';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import TitleImg from '../../assets/images/title_img.png';
import { Frame } from '../../components';
import './style.scss';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BgImg}) no-repeat center center;
  position: fixed;
`;

const Head = styled.div`
  width: 100%;
  height: 74px;
  color: #ffffff;
  font-size: 32px;
  text-align: center;
  line-height: 74px;
  background: url(${TitleImg}) no-repeat center center;
  background-size: cover;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 20px;
  margin-top: 12px;
`;
const Side = styled.div`
  display: flex;
  flex-direction: column;
`;
const NumSide = styled.div``;
const Waybill = styled.div`
  width: 320px;
  height: 130px;
  border: 1px solid #ffffff;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;
const Statistics = styled.div`
  width: 320px;
  height: 550px;
  border: 1px solid #ffffff;
  margin-top: 50px;
`;

const MapDiv = styled.div`
  width: 880px;
  height: 730px;
  border: 1px solid #ffffff;
`;

const Dashboard: FC = props => {
  return (
    <Container>
      <Head>佳斌物流监控系统</Head>
      <Body>
        <Frame width={1300} height={800} className="dashboard-data-graphics">
          <NumSide>
            <Waybill></Waybill>
            <Statistics></Statistics>
          </NumSide>
          <MapDiv></MapDiv>
        </Frame>
        <Side>
          <Frame width={500} height={280}></Frame>
          <Frame width={500} height={480} className="dashboard-list-style"></Frame>
        </Side>
      </Body>
    </Container>
  );
};

export default Dashboard;
