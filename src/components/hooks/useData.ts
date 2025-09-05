import { useEffect, useState } from 'react';

interface DataRow {
  city: string;
  fuel: string;
  year: number;
  month: string;
  price: number;
}

export function useData() {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  return data;
}
