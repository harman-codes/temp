function waitTwoSeconds(sec) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Done!"), sec);
  });
}

async function run() {
  console.log("First starts");

  const result = await waitTwoSeconds(2000);
  console.log(result);

  console.log("First ends");

  console.log("2nd starts");
  const result2 = await waitTwoSeconds(3000);
  console.log(result2);
  console.log("2nd ends");
}


run();
console.log("outer 1");
console.log("outer 2");