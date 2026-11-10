import { HumanTwinRepository }
from "@/repositories/human-twin.repository";

export class HumanTwinService {

  static async refreshTwin(
    userId: string
  ) {

    const twin =
      await HumanTwinRepository
        .getByUser(userId);

    return twin;
  }
}