// Write a function that takes a list of hours and returns the total weekly salary.

// The input list hours is listed sequentially, ordered from Monday to Sunday.
// A worker earns $10 an hour for the first 8 hours.
// For every overtime hour, he earns $15.
// On weekends, the employer pays double the usual rate, 
// regardless how many hours were worked previously that week. 
// For instance, 10 hours worked on a weekday would pay 80+30 = $110, but on a weekend it would pay 160+60 = $220.

function weeklySalary (hours) {
    let salary = 0;
    for (let index = 0; index < hours.length - 2; index++) {
        if (hours[index] == 0) {
            salary += 0
        }
        else if (hours[index] <= 8) {
            salary += hours[index] * 10;
        } 
        else if (hours[index] > 8) {
            let overTimeHours = 0;
            overTimeHours = hours[index] - 8;
            salary += ((hours[index] - overTimeHours) * 10) + (overTimeHours * 15);
        }
        
    }
    for (let index2 = 5; index2 < hours.length; index2++) {
        if (hours[index2] == 0) {
            salary += 0
        }
        else if (hours[index2] <= 8) {
            salary += hours[index2] * (10 * 2);
        } 
        else if (hours[index2] > 8) {
            let overTimeHoursWeekends = 0;
            overTimeHoursWeekends = hours[index2] - 8;
            salary += ((hours[index2] - overTimeHoursWeekends) * (10 * 2)) + (overTimeHoursWeekends * (15 * 2));
        }
        
    }
    return salary;
}

console.log(weeklySalary([8, 8, 8, 8, 8, 0, 0])); // ➞ 400
console.log(weeklySalary([10, 10, 10, 0, 8, 0, 0])); // ➞ 410
console.log(weeklySalary([0, 0, 0, 0, 8, 12, 0])); // ➞ 360