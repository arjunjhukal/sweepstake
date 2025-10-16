"use client";
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LotifyLoading() {
    return (
        <DotLottieReact
            src="/loading.json"
            loop
            autoplay
        />
    )
}
