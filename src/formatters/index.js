import stylish from './stylishFormatter.js';
import plain from './plainFormatter.js';

const ast = (filesDif, formatType) => {
  switch (formatType) {
    case 'plain': return (plain(filesDif));
    case 'json': return (JSON.stringify(filesDif));
    case 'stylish': return (stylish(filesDif));
    default: throw new Error(`Unknown format: '${formatType}'!`);
  }
};

export default ast;
