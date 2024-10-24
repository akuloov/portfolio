import GetAdvice from "@/components/getAdvice/GetAdvice";
import LinkButton from "@/components/LinkButton";
import GetApi from "@/components/getApi/GetApi";

const Playground = () => {

  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <LinkButton route={"/"} className="animate-fade-down"/>
      <GetAdvice/>
      <GetApi/>
    </main>
  );
}

export default Playground;