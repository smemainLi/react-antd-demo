import BgImg from '../../assets/images/bg_img.png';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import TitleImg from '../../assets/images/title_img.png';
import { Frame } from '../../components';
import './style.scss';
import Map from '../../components/Map';
import { unitUrl, statisticsUrl, mapListUrl, orderWaybillListUrl } from '../../utils/request';
import NumCard from '../../components/NumCard';
import CardLayout from '../../components/CardLayout';

import carrierImg from '../../assets/images/carrier_img.png';
import driverImg from '../../assets/images/driver_img.png';
import customerImg from '../../assets/images/customer_img.png';
import vehicleImg from '../../assets/images/vehicle_img.png';
import routeImg from '../../assets/images/route_img.png';
import cityImg from '../../assets/images/city_img.png';
import tomImg from '../../assets/images/tom_img.png';
import LineData from '../../components/LineData';
import ListItem from '../../components/ListItem';
import { PROVINCE_DATA } from '../../components/Map/constants';

const onTheWayList = [
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' },
  { orderWaybillNo: 'YD2019082300028', staffName: '浙江调度', city: '杭州市', date: '杭州市' }
];

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
  width: 280px;
  height: 570px;
  margin-top: 50px;
`;

const MapDiv = styled.div`
  width: 920px;
  height: 620px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const MapTabs = styled.div`
  position: absolute;
  z-index: 8;
`;
const DataTab = styled.div`
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  margin-right: 16px;
  background-color: #0f143d;
  &.tab-active-style {
    background-color: #f99137;
  }
`;

const NumData = styled.div<{ value: string }>`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.value};
`;

const UnitIcon = styled.div`
  width: 24px;
  height: 24px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const LineDataList = styled.div`
  position: relative;
`;

const FlowHidden = styled.div`
  width: 100%;
  height: 88px;
  position: relative;
  overflow: hidden;
`;

const ScrollList = styled.div`
  width: 104%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  right: -18px;
