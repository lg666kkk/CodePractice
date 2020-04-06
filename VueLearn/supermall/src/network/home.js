import {request} from './request';
export function getDataMultidata(){
  return request({
    url:'/home/multidata'
  })
}
