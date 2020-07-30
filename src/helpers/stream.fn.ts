export type SubscriberType = (data?: any) => void | boolean;

export const Stream = () => {
  let subscribers: SubscriberType[] = [];

  return {
    subscribe(fn: SubscriberType) {
      subscribers.unshift(fn);
    },
    unsubscribe(fn: SubscriberType) {
      subscribers = subscribers.filter(item => item != fn);
    },
    async next(data?: any) {
      await subscribers
        .reduce((chain: Promise<boolean>, subscriber) => {
          return chain.then((res: boolean) => {
            if (res) {
              return !!subscriber(data)
            }
            throw false;
          });
        }, Promise.resolve(true)).catch(e => {
          console.log(e);
        })
    },
  }
};