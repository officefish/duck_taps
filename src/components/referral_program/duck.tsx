import {animated, useSpring} from 'react-spring';
import {FC, useEffect, useRef, useState} from 'react';

interface IDuckProps {
  character?: string,
  onTouch?: () => void,
  onDown?: () => void
}

// TODO: Delete after adding store
const baseCharacter = 'male'

const Duck: FC<IDuckProps> = (props) => {

  const { character, onDown } = props

  const tempCharacterInit = character || baseCharacter

  const [state, setState] = useState(tempCharacterInit);
  const [isClicked, setIsClicked] = useState(false);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);

  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCount = useRef(0);

  // Конфигурация с порогами интервала и состояниями
  const stateConfig = [
    {minCPS: 0, maxCPS: 3, state: tempCharacterInit},
    {minCPS: 4, maxCPS: 5, state: `${tempCharacterInit}_2`},
    {minCPS: 6, maxCPS: 7, state: `${tempCharacterInit}_3`},
    {minCPS: 8, maxCPS: Infinity, state: `${tempCharacterInit}_4`},
  ];

  // Определяем состояние на основе скорости кликов
  const getStateFromCPS = (cps: number) => {
    return stateConfig.find((config) => cps >= config.minCPS && cps <= config.maxCPS)?.state!;
  };

  const {scale} = useSpring({
    scale: isClicked ? 0.9 : 1,
    config: {tension: 300, friction: 15},
  });

  const handleClick = () => {
    clickCount.current += 1;
    setIsClicked(true);

    // Таймер для возврата масштаба к норме
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setIsClicked(false), 100);
  };

  const handleDown = () => {
    onDown && onDown()
  }

  // Обновляем состояние на основе скорости кликов
  useEffect(() => {
    const interval = setInterval(() => {
      // Вычисляем клики в секунду
      const cps = clickCount.current;
      setClicksPerSecond(cps);


      // Определяем состояние на основе CPS и обновляем его
      setState(getStateFromCPS(cps));

      // Сбрасываем счётчик кликов на следующий интервал
      clickCount.current = 0;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Сброс состояния в базовое, если нет кликов
  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      if (clicksPerSecond === 0) setState(tempCharacterInit);
    }, 200);

    return () => clearTimeout(resetTimeout);
  }, [clicksPerSecond, tempCharacterInit]);

  return (
    <div onTouchEnd={handleDown} onMouseDown={handleDown}>
       <animated.img
      src={`referral_program/${state}.png`}
      style={{
        transform: scale.to((s) => `scale(${s})`),
      }}
      onClick={handleClick}
      alt="Duck"
    />
    </div>
   
  );
};

export default Duck;
