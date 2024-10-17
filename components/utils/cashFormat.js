
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