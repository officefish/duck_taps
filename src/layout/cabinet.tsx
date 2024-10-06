import { FC, useEffect, useState } from "react"
import Content from "./content"
import Footer from "./footer"
//import Navigation from "./nav"
import Screen from "./screen"

import { Route, Routes } from "react-router-dom"

//import Home from "@/pages/home"
//import Friends from "@/pages/friends"
//import Tasks from "@/pages/tasks"
//import Shop from "@/pages/shop"
//import Offer from "@/pages/offer"

import { WithLoader } from "@/components/loading"
//import Puzzle from "@/pages/puzzle"
import { useRegister } from "@/hooks/api/useRegister"
import { apiFetch } from "@/services/api"
import ReferralProgram from "@/pages/referral-program"
//import { useUpdateShop } from "@/hooks/api/useUpdateShop"
//import useUpdateIncome from "@/hooks/api/useUpdateIncome"
//import useUpdateReferrals from "@/hooks/api/useUpdateReferrals"
//import useUpdateTasks from "@/hooks/api/useUpdateTasks"
//import { useAllQuestsInfo } from "@/hooks/api/useAllQuestsInfo"
//import Daily from "@/pages/daily"

const INIT_DATA = ""

const Cabinet:FC = () => {

  //const { allQuestsInfo } = useAllQuestsInfo(apiFetch);
  //const { updateShop } = useUpdateShop(apiFetch);
  //const { updateReferrals } = useUpdateReferrals(apiFetch, 1, 10);
  //const { updateIncome } = useUpdateIncome(apiFetch)
  //const { updateTasks } = useUpdateTasks(apiFetch) 
  
  const [isLoading, setIsLoading] = useState(true);

  const loadResources = async () => {
    //const apiRequests = [
      //dailyQuestInfo(),  
      //allQuestsInfo(),
      //updateShop(),
      //updateIncome(),
      //updateReferrals(),
      //updateTasks()
      //
    //];
    //await Promise.all([...apiRequests],)
  }

  const { register } = useRegister(apiFetch, loadResources);
  const [isPreflight, setIsPreflight] = useState(false);
  const initData = window?.Telegram?.WebApp?.initData || INIT_DATA;

  console.log('Cabinet initData', initData);

  useEffect(() => {
    
    // Trigger a timer that waits 2 seconds before executing the register function
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the time in milliseconds as needed (1 second = 1000ms)
    // 
    if (!isPreflight) {
      setIsPreflight(true)
      register(initData)
    }
    //
    return () => clearTimeout(timer);
  }, [register, isPreflight, setIsPreflight, setIsLoading]);

return (
  <WithLoader isLoading={isLoading}>
    <Screen>
      <Content>
        <Routes>
            <Route path='/' element={<ReferralProgram/>} />
            {/* <Route path='/friends' element={<Friends/>} /> */}
            {/* <Route path='/tasks' element={<Tasks/>} /> */}
            {/* <Route path='/shop' element={<Shop/>} /> */}
            {/* <Route path='/offer' element={<Offer/>} /> */}
            {/* <Route path='/minigame' element={<Puzzle/>} /> */}
            {/* <Route path='/daily-quest' element={<Daily/>} /> */}
        </Routes>
      </Content>
      <Footer>
       {/* <Navigation /> */}
      </Footer> 
    </Screen>
  </WithLoader>)
}

export default Cabinet