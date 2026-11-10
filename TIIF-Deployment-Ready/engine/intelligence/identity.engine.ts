export class IdentityEngine {

  static calculateAlignment(
    values:number,
    purpose:number,
    habits:number
  ){

    return Math.round(
      (values+purpose+habits)/3
    );

  }

}