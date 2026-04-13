export interface ToastType {
  variant: 'error' | 'info' | 'success';
  message: string;
  title: string;
  id: string;
};

interface ToastInput extends Omit<ToastType, 'id'> {
  timeout?: number;
};
type Listener = (toasts: ToastType[]) => void;

let state: ToastType[] = [];
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((listener) => listener(state));

export const toast = {
  add({ timeout = 3000, ...rest }: ToastInput) {
    const item: ToastType = {
      ...rest,
      id: crypto.randomUUID()
    };

    state = [...state, item].slice(-5);
    emit();

    setTimeout(() => {
      this.close(item.id);
    }, timeout);

    return item.id;
  },

  close(id: string) {
    state = state.filter((t) => t.id !== id);
    emit();
  },

  clear() {
    state = [];
    emit();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    listener(state);

    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot() {
    return state;
  }
};
