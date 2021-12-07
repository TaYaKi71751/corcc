import { Data } from './type/Default';
import { writeFile } from './util/Write';
export class Save {
  constructor({
    data,
    name
  }: Data) {
    if (typeof data == 'undefined') {
      throw new TypeError();
    }
    writeFile({
      data,
      path: {
        path: `./${name}`,
        file: {
          name,
          ext: 'json'
        }
      }
    });

    writeFile({
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

