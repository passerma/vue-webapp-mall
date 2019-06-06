import storage from 'assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config';

export const searchMixin = {
  methods: {
    $_search_selectItem(keyword) {
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);

      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
      }

      keywords.unshift(keyword);

      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    }
  }
};
