import BgImg from '../../assets/images/bg_img.png';
import React, { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components/macro';
import TitleImg from '../../assets/images/title_img.png';
import { Frame } from '../../components';
import './style.scss';
import Map from '../../components/Map';
import { unitUrl } from '../../utils/request';
import NumCard from '../../components/NumCard';
import CardLayout from '../../components/CardLayout';

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
const NumSide = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Waybill = styled.div`
  width: 900px;
  height: 130px;
`;
const Statistics = styled.div`
  width: 320px;
  height: 570px;
  border: 1px solid #ffffff;
  margin-top: 50px;
`;

const MapDiv = styled.div`
  width: 880px;
  height: 620px;
  border: 1px solid #ffffff;
`;

const Dashboard: FC = props => {
  const getUnitData = useCallback<any>(async () => {
    try {
      // const result = await unitUrl();
      const result = await unitUrl();
      console.log(result);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getUnitData();
  }, []);

  return (
    <Container>
      <Head>佳斌物流监控系统</Head>
      <Body>
        <Frame width={1300} height={800} className="dashboard-data-graphics">
          <Waybill>
            <CardLayout title="运单数量" titleClassName="item-title-style">
              <NumCard content={146862179}></NumCard>
            </CardLayout>
          </Waybill>
          <NumSide>
            <Statistics></Statistics>
            <MapDiv>
              <Map></Map>
            </MapDiv>
          </NumSide>
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
