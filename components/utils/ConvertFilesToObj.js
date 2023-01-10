/* eslint-disable array-callback-return */
function ConvertFilesToObj (files) {
  const obj = {};

  files.map(ele => {
    const path = ele.path.split('/');

    path.shift();
    path.pop();

    switch (path.length) {
    case 1: {
      if (typeof obj[path[0].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')] = [];

      obj[path[0].replace(' ', '_')].push(ele);

      break;
    }

    case 2: {
      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] = [];

      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')].push(ele);

      break;
    }

    case 3: {
      if (typeof obj[path[0].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] = {};

      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] = [];
      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')].push(ele);

      break;
    }

    case 4: {
      if (typeof obj[path[0].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] = {};

      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] = [];
      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')].push(ele);

      break;
    }

    case 5: {
      if (typeof obj[path[0].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')] = {};

      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')] = [];
      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')].push(ele);

      break;
    }

    case 6: {
      if (typeof obj[path[0].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')] = {};

      if (typeof obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')][path[5].replace(' ', '_')] === 'undefined') obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')][path[5].replace(' ', '_')] = {};

      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')][path[5].replace(' ', '_')] = [];
      obj[path[0].replace(' ', '_')][path[1].replace(' ', '_')][path[2].replace(' ', '_')][path[3].replace(' ', '_')][path[4].replace(' ', '_')][path[5].replace(' ', '_')].push(ele);

      break;
    }

    default: {
      console.log('untreated file');
    }
    }
  });

  console.log(obj);

  return obj;
}

export default ConvertFilesToObj;
