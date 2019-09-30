import $axios from './http';
import URL_ADDRESS from '../constants/urlAddress';

export const unitUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['UNIT_URL'], data);
};

export const statisticsUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['STATISTICS_URL'], data);
};

export const mapListUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['MAPLIST_URL'], data);
};

export const orderWaybillListUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['ORDER_WAYBILL_LIST_URL'], data);
};

export const cityClientUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['CITY_CLIENT_URL'], data);
};

export const provinceCodeUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['PROVINCE_CODE_URL'], data);
};

export const districtClientUrl = (data = {}) => {
	return $axios.post(URL_ADDRESS['DISTRICT_CLIENT_URL'], data);
};
