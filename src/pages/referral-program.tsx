import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { ITask, Page } from "@/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { CompleteSvg, CopySvg, QuestionSvg } from "@/assets/svg/referral.tsx";

import ProgressMini from "@/components/referral_program/progress.mini.tsx";
import Duck from "@/components/referral_program/duck.tsx";
import ModalStart from "@/components/referral_program/modal.start.tsx";
import ModalTutorial from "@/components/referral_program/modal.tutorial.tsx";
import ModalInfo from "@/components/referral_program/modal.info.tsx";
import ProgressBar from "@/components/referral_program/progress.bar.tsx";
import useTapper from "@/hooks/useTapper";

const ReferralProgram: FC = () => {

  const { setPage } = useSiteStore();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { referralsCode } = useUserStore();

  useEffect(() => {
    
    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Стань лидером сообщества!'
      const url = `https://t.me/duck_taps_test_bot/duck_taps?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }

  }, [referralsCode])

    const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412") 
    const [telegramUrl, setTelegramUrl] = useState("")

    const handleShare = () => {
      window.open(telegramUrl, '_blank');
  };

  const handleCopy = () => {
    // Using the Clipboard API to copy text
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(referralUrl)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
          fallbackCopyText(referralUrl);
        });
    } else {
      // Fallback method
      fallbackCopyText(referralUrl);
    }
  }

  const fallbackCopyText = useCallback((text: string) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.value = text;
      textArea.select();
      try {
        document.execCommand('copy');
        //alert("Text copied using fallback!");
      } catch (err) {
        //console.error('Fallback: Oops, unable to copy', err);
      }
    } else {
      //console.error('Fallback: Text area reference is null');
    }
  }, [])

  useEffect(() => {
    setPage(Page.HOME);
  }, [setPage]);

  const [openModalStart, setOpenModalStart] = useState(false)
  const [openModalTutorial, setOpenModalTutorial] = useState(false)
  const [openModalInfo, setOpenModalInfo] = useState(false)

  // TODO: Change to store
  const [character, setCharacter] = useState('')

  useEffect(() => {
    const isTutorialComplete = localStorage.getItem('tutorial_complete')
    const characterSelected = localStorage.getItem('character') // TODO: Change to Store

    if (!isTutorialComplete) setOpenModalTutorial(true)

    // TODO: Change to Store
    if (!characterSelected) {
      setOpenModalStart(true)
    } else {
      setCharacter(characterSelected)
    }
  }, []);

  
  const { dailyTasks, seasonTasks, totalProgress } = useUserStore()

  const { handleDown } = useTapper();

  return (
    <div className='referral-program w-full flex flex-col gap-10'>
      {/* Activity widget */}
      <div className="activity flex w-full items-center">
        <div className="flex w-full items-center">
          <div className="activity-avatar referral-program-shadow">
            <img src="referral_program/avatar.png" alt='avatar'/>
          </div>

          {/* TODO: current_value, max_value*/}
          <ProgressBar value={totalProgress} max={100}/>
        </div>

        <div className="activity-info" onClick={() => setOpenModalInfo(true)}>
          <QuestionSvg />
        </div>
      </div>

      {/* Duck */}
      <div className="duck-wrapper flex align-middle justify-center">
        <Duck character={character} onDown={handleDown}/>
      </div>

      {/* Quest */}
      <div className="relative quest-wrapper flex flex-col gap-2">
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="quest-title-list">
          <div className="">Задание</div>
          <div className="">Прогресс</div>
          <div className="">Награда</div>
        </div>

        <div className="quest-list">
          {dailyTasks?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
          {seasonTasks?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>

        {/* Button */}
        <div className="mb-5 mt-3 w-full flex items-center justify-center gap-2">
          <button className="btn flex-1 btn-wide button" onClick={handleShare}>Поделиться</button>
          <button
            className="btn button"
            onClick={handleCopy}
          >
            <CopySvg/>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ModalInfo isOpen={openModalInfo} close={() => setOpenModalInfo(false)}/>
      <ModalTutorial isOpen={openModalTutorial} close={() => setOpenModalTutorial(false)}/>
      <ModalStart
        isOpen={openModalStart}
        close={() => setOpenModalStart(false)}
        setCharacter={(char: any) => setCharacter(char)}
      />

      <textarea
        ref={textAreaRef}
        className="invisible"
        style={{position: 'absolute', left: '-9999px'}}
        readOnly
      />
    </div>
  )
}


export default ReferralProgram;

interface TaskItemProps {
  task: ITask
}

function isComplete(task: ITask): boolean {
  return task.status === 'READY' || task.status === "COMPLETED"
}

const TaskItem: FC<TaskItemProps> = (props) => {
  const [complete, setComplete] = useState(false)
  const [link, setLink] = useState('')
  const [reward, setReward] = useState(0)
  const [value, setValue] = useState(0)
  const [max, setMax] = useState(0)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setComplete( isComplete(props.task))
    setLink(props.task.templateTask.navigate)
    setReward(props.task.templateTask.baunty || 0)
    setValue(props.task.progress || 0)
    setMax(props.task.maxProgress || props.task.templateTask.target || 0)
    setTitle(props.task.templateTask.title)
  }, [props.task])
  
  return (
    <div className="quest-item" key={title}>
      <div className="quest-title">{title}</div>
        {complete 
        ? (
          <div className="flex justify-center"><CompleteSvg/></div>
        ) : link
          ? (
            <Link className="quest-button" to={link}>Открыть</Link>
          ) : (
            // TODO: current_value, max_value
          <ProgressMini value={value} max={max}></ProgressMini>
          )
        }
        <div className="quest-bounty">{reward}%</div>
    </div>
  )
}
