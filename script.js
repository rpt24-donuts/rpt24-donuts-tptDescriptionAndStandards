import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 RPS
      duration: '1m',
      preAllocatedVUs: 200,
      maxVUs: 1200,
    },
  },
};

export default function () {
  http.get('http://localhost:3002/products/9999991');
  sleep(1);
}

// export default function () {
//   const url = 'http://localhost:3002/products/add';
//   const payload = JSON.stringify({
//     productDescription: "'this is a new resource'",
//     pageLength: 100,
//     answerKeyIncluded: true,
//     teachingDuration: "'1 quarter'",
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   http.post(url, payload, params);
// }
