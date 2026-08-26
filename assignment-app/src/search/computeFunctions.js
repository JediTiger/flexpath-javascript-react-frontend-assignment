function computeAve(decidedMetricKey, dataObject) {
   const metricSum = dataObject.reduce((sum, current) => {
      const val = parseFloat(current[decidedMetricKey]);
      return sum + (isNaN(val) ? 0 : val);
   }, 0);      
   const resultSize = dataObject.length;
   const average = (metricSum / resultSize).toFixed(0);
   return average.toLocaleString("en-US", {maximumFractionDigits: 0});
}

function computeMedian(decidedMetricKey, dataObject) {
   const medianList = dataObject.map(item => parseFloat(item[decidedMetricKey]));
   medianList.sort((a, b) => a - b);
   const middleValue = Math.floor(medianList.length / 2);
   let medianValue;
   if (medianList.length % 2 === 0) {
      medianValue = ((medianList[middleValue - 1] + medianList[middleValue]) / 2).toFixed(1);
   } else {
      medianValue =  medianList[middleValue].toFixed(1);
   }
   return medianValue.toLocaleString("en-US", { maximumFractionDigits: 1});
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
   if (!dataObject || dataObject.length === 0) {
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