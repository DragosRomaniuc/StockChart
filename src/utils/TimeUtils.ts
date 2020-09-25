export function getMinutesBetweenDates(startDate: any, endDate: any) {
  var diff = endDate.getTime() - startDate.getTime();
  return (diff / 60000);
};

export function setIntervalX(callback: any, delay: any, repetitions: any) {
  var x = 0;
  var intervalID = window.setInterval(function () {

     callback();

     if (++x === repetitions) {
         window.clearInterval(intervalID);
     }
  }, delay);
}