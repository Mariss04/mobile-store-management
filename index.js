// Task 1
// function printLater() {
//   console.log("Printed after 4 seconds");
// }

// console.log("Printed Immediately");

// setTimeout(printLater, 4000);

// Task 2
console.log("Printed Immediately");

for (var i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 3000);
}
