(function(g) {
  var __bem_xjst = function(exports) {
     var $$mode = "", $$block = "", $$elem = "", $$elemMods = null, $$mods = null;

var __$ref = {};

function apply(ctx) {
    ctx = ctx || this;
    $$mods = ctx["mods"];
    $$elemMods = ctx["elemMods"];
    $$elem = ctx["elem"];
    $$block = ctx["block"];
    $$mode = ctx["_mode"];
    try {
        return applyc(ctx, __$ref);
    } catch (e) {
        e.xjstContext = ctx;
        throw e;
    }
}

exports.apply = apply;

function applyc(__$ctx, __$ref) {
    var __$t = $$mode;
    if (__$t === "js") {
        var __$t = $$block;
        if (__$t === "todo-app") {
            if (!$$elem) {
                return true;
            }
        } else if (__$t === "todo") {
            if (!$$elem) {
                return true;
            }
        }
        return undefined;
    } else if (__$t === "tag") {
        var __$t = $$block;
        if (__$t === "todo") {
            if ($$elem === "item") {
                return "div";
            }
        } else if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                return "script";
            } else if (__$t === "css") {
                if (__$ctx.ctx.url) {
                    return "link";
                }
                return "style";
            } else if (__$t === "head") {
                return "head";
            } else if (__$t === "favicon") {
                return "link";
            } else if (__$t === "link") {
                return "link";
            } else if (__$t === "meta") {
                return "meta";
            }
            if (!$$elem) {
                return "body";
            }
        } else if (__$t === "ua") {
            if (!$$elem) {
                return "script";
            }
        }
        return undefined;
    } else if (__$t === "attrs") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                if (__$ctx.ctx.url) {
                    return {
                        src: __$ctx.ctx.url
                    };
                }
            } else if (__$t === "css") {
                if (__$ctx.ctx.url) {
                    return {
                        rel: "stylesheet",
                        href: __$ctx.ctx.url
                    };
                }
            } else if (__$t === "favicon") {
                return {
                    rel: "shortcut icon",
                    href: __$ctx.ctx.url
                };
            }
        }
        return undefined;
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                return false;
            } else if (__$t === "css") {
                return false;
            } else if (__$t === "head") {
                return false;
            } else if (__$t === "favicon") {
                return false;
            } else if (__$t === "link") {
                return false;
            } else if (__$t === "meta") {
                return false;
            }
        } else if (__$t === "ua") {
            if (!$$elem) {
                return false;
            }
        }
        return undefined;
    } else if (__$t === "default") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "css") {
                var __$t = !__$ctx.ctx._ieCommented;
                if (__$t) {
                    var __$t = __$ctx.ctx.hasOwnProperty("ie");
                    if (__$t) {
                        if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 1) === 0) {
                            var __$r = __$b27(__$ctx, __$ref);
                            if (__$r !== __$ref) return __$r;
                        }
                        var __$r = __$b28(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                }
            }
            if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 8) === 0) {
                var __$r = __$b29(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        var __$r = __$b30(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "content") {
        var __$t = $$block;
        if (__$t === "page") {
            if ($$elem === "head" && (__$ctx.__$a0 & 2) === 0) {
                return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                    tag: "meta",
                    attrs: {
                        "http-equiv": "X-UA-Compatible",
                        content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                    }
                }, function __$lb__$16() {
                    var __$r__$17;
                    var __$l0__$18 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 2;
                    __$r__$17 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$18;
                    return __$r__$17;
                }() ];
            }
            if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
                return [ function __$lb__$19() {
                    var __$r__$20;
                    var __$l0__$21 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 4;
                    __$r__$20 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$21;
                    return __$r__$20;
                }(), __$ctx.ctx.scripts ];
            }
        } else if (__$t === "ua") {
            if (!$$elem) {
                return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
            }
        }
        return __$ctx.ctx.content;
    } else if (__$t === "mix") {
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 16) === 0) {
            var __$r = __$b37(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b38(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b39(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b40(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b41(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    }
    throw new Error("Match failed, no templates found");
}

[ function(exports, context) {
    var undef, BEM_ = {}, toString = Object.prototype.toString, slice = Array.prototype.slice, isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }, SHORT_TAGS = {
        area: 1,
        base: 1,
        br: 1,
        col: 1,
        command: 1,
        embed: 1,
        hr: 1,
        img: 1,
        input: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        wbr: 1
    };
    (function(BEM, undefined) {
        var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
        function buildModPostfix(modName, modVal) {
            var res = MOD_DELIM + modName;
            if (modVal !== true) res += MOD_DELIM + modVal;
            return res;
        }
        function buildBlockClass(name, modName, modVal) {
            var res = name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        function buildElemClass(block, name, modName, modVal) {
            var res = buildBlockClass(block) + ELEM_DELIM + name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        BEM.INTERNAL = {
            NAME_PATTERN: NAME_PATTERN,
            MOD_DELIM: MOD_DELIM,
            ELEM_DELIM: ELEM_DELIM,
            buildModPostfix: buildModPostfix,
            buildClass: function(block, elem, modName, modVal) {
                var typeOfModName = typeof modName;
                if (typeOfModName === "string" || typeOfModName === "boolean") {
                    var typeOfModVal = typeof modVal;
                    if (typeOfModVal !== "string" && typeOfModVal !== "boolean") {
                        modVal = modName;
                        modName = elem;
                        elem = undef;
                    }
                } else if (typeOfModName !== "undefined") {
                    modName = undef;
                } else if (elem && typeof elem !== "string") {
                    elem = undef;
                }
                if (!(elem || modName)) {
                    return block;
                }
                return elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal);
            },
            buildModsClasses: function(block, elem, mods) {
                var res = "";
                if (mods) {
                    var modName;
                    for (modName in mods) {
                        if (!mods.hasOwnProperty(modName)) continue;
                        var modVal = mods[modName];
                        if (!modVal && modVal !== 0) continue;
                        typeof modVal !== "boolean" && (modVal += "");
                        res += " " + (elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal));
                    }
                }
                return res;
            },
            buildClasses: function(block, elem, mods) {
                var res = "";
                res += elem ? buildElemClass(block, elem) : buildBlockClass(block);
                res += this.buildModsClasses(block, elem, mods);
                return res;
            }
        };
    })(BEM_);
    var ts = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, f = function(t) {
        return ts[t] || t;
    };
    var buildEscape = function(r) {
        r = new RegExp(r, "g");
        return function(s) {
            return ("" + s).replace(r, f);
        };
    };
    context.BEMContext = BEMContext;
    function BEMContext(context, apply_) {
        this.ctx = typeof context === "undefined" ? "" : context;
        this.apply = apply_;
        this._str = "";
        var _this = this;
        this._buf = {
            push: function() {
                var chunks = slice.call(arguments).join("");
                _this._str += chunks;
            },
            join: function() {
                return this._str;
            }
        };
        this._ = this;
        this._start = true;
        this._mode = "";
        this._listLength = 0;
        this._notNewList = false;
        this.position = 0;
        this.block = undef;
        this.elem = undef;
        this.mods = undef;
        this.elemMods = undef;
    }
    BEMContext.prototype.isArray = isArray;
    BEMContext.prototype.isSimple = function isSimple(obj) {
        if (!obj || obj === true) return true;
        var t = typeof obj;
        return t === "string" || t === "number";
    };
    BEMContext.prototype.isShortTag = function isShortTag(t) {
        return SHORT_TAGS.hasOwnProperty(t);
    };
    BEMContext.prototype.extend = function extend(o1, o2) {
        if (!o1 || !o2) return o1 || o2;
        var res = {}, n;
        for (n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
        for (n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
        return res;
    };
    var cnt = 0, id = +new Date(), expando = "__" + id, get = function() {
        return "uniq" + id + ++cnt;
    };
    BEMContext.prototype.identify = function(obj, onlyGet) {
        if (!obj) return get();
        if (onlyGet || obj[expando]) {
            return obj[expando];
        } else {
            return obj[expando] = get();
        }
    };
    BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
    BEMContext.prototype.attrEscape = buildEscape('["&<>]');
    BEMContext.prototype.BEM = BEM_;
    BEMContext.prototype.isFirst = function isFirst() {
        return this.position === 1;
    };
    BEMContext.prototype.isLast = function isLast() {
        return this.position === this._listLength;
    };
    BEMContext.prototype.generateId = function generateId() {
        return this.identify(this.ctx);
    };
    var oldApply = exports.apply;
    exports.apply = BEMContext.apply = function BEMContext_apply(context) {
        var ctx = new BEMContext(context || this, oldApply);
        ctx.apply();
        return ctx._str;
    };
    BEMContext.prototype.reapply = BEMContext.apply;
} ].forEach(function(fn) {
    fn(exports, this);
}, {
    recordExtensions: function(ctx) {
        ctx["_mode"] = undefined;
        ctx["ctx"] = undefined;
        ctx["__$a0"] = 0;
        ctx["_ieCommented"] = undefined;
        ctx["_str"] = undefined;
        ctx["block"] = undefined;
        ctx["elem"] = undefined;
        ctx["_notNewList"] = undefined;
        ctx["position"] = undefined;
        ctx["_listLength"] = undefined;
        ctx["_currBlock"] = undefined;
        ctx["mods"] = undefined;
        ctx["elemMods"] = undefined;
    },
    resetApplyNext: function(ctx) {
        ctx["__$a0"] = 0;
    }
});

function __$b27(__$ctx, __$ref) {
    var url__$0 = __$ctx.ctx.url;
    var __$r__$2;
    var __$l0__$3 = $$mode;
    $$mode = "";
    var __$l1__$4 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$0 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$6;
    var __$l2__$7 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 1;
    __$r__$6 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$7;
    __$r__$2 = __$r__$6;
    $$mode = __$l0__$3;
    __$ctx.ctx = __$l1__$4;
    return;
}

function __$b28(__$ctx, __$ref) {
    var ie__$8 = __$ctx.ctx.ie, hideRule__$9 = !ie__$8 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$8 === "!IE" ? [ ie__$8, "<!-->", "<!--" ] : [ ie__$8, "", "" ];
    var __$r__$11;
    var __$l0__$12 = $$mode;
    $$mode = "";
    var __$l3__$13 = __$ctx.ctx;
    var __$l1__$14 = __$l3__$13._ieCommented;
    __$l3__$13._ieCommented = true;
    var __$l2__$15 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$9[0] + "]>" + hideRule__$9[1], __$ctx.ctx, hideRule__$9[2] + "<![endif]-->" ];
    __$r__$11 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$12;
    __$l3__$13._ieCommented = __$l1__$14;
    __$ctx.ctx = __$l2__$15;
    return;
}

function __$b29(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$22 = __$ctx.ctx;
    var __$r__$24;
    var __$l0__$25 = $$mode;
    $$mode = "";
    var __$l1__$26 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$22.doctype || "<!DOCTYPE html>", {
        tag: "html",
        cls: "ua_js_no",
        content: [ {
            elem: "head",
            content: [ {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }, {
                tag: "title",
                content: ctx__$22.title
            }, {
                block: "ua"
            }, ctx__$22.head, ctx__$22.styles, ctx__$22.favicon ? {
                elem: "favicon",
                url: ctx__$22.favicon
            } : "" ]
        }, ctx__$22 ]
    } ];
    var __$r__$28;
    var __$l2__$29 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 8;
    __$r__$28 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$29;
    __$r__$24 = __$r__$28;
    $$mode = __$l0__$25;
    __$ctx.ctx = __$l1__$26;
    __$ctx._defPageApplied = false;
    return;
}

function __$b30(__$ctx, __$ref) {
    var BEM_INTERNAL__$30 = __$ctx.BEM.INTERNAL, ctx__$31 = __$ctx.ctx, isBEM__$32, tag__$33, res__$34;
    var __$r__$36;
    var __$l0__$37 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$38 = $$block;
    var __$r__$40;
    var __$l1__$41 = $$mode;
    $$mode = "tag";
    __$r__$40 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$41;
    tag__$33 = __$r__$40;
    typeof tag__$33 !== "undefined" || (tag__$33 = ctx__$31.tag);
    typeof tag__$33 !== "undefined" || (tag__$33 = "div");
    if (tag__$33) {
        var jsParams__$42, js__$43;
        if (vBlock__$38 && ctx__$31.js !== false) {
            var __$r__$44;
            var __$l2__$45 = $$mode;
            $$mode = "js";
            __$r__$44 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$45;
            js__$43 = __$r__$44;
            js__$43 = js__$43 ? __$ctx.extend(ctx__$31.js, js__$43 === true ? {} : js__$43) : ctx__$31.js === true ? {} : ctx__$31.js;
            js__$43 && ((jsParams__$42 = {})[BEM_INTERNAL__$30.buildClass(vBlock__$38, ctx__$31.elem)] = js__$43);
        }
        __$ctx._str += "<" + tag__$33;
        var __$r__$46;
        var __$l3__$47 = $$mode;
        $$mode = "bem";
        __$r__$46 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$47;
        isBEM__$32 = __$r__$46;
        typeof isBEM__$32 !== "undefined" || (isBEM__$32 = typeof ctx__$31.bem !== "undefined" ? ctx__$31.bem : ctx__$31.block || ctx__$31.elem);
        var __$r__$49;
        var __$l4__$50 = $$mode;
        $$mode = "cls";
        __$r__$49 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$50;
        var cls__$48 = __$r__$49;
        cls__$48 || (cls__$48 = ctx__$31.cls);
        var addJSInitClass__$51 = ctx__$31.block && jsParams__$42 && !ctx__$31.elem;
        if (isBEM__$32 || cls__$48) {
            __$ctx._str += ' class="';
            if (isBEM__$32) {
                __$ctx._str += BEM_INTERNAL__$30.buildClasses(vBlock__$38, ctx__$31.elem, ctx__$31.elemMods || ctx__$31.mods);
                var __$r__$53;
                var __$l5__$54 = $$mode;
                $$mode = "mix";
                __$r__$53 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$54;
                var mix__$52 = __$r__$53;
                ctx__$31.mix && (mix__$52 = mix__$52 ? [].concat(mix__$52, ctx__$31.mix) : ctx__$31.mix);
                if (mix__$52) {
                    var visited__$55 = {}, visitedKey__$56 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$55[visitedKey__$56(vBlock__$38, $$elem)] = true;
                    __$ctx.isArray(mix__$52) || (mix__$52 = [ mix__$52 ]);
                    for (var i__$57 = 0; i__$57 < mix__$52.length; i__$57++) {
                        var mixItem__$58 = mix__$52[i__$57], hasItem__$59 = mixItem__$58.block || mixItem__$58.elem, mixBlock__$60 = mixItem__$58.block || mixItem__$58._block || $$block, mixElem__$61 = mixItem__$58.elem || mixItem__$58._elem || $$elem;
                        hasItem__$59 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$30[hasItem__$59 ? "buildClasses" : "buildModsClasses"](mixBlock__$60, mixItem__$58.elem || mixItem__$58._elem || (mixItem__$58.block ? undefined : $$elem), mixItem__$58.elemMods || mixItem__$58.mods);
                        if (mixItem__$58.js) {
                            (jsParams__$42 || (jsParams__$42 = {}))[BEM_INTERNAL__$30.buildClass(mixBlock__$60, mixItem__$58.elem)] = mixItem__$58.js === true ? {} : mixItem__$58.js;
                            addJSInitClass__$51 || (addJSInitClass__$51 = mixBlock__$60 && !mixItem__$58.elem);
                        }
                        if (hasItem__$59 && !visited__$55[visitedKey__$56(mixBlock__$60, mixElem__$61)]) {
                            visited__$55[visitedKey__$56(mixBlock__$60, mixElem__$61)] = true;
                            var __$r__$63;
                            var __$l6__$64 = $$mode;
                            $$mode = "mix";
                            var __$l7__$65 = $$block;
                            $$block = mixBlock__$60;
                            var __$l8__$66 = $$elem;
                            $$elem = mixElem__$61;
                            __$r__$63 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$64;
                            $$block = __$l7__$65;
                            $$elem = __$l8__$66;
                            var nestedMix__$62 = __$r__$63;
                            if (nestedMix__$62) {
                                for (var j__$67 = 0; j__$67 < nestedMix__$62.length; j__$67++) {
                                    var nestedItem__$68 = nestedMix__$62[j__$67];
                                    if (!nestedItem__$68.block && !nestedItem__$68.elem || !visited__$55[visitedKey__$56(nestedItem__$68.block, nestedItem__$68.elem)]) {
                                        nestedItem__$68._block = mixBlock__$60;
                                        nestedItem__$68._elem = mixElem__$61;
                                        mix__$52.splice(i__$57 + 1, 0, nestedItem__$68);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$48 && (__$ctx._str += isBEM__$32 ? " " + cls__$48 : cls__$48);
            __$ctx._str += addJSInitClass__$51 ? ' i-bem"' : '"';
        }
        if (isBEM__$32 && jsParams__$42) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$42)) + '"';
        }
        var __$r__$70;
        var __$l9__$71 = $$mode;
        $$mode = "attrs";
        __$r__$70 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$71;
        var attrs__$69 = __$r__$70;
        attrs__$69 = __$ctx.extend(attrs__$69, ctx__$31.attrs);
        if (attrs__$69) {
            var name__$72, attr__$73;
            for (name__$72 in attrs__$69) {
                attr__$73 = attrs__$69[name__$72];
                if (typeof attr__$73 === "undefined") continue;
                __$ctx._str += " " + name__$72 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$73) ? attr__$73 : __$ctx.reapply(attr__$73)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$33)) {
        __$ctx._str += "/>";
    } else {
        tag__$33 && (__$ctx._str += ">");
        var __$r__$75;
        var __$l10__$76 = $$mode;
        $$mode = "content";
        __$r__$75 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$76;
        var content__$74 = __$r__$75;
        if (content__$74 || content__$74 === 0) {
            isBEM__$32 = vBlock__$38 || $$elem;
            var __$r__$77;
            var __$l11__$78 = $$mode;
            $$mode = "";
            var __$l12__$79 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$80 = __$ctx.position;
            __$ctx.position = isBEM__$32 ? 1 : __$ctx.position;
            var __$l14__$81 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$32 ? 1 : __$ctx._listLength;
            var __$l15__$82 = __$ctx.ctx;
            __$ctx.ctx = content__$74;
            __$r__$77 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$78;
            __$ctx._notNewList = __$l12__$79;
            __$ctx.position = __$l13__$80;
            __$ctx._listLength = __$l14__$81;
            __$ctx.ctx = __$l15__$82;
        }
        tag__$33 && (__$ctx._str += "</" + tag__$33 + ">");
    }
    res__$34 = __$ctx._str;
    __$r__$36 = undefined;
    __$ctx._str = __$l0__$37;
    __$ctx._buf.push(res__$34);
    return;
}

function __$b37(__$ctx, __$ref) {
    var __$r__$84;
    var __$l0__$85 = $$mode;
    $$mode = "";
    var __$l1__$86 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$88;
    var __$l2__$89 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16;
    __$r__$88 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$89;
    __$r__$84 = __$r__$88;
    $$mode = __$l0__$85;
    __$ctx.ctx = __$l1__$86;
    return;
}

function __$b38(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$90 = __$ctx.ctx;
    if (ctx__$90 && ctx__$90 !== true || ctx__$90 === 0) {
        __$ctx._str += ctx__$90 + "";
    }
    return;
}

function __$b39(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b40(__$ctx, __$ref) {
    var ctx__$91 = __$ctx.ctx, len__$92 = ctx__$91.length, i__$93 = 0, prevPos__$94 = __$ctx.position, prevNotNewList__$95 = __$ctx._notNewList;
    if (prevNotNewList__$95) {
        __$ctx._listLength += len__$92 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$92;
    }
    __$ctx._notNewList = true;
    while (i__$93 < len__$92) (function __$lb__$96() {
        var __$r__$97;
        var __$l0__$98 = __$ctx.ctx;
        __$ctx.ctx = ctx__$91[i__$93++];
        __$r__$97 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$98;
        return __$r__$97;
    })();
    prevNotNewList__$95 || (__$ctx.position = prevPos__$94);
    return;
}

function __$b41(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$99 = __$ctx.ctx.block, vElem__$100 = __$ctx.ctx.elem, block__$101 = __$ctx._currBlock || $$block;
    var __$r__$103;
    var __$l0__$104 = $$mode;
    $$mode = "default";
    var __$l1__$105 = $$block;
    $$block = vBlock__$99 || (vElem__$100 ? block__$101 : undefined);
    var __$l2__$106 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$99 || vElem__$100 ? undefined : block__$101;
    var __$l3__$107 = $$elem;
    $$elem = vElem__$100;
    var __$l4__$108 = $$mods;
    $$mods = vBlock__$99 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$109 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$103 = undefined;
    $$mode = __$l0__$104;
    $$block = __$l1__$105;
    __$ctx._currBlock = __$l2__$106;
    $$elem = __$l3__$107;
    $$mods = __$l4__$108;
    $$elemMods = __$l5__$109;
    return;
};
     return exports;
  }
  var defineAsGlobal = true;
  if(typeof exports === "object") {
    exports["BEMHTML"] = __bem_xjst({});
    defineAsGlobal = false;
  }
  if(typeof modules === "object") {
    modules.define("BEMHTML",
      function(provide) {
        provide(__bem_xjst({})) });
    defineAsGlobal = false;
  }
  defineAsGlobal && (g["BEMHTML"] = __bem_xjst({}));
})(this);