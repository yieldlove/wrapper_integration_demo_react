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
  <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="beforeInteractive" async={true}/>
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
NOTE THIS HAS TO BE EXECUDED BEFORE WE LOAD THOSE DVO SCRIPTS
```bash
<head>
  <Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.com" async={true}/>
  <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="beforeInteractive" async={true}/>
</head>
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
            googletag.cmd.push(() => {
                const adSlot = googletag.pubads().getSlots().find((slot: any) => slot.getSlotElementId() === id);
                if (adSlot) {
                    googletag.destroySlots([adSlot]);
                }
            })
        };
    }, []);
```
Your Ad component should return div with id.

```bash
<div id={id} />
```

### Example Usage of your ad component
```bash
<YieldloveAdSlot adUnitCode="/53015287/yieldlove.com_hb_test_970x90_1" sizes={[1280, 180]}
id="div-gpt-ad-1234567890123-0"/>
```

### Best Practices for Ad Impression and Revenue Optimization

To maximize your ad revenue while maintaining optimal user experience in your SPA implementation, follow these important guidelines:

#### 1. Script Loading Best Practices
The following libraries should be loaded **only once** during the initial page load. Never reload these scripts during SPA navigation:
```javascript
<Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.com" async={true}/>
<Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="beforeInteractive" async={true}/>
```

#### 2. Automated Ad Slot Reloading
We strongly recommend utilizing our built-in reloading functionality to optimize ad impressions and revenue. Our setup provides two configurable options:

- **Maximum Ad Impressions**: Configure the maximum number of times an ad slot instance can be reloaded when displayed on a page. This is particularly useful when the same ad slot appears across multiple virtual pages. With automated reloading, there's no need to destroy and recreate ad slot instances during navigation.

- **Refresh Interval**: Set a customized time interval between ad refreshes. This option allows you to balance user experience with revenue optimization by controlling the frequency of ad refreshes.

> **Note**: These options can be configured by our support team. Please reach out to them to discuss the best solution for your specific needs!

#### 3. Manual Refresh Control (Advanced Usage)
For special cases where you need precise control over ad refresh timing, you can implement manual refresh functionality in your ad component. However, please note that this approach:
- Should only be used for specific requirements that cannot be met with our automated solutions
- Requires additional implementation effort
- May introduce potential bugs due to increased complexity

> **Important**: Before implementing manual refresh control, you **must** contact our support team to:
> 1. Discuss your specific use case and requirements
> 2. Have them disable the automated reloading functionality for the specific ad units you plan to control manually
> 
> This step is crucial as manual and automated reloading systems will interfere with each other if both are active.

Here's an example implementation in your ad component that exposes the refresh functionality:

```typescript
interface YieldloveAdSlotProps {
    adUnitCode: string;
    sizes: Array<number>;
    id: string;
    onRefreshReady?: (refreshFunction: () => void) => void;  // Callback to expose refresh function
}

const YieldloveAdSlot: React.FC<YieldloveAdSlotProps> = ({ adUnitCode, sizes, id, onRefreshReady }) => {
    // ... existing component code ...

    const refreshAd = () => {
        yieldlove_cmd.push(() => {
            (window as any).YLHH.bidder.startAuction([id]);
        });
    };

    // Expose the refresh function to parent components if needed
    useEffect(() => {
        if (onRefreshReady) {
            onRefreshReady(refreshAd);
        }
    }, [onRefreshReady]);

    return (
        <div id={id}>
            {/* Ad slot content */}
        </div>
    );
};

// Example usage in parent component:
const ParentComponent = () => {
    const handleRefreshReady = (refreshFunction: () => void) => {
        // Store the refresh function or use it when needed
        // For example, call it after specific user interactions or time intervals
        someEventHandler = () => {
            refreshFunction();
        };
    };

    return (
        <YieldloveAdSlot
            adUnitCode="your-ad-unit"
            sizes={[300, 250]}
            id="your-ad-id"
            onRefreshReady={handleRefreshReady}
        />
    );
};
```

> **Important**: Manual refresh implementation should only be considered when absolutely necessary. We recommend using our automated reloading functionality for most use cases to ensure optimal performance and reduce implementation complexity.

## About this app

In this app you will find 2 routes
- / home route with one ad
- /testPage route with 2 ads