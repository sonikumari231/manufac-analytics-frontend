import { useState, useEffect } from 'react';
import Dropdowns from '../Dropdown';
import Chart from '../Chart';
import { useData } from '../hooks/useData';

export default function Dashboard() {
  const data = useData();

  const cities = Array.from(new Set(data.map(d => d.city)));
  const fuels = Array.from(new Set(data.map(d => d.fuel)));
  const years = Array.from(new Set(data.map(d => d.year)));

  // ✅ Default Delhi - Petrol - 2023
  const [selected, setSelected] = useState({
    city: "Delhi",
    fuel: "Petrol",
    year: 2023
  });

  // ✅ जब data आ जाए तो अगर Delhi / Petrol / 2023 dataset में नहीं है,
  // तो पहला available value fallback ले ले
  useEffect(() => {
    if (data.length > 0) {
      setSelected(prev => ({
        city: cities.includes(prev.city) ? prev.city : cities[0],
        fuel: fuels.includes(prev.fuel) ? prev.fuel : fuels[0],
        year: years.includes(prev.year) ? prev.year : years[0]
      }));
    }
  }, [data]);

  const filtered = data.filter(
    d => d.city === selected.city && d.fuel === selected.fuel && d.year === selected.year
  );

  // ✅ Always show Jan–Dec order
  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const monthlyData = monthOrder.map((m) => {
    const record = filtered.find(f => f.month === m);
    return { month: m, price: record ? record.price : 0 };
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fuel Price Dashboard</h1>
      <Dropdowns
        cities={cities}
        fuels={fuels}
        years={years}
        selected={selected}
        onChange={(field, value) =>
          setSelected(prev => ({ ...prev, [field]: value }))
        }
      />
      <Chart data={monthlyData} />
    </div>
  );
}
