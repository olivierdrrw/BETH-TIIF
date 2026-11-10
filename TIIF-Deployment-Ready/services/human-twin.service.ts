import { HumanTwinRepository } from "@/repositories/human-twin.repository";

export class HumanTwinService {
  static subscribe(uid: string, callback: any) {
    return HumanTwinRepository.subscribe(
      uid,
      callback
    );
  }

  static calculateWellbeing(
    data: any
  ) {
    return (
      data.identity +
      data.growth +
      data.resilience
    ) / 3;
  }
}