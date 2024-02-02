This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies 

```bash
npm i
# or
yarn
# or
pnpm i

```
After it run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integrating Yieldlove into your NextJS project

### 1.  Add Scripts to the head tag / Next Head component
```bash
<head>
  <Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.com" async={true}/>
  <Script src="https://www.googletagservices.com/tag/js/gpt.js" strategy="beforeInteractive" async={true}/>
</head>
```
### 2. Add useEffect Block to Client-Side Rendered Component or Layout

Open the file where your main application logic or layout is defined , and add the following `useEffect` block:
```bash
// Import the necessary dependencies
import { useEffect } from 'react';

// Inside your component or layout...
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
```

### 3. Create component for your ads

Extend the Window interface to include googletag and yieldlove_cmd
```bash
declare global {
    interface Window {
        googletag?: any; // Replace 'any' with the actual type if possible
        yieldlove_cmd?: any; // Replace 'any' with the actual type if possible
    }
}
```

Your component should accept these params:

```bash
interface YieldloveAdSlotProps {
    adUnitCode: string;
    sizes: Array<number>;
    id: string;
}
```

Add the following `useEffect` block. It is responsible for handling the display, cloning, and cleanup of an ad.
```bash
useEffect(() => {
        const { googletag, yieldlove_cmd } = window || {};
        googletag.cmd.push(() => {
            googletag.pubads().display(adUnitCode, sizes, id);
        });

        yieldlove_cmd.push(() => {
            (window as any).YLHH.bidder.cloneUnit(adUnitCode, id, {
                startAuction: true,
                skipDuplex: true,
            });
        });

        return () => {
            if(googletag && yieldlove_cmd) {
                const adSlot = googletag?.pubads?.().getSlots().find((slot: any) => slot.getSlotElementId() === id);
                if (adSlot) {
                    googletag.destroySlots([adSlot]);
                }
            }
        };
    }, []);
```
Your Ad component should return div with id.

```bash
<div id={id} />
```


dodati ovde objasnjenje o tim parametrima->
adUnitCode - 
id
sizes
### Example Usage of your ad component
```bash
<YieldloveAdSlot adUnitCode="/53015287/yieldlove.com_hb_test_970x90_1" sizes={[1280, 180]}
id="div-gpt-ad-1234567890123-0"/>
```

## About this app

In this app you will find 2 routes
- / home route with one ad
- /testPage route with 2 ads