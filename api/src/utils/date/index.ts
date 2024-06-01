export function AMonthFromToday(): Date {
  // Get today's date
  const today: Date = new Date();

  // Calculate the target month
  let targetMonth: number = today.getMonth() + 1; // Adding 1 for next month
  let targetYear: number = today.getFullYear();

  // Handle cases where the next month exceeds 12 (December)
  if (targetMonth > 11) {
    targetMonth = 0; // January
    targetYear++; // Increment year
  }

  // Get the last day of the target month
  const lastDayOfNextMonth: number = new Date(
    targetYear,
    targetMonth + 1,
    0,
  ).getDate();

  // Ensure the day doesn't exceed the last day of the target month
  const targetDay: number = Math.min(today.getDate(), lastDayOfNextMonth);

  // Create the target date
  const targetDate: Date = new Date(targetYear, targetMonth, targetDay);

  // Print the result
  return targetDate;
}

export function AYearFromToday(): Date {
  // Get today's date
  const today: Date = new Date();

  // Calculate the target year
  const targetYear: number = today.getFullYear() + 1;

  // Create the target date
  let targetDate: Date = new Date(
    targetYear,
    today.getMonth(),
    today.getDate(),
  );

  // Handle cases where February 29th doesn't exist in the target year
  if (
    today.getMonth() === 1 &&
    today.getDate() === 29 &&
    targetDate.getDate() !== 29
  ) {
    targetDate = new Date(targetYear, 1, 28); // Set to February 28th
  }

  // return the result
  return targetDate;
}
