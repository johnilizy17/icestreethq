
export const cashFormat = (x, numb) => {
  let icon = "$"
  const amount = localStorage.getItem("amount") ? localStorage.getItem("amount") : "1"
  const item = localStorage.getItem("amount") ? localStorage.getItem("currency") : "USA"
  if (item === "GBP") {
    icon = "￡"
  } else if (item === "NGN") {
    icon = "₦"
  } else {
    icon = "$"
  }
  if (x) {
    let number = x.toString().replace(",", "")
    if (numb) {
      number = parseFloat(number) * numb
    }
    number = number * JSON.parse(amount)
    return icon + parseFloat(number).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${icon}0`
};


export const cashFormat2 = (x, item) => {
  let icon = "$"
  if (item === "England" || item === "Britain") {
    icon = "￡"
  } else if (item === "Nigeria") {
    icon = "₦"
  } else {
    icon = "$"
  }
  if (x) {
    let number = x.toString().replace(",", "")
    if(icon === "$"){
      number =  JSON.parse(localStorage.getItem("usa"))*number
    }else{
      number = number
    }
      
    return icon + parseFloat(number).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${icon}0`
};