import { BeatLoader } from 'react-spinners';

export function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader margin={10} size={25} speedMultiplier={1} />
    </div>
  );
}
