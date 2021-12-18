import { Data } from './type/Default';
import { writeRecurive } from './util/WriteRecurive';
export class Save {
  constructor({
    data,
    name
  }: Data) {
    if (typeof data == 'undefined') {
      throw new TypeError();
    }
    writeRecurive({
      data,
      path: {
        path: `./${name}`,
        file: {
          name,
          ext: 'json'
        }
      }
    });

    writeRecurive({
      data,
      path: {
        path: `./latest/${name}`,
        file: {
          name,
          ext: 'json'
        }
      }
    });
  }
}

