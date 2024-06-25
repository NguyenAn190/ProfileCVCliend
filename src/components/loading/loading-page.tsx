import { BeatLoader } from 'react-spinners';

export function LoadingPage({ isLoading }: LoadingPageProps): JSX.Element | null {
  return (
    isLoading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
        <BeatLoader margin={10} size={25} speedMultiplier={1} />
      </div>
    ) : null
  );
}
