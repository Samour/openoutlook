import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

interface IProps {
  children: string;
}

export default function Markdown({ children }: IProps): JSX.Element {
  const childrenOr = children || '';

  return <MarkdownToJsx>{childrenOr.split('\n').join('<br>')}</MarkdownToJsx>;
}
