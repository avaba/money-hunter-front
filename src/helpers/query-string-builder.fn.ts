import {queryParamsBuilder} from "@/helpers/query-params-builder.fn";

export const queryStringBuilder = (url: string, params: Record<string, any>) => {
  const paramsToDelete = [];
  const _params = {...params};
  let _url = url;


  for (const key in params) {
    if (_url.includes(`{${key}}`)) {
      _url = _url.replace(`{${key}}`, params[key]);

      paramsToDelete.push(key);
    }
  }

  for (const key of paramsToDelete) {
    delete _params[key];
  }

  return `${_url}?${queryParamsBuilder(_params)}`;
};