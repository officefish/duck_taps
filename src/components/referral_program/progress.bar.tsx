import {FC, useEffect, useState} from "react"

interface IProgressBarProps {
  value: number
  max: number
}

const ProgressBar: FC<IProgressBarProps> = ({value, max}) => {
  const [width, setWidth] = useState(0)

  const updateProgress = () => {
    setWidth((value / max) * 100);
  }

  useEffect(updateProgress, [value, max]);

  return (
    <div className="progress-bar referral-program-shadow">
      <div className="progress-bar-line"></div>
      <div className="progress-bar-line"></div>
      <div className="progress-bar-line"></div>

      <div className="progress-bar-fill" style={{width: `${width}%`}}></div>
    </div>
  )
}
export default ProgressBar;