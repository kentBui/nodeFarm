module.exports.replaceTemplate = (temp, prod) => {
  console.log(prod.id);
  let output = temp.replace(/{%PRODUCTNAME%}/g, prod.productName);
  output = output.replace(/{%IMAGE%}/g, prod.image);
  output = output.replace(/{%QUANTITY%}/g, prod.quantity);
  output = output.replace(/{%PRICE%}/g, prod.price);
  output = output.replace(/{%FROM%}/g, prod.from);
  output = output.replace(/{%NUTRIENTS%}/g, prod.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, prod.description);
  output = output.replace(/{%ID%}/g, prod.id);
  output = prod.organic
    ? output.replace(/{%NOTORGANIC%}/g, "")
    : output.replace(/{%NOTORGANIC%}/g, "not-organic");
  console.log(output);
  return output;
};
