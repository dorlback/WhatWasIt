import React from 'react'

interface Props {
    htmlContent: string | null | undefined | any;
}

const HtmlRenderer: React.FC<Props> = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HtmlRenderer;