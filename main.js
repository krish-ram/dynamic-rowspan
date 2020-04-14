function formatDataValues(data, keyName) {
  let keys = Object.values(data[keyName]);
  let rowValues = [],
    headers = [];
  Object.entries(data).map(([key, valueArr]) => {
    headers.push(key);
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

  return { headers: headers, formattedData: groupedValues };
}

function getSpanValue(rowValues, keyName) {
  let spanValues = {};
  Object.values(rowValues).map(rowList => {
    let prev = {},
      prevIndex = {},
      prevSpan = {};
    rowList.map((row, rowIndex) => {
      if (!spanValues[row[keyName]]) {
        spanValues[row[keyName]] = {};
      }
      spanValues[row[keyName]][rowIndex] = {};

      Object.entries(row).map(([key, value]) => {
        if (prev[key] === value) {
          prevIndex[key] =
            prevIndex[key] || prevIndex[key] === 0 ? prevIndex[key] : rowIndex;
          prevSpan[key] = prevSpan[key] ? prevSpan[key] + 1 : 1;
          spanValues[row[keyName]][prevIndex[key]][key] = prevSpan[key];
          spanValues[row[keyName]][rowIndex][key] = -1;
        } else {
          spanValues[row[keyName]][rowIndex][key] = 1;
          prevIndex[key] = rowIndex;
          prevSpan[key] = 1;
        }
      });
      prev = { ...row };
    });
  });
  return spanValues;
}

function generateTable(headers, rowValues, spanValues) {
  let table = document.createElement("table");
  table.className = "table table-bordered table table-striped ";
  let thead = document.createElement("thead");
  thead.className = "bg-primary";
  var tBody = document.createElement("tbody");
  // Row for heading
  let tr = thead.insertRow(-1);
  headers.forEach(headerValue => {
    let th = document.createElement("th");
    th.innerHTML = headerValue;
    tr.appendChild(th);
  });

  Object.entries(rowValues).forEach(([key, rowData]) => {
    rowData.forEach((row, rowIndex) => {
      let trow = tBody.insertRow(-1);
      Object.entries(row).forEach(([columnKey, columnValue]) => {
        let td = document.createElement("td");
        td.setAttribute("rowspan", spanValues[key][rowIndex][columnKey]);
        td.innerHTML = columnValue;
        if (spanValues[key][rowIndex][columnKey] !== -1) trow.appendChild(td);
      });
    });
  });
  table.appendChild(thead);
  table.appendChild(tBody);
  const divContainer = document.getElementById("main");
  divContainer.appendChild(table);
}
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

let spanValues = getSpanValue(formattedData, "Employee");
generateTable(headers, formattedData, spanValues);
