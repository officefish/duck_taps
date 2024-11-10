import {FC, useState} from "react";

interface IModalTutorialProps {
  isOpen: boolean;
  close: () => void;
}

const ModalTutorial: FC<IModalTutorialProps> = ({isOpen, close}) => {
  const [tutorial, setTutorial] = useState(1)
  const tutorialCount = 4;
  const tutorialArray = Array.from({length: tutorialCount}, (_, i) => i + 1);

  const nextTutorial = () => {
    setTutorial(tutorial + 1)

    if (tutorial >= tutorialCount) {
      localStorage.setItem('tutorial_complete', 'true')
      close()
    }
  }

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-tutorial relative w-full h-full">
        <div className="relative h-full" onClick={nextTutorial}>
          {tutorialArray?.map((value) => (
            <div className={`modal-tutorial-image ${tutorial !== value ? 'invisible' : ''}`} key={`slide-${value}`}>
              <picture>
                <source srcSet={`referral_program/tutorial/tutorial_320_${value}.png`} media="(max-width:360px)"/>
                <img src={`referral_program/tutorial/tutorial_${value}.png`} alt="tutorial"/>
              </picture>
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {tutorialArray?.map((value) => (
            <button
              className={`modal-tutorial-button ${tutorial === value ? 'active' : ''}`}
              onClick={() => setTutorial(value)}
              key={`slide-button-${value}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalTutorial;
