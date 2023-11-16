const moment = require('moment');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors')

const express = require('express');
const bodyParser = require('body-parser');
  
var endDate = moment().subtract(0, 'days');
var startDate = moment().subtract(3, 'months');

const dates = [];

while (startDate.isBefore(endDate)) {
  dates.push(startDate.format('D-M-YYYY'));
  startDate.add(1, 'days');
}

const app = express();
const port = process.env.PORT || 5000;
const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());

const doRequests = async (urls) =>   {
    const fetchUrl = (url) => axios.get(url);
    const promises = urls.map(fetchUrl);

    let responses = await Promise.all(promises);
    
    var list_val = []
    responses.forEach((resp) => {
      const my_list = { gdb: "", g1: "", g2_0: "", g2_1: "", g3_0: "", g3_1: "", g3_2: "", g3_3: "", g3_4: "", g3_5:"",
      g4_0:"", g4_1: "", g4_2:"", g4_3: "", g5_0: "", g5_1: "", g5_2: "", g5_3: "", g5_4: "", g5_5: "", 
      g6_0: "", g6_1: "", g6_2: "", g7_0: "", g7_1: "", g7_2: "", g7_3: ""};
      const $ = cheerio.load(resp.data);
      const gdb = $('.v-gdb').text().slice(-2);
      my_list.gdb=gdb;
      // giai nhat
      const g1 = $('.v-g1').text().slice(-2);
      my_list.g1 = g1;
      // giai nhi
      const g2_0 = $('.v-g2-0').text().slice(-2); 
      const g2_1 = $('.v-g2-1').text().slice(-2);
      my_list.g2_0 = g2_0
      my_list.g2_1 = g2_1
      // giai ba
      const g3_0 = $('.v-g3-0').text().slice(-2); 
      const g3_1 = $('.v-g3-1').text().slice(-2); 
      const g3_2 = $('.v-g3-2').text().slice(-2); 
      const g3_3 = $('.v-g3-3').text().slice(-2);
      const g3_4 = $('.v-g3-4').text().slice(-2);
      const g3_5 = $('.v-g3-5').text().slice(-2);
      my_list.g3_0 = g3_0
      my_list.g3_1 = g3_1
      my_list.g3_2 = g3_2
      my_list.g3_3 = g3_3
      my_list.g3_4 = g3_4
      my_list.g3_5 = g3_5
      // giai tu
      const g4_0 = $('.v-g4-0').text().slice(-2);
      const g4_1 = $('.v-g4-1').text().slice(-2);
      const g4_2 = $('.v-g4-2').text().slice(-2);
      const g4_3 = $('.v-g4-3').text().slice(-2);
      my_list.g4_0 = g4_0
      my_list.g4_1 = g4_1
      my_list.g4_2 = g4_2
      my_list.g4_3 = g4_3
      // giai nam
      const g5_0 = $('.v-g5-0').text().slice(-2);
      const g5_1 = $('.v-g5-1').text().slice(-2);
      const g5_2 = $('.v-g5-2').text().slice(-2);
      const g5_3 = $('.v-g5-3').text().slice(-2);
      const g5_4 = $('.v-g5-4').text().slice(-2);
      const g5_5 = $('.v-g5-5').text().slice(-2);
      my_list.g5_0 = g5_0
      my_list.g5_1 = g5_1
      my_list.g5_2 = g5_2
      my_list.g5_3 = g5_3
      my_list.g5_4 = g5_4
      my_list.g5_5 = g5_5

      // giai sau
      const g6_0 = $('.v-g6-0').text().slice(-2);
      const g6_1 = $('.v-g6-1').text().slice(-2);
      const g6_2 = $('.v-g6-2').text().slice(-2);
      my_list.g6_0 = g6_0
      my_list.g6_1 = g6_1
      my_list.g6_2 = g6_2
      // giai bay
      const g7_0 = $('.v-g7-0').text();
      const g7_1 = $('.v-g7-1').text();
      const g7_2 = $('.v-g7-2').text();
      const g7_3 = $('.v-g7-3').text();
      my_list.g7_0 = g7_0
      my_list.g7_1 = g7_1
      my_list.g7_2 = g7_2
      my_list.g7_3 = g7_3
      list_val.push(my_list);
    });
    
    return list_val
}
let urls = dates.map((date) => {
    return `https://xsmn.mobi/xsmb-${date}.html`
});

let my_date = dates.map((date) => {
  return date
});

doRequests(urls)

app.get('/api/get-data', async (req, res) => {
  const data = await doRequests(urls);
  res.json({data});
});

app.listen(port, () => console.log(`Listening on port ${port}`));











