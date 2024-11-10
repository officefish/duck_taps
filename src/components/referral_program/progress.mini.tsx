import {FC, ReactNode, useEffect, useState} from "react"

interface IProgressMiniProps {
  children?: ReactNode
  value?: number
  max?: number
}

const ProgressMini: FC<IProgressMiniProps> = ({children, value = 0, max = 1}) => {
  const [width, setWidth] = useState(0)

  const updateProgress = () => {
    setWidth((value / max) * 100);
  }

  const formatNumber = (count: number): string => {
    if (count >= 1000 && count < 1000000) return (count / 1000).toFixed(0) + 'к';
    return count.toString();
  };

  useEffect(updateProgress, [value, max]);

  return (
    <div className='progress-mini'>
      <div className="progress-mini-fill" style={{width: `${width}%`}}>
        <div className="progress-mini-fill-line"></div>
      </div>

      <div className="progress-mini-text">{children ? children : `${formatNumber(value)}/${formatNumber(max)}`}</div>
    </div>
  )
}
export default ProgressMini;