// type numberOrList = number | numberOrList[];

// type Flatten<A extends unknown[], T extends unknown[] = []> = A extends [infer Start, ...infer Tail]
//   ? Start extends unknown[]
//     ? Flatten<[...Start, ...Tail], T>
//     : Flatten<[...Tail], [Start, ...T]>
//   : T;

// type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

type UserEvent =
  | { userId: string; type: 'view'; timestamp: number }
  | { userId: string; type: 'click'; timestamp: number }
  | { userId: string; type: 'purchase'; amount: number; timestamp: number };

type UserAggregate = {
  userId: string;
  totalEvents: number;
  purchases: number;
  totalAmount: number;
  lastActivity: number;
};

export function aggregateUserEvents(events: UserEvent[]): UserAggregate[] {
  // TODO: сгруппируйте события по userId и посчитайте метрики
  // TODO: верните массив агрегатов, отсортированный по правилам из задания

  const map = new Map<string, UserAggregate>();

  events.forEach((event) => {
    const { userId, type, timestamp } = event;

    const aggregated = map.get(userId);

    if (aggregated) {
      aggregated.totalEvents++;

      aggregated.purchases = type === 'purchase' ? aggregated.purchases + 1 : aggregated.purchases;

      aggregated.lastActivity = timestamp > aggregated.lastActivity ? timestamp : aggregated.lastActivity;

      if ('amount' in event) {
        aggregated.totalAmount += event.amount;
      }

      return;
    }

    const newAggregated: UserAggregate = {
      userId,
      totalEvents: 1,
      purchases: type === 'purchase' ? 1 : 0,
      totalAmount: 'amount' in event ? event.amount : 0,
      lastActivity: timestamp,
    };

    map.set(userId, newAggregated);
  });

  const result = [...map.values()];

  return result.toSorted((a, b) => {
    if (a.totalAmount !== b.totalAmount) return b.totalAmount - a.totalAmount;

    return b.userId.localeCompare(a.userId);
  });
}

// --- Пример использования (можно менять для проверки) ---
const example: UserEvent[] = [
  { userId: 'u1', type: 'view', timestamp: 10 },
  { userId: 'u1', type: 'purchase', amount: 100, timestamp: 30 },
  { userId: 'u2', type: 'purchase', amount: 100, timestamp: 20 },
  { userId: 'u1', type: 'click', timestamp: 15 },
];

console.log(aggregateUserEvents(example));
