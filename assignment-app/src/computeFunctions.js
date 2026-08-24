
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

function computeAve(decidedMetricKey, dataObject) {
   const metricSum = dataObject.reduce((sum, current) => {
      const val = parseFloat(current[decidedMetricKey]);
      return sum + (isNaN(val) ? 0 : val);
   }, 0);      
   const resultSize = dataObject.length;
   return (metricSum / resultSize).toFixed(0);
}

function computeMedian(decidedMetricKey, dataObject) {
   /*
      Figuring a median:
      1. Obtain list of numbers
      2. Sort tht list from lowest to highest
      3. Divide the number of items by 2
      4. Decide the median
         a. For an even amount of numbers, average the 2 middle values
         b. For an odd amount, chose that exact number
   */
   // Step 1 - Make the list of numbers
   const medianList = dataObject.map(item => parseFloat(item[decidedMetricKey]));
   // Step 2 - Sort the list
   medianList.sort((a, b) => a - b);
   // Step 3 - Find middle value
   const middleValue = Math.floor(medianList.length / 2);
   // Step 4 - Figure if even or odd
   if (medianList.length % 2 === 0) {
      // a. If even, add the middle two numbers and divide by 2
      return ((medianList[middleValue - 1] + medianList[middleValue]) / 2).toFixed(1);
   } else {
      // b. If odd, just return that number
      return medianList[middleValue].toFixed(1);
   }
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

export function startCompute(computeType, chosenMetric, dataObject) {
   if (!Array.isArray(dataObject) || !dataObject || dataObject.length === 0) {
      return 0;
   } else {
      const decidedMetricKey = decideComputeTarget(chosenMetric);
      if (computeType === 1) {
         return computeAve(decidedMetricKey, dataObject);
      } else if (computeType === 2) {
         return computeMedian(decidedMetricKey, dataObject);
      }
   }
}