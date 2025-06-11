'use client'
import React, {useEffect} from 'react';
import dynamic from "next/dynamic";
const YieldloveAdSlot= dynamic(() => import("@/components/YieldLoveAdSlot"), {
    ssr: false,
});

declare global {
    interface Window {
        googletag?: any; // Replace 'any' with the actual type if possible
        yieldlove_cmd?: any; // Replace 'any' with the actual type if possible
        yieldlove_prevent_autostart: boolean,
        YLHH:any;
    }

}
interface WrapperProps {
    lazyLoad?:boolean
}

const Wrapper: React.FC<WrapperProps> = ({lazyLoad}) => {
    useEffect(() => {
        window.yieldlove_prevent_autostart = true;
        window.yieldlove_cmd = window.yieldlove_cmd || []
        const googletag = window.googletag || {};
        googletag.cmd = googletag.cmd || [];
        googletag.cmd.push(function () {
            googletag.pubads().disableInitialLoad();
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    }, []);

    return  <div style={{ padding: '20px'}}>
        <div>
            <YieldloveAdSlot adUnitCode="/53015287/yieldlove.es_d_970x250_1" sizes={[1280, 180]}
                             id="div-gpt-ad-1234567890123-0"/>
            {lazyLoad && (<YieldloveAdSlot adUnitCode="/53015287/yieldlove.es_d_300x600_1" sizes={[1280, 180]} id="div-gpt-ad-1234567890130-1" lazyLoad/> )}
        </div>
    </div>;
};

export default Wrapper;