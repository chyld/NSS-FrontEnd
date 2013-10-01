test("deposit", function() {
  deepEqual(deposit(1000, 250), 1250, "depositing 250 dollars");
});

test("withdraw", function() {
  deepEqual(withdraw(1000, 400), 600, "withdrawing 600 dollars");
});
