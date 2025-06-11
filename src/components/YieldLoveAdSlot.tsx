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
    lazyLoad?:boolean
}

// Define the YieldloveAdSlot functional component
const YieldloveAdSlot: React.FC<YieldloveAdSlotProps> = ({ adUnitCode, sizes, id ,lazyLoad=false}) => {
    useEffect(() => {
        // Destructure googletag and yieldlove_cmd from the window object
        const { googletag, yieldlove_cmd } = window || {};

        // Push commands to googletag.cmd
        googletag.cmd.push(() => {
            // Display the ad using googletag.pubads()
            googletag.pubads().display(adUnitCode, sizes, id);
        });

        if (lazyLoad) {
            yieldlove_cmd.push(() => {
                (window as any).YLHH.utils.lazyLoad(id, cloneAdUnit);
            })
        }else {
                yieldlove_cmd.push(() => {
                    cloneAdUnit();
                })
        };
        // Cleanup function to run when the component is unmounted
        return () => {
            googletag.cmd.push(() => {
                // Find the ad slot in the pubads and destroy it
                const adSlot = googletag.pubads().getSlots().find((slot: any) => slot.getSlotElementId() === id);
                if (adSlot) {
                    googletag.destroySlots([adSlot]);
                }
            })
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount


    const cloneAdUnit = () => {
        (window as any).YLHH.bidder.cloneUnit(adUnitCode, id, {
            startAuction: true,
            skipDuplex: true,
        });
    };
    return (
        <div style={{paddingTop: '20px'}}>
            <p>HERE IS AD {id}</p>
            <div id={id} style={{padding: '20px'}}/>
        </div>
    );
};

export default YieldloveAdSlot;