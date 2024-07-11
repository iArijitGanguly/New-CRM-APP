import { useEffect, useRef } from 'react';

interface Props {
    children: React.ReactNode
    titleText?: string
    status?: number
    quantity?: number
    background?: string
    fontColor?: string
    borderColor?: string
    dividerColor?: string
}

const Card: React.FC<Props> = ({ children, titleText = 'Card', borderColor = 'border-error', dividerColor = 'bg-gray-100', background = 'bg-primary', fontColor = 'text-white', status = 50, quantity = 50 }) => {
  const progressRef = useRef<HTMLDivElement>(null!);

  const updateProgressRef = () => {
    if(progressRef.current) {
      progressRef.current.style.setProperty('--value', `${(status * 100).toFixed(1)}`);
    }
  };

  useEffect(() => {
    updateProgressRef();
  }, [status]);
  return (
    <div className={`hover:scale-110 transition-all ease-out duration-300 cursor-pointer border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2`}>
      <div className='text-primary-content text-2xl mt-2'>
        { children } <span>{titleText}</span>
      </div>
      <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div>

      <div className='flex justify-around gap-4 items-center'>
        <div className={`text-7xl ${fontColor}`}>{quantity}</div>
        <div className={`radial-progress ${fontColor}`} ref={progressRef}  role="progressbar">
          {(status * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default Card;