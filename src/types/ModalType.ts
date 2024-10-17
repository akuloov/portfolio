export type ModalType = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  text: string;
};