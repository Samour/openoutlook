import PropTypes from 'prop-types';

const Ref = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

export default Ref;