`;

const Dashboard: FC = props => {
  const [active, setActive] = useState<number>(1);
  const [waybillNum, setWaybillNum] = useState<number>(0);
  const [unitData, setUnitData] = useState<Array<any>>([]);
  const [mapData, setMapData] = useState();
  const [provinceData, setProvinceData] = useState<Array<any>>([]);
  const [areaData, setAreaData] = useState<Array<any>>([]);
  const [rData, setRData] = useState<Array<any>>([]);
  const [areaValueData, setAreaValueData] = useState<Array<any>>([]);
  const [statisticsData, setStatisticsData] = useState();
  const [statisticsList, setStatisticsList] = useState();
  const [waybillData, setWaybillData] = useState<Array<any>>();

  const handleTab = useCallback((value: number) => {
    setActive(value);
    getMapData();
  }, []);

  const getUnitData = useCallback<any>(async () => {
    try {
      const result = await unitUrl();
      setUnitData(result.data.map);
    } catch (error) {}
  }, []);

  const getMapData = useCallback<any>(async () => {
    try {
      const result = await mapListUrl({ type: active });
      setMapData(result.data);
    } catch (error) {}
  }, []);

  const getStatisticsData = useCallback<any>(async () => {
    try {
      const result = await statisticsUrl();
      setStatisticsData(result.data.data);
    } catch (error) {}
  }, []);

  const getWaybillData = useCallback<any>(async () => {
    try {
      const result = await orderWaybillListUrl();
      setWaybillData(result.data.list);
      console.log(result);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getUnitData();
    getStatisticsData();
    getMapData();
    getWaybillData();
  }, []);

  useEffect(() => {
    if (!!statisticsData && Object.keys(statisticsData).length) {
      setWaybillNum(statisticsData.waybillNum);
      setStatisticsList([
        {
          statisticalIcon: carrierImg,
          statisticalTitle: '承运人',
          statisticalNum: `${statisticsData.carrierNum}人`,
          statisticalColor: '#F99137'
        },
        {
          statisticalIcon: driverImg,
          statisticalTitle: '司机',
          statisticalNum: `${statisticsData.driverNum}人`,
          statisticalColor: '#FFC271'
        },
        {
          statisticalIcon: customerImg,
          statisticalTitle: '客户',
          statisticalNum: `${statisticsData.clientNum}家`,
          statisticalColor: '#8996E6'
        },
        {
          statisticalIcon: vehicleImg,
          statisticalTitle: '车辆',
          statisticalNum: `${statisticsData.camionNum}辆`,
          statisticalColor: '#41BC9A'
        },
        {
          statisticalIcon: routeImg,
          statisticalTitle: '常规路线',
          statisticalNum: `${statisticsData.clientRouteNum}条`,
          statisticalColor: '#0086F9'
        },
        {
          statisticalIcon: cityImg,
          statisticalTitle: '覆盖城市',
          statisticalNum: `${statisticsData.coverNum}个`,
          statisticalColor: '#2AC2E3'
        }
      ]);
    }
  }, [statisticsData]);

  useEffect(() => {
    if (!!mapData && Object.keys(mapData).length) {
      setProvinceData(mapData.provinceList);
      setAreaData(mapData.districtList);
    }
  }, [mapData]);

  useEffect(() => {
    const pData = PROVINCE_DATA;
    if (!!provinceData && provinceData.length) {
      setRData(
        pData.map(pDataItem => {
          let temp = pDataItem;
          for (let i = 0; i < provinceData.length; i++) {
            if (provinceData[i].province.indexOf(pDataItem.name) !== -1) {
              temp = { ...temp, value: provinceData[i].number };
              break;
            }
          }
          return temp;
        })
      );
    }

    if (!!areaData && areaData.length) {
      setAreaValueData(
        areaData.map(areaItem => {
          return { name: areaItem.district, value: areaItem.number, province: areaItem.province };
        })
      );
    }
  }, [provinceData]);

  // useEffect(() => {
  //   if (!!waybillData && waybillData.length) {
  //     setWaybillList(waybillData.map((waybillItem: any) => {
  // return { onTheWayNumber: waybillItem.orderWaybillNo , onTheWayUse:staffName, onTheWayAddress: city, onTheWayDate: '杭州市' }

  //     }))
  //   }
  // }, [waybillData]);

  return (
    <Container>
      <Head>佳斌物流监控系统</Head>
      <Body>
        <Frame width={1300} height={800} className="dashboard-data-graphics">
          <Waybill>
            <CardLayout
              cardLayoutClassName="dashboard-up-and-down-card-layout-style"
              title="运单数量"
              titleClassName="item-title-content-style"
            >
              <NumCard content={waybillNum}></NumCard>
            </CardLayout>
          </Waybill>
          <NumSide>
            <Statistics>
              <CardLayout
                cardLayoutClassName="dashboard-up-and-down-card-layout-style"
                title="统计数据"
                titleClassName="item-title-content-style"
              >
                {!!statisticsList &&
                  statisticsList.length &&
                  statisticsList.map((statisticsItem: any, index: number) => {
                    return (
                      <CardLayout
                        key={`statistical${index}`}
                        cardLayoutClassName="dashboard-left-and-right-card-layout-style"
                        title={
                          <>
                            <img src={statisticsItem.statisticalIcon} alt="" />
                          </>
                        }
                        titleClassName="item-title-image-style"
                      >
                        <CardLayout
                          cardLayoutClassName="dashboard-up-and-down-card-layout-style"
                          title={statisticsItem.statisticalTitle}
                          titleClassName="item-title-introduce-style"
                        >
                          <NumData value={statisticsItem.statisticalColor}>{statisticsItem.statisticalNum}</NumData>
                        </CardLayout>
                      </CardLayout>
                    );
                  })}
              </CardLayout>
            </Statistics>
            <MapDiv>
              <MapTabs>
                <DataTab className={`${active === 1 && 'tab-active-style'}`} onClick={() => handleTab(1)}>
                  客户
                </DataTab>
                <DataTab className={`${active === 2 && 'tab-active-style'}`} onClick={() => handleTab(2)}>
                  收货客户
                </DataTab>
              </MapTabs>
              <Map rData={rData} areaValueData={areaValueData}></Map>
            </MapDiv>
          </NumSide>
        </Frame>
        <Side>
          <Frame width={500} height={280} className="goods-frame-style">
            <CardLayout
              cardLayoutClassName="dashboard-up-and-down-card-layout-style"
              title="货物数量"
              titleClassName="item-title-content-style"
            >
              <UnitIcon>
                <img src={tomImg} alt="" />
              </UnitIcon>
              <LineDataList>
                {!!unitData.length && (
                  <LineData
                    lineDataClassName="tom-line-data-style"
                    valueClassName="tom-value-style"
                    value={unitData[0].number}
                    unitClassName="tom-unit-style"
                    unit={unitData[0].unit}
                  ></LineData>
                )}
                <FlowHidden>
                  <ScrollList>
                    {!!unitData.length &&
                      unitData.slice(1).map((unitItem: any, index) => {
                        return (
                          <LineData
                            key={`unit${index}`}
                            lineDataClassName="tom-line-data-style"
                            value={unitItem.number}
                            unit={unitItem.unit}
                          ></LineData>
                        );
                      })}
                  </ScrollList>
                </FlowHidden>
              </LineDataList>
            </CardLayout>
          </Frame>
          <Frame width={500} height={480} className="dashboard-list-style">
            <CardLayout
              cardLayoutClassName="dashboard-up-and-down-card-layout-style"
              title="在途运单"
              titleClassName="item-title-on-the-way-style"
            >
              {!!onTheWayList &&
                onTheWayList.length &&
                onTheWayList.map((onTheWayItem, index) => {
                  return (
                    <ListItem
                      key={`onTheWay${index}`}
                      listItemClassName={`${
                        !((index + 1) % 2)
                          ? 'list-item-display-style'
                          : index === onTheWayList.length - 1
                          ? 'item-mask-style'
                          : ''
                      }`}
                      number={`${onTheWayItem.orderWaybillNo}`}
                      use={`${onTheWayItem.staffName}`}
                      address={`${onTheWayItem.city}`}
                      date={`${onTheWayItem.date}`}
                    ></ListItem>
                  );
                })}
            </CardLayout>
          </Frame>
        </Side>
      </Body>
    </Container>
  );
};

export default Dashboard;
