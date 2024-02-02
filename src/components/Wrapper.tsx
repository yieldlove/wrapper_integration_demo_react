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

const Wrapper: React.FC<any> = ({additionalAdd}) => {
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
            <YieldloveAdSlot adUnitCode="/53015287/yieldlove.com_hb_test_970x90_1" sizes={[1280, 180]}
                             id="div-gpt-ad-1234567890123-0"/>
            {additionalAdd&& (<YieldloveAdSlot adUnitCode="/53015287/yieldlove.com_hb_test_300x250_1" sizes={[1280, 180]}
                             id="div-gpt-ad-1234567890130-0"/>)}
        </div>
    </div>;
};

export default Wrapper;