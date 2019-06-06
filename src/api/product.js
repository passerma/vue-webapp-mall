import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {jsonpOptions, TIMEOUT} from './config';

export const getProductText = keyword => {
    const url = `https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?api=mtop.taobao.detail.getdetail&ttid=2017%40taobao_h5_9.9.0&data=%7B%22itemNumId%22%3A%22${keyword}%22%7D`;
    return jsonp(url, jsonpOptions).then(res => {
        if (res) {
            return res.data
        }
        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    }).then(res => {
        return new Promise(resolve => {
            resolve(res);
        });
    });
};

export const getProductPrice = keyword => {
    const url = `https://detail.ju.taobao.com/detail/json/mobile_dynamic.do?item_id=${keyword}`;
    return jsonp(url, jsonpOptions).then(res => {
        if (res) {
            return res.item;
        }
        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    }).then(res => {
        return new Promise(resolve => {
            resolve(res);
        });
    });
};
