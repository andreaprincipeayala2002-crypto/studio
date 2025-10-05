'use client';

import { useEffect } from 'react';

interface ArticleBackgroundProps {
    imageUrl?: string;
}

export default function ArticleBackground({ imageUrl }: ArticleBackgroundProps) {
    useEffect(() => {
        const body = document.body;
        let originalBg = body.style.background;
        let originalBgSize = body.style.backgroundSize;
        let originalBgPosition = body.style.backgroundPosition;
        let originalBgAttachment = body.style.backgroundAttachment;

        if (imageUrl) {
            body.style.background = `
                radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.1), transparent 40%),
                radial-gradient(circle at 90% 80%, hsl(var(--accent) / 0.1), transparent 40%),
                url('${imageUrl}')
            `;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.backgroundAttachment = 'fixed';
        }
        return () => {
            body.style.background = originalBg;
            body.style.backgroundSize = originalBgSize;
            body.style.backgroundPosition = originalBgPosition;
            body.style.backgroundAttachment = originalBgAttachment;
        }
    }, [imageUrl]);

    return null;
}
