// 1. The `json` variable is created
let json;

// 2. The `fetch` request is made
fetch('data.json').then((response) => {  
  // 4. The response returns
  return response.json();
}).then((data) => {
  // 5. The data is stored in the `json` variable
  json = data;
});