/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
var shortestToChar = function (S, C) {
    var res = Array(S.length);

    // 第一次遍历：从左往右
    // 找到出现在左侧的 C 字符的最后下标
    for (let i = 0; i < S.length; i++) {
        if (S[i] === C) res[i] = i;
        // 如果左侧没有出现 C 字符的话，用 Infinity 进行标记
        else res[i] = res[i - 1] === undefined ? Infinity : res[i - 1];
    }

    // 第二次遍历：从右往左
    // 找出现在右侧的 C 字符的最后下标
    // 如果左侧没有出现过 C 字符，或者右侧出现的 C 字符距离更近，就更新 res[i]
    for (let i = S.length - 1; i >= 0; i--) {
        if (res[i] === Infinity || res[i + 1] - i < i - res[i]) res[i] = res[i + 1];
    }

    // 计算距离
    for (let i = 0; i < res.length; i++) {
        res[i] = Math.abs(res[i] - i);
    }
    return res;
};

console.log(shortestToChar('loveleetcode', 'e'));
