type Handler =
  (payload: any) => void;

class EventBus {

  private handlers:
    Record<
      string,
      Handler[]
    > = {};

  on(
    event: string,
    handler: Handler
  ) {

    if (
      !this.handlers[event]
    ) {
      this.handlers[event] =
        [];
    }

    this.handlers[event]
      .push(handler);
  }

  emit(
    event: string,
    payload: any
  ) {

    const handlers =
      this.handlers[event];

    if (!handlers) {
      return;
    }

    handlers.forEach(
      (handler) =>
        handler(payload)
    );
  }
}

export const eventBus =
  new EventBus();