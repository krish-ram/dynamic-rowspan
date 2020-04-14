// This file is not used. Working code has been moved into main.js

function generateTable(headers, rowValues) {
  let table = document.createElement("table");
  table.className = "table table-bordered";
  // Row for heading
  let tr = table.insertRow(-1);
  headers.forEach(headerValue => {
    let th = document.createElement("th");
    th.innerHTML = headerValue;
    tr.appendChild(th);
  });

  Object.values(rowValues).forEach(rowData => {
    Object.values(rowData).forEach((row, rowIndex) => {
      console.log(11, row);
      let trow = table.insertRow(-1);
      let prev = "",
        span = 1;
      Object.values(row).forEach(columnValue => {
        let td = document.createElement("td");
        td.setAttribute("rowspan", Object.values(rowData).length);
        td.innerHTML = columnValue;
        if (Object.values(rowData).length) trow.appendChild(td);
      });
    });
  });
  // rowValues.forEach((rowData, rowIndex) => {
  //   let tr = table.insertRow(-1);
  //   rowData.forEach((row, colIndex) => {
  //     let td = document.createElement("td");
  //     console.log(spanValues[colIndex][rowIndex]);
  //     td.setAttribute("rowspan", spanValues[colIndex][rowIndex]);
  //     td.className = "vcenter";
  //     td.innerHTML = row;
  //     if (row) tr.appendChild(td);
  //   });
  // });
  document.body.appendChild(table);
}

function formatData(data) {
  let headers = [],
    rowValues = [],
    spanValues = [];
  Object.keys(data).forEach((key, rowIndex) => {
    headers.push(key);
    let prev = "",
      prevIndex = 0;
    spanValues[rowIndex] = [];
    console.log(key, rowIndex);
    Object.values(data[key]).forEach((value, index) => {
      console.log(value, index);
      if (!Array.isArray(rowValues[index])) {
        rowValues[index] = [];
      }
      spanValues[rowIndex][index] = 1;
      if (prev !== value) {
        rowValues[index].push(value);
        prevIndex = index;
      } else {
        spanValues[rowIndex][prevIndex] += 1;
        rowValues[index].push("");
      }
      prev = value;
    });
  });
  console.log(rowValues, spanValues);
  // generateTable(headers, rowValues, spanValues);
}

function formatDataValues(data, keyName) {
  let keys = Object.values(data[keyName]);
  rowValues = [];
  Object.entries(data).map(([key, valueArr]) => {
    Object.values(valueArr).map((value, index) => {
      const rowObj = { [key]: value };
      rowValues[index] = rowValues[index]
        ? { ...rowValues[index], ...rowObj }
        : rowObj;
    });
  });
  const groupedValues = {};
  rowValues.map(row => {
    if (!groupedValues[row[keyName]]) {
      groupedValues[row[keyName]] = [];
    }
    groupedValues[row[keyName]].push(row);
  });

  console.log(groupedValues);
  return groupedValues;
}

function getSpanValue(rowValues, keyName) {
  let spanValues = {};
  Object.values(rowValues).map(rowList => {
    let prev = {},
      prevIndex = 0,
      prevSpan = {};
    rowList.map((row, rowIndex) => {
      if (!spanValues[row[keyName]]) {
        spanValues[row[keyName]] = {};
      }
      spanValues[row[keyName]][rowIndex] = {};
      Object.entries(row).map(([key, value]) => {
        if (prev[key] === value) {
          prevIndex = prevIndex || prevIndex === 0 ? prevIndex : rowIndex;
          prevSpan[key] = prevSpan[key] ? prevSpan[key] + 1 : 1;
          spanValues[row[keyName]][prevIndex][key] = prevSpan[key];
          spanValues[row[keyName]][rowIndex][key] = -1;
        } else {
          spanValues[row[keyName]][rowIndex][key] = 1;
          prevIndex = rowIndex;
          prevSpan[key] = 1;
        }
      });
      prev = { ...row };
    });
  });
  console.log(spanValues);
  return spanValues;
}
// function formatData(data) {
//   let employee = data["Employee"];
//   let dataList = {},
//     headers = [];
//   Object.entries(data).forEach(([key, dataValue]) => {
//     headers.push(key);
//     Object.entries(dataValue).forEach(([index, value]) => {
//       if (!dataList[employee[index]]) dataList[employee[index]] = {};
//       if (!dataList[employee[index]][index])
//         dataList[employee[index]][index] = {};
//       dataList[employee[index]][index][key] = value;
//     });
//   });
//   return { rowValues: dataList, headers: headers };
// }

const spanData = {
  dsmfsldfjdlsf: [
    { Employee: "dsmfsldfjdlsf", "Product Type": "Corporate Bond" },
    { Employee: "dsmfsldfjdlsf", "Product Type": "Corporate Bond" },
    { Employee: "dsmfsldfjdlsf", "Product Type": "Corporate Bond1" }
  ],
  dsklfjklsdfk: [{ Employee: "dsklfjklsdfk", "Product Type": "Bond" }],
  dsfdsfdsfds: [{ Employee: "dsfdsfdsfds", "Product Type": "Bond" }]
};

// console.log(getSpanValue(spanData, "Employee"));

const data = {
  Employee: {
    "0": "dsmfsldfjdlsf",
    "1": "dsmfsldfjdlsf",
    "2": "dsmfsldfjdlsf",
    "3": "dsklfjklsdfk",
    "4": "dsfdsfdsfds"
  },
  "Product Type": {
    "0": "Corporate Bond",
    "1": "Corporate Bond",
    "2": "Corporate Bond",
    "3": "Bond",
    "4": "Bond"
  },
  "Exception Types": {
    "0": "Misc",
    "1": "Producer",
    "2": "Misc",
    "3": "Price",
    "4": "Misc"
  },
  "Number of Cases": {
    "0": 1,
    "1": 1,
    "2": 1,
    "3": 1,
    "4": 1
  },
  "Total Cases": {
    "0": 3,
    "1": 3,
    "2": 3,
    "3": 1,
    "4": 1
  }
};
let { headers, formattedData } = formatDataValues(data, "Employee");
let spanValues = getSpanValue(formatDataValues, "Employee");
// const { headers, rowValues } = formatData(data);
// console.log(rowValues);
// generateTable(headers, rowValues);
