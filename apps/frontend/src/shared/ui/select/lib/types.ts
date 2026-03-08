interface Item {
  value: string;
  label: string;
}

export interface SelectOwnProps {
  onChange?: (value: string | null) => void;
  sideOffset?: number;
  label?: string;
  items?: Item[]
  value?: string;
}
