import {FC} from "react";
import {CloseSvg} from "@/assets/svg/referral.tsx";

interface IModalInfoProps {
  isOpen: boolean;
  close: () => void;
}

const ModalInfo: FC<IModalInfoProps> = ({isOpen, close}) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-help p-5">
        <div className="modal-help-close referral-program-shadow-svg" onClick={close}><CloseSvg/></div>

        <div className="modal-help-title">FarmDucks</div>

        <div className="modal-help-content">
          <p>
            Добро пожаловать в первый этап игры FarmDucks!
            В FarmDucks вы берёте на себя роль утёнка с собственной фермой, чтобы прокормить и развить ваш город.
          </p>

          <p>
            Сейчас мы проводим сбор игроков для развития комьюнити и отбора самых активных фермеров.
            Самое важное в жизни проекта - его комьюнити и командная работа игроков с разработчиками.
          </p>

          <p>
            Для первого этапа проекта мы придумали "Шкалу активности" игрока, которая показывает как игрок
            заинтересован и какой вклад он вносит в наше сообщество.
          </p>

          <div className="modal-help-title">Награды</div>

          {/* TODO: Progress element:*/}
          <div className="activity flex w-full items-center mb-5">
            <div className="activity-avatar referral-program-shadow">
              <img src="referral_program/avatar.png" alt='avatar'/>
            </div>
            <div className="progress-bar referral-program-shadow">
              <div className="progress-bar-line"></div>
              <div className="progress-bar-line"></div>
              <div className="progress-bar-line"></div>

              <div className="progress-bar-fill"></div>
            </div>
          </div>

          <ol>
            Шкала активности имеет 4 уровня:

            <li>При достижении 1 уровня — Вы получите награду в виде внутриигровой валюты.</li>
            <li>При достижении 2 уровня — Вы получите скин персонажа в награду.</li>
            <li>При достижении 3 уровня — Вы получите лутбокс в подарок.</li>
            <li>При достижении 4 уровня — Вы сможете поучаствовать в розыгрыше доступа к бета-тесту.</li>
          </ol>

          <p>
            Чем выше вклад игрока в сообщество, тем больше и интереснее награды в следующих этапах игры.
          </p>

          <p>
            Подписывайтесь на наш телеграм канал и чат. Там вы сможете сами голосовать за будущие обновления и
            развитие FarmDucks.
          </p>

        </div>
      </div>
    </div>
  )
}

export default ModalInfo;