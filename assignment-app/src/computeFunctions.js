
/*
  0  "User ID": "1",
  1  "Device Model": "Google Pixel 5",
  2  "Operating System": "Android",
  ==3  "App Usage Time (min/day)": "393",
  ==4  "Screen On Time (hours/day)": "6.4",
  5  "Battery Drain (mAh/day)": "1872",
  ==6  "Number of Apps Installed": "67",
  7  "Data Usage (MB/day)": "1122",
  ==8  "Age": "40",
  9  "Gender": "Male",
  10  "User Behavior Class": "4"
*/
import { ltc } from "./logToConsole.js";

export function computeAve(deciderVar, dataObject) {
   if (dataObject === 0 || isNaN) {
      return 0;
   } else {
      const decidedMetric = decideComputeTarget(deciderVar);
      const metricSum = dataObject[decidedMetric].reduce((sum, current) => sum + current, 0);
      const resultSize = dataObject.length;
      ltc("deciderVar is", deciderVar);
      ltc("dataObject is", dataObject);
      ltc("metricSum is", metricSum);
      ltc("resultSize is", resultSize);
      return metricSum / resultSize;
   }


}

export function computeMedian(deciderVar, dataObject) {
   if (dataObject === 0 || isNaN) return 0;




}

function decideComputeTarget(targetMetric) {
   let decidedTarget;
   switch(targetMetric) {
      case "usage":
         decidedTarget = 3;
         break;
      case "screen":
         decidedTarget = 4;
         break;
      case "apps":
         decidedTarget = 6;
         break;
      case "age":
         decidedTarget = 8;
         break;
   }
   return decidedTarget
}