import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {jsonpOptions, TIMEOUT} from './config';

const filterHTMLTag = (msg) => {
    msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, ''); //去除行尾空格
    msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
    return msg;
};


export const getSearchHotKeyword = keyword => {
    const url = 'https://wq.jd.com/bases/searchhotword/GetHotWords?_=1559048886615&sceneval=2';
    return jsonp(url).then(res => {
        // console.log(res);
        if (res) {
            return res.owner
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


// 获取搜索结果数据--jsonp
export const getSearchResult = keyword => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  // jsonpOptions.timeout = 100;

  return jsonp(url, params, jsonpOptions).then(res => {
    let result = [];
    let data = res.result;
    if (data) {
      data.map((v) => {
        result.push(filterHTMLTag(v[0]));
      });
      // for (item in result){
      //   return filterHTMLTag(item);
      // }
      return result;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};
