const space = (depths, replacer = ' ', spacesCount = 4) => replacer.repeat(depths * spacesCount);

const stringify = (data, depth) => {
  if (!(data instanceof Object)) { return data; }
  const entries = Object.entries(data);
  const str = entries.map(([key, value]) => `\n${space(depth + 1)}${key}: ${stringify(value, depth + 1)}`).join('');
  return `{${str}\n${space(depth)}}`;
};

const stylish = (inputData) => {
  const inner = (data, depth) => {
    const arr = data.map((item) => {
      const nextDepth = depth + 1;
      switch (item.type) {
        case 'added': return `${space(depth)}  + ${item.key}: ${stringify(item.value, nextDepth)}`;
        case 'deleted': return `${space(depth)}  - ${item.key}: ${stringify(item.value, nextDepth)}`;
        case 'changed': return `${space(depth)}  - ${item.key}: ${stringify(item.value1, nextDepth)}\n${space(depth)}  + ${item.key}: ${stringify(item.value2, nextDepth)}`;
        case 'nested': return `${space(nextDepth)}${item.key}: {\n${inner(item.children, nextDepth)}\n${space(nextDepth)}}`;
        case 'unchanged': return `${space(depth)}    ${item.key}: ${stringify(item.value, nextDepth)}`;
        default: throw new Error(`Unknown item type: '${item.type}'!`);
      }
    });
    return arr.join('\n');
  };
  return `{\n${inner(inputData, 0)}\n}`;
};

export default stylish;
