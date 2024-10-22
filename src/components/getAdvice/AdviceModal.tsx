import {ModalType} from "@/types/ModalType";
import {cn} from "@/utils/cn";
import useDarkMode from "@/hooks/useDarkMode";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {UnsplashDataType} from "@/types/UnsplashDataType";
import AdviceModalSkeleton from "@/components/getAdvice/AdviceModalSkeleton";

const AdviceModal: React.FC<ModalType> = ({show, onClose, children, text}) => {
  const {darkMode} = useDarkMode();
  const UNSPLASH_URL = process.env.NEXT_PUBLIC_UNSPLASH_URL;

  const {isLoading, data} = useQuery<UnsplashDataType>({
    queryKey: ['repoData', text],
    queryFn: () =>
      fetch(`${UNSPLASH_URL}&query=${text}`).then((res) =>
        res.json(),
      ),
  })

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
        {isLoading ? (
          <AdviceModalSkeleton/>
        ) : (
          <>
            {data?.results[0]?.urls?.small && (
              <Image src={data.results[0].urls.small} width={250} height={250} className="mx-auto mb-2 rounded"
                     alt="Demo image"/>
            )}
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default AdviceModal;