export const trim = (value: string, excludedSymbols: string = '') => {
    const startOrEndWith = `[ \xA0${excludedSymbols}]`;

    const reg = new RegExp(`(^${startOrEndWith}+)|(${startOrEndWith}+$)`, 'gu');

    return value.replace(reg, '');
};
