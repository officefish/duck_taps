import { useCallback, useEffect } from "react";
import { apiFetch } from "@/services/api";
import { useUserStore } from "@/providers/user";
import { useTapsStore } from "@/providers/tap";
import { useTasksTick } from "./api/useTasksTick";

const TICK_INTERVAL = 10_000

const useTapper = () => {

    const { player } = useUserStore();
    const { 
        balance, 
        setBalance,
        regularBonus,
        isRegular,
        setRegularBonus,
        setNetworkBonus,
        setIsRegular,
        taps,
        setTaps
    } = useTapsStore()


    const onSuccess = useCallback(async (balance: number | null) => {
        setIsRegular(true)
        setRegularBonus(0)
        
        if (balance) {
            setBalance(balance)
        }
    }, [])

    const { tick } = useTasksTick(apiFetch, onSuccess);

    const touch = (touchBonus: number) => {
        
        if (!isRegular) return
        
        let tapsBonus
        
        tapsBonus = regularBonus
        tapsBonus += touchBonus
        setRegularBonus(tapsBonus)
    
        setBalance((player?.balance || 0) + touchBonus)   

        setTaps(taps + 1)
        if (taps >= 50) {
            console.log("taps " + taps)
            setTaps(0)
            farmInterval(tapsBonus)
        }
    }

    const handleTouch = (e: any) => {
        e.preventDefault()
        touch(1)  
    }

    const handleDown = () => {
        touch(1)
    }

    const farmInterval = useCallback(
        async (
            regularBonus: number, 
        ) => {

        console.log(regularBonus)
       
        tick({
            taps: regularBonus,
        })

        setIsRegular(false)
        setRegularBonus(0)
        setNetworkBonus(0)
    }, [tick, setIsRegular, setNetworkBonus])


    useEffect(() => {
        const interval = setInterval(() => farmInterval(
            regularBonus, 
        ), TICK_INTERVAL);
        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
      }, [regularBonus, player]);

    const forceTick = useCallback(() => {
        console.log("forceTick")
        farmInterval(
            regularBonus, 
        )
    }, [regularBonus, player]);

    return { handleTouch, handleDown, balance, forceTick }
};

export default useTapper;


