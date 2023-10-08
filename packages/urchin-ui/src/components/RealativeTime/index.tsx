import dayjs, { ConfigType } from 'dayjs';
import { FC, useEffect } from 'react';
import { useUpdate } from 'react-use';

export const RelativeTime: FC<{ date: ConfigType; interval?: number }> = ({
  date,
  interval = 1000,
}) => {
  const update = useUpdate();

  // e.g. 1day 2h 3min 4s ago
  const relativeTime = (() => {
    const d = dayjs().diff(date, 'day');
    const h = dayjs().diff(date, 'hour') % 24;
    const m = dayjs().diff(date, 'minute') % 60;
    const s = dayjs().diff(date, 'second') % 60;
    const val: [number, string][] = [
      [d, 'day'],
      [h, 'h'],
      [m, 'min'],
      [s, 's'],
    ];
    return (
      val
        .filter(([n]) => n > 0)
        .map(([n, unit]) => `${n}${unit}`)
        .join(' ') + ' ago'
    );
  })();

  useEffect(() => {
    const timer = setInterval(update, interval);
    return () => clearInterval(timer);
  }, []);

  return <>{relativeTime}</>;
};
