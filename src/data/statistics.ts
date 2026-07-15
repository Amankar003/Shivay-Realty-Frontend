// Statistics data for animated counters on homepage

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string; // Lucide icon name
}

export const statistics: Statistic[] = [
  {
    id: "s1",
    value: 50,
    suffix: "+",
    label: "Developer Partners",
    icon: "Building2",
  },
  {
    id: "s2",
    value: 5000,
    suffix: "+",
    label: "Happy Families",
    icon: "Users",
  },
  {
    id: "s3",
    value: 1200,
    suffix: "Cr+",
    label: "Properties Sold",
    icon: "Maximize2",
  },
  {
    id: "s4",
    value: 18,
    suffix: "+",
    label: "Years of Trust",
    icon: "Award",
  },
];
