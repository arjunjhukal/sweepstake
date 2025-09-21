'use client';

import { Copy } from '@wandersonalwes/iconsax-react';
import { useState } from 'react';

interface CopyToClipboardProps {
    text: string;
}

export default function CopyToClipboard({ text }: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2 sec
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    return (
        <p onClick={handleCopy} className="cursor-pointer text-primary">
            <Copy className={`transition-all cursor-pointer ${copied ? 'text-green-500' : 'text-primary'}`} />
        </p>
    );
}
