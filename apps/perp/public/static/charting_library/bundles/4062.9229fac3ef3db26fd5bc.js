(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [4062],
  {
    60676: (e, t, r) => {
            r.d(t, {
        A: () => _,
        B: () => y,
        C: () => k,
        D: () => b,
        E: () => u,
        F: () => U,
        G: () => W,
        H: () => A,
        J: () => F,
        K: () => X,
        L: () => ee,
        M: () => te,
        N: () => Z,
        O: () => ne,
        P: () => L,
        Q: () => x,
        R: () => j,
        S: () => B,
        T: () => R,
        U: () => oe,
        Y: () => V,
        _: () => J,
        a: () => H,
        a3: () => re,
        b: () => $,
        d: () => q,
        e: () => M,
        f: () => K,
        g: () => G,
        h: () => Y,
        i: () => m,
        j: () => D,
        k: () => a,
        l: () => w,
        m: () => S,
        n: () => P,
        o: () => h,
        p: () => l,
        q: () => v,
        r: () => f,
        s: () => T,
        t: () => c,
        u: () => d,
        v: () => C,
        y: () => E,
        z: () => O,
      });
      const n = r(49209);
      const o = r(15882);
      const i = r(75880);
      const s = (e, t) => {
        let r;
        void 0 === t && (t = !0);
        const o = new Promise((n) => {
          r = setTimeout(n, e, t);
        });
        return (
          (o[n.CANCEL] = () => {
            clearTimeout(r);
          }),
          o
        );
      };
      const a = ((e) => () => e)(!0);
      const c = () => {};
      const u = (e) => e;
      "function" === typeof Symbol &&
        Symbol.asyncIterator &&
        Symbol.asyncIterator;
      const l = (e, t) => {
          (0, o.default)(e, t),
            Object.getOwnPropertySymbols?.(t).forEach((r) => {
                e[r] = t[r];
              });
        };
      const d = (e, t) => {
          let r;
          return (r = []).concat.apply(r, t.map(e));
        };
      function f(e, t) {
        const r = e.indexOf(t);
        r >= 0 && e.splice(r, 1);
      }
      function h(e) {
        let t = !1;
        return () => {
          t || ((t = !0), e());
        };
      }
      const g = (e) => {
          throw e;
        };
      const p = (e) => ({ value: e, done: !0 });
      function v(e, t, r) {
        void 0 === t && (t = g), void 0 === r && (r = "iterator");
        const n = {
          meta: { name: r },
          next: e,
          throw: t,
          return: p,
          isSagaIterator: !0,
        };
        return (
          "undefined" !== typeof Symbol &&
            (n[Symbol.iterator] = () => n),
          n
        );
      }
      function y(e, t) {
        const r = t.sagaStack;
        console.error(e), console.error(r);
      }
      const m = (e) => new Error(
            `\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: ${e}\n`,
          );
      const S = (e) => Array.apply(null, new Array(e));
      const b = (e) => (t) => e(Object.defineProperty(t, n.SAGA_ACTION, { value: !0 }));
      const O = (e) => e === n.TERMINATE;
      const E = (e) => e === n.TASK_CANCEL;
      const T = (e) => O(e) || E(e);
      function w(e, t) {
        const r = Object.keys(e);
        const n = r.length;
        let o;
        let s = 0;
        const a = (0, i.array)(e) ? S(n) : {};
        const u = {};
        return (
          r.forEach((e) => {
            const r = (r, i) => {
              o ||
                (i || T(r)
                  ? (t.cancel(), t(r, i))
                  : ((a[e] = r), ++s === n && ((o = !0), t(a))));
            };
            (r.cancel = c), (u[e] = r);
          }),
          (t.cancel = () => {
            o ||
              ((o = !0),
              r.forEach((e) => u[e].cancel()));
          }),
          u
        );
      }
      function D(e) {
        return { name: e.name || "anonymous", location: C(e) };
      }
      function C(e) {
        return e[n.SAGA_LOCATION];
      }
      const I = { isEmpty: a, put: c, take: c };
      function N(e, t) {
        void 0 === e && (e = 10);
        let r = new Array(e);
        let n = 0;
        let o = 0;
        let i = 0;
        const s = (t) => {
            (r[o] = t), (o = (o + 1) % e), n++;
          };
        const a = () => {
            if (0 !== n) {
              const t = r[i];
              return (r[i] = null), n--, (i = (i + 1) % e), t;
            }
          };
        const c = () => {
            for (const e = []; n; ) e.push(a());
            return e;
          };
        return {
          isEmpty: () => 0 === n,
          put: (a) => {
            let u;
            if (n < e) s(a);
            else
              switch (t) {
                case 1:
                  throw new Error("Channel's Buffer overflow!");
                case 3:
                  (r[o] = a), (i = o = (o + 1) % e);
                  break;
                case 4:
                  (u = 2 * e),
                    (r = c()),
                    (n = r.length),
                    (o = r.length),
                    (i = 0),
                    (r.length = u),
                    (e = u),
                    s(a);
              }
          },
          take: a,
          flush: c,
        };
      }
      const P = () => I;
      const x = (e) => N(e, 3);
      const M = (e) => N(e, 4);
      const A = Object.freeze({
          __proto__: null,
          none: P,
          fixed: (e) => N(e, 1),
          dropping: (e) => N(e, 2),
          sliding: x,
          expanding: M,
        });
      const R = "TAKE";
      const L = "PUT";
      const _ = "ALL";
      const j = "RACE";
      const k = "CALL";
      const H = "CPS";
      const U = "FORK";
      const F = "JOIN";
      const $ = "CANCEL";
      const B = "SELECT";
      const q = "ACTION_CHANNEL";
      const K = "CANCELLED";
      const G = "FLUSH";
      const W = "GET_CONTEXT";
      const Y = "SET_CONTEXT";
      const z = (e, t) => {
          let r;
          return (
            ((r = {})[n.IO] = !0),
            (r.combinator = !1),
            (r.type = e),
            (r.payload = t),
            r
          );
        };
      function X(e, t) {
        return (
          void 0 === e && (e = "*"),
          (0, i.pattern)(e)
            ? z(R, { pattern: e })
            : (0, i.multicast)(e) && (0, i.notUndef)(t) && (0, i.pattern)(t)
            ? z(R, { channel: e, pattern: t })
            : (0, i.channel)(e)
            ? z(R, { channel: e })
            : void 0
        );
      }
      function V(e, t) {
        return (
          (0, i.undef)(t) && ((t = e), (e = void 0)),
          z(L, { channel: e, action: t })
        );
      }
      function J(e) {
        const t = z(_, e);
        return (t.combinator = !0), t;
      }
      function Q(e, t) {
        let r;
        let n = null;
        return (
          (0, i.func)(e)
            ? (r = e)
            : ((0, i.array)(e)
                ? ((n = e[0]), (r = e[1]))
                : ((n = e.context), (r = e.fn)),
              n && (0, i.string)(r) && (0, i.func)(n[r]) && (r = n[r])),
          { context: n, fn: r, args: t }
        );
      }
      function Z(e) {
        for (
          let t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        return z(k, Q(e, r));
      }
      function ee(e) {
        for (
          let t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        return z(U, Q(e, r));
      }
      function te(e) {
        return void 0 === e && (e = n.SELF_CANCELLATION), z($, e);
      }
      function re(e) {
        void 0 === e && (e = u);
        for (
          let t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        return z(B, { selector: e, args: r });
      }
      function ne(e, t) {
        return z(q, { pattern: e, buffer: t });
      }
      const oe = Z.bind(null, s);
    },
    75880: (e, t, r) => {
            r.d(t, {
        array: () => c,
        channel: () => f,
        func: () => s,
        iterator: () => l,
        multicast: () => p,
        notUndef: () => i,
        pattern: () => d,
        promise: () => u,
        string: () => a,
        stringableFunc: () => h,
        symbol: () => g,
        undef: () => o,
      });
      const n = r(49209);
      const o = (e) => null == e;
      const i = (e) => null != e;
      const s = (e) => "function" === typeof e;
      const a = (e) => "string" === typeof e;
      const c = Array.isArray;
      const u = (e) => e && s(e.then);
      const l = (e) => e && s(e.next) && s(e.throw);
      const d = function e(t) {
          return t && (a(t) || g(t) || s(t) || (c(t) && t.every(e)));
        };
      const f = (e) => e && s(e.take) && s(e.close);
      const h = (e) => s(e) && e.hasOwnProperty("toString");
      const g = (e) => (
            Boolean(e) &&
            "function" === typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
          );
      const p = (e) => f(e) && e[n.MULTICAST];
    },
    49209: (e, t, r) => {
            r.d(t, {
        CANCEL: () => o,
        CHANNEL_END_TYPE: () => i,
        IO: () => s,
        MATCH: () => a,
        MULTICAST: () => c,
        SAGA_ACTION: () => u,
        SAGA_LOCATION: () => g,
        SELF_CANCELLATION: () => l,
        TASK: () => d,
        TASK_CANCEL: () => f,
        TERMINATE: () => h,
      });
      const n = (e) => `@@redux-saga/${e}`;
      const o = n("CANCEL_PROMISE");
      const i = n("CHANNEL_END");
      const s = n("IO");
      const a = n("MATCH");
      const c = n("MULTICAST");
      const u = n("SAGA_ACTION");
      const l = n("SELF_CANCELLATION");
      const d = n("TASK");
      const f = n("TASK_CANCEL");
      const h = n("TERMINATE");
      const g = n("LOCATION");
    },
    59142: (e, t) => {
      let r;
      let n;
      let o;
      (n = [t]),
        (r = (e) => {
                    function t(e) {
            if (Array.isArray(e)) {
              for (let t = 0, r = Array(e.length); t < e.length; t++)
                r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          Object.defineProperty(e, "__esModule", { value: !0 });
          let r = !1;
          if ("undefined" !== typeof window) {
            const n = {
              get passive() {
                r = !0;
              },
            };
            window.addEventListener("testPassive", null, n),
              window.removeEventListener("testPassive", null, n);
          }
          const o =
              "undefined" !== typeof window &&
              window.navigator &&
              window.navigator.platform &&
              /iP(ad|hone|od)/.test(window.navigator.platform);
          let i = [];
          let s = !1;
          let a = -1;
          let c = void 0;
          let u = void 0;
          const l = (e) => i.some((t) => !(
                  !t.options.allowTouchMove || !t.options.allowTouchMove(e)
                ));
          const d = (e) => {
              const t = e || window.event;
              return (
                !!l(t.target) ||
                1 < t.touches.length ||
                (t.preventDefault?.(), !1)
              );
            };
          const f = () => {
              setTimeout(() => {
                void 0 !== u &&
                  ((document.body.style.paddingRight = u), (u = void 0)),
                  void 0 !== c &&
                    ((document.body.style.overflow = c), (c = void 0));
              });
            };
          (e.disableBodyScroll = (e, n) => {
            if (o) {
              if (!e)
                return void console.error(
                  "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.",
                );
              if (
                e &&
                !i.some((t) => t.targetElement === e)
              ) {
                const f = { targetElement: e, options: n || {} };
                (i = [].concat(t(i), [f])),
                  (e.ontouchstart = (e) => {
                    1 === e.targetTouches.length &&
                      (a = e.targetTouches[0].clientY);
                  }),
                  (e.ontouchmove = (t) => {
                    let r;
                    let n;
                    let o;
                    let i;
                    1 === t.targetTouches.length &&
                      ((n = e),
                      (i = (r = t).targetTouches[0].clientY - a),
                      !l(r.target) &&
                        ((n && 0 === n.scrollTop && 0 < i) ||
                        ((o = n) &&
                          o.scrollHeight - o.scrollTop <= o.clientHeight &&
                          i < 0)
                          ? d(r)
                          : r.stopPropagation()));
                  }),
                  s ||
                    (document.addEventListener(
                      "touchmove",
                      d,
                      r ? { passive: !1 } : void 0,
                    ),
                    (s = !0));
              }
            } else {
              (g = n),
                setTimeout(() => {
                  if (void 0 === u) {
                    const e = !!g && !0 === g.reserveScrollBarGap;
                    const t =
                        window.innerWidth -
                        document.documentElement.clientWidth;
                    e &&
                      0 < t &&
                      ((u = document.body.style.paddingRight),
                      (document.body.style.paddingRight = `${t}px`));
                  }
                  void 0 === c &&
                    ((c = document.body.style.overflow),
                    (document.body.style.overflow = "hidden"));
                });
              const h = { targetElement: e, options: n || {} };
              i = [].concat(t(i), [h]);
            }
            let g;
          }),
            (e.clearAllBodyScrollLocks = () => {
              o
                ? (i.forEach((e) => {
                    (e.targetElement.ontouchstart = null),
                      (e.targetElement.ontouchmove = null);
                  }),
                  s &&
                    (document.removeEventListener(
                      "touchmove",
                      d,
                      r ? { passive: !1 } : void 0,
                    ),
                    (s = !1)),
                  (i = []),
                  (a = -1))
                : (f(), (i = []));
            }),
            (e.enableBodyScroll = (e) => {
              if (o) {
                if (!e)
                  return void console.error(
                    "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.",
                  );
                (e.ontouchstart = null),
                  (e.ontouchmove = null),
                  (i = i.filter((t) => t.targetElement !== e)),
                  s &&
                    0 === i.length &&
                    (document.removeEventListener(
                      "touchmove",
                      d,
                      r ? { passive: !1 } : void 0,
                    ),
                    (s = !1));
              } else
                1 === i.length && i[0].targetElement === e
                  ? (f(), (i = []))
                  : (i = i.filter((t) => t.targetElement !== e));
            });
        }),
        void 0 === (o = "function" === typeof r ? r.apply(t, n) : r) ||
          (e.exports = o);
    },
    3341: (e) => {
            e.exports = function e(t, r) {
        if (t === r) return !0;
        if (t && r && "object" === typeof t && "object" === typeof r) {
          if (t.constructor !== r.constructor) return !1;
          let n;
          let o;
          let i;
          if (Array.isArray(t)) {
            if ((n = t.length) !== r.length) return !1;
            for (o = n; 0 !== o--; ) if (!e(t[o], r[o])) return !1;
            return !0;
          }
          if (t.constructor === RegExp)
            return t.source === r.source && t.flags === r.flags;
          if (t.valueOf !== Object.prototype.valueOf)
            return t.valueOf() === r.valueOf();
          if (t.toString !== Object.prototype.toString)
            return t.toString() === r.toString();
          if ((n = (i = Object.keys(t)).length) !== Object.keys(r).length)
            return !1;
          for (o = n; 0 !== o--; )
            if (!Object.prototype.hasOwnProperty.call(r, i[o])) return !1;
          for (o = n; 0 !== o--; ) {
            const s = i[o];
            if (!e(t[s], r[s])) return !1;
          }
          return !0;
        }
        return t !== t && r !== r;
      };
    },
    72535: (e, t, r) => {
            const n = r(56237);
            const o = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        };
            const i = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        };
            const s = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        };
            const a = {};
      function c(e) {
        return n.isMemo(e) ? s : a[e.$$typeof] || o;
      }
      (a[n.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
        (a[n.Memo] = s);
      const u = Object.defineProperty;
      const l = Object.getOwnPropertyNames;
      const d = Object.getOwnPropertySymbols;
      const f = Object.getOwnPropertyDescriptor;
      const h = Object.getPrototypeOf;
      const g = Object.prototype;
      e.exports = function e(t, r, n) {
        if ("string" !== typeof r) {
          if (g) {
            const o = h(r);
            o && o !== g && e(t, o, n);
          }
          let s = l(r);
          d && (s = s.concat(d(r)));
          for (let a = c(t), p = c(r), v = 0; v < s.length; ++v) {
            const y = s[v];
            if (!(i[y] || (n?.[y]) || (p?.[y]) || (a?.[y]))) {
              const m = f(r, y);
              try {
                u(t, y, m);
              } catch (e) {}
            }
          }
        }
        return t;
      };
    },
    60198: (e, t) => {
            const r = "function" === typeof Symbol && Symbol.for;
            const n = r ? Symbol.for("react.element") : 60103;
            const o = r ? Symbol.for("react.portal") : 60106;
            const i = r ? Symbol.for("react.fragment") : 60107;
            const s = r ? Symbol.for("react.strict_mode") : 60108;
            const a = r ? Symbol.for("react.profiler") : 60114;
            const c = r ? Symbol.for("react.provider") : 60109;
            const u = r ? Symbol.for("react.context") : 60110;
            const l = r ? Symbol.for("react.async_mode") : 60111;
            const d = r ? Symbol.for("react.concurrent_mode") : 60111;
            const f = r ? Symbol.for("react.forward_ref") : 60112;
            const h = r ? Symbol.for("react.suspense") : 60113;
            const g = r ? Symbol.for("react.suspense_list") : 60120;
            const p = r ? Symbol.for("react.memo") : 60115;
            const v = r ? Symbol.for("react.lazy") : 60116;
            const y = r ? Symbol.for("react.block") : 60121;
            const m = r ? Symbol.for("react.fundamental") : 60117;
            const S = r ? Symbol.for("react.responder") : 60118;
            const b = r ? Symbol.for("react.scope") : 60119;
      function O(e) {
        if ("object" === typeof e && null !== e) {
          const t = e.$$typeof;
          switch (t) {
            case n:
              switch ((e = e.type)) {
                case l:
                case d:
                case i:
                case a:
                case s:
                case h:
                  return e;
                default:
                  switch ((e = e?.$$typeof)) {
                    case u:
                    case f:
                    case v:
                    case p:
                    case c:
                      return e;
                    default:
                      return t;
                  }
              }
            case o:
              return t;
          }
        }
      }
      function E(e) {
        return O(e) === d;
      }
      (t.AsyncMode = l),
        (t.ConcurrentMode = d),
        (t.ContextConsumer = u),
        (t.ContextProvider = c),
        (t.Element = n),
        (t.ForwardRef = f),
        (t.Fragment = i),
        (t.Lazy = v),
        (t.Memo = p),
        (t.Portal = o),
        (t.Profiler = a),
        (t.StrictMode = s),
        (t.Suspense = h),
        (t.isAsyncMode = (e) => E(e) || O(e) === l),
        (t.isConcurrentMode = E),
        (t.isContextConsumer = (e) => O(e) === u),
        (t.isContextProvider = (e) => O(e) === c),
        (t.isElement = (e) => "object" === typeof e && null !== e && e.$$typeof === n),
        (t.isForwardRef = (e) => O(e) === f),
        (t.isFragment = (e) => O(e) === i),
        (t.isLazy = (e) => O(e) === v),
        (t.isMemo = (e) => O(e) === p),
        (t.isPortal = (e) => O(e) === o),
        (t.isProfiler = (e) => O(e) === a),
        (t.isStrictMode = (e) => O(e) === s),
        (t.isSuspense = (e) => O(e) === h),
        (t.isValidElementType = (e) => (
            "string" === typeof e ||
            "function" === typeof e ||
            e === i ||
            e === d ||
            e === a ||
            e === s ||
            e === h ||
            e === g ||
            ("object" === typeof e &&
              null !== e &&
              (e.$$typeof === v ||
                e.$$typeof === p ||
                e.$$typeof === c ||
                e.$$typeof === u ||
                e.$$typeof === f ||
                e.$$typeof === m ||
                e.$$typeof === S ||
                e.$$typeof === b ||
                e.$$typeof === y))
          )),
        (t.typeOf = O);
    },
    56237: (e, t, r) => {
            e.exports = r(60198);
    },
    11195: (e, t) => {
            let r;
            const n = Symbol.for("react.element");
            const o = Symbol.for("react.portal");
            const i = Symbol.for("react.fragment");
            const s = Symbol.for("react.strict_mode");
            const a = Symbol.for("react.profiler");
            const c = Symbol.for("react.provider");
            const u = Symbol.for("react.context");
            const l = Symbol.for("react.server_context");
            const d = Symbol.for("react.forward_ref");
            const f = Symbol.for("react.suspense");
            const h = Symbol.for("react.suspense_list");
            const g = Symbol.for("react.memo");
            const p = Symbol.for("react.lazy");
            const v = Symbol.for("react.offscreen");
      function y(e) {
        if ("object" === typeof e && null !== e) {
          const t = e.$$typeof;
          switch (t) {
            case n:
              switch ((e = e.type)) {
                case i:
                case a:
                case s:
                case f:
                case h:
                  return e;
                default:
                  switch ((e = e?.$$typeof)) {
                    case l:
                    case u:
                    case d:
                    case p:
                    case g:
                    case c:
                      return e;
                    default:
                      return t;
                  }
              }
            case o:
              return t;
          }
        }
      }
      (r = Symbol.for("react.module.reference")),
        (t.isContextConsumer = (e) => y(e) === u);
    },
    61357: (e, t, r) => {
            e.exports = r(11195);
    },
    86942: (e, t, r) => {
            r.d(t, { Provider: () => L, connect: () => R });
      const n = r(4322);
      const o = r(7231);
      const i = r(962);
      let s = (e) => {
        e();
      };
      const a = () => s;
      const c = r(50959);
      const u = (0, c.createContext)(null);
      let l = null;
      const d = r(15882);
      const f = r(30950);
      const h = r(72535);
      const g = r.n(h);
      const p = r(61357);
      const v = [
        "initMapStateToProps",
        "initMapDispatchToProps",
        "initMergeProps",
      ];
      function y(
        e,
        t,
        r,
        n,
        { areStatesEqual: o, areOwnPropsEqual: i, areStatePropsEqual: s },
      ) {
        let a;
        let c;
        let u;
        let l;
        let d;
        let f = !1;
        function h(f, h) {
          const g = !i(h, c);
          const p = !o(f, a, h, c);
          return (
            (a = f),
            (c = h),
            g && p
              ? ((u = e(a, c)),
                t.dependsOnOwnProps && (l = t(n, c)),
                (d = r(u, l, c)),
                d)
              : g
              ? (e.dependsOnOwnProps && (u = e(a, c)),
                t.dependsOnOwnProps && (l = t(n, c)),
                (d = r(u, l, c)),
                d)
              : p
              ? (() => {
                  const t = e(a, c);
                  const n = !s(t, u);
                  return (u = t), n && (d = r(u, l, c)), d;
                })()
              : d
          );
        }
        return (o, i) => f
            ? h(o, i)
            : ((a = o),
              (c = i),
              (u = e(a, c)),
              (l = t(n, c)),
              (d = r(u, l, c)),
              (f = !0),
              d);
      }
      function m(e) {
        return (t) => {
          const r = e(t);
          function n() {
            return r;
          }
          return (n.dependsOnOwnProps = !1), n;
        };
      }
      function S(e) {
        return e.dependsOnOwnProps
          ? Boolean(e.dependsOnOwnProps)
          : 1 !== e.length;
      }
      function b(e, t) {
        return (t, { displayName: r }) => {
          const n = (e, t) => n.dependsOnOwnProps
              ? n.mapToProps(e, t)
              : n.mapToProps(e, void 0);
          return (
            (n.dependsOnOwnProps = !0),
            (n.mapToProps = (t, r) => {
              (n.mapToProps = e), (n.dependsOnOwnProps = S(e));
              let o = n(t, r);
              return (
                "function" === typeof o &&
                  ((n.mapToProps = o),
                  (n.dependsOnOwnProps = S(o)),
                  (o = n(t, r))),
                o
              );
            }),
            n
          );
        };
      }
      function O(e, t) {
        return (r, n) => {
          throw new Error(
            `Invalid value of type ${typeof e} for ${t} argument when connecting component ${
              n.wrappedComponentName
            }.`,
          );
        };
      }
      function E(e, t, r) {
        return (0, d.default)({}, r, e, t);
      }
      const T = { notify() {}, get: () => [] };
      function w(e, t) {
        let r;
        let n = T;
        function o() {
          s.onStateChange?.();
        }
        function i() {
          r ||
            ((r = t ? t.addNestedSub(o) : e.subscribe(o)),
            (n = (() => {
              const e = a();
              let t = null;
              let r = null;
              return {
                clear() {
                  (t = null), (r = null);
                },
                notify() {
                  e(() => {
                    let e = t;
                    while (e) e.callback(), (e = e.next);
                  });
                },
                get() {
                  const e = [];
                  let r = t;
                  while (r) e.push(r), (r = r.next);
                  return e;
                },
                subscribe(e) {
                  let n = !0;
                  const o = (r = { callback: e, next: null, prev: r });
                  return (
                    o.prev ? (o.prev.next = o) : (t = o),
                    () => {
                      n &&
                        null !== t &&
                        ((n = !1),
                        o.next ? (o.next.prev = o.prev) : (r = o.prev),
                        o.prev ? (o.prev.next = o.next) : (t = o.next));
                    }
                  );
                },
              };
            })()));
        }
        const s = {
          addNestedSub: (e) => i(), n.subscribe(e),
          notifyNestedSubs: () => {
            n.notify();
          },
          handleChangeWrapper: o,
          isSubscribed: () => Boolean(r),
          trySubscribe: i,
          tryUnsubscribe: () => {
            r && (r(), (r = void 0), n.clear(), (n = T));
          },
          getListeners: () => n,
        };
        return s;
      }
      const D = !(
        "undefined" === typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      )
        ? c.useLayoutEffect
        : c.useEffect;
      function C(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e === 1 / t
          : e !== e && t !== t;
      }
      function I(e, t) {
        if (C(e, t)) return !0;
        if (
          "object" !== typeof e ||
          null === e ||
          "object" !== typeof t ||
          null === t
        )
          return !1;
        const r = Object.keys(e);
        const n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (let n = 0; n < r.length; n++)
          if (
            !Object.prototype.hasOwnProperty.call(t, r[n]) ||
            !C(e[r[n]], t[r[n]])
          )
            return !1;
        return !0;
      }
      const N = ["reactReduxForwardedRef"];
      let P = () => {
        throw new Error("uSES not initialized!");
      };
      const x = [null, null];
      function M(e, t, r, n, o, i) {
        (e.current = n),
          (r.current = !1),
          o.current && ((o.current = null), i());
      }
      function A(e, t) {
        return e === t;
      }
      const R = (
        e,
        t,
        r,
        {
          pure: n,
          areStatesEqual: o = A,
          areOwnPropsEqual: i = I,
          areStatePropsEqual: s = I,
          areMergedPropsEqual: a = I,
          forwardRef: l = !1,
          context: h = u,
        } = {},
      ) => {
        const S = h;
        const T = ((e) => e
              ? "function" === typeof e
                ? b(e)
                : O(e, "mapStateToProps")
              : m(() => ({})))(e);
        const C = ((e) => e && "object" === typeof e
              ? m((t) =>
                  ((e, t) => {
                    const r = {};
                    for (const n in e) {
                      const o = e[n];
                      "function" === typeof o && (r[n] = (...e) => t(o(...e)));
                    }
                    return r;
                  })(e, t),
                )
              : e
              ? "function" === typeof e
                ? b(e)
                : O(e, "mapDispatchToProps")
              : m((e) => ({ dispatch: e })))(t);
        const R = ((e) => e
              ? "function" === typeof e
                ? ((e) => (
                      t,
                      { displayName: r, areMergedPropsEqual: n },
                    ) => {
                      let o;
                      let i = !1;
                      return (t, r, s) => {
                        const a = e(t, r, s);
                        return i ? n(a, o) || (o = a) : ((i = !0), (o = a)), o;
                      };
                    })(e)
                : O(e, "mergeProps")
              : () => E)(r);
        const L = Boolean(e);
        return (e) => {
          const t = e.displayName || e.name || "Component";
          const r = `Connect(${t})`;
          const n = {
              shouldHandleStateChanges: L,
              displayName: r,
              wrappedComponentName: t,
              WrappedComponent: e,
              initMapStateToProps: T,
              initMapDispatchToProps: C,
              initMergeProps: R,
              areStatesEqual: o,
              areStatePropsEqual: s,
              areOwnPropsEqual: i,
              areMergedPropsEqual: a,
            };
          function u(t) {
            const [r, o, i] = (0, c.useMemo)(() => {
                const { reactReduxForwardedRef: e } = t;
                const r = (0, f.default)(t, N);
                return [t.context, e, r];
              }, [t]);
            const s = (0, c.useMemo)(
                () =>
                  r?.Consumer &&
                  (0, p.isContextConsumer)(c.createElement(r.Consumer, null))
                    ? r
                    : S,
                [r, S],
              );
            const a = (0, c.useContext)(s);
            const u =
                Boolean(t.store) &&
                Boolean(t.store.getState) &&
                Boolean(t.store.dispatch);
            const l = Boolean(a) && Boolean(a.store);
            const h = u ? t.store : a.store;
            const g = l ? a.getServerState : h.getState;
            const m = (0, c.useMemo)(
                () =>
                  ((e, t) => {
                    const {
                        initMapStateToProps: r,
                        initMapDispatchToProps: n,
                        initMergeProps: o,
                      } = t;
                    const i = (0, f.default)(t, v);
                    return y(r(e, i), n(e, i), o(e, i), e, i);
                  })(h.dispatch, n),
                [h],
              );
            const [b, O] = (0, c.useMemo)(() => {
                if (!L) return x;
                const e = w(h, u ? void 0 : a.subscription);
                const t = e.notifyNestedSubs.bind(e);
                return [e, t];
              }, [h, u, a]);
            const E = (0, c.useMemo)(
                () => (u ? a : (0, d.default)({}, a, { subscription: b })),
                [u, a, b],
              );
            const T = (0, c.useRef)();
            const C = (0, c.useRef)(i);
            const I = (0, c.useRef)();
            const A = (0, c.useRef)(!1);
            const R = ((0, c.useRef)(!1), (0, c.useRef)(!1));
            const _ = (0, c.useRef)();
            D(
              () => (
                (R.current = !0),
                () => {
                  R.current = !1;
                }
              ),
              [],
            );
            const j = (0, c.useMemo)(
                () => () =>
                  I.current && i === C.current ? I.current : m(h.getState(), i),
                [h, i],
              );
            const k = (0, c.useMemo)(
                () => (e) =>
                  b
                    ? ((e, t, r, n, o, i, s, a, c, u, l) => {
                        if (!e) return () => {};
                        let d = !1;
                        let f = null;
                        const h = () => {
                          if (d || !a.current) return;
                          const e = t.getState();
                          let r;
                          let h;
                          try {
                            r = n(e, o.current);
                          } catch (e) {
                            (h = e), (f = e);
                          }
                          h || (f = null),
                            r === i.current
                              ? s.current || u()
                              : ((i.current = r),
                                (c.current = r),
                                (s.current = !0),
                                l());
                        };
                        return (
                          (r.onStateChange = h),
                          r.trySubscribe(),
                          h(),
                          () => {
                            if (
                              ((d = !0),
                              r.tryUnsubscribe(),
                              (r.onStateChange = null),
                              f)
                            )
                              throw f;
                          }
                        );
                      })(L, h, b, m, C, T, A, R, I, O, e)
                    : () => {},
                [b],
              );
            let H;
            let U;
            let F;
            let $;
            (H = M), (U = [C, T, A, i, I, O]), D(() => H(...U), F);
            try {
              $ = P(k, j, g ? () => m(g(), i) : j);
            } catch (e) {
              throw (
                (_.current &&
                  (e.message += `\nThe error may be correlated with this previous error:\n${_.current.stack}\n\n`),
                e)
              );
            }
            D(() => {
              (_.current = void 0), (I.current = void 0), (T.current = $);
            });
            const B = (0, c.useMemo)(
              () => c.createElement(e, (0, d.default)({}, $, { ref: o })),
              [o, e, $],
            );
            return (0, c.useMemo)(
              () => (L ? c.createElement(s.Provider, { value: E }, B) : B),
              [s, B, E],
            );
          }
          const h = c.memo(u);
          if (
            ((h.WrappedComponent = e), (h.displayName = u.displayName = r), l)
          ) {
            const t = c.forwardRef((e, t) => c.createElement(
                h,
                (0, d.default)({}, e, { reactReduxForwardedRef: t }),
              ));
            return (t.displayName = r), (t.WrappedComponent = e), g()(t, e);
          }
          return g()(h, e);
        };
      };
      const L = ({
        store: e,
        context: t,
        children: r,
        serverState: n,
      }) => {
        const o = (0, c.useMemo)(() => {
            const t = w(e);
            return {
              store: e,
              subscription: t,
              getServerState: n ? () => n : void 0,
            };
          }, [e, n]);
        const i = (0, c.useMemo)(() => e.getState(), [e]);
        D(() => {
          const { subscription: t } = o;
          return (
            (t.onStateChange = t.notifyNestedSubs),
            t.trySubscribe(),
            i !== e.getState() && t.notifyNestedSubs(),
            () => {
              t.tryUnsubscribe(), (t.onStateChange = void 0);
            }
          );
        }, [o, i]);
        const s = t || u;
        return c.createElement(s.Provider, { value: o }, r);
      };
      let _;
      let j;
      (_ = o.useSyncExternalStoreWithSelector),
        (l = _),
        ((e) => {
          P = e;
        })(n.useSyncExternalStore),
        (j = i.unstable_batchedUpdates),
        (s = j);
    },
    3354: (e, t, r) => {
            const n = r(50959);
            const o = Symbol.for("react.element");
            const i = Symbol.for("react.fragment");
            const s = Object.prototype.hasOwnProperty;
            const a =
          n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentOwner;
            const c = { key: !0, ref: !0, __self: !0, __source: !0 };
      function u(e, t, r) {
        let n;
        const i = {};
        let u = null;
        let l = null;
        for (n in (void 0 !== r && (u = `${r}`),
        void 0 !== t.key && (u = `${t.key}`),
        void 0 !== t.ref && (l = t.ref),
        t))
          s.call(t, n) && !c.hasOwnProperty(n) && (i[n] = t[n]);
        if (e?.defaultProps)
          for (n in (t = e.defaultProps)) void 0 === i[n] && (i[n] = t[n]);
        return {
          $$typeof: o,
          type: e,
          key: u,
          ref: l,
          props: i,
          _owner: a.current,
        };
      }
      t.jsx = u;
    },
    16453: (e, t, r) => {
            e.exports = r(3354);
    },
    54773: (e, t, r) => {
            r.d(t, { buffers: () => a.H, default: () => z, eventChannel: () => N });
      const n = r(49209);
      const o = r(15882);
      const i = r(30950);
      const s = r(75880);
      const a = r(60676);
      const c = r(21153);
      function u() {
        const e = {};
        return (
          (e.promise = new Promise((t, r) => {
            (e.resolve = t), (e.reject = r);
          })),
          e
        );
      }
      const l = u;
      const d = [];
      let f = 0;
      function h(e) {
        try {
          v(), e();
        } finally {
          y();
        }
      }
      function g(e) {
        d.push(e), f || (v(), m());
      }
      function p(e) {
        try {
          return v(), e();
        } finally {
          m();
        }
      }
      function v() {
        f++;
      }
      function y() {
        f--;
      }
      function m() {
        let e;
        for (y(); !f && void 0 !== (e = d.shift()); ) h(e);
      }
      const S = (e) => (t) => e.some((e) => w(e)(t));
      const b = (e) => (t) => e(t);
      const O = (e) => (t) => t.type === String(e);
      const E = (e) => (t) => t.type === e;
      const T = () => a.k;
      function w(e) {
        const t =
          "*" === e
            ? T
            : (0, s.string)(e)
            ? O
            : (0, s.array)(e)
            ? S
            : (0, s.stringableFunc)(e)
            ? O
            : (0, s.func)(e)
            ? b
            : (0, s.symbol)(e)
            ? E
            : null;
        if (null === t) throw new Error(`invalid pattern: ${e}`);
        return t(e);
      }
      const D = { type: n.CHANNEL_END_TYPE };
      const C = (e) => e && e.type === n.CHANNEL_END_TYPE;
      function I(e) {
        void 0 === e && (e = (0, a.e)());
        let t = !1;
        let r = [];
        return {
          take: (n) => {
            t && e.isEmpty()
              ? n(D)
              : e.isEmpty()
              ? (r.push(n),
                (n.cancel = () => {
                  (0, a.r)(r, n);
                }))
              : n(e.take());
          },
          put: (n) => {
            if (!t) {
              if (0 === r.length) return e.put(n);
              r.shift()(n);
            }
          },
          flush: (r) => {
            t && e.isEmpty() ? r(D) : r(e.flush());
          },
          close: () => {
            if (!t) {
              t = !0;
              const e = r;
              r = [];
              for (let n = 0, o = e.length; n < o; n++) {
                (0, e[n])(D);
              }
            }
          },
        };
      }
      function N(e, t) {
        void 0 === t && (t = (0, a.n)());
        let r;
        let n = !1;
        const o = I(t);
        const i = () => {
            n || ((n = !0), (0, s.func)(r) && r(), o.close());
          };
        return (
          (r = e((e) => {
            C(e) ? i() : o.put(e);
          })),
          (r = (0, a.o)(r)),
          n && r(),
          { take: o.take, flush: o.flush, close: i }
        );
      }
      function P() {
        let e;
        let t;
        let r;
        let o;
        let i;
        let s;
        const c =
            ((t = !1),
            (o = r = []),
            (i = () => {
              o === r && (o = r.slice());
            }),
            (s = () => {
              t = !0;
              const e = (r = o);
              (o = []),
                e.forEach((e) => {
                  e(D);
                });
            }),
            ((e = {})[n.MULTICAST] = !0),
            (e.put = (e) => {
              if (!t)
                if (C(e)) s();
                else
                  for (let i = (r = o), a = 0, c = i.length; a < c; a++) {
                    const u = i[a];
                    u[n.MATCH](e) && (u.cancel(), u(e));
                  }
            }),
            (e.take = (e, r) => {
              void 0 === r && (r = T),
                t
                  ? e(D)
                  : ((e[n.MATCH] = r),
                    i(),
                    o.push(e),
                    (e.cancel = (0, a.o)(() => {
                      i(), (0, a.r)(o, e);
                    })));
            }),
            (e.close = s),
            e);
        const u = c.put;
        return (
          (c.put = (e) => {
            e[n.SAGA_ACTION]
              ? u(e)
              : g(() => {
                  u(e);
                });
          }),
          c
        );
      }
      function x(e, t) {
        const r = e[n.CANCEL];
        (0, s.func)(r) && (t.cancel = r),
          e.then(t, (e) => {
            t(e, !0);
          });
      }
      let M;
      let A = 0;
      const R = () => ++A;
      function L(e) {
        e.isRunning() && e.cancel();
      }
      const _ =
        (((M = {})[a.T] = (e, t, r) => {
          const o = t.channel;
          const i = void 0 === o ? e.channel : o;
          const a = t.pattern;
          const c = t.maybe;
          const u = (e) => {
              e instanceof Error
                ? r(e, !0)
                : !C(e) || c
                ? r(e)
                : r(n.TERMINATE);
            };
          try {
            i.take(u, (0, s.notUndef)(a) ? w(a) : null);
          } catch (e) {
            return void r(e, !0);
          }
          r.cancel = u.cancel;
        }),
        (M[a.P] = (e, t, r) => {
          const n = t.channel;
          const o = t.action;
          const i = t.resolve;
          g(() => {
            let t;
            try {
              t = (n ? n.put : e.dispatch)(o);
            } catch (e) {
              return void r(e, !0);
            }
            i && (0, s.promise)(t) ? x(t, r) : r(t);
          });
        }),
        (M[a.A] = (e, t, r, n) => {
          const o = n.digestEffect;
          const i = A;
          const c = Object.keys(t);
          if (0 !== c.length) {
            const u = (0, a.l)(t, r);
            c.forEach((e) => {
              o(t[e], i, u[e], e);
            });
          } else r((0, s.array)(t) ? [] : {});
        }),
        (M[a.R] = (e, t, r, n) => {
          const o = n.digestEffect;
          const i = A;
          const c = Object.keys(t);
          const u = (0, s.array)(t) ? (0, a.m)(c.length) : {};
          const l = {};
          let d = !1;
          c.forEach((e) => {
            const t = (t, n) => {
              d ||
                (n || (0, a.s)(t)
                  ? (r.cancel(), r(t, n))
                  : (r.cancel(), (d = !0), (u[e] = t), r(u)));
            };
            (t.cancel = a.t), (l[e] = t);
          }),
            (r.cancel = () => {
              d ||
                ((d = !0),
                c.forEach((e) => l[e].cancel()));
            }),
            c.forEach((e) => {
              d || o(t[e], i, l[e], e);
            });
        }),
        (M[a.C] = (e, t, r, n) => {
          const o = t.context;
          const i = t.fn;
          const c = t.args;
          const u = n.task;
          try {
            const l = i.apply(o, c);
            if ((0, s.promise)(l)) return void x(l, r);
            if ((0, s.iterator)(l))
              return void G(e, l, u.context, A, (0, a.j)(i), !1, r);
            r(l);
          } catch (e) {
            r(e, !0);
          }
        }),
        (M[a.a] = (e, t, r) => {
          const n = t.context;
          const o = t.fn;
          const i = t.args;
          try {
            const a = (e, t) => {
              (0, s.undef)(e) ? r(t) : r(e, !0);
            };
            o.apply(n, i.concat(a)), a.cancel && (r.cancel = a.cancel);
          } catch (e) {
            r(e, !0);
          }
        }),
        (M[a.F] = (e, t, r, n) => {
          const o = t.context;
          const i = t.fn;
          const c = t.args;
          const u = t.detached;
          const l = n.task;
          const d = ((e) => {
              const t = e.context;
              const r = e.fn;
              const n = e.args;
              try {
                const o = r.apply(t, n);
                if ((0, s.iterator)(o)) return o;
                let i = !1;
                return (0, a.q)((e) => i
                    ? { value: e, done: !0 }
                    : ((i = !0), { value: o, done: !(0, s.promise)(o) }));
              } catch (e) {
                return (0, a.q)(() => {
                  throw e;
                });
              }
            })({ context: o, fn: i, args: c });
          const f = ((e, t) => e.isSagaIterator ? { name: e.meta.name } : (0, a.j)(t))(d, i);
          p(() => {
            const t = G(e, d, l.context, A, f, u, void 0);
            u
              ? r(t)
              : t.isRunning()
              ? (l.queue.addTask(t), r(t))
              : t.isAborted()
              ? l.queue.abort(t.error())
              : r(t);
          });
        }),
        (M[a.J] = (e, t, r, n) => {
          const o = n.task;
          const i = (e, t) => {
              if (e.isRunning()) {
                const r = { task: o, cb: t };
                (t.cancel = () => {
                  e.isRunning() && (0, a.r)(e.joiners, r);
                }),
                  e.joiners.push(r);
              } else e.isAborted() ? t(e.error(), !0) : t(e.result());
            };
          if ((0, s.array)(t)) {
            if (0 === t.length) return void r([]);
            const c = (0, a.l)(t, r);
            t.forEach((e, t) => {
              i(e, c[t]);
            });
          } else i(t, r);
        }),
        (M[a.b] = (e, t, r, o) => {
          const i = o.task;
          t === n.SELF_CANCELLATION
            ? L(i)
            : (0, s.array)(t)
            ? t.forEach(L)
            : L(t),
            r();
        }),
        (M[a.S] = (e, t, r) => {
          const n = t.selector;
          const o = t.args;
          try {
            r(n.apply(void 0, [e.getState()].concat(o)));
          } catch (e) {
            r(e, !0);
          }
        }),
        (M[a.d] = (e, t, r) => {
          const n = t.pattern;
          const o = I(t.buffer);
          const i = w(n);
          const s = function t(r) {
              C(r) || e.channel.take(t, i), o.put(r);
            };
          const a = o.close;
          (o.close = () => {
            s.cancel(), a();
          }),
            e.channel.take(s, i),
            r(o);
        }),
        (M[a.f] = (e, t, r, n) => {
          r(n.task.isCancelled());
        }),
        (M[a.g] = (e, t, r) => {
          t.flush(r);
        }),
        (M[a.G] = (e, t, r, n) => {
          r(n.task.context[t]);
        }),
        (M[a.h] = (e, t, r, n) => {
          const o = n.task;
          (0, a.p)(o.context, t), r();
        }),
        M);
      function j(e, t) {
        return `${e}?${t}`;
      }
      function k(e) {
        const t = e.name;
        const r = e.location;
        return r ? `${t}  ${j(r.fileName, r.lineNumber)}` : t;
      }
      function H(e) {
        const t = (0, a.u)((e) => e.cancelledTasks, e);
        return t.length
          ? ["Tasks cancelled due to error:"].concat(t).join("\n")
          : "";
      }
      let U = null;
      const F = [];
      const $ = (e) => {
          (e.crashedEffect = U), F.push(e);
        };
      const B = () => {
          (U = null), (F.length = 0);
        };
      const q = () => {
          const e = F[0];
          const t = F.slice(1);
          const r = e.crashedEffect
              ? ((e) => {
                  const t = (0, a.v)(e);
                  return t ? `${t.code}  ${j(t.fileName, t.lineNumber)}` : "";
                })(e.crashedEffect)
              : null;
          return [
            `The above error occurred in task ${k(e.meta)}${r ? ` \n when executing effect ${r}` : ""}`,
          ]
            .concat(
              t.map((e) => `    created by ${k(e.meta)}`),
              [H(F)],
            )
            .join("\n");
        };
      function K(e, t, r, o, i, s, c) {
        let u;
        void 0 === c && (c = a.t);
        let d;
        let f;
        let h = 0;
        let g = null;
        const p = [];
        const v = Object.create(r);
        const y = ((e, t, r) => {
            let n;
            let o = [];
            let i = !1;
            function s(e) {
              t(), u(), r(e, !0);
            }
            function c(t) {
              o.push(t),
                (t.cont = (c, u) => {
                  i ||
                    ((0, a.r)(o, t),
                    (t.cont = a.t),
                    u
                      ? s(c)
                      : (t === e && (n = c), o.length || ((i = !0), r(n))));
                });
            }
            function u() {
              i ||
                ((i = !0),
                o.forEach((e) => {
                  (e.cont = a.t), e.cancel();
                }),
                (o = []));
            }
            return (
              c(e),
              {
                addTask: c,
                cancelAll: u,
                abort: s,
                getTasks: () => o,
              }
            );
          })(
            t,
            () => {
              p.push.apply(
                p,
                y.getTasks().map((e) => e.meta.name),
              );
            },
            m,
          );
        function m(t, r) {
          if (r) {
            if (((h = 2), $({ meta: i, cancelledTasks: p }), S.isRoot)) {
              const o = q();
              B(), e.onError(t, { sagaStack: o });
            }
            (f = t), g?.reject(t);
          } else
            t === n.TASK_CANCEL ? (h = 1) : 1 !== h && (h = 3),
              (d = t),
              g?.resolve(t);
          S.cont(t, r),
            S.joiners.forEach((e) => {
              e.cb(t, r);
            }),
            (S.joiners = null);
        }
        const S =
          (((u = {})[n.TASK] = !0),
          (u.id = o),
          (u.meta = i),
          (u.isRoot = s),
          (u.context = v),
          (u.joiners = []),
          (u.queue = y),
          (u.cancel = () => {
            0 === h && ((h = 1), y.cancelAll(), m(n.TASK_CANCEL, !1));
          }),
          (u.cont = c),
          (u.end = m),
          (u.setContext = (e) => {
            (0, a.p)(v, e);
          }),
          (u.toPromise = () => (
              g || ((g = l()), 2 === h ? g.reject(f) : 0 !== h && g.resolve(d)),
              g.promise
            )),
          (u.isRunning = () => 0 === h),
          (u.isCancelled = () => 1 === h || (0 === h && 1 === t.status)),
          (u.isAborted = () => 2 === h),
          (u.result = () => d),
          (u.error = () => f),
          u);
        return S;
      }
      function G(e, t, r, o, i, c, u) {
        const l = e.finalizeRunEffect((t, r, o) => {
          if ((0, s.promise)(t)) x(t, o);
          else if ((0, s.iterator)(t)) G(e, t, f.context, r, i, !1, o);
          else if (t?.[n.IO]) {
            (0, _[t.type])(e, t.payload, o, h);
          } else o(t);
        });
        g.cancel = a.t;
        const d = {
            meta: i,
            cancel: () => {
              0 === d.status && ((d.status = 1), g(n.TASK_CANCEL));
            },
            status: 0,
          };
        const f = K(e, d, r, o, i, c, u);
        const h = { task: f, digestEffect: p };
        return u && (u.cancel = f.cancel), g(), f;
        function g(e, r) {
          try {
            let i;
            r
              ? ((i = t.throw(e)), B())
              : (0, a.y)(e)
              ? ((d.status = 1),
                g.cancel(),
                (i = (0, s.func)(t.return)
                  ? t.return(n.TASK_CANCEL)
                  : { done: !0, value: n.TASK_CANCEL }))
              : (i = (0, a.z)(e)
                  ? (0, s.func)(t.return)
                    ? t.return()
                    : { done: !0 }
                  : t.next(e)),
              i.done
                ? (1 !== d.status && (d.status = 3), d.cont(i.value))
                : p(i.value, o, g);
          } catch (e) {
            if (1 === d.status) throw e;
            (d.status = 2), d.cont(e, !0);
          }
        }
        function p(t, r, n, o) {
          void 0 === o && (o = "");
          let i;
          const s = R();
          function c(r, o) {
            i ||
              ((i = !0),
              (n.cancel = a.t),
              e.sagaMonitor &&
                (o
                  ? e.sagaMonitor.effectRejected(s, r)
                  : e.sagaMonitor.effectResolved(s, r)),
              o &&
                ((e) => {
                  U = e;
                })(t),
              n(r, o));
          }
          e.sagaMonitor?.effectTriggered({
              effectId: s,
              parentEffectId: r,
              label: o,
              effect: t,
            }),
            (c.cancel = a.t),
            (n.cancel = () => {
              i ||
                ((i = !0),
                c.cancel(),
                (c.cancel = a.t),
                e.sagaMonitor?.effectCancelled(s));
            }),
            l(t, s, c);
        }
      }
      function W(e, t) {
        const r = e.channel;
        const n = void 0 === r ? P() : r;
        const o = e.dispatch;
        const i = e.getState;
        const s = e.context;
        const u = void 0 === s ? {} : s;
        const l = e.sagaMonitor;
        const d = e.effectMiddlewares;
        const f = e.onError;
        const h = void 0 === f ? a.B : f;
        for (
          let g = arguments.length, v = new Array(g > 2 ? g - 2 : 0), y = 2;
          y < g;
          y++
        )
          v[y - 2] = arguments[y];
        const m = t.apply(void 0, v);
        let S;
        const b = R();
        if (
          (l &&
            ((l.rootSagaStarted = l.rootSagaStarted || a.t),
            (l.effectTriggered = l.effectTriggered || a.t),
            (l.effectResolved = l.effectResolved || a.t),
            (l.effectRejected = l.effectRejected || a.t),
            (l.effectCancelled = l.effectCancelled || a.t),
            (l.actionDispatched = l.actionDispatched || a.t),
            l.rootSagaStarted({ effectId: b, saga: t, args: v })),
          d)
        ) {
          const O = c.compose.apply(void 0, d);
          S = (e) => (t, r, n) => O((t) => e(t, r, n))(t);
        } else S = a.E;
        const E = {
          channel: n,
          dispatch: (0, a.D)(o),
          getState: i,
          sagaMonitor: l,
          onError: h,
          finalizeRunEffect: S,
        };
        return p(() => {
          const e = G(E, m, u, b, (0, a.j)(t), !0, void 0);
          return l?.effectResolved(b, e), e;
        });
      }
      const Y = (e) => {
          let t;
          const r = void 0 === e ? {} : e;
          const n = r.context;
          const s = void 0 === n ? {} : n;
          const c = r.channel;
          const u = void 0 === c ? P() : c;
          const l = r.sagaMonitor;
          const d = (0, i.default)(r, ["context", "channel", "sagaMonitor"]);
          function f(e) {
            const r = e.getState;
            const n = e.dispatch;
            return (
              (t = W.bind(
                null,
                (0, o.default)({}, d, {
                  context: s,
                  channel: u,
                  dispatch: n,
                  getState: r,
                  sagaMonitor: l,
                }),
              )),
              (e) => (t) => {
                  l?.actionDispatched?.(t);
                  const r = e(t);
                  return u.put(t), r;
                }
            );
          }
          return (
            (f.run = () => t.apply(void 0, arguments)),
            (f.setContext = (e) => {
              (0, a.p)(s, e);
            }),
            f
          );
        };
      const z = Y;
    },
    36349: (e, t, r) => {
            r.d(t, {
        all: () => o._,
        call: () => o.N,
        cancel: () => o.M,
        fork: () => o.L,
        put: () => o.Y,
        select: () => o.a3,
        take: () => o.K,
        throttle: () => l,
      });
      const n = r(75880);
      const o = r(60676);
      const i = (e) => ({ done: !0, value: e });
      const s = {};
      function a(e) {
        return (0, n.channel)(e)
          ? "channel"
          : (0, n.stringableFunc)(e)
          ? String(e)
          : (0, n.func)(e)
          ? e.name
          : String(e);
      }
      function c(e, t, r) {
        let n;
        let a;
        let c;
        let u = t;
        function l(t, r) {
          if (u === s) return i(t);
          if (r && !a) throw ((u = s), r);
          n?.(t);
          const o = r ? e[a](r) : e[u]();
          return (
            (u = o.nextState),
            (c = o.effect),
            (n = o.stateUpdater),
            (a = o.errorState),
            u === s ? i(t) : c
          );
        }
        return (0, o.q)(
          l,
          (e) => l(null, e),
          r,
        );
      }
      function u(e, t, r) {
        for (
          let n = arguments.length, i = new Array(n > 3 ? n - 3 : 0), s = 3;
          s < n;
          s++
        )
          i[s - 3] = arguments[s];
        let u;
        let l;
        const d = { done: !1, value: (0, o.O)(t, (0, o.Q)(1)) };
        const f = () => ({ done: !1, value: (0, o.K)(l) });
        const h = (e) => ({ done: !1, value: o.L.apply(void 0, [r].concat(i, [e])) });
        const g = { done: !1, value: (0, o.U)(e) };
        const p = (e) => (u = e);
        const v = (e) => (l = e);
        return c(
          {
            q1: () => ({ nextState: "q2", effect: d, stateUpdater: v }),
            q2: () => ({ nextState: "q3", effect: f(), stateUpdater: p }),
            q3: () => ({ nextState: "q4", effect: h(u) }),
            q4: () => ({ nextState: "q2", effect: g }),
          },
          "q1",
          `throttle(${a(t)}, ${r.name})`,
        );
      }
      function l(e, t, r) {
        for (
          let n = arguments.length, i = new Array(n > 3 ? n - 3 : 0), s = 3;
          s < n;
          s++
        )
          i[s - 3] = arguments[s];
        return o.L.apply(void 0, [u, e, t, r].concat(i));
      }
    },
    91622: (e, t, r) => {
            function n(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function o(e, t) {
        const r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          let n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter((t) => Object.getOwnPropertyDescriptor(e, t).enumerable)),
            r.push.apply(r, n);
        }
        return r;
      }
      function i(e) {
        for (let t = 1; t < arguments.length; t++) {
          const r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? o(Object(r), !0).forEach((t) => {
                n(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : o(Object(r)).forEach((t) => {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
        }
        return e;
      }
      function s(e) {
        return (
          `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `
        );
      }
      r.d(t, {
        applyMiddleware: () => v,
        bindActionCreators: () => g,
        combineReducers: () => f,
        createStore: () => d,
      });
      const a =
          ("function" === typeof Symbol && Symbol.observable) || "@@observable";
      const c = () => Math.random().toString(36).substring(7).split("").join(".");
      const u = {
          INIT: `@@redux/INIT${c()}`,
          REPLACE: `@@redux/REPLACE${c()}`,
          PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${c()}`,
        };
      function l(e) {
        if ("object" !== typeof e || null === e) return !1;
        for (let t = e; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      }
      function d(e, t, r) {
        let n;
        if (
          ("function" === typeof t && "function" === typeof r) ||
          ("function" === typeof r && "function" === typeof arguments[3])
        )
          throw new Error(s(0));
        if (
          ("function" === typeof t && void 0 === r && ((r = t), (t = void 0)),
          void 0 !== r)
        ) {
          if ("function" !== typeof r) throw new Error(s(1));
          return r(d)(e, t);
        }
        if ("function" !== typeof e) throw new Error(s(2));
        let o = e;
        let i = t;
        let c = [];
        let f = c;
        let h = !1;
        function g() {
          f === c && (f = c.slice());
        }
        function p() {
          if (h) throw new Error(s(3));
          return i;
        }
        function v(e) {
          if ("function" !== typeof e) throw new Error(s(4));
          if (h) throw new Error(s(5));
          let t = !0;
          return (
            g(),
            f.push(e),
            () => {
              if (t) {
                if (h) throw new Error(s(6));
                (t = !1), g();
                const r = f.indexOf(e);
                f.splice(r, 1), (c = null);
              }
            }
          );
        }
        function y(e) {
          if (!l(e)) throw new Error(s(7));
          if (void 0 === e.type) throw new Error(s(8));
          if (h) throw new Error(s(9));
          try {
            (h = !0), (i = o(i, e));
          } finally {
            h = !1;
          }
          for (let t = (c = f), r = 0; r < t.length; r++) {
            (0, t[r])();
          }
          return e;
        }
        function m(e) {
          if ("function" !== typeof e) throw new Error(s(10));
          (o = e), y({ type: u.REPLACE });
        }
        function S() {
          let e;
          const t = v;
          return (
            ((e = {
              subscribe: (e) => {
                if ("object" !== typeof e || null === e) throw new Error(s(11));
                function r() {
                  e.next?.(p());
                }
                return r(), { unsubscribe: t(r) };
              },
            })[a] = function () {
              return this;
            }),
            e
          );
        }
        return (
          y({ type: u.INIT }),
          ((n = { dispatch: y, subscribe: v, getState: p, replaceReducer: m })[
            a
          ] = S),
          n
        );
      }
      function f(e) {
        for (let t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
          const o = t[n];
          0, "function" === typeof e[o] && (r[o] = e[o]);
        }
        let i;
        const a = Object.keys(r);
        try {
          !((e) => {
            Object.keys(e).forEach((t) => {
              const r = e[t];
              if (void 0 === r(void 0, { type: u.INIT }))
                throw new Error(s(12));
              if (void 0 === r(void 0, { type: u.PROBE_UNKNOWN_ACTION() }))
                throw new Error(s(13));
            });
          })(r);
        } catch (e) {
          i = e;
        }
        return (e, t) => {
          if ((void 0 === e && (e = {}), i)) throw i;
          for (let n = !1, o = {}, c = 0; c < a.length; c++) {
            const u = a[c];
            const l = r[u];
            const d = e[u];
            const f = l(d, t);
            if (void 0 === f) {
              t?.type;
              throw new Error(s(14));
            }
            (o[u] = f), (n = n || f !== d);
          }
          return (n = n || a.length !== Object.keys(e).length) ? o : e;
        };
      }
      function h(e, t) {
        return function () {
          return t(e.apply(this, arguments));
        };
      }
      function g(e, t) {
        if ("function" === typeof e) return h(e, t);
        if ("object" !== typeof e || null === e) throw new Error(s(16));
        const r = {};
        for (const n in e) {
          const o = e[n];
          "function" === typeof o && (r[n] = h(o, t));
        }
        return r;
      }
      function p() {
        for (let e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return 0 === t.length
          ? (e) => e
          : 1 === t.length
          ? t[0]
          : t.reduce((e, t) => () => e(t.apply(void 0, arguments)));
      }
      function v() {
        for (let e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return (e) => () => {
            const r = e.apply(void 0, arguments);
            let n = () => {
                throw new Error(s(15));
              };
            const o = {
                getState: r.getState,
                dispatch: () => n.apply(void 0, arguments),
              };
            const a = t.map((e) => e(o));
            return (
              (n = p.apply(void 0, a)(r.dispatch)),
              i(i({}, r), {}, { dispatch: n })
            );
          };
      }
    },
    21153: (e, t, r) => {
            function n(e) {
        return (
          `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `
        );
      }
      r.d(t, { compose: () => u, createStore: () => c });
      const o =
          ("function" === typeof Symbol && Symbol.observable) || "@@observable";
      const i = () => Math.random().toString(36).substring(7).split("").join(".");
      const s = {
          INIT: `@@redux/INIT${i()}`,
          REPLACE: `@@redux/REPLACE${i()}`,
          PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${i()}`,
        };
      function a(e) {
        if ("object" !== typeof e || null === e) return !1;
        for (let t = e; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      }
      function c(e, t, r) {
        let i;
        if (
          ("function" === typeof t && "function" === typeof r) ||
          ("function" === typeof r && "function" === typeof arguments[3])
        )
          throw new Error(n(0));
        if (
          ("function" === typeof t && void 0 === r && ((r = t), (t = void 0)),
          void 0 !== r)
        ) {
          if ("function" !== typeof r) throw new Error(n(1));
          return r(c)(e, t);
        }
        if ("function" !== typeof e) throw new Error(n(2));
        let u = e;
        let l = t;
        let d = [];
        let f = d;
        let h = !1;
        function g() {
          f === d && (f = d.slice());
        }
        function p() {
          if (h) throw new Error(n(3));
          return l;
        }
        function v(e) {
          if ("function" !== typeof e) throw new Error(n(4));
          if (h) throw new Error(n(5));
          let t = !0;
          return (
            g(),
            f.push(e),
            () => {
              if (t) {
                if (h) throw new Error(n(6));
                (t = !1), g();
                const r = f.indexOf(e);
                f.splice(r, 1), (d = null);
              }
            }
          );
        }
        function y(e) {
          if (!a(e)) throw new Error(n(7));
          if (void 0 === e.type) throw new Error(n(8));
          if (h) throw new Error(n(9));
          try {
            (h = !0), (l = u(l, e));
          } finally {
            h = !1;
          }
          for (let t = (d = f), r = 0; r < t.length; r++) {
            (0, t[r])();
          }
          return e;
        }
        function m(e) {
          if ("function" !== typeof e) throw new Error(n(10));
          (u = e), y({ type: s.REPLACE });
        }
        function S() {
          let e;
          const t = v;
          return (
            ((e = {
              subscribe: (e) => {
                if ("object" !== typeof e || null === e) throw new Error(n(11));
                function r() {
                  e.next?.(p());
                }
                return r(), { unsubscribe: t(r) };
              },
            })[o] = function () {
              return this;
            }),
            e
          );
        }
        return (
          y({ type: s.INIT }),
          ((i = { dispatch: y, subscribe: v, getState: p, replaceReducer: m })[
            o
          ] = S),
          i
        );
      }
      function u() {
        for (let e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return 0 === t.length
          ? (e) => e
          : 1 === t.length
          ? t[0]
          : t.reduce((e, t) => () => e(t.apply(void 0, arguments)));
      }
    },
    77145: (e, t, r) => {
            function n(e, t) {
        return e === t;
      }
      function o(e, t, r) {
        if (null === t || null === r || t.length !== r.length) return !1;
        for (let n = t.length, o = 0; o < n; o++) if (!e(t[o], r[o])) return !1;
        return !0;
      }
      function i(e) {
        const t = Array.isArray(e[0]) ? e[0] : e;
        if (
          !t.every((e) => "function" === typeof e)
        ) {
          const r = t
            .map((e) => typeof e)
            .join(", ");
          throw new Error(
            `Selector creators expect all input-selectors to be functions, instead received the following types: [${r}]`,
          );
        }
        return t;
      }
      r.d(t, { createSelector: () => s });
      const s = ((e) => {
        for (
          let t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        return () => {
          for (let t = arguments.length, n = Array(t), o = 0; o < t; o++)
            n[o] = arguments[o];
          let s = 0;
          const a = n.pop();
          const c = i(n);
          const u = e.apply(
              void 0,
              [
                () => s++, a.apply(null, arguments),
              ].concat(r),
            );
          const l = e(() => {
              for (let e = [], t = c.length, r = 0; r < t; r++)
                e.push(c[r].apply(null, arguments));
              return u.apply(null, e);
            });
          return (
            (l.resultFunc = a),
            (l.dependencies = c),
            (l.recomputations = () => s),
            (l.resetRecomputations = () => (s = 0)),
            l
          );
        };
      })((e) => {
        const t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n;
        let r = null;
        let i = null;
        return () => (
            o(t, r, arguments) || (i = e.apply(null, arguments)),
            (r = arguments),
            i
          );
      });
    },
    12415: (e, t, r) => {
            const n = r(50959);
      const o =
          "function" === typeof Object.is
            ? Object.is
            : (e, t) => (
                  (e === t && (0 !== e || 1 / e === 1 / t)) || (e !== e && t !== t)
                );
      const i = n.useState;
      const s = n.useEffect;
      const a = n.useLayoutEffect;
      const c = n.useDebugValue;
      function u(e) {
        const t = e.getSnapshot;
        e = e.value;
        try {
          const r = t();
          return !o(e, r);
        } catch (e) {
          return !0;
        }
      }
      const l =
        "undefined" === typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
          ? (e, t) => t()
          : (e, t) => {
              const r = t();
              const n = i({ inst: { value: r, getSnapshot: t } });
              const o = n[0].inst;
              const l = n[1];
              return (
                a(
                  () => {
                    (o.value = r), (o.getSnapshot = t), u(o) && l({ inst: o });
                  },
                  [e, r, t],
                ),
                s(
                  () => (
                      u(o) && l({ inst: o }),
                      e(() => {
                        u(o) && l({ inst: o });
                      })
                    ),
                  [e],
                ),
                c(r),
                r
              );
            };
      t.useSyncExternalStore =
        void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : l;
    },
    2179: (e, t, r) => {
            const n = r(50959);
            const o = r(4322);
      const i =
          "function" === typeof Object.is
            ? Object.is
            : (e, t) => (
                  (e === t && (0 !== e || 1 / e === 1 / t)) || (e !== e && t !== t)
                );
      let s = o.useSyncExternalStore;
      let a = n.useRef;
      let c = n.useEffect;
      const u = n.useMemo;
      const l = n.useDebugValue;
      t.useSyncExternalStoreWithSelector = (e, t, r, n, o) => {
        let d = a(null);
        if (null === d.current) {
          const f = { hasValue: !1, value: null };
          d.current = f;
        } else f = d.current;
        d = u(
          () => {
            function e(e) {
              if (!c) {
                if (
                  ((c = !0), (s = e), (e = n(e)), void 0 !== o && f.hasValue)
                ) {
                  const t = f.value;
                  if (o(t, e)) return (a = t);
                }
                return (a = e);
              }
              if (((t = a), i(s, e))) return t;
              const r = n(e);
              return void 0 !== o && o(t, r) ? t : ((s = e), (a = r));
            }
            let s;
            let a;
            const c = !1;
            const u = void 0 === r ? null : r;
            return [
              () => e(t()),
              null === u
                ? void 0
                : () => e(u()),
            ];
          },
          [t, r, n, o],
        );
        const h = s(e, d[0], d[1]);
        return (
          c(
            () => {
              (f.hasValue = !0), (f.value = h);
            },
            [h],
          ),
          l(h),
          h
        );
      };
    },
    4322: (e, t, r) => {
            e.exports = r(12415);
    },
    7231: (e, t, r) => {
            e.exports = r(2179);
    },
    15882: (e, t, r) => {
            function n() {
        return (
          (n = Object.assign
            ? Object.assign.bind()
            : (e) => {
                for (let t = 1; t < arguments.length; t++) {
                  const r = arguments[t];
                  for (const n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
          n.apply(this, arguments)
        );
      }
      r.d(t, { default: () => n });
    },
    30950: (e, t, r) => {
            function n(e, t) {
        if (null == e) return {};
        let r;
        let n;
        const o = {};
        const i = Object.keys(e);
        for (n = 0; n < i.length; n++)
          (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      }
      r.d(t, { default: () => n });
    },
    6346: (e, t, r) => {
            function n(e, t, ...r) {
        if ("undefined" !== typeof process && void 0 === t)
          throw new Error("invariant requires an error message argument");
        if (!e) {
          let e;
          if (void 0 === t)
            e = new Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
            );
          else {
            let n = 0;
            (e = new Error(
              t.replace(/%s/g, () => r[n++]),
            )),
              (e.name = "Invariant Violation");
          }
          throw ((e.framesToPop = 1), e);
        }
      }
      r.d(t, { invariant: () => n });
    },
    98789: (e, t, r) => {
            function n(e, t, r, n) {
        let o = r ? r.call(n, e, t) : void 0;
        if (void 0 !== o) return !!o;
        if (e === t) return !0;
        if ("object" !== typeof e || !e || "object" !== typeof t || !t) return !1;
        const i = Object.keys(e);
        const s = Object.keys(t);
        if (i.length !== s.length) return !1;
        const a = Object.prototype.hasOwnProperty.bind(t);
        for (let s = 0; s < i.length; s++) {
          const c = i[s];
          if (!a(c)) return !1;
          const u = e[c];
          const l = t[c];
          if (
            ((o = r ? r.call(n, u, l, c) : void 0),
            !1 === o || (void 0 === o && u !== l))
          )
            return !1;
        }
        return !0;
      }
      r.d(t, { shallowEqual: () => n });
    },
    98314: (e, t, r) => {
            let n;
      function o() {
        return (
          n ||
            ((n = new Image()),
            (n.src =
              "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")),
          n
        );
      }
      r.d(t, { getEmptyImage: () => o });
    },
    10170: (e, t, r) => {
            r.d(t, { HTML5Backend: () => w });
      const n = {};
      function o(e) {
        let t = null;
        return () => (null == t && (t = e()), t);
      }
      r.r(n),
        r.d(n, { FILE: () => a, HTML: () => l, TEXT: () => u, URL: () => c });
      class i {
        enter(e) {
          const t = this.entered.length;
          return (
            (this.entered = ((e, t) => {
              const r = new Set();
              const n = (e) => r.add(e);
              e.forEach(n), t.forEach(n);
              const o = [];
              return r.forEach((e) => o.push(e)), o;
            })(
              this.entered.filter(
                (t) =>
                  this.isNodeInDocument(t) && (!t.contains || t.contains(e)),
              ),
              [e],
            )),
            0 === t && this.entered.length > 0
          );
        }
        leave(e) {
          const t = this.entered.length;
          let r;
          let n;
          return (
            (this.entered =
              ((r = this.entered.filter(this.isNodeInDocument)),
              (n = e),
              r.filter((e) => e !== n))),
            t > 0 && 0 === this.entered.length
          );
        }
        reset() {
          this.entered = [];
        }
        constructor(e) {
          (this.entered = []), (this.isNodeInDocument = e);
        }
      }
      class s {
        initializeExposedProperties() {
          Object.keys(this.config.exposeProperties).forEach((e) => {
            Object.defineProperty(this.item, e, {
              configurable: !0,
              enumerable: !0,
              get: () => (
                console.warn(
                  `Browser doesn't allow reading "${e}" until the drop event.`,
                ),
                null
              ),
            });
          });
        }
        loadDataTransfer(e) {
          if (e) {
            const t = {};
            Object.keys(this.config.exposeProperties).forEach((r) => {
              const n = this.config.exposeProperties[r];
              null != n &&
                (t[r] = {
                  value: n(e, this.config.matchesTypes),
                  configurable: !0,
                  enumerable: !0,
                });
            }),
              Object.defineProperties(this.item, t);
          }
        }
        canDrag() {
          return !0;
        }
        beginDrag() {
          return this.item;
        }
        isDragging(e, t) {
          return t === e.getSourceId();
        }
        endDrag() {}
        constructor(e) {
          (this.config = e),
            (this.item = {}),
            this.initializeExposedProperties();
        }
      }
      const a = "__NATIVE_FILE__";
      const c = "__NATIVE_URL__";
      const u = "__NATIVE_TEXT__";
      const l = "__NATIVE_HTML__";
      function d(e, t, r) {
        const n = t.reduce((t, r) => t || e.getData(r), "");
        return null != n ? n : r;
      }
      const f = {
        [a]: {
          exposeProperties: {
            files: (e) => Array.prototype.slice.call(e.files),
            items: (e) => e.items,
            dataTransfer: (e) => e,
          },
          matchesTypes: ["Files"],
        },
        [l]: {
          exposeProperties: {
            html: (e, t) => d(e, t, ""),
            dataTransfer: (e) => e,
          },
          matchesTypes: ["Html", "text/html"],
        },
        [c]: {
          exposeProperties: {
            urls: (e, t) => d(e, t, "").split("\n"),
            dataTransfer: (e) => e,
          },
          matchesTypes: ["Url", "text/uri-list"],
        },
        [u]: {
          exposeProperties: {
            text: (e, t) => d(e, t, ""),
            dataTransfer: (e) => e,
          },
          matchesTypes: ["Text", "text/plain"],
        },
      };
      function h(e) {
        if (!e) return null;
        const t = Array.prototype.slice.call(e.types || []);
        return (
          Object.keys(f).filter((e) => {
            const r = f[e];
            return (
              !!(null == r ? void 0 : r.matchesTypes) &&
              r.matchesTypes.some((e) => t.indexOf(e) > -1)
            );
          })[0] || null
        );
      }
      const g = o(() => /firefox/i.test(navigator.userAgent));
      const p = o(() => Boolean(window.safari));
      class v {
        interpolate(e) {
          const { xs: t, ys: r, c1s: n, c2s: o, c3s: i } = this;
          let s = t.length - 1;
          if (e === t[s]) return r[s];
          let a;
          let c = 0;
          let u = i.length - 1;
          while (c <= u) {
            a = Math.floor(0.5 * (c + u));
            const n = t[a];
            if (n < e) c = a + 1;
            else {
              if (!(n > e)) return r[a];
              u = a - 1;
            }
          }
          s = Math.max(0, u);
          const l = e - t[s];
          const d = l * l;
          return r[s] + n[s] * l + o[s] * d + i[s] * l * d;
        }
        constructor(e, t) {
          const { length: r } = e;
          const n = [];
          for (let e = 0; e < r; e++) n.push(e);
          n.sort((t, r) => (e[t] < e[r] ? -1 : 1));
          const o = [];
          const i = [];
          const s = [];
          let a;
          let c;
          for (let n = 0; n < r - 1; n++)
            (a = e[n + 1] - e[n]),
              (c = t[n + 1] - t[n]),
              i.push(a),
              o.push(c),
              s.push(c / a);
          const u = [s[0]];
          for (let e = 0; e < i.length - 1; e++) {
            const t = s[e];
            const r = s[e + 1];
            if (t * r <= 0) u.push(0);
            else {
              a = i[e];
              const n = i[e + 1];
              const o = a + n;
              u.push((3 * o) / ((o + n) / t + (o + a) / r));
            }
          }
          u.push(s[s.length - 1]);
          const l = [];
          const d = [];
          let f;
          for (let e = 0; e < u.length - 1; e++) {
            f = s[e];
            const t = u[e];
            const r = 1 / i[e];
            const n = t + u[e + 1] - f - f;
            l.push((f - t - n) * r), d.push(n * r * r);
          }
          (this.xs = e),
            (this.ys = t),
            (this.c1s = u),
            (this.c2s = l),
            (this.c3s = d);
        }
      }
      function y(e) {
        const t = 1 === e.nodeType ? e : e.parentElement;
        if (!t) return null;
        const { top: r, left: n } = t.getBoundingClientRect();
        return { x: n, y: r };
      }
      function m(e) {
        return { x: e.clientX, y: e.clientY };
      }
      function S(e, t, r, n, o) {
        const i =
          "IMG" === (s = t).nodeName &&
          (g() ||
            !(null === (a = document.documentElement) || void 0 === a
              ? void 0
              : a.contains(s)));
        let s;
        let a;
        const c = y(i ? e : t);
        const u = { x: r.x - c.x, y: r.y - c.y };
        const { offsetWidth: l, offsetHeight: d } = e;
        const { anchorX: f, anchorY: h } = n;
        const { dragPreviewWidth: m, dragPreviewHeight: S } = ((
            e,
            t,
            r,
            n,
          ) => {
            let o = e ? t.width : r;
            let i = e ? t.height : n;
            return (
              p() &&
                e &&
                ((i /= window.devicePixelRatio),
                (o /= window.devicePixelRatio)),
              { dragPreviewWidth: o, dragPreviewHeight: i }
            );
          })(i, t, l, d);
        const { offsetX: b, offsetY: O } = o;
        const E = 0 === O || O;
        return {
          x:
            0 === b || b
              ? b
              : new v(
                  [0, 0.5, 1],
                  [u.x, (u.x / l) * m, u.x + m - l],
                ).interpolate(f),
          y: E
            ? O
            : (() => {
                let e = new v(
                  [0, 0.5, 1],
                  [u.y, (u.y / d) * S, u.y + S - d],
                ).interpolate(h);
                return p() && i && (e += (window.devicePixelRatio - 1) * S), e;
              })(),
        };
      }
      class b {
        get window() {
          return this.globalContext
            ? this.globalContext
            : "undefined" !== typeof window
            ? window
            : void 0;
        }
        get document() {
          let e;
          return (
            null === (e = this.globalContext) || void 0 === e
              ? void 0
              : e.document
          )
            ? this.globalContext.document
            : this.window
            ? this.window.document
            : void 0;
        }
        get rootElement() {
          let e;
          return (
            (null === (e = this.optionsArgs) || void 0 === e
              ? void 0
              : e.rootElement) || this.window
          );
        }
        constructor(e, t) {
          (this.ownerDocument = null),
            (this.globalContext = e),
            (this.optionsArgs = t);
        }
      }
      function O(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function E(e) {
        for (let t = 1; t < arguments.length; t++) {
          const r = null != arguments[t] ? arguments[t] : {};
          let n = Object.keys(r);
          "function" === typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter((e) => Object.getOwnPropertyDescriptor(r, e).enumerable),
            )),
            n.forEach((t) => {
              O(e, t, r[t]);
            });
        }
        return e;
      }
      class T {
        profile() {
          let e;
          let t;
          return {
            sourcePreviewNodes: this.sourcePreviewNodes.size,
            sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
            sourceNodeOptions: this.sourceNodeOptions.size,
            sourceNodes: this.sourceNodes.size,
            dragStartSourceIds:
              (null === (e = this.dragStartSourceIds) || void 0 === e
                ? void 0
                : e.length) || 0,
            dropTargetIds: this.dropTargetIds.length,
            dragEnterTargetIds: this.dragEnterTargetIds.length,
            dragOverTargetIds:
              (null === (t = this.dragOverTargetIds) || void 0 === t
                ? void 0
                : t.length) || 0,
          };
        }
        get window() {
          return this.options.window;
        }
        get document() {
          return this.options.document;
        }
        get rootElement() {
          return this.options.rootElement;
        }
        setup() {
          const e = this.rootElement;
          if (void 0 !== e) {
            if (e.__isReactDndBackendSetUp)
              throw new Error(
                "Cannot have two HTML5 backends at the same time.",
              );
            (e.__isReactDndBackendSetUp = !0), this.addEventListeners(e);
          }
        }
        teardown() {
          const e = this.rootElement;
          let t;
          void 0 !== e &&
            ((e.__isReactDndBackendSetUp = !1),
            this.removeEventListeners(this.rootElement),
            this.clearCurrentDragSourceNode(),
            this.asyncEndDragFrameId &&
              (null === (t = this.window) ||
                void 0 === t ||
                t.cancelAnimationFrame(this.asyncEndDragFrameId)));
        }
        connectDragPreview(e, t, r) {
          return (
            this.sourcePreviewNodeOptions.set(e, r),
            this.sourcePreviewNodes.set(e, t),
            () => {
              this.sourcePreviewNodes.delete(e),
                this.sourcePreviewNodeOptions.delete(e);
            }
          );
        }
        connectDragSource(e, t, r) {
          this.sourceNodes.set(e, t), this.sourceNodeOptions.set(e, r);
          const n = (t) => this.handleDragStart(t, e);
          const o = (e) => this.handleSelectStart(e);
          return (
            t.setAttribute("draggable", "true"),
            t.addEventListener("dragstart", n),
            t.addEventListener("selectstart", o),
            () => {
              this.sourceNodes.delete(e),
                this.sourceNodeOptions.delete(e),
                t.removeEventListener("dragstart", n),
                t.removeEventListener("selectstart", o),
                t.setAttribute("draggable", "false");
            }
          );
        }
        connectDropTarget(e, t) {
          const r = (t) => this.handleDragEnter(t, e);
          const n = (t) => this.handleDragOver(t, e);
          const o = (t) => this.handleDrop(t, e);
          return (
            t.addEventListener("dragenter", r),
            t.addEventListener("dragover", n),
            t.addEventListener("drop", o),
            () => {
              t.removeEventListener("dragenter", r),
                t.removeEventListener("dragover", n),
                t.removeEventListener("drop", o);
            }
          );
        }
        addEventListeners(e) {
          e.addEventListener &&
            (e.addEventListener("dragstart", this.handleTopDragStart),
            e.addEventListener("dragstart", this.handleTopDragStartCapture, !0),
            e.addEventListener("dragend", this.handleTopDragEndCapture, !0),
            e.addEventListener("dragenter", this.handleTopDragEnter),
            e.addEventListener("dragenter", this.handleTopDragEnterCapture, !0),
            e.addEventListener("dragleave", this.handleTopDragLeaveCapture, !0),
            e.addEventListener("dragover", this.handleTopDragOver),
            e.addEventListener("dragover", this.handleTopDragOverCapture, !0),
            e.addEventListener("drop", this.handleTopDrop),
            e.addEventListener("drop", this.handleTopDropCapture, !0));
        }
        removeEventListeners(e) {
          e.removeEventListener &&
            (e.removeEventListener("dragstart", this.handleTopDragStart),
            e.removeEventListener(
              "dragstart",
              this.handleTopDragStartCapture,
              !0,
            ),
            e.removeEventListener("dragend", this.handleTopDragEndCapture, !0),
            e.removeEventListener("dragenter", this.handleTopDragEnter),
            e.removeEventListener(
              "dragenter",
              this.handleTopDragEnterCapture,
              !0,
            ),
            e.removeEventListener(
              "dragleave",
              this.handleTopDragLeaveCapture,
              !0,
            ),
            e.removeEventListener("dragover", this.handleTopDragOver),
            e.removeEventListener(
              "dragover",
              this.handleTopDragOverCapture,
              !0,
            ),
            e.removeEventListener("drop", this.handleTopDrop),
            e.removeEventListener("drop", this.handleTopDropCapture, !0));
        }
        getCurrentSourceNodeOptions() {
          const e = this.monitor.getSourceId();
          const t = this.sourceNodeOptions.get(e);
          return E(
            { dropEffect: this.altKeyPressed ? "copy" : "move" },
            t || {},
          );
        }
        getCurrentDropEffect() {
          return this.isDraggingNativeItem()
            ? "copy"
            : this.getCurrentSourceNodeOptions().dropEffect;
        }
        getCurrentSourcePreviewNodeOptions() {
          const e = this.monitor.getSourceId();
          return E(
            { anchorX: 0.5, anchorY: 0.5, captureDraggingState: !1 },
            this.sourcePreviewNodeOptions.get(e) || {},
          );
        }
        isDraggingNativeItem() {
          const e = this.monitor.getItemType();
          return Object.keys(n).some((t) => n[t] === e);
        }
        beginDragNativeItem(e, t) {
          this.clearCurrentDragSourceNode(),
            (this.currentNativeSource = ((e, t) => {
              const r = f[e];
              if (!r) throw new Error(`native type ${e} has no configuration`);
              const n = new s(r);
              return n.loadDataTransfer(t), n;
            })(e, t)),
            (this.currentNativeHandle = this.registry.addSource(
              e,
              this.currentNativeSource,
            )),
            this.actions.beginDrag([this.currentNativeHandle]);
        }
        setCurrentDragSourceNode(e) {
          this.clearCurrentDragSourceNode(), (this.currentDragSourceNode = e);
          this.mouseMoveTimeoutTimer = setTimeout(() => {
            let e;
            return null === (e = this.rootElement) || void 0 === e
              ? void 0
              : e.addEventListener(
                  "mousemove",
                  this.endDragIfSourceWasRemovedFromDOM,
                  !0,
                );
          }, 1e3);
        }
        clearCurrentDragSourceNode() {
          if (this.currentDragSourceNode) {
            let e;
            if (((this.currentDragSourceNode = null), this.rootElement))
              null === (e = this.window) ||
                void 0 === e ||
                e.clearTimeout(this.mouseMoveTimeoutTimer || void 0),
                this.rootElement.removeEventListener(
                  "mousemove",
                  this.endDragIfSourceWasRemovedFromDOM,
                  !0,
                );
            return (this.mouseMoveTimeoutTimer = null), !0;
          }
          return !1;
        }
        handleDragStart(e, t) {
          e.defaultPrevented ||
            (this.dragStartSourceIds || (this.dragStartSourceIds = []),
            this.dragStartSourceIds.unshift(t));
        }
        handleDragEnter(e, t) {
          this.dragEnterTargetIds.unshift(t);
        }
        handleDragOver(e, t) {
          null === this.dragOverTargetIds && (this.dragOverTargetIds = []),
            this.dragOverTargetIds.unshift(t);
        }
        handleDrop(e, t) {
          this.dropTargetIds.unshift(t);
        }
        constructor(e, t, r) {
          (this.sourcePreviewNodes = new Map()),
            (this.sourcePreviewNodeOptions = new Map()),
            (this.sourceNodes = new Map()),
            (this.sourceNodeOptions = new Map()),
            (this.dragStartSourceIds = null),
            (this.dropTargetIds = []),
            (this.dragEnterTargetIds = []),
            (this.currentNativeSource = null),
            (this.currentNativeHandle = null),
            (this.currentDragSourceNode = null),
            (this.altKeyPressed = !1),
            (this.mouseMoveTimeoutTimer = null),
            (this.asyncEndDragFrameId = null),
            (this.dragOverTargetIds = null),
            (this.lastClientOffset = null),
            (this.hoverRafId = null),
            (this.getSourceClientOffset = (e) => {
              const t = this.sourceNodes.get(e);
              return (t && y(t)) || null;
            }),
            (this.endDragNativeItem = () => {
              this.isDraggingNativeItem() &&
                (this.actions.endDrag(),
                this.currentNativeHandle &&
                  this.registry.removeSource(this.currentNativeHandle),
                (this.currentNativeHandle = null),
                (this.currentNativeSource = null));
            }),
            (this.isNodeInDocument = (e) =>
              Boolean(
                e &&
                  this.document &&
                  this.document.body &&
                  this.document.body.contains(e),
              )),
            (this.endDragIfSourceWasRemovedFromDOM = () => {
              const e = this.currentDragSourceNode;
              null == e ||
                this.isNodeInDocument(e) ||
                (this.clearCurrentDragSourceNode() &&
                  this.monitor.isDragging() &&
                  this.actions.endDrag(),
                this.cancelHover());
            }),
            (this.scheduleHover = (e) => {
              null === this.hoverRafId &&
                "undefined" !== typeof requestAnimationFrame &&
                (this.hoverRafId = requestAnimationFrame(() => {
                  this.monitor.isDragging() &&
                    this.actions.hover(e || [], {
                      clientOffset: this.lastClientOffset,
                    }),
                    (this.hoverRafId = null);
                }));
            }),
            (this.cancelHover = () => {
              null !== this.hoverRafId &&
                "undefined" !== typeof cancelAnimationFrame &&
                (cancelAnimationFrame(this.hoverRafId),
                (this.hoverRafId = null));
            }),
            (this.handleTopDragStartCapture = () => {
              this.clearCurrentDragSourceNode(), (this.dragStartSourceIds = []);
            }),
            (this.handleTopDragStart = (e) => {
              if (e.defaultPrevented) return;
              const { dragStartSourceIds: t } = this;
              this.dragStartSourceIds = null;
              const r = m(e);
              this.monitor.isDragging() &&
                (this.actions.endDrag(), this.cancelHover()),
                this.actions.beginDrag(t || [], {
                  publishSource: !1,
                  getSourceClientOffset: this.getSourceClientOffset,
                  clientOffset: r,
                });
              const { dataTransfer: n } = e;
              const o = h(n);
              if (this.monitor.isDragging()) {
                if (n && "function" === typeof n.setDragImage) {
                  const e = this.monitor.getSourceId();
                  const t = this.sourceNodes.get(e);
                  const o = this.sourcePreviewNodes.get(e) || t;
                  if (o) {
                    const {
                        anchorX: e,
                        anchorY: i,
                        offsetX: s,
                        offsetY: a,
                      } = this.getCurrentSourcePreviewNodeOptions();
                    const c = S(
                        t,
                        o,
                        r,
                        { anchorX: e, anchorY: i },
                        { offsetX: s, offsetY: a },
                      );
                    n.setDragImage(o, c.x, c.y);
                  }
                }
                try {
                  null == n || n.setData("application/json", {});
                } catch (e) {}
                this.setCurrentDragSourceNode(e.target);
                const { captureDraggingState: t } =
                  this.getCurrentSourcePreviewNodeOptions();
                t
                  ? this.actions.publishDragSource()
                  : setTimeout(() => this.actions.publishDragSource(), 0);
              } else if (o) this.beginDragNativeItem(o);
              else {
                if (
                  n &&
                  !n.types &&
                  ((e.target && !e.target.hasAttribute) ||
                    !e.target.hasAttribute("draggable"))
                )
                  return;
                e.preventDefault();
              }
            }),
            (this.handleTopDragEndCapture = () => {
              this.clearCurrentDragSourceNode() &&
                this.monitor.isDragging() &&
                this.actions.endDrag(),
                this.cancelHover();
            }),
            (this.handleTopDragEnterCapture = (e) => {
              let t;
              ((this.dragEnterTargetIds = []), this.isDraggingNativeItem()) &&
                (null === (t = this.currentNativeSource) ||
                  void 0 === t ||
                  t.loadDataTransfer(e.dataTransfer));
              if (
                !this.enterLeaveCounter.enter(e.target) ||
                this.monitor.isDragging()
              )
                return;
              const { dataTransfer: r } = e;
              const n = h(r);
              n && this.beginDragNativeItem(n, r);
            }),
            (this.handleTopDragEnter = (e) => {
              const { dragEnterTargetIds: t } = this;
              if (((this.dragEnterTargetIds = []), !this.monitor.isDragging()))
                return;
              (this.altKeyPressed = e.altKey),
                t.length > 0 && this.actions.hover(t, { clientOffset: m(e) });
              t.some((e) => this.monitor.canDropOnTarget(e)) &&
                (e.preventDefault(),
                e.dataTransfer &&
                  (e.dataTransfer.dropEffect = this.getCurrentDropEffect()));
            }),
            (this.handleTopDragOverCapture = (e) => {
              let t;
              ((this.dragOverTargetIds = []), this.isDraggingNativeItem()) &&
                (null === (t = this.currentNativeSource) ||
                  void 0 === t ||
                  t.loadDataTransfer(e.dataTransfer));
            }),
            (this.handleTopDragOver = (e) => {
              const { dragOverTargetIds: t } = this;
              if (((this.dragOverTargetIds = []), !this.monitor.isDragging()))
                return (
                  e.preventDefault(),
                  void (e.dataTransfer && (e.dataTransfer.dropEffect = "none"))
                );
              (this.altKeyPressed = e.altKey),
                (this.lastClientOffset = m(e)),
                this.scheduleHover(t);
              (t || []).some((e) => this.monitor.canDropOnTarget(e))
                ? (e.preventDefault(),
                  e.dataTransfer &&
                    (e.dataTransfer.dropEffect = this.getCurrentDropEffect()))
                : this.isDraggingNativeItem()
                ? e.preventDefault()
                : (e.preventDefault(),
                  e.dataTransfer && (e.dataTransfer.dropEffect = "none"));
            }),
            (this.handleTopDragLeaveCapture = (e) => {
              this.isDraggingNativeItem() && e.preventDefault();
              this.enterLeaveCounter.leave(e.target) &&
                (this.isDraggingNativeItem() &&
                  setTimeout(() => this.endDragNativeItem(), 0),
                this.cancelHover());
            }),
            (this.handleTopDropCapture = (e) => {
              let t;
              ((this.dropTargetIds = []), this.isDraggingNativeItem())
                ? (e.preventDefault(),
                  null === (t = this.currentNativeSource) ||
                    void 0 === t ||
                    t.loadDataTransfer(e.dataTransfer))
                : h(e.dataTransfer) && e.preventDefault();
              this.enterLeaveCounter.reset();
            }),
            (this.handleTopDrop = (e) => {
              const { dropTargetIds: t } = this;
              (this.dropTargetIds = []),
                this.actions.hover(t, { clientOffset: m(e) }),
                this.actions.drop({ dropEffect: this.getCurrentDropEffect() }),
                this.isDraggingNativeItem()
                  ? this.endDragNativeItem()
                  : this.monitor.isDragging() && this.actions.endDrag(),
                this.cancelHover();
            }),
            (this.handleSelectStart = (e) => {
              const t = e.target;
              "function" === typeof t.dragDrop &&
                ("INPUT" === t.tagName ||
                  "SELECT" === t.tagName ||
                  "TEXTAREA" === t.tagName ||
                  t.isContentEditable ||
                  (e.preventDefault(), t.dragDrop()));
            }),
            (this.options = new b(t, r)),
            (this.actions = e.getActions()),
            (this.monitor = e.getMonitor()),
            (this.registry = e.getRegistry()),
            (this.enterLeaveCounter = new i(this.isNodeInDocument));
        }
      }
      const w = (e, t, r) => new T(e, t, r);
    },
    7809: (e, t, r) => {
            r.d(t, { TouchBackend: () => g });
      let n;
      const o = r(6346);
      !((e) => {
        (e.mouse = "mouse"), (e.touch = "touch"), (e.keyboard = "keyboard");
      })(n || (n = {}));
      class i {
        get delay() {
          let e;
          return null !== (e = this.args.delay) && void 0 !== e ? e : 0;
        }
        get scrollAngleRanges() {
          return this.args.scrollAngleRanges;
        }
        get getDropTargetElementsAtPoint() {
          return this.args.getDropTargetElementsAtPoint;
        }
        get ignoreContextMenu() {
          let e;
          return (
            null !== (e = this.args.ignoreContextMenu) && void 0 !== e && e
          );
        }
        get enableHoverOutsideTarget() {
          let e;
          return (
            null !== (e = this.args.enableHoverOutsideTarget) &&
            void 0 !== e &&
            e
          );
        }
        get enableKeyboardEvents() {
          let e;
          return (
            null !== (e = this.args.enableKeyboardEvents) && void 0 !== e && e
          );
        }
        get enableMouseEvents() {
          let e;
          return (
            null !== (e = this.args.enableMouseEvents) && void 0 !== e && e
          );
        }
        get enableTouchEvents() {
          let e;
          return (
            null === (e = this.args.enableTouchEvents) || void 0 === e || e
          );
        }
        get touchSlop() {
          return this.args.touchSlop || 0;
        }
        get delayTouchStart() {
          let e;
          let t;
          let r;
          let n;
          return null !==
            (n =
              null !==
                (r =
                  null === (e = this.args) || void 0 === e
                    ? void 0
                    : e.delayTouchStart) && void 0 !== r
                ? r
                : null === (t = this.args) || void 0 === t
                ? void 0
                : t.delay) && void 0 !== n
            ? n
            : 0;
        }
        get delayMouseStart() {
          let e;
          let t;
          let r;
          let n;
          return null !==
            (n =
              null !==
                (r =
                  null === (e = this.args) || void 0 === e
                    ? void 0
                    : e.delayMouseStart) && void 0 !== r
                ? r
                : null === (t = this.args) || void 0 === t
                ? void 0
                : t.delay) && void 0 !== n
            ? n
            : 0;
        }
        get window() {
          return this.context?.window
            ? this.context.window
            : "undefined" !== typeof window
            ? window
            : void 0;
        }
        get document() {
          let e;
          return (
            null === (e = this.context) || void 0 === e ? void 0 : e.document
          )
            ? this.context.document
            : this.window
            ? this.window.document
            : void 0;
        }
        get rootElement() {
          let e;
          return (
            (null === (e = this.args) || void 0 === e
              ? void 0
              : e.rootElement) || this.document
          );
        }
        constructor(e, t) {
          (this.args = e), (this.context = t);
        }
      }
      const s = 1;
      const a = 0;
      function c(e) {
        return void 0 === e.button || e.button === a;
      }
      function u(e) {
        return !!e.targetTouches;
      }
      function l(e, t) {
        return u(e)
          ? ((e, t) => 1 === e.targetTouches.length
                ? l(e.targetTouches[0])
                : t &&
                  1 === e.touches.length &&
                  e.touches[0].target === t.target
                ? l(e.touches[0])
                : void 0)(e, t)
          : { x: e.clientX, y: e.clientY };
      }
      const d = (() => {
          let e = !1;
          try {
            addEventListener(
              "test",
              () => {},
              Object.defineProperty({}, "passive", {
                get: () => ((e = !0), !0),
              }),
            );
          } catch (e) {}
          return e;
        })();
      const f = {
          [n.mouse]: {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup",
            contextmenu: "contextmenu",
          },
          [n.touch]: {
            start: "touchstart",
            move: "touchmove",
            end: "touchend",
          },
          [n.keyboard]: { keydown: "keydown" },
        };
      class h {
        profile() {
          let e;
          return {
            sourceNodes: this.sourceNodes.size,
            sourcePreviewNodes: this.sourcePreviewNodes.size,
            sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
            targetNodes: this.targetNodes.size,
            dragOverTargetIds:
              (null === (e = this.dragOverTargetIds) || void 0 === e
                ? void 0
                : e.length) || 0,
          };
        }
        get document() {
          return this.options.document;
        }
        setup() {
          const e = this.options.rootElement;
          e &&
            ((0, o.invariant)(
              !h.isSetUp,
              "Cannot have two Touch backends at the same time.",
            ),
            (h.isSetUp = !0),
            this.addEventListener(e, "start", this.getTopMoveStartHandler()),
            this.addEventListener(
              e,
              "start",
              this.handleTopMoveStartCapture,
              !0,
            ),
            this.addEventListener(e, "move", this.handleTopMove),
            this.addEventListener(e, "move", this.handleTopMoveCapture, !0),
            this.addEventListener(e, "end", this.handleTopMoveEndCapture, !0),
            this.options.enableMouseEvents &&
              !this.options.ignoreContextMenu &&
              this.addEventListener(
                e,
                "contextmenu",
                this.handleTopMoveEndCapture,
              ),
            this.options.enableKeyboardEvents &&
              this.addEventListener(
                e,
                "keydown",
                this.handleCancelOnEscape,
                !0,
              ));
        }
        teardown() {
          const e = this.options.rootElement;
          e &&
            ((h.isSetUp = !1),
            (this._mouseClientOffset = {}),
            this.removeEventListener(
              e,
              "start",
              this.handleTopMoveStartCapture,
              !0,
            ),
            this.removeEventListener(e, "start", this.handleTopMoveStart),
            this.removeEventListener(e, "move", this.handleTopMoveCapture, !0),
            this.removeEventListener(e, "move", this.handleTopMove),
            this.removeEventListener(
              e,
              "end",
              this.handleTopMoveEndCapture,
              !0,
            ),
            this.options.enableMouseEvents &&
              !this.options.ignoreContextMenu &&
              this.removeEventListener(
                e,
                "contextmenu",
                this.handleTopMoveEndCapture,
              ),
            this.options.enableKeyboardEvents &&
              this.removeEventListener(
                e,
                "keydown",
                this.handleCancelOnEscape,
                !0,
              ),
            this.uninstallSourceNodeRemovalObserver());
        }
        addEventListener(e, t, r, n = !1) {
          const o = d ? { capture: n, passive: !1 } : n;
          this.listenerTypes.forEach((n) => {
            const i = f[n][t];
            i && e.addEventListener(i, r, o);
          });
        }
        removeEventListener(e, t, r, n = !1) {
          const o = d ? { capture: n, passive: !1 } : n;
          this.listenerTypes.forEach((n) => {
            const i = f[n][t];
            i && e.removeEventListener(i, r, o);
          });
        }
        connectDragSource(e, t) {
          const r = this.handleMoveStart.bind(this, e);
          return (
            this.sourceNodes.set(e, t),
            this.addEventListener(t, "start", r),
            () => {
              this.sourceNodes.delete(e),
                this.removeEventListener(t, "start", r);
            }
          );
        }
        connectDragPreview(e, t, r) {
          return (
            this.sourcePreviewNodeOptions.set(e, r),
            this.sourcePreviewNodes.set(e, t),
            () => {
              this.sourcePreviewNodes.delete(e),
                this.sourcePreviewNodeOptions.delete(e);
            }
          );
        }
        connectDropTarget(e, t) {
          const r = this.options.rootElement;
          if (!this.document || !r) return () => {};
          const n = (n) => {
            if (!this.document || !r || !this.monitor.isDragging()) return;
            let o;
            switch (n.type) {
              case f.mouse.move:
                o = { x: n.clientX, y: n.clientY };
                break;
              case f.touch.move: {
                let i;
                let s;
                o = {
                  x:
                    (null === (i = n.touches[0]) || void 0 === i
                      ? void 0
                      : i.clientX) || 0,
                  y:
                    (null === (s = n.touches[0]) || void 0 === s
                      ? void 0
                      : s.clientY) || 0,
                };
              }
            }
            const a =
                null != o ? this.document.elementFromPoint(o.x, o.y) : void 0;
            const c = a && t.contains(a);
            return a === t || c ? this.handleMove(n, e) : void 0;
          };
          return (
            this.addEventListener(this.document.body, "move", n),
            this.targetNodes.set(e, t),
            () => {
              this.document &&
                (this.targetNodes.delete(e),
                this.removeEventListener(this.document.body, "move", n));
            }
          );
        }
        getTopMoveStartHandler() {
          return this.options.delayTouchStart || this.options.delayMouseStart
            ? this.handleTopMoveStartDelay
            : this.handleTopMoveStart;
        }
        installSourceNodeRemovalObserver(e) {
          this.uninstallSourceNodeRemovalObserver(),
            (this.draggedSourceNode = e),
            (this.draggedSourceNodeRemovalObserver = new MutationObserver(
              () => {
                e &&
                  !e.parentElement &&
                  (this.resurrectSourceNode(),
                  this.uninstallSourceNodeRemovalObserver());
              },
            )),
            e?.parentElement &&
              this.draggedSourceNodeRemovalObserver.observe(e.parentElement, {
                childList: !0,
              });
        }
        resurrectSourceNode() {
          this.document &&
            this.draggedSourceNode &&
            ((this.draggedSourceNode.style.display = "none"),
            this.draggedSourceNode.removeAttribute("data-reactid"),
            this.document.body.appendChild(this.draggedSourceNode));
        }
        uninstallSourceNodeRemovalObserver() {
          this.draggedSourceNodeRemovalObserver?.disconnect(),
            (this.draggedSourceNodeRemovalObserver = void 0),
            (this.draggedSourceNode = void 0);
        }
        constructor(e, t, r) {
          (this.getSourceClientOffset = (e) => {
            const t = this.sourceNodes.get(e);
            return (
              t &&
              ((e) => {
                const t = 1 === e.nodeType ? e : e.parentElement;
                if (!t) return;
                const { top: r, left: n } = t.getBoundingClientRect();
                return { x: n, y: r };
              })(t)
            );
          }),
            (this.handleTopMoveStartCapture = (e) => {
              c(e) && (this.moveStartSourceIds = []);
            }),
            (this.handleMoveStart = (e) => {
              Array.isArray(this.moveStartSourceIds) &&
                this.moveStartSourceIds.unshift(e);
            }),
            (this.handleTopMoveStart = (e) => {
              if (!c(e)) return;
              const t = l(e);
              t &&
                (u(e) && (this.lastTargetTouchFallback = e.targetTouches[0]),
                (this._mouseClientOffset = t)),
                (this.waitingForDelay = !1);
            }),
            (this.handleTopMoveStartDelay = (e) => {
              if (!c(e)) return;
              const t =
                e.type === f.touch.start
                  ? this.options.delayTouchStart
                  : this.options.delayMouseStart;
              (this.timeout = setTimeout(
                this.handleTopMoveStart.bind(this, e),
                t,
              )),
                (this.waitingForDelay = !0);
            }),
            (this.handleTopMoveCapture = () => {
              this.dragOverTargetIds = [];
            }),
            (this.handleMove = (e, t) => {
              this.dragOverTargetIds?.unshift(t);
            }),
            (this.handleTopMove = (e) => {
              if (
                (this.timeout && clearTimeout(this.timeout),
                !this.document || this.waitingForDelay)
              )
                return;
              const { moveStartSourceIds: t, dragOverTargetIds: r } = this;
              const n = this.options.enableHoverOutsideTarget;
              const o = l(e, this.lastTargetTouchFallback);
              if (!o) return;
              if (
                this._isScrolling ||
                (!this.monitor.isDragging() &&
                  ((e, t, r, n, o) => {
                    if (!o) return !1;
                    const i = (180 * Math.atan2(n - t, r - e)) / Math.PI + 180;
                    for (let e = 0; e < o.length; ++e) {
                      const t = o[e];
                      if (
                        t &&
                        (null == t.start || i >= t.start) &&
                        (null == t.end || i <= t.end)
                      )
                        return !0;
                    }
                    return !1;
                  })(
                    this._mouseClientOffset.x || 0,
                    this._mouseClientOffset.y || 0,
                    o.x,
                    o.y,
                    this.options.scrollAngleRanges,
                  ))
              )
                return void (this._isScrolling = !0);
              let i;
              let s;
              let a;
              let c;
              if (
                (!this.monitor.isDragging() &&
                  this._mouseClientOffset.hasOwnProperty("x") &&
                  t &&
                  ((i = this._mouseClientOffset.x || 0),
                  (s = this._mouseClientOffset.y || 0),
                  (a = o.x),
                  (c = o.y),
                  Math.sqrt(
                    Math.abs(a - i) ** 2 + Math.abs(c - s) ** 2,
                  ) > (this.options.touchSlop ? this.options.touchSlop : 0)) &&
                  ((this.moveStartSourceIds = void 0),
                  this.actions.beginDrag(t, {
                    clientOffset: this._mouseClientOffset,
                    getSourceClientOffset: this.getSourceClientOffset,
                    publishSource: !1,
                  })),
                !this.monitor.isDragging())
              )
                return;
              const u = this.sourceNodes.get(this.monitor.getSourceId());
              this.installSourceNodeRemovalObserver(u),
                this.actions.publishDragSource(),
                e.cancelable && e.preventDefault();
              const d = (r || [])
                  .map((e) => this.targetNodes.get(e))
                  .filter((e) => !!e);
              const f = this.options.getDropTargetElementsAtPoint
                  ? this.options.getDropTargetElementsAtPoint(o.x, o.y, d)
                  : this.document.elementsFromPoint(o.x, o.y);
              const h = [];
              for (const e in f) {
                if (!f.hasOwnProperty(e)) continue;
                let t = f[e];
                for (null != t && h.push(t); t; )
                  (t = t.parentElement), t && -1 === h.indexOf(t) && h.push(t);
              }
              const g = h
                .filter((e) => d.indexOf(e) > -1)
                .map((e) => this._getDropTargetId(e))
                .filter((e) => !!e)
                .filter((e, t, r) => r.indexOf(e) === t);
              if (n)
                for (const e in this.targetNodes) {
                  const t = this.targetNodes.get(e);
                  if (u && t && t.contains(u) && -1 === g.indexOf(e)) {
                    g.unshift(e);
                    break;
                  }
                }
              g.reverse(), this.actions.hover(g, { clientOffset: o });
            }),
            (this._getDropTargetId = (e) => {
              const t = this.targetNodes.keys();
              let r = t.next();
              while (!1 === r.done) {
                const n = r.value;
                if (e === this.targetNodes.get(n)) return n;
                r = t.next();
              }
            }),
            (this.handleTopMoveEndCapture = (e) => {
              (this._isScrolling = !1),
                (this.lastTargetTouchFallback = void 0),
                ((e) => void 0 === e.buttons || 0 === (e.buttons & s))(e) &&
                  (this.monitor.isDragging() && !this.monitor.didDrop()
                    ? (e.cancelable && e.preventDefault(),
                      (this._mouseClientOffset = {}),
                      this.uninstallSourceNodeRemovalObserver(),
                      this.actions.drop(),
                      this.actions.endDrag())
                    : (this.moveStartSourceIds = void 0));
            }),
            (this.handleCancelOnEscape = (e) => {
              "Escape" === e.key &&
                this.monitor.isDragging() &&
                ((this._mouseClientOffset = {}),
                this.uninstallSourceNodeRemovalObserver(),
                this.actions.endDrag());
            }),
            (this.options = new i(r, t)),
            (this.actions = e.getActions()),
            (this.monitor = e.getMonitor()),
            (this.sourceNodes = new Map()),
            (this.sourcePreviewNodes = new Map()),
            (this.sourcePreviewNodeOptions = new Map()),
            (this.targetNodes = new Map()),
            (this.listenerTypes = []),
            (this._mouseClientOffset = {}),
            (this._isScrolling = !1),
            this.options.enableMouseEvents && this.listenerTypes.push(n.mouse),
            this.options.enableTouchEvents && this.listenerTypes.push(n.touch),
            this.options.enableKeyboardEvents &&
              this.listenerTypes.push(n.keyboard);
        }
      }
      const g = (e, t = {}, r = {}) => new h(e, t, r);
    },
    81904: (e, t, r) => {
            r.d(t, { DndContext: () => n });
      const n = (0, r(50959).createContext)({ dragDropManager: void 0 });
    },
    23642: (e, t, r) => {
            r.d(t, { DndProvider: () => fe });
      let n = r(16453);
      let o = r(21153);
      const i = r(6346);
      function s(e) {
        return "object" === typeof e;
      }
      const a = "dnd-core/INIT_COORDS";
      const c = "dnd-core/BEGIN_DRAG";
      const u = "dnd-core/PUBLISH_DRAG_SOURCE";
      const l = "dnd-core/HOVER";
      const d = "dnd-core/DROP";
      const f = "dnd-core/END_DRAG";
      function h(e, t) {
        return {
          type: a,
          payload: { sourceClientOffset: t || null, clientOffset: e || null },
        };
      }
      const g = {
        type: a,
        payload: { clientOffset: null, sourceClientOffset: null },
      };
      function p(e) {
        return (t = [], r = { publishSource: !0 }) => {
          const {
              publishSource: n = !0,
              clientOffset: o,
              getSourceClientOffset: a,
            } = r;
          const u = e.getMonitor();
          const l = e.getRegistry();
          e.dispatch(h(o)),
            ((e, t, r) => {
              (0, i.invariant)(
                !t.isDragging(),
                "Cannot call beginDrag while dragging.",
              ),
                e.forEach((e) => {
                  (0,
                  i.invariant)(r.getSource(e), "Expected sourceIds to be registered.");
                });
            })(t, u, l);
          const d = ((e, t) => {
            let r = null;
            for (let n = e.length - 1; n >= 0; n--)
              if (t.canDragSource(e[n])) {
                r = e[n];
                break;
              }
            return r;
          })(t, u);
          if (null == d) return void e.dispatch(g);
          let f = null;
          if (o) {
            if (!a) throw new Error("getSourceClientOffset must be defined");
            !((e) => {
              (0, i.invariant)(
                "function" === typeof e,
                "When clientOffset is provided, getSourceClientOffset must be a function.",
              );
            })(a),
              (f = a(d));
          }
          e.dispatch(h(o, f));
          const p = l.getSource(d).beginDrag(u, d);
          if (null == p) return;
          !((e) => {
            (0, i.invariant)(s(e), "Item must be an object.");
          })(p),
            l.pinSource(d);
          const v = l.getSourceType(d);
          return {
            type: c,
            payload: {
              itemType: v,
              item: p,
              sourceId: d,
              clientOffset: o || null,
              sourceClientOffset: f || null,
              isSourcePublic: !!n,
            },
          };
        };
      }
      function v(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function y(e) {
        for (let t = 1; t < arguments.length; t++) {
          const r = null != arguments[t] ? arguments[t] : {};
          let n = Object.keys(r);
          "function" === typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter((e) => Object.getOwnPropertyDescriptor(r, e).enumerable),
            )),
            n.forEach((t) => {
              v(e, t, r[t]);
            });
        }
        return e;
      }
      function m(e) {
        return (t = {}) => {
          const r = e.getMonitor();
          const n = e.getRegistry();
          !((e) => {
            (0, i.invariant)(
              e.isDragging(),
              "Cannot call drop while not dragging.",
            ),
              (0, i.invariant)(
                !e.didDrop(),
                "Cannot call drop twice during one drag operation.",
              );
          })(r);
          const o = ((e) => {
            const t = e.getTargetIds().filter(e.canDropOnTarget, e);
            return t.reverse(), t;
          })(r);
          o.forEach((o, a) => {
            const c = ((e, t, r, n) => {
                const o = r.getTarget(e);
                let a = o ? o.drop(n, e) : void 0;
                ((e) => {
                  (0, i.invariant)(
                    void 0 === e || s(e),
                    "Drop result must either be an object or undefined.",
                  );
                })(a),
                  void 0 === a && (a = 0 === t ? {} : n.getDropResult());
                return a;
              })(o, a, n, r);
            const u = { type: d, payload: { dropResult: y({}, t, c) } };
            e.dispatch(u);
          });
        };
      }
      function S(e) {
        return () => {
          const t = e.getMonitor();
          const r = e.getRegistry();
          !((e) => {
            (0, i.invariant)(
              e.isDragging(),
              "Cannot call endDrag while not dragging.",
            );
          })(t);
          const n = t.getSourceId();
          if (null != n) {
            r.getSource(n, !0).endDrag(t, n), r.unpinSource();
          }
          return { type: f };
        };
      }
      function b(e, t) {
        return null === t
          ? null === e
          : Array.isArray(e)
          ? e.some((e) => e === t)
          : e === t;
      }
      function O(e) {
        return (t, { clientOffset: r } = {}) => {
          !((e) => {
            (0, i.invariant)(
              Array.isArray(e),
              "Expected targetIds to be an array.",
            );
          })(t);
          const n = t.slice(0);
          const o = e.getMonitor();
          const s = e.getRegistry();
          return (
            ((e, t, r) => {
              for (let n = e.length - 1; n >= 0; n--) {
                const o = e[n];
                b(t.getTargetType(o), r) || e.splice(n, 1);
              }
            })(n, s, o.getItemType()),
            ((e, t, r) => {
              (0, i.invariant)(
                t.isDragging(),
                "Cannot call hover while not dragging.",
              ),
                (0, i.invariant)(!t.didDrop(), "Cannot call hover after drop.");
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                (0, i.invariant)(
                  e.lastIndexOf(n) === t,
                  "Expected targetIds to be unique in the passed array.",
                );
                const o = r.getTarget(n);
                (0, i.invariant)(o, "Expected targetIds to be registered.");
              }
            })(n, o, s),
            ((e, t, r) => {
              e.forEach((e) => {
                r.getTarget(e).hover(t, e);
              });
            })(n, o, s),
            { type: l, payload: { targetIds: n, clientOffset: r || null } }
          );
        };
      }
      function E(e) {
        return () => {
          if (e.getMonitor().isDragging()) return { type: u };
        };
      }
      class T {
        receiveBackend(e) {
          this.backend = e;
        }
        getMonitor() {
          return this.monitor;
        }
        getBackend() {
          return this.backend;
        }
        getRegistry() {
          return this.monitor.registry;
        }
        getActions() {
          const 
            { dispatch: t } = this.store;
          const r = ((e) => ({
              beginDrag: p(e),
              publishDragSource: E(e),
              hover: O(e),
              drop: m(e),
              endDrag: S(e),
            }))(this);
          return Object.keys(r).reduce((n, o) => {
            const i = r[o];
            let s;
            return (
              (n[o] =
                ((s = i),
                (...r) => {
                  const n = s.apply(this, r);
                  void 0 !== n && t(n);
                })),
              n
            );
          }, {});
        }
        dispatch(e) {
          this.store.dispatch(e);
        }
        constructor(e, t) {
          (this.isSetUp = !1),
            (this.handleRefCountChange = () => {
              const e = this.store.getState().refCount > 0;
              this.backend &&
                (e && !this.isSetUp
                  ? (this.backend.setup(), (this.isSetUp = !0))
                  : !e &&
                    this.isSetUp &&
                    (this.backend.teardown(), (this.isSetUp = !1)));
            }),
            (this.store = e),
            (this.monitor = t),
            e.subscribe(this.handleRefCountChange);
        }
      }
      function w(e, t) {
        return { x: e.x - t.x, y: e.y - t.y };
      }
      const D = [];
      const C = [];
      (D.__IS_NONE__ = !0), (C.__IS_ALL__ = !0);
      class I {
        subscribeToStateChange(e, t = {}) {
          let { handlerIds: r } = t;
          (0, i.invariant)(
            "function" === typeof e,
            "listener must be a function.",
          ),
            (0, i.invariant)(
              void 0 === r || Array.isArray(r),
              "handlerIds, when specified, must be an array of strings.",
            );
          let n = this.store.getState().stateId;
          return this.store.subscribe(() => {
            const t = this.store.getState();
            const o = t.stateId;
            try {
              const i =
                o === n ||
                (o === n + 1 &&
                  !((e, t) => (
                      e !== D &&
                      (e === C ||
                        void 0 === t ||
                        ((r = e), t.filter((e) => r.indexOf(e) > -1)).length >
                          0)
                    ))(t.dirtyHandlerIds, r));
              i || e();
            } finally {
              n = o;
            }
          });
        }
        subscribeToOffsetChange(e) {
          (0, i.invariant)(
            "function" === typeof e,
            "listener must be a function.",
          );
          let t = this.store.getState().dragOffset;
          return this.store.subscribe(() => {
            const r = this.store.getState().dragOffset;
            r !== t && ((t = r), e());
          });
        }
        canDragSource(e) {
          if (!e) return !1;
          const t = this.registry.getSource(e);
          return (
            (0, i.invariant)(
              t,
              `Expected to find a valid source. sourceId=${e}`,
            ),
            !this.isDragging() && t.canDrag(this, e)
          );
        }
        canDropOnTarget(e) {
          if (!e) return !1;
          const t = this.registry.getTarget(e);
          if (
            ((0, i.invariant)(
              t,
              `Expected to find a valid target. targetId=${e}`,
            ),
            !this.isDragging() || this.didDrop())
          )
            return !1;
          return (
            b(this.registry.getTargetType(e), this.getItemType()) &&
            t.canDrop(this, e)
          );
        }
        isDragging() {
          return Boolean(this.getItemType());
        }
        isDraggingSource(e) {
          if (!e) return !1;
          const t = this.registry.getSource(e, !0);
          if (
            ((0, i.invariant)(
              t,
              `Expected to find a valid source. sourceId=${e}`,
            ),
            !this.isDragging() || !this.isSourcePublic())
          )
            return !1;
          return (
            this.registry.getSourceType(e) === this.getItemType() &&
            t.isDragging(this, e)
          );
        }
        isOverTarget(e, t = { shallow: !1 }) {
          if (!e) return !1;
          const { shallow: r } = t;
          if (!this.isDragging()) return !1;
          const n = this.registry.getTargetType(e);
          const o = this.getItemType();
          if (o && !b(n, o)) return !1;
          const i = this.getTargetIds();
          if (!i.length) return !1;
          const s = i.indexOf(e);
          return r ? s === i.length - 1 : s > -1;
        }
        getItemType() {
          return this.store.getState().dragOperation.itemType;
        }
        getItem() {
          return this.store.getState().dragOperation.item;
        }
        getSourceId() {
          return this.store.getState().dragOperation.sourceId;
        }
        getTargetIds() {
          return this.store.getState().dragOperation.targetIds;
        }
        getDropResult() {
          return this.store.getState().dragOperation.dropResult;
        }
        didDrop() {
          return this.store.getState().dragOperation.didDrop;
        }
        isSourcePublic() {
          return Boolean(this.store.getState().dragOperation.isSourcePublic);
        }
        getInitialClientOffset() {
          return this.store.getState().dragOffset.initialClientOffset;
        }
        getInitialSourceClientOffset() {
          return this.store.getState().dragOffset.initialSourceClientOffset;
        }
        getClientOffset() {
          return this.store.getState().dragOffset.clientOffset;
        }
        getSourceClientOffset() {
          return ((e) => {
            const {
              clientOffset: t,
              initialClientOffset: r,
              initialSourceClientOffset: n,
            } = e;
            return t && r && n
              ? w(((i = n), { x: (o = t).x + i.x, y: o.y + i.y }), r)
              : null;
            let o;
            let i;
          })(this.store.getState().dragOffset);
        }
        getDifferenceFromInitialOffset() {
          return ((e) => {
            const { clientOffset: t, initialClientOffset: r } = e;
            return t && r ? w(t, r) : null;
          })(this.store.getState().dragOffset);
        }
        constructor(e, t) {
          (this.store = e), (this.registry = t);
        }
      }
      const N = "undefined" !== typeof global ? global : self;
      const P = N.MutationObserver || N.WebKitMutationObserver;
      function x(e) {
        return () => {
          const t = setTimeout(n, 0);
          const r = setInterval(n, 50);
          function n() {
            clearTimeout(t), clearInterval(r), e();
          }
        };
      }
      const M =
        "function" === typeof P
          ? (e) => {
              let t = 1;
              const r = new P(e);
              const n = document.createTextNode("");
              return (
                r.observe(n, { characterData: !0 }),
                () => {
                  (t = -t), (n.data = t);
                }
              );
            }
          : x;
      class A {
        call() {
          try {
            this.task?.();
          } catch (e) {
            this.onError(e);
          } finally {
            (this.task = null), this.release(this);
          }
        }
        constructor(e, t) {
          (this.onError = e), (this.release = t), (this.task = null);
        }
      }
      const R = new (class {
          enqueueTask(e) {
            const { queue: t, requestFlush: r } = this;
            t.length || (r(), (this.flushing = !0)), (t[t.length] = e);
          }
          constructor() {
            (this.queue = []),
              (this.pendingErrors = []),
              (this.flushing = !1),
              (this.index = 0),
              (this.capacity = 1024),
              (this.flush = () => {
                const { queue: e } = this;
                while (this.index < e.length) {
                  const t = this.index;
                  if ((this.index++, e[t].call(), this.index > this.capacity)) {
                    for (let t = 0, r = e.length - this.index; t < r; t++)
                      e[t] = e[t + this.index];
                    (e.length -= this.index), (this.index = 0);
                  }
                }
                (e.length = 0), (this.index = 0), (this.flushing = !1);
              }),
              (this.registerPendingError = (e) => {
                this.pendingErrors.push(e), this.requestErrorThrow();
              }),
              (this.requestFlush = M(this.flush)),
              (this.requestErrorThrow = x(() => {
                if (this.pendingErrors.length) throw this.pendingErrors.shift();
              }));
          }
        })();
      const L = new (class {
          create(e) {
            const t = this.freeTasks;
            const r = t.length
                ? t.pop()
                : new A(this.onError, (e) => (t[t.length] = e));
            return (r.task = e), r;
          }
          constructor(e) {
            (this.onError = e), (this.freeTasks = []);
          }
        })(R.registerPendingError);
      const _ = "dnd-core/ADD_SOURCE";
      const j = "dnd-core/ADD_TARGET";
      const k = "dnd-core/REMOVE_SOURCE";
      const H = "dnd-core/REMOVE_TARGET";
      function U(e, t) {
        t && Array.isArray(e)
          ? e.forEach((e) => U(e, !1))
          : (0, i.invariant)(
              "string" === typeof e || "symbol" === typeof e,
              t
                ? "Type can only be a string, a symbol, or an array of either."
                : "Type can only be a string or a symbol.",
            );
      }
      let F;
      !((e) => {
        (e.SOURCE = "SOURCE"), (e.TARGET = "TARGET");
      })(F || (F = {}));
      let $ = 0;
      function B(e) {
        const t = ($++).toString();
        switch (e) {
          case F.SOURCE:
            return `S${t}`;
          case F.TARGET:
            return `T${t}`;
          default:
            throw new Error(`Unknown Handler Role: ${e}`);
        }
      }
      function q(e) {
        switch (e[0]) {
          case "S":
            return F.SOURCE;
          case "T":
            return F.TARGET;
          default:
            throw new Error(`Cannot parse handler ID: ${e}`);
        }
      }
      function K(e, t) {
        const r = e.entries();
        let n = !1;
        do {
          const {
            done: e,
            value: [, o],
          } = r.next();
          if (o === t) return !0;
          n = !!e;
        } while (!n);
        return !1;
      }
      class G {
        addSource(e, t) {
          U(e),
            ((e) => {
              (0, i.invariant)(
                "function" === typeof e.canDrag,
                "Expected canDrag to be a function.",
              ),
                (0, i.invariant)(
                  "function" === typeof e.beginDrag,
                  "Expected beginDrag to be a function.",
                ),
                (0, i.invariant)(
                  "function" === typeof e.endDrag,
                  "Expected endDrag to be a function.",
                );
            })(t);
          const r = this.addHandler(F.SOURCE, e, t);
          return (
            this.store.dispatch(
              ((e) => ({ type: _, payload: { sourceId: e } }))(r),
            ),
            r
          );
        }
        addTarget(e, t) {
          U(e, !0),
            ((e) => {
              (0, i.invariant)(
                "function" === typeof e.canDrop,
                "Expected canDrop to be a function.",
              ),
                (0, i.invariant)(
                  "function" === typeof e.hover,
                  "Expected hover to be a function.",
                ),
                (0, i.invariant)(
                  "function" === typeof e.drop,
                  "Expected beginDrag to be a function.",
                );
            })(t);
          const r = this.addHandler(F.TARGET, e, t);
          return (
            this.store.dispatch(
              ((e) => ({ type: j, payload: { targetId: e } }))(r),
            ),
            r
          );
        }
        containsHandler(e) {
          return K(this.dragSources, e) || K(this.dropTargets, e);
        }
        getSource(e, t = !1) {
          (0, i.invariant)(this.isSourceId(e), "Expected a valid source ID.");
          return t && e === this.pinnedSourceId
            ? this.pinnedSource
            : this.dragSources.get(e);
        }
        getTarget(e) {
          return (
            (0, i.invariant)(this.isTargetId(e), "Expected a valid target ID."),
            this.dropTargets.get(e)
          );
        }
        getSourceType(e) {
          return (
            (0, i.invariant)(this.isSourceId(e), "Expected a valid source ID."),
            this.types.get(e)
          );
        }
        getTargetType(e) {
          return (
            (0, i.invariant)(this.isTargetId(e), "Expected a valid target ID."),
            this.types.get(e)
          );
        }
        isSourceId(e) {
          return q(e) === F.SOURCE;
        }
        isTargetId(e) {
          return q(e) === F.TARGET;
        }
        removeSource(e) {
          let t;
          (0, i.invariant)(this.getSource(e), "Expected an existing source."),
            this.store.dispatch(
              ((e) => ({ type: k, payload: { sourceId: e } }))(e),
            ),
            (t = () => {
              this.dragSources.delete(e), this.types.delete(e);
            }),
            R.enqueueTask(L.create(t));
        }
        removeTarget(e) {
          (0, i.invariant)(this.getTarget(e), "Expected an existing target."),
            this.store.dispatch(
              ((e) => ({ type: H, payload: { targetId: e } }))(e),
            ),
            this.dropTargets.delete(e),
            this.types.delete(e);
        }
        pinSource(e) {
          const t = this.getSource(e);
          (0, i.invariant)(t, "Expected an existing source."),
            (this.pinnedSourceId = e),
            (this.pinnedSource = t);
        }
        unpinSource() {
          (0, i.invariant)(
            this.pinnedSource,
            "No source is pinned at the time.",
          ),
            (this.pinnedSourceId = null),
            (this.pinnedSource = null);
        }
        addHandler(e, t, r) {
          const n = B(e);
          return (
            this.types.set(n, t),
            e === F.SOURCE
              ? this.dragSources.set(n, r)
              : e === F.TARGET && this.dropTargets.set(n, r),
            n
          );
        }
        constructor(e) {
          (this.types = new Map()),
            (this.dragSources = new Map()),
            (this.dropTargets = new Map()),
            (this.pinnedSourceId = null),
            (this.pinnedSource = null),
            (this.store = e);
        }
      }
      const W = (e, t) => e === t;
      function Y(e, t) {
        switch (t.type) {
          case l:
            break;
          case _:
          case j:
          case H:
          case k:
            return D;
          default:
            return C;
        }
        const { targetIds: r = [], prevTargetIds: n = [] } = t.payload;
        const o = ((e, t) => {
            const r = new Map();
            const n = (e) => {
                r.set(e, r.has(e) ? r.get(e) + 1 : 1);
              };
            e.forEach(n), t.forEach(n);
            const o = [];
            return (
              r.forEach((e, t) => {
                1 === e && o.push(t);
              }),
              o
            );
          })(r, n);
        if (
          !(
            o.length > 0 ||
            !((e, t, r = W) => {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!r(e[n], t[n])) return !1;
              return !0;
            })(r, n)
          )
        )
          return D;
        const i = n[n.length - 1];
        const s = r[r.length - 1];
        return i !== s && (i && o.push(i), s && o.push(s)), o;
      }
      function z(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      const X = {
        initialSourceClientOffset: null,
        initialClientOffset: null,
        clientOffset: null,
      };
      function V(e, t) {
        const { payload: r } = t;
        switch (t.type) {
          case a:
          case c:
            return {
              initialSourceClientOffset: r.sourceClientOffset,
              initialClientOffset: r.clientOffset,
              clientOffset: r.clientOffset,
            };
          case l:
            return (
              (n = e.clientOffset),
              (o = r.clientOffset),
              (!n && !o) || (n && o && n.x === o.x && n.y === o.y)
                ? e
                : ((e) => {
                    for (let t = 1; t < arguments.length; t++) {
                      const r = null != arguments[t] ? arguments[t] : {};
                      let n = Object.keys(r);
                      "function" === typeof Object.getOwnPropertySymbols &&
                        (n = n.concat(
                          Object.getOwnPropertySymbols(r).filter((e) => Object.getOwnPropertyDescriptor(
                              r,
                              e,
                            ).enumerable),
                        )),
                        n.forEach((t) => {
                          z(e, t, r[t]);
                        });
                    }
                    return e;
                  })({}, e, { clientOffset: r.clientOffset })
            );
          case f:
          case d:
            return X;
          default:
            return e;
        }
        let n;
        let o;
      }
      function J(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function Q(e) {
        for (let t = 1; t < arguments.length; t++) {
          const r = null != arguments[t] ? arguments[t] : {};
          let n = Object.keys(r);
          "function" === typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter((e) => Object.getOwnPropertyDescriptor(r, e).enumerable),
            )),
            n.forEach((t) => {
              J(e, t, r[t]);
            });
        }
        return e;
      }
      const Z = {
        itemType: null,
        item: null,
        sourceId: null,
        targetIds: [],
        dropResult: null,
        didDrop: !1,
        isSourcePublic: null,
      };
      function ee(e, t) {
        const { payload: r } = t;
        switch (t.type) {
          case c:
            return Q({}, e, {
              itemType: r.itemType,
              item: r.item,
              sourceId: r.sourceId,
              isSourcePublic: r.isSourcePublic,
              dropResult: null,
              didDrop: !1,
            });
          case u:
            return Q({}, e, { isSourcePublic: !0 });
          case l:
            return Q({}, e, { targetIds: r.targetIds });
          case H:
            return -1 === e.targetIds.indexOf(r.targetId)
              ? e
              : Q({}, e, {
                  targetIds:
                    ((n = e.targetIds),
                    (o = r.targetId),
                    n.filter((e) => e !== o)),
                });
          case d:
            return Q({}, e, {
              dropResult: r.dropResult,
              didDrop: !0,
              targetIds: [],
            });
          case f:
            return Q({}, e, {
              itemType: null,
              item: null,
              sourceId: null,
              dropResult: null,
              didDrop: !1,
              isSourcePublic: null,
              targetIds: [],
            });
          default:
            return e;
        }
        let n;
        let o;
      }
      function te(e, t) {
        switch (t.type) {
          case _:
          case j:
            return e + 1;
          case k:
          case H:
            return e - 1;
          default:
            return e;
        }
      }
      function re(e = 0) {
        return e + 1;
      }
      function ne(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function oe(e) {
        for (let t = 1; t < arguments.length; t++) {
          const r = null != arguments[t] ? arguments[t] : {};
          let n = Object.keys(r);
          "function" === typeof Object.getOwnPropertySymbols &&
            (n = n.concat(
              Object.getOwnPropertySymbols(r).filter((e) => Object.getOwnPropertyDescriptor(r, e).enumerable),
            )),
            n.forEach((t) => {
              ne(e, t, r[t]);
            });
        }
        return e;
      }
      function ie(e, t) {
        return {
          dirtyHandlerIds: Y(e.dirtyHandlerIds, {
            type: t.type,
            payload: oe({}, t.payload, {
              prevTargetIds:
                ((r = e),
                (n = "dragOperation.targetIds"),
                (o = []),
                n
                  .split(".")
                  .reduce((e, t) => (e?.[t] ? e[t] : o || null), r)),
            }),
          }),
          dragOffset: V(e.dragOffset, t),
          refCount: te(e.refCount, t),
          dragOperation: ee(e.dragOperation, t),
          stateId: re(e.stateId),
        };
        let r;
        let n;
        let o;
      }
      function se(e, t, r = {}, n = !1) {
        const i = ((e) => {
            const t =
              "undefined" !== typeof window &&
              window.__REDUX_DEVTOOLS_EXTENSION__;
            return (0, o.createStore)(
              ie,
              e && t && t({ name: "dnd-core", instanceId: "dnd-core" }),
            );
          })(n);
        const s = new I(i, new G(i));
        const a = new T(i, s);
        const c = e(a, t, r);
        return a.receiveBackend(c), a;
      }
      const ae = r(50959);
      const ce = r(81904);
      function ue(e, t) {
        if (null == e) return {};
        let r;
        let n;
        const o = ((e, t) => {
            if (null == e) return {};
            let r;
            let n;
            const o = {};
            const i = Object.keys(e);
            for (n = 0; n < i.length; n++)
              (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          const i = Object.getOwnPropertySymbols(e);
          for (n = 0; n < i.length; n++)
            (r = i[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (o[r] = e[r]));
        }
        return o;
      }
      let le = 0;
      const de = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
      const fe = (0, ae.memo)((e) => {
        const { children: t } = e;
        const r = ue(e, ["children"]);
        const [o, i] = ((e) => {
          if ("manager" in e) {
            return [{ dragDropManager: e.manager }, !1];
          }
          const t = ((e, t, r, n) => {
              const o = t;
              o[de] || (o[de] = { dragDropManager: se(e, t, r, n) });
              return o[de];
            })(e.backend, e.context, e.options, e.debugMode);
          const r = !e.context;
          return [t, r];
        })(r);
        return (
          (0, ae.useEffect)(() => {
            if (i) {
              const e = he();
              return (
                ++le,
                () => {
                  0 === --le && (e[de] = null);
                }
              );
            }
          }, []),
          (0, n.jsx)(ce.DndContext.Provider, { value: o, children: t })
        );
      });
      function he() {
        return "undefined" !== typeof global ? global : window;
      }
    },
    91701: (e, t, r) => {
            r.d(t, { useCollectedProps: () => i });
      const n = r(76121);
      const o = r(74401);
      function i(e, t, r) {
        return ((e, t, r) => {
          const [i, s] = (0, n.useCollector)(e, t, r);
          return (
            (0, o.useIsomorphicLayoutEffect)(
              () => {
                const t = e.getHandlerId();
                if (null != t)
                  return e.subscribeToStateChange(s, { handlerIds: [t] });
              },
              [e, s],
            ),
            i
          );
        })(t, e || (() => ({})), () => r.reconnect());
      }
    },
    76121: (e, t, r) => {
            r.d(t, { useCollector: () => s });
      const n = r(3341);
      const o = r(50959);
      const i = r(74401);
      function s(e, t, r) {
        const [s, a] = (0, o.useState)(() => t(e));
        const c = (0, o.useCallback)(() => {
            const o = t(e);
            n(s, o) || (a(o), r?.());
          }, [s, e, r]);
        return (0, i.useIsomorphicLayoutEffect)(c), [s, c];
      }
    },
    42357: (e, t, r) => {
            r.d(t, { useDrag: () => O });
      const n = r(6346);
      const o = r(91701);
      const i = r(82442);
      const s = r(50959);
      function a(e) {
        return (0, s.useMemo)(() => e.hooks.dragSource(), [e]);
      }
      function c(e) {
        return (0, s.useMemo)(() => e.hooks.dragPreview(), [e]);
      }
      const u = r(98789);
      const l = r(71982);
      const d = r(12406);
      class f {
        receiveHandlerId(e) {
          this.handlerId !== e && ((this.handlerId = e), this.reconnect());
        }
        get connectTarget() {
          return this.dragSource;
        }
        get dragSourceOptions() {
          return this.dragSourceOptionsInternal;
        }
        set dragSourceOptions(e) {
          this.dragSourceOptionsInternal = e;
        }
        get dragPreviewOptions() {
          return this.dragPreviewOptionsInternal;
        }
        set dragPreviewOptions(e) {
          this.dragPreviewOptionsInternal = e;
        }
        reconnect() {
          const e = this.reconnectDragSource();
          this.reconnectDragPreview(e);
        }
        reconnectDragSource() {
          const e = this.dragSource;
          const t =
              this.didHandlerIdChange() ||
              this.didConnectedDragSourceChange() ||
              this.didDragSourceOptionsChange();
          return (
            t && this.disconnectDragSource(),
            this.handlerId
              ? e
                ? (t &&
                    ((this.lastConnectedHandlerId = this.handlerId),
                    (this.lastConnectedDragSource = e),
                    (this.lastConnectedDragSourceOptions =
                      this.dragSourceOptions),
                    (this.dragSourceUnsubscribe =
                      this.backend.connectDragSource(
                        this.handlerId,
                        e,
                        this.dragSourceOptions,
                      ))),
                  t)
                : ((this.lastConnectedDragSource = e), t)
              : t
          );
        }
        reconnectDragPreview(e = !1) {
          const t = this.dragPreview;
          const r =
              e ||
              this.didHandlerIdChange() ||
              this.didConnectedDragPreviewChange() ||
              this.didDragPreviewOptionsChange();
          r && this.disconnectDragPreview(),
            this.handlerId &&
              (t
                ? r &&
                  ((this.lastConnectedHandlerId = this.handlerId),
                  (this.lastConnectedDragPreview = t),
                  (this.lastConnectedDragPreviewOptions =
                    this.dragPreviewOptions),
                  (this.dragPreviewUnsubscribe =
                    this.backend.connectDragPreview(
                      this.handlerId,
                      t,
                      this.dragPreviewOptions,
                    )))
                : (this.lastConnectedDragPreview = t));
        }
        didHandlerIdChange() {
          return this.lastConnectedHandlerId !== this.handlerId;
        }
        didConnectedDragSourceChange() {
          return this.lastConnectedDragSource !== this.dragSource;
        }
        didConnectedDragPreviewChange() {
          return this.lastConnectedDragPreview !== this.dragPreview;
        }
        didDragSourceOptionsChange() {
          return !(0, u.shallowEqual)(
            this.lastConnectedDragSourceOptions,
            this.dragSourceOptions,
          );
        }
        didDragPreviewOptionsChange() {
          return !(0, u.shallowEqual)(
            this.lastConnectedDragPreviewOptions,
            this.dragPreviewOptions,
          );
        }
        disconnectDragSource() {
          this.dragSourceUnsubscribe &&
            (this.dragSourceUnsubscribe(),
            (this.dragSourceUnsubscribe = void 0));
        }
        disconnectDragPreview() {
          this.dragPreviewUnsubscribe &&
            (this.dragPreviewUnsubscribe(),
            (this.dragPreviewUnsubscribe = void 0),
            (this.dragPreviewNode = null),
            (this.dragPreviewRef = null));
        }
        get dragSource() {
          return (
            this.dragSourceNode ||
            (this.dragSourceRef?.current)
          );
        }
        get dragPreview() {
          return (
            this.dragPreviewNode ||
            (this.dragPreviewRef?.current)
          );
        }
        clearDragSource() {
          (this.dragSourceNode = null), (this.dragSourceRef = null);
        }
        clearDragPreview() {
          (this.dragPreviewNode = null), (this.dragPreviewRef = null);
        }
        constructor(e) {
          (this.hooks = (0, d.wrapConnectorHooks)({
            dragSource: (e, t) => {
              this.clearDragSource(),
                (this.dragSourceOptions = t || null),
                (0, l.isRef)(e)
                  ? (this.dragSourceRef = e)
                  : (this.dragSourceNode = e),
                this.reconnectDragSource();
            },
            dragPreview: (e, t) => {
              this.clearDragPreview(),
                (this.dragPreviewOptions = t || null),
                (0, l.isRef)(e)
                  ? (this.dragPreviewRef = e)
                  : (this.dragPreviewNode = e),
                this.reconnectDragPreview();
            },
          })),
            (this.handlerId = null),
            (this.dragSourceRef = null),
            (this.dragSourceOptionsInternal = null),
            (this.dragPreviewRef = null),
            (this.dragPreviewOptionsInternal = null),
            (this.lastConnectedHandlerId = null),
            (this.lastConnectedDragSource = null),
            (this.lastConnectedDragSourceOptions = null),
            (this.lastConnectedDragPreview = null),
            (this.lastConnectedDragPreviewOptions = null),
            (this.backend = e);
        }
      }
      const h = r(84570);
      const g = r(74401);
      let p = !1;
      let v = !1;
      class y {
        receiveHandlerId(e) {
          this.sourceId = e;
        }
        getHandlerId() {
          return this.sourceId;
        }
        canDrag() {
          (0, n.invariant)(
            !p,
            "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor",
          );
          try {
            return (p = !0), this.internalMonitor.canDragSource(this.sourceId);
          } finally {
            p = !1;
          }
        }
        isDragging() {
          if (!this.sourceId) return !1;
          (0, n.invariant)(
            !v,
            "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor",
          );
          try {
            return (
              (v = !0), this.internalMonitor.isDraggingSource(this.sourceId)
            );
          } finally {
            v = !1;
          }
        }
        subscribeToStateChange(e, t) {
          return this.internalMonitor.subscribeToStateChange(e, t);
        }
        isDraggingSource(e) {
          return this.internalMonitor.isDraggingSource(e);
        }
        isOverTarget(e, t) {
          return this.internalMonitor.isOverTarget(e, t);
        }
        getTargetIds() {
          return this.internalMonitor.getTargetIds();
        }
        isSourcePublic() {
          return this.internalMonitor.isSourcePublic();
        }
        getSourceId() {
          return this.internalMonitor.getSourceId();
        }
        subscribeToOffsetChange(e) {
          return this.internalMonitor.subscribeToOffsetChange(e);
        }
        canDragSource(e) {
          return this.internalMonitor.canDragSource(e);
        }
        canDropOnTarget(e) {
          return this.internalMonitor.canDropOnTarget(e);
        }
        getItemType() {
          return this.internalMonitor.getItemType();
        }
        getItem() {
          return this.internalMonitor.getItem();
        }
        getDropResult() {
          return this.internalMonitor.getDropResult();
        }
        didDrop() {
          return this.internalMonitor.didDrop();
        }
        getInitialClientOffset() {
          return this.internalMonitor.getInitialClientOffset();
        }
        getInitialSourceClientOffset() {
          return this.internalMonitor.getInitialSourceClientOffset();
        }
        getSourceClientOffset() {
          return this.internalMonitor.getSourceClientOffset();
        }
        getClientOffset() {
          return this.internalMonitor.getClientOffset();
        }
        getDifferenceFromInitialOffset() {
          return this.internalMonitor.getDifferenceFromInitialOffset();
        }
        constructor(e) {
          (this.sourceId = null), (this.internalMonitor = e.getMonitor());
        }
      }
      const m = r(87408);
      class S {
        beginDrag() {
          const e = this.spec;
          const t = this.monitor;
          let r = null;
          return (
            (r =
              "object" === typeof e.item
                ? e.item
                : "function" === typeof e.item
                ? e.item(t)
                : {}),
            null != r ? r : null
          );
        }
        canDrag() {
          const e = this.spec;
          const t = this.monitor;
          return "boolean" === typeof e.canDrag
            ? e.canDrag
            : "function" !== typeof e.canDrag || e.canDrag(t);
        }
        isDragging(e, t) {
          const r = this.spec;
          const n = this.monitor;
          const { isDragging: o } = r;
          return o ? o(n) : t === e.getSourceId();
        }
        endDrag() {
          const e = this.spec;
          const t = this.monitor;
          const r = this.connector;
          const { end: n } = e;
          n?.(t.getItem(), t), r.reconnect();
        }
        constructor(e, t, r) {
          (this.spec = e), (this.monitor = t), (this.connector = r);
        }
      }
      function b(e, t, r) {
        const o = (0, h.useDragDropManager)();
        const i = ((e, t, r) => {
            const n = (0, s.useMemo)(() => new S(e, t, r), [t, r]);
            return (
              (0, s.useEffect)(() => {
                n.spec = e;
              }, [e]),
              n
            );
          })(e, t, r);
        const a = ((e) => (0, s.useMemo)(() => {
              const t = e.type;
              return (
                (0, n.invariant)(null != t, "spec.type must be defined"), t
              );
            }, [e]))(e);
        (0, g.useIsomorphicLayoutEffect)(
          () => {
            if (null != a) {
              const [e, n] = (0, m.registerSource)(a, i, o);
              return t.receiveHandlerId(e), r.receiveHandlerId(e), n;
            }
          },
          [o, t, r, i, a],
        );
      }
      function O(e, t) {
        const r = (0, i.useOptionalFactory)(e, t);
        (0, n.invariant)(
          !r.begin,
          "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)",
        );
        const u = (() => {
            const e = (0, h.useDragDropManager)();
            return (0, s.useMemo)(() => new y(e), [e]);
          })();
        const l = ((e, t) => {
            const r = (0, h.useDragDropManager)();
            const n = (0, s.useMemo)(() => new f(r.getBackend()), [r]);
            return (
              (0, g.useIsomorphicLayoutEffect)(
                () => (
                  (n.dragSourceOptions = e || null),
                  n.reconnect(),
                  () => n.disconnectDragSource()
                ),
                [n, e],
              ),
              (0, g.useIsomorphicLayoutEffect)(
                () => (
                  (n.dragPreviewOptions = t || null),
                  n.reconnect(),
                  () => n.disconnectDragPreview()
                ),
                [n, t],
              ),
              n
            );
          })(r.options, r.previewOptions);
        return (
          b(r, u, l), [(0, o.useCollectedProps)(r.collect, u, l), a(l), c(l)]
        );
      }
    },
    84570: (e, t, r) => {
            r.d(t, { useDragDropManager: () => s });
      const n = r(6346);
      const o = r(50959);
      const i = r(81904);
      function s() {
        const { dragDropManager: e } = (0, o.useContext)(i.DndContext);
        return (0, n.invariant)(null != e, "Expected drag drop context"), e;
      }
    },
    85783: (e, t, r) => {
            r.d(t, { useDragLayer: () => s });
      const n = r(50959);
      const o = r(76121);
      const i = r(84570);
      function s(e) {
        const t = (0, i.useDragDropManager)().getMonitor();
        const [r, s] = (0, o.useCollector)(t, e);
        return (
          (0, n.useEffect)(() => t.subscribeToOffsetChange(s)),
          (0, n.useEffect)(() => t.subscribeToStateChange(s)),
          r
        );
      }
    },
    40933: (e, t, r) => {
            r.d(t, { useDrop: () => S });
      const n = r(91701);
      const o = r(82442);
      const i = r(50959);
      function s(e) {
        return (0, i.useMemo)(() => e.hooks.dropTarget(), [e]);
      }
      const a = r(98789);
      const c = r(71982);
      const u = r(12406);
      class l {
        get connectTarget() {
          return this.dropTarget;
        }
        reconnect() {
          const e =
            this.didHandlerIdChange() ||
            this.didDropTargetChange() ||
            this.didOptionsChange();
          e && this.disconnectDropTarget();
          const t = this.dropTarget;
          this.handlerId &&
            (t
              ? e &&
                ((this.lastConnectedHandlerId = this.handlerId),
                (this.lastConnectedDropTarget = t),
                (this.lastConnectedDropTargetOptions = this.dropTargetOptions),
                (this.unsubscribeDropTarget = this.backend.connectDropTarget(
                  this.handlerId,
                  t,
                  this.dropTargetOptions,
                )))
              : (this.lastConnectedDropTarget = t));
        }
        receiveHandlerId(e) {
          e !== this.handlerId && ((this.handlerId = e), this.reconnect());
        }
        get dropTargetOptions() {
          return this.dropTargetOptionsInternal;
        }
        set dropTargetOptions(e) {
          this.dropTargetOptionsInternal = e;
        }
        didHandlerIdChange() {
          return this.lastConnectedHandlerId !== this.handlerId;
        }
        didDropTargetChange() {
          return this.lastConnectedDropTarget !== this.dropTarget;
        }
        didOptionsChange() {
          return !(0, a.shallowEqual)(
            this.lastConnectedDropTargetOptions,
            this.dropTargetOptions,
          );
        }
        disconnectDropTarget() {
          this.unsubscribeDropTarget &&
            (this.unsubscribeDropTarget(),
            (this.unsubscribeDropTarget = void 0));
        }
        get dropTarget() {
          return (
            this.dropTargetNode ||
            (this.dropTargetRef?.current)
          );
        }
        clearDropTarget() {
          (this.dropTargetRef = null), (this.dropTargetNode = null);
        }
        constructor(e) {
          (this.hooks = (0, u.wrapConnectorHooks)({
            dropTarget: (e, t) => {
              this.clearDropTarget(),
                (this.dropTargetOptions = t),
                (0, c.isRef)(e)
                  ? (this.dropTargetRef = e)
                  : (this.dropTargetNode = e),
                this.reconnect();
            },
          })),
            (this.handlerId = null),
            (this.dropTargetRef = null),
            (this.dropTargetOptionsInternal = null),
            (this.lastConnectedHandlerId = null),
            (this.lastConnectedDropTarget = null),
            (this.lastConnectedDropTargetOptions = null),
            (this.backend = e);
        }
      }
      const d = r(84570);
      const f = r(74401);
      const h = r(6346);
      let g = !1;
      class p {
        receiveHandlerId(e) {
          this.targetId = e;
        }
        getHandlerId() {
          return this.targetId;
        }
        subscribeToStateChange(e, t) {
          return this.internalMonitor.subscribeToStateChange(e, t);
        }
        canDrop() {
          if (!this.targetId) return !1;
          (0, h.invariant)(
            !g,
            "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor",
          );
          try {
            return (
              (g = !0), this.internalMonitor.canDropOnTarget(this.targetId)
            );
          } finally {
            g = !1;
          }
        }
        isOver(e) {
          return (
            !!this.targetId &&
            this.internalMonitor.isOverTarget(this.targetId, e)
          );
        }
        getItemType() {
          return this.internalMonitor.getItemType();
        }
        getItem() {
          return this.internalMonitor.getItem();
        }
        getDropResult() {
          return this.internalMonitor.getDropResult();
        }
        didDrop() {
          return this.internalMonitor.didDrop();
        }
        getInitialClientOffset() {
          return this.internalMonitor.getInitialClientOffset();
        }
        getInitialSourceClientOffset() {
          return this.internalMonitor.getInitialSourceClientOffset();
        }
        getSourceClientOffset() {
          return this.internalMonitor.getSourceClientOffset();
        }
        getClientOffset() {
          return this.internalMonitor.getClientOffset();
        }
        getDifferenceFromInitialOffset() {
          return this.internalMonitor.getDifferenceFromInitialOffset();
        }
        constructor(e) {
          (this.targetId = null), (this.internalMonitor = e.getMonitor());
        }
      }
      const v = r(87408);
      class y {
        canDrop() {
          const e = this.spec;
          const t = this.monitor;
          return !e.canDrop || e.canDrop(t.getItem(), t);
        }
        hover() {
          const e = this.spec;
          const t = this.monitor;
          e.hover?.(t.getItem(), t);
        }
        drop() {
          const e = this.spec;
          const t = this.monitor;
          if (e.drop) return e.drop(t.getItem(), t);
        }
        constructor(e, t) {
          (this.spec = e), (this.monitor = t);
        }
      }
      function m(e, t, r) {
        const n = (0, d.useDragDropManager)();
        const o = ((e, t) => {
            const r = (0, i.useMemo)(() => new y(e, t), [t]);
            return (
              (0, i.useEffect)(() => {
                r.spec = e;
              }, [e]),
              r
            );
          })(e, t);
        const s = ((e) => {
            const { accept: t } = e;
            return (0, i.useMemo)(
              () => (
                (0, h.invariant)(null != e.accept, "accept must be defined"),
                Array.isArray(t) ? t : [t]
              ),
              [t],
            );
          })(e);
        (0, f.useIsomorphicLayoutEffect)(
          () => {
            const [e, i] = (0, v.registerTarget)(s, o, n);
            return t.receiveHandlerId(e), r.receiveHandlerId(e), i;
          },
          [n, t, o, r, s.map((e) => e.toString()).join("|")],
        );
      }
      function S(e, t) {
        const r = (0, o.useOptionalFactory)(e, t);
        const a = (() => {
            const e = (0, d.useDragDropManager)();
            return (0, i.useMemo)(() => new p(e), [e]);
          })();
        const c = ((e) => {
            const t = (0, d.useDragDropManager)();
            const r = (0, i.useMemo)(() => new l(t.getBackend()), [t]);
            return (
              (0, f.useIsomorphicLayoutEffect)(
                () => (
                  (r.dropTargetOptions = e || null),
                  r.reconnect(),
                  () => r.disconnectDropTarget()
                ),
                [e],
              ),
              r
            );
          })(r.options);
        return m(r, a, c), [(0, n.useCollectedProps)(r.collect, a, c), s(c)];
      }
    },
    74401: (e, t, r) => {
            r.d(t, { useIsomorphicLayoutEffect: () => o });
      const n = r(50959);
      const o = "undefined" !== typeof window ? n.useLayoutEffect : n.useEffect;
    },
    82442: (e, t, r) => {
            r.d(t, { useOptionalFactory: () => o });
      const n = r(50959);
      function o(e, t) {
        const r = [...(t || [])];
        return (
          null == t && "function" !== typeof e && r.push(e),
          (0, n.useMemo)(() => ("function" === typeof e ? e() : e), r)
        );
      }
    },
    71982: (e, t, r) => {
            function n(e) {
        return (
          null !== e &&
          "object" === typeof e &&
          Object.prototype.hasOwnProperty.call(e, "current")
        );
      }
      r.d(t, { isRef: () => n });
    },
    87408: (e, t, r) => {
            function n(e, t, r) {
        const n = r.getRegistry();
        const o = n.addTarget(e, t);
        return [o, () => n.removeTarget(o)];
      }
      function o(e, t, r) {
        const n = r.getRegistry();
        const o = n.addSource(e, t);
        return [o, () => n.removeSource(o)];
      }
      r.d(t, { registerSource: () => o, registerTarget: () => n });
    },
    12406: (e, t, r) => {
            r.d(t, { wrapConnectorHooks: () => s });
      const n = r(6346);
      const o = r(50959);
      function i(e) {
        return (t = null, r = null) => {
          if (!(0, o.isValidElement)(t)) {
            const n = t;
            return e(n, r), n;
          }
          const i = t;
          !((e) => {
            if ("string" === typeof e.type) return;
            const t = e.type.displayName || e.type.name || "the component";
            throw new Error(
              `Only native element nodes can now be passed to React DnD connectors.You can either wrap ${t} into a <div>, or turn it into a drag source or a drop target itself.`,
            );
          })(i);
          return ((e, t) => {
            const r = e.ref;
            return (
              (0, n.invariant)(
                "string" !== typeof r,
                "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs",
              ),
              r
                ? (0, o.cloneElement)(e, {
                    ref: (e) => {
                      a(r, e), a(t, e);
                    },
                  })
                : (0, o.cloneElement)(e, { ref: t })
            );
          })(i, r ? (t) => e(t, r) : e);
        };
      }
      function s(e) {
        const t = {};
        return (
          Object.keys(e).forEach((r) => {
            const n = e[r];
            if (r.endsWith("Ref")) t[r] = e[r];
            else {
              const e = i(n);
              t[r] = () => e;
            }
          }),
          t
        );
      }
      function a(e, t) {
        "function" === typeof e ? e(t) : (e.current = t);
      }
    },
  },
]);
