const assert = require('assert');

const question = '重新排列一个字符串，使得每个相邻字符都不同，列出所有情况';

// 字符串只包含小写字母或者数字

function reorganize(str) {
  let res = perm(str);
  return res;
}

function perm(s) {
  let result = [];
  if (s.length <= 1) {
    return [s];
  } else {
    // 用一个全排列
    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      let newStr = s.slice(0, i) + s.slice(i + 1, s.length);
      let l = perm(newStr);

      for (let j = 0; j < l.length; j++) {
        let tmp = c + l[j];
        if (c !== l[j][0] && !result.includes(tmp)) result.push(tmp);
      }
    }
  }
  return result;
};

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.deepStrictEqual(reorganize('aabb').sort(), ['abab', 'baba']);
    assert.deepStrictEqual(reorganize('aaabbbb').sort(), ['bababab']);
    assert.deepStrictEqual(reorganize('aabbbc').sort(), [
      'ababcb',
      'abcbab',
      'bababc',
      'babacb',
      'babcab',
      'babcba',
      'bacbab',
      'bcabab',
      'bcbaba',
      'cbabab',
    ]);
    assert.deepStrictEqual(reorganize('1bbbbb'), []);
    return '通过';
  } catch (ex) {
    return '不通过';
  }
};
