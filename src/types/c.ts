/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
function cUntyped(someArg: any, favoriteColor: any) {
  console.log(someArg.someKey);
}

function cTyped(someArg: number, favoriteColor: {forACar: string}) {
  console.log(favoriteColor.forACar);
}
