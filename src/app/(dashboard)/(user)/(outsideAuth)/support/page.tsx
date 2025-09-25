import Link from "next/link";
import React from "react";

export default function Support() {
	return (
		<section className="support__root">
			<div className="section__title mb-8">
				<h1 className="text-[26px] lg:text-[32px] mb-2">
					Need any Assistance?
				</h1>
				<p className="text-[11px] lg:text-[14px]">
					Here goes the subtitle or description on the assistance need.
				</p>
			</div>

			<div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
				<div
					className="p-6 rounded-[24px]"
					style={{ background: "rgba(255, 255, 255, 0.04)" }}>
					<img
						src="/assets/images/chat.svg"
						alt="chat"
						className="w-[32px] h-[32px] mb-8"
					/>
					<h2 className="mb-2 text-[20px]">Live Chat (Fastest)</h2>
					<p className="mb-8 text-[11px]">
						Here goes the subtitle or description on the assistance need.
					</p>
					<a
						href="#"
						className="inline-block text-center px-[22px] py-[11px] rounded-[28px]"
						style={{
							background: "linear-gradient(90deg, #B100B8 0%, #F335ED 100%)",
						}}>
						Start Live Chat
					</a>
				</div>
				<div
					className="p-6 rounded-[24px]"
					style={{ background: "rgba(255, 255, 255, 0.04)" }}>
					<img
						src="/assets/images/support.svg"
						alt=""
						className="w-[32px] h-[32px] mb-8"
					/>
					<h2 className="mb-2 text-[20px]">Customer Support</h2>
					<p className="text-[11px] mb-8">
						Questions about your account or gameplay? Our team is here for you.
					</p>
					<Link href="#" className="underline">support@sweepstakeonline.com</Link>
				</div>
				<div
					className="p-6 rounded-[24px]"
					style={{ background: "rgba(255, 255, 255, 0.04)" }}>
					<img
						src="/assets/images/technical.svg"
						alt=""
						className="w-[32px] h-[32px] mb-8"
					/>
					<h2 className="mb-2 text-[20px]">Technical Support</h2>
					<p className="text-[11px] mb-8">
						Questions about your account or gameplay? Our team is here for you.
					</p>
					<Link href="#" className="underline">technical@sweepstakeonline.com</Link>
				</div>
			</div>
		</section>
	);
}
