interface Item {
  value: string;
  label: string;
}

export interface SelectOwnProps {
  onChange?: (value: string | null) => void;
  sideOffset?: number;
  items?: Item[]
  value?: string;
}
