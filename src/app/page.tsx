import styles from './page.module.css'
import dynamic from "next/dynamic";
import React from "react";
const Wrapper = dynamic(() => import('@/components/Wrapper'), {ssr: false});

export default function Home() {
    return (
        <main className={styles.main}>
            <h1>Demo for integrating Yieldlove with NextJS </h1>
            <Wrapper/>
        </main>
    );
}
