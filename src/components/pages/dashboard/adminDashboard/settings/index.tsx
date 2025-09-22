"use client";

import PageHeader from '@/components/molecules/PageHeader'
import React, { useState } from 'react'
import SiteSetting from './SiteSetting'
import AdminProfile from './AdminProfile'
import BannerSlider from './BannerSlider';

export default function SettingPage() {
    // Track the active tab index
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { title: "Site Settings", content: <SiteSetting /> },
        { title: "My Profile", content: <AdminProfile /> },
        { title: "Banner Slider", content: <BannerSlider /> },
    ];

    return (
        <>
            <PageHeader title="Settings" />

            <section className="site__setting__tab">
                {/* Tab Buttons */}
                <ul className="tab__controller flex border-b border-gray-300">
                    {tabs.map((tab, index) => (
                        <li key={index}>
                            <span
                                onClick={() => setActiveTab(index)}
                                className={`tab__link  font-[600] text-[1rem] cursor-pointer relative block py-3 px-4
                                    ${activeTab === index ? 'active' : ''}`}
                            >
                                {tab.title}

                            </span>
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                <div className="tab__content__wrapper mt-6">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab__content ${activeTab === index ? 'block' : 'hidden'}`}
                        >
                            {tab.content}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
