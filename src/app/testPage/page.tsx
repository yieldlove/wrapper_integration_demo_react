import dynamic from "next/dynamic";
import React from "react";
const Wrapper = dynamic(() => import('@/components/Wrapper'), {ssr: false});

export default function test() {
    return (
        <main style={{ textAlign:"center"}}>
            <h1>Test page with 2 ads</h1>
            <Wrapper additionalAdd/>
        </main>
    );
}
