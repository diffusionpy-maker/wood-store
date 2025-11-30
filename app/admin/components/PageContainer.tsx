'use client';

import { PageContainer as ProPageContainer } from '@ant-design/pro-layout';
import { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    title?: string;
    subTitle?: string;
    extra?: ReactNode;
}

export default function PageContainer({ children, title, subTitle, extra }: PageContainerProps) {
    return (
        <ProPageContainer
            header={{
                title,
                subTitle,
                extra,
            }}
            style={{
                padding: '24px',
            }}
        >
            {children}
        </ProPageContainer>
    );
}
