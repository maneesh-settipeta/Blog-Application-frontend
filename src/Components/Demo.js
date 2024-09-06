function add(a, b, callBackFun) {
  setTimeout(() => {
    let x = a + b;
    console.log(x);
    callBackFun(x);
  }, 1000);
}

add(10, 5, (number) => {
  console.log(number * number);
});
