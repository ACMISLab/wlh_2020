export default {
    getToken() {
        return window.localStorage.getItem("meedu-admin-token");
    },
    saveToken(token) {
        window.localStorage.setItem("meedu-admin-token", token);
    },
    clearToken() {
        window.localStorage.removeItem("meedu-admin-token");
    },
    saveEditorKey(key) {
        window.localStorage.setItem("meedu-editor-key", key);
    },
    getEditorKey() {
        return window.localStorage.getItem("meedu-editor-key");
    },
    exportExcel(data, filename, sheetName) {
        const XLSX = require("xlsx");
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filename);
    },
    wechatUrlRules(url) {
        if (
            !url.substring(0, 8).match("https://") &&
            !url.substring(0, 7).match("http://")
        ) {
            return "地址必须携带http://或https://协议";
        }
    },
    currentDate() {
        const Manba = require("manba");
        return Manba().format("YYYY/MM/DD h:mm:ss");
    },
    getHMS(time) {
        const hour =
            parseInt(time / 3600) < 10
                ? "0" + parseInt(time / 3600)
                : parseInt(time / 3600);
        const min =
            parseInt((time % 3600) / 60) < 10
                ? "0" + parseInt((time % 3600) / 60)
                : parseInt((time % 3600) / 60);
        const sec =
            parseInt((time % 3600) % 60) < 10
                ? "0" + parseInt((time % 3600) % 60)
                : parseInt((time % 3600) % 60);
        return hour + ":" + min + ":" + sec;
    },
    scrollTopRecord(page) {
        let pos = document.querySelector(".page-main-body-box").scrollTop;
        if (pos > 0) {
            window.localStorage.setItem(`meedu-st-${page}`, pos);
        }
    },
    scrollTopSet(page) {
        let saveKey = `meedu-st-${page}`;
        let pos = window.localStorage.getItem(saveKey);
        if (pos) {
            document.querySelector(".page-main-body-box").scrollTop = pos;
            window.localStorage.removeItem(saveKey);
        }
    },
    copyright() {
        var outs = [],
            fi = function () {
                return {
                    msg: "",
                    style: "",
                };
            };

        var oi = fi();
        oi.msg = "MeEdu - 在线教育培训解决方案";
        oi.style =
            "padding-top: 15px;padding-bottom:15px;line-height:30px;font-size:1.8rem;color:#3ca7fa";
        outs.push(oi);

        oi = fi();
        oi.msg =
            "\r\n官网：\nhttps://meedu.vip\r\n\r\nGitHub：\nhttps://github.com/qsnh/meedu\r\n\r\n使用手册：\nhttps://www.yuque.com/meedu/fvvkbf\r\n";
        outs.push(oi);

        outs.map(function (x) {
            console.log("%c" + x.msg, x.style);
        });
    },
    getUrl() {
        return (
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
        );
    },
    passwordRules(value) {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,25}$/;
        let result = re.test(value);
        if (!result) {
            return "密码至少包含大写字母，小写字母，数字，且不少于12位";
        }
    },
};

/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 表单重置
export function resetForm(refName) {
    if (this.$refs[refName]) {
        this.$refs[refName].resetFields();
    }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
    let search = params;
    search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {};
    dateRange = Array.isArray(dateRange) ? dateRange : [];
    if (typeof (propName) === 'undefined') {
        search.params['beginTime'] = dateRange[0];
        search.params['endTime'] = dateRange[1];
    } else {
        search.params['begin' + propName] = dateRange[0];
        search.params['end' + propName] = dateRange[1];
    }
    return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
    var actions = [];
    Object.keys(datas).some((key) => {
        if (datas[key].value == ('' + value)) {
            actions.push(datas[key].label);
            return true;
        }
    })
    return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
    var actions = [];
    var currentSeparator = undefined === separator ? "," : separator;
    var temp = value.split(currentSeparator);
    Object.keys(value.split(currentSeparator)).some((val) => {
        Object.keys(datas).some((key) => {
            if (datas[key].value == ('' + temp[val])) {
                actions.push(datas[key].label + currentSeparator);
            }
        })
    })
    return actions.join('').substring(0, actions.join('').length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
    var args = arguments, flag = true, i = 1;
    str = str.replace(/%s/g, function () {
        var arg = args[i++];
        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

// 数据合并
export function mergeRecursive(source, target) {
    for (var p in target) {
        try {
            if (target[p].constructor == Object) {
                source[p] = mergeRecursive(source[p], target[p]);
            } else {
                source[p] = target[p];
            }
        } catch (e) {
            source[p] = target[p];
        }
    }
    return source;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
    let config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    };

    var childrenListMap = {};
    var nodeIds = {};
    var tree = [];

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config.id]] = d;
        childrenListMap[parentId].push(d);
    }

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]];
        }
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c);
            }
        }
    }

    return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

// 验证是否为blob格式
export async function blobValidate(data) {
    try {
        const text = await data.text();
        JSON.parse(text);
        return false;
    } catch (error) {
        return true;
    }
}

