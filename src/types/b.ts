/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
function bUntyped(firstName: any, favoriteColor: any) {
  cUntyped(firstName, favoriteColor);
}

function bTyped(firstName: number, favoriteColor: {forACar: string} | null) {
  cTyped(firstName, favoriteColor);
}
