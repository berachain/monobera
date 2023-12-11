(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [8385, 8115, 306],
  {
    59255: (t, e, n) => {
      n.r(e), n.d(e, { default: () => I });
      const r = (() => {
          if ("undefined" !== typeof Map) return Map;
          function t(t, e) {
            let n = -1;
            return (
              t.some((t, r) => t[0] === e && ((n = r), !0)),
              n
            );
          }
          return (() => {
            function e() {
              this.__entries__ = [];
            }
            return (
              Object.defineProperty(e.prototype, "size", {
                get: function () {
                  return this.__entries__.length;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.get = function (e) {
                const n = t(this.__entries__, e);
                const r = this.__entries__[n];
                return r?.[1];
              }),
              (e.prototype.set = function (e, n) {
                const r = t(this.__entries__, e);
                ~r
                  ? (this.__entries__[r][1] = n)
                  : this.__entries__.push([e, n]);
              }),
              (e.prototype.delete = function (e) {
                const n = this.__entries__;
                const r = t(n, e);
                ~r && n.splice(r, 1);
              }),
              (e.prototype.has = function (e) {
                return !!~t(this.__entries__, e);
              }),
              (e.prototype.clear = function () {
                this.__entries__.splice(0);
              }),
              (e.prototype.forEach = function (t, e) {
                void 0 === e && (e = null);
                for (let n = 0, r = this.__entries__; n < r.length; n++) {
                  const o = r[n];
                  t.call(e, o[1], o[0]);
                }
              }),
              e
            );
          })();
        })();
      const o =
          "undefined" !== typeof window &&
          "undefined" !== typeof document &&
          window.document === document;
      const i =
          void 0 !== n.g && n.g.Math === Math
            ? n.g
            : "undefined" !== typeof self && self.Math === Math
            ? self
            : "undefined" !== typeof window && window.Math === Math
            ? window
            : Function("return this")();
      const s =
          "function" === typeof requestAnimationFrame
            ? requestAnimationFrame.bind(i)
            : (t) => setTimeout(() => t(Date.now()), 1e3 / 60);
      const a = [
          "top",
          "right",
          "bottom",
          "left",
          "width",
          "height",
          "size",
          "weight",
        ];
      const c = "undefined" !== typeof MutationObserver;
      const u = (() => {
          function t() {
            (this.connected_ = !1),
              (this.mutationEventsAdded_ = !1),
              (this.mutationsObserver_ = null),
              (this.observers_ = []),
              (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
              (this.refresh = ((t, e) => {
                let n = !1;
                let r = !1;
                let o = 0;
                function i() {
                  n && ((n = !1), t()), r && c();
                }
                function a() {
                  s(i);
                }
                function c() {
                  const t = Date.now();
                  if (n) {
                    if (t - o < 2) return;
                    r = !0;
                  } else (n = !0), (r = !1), setTimeout(a, e);
                  o = t;
                }
                return c;
              })(this.refresh.bind(this), 20));
          }
          return (
            (t.prototype.addObserver = function (t) {
              ~this.observers_.indexOf(t) || this.observers_.push(t),
                this.connected_ || this.connect_();
            }),
            (t.prototype.removeObserver = function (t) {
              const e = this.observers_;
              const n = e.indexOf(t);
              ~n && e.splice(n, 1),
                !e.length && this.connected_ && this.disconnect_();
            }),
            (t.prototype.refresh = function () {
              this.updateObservers_() && this.refresh();
            }),
            (t.prototype.updateObservers_ = function () {
              const t = this.observers_.filter((t) => t.gatherActive(), t.hasActive());
              return (
                t.forEach((t) => t.broadcastActive()),
                t.length > 0
              );
            }),
            (t.prototype.connect_ = function () {
              o &&
                !this.connected_ &&
                (document.addEventListener(
                  "transitionend",
                  this.onTransitionEnd_,
                ),
                window.addEventListener("resize", this.refresh),
                c
                  ? ((this.mutationsObserver_ = new MutationObserver(
                      this.refresh,
                    )),
                    this.mutationsObserver_.observe(document, {
                      attributes: !0,
                      childList: !0,
                      characterData: !0,
                      subtree: !0,
                    }))
                  : (document.addEventListener(
                      "DOMSubtreeModified",
                      this.refresh,
                    ),
                    (this.mutationEventsAdded_ = !0)),
                (this.connected_ = !0));
            }),
            (t.prototype.disconnect_ = function () {
              o &&
                this.connected_ &&
                (document.removeEventListener(
                  "transitionend",
                  this.onTransitionEnd_,
                ),
                window.removeEventListener("resize", this.refresh),
                this.mutationsObserver_?.disconnect(),
                this.mutationEventsAdded_ &&
                  document.removeEventListener(
                    "DOMSubtreeModified",
                    this.refresh,
                  ),
                (this.mutationsObserver_ = null),
                (this.mutationEventsAdded_ = !1),
                (this.connected_ = !1));
            }),
            (t.prototype.onTransitionEnd_ = function (t) {
              const e = t.propertyName;
              const n = void 0 === e ? "" : e;
              a.some((t) => !!~n.indexOf(t)) && this.refresh();
            }),
            (t.getInstance = function () {
              return (
                this.instance_ || (this.instance_ = new t()), this.instance_
              );
            }),
            (t.instance_ = null),
            t
          );
        })();
      const l = (t, e) => {
          for (let n = 0, r = Object.keys(e); n < r.length; n++) {
            const o = r[n];
            Object.defineProperty(t, o, {
              value: e[o],
              enumerable: !1,
              writable: !1,
              configurable: !0,
            });
          }
          return t;
        };
      const f = (t) => (t?.ownerDocument?.defaultView) || i;
      const h = y(0, 0, 0, 0);
      function d(t) {
        return parseFloat(t) || 0;
      }
      function p(t) {
        for (let e = [], n = 1; n < arguments.length; n++)
          e[n - 1] = arguments[n];
        return e.reduce((e, n) => e + d(t[`border-${n}-width`]), 0);
      }
      function v(t) {
        const e = t.clientWidth;
        const n = t.clientHeight;
        if (!e && !n) return h;
        const r = f(t).getComputedStyle(t);
        const o = ((t) => {
            for (
              let e = {}, n = 0, r = ["top", "right", "bottom", "left"];
              n < r.length;
              n++
            ) {
              const o = r[n];
              const i = t[`padding-${o}`];
              e[o] = d(i);
            }
            return e;
          })(r);
        const i = o.left + o.right;
        const s = o.top + o.bottom;
        let a = d(r.width);
        let c = d(r.height);
        if (
          ("border-box" === r.boxSizing &&
            (Math.round(a + i) !== e && (a -= p(r, "left", "right") + i),
            Math.round(c + s) !== n && (c -= p(r, "top", "bottom") + s)),
          !((t) => t === f(t).document.documentElement)(t))
        ) {
          const u = Math.round(a + i) - e;
          const l = Math.round(c + s) - n;
          1 !== Math.abs(u) && (a -= u), 1 !== Math.abs(l) && (c -= l);
        }
        return y(o.left, o.top, a, c);
      }
      const m =
        "undefined" !== typeof SVGGraphicsElement
          ? (t) => t instanceof f(t).SVGGraphicsElement
          : (t) => (
                t instanceof f(t).SVGElement && "function" === typeof t.getBBox
              );
      function _(t) {
        return o
          ? m(t)
            ? ((t) => {
                const e = t.getBBox();
                return y(0, 0, e.width, e.height);
              })(t)
            : v(t)
          : h;
      }
      function y(t, e, n, r) {
        return { x: t, y: e, width: n, height: r };
      }
      const g = (() => {
          function t(t) {
            (this.broadcastWidth = 0),
              (this.broadcastHeight = 0),
              (this.contentRect_ = y(0, 0, 0, 0)),
              (this.target = t);
          }
          return (
            (t.prototype.isActive = function () {
              const t = _(this.target);
              return (
                (this.contentRect_ = t),
                t.width !== this.broadcastWidth ||
                  t.height !== this.broadcastHeight
              );
            }),
            (t.prototype.broadcastRect = function () {
              const t = this.contentRect_;
              return (
                (this.broadcastWidth = t.width),
                (this.broadcastHeight = t.height),
                t
              );
            }),
            t
          );
        })();
      const b = function (t, e) {
          let n;
          let r;
          let o;
          let i;
          let s;
          let a;
          let c;
          const u =
              ((r = (n = e).x),
              (o = n.y),
              (i = n.width),
              (s = n.height),
              (a =
                "undefined" !== typeof DOMRectReadOnly
                  ? DOMRectReadOnly
                  : Object),
              (c = Object.create(a.prototype)),
              l(c, {
                x: r,
                y: o,
                width: i,
                height: s,
                top: o,
                right: r + i,
                bottom: s + o,
                left: r,
              }),
              c);
          l(this, { target: t, contentRect: u });
        };
      const S = (() => {
          function t(t, e, n) {
            if (
              ((this.activeObservations_ = []),
              (this.observations_ = new r()),
              "function" !== typeof t)
            )
              throw new TypeError(
                "The callback provided as parameter 1 is not a function.",
              );
            (this.callback_ = t),
              (this.controller_ = e),
              (this.callbackCtx_ = n);
          }
          return (
            (t.prototype.observe = function (t) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" !== typeof Element && Element instanceof Object) {
                if (!(t instanceof f(t).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                const e = this.observations_;
                e.has(t) ||
                  (e.set(t, new g(t)),
                  this.controller_.addObserver(this),
                  this.controller_.refresh());
              }
            }),
            (t.prototype.unobserve = function (t) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" !== typeof Element && Element instanceof Object) {
                if (!(t instanceof f(t).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                const e = this.observations_;
                e.has(t) &&
                  (e.delete(t),
                  e.size || this.controller_.removeObserver(this));
              }
            }),
            (t.prototype.disconnect = function () {
              this.clearActive(),
                this.observations_.clear(),
                this.controller_.removeObserver(this);
            }),
            (t.prototype.gatherActive = function () {;
              this.clearActive(),
                this.observations_.forEach((e) => {
                  e.isActive() && this.activeObservations_.push(e);
                });
            }),
            (t.prototype.broadcastActive = function () {
              if (this.hasActive()) {
                const t = this.callbackCtx_;
                const e = this.activeObservations_.map((t) => new b(t.target, t.broadcastRect()));
                this.callback_.call(t, e, t), this.clearActive();
              }
            }),
            (t.prototype.clearActive = function () {
              this.activeObservations_.splice(0);
            }),
            (t.prototype.hasActive = function () {
              return this.activeObservations_.length > 0;
            }),
            t
          );
        })();
      const w = "undefined" !== typeof WeakMap ? new WeakMap() : new r();
      const O = function t(e) {
          if (!(this instanceof t))
            throw new TypeError("Cannot call a class as a function.");
          if (!arguments.length)
            throw new TypeError("1 argument required, but only 0 present.");
          const n = u.getInstance();
          const r = new S(e, n, this);
          w.set(this, r);
        };
      ["observe", "unobserve", "disconnect"].forEach((t) => {
        O.prototype[t] = function () {
          let e;
          return (e = w.get(this))[t].apply(e, arguments);
        };
      });
      const I = void 0 !== i.ResizeObserver ? i.ResizeObserver : O;
    },
    20037: (t, e, n) => {
      function r() {
        return (
          (r =
            Object.assign ||
            (t) => {
              for (let e = 1; e < arguments.length; e++) {
                const n = arguments[e];
                for (const r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            }),
          r.apply(this, arguments)
        );
      }
      function o(t, e) {
        return (
          (o =
            Object.setPrototypeOf ||
            (t, e) => (t.__proto__ = e), t),
          o(t, e)
        );
      }
      function i(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          o(t, e);
      }
      function s(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return t;
      }
      n.d(e, { FixedSizeList: () => I, VariableSizeList: () => O });
      const a =
        Number.isNaN ||
        (t) => "number" == typeof t && t != t;
      function c(t, e) {
        if (t.length !== e.length) return !1;
        for (let n = 0; n < t.length; n++)
          if (((r = t[n]), (o = e[n]), !(r === o || (a(r) && a(o))))) return !1;
        let r;
        let o;
        return !0;
      }
      const u = (t, e) => {
        let n;
        void 0 === e && (e = c);
        let r;
        let o = [];
        let i = !1;
        return function () {
          for (let s = [], a = 0; a < arguments.length; a++)
            s[a] = arguments[a];
          return (
            (i && n === this && e(s, o)) ||
              ((r = t.apply(this, s)), (i = !0), (n = this), (o = s)),
            r
          );
        };
      };
      const l = n(50959);
      const f =
          "object" === typeof performance && "function" === typeof performance.now
            ? () => performance.now()
            : () => Date.now();
      function h(t) {
        cancelAnimationFrame(t.id);
      }
      function d(t, e) {
        const n = f();
        const r = {
          id: requestAnimationFrame(function o() {
            f() - n >= e ? t.call(null) : (r.id = requestAnimationFrame(o));
          }),
        };
        return r;
      }
      let p = null;
      function v(t) {
        if ((void 0 === t && (t = !1), null === p || t)) {
          const e = document.createElement("div");
          const n = e.style;
          (n.width = "50px"),
            (n.height = "50px"),
            (n.overflow = "scroll"),
            (n.direction = "rtl");
          const r = document.createElement("div");
          const o = r.style;
          return (
            (o.width = "100px"),
            (o.height = "100px"),
            e.appendChild(r),
            document.body.appendChild(e),
            e.scrollLeft > 0
              ? (p = "positive-descending")
              : ((e.scrollLeft = 1),
                (p = 0 === e.scrollLeft ? "negative" : "positive-ascending")),
            document.body.removeChild(e),
            p
          );
        }
        return p;
      }
      const m = (t, e) => t;
      function _(t) {
        let e;
        let n;
        const o = t.getItemOffset;
        const a = t.getEstimatedTotalSize;
        const c = t.getItemSize;
        const f = t.getOffsetForIndexAndAlignment;
        const p = t.getStartIndexForOffset;
        const _ = t.getStopIndexForStartIndex;
        const g = t.initInstanceProps;
        const b = t.shouldResetStyleCacheOnItemSizeChange;
        const S = t.validateProps;
        return (
          (n = e =
            ((t) => {
              function e(e) {
                let n;
                return (
                  ((n = t.call(this, e) || this)._instanceProps = g(
                    n.props,
                    s(s(n)),
                  )),
                  (n._outerRef = void 0),
                  (n._resetIsScrollingTimeoutId = null),
                  (n.state = {
                    instance: s(s(n)),
                    isScrolling: !1,
                    scrollDirection: "forward",
                    scrollOffset:
                      "number" === typeof n.props.initialScrollOffset
                        ? n.props.initialScrollOffset
                        : 0,
                    scrollUpdateWasRequested: !1,
                  }),
                  (n._callOnItemsRendered = void 0),
                  (n._callOnItemsRendered = u((t, e, r, o) => n.props.onItemsRendered({
                      overscanStartIndex: t,
                      overscanStopIndex: e,
                      visibleStartIndex: r,
                      visibleStopIndex: o,
                    }))),
                  (n._callOnScroll = void 0),
                  (n._callOnScroll = u((t, e, r) => n.props.onScroll({
                      scrollDirection: t,
                      scrollOffset: e,
                      scrollUpdateWasRequested: r,
                    }))),
                  (n._getItemStyle = void 0),
                  (n._getItemStyle = (t) => {
                    let e;
                    const r = n.props;
                    const i = r.direction;
                    const s = r.itemSize;
                    const a = r.layout;
                    const u = n._getItemStyleCache(b && s, b && a, b && i);
                    if (u.hasOwnProperty(t)) e = u[t];
                    else {
                      const l = o(n.props, t, n._instanceProps);
                      const f = c(n.props, t, n._instanceProps);
                      const h = "horizontal" === i || "horizontal" === a;
                      const d = "rtl" === i;
                      const p = h ? l : 0;
                      u[t] = e = {
                        position: "absolute",
                        left: d ? void 0 : p,
                        right: d ? p : void 0,
                        top: h ? 0 : l,
                        height: h ? "100%" : f,
                        width: h ? f : "100%",
                      };
                    }
                    return e;
                  }),
                  (n._getItemStyleCache = void 0),
                  (n._getItemStyleCache = u((t, e, n) => ({}))),
                  (n._onScrollHorizontal = (t) => {
                    const e = t.currentTarget;
                    const r = e.clientWidth;
                    const o = e.scrollLeft;
                    const i = e.scrollWidth;
                    n.setState((t) => {
                      if (t.scrollOffset === o) return null;
                      const e = n.props.direction;
                      let s = o;
                      if ("rtl" === e)
                        switch (v()) {
                          case "negative":
                            s = -o;
                            break;
                          case "positive-descending":
                            s = i - r - o;
                        }
                      return (
                        (s = Math.max(0, Math.min(s, i - r))),
                        {
                          isScrolling: !0,
                          scrollDirection:
                            t.scrollOffset < o ? "forward" : "backward",
                          scrollOffset: s,
                          scrollUpdateWasRequested: !1,
                        }
                      );
                    }, n._resetIsScrollingDebounced);
                  }),
                  (n._onScrollVertical = (t) => {
                    const e = t.currentTarget;
                    const r = e.clientHeight;
                    const o = e.scrollHeight;
                    const i = e.scrollTop;
                    n.setState((t) => {
                      if (t.scrollOffset === i) return null;
                      const e = Math.max(0, Math.min(i, o - r));
                      return {
                        isScrolling: !0,
                        scrollDirection:
                          t.scrollOffset < e ? "forward" : "backward",
                        scrollOffset: e,
                        scrollUpdateWasRequested: !1,
                      };
                    }, n._resetIsScrollingDebounced);
                  }),
                  (n._outerRefSetter = (t) => {
                    const e = n.props.outerRef;
                    (n._outerRef = t),
                      "function" === typeof e
                        ? e(t)
                        : null != e &&
                          "object" === typeof e &&
                          e.hasOwnProperty("current") &&
                          (e.current = t);
                  }),
                  (n._resetIsScrollingDebounced = () => {
                    null !== n._resetIsScrollingTimeoutId &&
                      h(n._resetIsScrollingTimeoutId),
                      (n._resetIsScrollingTimeoutId = d(
                        n._resetIsScrolling,
                        150,
                      ));
                  }),
                  (n._resetIsScrolling = () => {
                    (n._resetIsScrollingTimeoutId = null),
                      n.setState({ isScrolling: !1 }, () => {
                        n._getItemStyleCache(-1, null);
                      });
                  }),
                  n
                );
              }
              i(e, t),
                (e.getDerivedStateFromProps = (t, e) => y(t, e), S(t), null);
              const n = e.prototype;
              return (
                (n.scrollTo = function (t) {
                  (t = Math.max(0, t)),
                    this.setState((e) => e.scrollOffset === t
                        ? null
                        : {
                            scrollDirection:
                              e.scrollOffset < t ? "forward" : "backward",
                            scrollOffset: t,
                            scrollUpdateWasRequested: !0,
                          }, this._resetIsScrollingDebounced);
                }),
                (n.scrollToItem = function (t, e) {
                  void 0 === e && (e = "auto");
                  const n = this.props.itemCount;
                  const r = this.state.scrollOffset;
                  (t = Math.max(0, Math.min(t, n - 1))),
                    this.scrollTo(f(this.props, t, e, r, this._instanceProps));
                }),
                (n.componentDidMount = function () {
                  const t = this.props;
                  const e = t.direction;
                  const n = t.initialScrollOffset;
                  const r = t.layout;
                  if ("number" === typeof n && null != this._outerRef) {
                    const o = this._outerRef;
                    "horizontal" === e || "horizontal" === r
                      ? (o.scrollLeft = n)
                      : (o.scrollTop = n);
                  }
                  this._callPropsCallbacks();
                }),
                (n.componentDidUpdate = function () {
                  const t = this.props;
                  const e = t.direction;
                  const n = t.layout;
                  const r = this.state;
                  const o = r.scrollOffset;
                  if (r.scrollUpdateWasRequested && null != this._outerRef) {
                    const i = this._outerRef;
                    if ("horizontal" === e || "horizontal" === n)
                      if ("rtl" === e)
                        switch (v()) {
                          case "negative":
                            i.scrollLeft = -o;
                            break;
                          case "positive-ascending":
                            i.scrollLeft = o;
                            break;
                          default: {
                            const s = i.clientWidth;
                            const a = i.scrollWidth;
                            i.scrollLeft = a - s - o;
                          }
                        }
                      else i.scrollLeft = o;
                    else i.scrollTop = o;
                  }
                  this._callPropsCallbacks();
                }),
                (n.componentWillUnmount = function () {
                  null !== this._resetIsScrollingTimeoutId &&
                    h(this._resetIsScrollingTimeoutId);
                }),
                (n.render = function () {
                  const t = this.props;
                  const e = t.children;
                  const n = t.className;
                  const o = t.direction;
                  const i = t.height;
                  const s = t.innerRef;
                  const c = t.innerElementType;
                  const u = t.innerTagName;
                  const f = t.itemCount;
                  const h = t.itemData;
                  const d = t.itemKey;
                  const p = void 0 === d ? m : d;
                  const v = t.layout;
                  const _ = t.outerElementType;
                  const y = t.outerTagName;
                  const g = t.style;
                  const b = t.useIsScrolling;
                  const S = t.width;
                  const w = this.state.isScrolling;
                  const O = "horizontal" === o || "horizontal" === v;
                  const I = O ? this._onScrollHorizontal : this._onScrollVertical;
                  const M = this._getRangeToRender();
                  const E = M[0];
                  const x = M[1];
                  const R = [];
                  if (f > 0)
                    for (let z = E; z <= x; z++)
                      R.push(
                        (0, l.createElement)(e, {
                          data: h,
                          key: p(z, h),
                          index: z,
                          isScrolling: b ? w : void 0,
                          style: this._getItemStyle(z),
                        }),
                      );
                  const C = a(this.props, this._instanceProps);
                  return (0, l.createElement)(
                    _ || y || "div",
                    {
                      className: n,
                      onScroll: I,
                      ref: this._outerRefSetter,
                      style: r(
                        {
                          position: "relative",
                          height: i,
                          width: S,
                          overflow: "auto",
                          WebkitOverflowScrolling: "touch",
                          willChange: "transform",
                          direction: o,
                        },
                        g,
                      ),
                    },
                    (0, l.createElement)(c || u || "div", {
                      children: R,
                      ref: s,
                      style: {
                        height: O ? "100%" : C,
                        pointerEvents: w ? "none" : void 0,
                        width: O ? C : "100%",
                      },
                    }),
                  );
                }),
                (n._callPropsCallbacks = function () {
                  if (
                    "function" === typeof this.props.onItemsRendered &&
                    this.props.itemCount > 0
                  ) {
                    const t = this._getRangeToRender();
                    const e = t[0];
                    const n = t[1];
                    const r = t[2];
                    const o = t[3];
                    this._callOnItemsRendered(e, n, r, o);
                  }
                  if ("function" === typeof this.props.onScroll) {
                    const i = this.state;
                    const s = i.scrollDirection;
                    const a = i.scrollOffset;
                    const c = i.scrollUpdateWasRequested;
                    this._callOnScroll(s, a, c);
                  }
                }),
                (n._getRangeToRender = function () {
                  const t = this.props;
                  const e = t.itemCount;
                  const n = t.overscanCount;
                  const r = this.state;
                  const o = r.isScrolling;
                  const i = r.scrollDirection;
                  const s = r.scrollOffset;
                  if (0 === e) return [0, 0, 0, 0];
                  const a = p(this.props, s, this._instanceProps);
                  const c = _(this.props, a, s, this._instanceProps);
                  const u = o && "backward" !== i ? 1 : Math.max(1, n);
                  const l = o && "forward" !== i ? 1 : Math.max(1, n);
                  return [
                    Math.max(0, a - u),
                    Math.max(0, Math.min(e - 1, c + l)),
                    a,
                    c,
                  ];
                }),
                e
              );
            })(l.PureComponent)),
          (e.defaultProps = {
            direction: "ltr",
            itemData: void 0,
            layout: "vertical",
            overscanCount: 2,
            useIsScrolling: !1,
          }),
          n
        );
      }
      const y = (t, e) => {
          t.children,
            t.direction,
            t.height,
            t.layout,
            t.innerTagName,
            t.outerTagName,
            t.width,
            e.instance;
        };
      const g = (t, e, n) => {
          const r = t.itemSize;
          const o = n.itemMetadataMap;
          const i = n.lastMeasuredIndex;
          if (e > i) {
            let s = 0;
            if (i >= 0) {
              const a = o[i];
              s = a.offset + a.size;
            }
            for (let c = i + 1; c <= e; c++) {
              const u = r(c);
              (o[c] = { offset: s, size: u }), (s += u);
            }
            n.lastMeasuredIndex = e;
          }
          return o[e];
        };
      const b = (t, e, n, r, o) => {
          while (r <= n) {
            const i = r + Math.floor((n - r) / 2);
            const s = g(t, i, e).offset;
            if (s === o) return i;
            s < o ? (r = i + 1) : s > o && (n = i - 1);
          }
          return r > 0 ? r - 1 : 0;
        };
      const S = (t, e, n, r) => {
          for (let o = t.itemCount, i = 1; n < o && g(t, n, e).offset < r; )
            (n += i), (i *= 2);
          return b(t, e, Math.min(n, o - 1), Math.floor(n / 2), r);
        };
      const w = (t, e) => {
          const n = t.itemCount;
          const r = e.itemMetadataMap;
          const o = e.estimatedItemSize;
          let i = e.lastMeasuredIndex;
          let s = 0;
          if ((i >= n && (i = n - 1), i >= 0)) {
            const a = r[i];
            s = a.offset + a.size;
          }
          return s + (n - i - 1) * o;
        };
      const O = _({
          getItemOffset: (t, e, n) => g(t, e, n).offset,
          getItemSize: (t, e, n) => n.itemMetadataMap[e].size,
          getEstimatedTotalSize: w,
          getOffsetForIndexAndAlignment: (t, e, n, r, o) => {
            const i = t.direction;
            const s = t.height;
            const a = t.layout;
            const c = t.width;
            const u = "horizontal" === i || "horizontal" === a ? c : s;
            const l = g(t, e, o);
            const f = w(t, o);
            const h = Math.max(0, Math.min(f - u, l.offset));
            const d = Math.max(0, l.offset - u + l.size);
            switch (
              ("smart" === n &&
                (n = r >= d - u && r <= h + u ? "auto" : "center"),
              n)
            ) {
              case "start":
                return h;
              case "end":
                return d;
              case "center":
                return Math.round(d + (h - d) / 2);
              default:
                return r >= d && r <= h ? r : r < d ? d : h;
            }
          },
          getStartIndexForOffset: (t, e, n) => ((t, e, n) => {
              const r = e.itemMetadataMap;
              const o = e.lastMeasuredIndex;
              return (o > 0 ? r[o].offset : 0) >= n
                ? b(t, e, o, 0, n)
                : S(t, e, Math.max(0, o), n);
            })(t, n, e),
          getStopIndexForStartIndex: (t, e, n, r) => {
            for (
              let o = t.direction,
                i = t.height,
                s = t.itemCount,
                a = t.layout,
                c = t.width,
                u = "horizontal" === o || "horizontal" === a ? c : i,
                l = g(t, e, r),
                f = n + u,
                h = l.offset + l.size,
                d = e;
              d < s - 1 && h < f;

            )
              d++, (h += g(t, d, r).size);
            return d;
          },
          initInstanceProps: (t, e) => {
            const n = {
              itemMetadataMap: {},
              estimatedItemSize: t.estimatedItemSize || 50,
              lastMeasuredIndex: -1,
            };
            return (
              (e.resetAfterIndex = (t, r) => {
                void 0 === r && (r = !0),
                  (n.lastMeasuredIndex = Math.min(n.lastMeasuredIndex, t - 1)),
                  e._getItemStyleCache(-1),
                  r && e.forceUpdate();
              }),
              n
            );
          },
          shouldResetStyleCacheOnItemSizeChange: !1,
          validateProps: (t) => {
            t.itemSize;
          },
        });
      const I = _({
          getItemOffset: (t, e) => e * t.itemSize,
          getItemSize: (t, e) => t.itemSize,
          getEstimatedTotalSize: (t) => {
            const e = t.itemCount;
            return t.itemSize * e;
          },
          getOffsetForIndexAndAlignment: (t, e, n, r) => {
            const o = t.direction;
            const i = t.height;
            const s = t.itemCount;
            const a = t.itemSize;
            const c = t.layout;
            const u = t.width;
            const l = "horizontal" === o || "horizontal" === c ? u : i;
            const f = Math.max(0, s * a - l);
            const h = Math.min(f, e * a);
            const d = Math.max(0, e * a - l + a);
            switch (
              ("smart" === n &&
                (n = r >= d - l && r <= h + l ? "auto" : "center"),
              n)
            ) {
              case "start":
                return h;
              case "end":
                return d;
              case "center": {
                const p = Math.round(d + (h - d) / 2);
                return p < Math.ceil(l / 2)
                  ? 0
                  : p > f + Math.floor(l / 2)
                  ? f
                  : p;
              }
              default:
                return r >= d && r <= h ? r : r < d ? d : h;
            }
          },
          getStartIndexForOffset: (t, e) => {
            const n = t.itemCount;
            const r = t.itemSize;
            return Math.max(0, Math.min(n - 1, Math.floor(e / r)));
          },
          getStopIndexForStartIndex: (t, e, n) => {
            const r = t.direction;
            const o = t.height;
            const i = t.itemCount;
            const s = t.itemSize;
            const a = t.layout;
            const c = t.width;
            const u = e * s;
            const l = "horizontal" === r || "horizontal" === a ? c : o;
            const f = Math.ceil((l + n - u) / s);
            return Math.max(0, Math.min(i - 1, e + f - 1));
          },
          initInstanceProps: (t) => {},
          shouldResetStyleCacheOnItemSizeChange: !0,
          validateProps: (t) => {
            t.itemSize;
          },
        });
    },
    95257: (t, e) => {
      const n = Symbol.for("react.element");
      const r = Symbol.for("react.portal");
      const o = Symbol.for("react.fragment");
      const i = Symbol.for("react.strict_mode");
      const s = Symbol.for("react.profiler");
      const a = Symbol.for("react.provider");
      let c = Symbol.for("react.context");
      let u = Symbol.for("react.forward_ref");
      let l = Symbol.for("react.suspense");
      const f = Symbol.for("react.memo");
      const h = Symbol.for("react.lazy");
      const d = Symbol.iterator;
      const p = {
          isMounted: () => !1,
          enqueueForceUpdate: () => {},
          enqueueReplaceState: () => {},
          enqueueSetState: () => {},
        };
      const v = Object.assign;
      const m = {};
      function _(t, e, n) {
        (this.props = t),
          (this.context = e),
          (this.refs = m),
          (this.updater = n || p);
      }
      function y() {}
      function g(t, e, n) {
        (this.props = t),
          (this.context = e),
          (this.refs = m),
          (this.updater = n || p);
      }
      (_.prototype.isReactComponent = {}),
        (_.prototype.setState = function (t, e) {
          if ("object" !== typeof t && "function" !== typeof t && null != t)
            throw Error(
              "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
            );
          this.updater.enqueueSetState(this, t, e, "setState");
        }),
        (_.prototype.forceUpdate = function (t) {
          this.updater.enqueueForceUpdate(this, t, "forceUpdate");
        }),
        (y.prototype = _.prototype);
      const b = (g.prototype = new y());
      (b.constructor = g), v(b, _.prototype), (b.isPureReactComponent = !0);
      const S = Array.isArray;
      const w = Object.prototype.hasOwnProperty;
      const O = { current: null };
      const I = { key: !0, ref: !0, __self: !0, __source: !0 };
      function M(t, e, r) {
        let o;
        const i = {};
        let s = null;
        let a = null;
        if (null != e)
          for (o in (void 0 !== e.ref && (a = e.ref),
          void 0 !== e.key && (s = `${e.key}`),
          e))
            w.call(e, o) && !I.hasOwnProperty(o) && (i[o] = e[o]);
        let c = arguments.length - 2;
        if (1 === c) i.children = r;
        else if (1 < c) {
          for (let u = Array(c), l = 0; l < c; l++) u[l] = arguments[l + 2];
          i.children = u;
        }
        if (t?.defaultProps)
          for (o in (c = t.defaultProps)) void 0 === i[o] && (i[o] = c[o]);
        return {
          $$typeof: n,
          type: t,
          key: s,
          ref: a,
          props: i,
          _owner: O.current,
        };
      }
      function E(t) {
        return "object" === typeof t && null !== t && t.$$typeof === n;
      }
      const x = /\/+/g;
      function R(t, e) {
        return "object" === typeof t && null !== t && null != t.key
          ? ((t) => {
              const e = { "=": "=0", ":": "=2" };
              return (
                `$${t.replace(/[=:]/g, (t) => e[t])}`
              );
            })(`${t.key}`)
          : e.toString(36);
      }
      function z(t, e, o, i, s) {
        let a = typeof t;
        ("undefined" !== a && "boolean" !== a) || (t = null);
        let c = !1;
        if (null === t) c = !0;
        else
          switch (a) {
            case "string":
            case "number":
              c = !0;
              break;
            case "object":
              switch (t.$$typeof) {
                case n:
                case r:
                  c = !0;
              }
          }
        if (c)
          return (
            (s = s((c = t))),
            (t = "" === i ? `.${R(c, 0)}` : i),
            S(s)
              ? ((o = ""),
                null != t && (o = `${t.replace(x, "$&/")}/`),
                z(s, e, o, "", (t) => t))
              : null != s &&
                (E(s) &&
                  (s = ((t, e) => ({
                      $$typeof: n,
                      type: t.type,
                      key: e,
                      ref: t.ref,
                      props: t.props,
                      _owner: t._owner,
                    }))(
                    s,
                    o +
                      (!s.key || (c && c.key === s.key)
                        ? ""
                        : `${(`${s.key}`).replace(x, "$&/")}/`) +
                      t,
                  )),
                e.push(s)),
            1
          );
        if (((c = 0), (i = "" === i ? "." : `${i}:`), S(t)))
          for (let u = 0; u < t.length; u++) {
            const l = i + R((a = t[u]), u);
            c += z(a, e, o, l, s);
          }
        else if (
          ((l = ((t) => null === t || "object" !== typeof t
              ? null
              : "function" === typeof (t = (d && t[d]) || t["@@iterator"])
              ? t
              : null)(t)),
          "function" === typeof l)
        )
          for (t = l.call(t), u = 0; !(a = t.next()).done; )
            c += z((a = a.value), e, o, (l = i + R(a, u++)), s);
        else if ("object" === a)
          throw (
            ((e = String(t)),
            Error(
              `Objects are not valid as a React child (found: ${"[object Object]" === e
                  ? `object with keys {${Object.keys(t).join(", ")}}`
                  : e}). If you meant to render a collection of children, use an array instead.`,
            ))
          );
        return c;
      }
      function C(t, e, n) {
        if (null == t) return t;
        const r = [];
        let o = 0;
        return (
          z(t, r, "", "", (t) => e.call(n, t, o++)),
          r
        );
      }
      function T(t) {
        if (-1 === t._status) {
          let e = t._result;
          (e = e()).then(
            (e) => {
              (0 !== t._status && -1 !== t._status) ||
                ((t._status = 1), (t._result = e));
            },
            (e) => {
              (0 !== t._status && -1 !== t._status) ||
                ((t._status = 2), (t._result = e));
            },
          ),
            -1 === t._status && ((t._status = 0), (t._result = e));
        }
        if (1 === t._status) return t._result.default;
        throw t._result;
      }
      const k = { current: null };
      const P = { transition: null };
      const A = {
          ReactCurrentDispatcher: k,
          ReactCurrentBatchConfig: P,
          ReactCurrentOwner: O,
        };
      (e.Children = {
        map: C,
        forEach: (t, e, n) => {
          C(
            t,
            function () {
              e.apply(this, arguments);
            },
            n,
          );
        },
        count: (t) => {
          let e = 0;
          return (
            C(t, () => {
              e++;
            }),
            e
          );
        },
        toArray: (t) => (
            C(t, (t) => t) || []
          ),
        only: (t) => {
          if (!E(t))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return t;
        },
      }),
        (e.Component = _),
        (e.Fragment = o),
        (e.Profiler = s),
        (e.PureComponent = g),
        (e.StrictMode = i),
        (e.Suspense = l),
        (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = A),
        (e.cloneElement = (t, e, r) => {
          if (null == t)
            throw Error(
              `React.cloneElement(...): The argument must be a React element, but you passed ${t}.`,
            );
          const o = v({}, t.props);
          let i = t.key;
          let s = t.ref;
          let a = t._owner;
          if (null != e) {
            if (
              (void 0 !== e.ref && ((s = e.ref), (a = O.current)),
              void 0 !== e.key && (i = `${e.key}`),
              t.type?.defaultProps)
            )
              const c = t.type.defaultProps;
            for (u in e)
              w.call(e, u) &&
                !I.hasOwnProperty(u) &&
                (o[u] = void 0 === e[u] && void 0 !== c ? c[u] : e[u]);
          }
          const u = arguments.length - 2;
          if (1 === u) o.children = r;
          else if (1 < u) {
            c = Array(u);
            for (let l = 0; l < u; l++) c[l] = arguments[l + 2];
            o.children = c;
          }
          return {
            $$typeof: n,
            type: t.type,
            key: i,
            ref: s,
            props: o,
            _owner: a,
          };
        }),
        (e.createContext = (t) => (
            ((t = {
              $$typeof: c,
              _currentValue: t,
              _currentValue2: t,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null,
            }).Provider = { $$typeof: a, _context: t }),
            (t.Consumer = t)
          )),
        (e.createElement = M),
        (e.createFactory = (t) => {
          const e = M.bind(null, t);
          return (e.type = t), e;
        }),
        (e.createRef = () => ({ current: null })),
        (e.forwardRef = (t) => ({ $$typeof: u, render: t })),
        (e.isValidElement = E),
        (e.lazy = (t) => ({
            $$typeof: h,
            _payload: { _status: -1, _result: t },
            _init: T,
          })),
        (e.memo = (t, e) => ({ $$typeof: f, type: t, compare: void 0 === e ? null : e })),
        (e.startTransition = (t) => {
          const e = P.transition;
          P.transition = {};
          try {
            t();
          } finally {
            P.transition = e;
          }
        }),
        (e.unstable_act = () => {
          throw Error(
            "act(...) is not supported in production builds of React.",
          );
        }),
        (e.useCallback = (t, e) => k.current.useCallback(t, e)),
        (e.useContext = (t) => k.current.useContext(t)),
        (e.useDebugValue = () => {}),
        (e.useDeferredValue = (t) => k.current.useDeferredValue(t)),
        (e.useEffect = (t, e) => k.current.useEffect(t, e)),
        (e.useId = () => k.current.useId()),
        (e.useImperativeHandle = (t, e, n) => k.current.useImperativeHandle(t, e, n)),
        (e.useInsertionEffect = (t, e) => k.current.useInsertionEffect(t, e)),
        (e.useLayoutEffect = (t, e) => k.current.useLayoutEffect(t, e)),
        (e.useMemo = (t, e) => k.current.useMemo(t, e)),
        (e.useReducer = (t, e, n) => k.current.useReducer(t, e, n)),
        (e.useRef = (t) => k.current.useRef(t)),
        (e.useState = (t) => k.current.useState(t)),
        (e.useSyncExternalStore = (t, e, n) => k.current.useSyncExternalStore(t, e, n)),
        (e.useTransition = () => k.current.useTransition()),
        (e.version = "18.2.0");
    },
    50959: (t, e, n) => {
      t.exports = n(95257);
    },
  },
]);
