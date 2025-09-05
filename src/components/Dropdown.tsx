import { Select } from '@mantine/core';

interface Props {
  cities: string[];
  fuels: string[];
  years: number[];
  selected: { city: string; fuel: string; year: number };
  onChange: (field: string, value: string | number) => void;
}

export default function Dropdowns({ cities, fuels, years, selected, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <Select
        label="City"
        data={cities}
        value={selected.city}
        onChange={(val) => onChange("city", val || cities[0])}
      />
      <Select
        label="Fuel"
        data={fuels}
        value={selected.fuel}
        onChange={(val) => onChange("fuel", val || fuels[0])}
      />
      <Select
        label="Year"
        data={years.map(y => y.toString())}
        value={selected.year.toString()}
        onChange={(val) => onChange("year", Number(val))}
      />
    </div>
  );
}
