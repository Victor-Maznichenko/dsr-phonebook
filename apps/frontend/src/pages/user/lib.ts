export const MODAL_TYPES = {
  Personal: 'personal',
  Credentials: 'credentials',
  DetailedInfo: 'detailed-info'
};

export type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];
