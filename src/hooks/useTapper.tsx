import { useCallback, useEffect } from "react";
import { apiFetch } from "@/services/api";
import { useUserStore } from "@/providers/user";
import { useTapsStore } from "@/providers/tap";
import { useTasksTick } from "./api/useTasksTick";

const useTapper = () => {

    const { player } = useUserStore();
    const { 
        balance, 
        //setBalance,
        regularBonus,
        //isRegular,
        setRegularBonus,
        //setNetworkBonus,
        //setIsRegular,
        taps,
        setTaps
    } = useTapsStore()


    const onSuccess = useCallback(async () => {
        setRegularBonus(0)
    }, [])

    const { tick } = useTasksTick(apiFetch, onSuccess);

    const touch = (touchBonus: number) => {
                
        let tapsBonus
        tapsBonus = regularBonus
        tapsBonus += touchBonus
        setRegularBonus(tapsBonus)
    
        setTaps(taps + 1)
        if (taps >= 50) {
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

        //console.log('regularBonus: ' + regularBonus)
       
        tick({
            taps: regularBonus,
        })

        setRegularBonus(0)
    }, [tick])


    useEffect(() => {
        const interval = setInterval(() => farmInterval(
            regularBonus, 
        ), 10_000);
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


