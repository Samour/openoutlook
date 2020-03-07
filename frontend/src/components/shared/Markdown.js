import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

export default class Markdown extends React.Component {
  render() {
    const children = this.props.children || '';

    return <MarkdownToJsx>{children.split('\n').join('<br>')}</MarkdownToJsx>;
  }
}
