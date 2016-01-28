//Bucket constructor with empty and fill methods
function Bucket() {
  this.value = 0;
 return this.value;
}
Bucket.prototype.empty = function() {
  this.value = 0;
  return this.value;
};
Bucket.prototype.fill = function(val) {
  this.value = val;
  return this.value;
};
/* 
 * helper function to transfer values between buckets
 * parameters are buckets
 * max2 is the value of the second bucket as the maximum capacity. 
 * returns 2 as the number of steps taken, to be added with count
 */
function transfer(one, two, max2) {
  var available = max2 - two.value;
  var remainder = available % one.value;
  if(available > one.value) { //entire content fits into the other bucket
    two.value += one.value;
    one.value = 0;
  }
  else { //only transfering partial amount 
    two.value = max2;
    one.value -= remainder;
  }
  return 2;
}
//plays the game and keeps count for every step taken to reach target number
function playTransfer(value1, value2, target) {
  var bucket1 = new Bucket();
  var bucket2 = new Bucket();
  var count = 0;
  //start initial fill
  bucket1.fill(value1);
  count++;
 /**  initial fill will never reach target number
  *   it must run block of code at least once before checking for the target num. 
  *   it will run as long as neither bucket has reached the target num
  *   if it has not met target, it will empty, fill or transfer water to bucket
 */
  do {
    if(bucket2.value === value2) { 
      bucket2.empty(); //empty when second bucket has reached its capacity
      count++;
      count += transfer(bucket1, bucket2, value2); //always transfer after empty
    } else if(bucket1.value === 0) {
      bucket1.fill(value1); //refill @ one.value === 0 
      count++;
    } else {
      count += transfer(bucket1, bucket2, value2);
    }
  } while (bucket1.value !== target && bucket2.value !== target);
  
  return count;

}

function TransferWater(value1, value2, target) {
  if(target > value1 && target > value2) {return "buckets cannot hold target amount";}
  //checks both possible outcomes
  var first = playTransfer(value1, value2, target);
  var second = playTransfer(value2,value1, target); 
  if(first < second) {
    return "less steps taken with " + value1 + " as the transfering bucket with " + first + " steps";
  } else if(second < first) {
    return "less steps taken with " + value2 + " as the transfering bucket with " + second + " steps";
  } else {
    return "you can start with either or, same result";
  }
}