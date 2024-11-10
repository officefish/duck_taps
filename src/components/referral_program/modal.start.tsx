import {FC, useState} from "react";

interface IModalStartProps {
  isOpen: boolean;
  close: () => void;
  setCharacter: (character: string) => void;
}

const ModalStart: FC<IModalStartProps> = ({isOpen, close, setCharacter}) => {
  const [selectCharacter, setSelectCharacter] = useState<string | undefined>()
  const [isSelectScreen, setIsSelectScreen] = useState(true)

  const nextScreen = () => {
    if (selectCharacter) {
      setIsSelectScreen(false)

      // TODO: Change to Store
      localStorage.setItem('character', selectCharacter)
      setCharacter(selectCharacter)
    }
  }

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      {isSelectScreen ? (
          <div className="modal-start px-5 py-10">
            <div className="modal-start-title">Поздравляем тебя с запуском проекта FarmDucks!</div>
            <p className="text-center mb-5">Для начала выбери своего персонажа:</p>

            <div className="modal-start-select-wrapper flex flex-col items-center gap-10">
              <div className={`modal-start-select ${selectCharacter === 'male' ? 'active' : ''}`}
                   onClick={() => setSelectCharacter('male')}>
                <img src="referral_program/male.png" alt="character-male"/>
              </div>

              <div className={`modal-start-select ${selectCharacter === 'female' ? 'active' : ''}`}
                   onClick={() => setSelectCharacter('female')}>
                <img src="referral_program/female.png" alt="character-female"/>
              </div>
            </div>

            <div className="modal-start-button">
              <button className="btn w-full btn-wide button" disabled={!selectCharacter} onClick={nextScreen}>Выбрать
              </button>
            </div>
          </div>
        ) :
        (
          <div className="modal-start px-5 py-10">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center mb-5">Отлично, этот персонаж главный герой и с его помощью ты будешь развивать
                свою ферму и город после запуска игры!</p>

              <img className="modal-start-character" src={`referral_program/${selectCharacter}.png`} alt="character"/>
            </div>

            <div className="modal-start-button">
              <button className="btn w-full btn-wide button" onClick={close}>Старт</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default ModalStart;