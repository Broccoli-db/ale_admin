import Cookies from "js-cookie";

const TokenKey = "ale_admin_token";
export function getToken() {
  return Cookies.get(TokenKey);
}
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}
/*
  设置根节点字体大小
*/
export const setRootFontSize = () => {
  const resizeObserver = new ResizeObserver((entries) => {
    requestAnimationFrame(() => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        document.documentElement.style.fontSize = `${width / 100}px`;
      }
    });
  });
  return resizeObserver.observe(document.body);
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}
export const errorCode = {
  401: "认证失败，无法访问系统资源",
  403: "当前操作没有权限",
  404: "访问资源不存在",
  default: "系统未知错误，请反馈给管理员",
};
const sessionCache = {
  set(key, value) {
    if (!sessionStorage) {
      return;
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value);
    }
  },
  get(key) {
    if (!sessionStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return sessionStorage.getItem(key);
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  getJSON(key) {
    const value = this.get(key);
    if (value != null) {
      return JSON.parse(value);
    }
    return null;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
};
const localCache = {
  set(key, value) {
    if (!localStorage) {
      return;
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value);
    }
  },
  get(key) {
    if (!localStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return localStorage.getItem(key);
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  getJSON(key) {
    const value = this.get(key);
    if (value != null) {
      return JSON.parse(value);
    }
    return null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
export const cache = {
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
};
// 设置水印
export const setWaterMark = (str = "", op = 0, addEEl = document.body) => {
  let id = Symbol("watermark").toString();
  if (document.getElementById(id)) {
    addEEl.removeChild(document.getElementById(id));
  }
  const can = document.createElement("canvas");
  can.width = 200;
  can.height = 100;
  const ctx = can.getContext("2d");
  if (ctx) {
    ctx.rotate((-15 * Math.PI) / 180); //设置角度为 -15度
    ctx.font = "14px Microsoft Yahei";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.textBaseline = "middle";
    ctx.fillText(str, can.width / 10, can.height / 2);
  }
  const div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.zIndex = "100000000000000000";
  div.style.width = `${document.documentElement.clientWidth}px`;
  div.style.height = `${document.documentElement.clientHeight}px`;
  div.style.background = `url(${can.toDataURL("image/png")}) repeat`;
  div.style.opacity = 0.3;
  addEEl.appendChild(div);
};
// 获取指定元素的实时宽高
export function getBodySize(el, callback) {
  const observe = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      callback(width, height);
    }
  });
  observe.observe(el);
  return () => {
    observe.disconnect();
  };
}