import { Data } from './type/Default';
import { writeJson } from './Write';
export class Save {
  constructor({
    data,
    name
  }: Data) {
    if(typeof data == 'undefined'){
      throw new TypeError();
    }
    writeJson(data, `/latest/`, `${name}`);
    Object.entries(data).forEach(([k, v]: any) => {
      if (Object.values(v).length > 1) {
        writeJson(v, `/${name}`);
      } else {
        const _k = k;
        const _dataTime = v.dataTime;
        Object.entries(v).forEach(([k,v])=>{
          writeJson(v, `/latest/${name}/${_k}`, k);
          if(typeof v != 'string'){
            writeJson(v, `/${name}/${_k}/${k}`, _dataTime);
            writeJson(v, `/${name}/${_k}/${k}`);
          }
        });
      
      }
      writeJson(v, `/latest/${name}/`, k);
      writeJson(v, `/${name}`, k);
      writeJson(v, `/${name}/${k}`);
      writeJson(v, `/${name}/${k}`, v.dataTime);
    });
  }
}

