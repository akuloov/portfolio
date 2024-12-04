import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const ProjectCardSkeleton = () => {
  const {isAuthenticated} = useIsAuthenticated();
  const {themeColor} = useThemeColor();

  return (
    <>
      <Card
        themeColor={themeColor}
        className="animate-pulse flex flex-col items-center sm:items-start sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4">
        <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
          <div className="flex flex-col w-full">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
          </div>
          <div className="bg-gray-300 p-4 w-[260px] rounded mb-10 sm:mb-0">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded w-[300px] h-[400px] bg-gray-200"></div>
          {isAuthenticated && (
            <div className="flex justify-between">
              <div className="h-10 bg-gray-300 rounded w-1/3 p-2 flex items-center justify-center">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-1/2 p-2 flex items-center justify-center">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
      <Card
        themeColor={themeColor}
        className="animate-pulse flex flex-col items-center sm:items-start sm:flex-row mt-6 p-4 sm:p-6 h-full sm:justify-between sm:gap-4">
        <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
          <div className="flex flex-col w-full">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
          </div>
          <div className="bg-gray-300 p-4 w-[260px] rounded mb-10 sm:mb-0">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded w-[300px] h-[400px] bg-gray-200"></div>
          {isAuthenticated && (
            <div className="flex justify-between">
              <div className="h-10 bg-gray-300 rounded w-1/3 p-2 flex items-center justify-center">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-1/2 p-2 flex items-center justify-center">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default ProjectCardSkeleton;