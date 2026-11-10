type Callback = (payload?: any) => void;

class EventBus {
  private events = new Map<
    string,
    Callback[]
  >();

  on(event: string, cb: Callback) {
    const list =
      this.events.get(event) || [];

    this.events.set(event, [
      ...list,
      cb,
    ]);
  }

  emit(event: string, payload?: any) {
    this.events
      .get(event)
      ?.forEach((cb) => cb(payload));
  }
}

export const eventBus =
  new EventBus();