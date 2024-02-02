'use client'
import React, { useEffect } from 'react';

// Extend the Window interface to include googletag and yieldlove_cmd
declare global {
    interface Window {
        googletag?: any; // Replace 'any' with the actual type if possible
        yieldlove_cmd?: any; // Replace 'any' with the actual type if possible
    }
}

// Define the properties expected by the YieldloveAdSlot component
interface YieldloveAdSlotProps {
    adUnitCode: string;
    sizes: Array<number>;
    id: string;
}

// Define the YieldloveAdSlot functional component
const YieldloveAdSlot: React.FC<YieldloveAdSlotProps> = ({ adUnitCode, sizes, id }) => {
    useEffect(() => {
        // Destructure googletag and yieldlove_cmd from the window object
        const { googletag, yieldlove_cmd } = window || {};

        // Push commands to googletag.cmd
        googletag.cmd.push(() => {
            // Display the ad using googletag.pubads()
            googletag.pubads().display(adUnitCode, sizes, id);
        });

        yieldlove_cmd.push(() => {
            // Clone the ad unit using YLHH.bidder
            (window as any).YLHH.bidder.cloneUnit(adUnitCode, id, {
                startAuction: true,
                skipDuplex: true,
            });
        });

        // Cleanup function to run when the component is unmounted
        return () => {
            if(googletag) {
                // Find the ad slot in the pubads and destroy it
                const adSlot = googletag?.pubads?.().getSlots().find((slot: any) => slot.getSlotElementId() === id);
                if (adSlot) {
                    googletag.destroySlots([adSlot]);
                }
            }
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount
    return (
        <div style={{paddingTop: '20px'}}>
            <p>HERE IS AD {id}</p>
            <div id={id} style={{padding: '20px'}}/>
        </div>
    );
};

export default YieldloveAdSlot;