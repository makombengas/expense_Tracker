import _ from "lodash";
export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    // calculate the Total sum of all transactions
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"), // return the result [300, 350, 500]
      };
    })
    .value();
  return sum;
}
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let total = _.sum(getSum(transaction));
  // get the percentage of the total amount
  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / total }))
    .value();
  return percent;
}

export function chartData(transaction, custom) {
  let bg = _.map(transaction, (a) => a.color);
  // return a new array from bg to display only one type of color
  bg = _.uniq(bg);
  console.log(bg);
  let dataValue = getSum(transaction);
  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
