const assert = require('assert');

/**
 * --- 问题描述 ---
 *
 * 给定一组文件路径，找出它们共同的的父级目录
 *
 * --- 说明 ---
 *
 * - 如果不存在共同的父级目录，返回 `null`
 */

function findParentDirectory(paths) {
  if (!paths.length) return null;
  // 按照 / 分隔
  paths = paths.map(item => {
    let folder = item.split('/');
    folder.shift();
    return folder;
  });
  // 查找数组公共前缀
  let len = paths[0].length;
  for (let path of paths) {
    len = Math.min(len, path.length);
  }
  let s = paths[0].slice(0, len), idx = 1;
  while (idx < paths.length) {
    while (!checkIncludes(paths[idx], s)) {
      s = s.slice(0, s.length - 1);
      if (!s.length) return null;
    }
    idx++;
  }
  // 拼接数据
  return '/' + s.join('/');
}

function checkIncludes(parents, child) {
  for (let i = 0; i < child.length; i++) {
    if (parents[i] !== child[i]) return false;
  }
  return true;
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.strictEqual(
      findParentDirectory(['/home/admin/vue', '/home/admin/react']),
      '/home/admin'
    );
    assert.strictEqual(
      findParentDirectory([
        '/home/admin/react/src',
        '/home/admin/react',
        '/home/admin/react/src/index.js',
      ]),
      '/home/admin/react'
    );
    assert.strictEqual(findParentDirectory(['/usr/bin', '/etc/config']), null);
    return '通过';
  } catch (err) {
    return '不通过';
  }
};
