export default function SortIcon({
                                   height = "20",
                                   width = "20",

                                 }: {
  height?: string;
  width?: string;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12V10H6V12H0ZM0 7V5H12V7H0ZM0 2V0H18V2H0Z" fill="#5F6368"/>
    </svg>
  );
}
