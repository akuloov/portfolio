import {ModalType} from "@/types/ModalType";
import {cn} from "@/utils/cn";
import useDarkMode from "@/hooks/useDarkMode";

const IpModal: React.FC<ModalType> = ({show, onClose, children}) => {
  const {darkMode} = useDarkMode();

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center px-2 sm:px-4 md:px-6"
      onClick={handleOverlayClick}>
      <div
        className={cn("relative bg-darkslate-500 p-4 rounded shadow-lg max-w-md animate-fade", {"bg-white text-black": !darkMode})}>
        <button className="absolute top-0.5 right-2" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default IpModal;