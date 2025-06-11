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

### 1.  Add Scripts to the body tag in Layout component(for Next.JS App Router ) or in _app.js(for Page Router)
```bash
<body>
  <Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.es" async/>
  <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async/>
</body>
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
NOTE THIS HAS TO BE EXECUTED BEFORE WE LOAD THOSE TWO SCRIPTS
```bash
<body>
  <Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.com" async={true}/>
  <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="beforeInteractive" async={true}/>
</body>
```

### 3. Copy [YieldloveAdSlot](./src/components/YieldloveAdSlot.tsx) component and place it into yours components folder.

The YieldloveAdSlot component accepts the following props:

* adUnitCode: string - Required. The ad unit code assigned to you by Yieldlove (e.g. /53015287/yieldlove.com_hb_test_970x90_1).
* sizes: [number, number] - Required. The ad size in [width, height] format (e.g. [970, 90]).
* id: string - Required. A unique id for the div that will contain the ad. It must be unique across the page and can be any string.
* lazyLoad?: boolean - Optional. If provided, the ad will be lazy-loaded — it will only load when it enters the viewport.

### Example Usage of your ad component
```bash
<YieldloveAdSlot adUnitCode="/53015287/yieldlove.es_d_970x250_1" sizes={[1280, 180]} id="div-gpt-ad-1234567890123-0"/>
```

### Example Usage of ad component with lazy load functionality
```bash
<YieldloveAdSlot adUnitCode="/53015287/yieldlove.com_hb_test_970x90_1" sizes={[1280, 180]}
id="div-gpt-ad-1234567890123-0" lazyLoad/>
```


## About this app

In this app you will find 2 routes
- / home route with one ad
- /testPage route with 2 ads