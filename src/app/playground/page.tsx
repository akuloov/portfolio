import GetAdvice from "@/components/getAdvice/GetAdvice";
import LinkButton from "@/components/LinkButton";
import GetIP from "@/components/getIP/GetIP";

const Playground = () => {

  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 flex flex-col text-white m-auto p-2 max-w-xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <LinkButton route={"/"} className="animate-fade-down"/>
      <GetAdvice/>
      <GetIP/>
      <div className="animate-fade-down rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/933626299/favorites&amp;">
        </iframe>
      </div>
    </main>
  );
}

export default Playground;