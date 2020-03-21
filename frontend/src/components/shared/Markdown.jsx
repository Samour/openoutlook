import React from 'react';
import PropTypes from 'prop-types';
import MarkdownToJsx from 'markdown-to-jsx';

export default class Markdown extends React.PureComponent {

  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    const children = this.props.children || '';

    return <MarkdownToJsx>{children.split('\n').join('<br>')}</MarkdownToJsx>;
  }

}
