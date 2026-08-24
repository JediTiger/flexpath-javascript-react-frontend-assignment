
export function computeAve(deciderVar, dataObject) {
   if (dataObject === 0 || isNaN) {
      return 0;
   } else {
      
   }


}

export function computeMedian(deciderVar, dataObject) {
   if (dataObject === 0 || isNaN) return 0;




}

function decideComputeTarget(targetMetric) {
   const decidedTarget;
   switch(targetMetric) {
      case "usage":
         decidedTarget = 1;
         break;
      case "screen":
         decidedTarget = 2;
         break;
      case "apps":
         decidedTarget = 3;
         break;
      case "age":
         decidedTarget = 4;
         break;
   }
   return decidedTarget
}