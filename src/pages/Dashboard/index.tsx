import { Spin } from 'antd';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import BgImg from '../../assets/images/bg_img.png';
import carrierImg from '../../assets/images/carrier_img.png';
import cityImg from '../../assets/images/city_img.png';
import customerImg from '../../assets/images/customer_img.png';
import driverImg from '../../assets/images/driver_img.png';
import routeImg from '../../assets/images/route_img.png';
import TitleImg from '../../assets/images/title_img.png';
import tomImg from '../../assets/images/tom_img.png';
import vehicleImg from '../../assets/images/vehicle_img.png';
import { Frame } from '../../components';
import CardLayout from '../../components/CardLayout';
import LineData from '../../components/LineData';
import ListItem from '../../components/ListItem';
import Map from '../../components/Map';
import { PROVINCE_DATA } from '../../components/Map/constants';
import MapPath from '../../components/MapPath';
import NumCard from '../../components/NumCard';
import NumData from '../../components/NumData';
import { cityClientUrl, orderWaybillListUrl, statisticsUrl, unitUrl } from '../../utils/request';
import './style.scss';
import { px2vw } from '../../utils/px2vw';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BgImg}) no-repeat center center;
  position: fixed;
  overflow-y: auto;
  & .ant-spin {
    top: 30% !important;

    & .ant-spin-text {
      text-shadow: none !important;
    }
  }
`;

const Head = styled.div`
  width: 100%;
  height: ${px2vw(84)};
  color: #ffffff;
  font-size: ${px2vw(32)};
  text-align: center;
  line-height: ${px2vw(84)};
  background: url(${TitleImg}) no-repeat center center;
  background-size: cover;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0 ${px2vw(20)};
  margin: ${px2vw(12)} 0 ${px2vw(60)} 0;
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
  width: ${px2vw(900)};
  height: ${px2vw(130)};
`;
const Statistics = styled.div`
  width: ${px2vw(300)};
  height: ${px2vw(625)};
  margin-top: ${px2vw(70)};
`;

const MapDiv = styled.div`
  width: ${px2vw(903)};
  height: ${px2vw(737)};
  position: relative;
  display: flex;
  justify-content: center;
`;

const MapTabs = styled.div`
  position: absolute;
  z-index: 8;
`;
const DataTab = styled.div`
  width: ${px2vw(81)};
  height: ${px2vw(30)};
  line-height: ${px2vw(30)};
  text-align: center;
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  margin-right: ${px2vw(22)};
  background-color: #0f143d;
  &.tab-active-style {
    background-color: #f99137;
  }
`;

const NumUnit = styled.div<{ value: string }>`
  font-size: ${px2vw(32)};
  font-weight: bold;
  color: ${props => props.value};
  display: flex;
`;

const UnitDiv = styled.div`
  margin-left: 4px;
`;

const UnitIcon = styled.div`
  width: ${px2vw(24)};
  height: ${px2vw(24)};
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
  height: ${px2vw(120)};
  position: relative;
  overflow: hidden;
