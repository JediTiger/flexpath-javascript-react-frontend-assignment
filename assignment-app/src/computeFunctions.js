
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

export function computeAve(chosenMetric, dataObject) {
   if (!Array.isArray(dataObject) === 0 || !dataObject) {
      return 0;
   } else {
      const decidedMetricKey = decideComputeTarget(chosenMetric);
      const metricSum = dataObject.reduce((sum, current) => {
         const val = parseFloat(current[decidedMetricKey]);
         return sum + (isNaN(val) ? 0 : val);
      }, 0);
      
      const resultSize = dataObject.length;
      return (metricSum / resultSize).toFixed(0);
   }


}

export function computeMedian(chosenMetric, dataObject) {

}

function decideComputeTarget(targetMetric) {
   switch(targetMetric) {
      case "usage":
         targetMetric = "App Usage Time (min/day)";
         break;
      case "screen":
         targetMetric = "Screen On Time (hours/day)";
         break;
      case "apps":
         targetMetric = "Number of Apps Installed";
         break;
      case "age":
         targetMetric = "Age";
         break;
   }
   return targetMetric
}