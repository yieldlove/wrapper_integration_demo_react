import dynamic from "next/dynamic";
import React from "react";
const Wrapper = dynamic(() => import('@/components/Wrapper'));

export default function test() {
    return (
        <main style={{ textAlign:"center"}}>
            <h1>Test page with regular and lazy loaded ad</h1>
            <Wrapper lazyLoad/>
        </main>
    );
}