`;

const ScrollList = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TheWayList = styled.div`
  width: 100%;
  height: ${px2vw(451)};
  overflow: hidden;
  & .list-item-dynamic-style {
    height: ${px2vw(41)};
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    font-size: ${px2vw(12)};
    font-weight: 900;
    color: #9298af;

    & .waybill-number-style {
      width: ${px2vw(160)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .waybill-use-style {
      width: ${px2vw(100)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .waybill-address-style {
      width: ${px2vw(90)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .waybill-date-style {
      width: ${px2vw(130)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const Mask = styled.div`
  width: 100%;
  height: ${px2vw(41)};
  position: absolute;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.2); */
  background: linear-gradient(rgb(5, 12, 42, 0.5), rgba(5, 12, 42, 0.7));
`;

const Dashboard: FC = () => {
  const wayTimer = useRef(0);
  const scrollTimer = useRef(0);
  const itemHeight = Number(px2vw(41).substring(0, px2vw(41).length - 2));
  const scrollHeight = Number(px2vw(65).substring(0, px2vw(65).length - 2));
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [waybillNum, setWaybillNum] = useState<{ newVal: string; lastVal: string }>({ newVal: '0', lastVal: '0' });
  const [unitData, setUnitData] = useState<{ newList: Array<any>; lastList: Array<any> }>({
    newList: [],
    lastList: []
  });
  const [mapData, setMapData] = useState();
  const [provinceData, setProvinceData] = useState<Array<any>>([]);
  const [areaData, setAreaData] = useState<Array<any>>([]);
  const [rData, setRData] = useState<Array<any>>([]);
  const [areaValueData, setAreaValueData] = useState<Array<any>>([]);
  const [statisticsList, setStatisticsList] = useState<{ newList: Array<any>; lastList: Array<any> }>({
    newList: [],
    lastList: []
  });
  const [waybillData, setWaybillData] = useState<any[]>([]);
  const waybill = useRef<Array<any>>([]);
  const dateRef = useRef<string>('');
  const row = useRef<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTab = useCallback((value: number) => {
    //activeTemp = value;
    setActive(value);
    getMapData(value);
  }, []);

  const showPath = useCallback((data: object) => {
    setActive(0);
  }, []);

  const getUnitData = useCallback<any>(async () => {
    try {
      const result = await unitUrl();
      setUnitData(obj => {
        return { newList: result.data.map, lastList: obj.newList };
      });
    } catch (error) {}
  }, []);

  const getMapData = useCallback<any>(async (value: number) => {
    try {
      setLoading(true);
      const result = await cityClientUrl({ type: value });
      setMapData(result.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const getStatisticsData = useCallback<any>(async () => {
    try {
      const result = await statisticsUrl();
      const statisticsData = result.data.data;
      setWaybillNum(obj => {
        const length = statisticsData.waybillNum.toString().length - obj.newVal.length;
        if (statisticsData.waybillNum.toString().length > obj.newVal.length) {
          for (let i = 0; i < length; i++) {
            obj.newVal = `${obj.newVal}0`;
          }
        } else if (statisticsData.waybillNum.toString().length < obj.newVal.length) {
          obj.newVal.substring(obj.newVal.length, statisticsData.waybillNum.toString().length);
        }
        return { newVal: statisticsData.waybillNum.toString(), lastVal: obj.newVal };
      });
      setStatisticsList(obj => {
        return {
          newList: [
            {
              statisticalIcon: carrierImg,
              statisticalTitle: '承运人',
              statisticalNum: `${statisticsData.carrierNum}`,
              statisticalUnit: '人',
              statisticalColor: '#F99137'
            },
            {
              statisticalIcon: driverImg,
              statisticalTitle: '司机',
              statisticalNum: `${statisticsData.driverNum}`,
              statisticalUnit: '人',
              statisticalColor: '#FFC271'
            },
            {
              statisticalIcon: customerImg,
              statisticalTitle: '客户',
              statisticalNum: `${statisticsData.clientNum}`,
              statisticalUnit: '家',
              statisticalColor: '#8996E6'
            },
            {
              statisticalIcon: vehicleImg,
              statisticalTitle: '车辆',
              statisticalNum: `${statisticsData.camionNum}`,
              statisticalUnit: '辆',
              statisticalColor: '#41BC9A'
            },
            {
              statisticalIcon: routeImg,
              statisticalTitle: '常规路线',
              statisticalNum: `${statisticsData.clientRouteNum}`,
              statisticalUnit: '条',
              statisticalColor: '#0086F9'
            },
            {
              statisticalIcon: cityImg,
              statisticalTitle: '覆盖城市',
              statisticalNum: `${statisticsData.coverNum}`,
              statisticalUnit: '个',
              statisticalColor: '#2AC2E3'
            }
          ],
          lastList: obj.newList.map(item => {
            return item.statisticalNum;
          })
        };
      });
    } catch (error) {}
  }, []);

  const getWaybillData = useCallback<any>(async () => {
    try {
      const result = await orderWaybillListUrl();
      setWaybillData(result.data.list);
      dateRef.current = result.data.list[0].date;
      row.current += result.data.list.length;
    } catch (error) {}
  }, []);

  const getNewWillbill = useCallback<any>(async (date: string) => {
    try {
      const result = await orderWaybillListUrl({ date: date });
      waybill.current = result.data.list;
      dateRef.current = result.data.list[0].date || dateRef.current;
      row.current += result.data.list.length;
    } catch (error) {}
  }, []);

  /* const getProvinceCodeData = useCallback<any>(async () => {
    try {
      const result = await provinceCodeUrl();
      setProvinceCode(result.data.list);
    } catch (error) {}
  }, []);

  const getDistrictData = useCallback<any>(async (code: number) => {
    try {
      const result = await districtClientUrl({ type: active, provinceCode: code });            
      return result.data;
    } catch (error) {}
  }, []); */

  const handleClickAction = (params: any) => {
    /* let code;
    for (let son in provinceCode) {
      if (provinceCode[son].name.indexOf(params.name) != -1) {
        code = provinceCode[son].code;
        break;
      }
    }
    getDistrictData(code).then((mapData:any) => {      
      setProvinceData(mapData.list);
      setAreaData(mapData.list);   
    }); */
  };

  useEffect(() => {
    getMapData(active);
    getUnitData();
    getStatisticsData();
    getWaybillData();

    const timer = setInterval(() => {
      getUnitData();
      getStatisticsData();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!!mapData && Object.keys(mapData).length) {
      setProvinceData(mapData.list);
      setAreaData(mapData.list);
    }
  }, [mapData]);

  useEffect(() => {
    const pData = PROVINCE_DATA;
    if (!!provinceData && provinceData.length) {
      setRData(
        pData.map(pDataItem => {
          let temp = pDataItem;
          temp.value = 0;
          for (let i = 0; i < provinceData.length; i++) {
            if (provinceData[i].province.indexOf(pDataItem.name) !== -1) {
              temp.value += provinceData[i].number;
              //break;
            }
          }
          return temp;
        })
      );
    }
    if (!!areaData && areaData.length) {
      setAreaValueData(
        areaData.map(areaItem => {
          let newName = '';
          if (areaItem.district && areaItem.district.indexOf('市辖区') !== -1) {
            newName = areaItem.district.substring(0, areaItem.district.length - 3);
          }
          return {
            name: newName,
            value: areaItem.number,
            province: areaItem.province,
            city: areaItem.city,
            location: areaItem.location
          };
        })
      );
    }
  }, [provinceData, areaData]);

  /* 在途运单滚动（待优化） */
  const startScroll = () => {
    listRef.current!.scrollTop--;
    wayTimer.current = setInterval(scrollDown, 50);
  };

  /* 在途运单滚动（待优化） */
  const scrollDown = useCallback(() => {
    if (
      listRef.current &&
      (listRef.current!.scrollTop + 1) % (listRef.current!.scrollHeight / listRef.current!.childNodes.length) === 0
    ) {
      clearInterval(wayTimer.current);
      getNewWillbill(dateRef.current);
      if (waybill.current && waybill.current.length) {
        waybill.current.map((item, index) => {
          let nodeNew = document.createElement('div');
          nodeNew.className = `list-item-dynamic-style ${!(row.current % 2) ? 'list-item-display-style' : ''}`;
          nodeNew.onclick = showPath;
          nodeNew.innerHTML = `
            <div class="waybill-number-style">${item.orderWaybillNo}</div>
            <div class="waybill-use-style">${item.staffName}</div>
            <div class="waybill-address-style">${item.city}</div>
            <div class="waybill-date-style">${item.date.substring(5)}</div>
          `;
          listRef.current!.insertBefore(nodeNew, listRef.current!.childNodes[0]);
          const nodeList = listRef.current!.childNodes;
          listRef.current!.removeChild(nodeList[nodeList.length - 1]);
          index !== waybill.current.length - 1 && row.current++; // 隔行变色
        });
        if (listRef.current!.scrollTop === 0) {
          listRef.current!.scrollTop += itemHeight * waybill.current.length;
        }
      }
      setTimeout(startScroll, 12000);
    } else {
      // listRef.current!.scrollTop--;
      listRef.current!.scrollTop =
        listRef.current!.scrollTop -
        listRef.current!.scrollHeight /
          listRef.current!.childNodes.length /
          (listRef.current!.scrollHeight / listRef.current!.childNodes.length);
    }
  }, []);

  useEffect(() => {
    if (listRef && waybillData.length) {
      listRef.current!.scrollTop = listRef.current!.scrollHeight;
      setTimeout(startScroll, 12000);
    }
  }, [waybillData]);

  /* 货物数量滚动（待优化） */
  const startMove = () => {
    scrollRef.current!.scrollTop++;
    scrollTimer.current = setInterval(scrollUp, 20);
  };

  /* 货物数量滚动（待优化） */
  const scrollUp = () => {
    if (
      (scrollRef.current!.scrollTop - 1) % (scrollRef.current!.scrollHeight / scrollRef.current!.childNodes.length) ===
      0
    ) {
      clearInterval(scrollTimer.current);
      setTimeout(startMove, 1500);
    } else {
      // scrollRef.current!.scrollTop++;
      scrollRef.current!.scrollTop =
        scrollRef.current!.scrollTop +
        scrollRef.current!.scrollHeight /
          scrollRef.current!.childNodes.length /
          (scrollRef.current!.scrollHeight / scrollRef.current!.childNodes.length);
      if (scrollRef.current!.scrollTop >= scrollRef.current!.scrollHeight / 2) {
        scrollRef.current!.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current!.scrollTop = 0;
    }
    setTimeout(startMove, 1500);
  }, []);

  return (
    <Container>
      <Spin size="large" tip="Loading..." spinning={loading}>
        <Head>佳斌物流数据中心</Head>
        <Body>
          <Frame width={1316} height={909} className="dashboard-data-graphics">
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
                  {!!statisticsList.newList.length &&
                    statisticsList.newList.map((statisticsItem: any, index: number) => {
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
                            <NumUnit value={statisticsItem.statisticalColor}>
                              <NumData
                                id={`statistics-item-id${index}`}
                                value={statisticsItem.statisticalNum}
                                lastValue={statisticsList.lastList.length && statisticsList.lastList[index]}
                              ></NumData>
                              <UnitDiv>{statisticsItem.statisticalUnit}</UnitDiv>
                            </NumUnit>
                          </CardLayout>
                        </CardLayout>
                      );
                    })}
                </CardLayout>
              </Statistics>
              <MapDiv>
                <MapTabs>
                  <DataTab
                    className={`${active === 1 && 'tab-active-style'}`}
                    onClick={() => {
                      handleTab(1);
                    }}
                  >
                    客户
                  </DataTab>
                  <DataTab
                    className={`${active === 2 && 'tab-active-style'}`}
                    onClick={() => {
                      handleTab(2);
                    }}
                  >
                    收货客户
                  </DataTab>
                </MapTabs>
                {active === 0 ? (
                  <MapPath></MapPath>
                ) : (
                  <Map rData={rData} areaValueData={areaValueData} active={active}></Map>
                )}
              </MapDiv>
            </NumSide>
          </Frame>
          <Side>
            <Frame width={484} height={326} className="goods-frame-style">
              <CardLayout
                cardLayoutClassName="dashboard-up-and-down-card-layout-style"
                title="货物数量"
                titleClassName="item-title-content-style"
              >
                <UnitIcon>
                  <img src={tomImg} alt="" />
                </UnitIcon>
                <LineDataList>
                  {!!unitData.newList.length && (
                    <LineData
                      index={`unit0`}
                      lineDataClassName="tom-line-data-style"
                      valueClassName="tom-value-style"
                      value={unitData.newList[0].number}
                      lastValue={unitData.lastList.length && unitData.lastList[0].number}
                      unitClassName="tom-unit-style"
                      unit={unitData.newList[0].unit}
                    ></LineData>
                  )}
                  <FlowHidden>
                    <ScrollList ref={scrollRef}>
                      {!!unitData.newList.length &&
                        unitData.newList.slice(1).map((unitItem: any, index) => {
                          return (
                            <LineData
                              key={`unit${index}`}
                              index={`unit${index + 1}`}
                              lineDataClassName=""
                              valueClassName=""
                              value={unitItem.number}
                              lastValue={unitData.lastList.length && unitData.lastList[index + 1].number}
                              unit={unitItem.unit}
                            ></LineData>
                          );
                        })}
                      {!!unitData.newList.length &&
                        unitData.newList.slice(1).map((unitItem: any, index) => {
                          return (
                            <LineData
                              key={`unit${index + unitData.newList.length}`}
                              index={`unit${index + 1 + unitData.newList.length}`}
                              lineDataClassName=""
                              valueClassName=""
                              value={unitItem.number}
                              lastValue={unitData.lastList.length && unitData.lastList[index + 1].number}
                              unit={unitItem.unit}
                            ></LineData>
                          );
                        })}
                    </ScrollList>
                  </FlowHidden>
                </LineDataList>
              </CardLayout>
            </Frame>
            <Frame width={484} height={543} className="dashboard-list-style">
              <CardLayout
                cardLayoutClassName="dashboard-up-and-down-card-layout-style"
                title="在途运单"
                titleClassName="item-title-on-the-way-style"
              >
                <TheWayList ref={listRef}>
                  {!!waybillData.length &&
                    waybillData.map((onTheWayItem, index) => {
                      return (
                        <ListItem
                          key={`onTheWay${index}`}
                          listItemClassName={`${!(index % 2) ? 'list-item-display-style' : ''}`}
                          number={`${onTheWayItem.orderWaybillNo}`}
                          use={`${onTheWayItem.staffName}`}
                          address={`${onTheWayItem.city}`}
                          date={`${onTheWayItem.date.substring(5)}`}
                          handleClick={() => {
                            showPath(onTheWayItem);
                          }}
                        ></ListItem>
                      );
                    })}
                </TheWayList>
                <Mask></Mask>
              </CardLayout>
            </Frame>
          </Side>
        </Body>
      </Spin>
    </Container>
  );
};

export default Dashboard;
export const AppContext = React.createContext({});
