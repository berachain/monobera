(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[1044, 8115, 306],
	{
		59255: (t, e, n) => {
			n.r(e), n.d(e, { default: () => S });
			const r = (() => {
					if ("undefined" !== typeof Map) return Map;
					function t(t, e) {
						let n = -1;
						return t.some((t, r) => t[0] === e && ((n = r), !0)), n;
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
			const u = [
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
			const a = (() => {
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
								function u() {
									s(i);
								}
								function c() {
									const t = Date.now();
									if (n) {
										if (t - o < 2) return;
										r = !0;
									} else (n = !0), (r = !1), setTimeout(u, e);
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
							const t = this.observers_.filter(
								(t) => t.gatherActive(),
								t.hasActive(),
							);
							return t.forEach((t) => t.broadcastActive()), t.length > 0;
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
							u.some((t) => !!~n.indexOf(t)) && this.refresh();
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
			const f = (t, e) => {
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
			const l = (t) => (t?.ownerDocument?.defaultView) || i;
			const h = b(0, 0, 0, 0);
			function p(t) {
				return parseFloat(t) || 0;
			}
			function d(t) {
				for (let e = [], n = 1; n < arguments.length; n++)
					e[n - 1] = arguments[n];
				return e.reduce((e, n) => e + p(t[`border-${n}-width`]), 0);
			}
			function y(t) {
				const e = t.clientWidth;
				const n = t.clientHeight;
				if (!e && !n) return h;
				const r = l(t).getComputedStyle(t);
				const o = ((t) => {
						for (
							let e = {}, n = 0, r = ["top", "right", "bottom", "left"];
							n < r.length;
							n++
						) {
							const o = r[n];
							const i = t[`padding-${o}`];
							e[o] = p(i);
						}
						return e;
					})(r);
				const i = o.left + o.right;
				const s = o.top + o.bottom;
				let u = p(r.width);
				let c = p(r.height);
				if (
					("border-box" === r.boxSizing &&
						(Math.round(u + i) !== e && (u -= d(r, "left", "right") + i),
						Math.round(c + s) !== n && (c -= d(r, "top", "bottom") + s)),
					!((t) => t === l(t).document.documentElement)(t))
				) {
					const a = Math.round(u + i) - e;
					const f = Math.round(c + s) - n;
					1 !== Math.abs(a) && (u -= a), 1 !== Math.abs(f) && (c -= f);
				}
				return b(o.left, o.top, u, c);
			}
			const _ =
				"undefined" !== typeof SVGGraphicsElement
					? (t) => t instanceof l(t).SVGGraphicsElement
					: (t) =>
							t instanceof l(t).SVGElement && "function" === typeof t.getBBox;
			function v(t) {
				return o
					? _(t)
						? ((t) => {
								const e = t.getBBox();
								return b(0, 0, e.width, e.height);
						  })(t)
						: y(t)
					: h;
			}
			function b(t, e, n, r) {
				return { x: t, y: e, width: n, height: r };
			}
			const m = (() => {
					function t(t) {
						(this.broadcastWidth = 0),
							(this.broadcastHeight = 0),
							(this.contentRect_ = b(0, 0, 0, 0)),
							(this.target = t);
					}
					return (
						(t.prototype.isActive = function () {
							const t = v(this.target);
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
			const w = function (t, e) {
					let n;
					let r;
					let o;
					let i;
					let s;
					let u;
					let c;
					const a =
							((r = (n = e).x),
							(o = n.y),
							(i = n.width),
							(s = n.height),
							(u =
								"undefined" !== typeof DOMRectReadOnly
									? DOMRectReadOnly
									: Object),
							(c = Object.create(u.prototype)),
							f(c, {
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
					f(this, { target: t, contentRect: a });
				};
			const g = (() => {
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
								if (!(t instanceof l(t).Element))
									throw new TypeError('parameter 1 is not of type "Element".');
								const e = this.observations_;
								e.has(t) ||
									(e.set(t, new m(t)),
									this.controller_.addObserver(this),
									this.controller_.refresh());
							}
						}),
						(t.prototype.unobserve = function (t) {
							if (!arguments.length)
								throw new TypeError("1 argument required, but only 0 present.");
							if ("undefined" !== typeof Element && Element instanceof Object) {
								if (!(t instanceof l(t).Element))
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
						(t.prototype.gatherActive = function () {
							this.clearActive(),
								this.observations_.forEach((e) => {
									e.isActive() && this.activeObservations_.push(e);
								});
						}),
						(t.prototype.broadcastActive = function () {
							if (this.hasActive()) {
								const t = this.callbackCtx_;
								const e = this.activeObservations_.map(
										(t) => new w(t.target, t.broadcastRect()),
									);
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
			const E = "undefined" !== typeof WeakMap ? new WeakMap() : new r();
			const O = function t(e) {
					if (!(this instanceof t))
						throw new TypeError("Cannot call a class as a function.");
					if (!arguments.length)
						throw new TypeError("1 argument required, but only 0 present.");
					const n = a.getInstance();
					const r = new g(e, n, this);
					E.set(this, r);
				};
			["observe", "unobserve", "disconnect"].forEach((t) => {
				O.prototype[t] = function () {
					let e;
					return (e = E.get(this))[t].apply(e, arguments);
				};
			});
			const S = void 0 !== i.ResizeObserver ? i.ResizeObserver : O;
		},
		6132: (t, e, n) => {
			const r = n(22134);
			function o() {}
			function i() {}
			(i.resetWarningCache = o),
				(t.exports = () => {
					function t(t, e, n, o, i, s) {
						if (s !== r) {
							const u = new Error(
								"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
							);
							throw ((u.name = "Invariant Violation"), u);
						}
					}
					function e() {
						return t;
					}
					t.isRequired = t;
					const n = {
						array: t,
						bool: t,
						func: t,
						number: t,
						object: t,
						string: t,
						symbol: t,
						any: t,
						arrayOf: e,
						element: t,
						elementType: t,
						instanceOf: e,
						node: t,
						objectOf: e,
						oneOf: e,
						oneOfType: e,
						shape: e,
						exact: e,
						checkPropTypes: i,
						resetWarningCache: o,
					};
					return (n.PropTypes = n), n;
				});
		},
		19036: (t, e, n) => {
			t.exports = n(6132)();
		},
		22134: (t) => {
			t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
		},
		95257: (t, e) => {
			const n = Symbol.for("react.element");
			const r = Symbol.for("react.portal");
			const o = Symbol.for("react.fragment");
			const i = Symbol.for("react.strict_mode");
			const s = Symbol.for("react.profiler");
			const u = Symbol.for("react.provider");
			let c = Symbol.for("react.context");
			let a = Symbol.for("react.forward_ref");
			let f = Symbol.for("react.suspense");
			const l = Symbol.for("react.memo");
			const h = Symbol.for("react.lazy");
			const p = Symbol.iterator;
			const d = {
					isMounted: () => !1,
					enqueueForceUpdate: () => {},
					enqueueReplaceState: () => {},
					enqueueSetState: () => {},
				};
			const y = Object.assign;
			const _ = {};
			function v(t, e, n) {
				(this.props = t),
					(this.context = e),
					(this.refs = _),
					(this.updater = n || d);
			}
			function b() {}
			function m(t, e, n) {
				(this.props = t),
					(this.context = e),
					(this.refs = _),
					(this.updater = n || d);
			}
			(v.prototype.isReactComponent = {}),
				(v.prototype.setState = function (t, e) {
					if ("object" !== typeof t && "function" !== typeof t && null != t)
						throw Error(
							"setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
						);
					this.updater.enqueueSetState(this, t, e, "setState");
				}),
				(v.prototype.forceUpdate = function (t) {
					this.updater.enqueueForceUpdate(this, t, "forceUpdate");
				}),
				(b.prototype = v.prototype);
			const w = (m.prototype = new b());
			(w.constructor = m), y(w, v.prototype), (w.isPureReactComponent = !0);
			const g = Array.isArray;
			const E = Object.prototype.hasOwnProperty;
			const O = { current: null };
			const S = { key: !0, ref: !0, __self: !0, __source: !0 };
			function R(t, e, r) {
				let o;
				const i = {};
				let s = null;
				let u = null;
				if (null != e)
					for (o in (void 0 !== e.ref && (u = e.ref),
					void 0 !== e.key && (s = `${e.key}`),
					e))
						E.call(e, o) && !S.hasOwnProperty(o) && (i[o] = e[o]);
				let c = arguments.length - 2;
				if (1 === c) i.children = r;
				else if (1 < c) {
					for (let a = Array(c), f = 0; f < c; f++) a[f] = arguments[f + 2];
					i.children = a;
				}
				if (t?.defaultProps)
					for (o in (c = t.defaultProps)) void 0 === i[o] && (i[o] = c[o]);
				return {
					$$typeof: n,
					type: t,
					key: s,
					ref: u,
					props: i,
					_owner: O.current,
				};
			}
			function k(t) {
				return "object" === typeof t && null !== t && t.$$typeof === n;
			}
			const T = /\/+/g;
			function C(t, e) {
				return "object" === typeof t && null !== t && null != t.key
					? ((t) => {
							const e = { "=": "=0", ":": "=2" };
							return `$${t.replace(/[=:]/g, (t) => e[t])}`;
					  })(`${t.key}`)
					: e.toString(36);
			}
			function x(t, e, o, i, s) {
				let u = typeof t;
				("undefined" !== u && "boolean" !== u) || (t = null);
				let c = !1;
				if (null === t) c = !0;
				else
					switch (u) {
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
						(t = "" === i ? `.${C(c, 0)}` : i),
						g(s)
							? ((o = ""),
							  null != t && (o = `${t.replace(T, "$&/")}/`),
							  x(s, e, o, "", (t) => t))
							: null != s &&
							  (k(s) &&
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
												: `${(`${s.key}`).replace(T, "$&/")}/`) +
											t,
									)),
							  e.push(s)),
						1
					);
				if (((c = 0), (i = "" === i ? "." : `${i}:`), g(t)))
					for (let a = 0; a < t.length; a++) {
						const f = i + C((u = t[a]), a);
						c += x(u, e, o, f, s);
					}
				else if (
					((f = ((t) =>
						null === t || "object" !== typeof t
							? null
							: "function" === typeof (t = (p && t[p]) || t["@@iterator"])
							  ? t
							  : null)(t)),
					"function" === typeof f)
				)
					for (t = f.call(t), a = 0; !(u = t.next()).done; )
						c += x((u = u.value), e, o, (f = i + C(u, a++)), s);
				else if ("object" === u)
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
			function M(t, e, n) {
				if (null == t) return t;
				const r = [];
				let o = 0;
				return x(t, r, "", "", (t) => e.call(n, t, o++)), r;
			}
			function A(t) {
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
			const j = { current: null };
			const $ = { transition: null };
			const P = {
					ReactCurrentDispatcher: j,
					ReactCurrentBatchConfig: $,
					ReactCurrentOwner: O,
				};
			(e.Children = {
				map: M,
				forEach: (t, e, n) => {
					M(
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
						M(t, () => {
							e++;
						}),
						e
					);
				},
				toArray: (t) => M(t, (t) => t) || [],
				only: (t) => {
					if (!k(t))
						throw Error(
							"React.Children.only expected to receive a single React element child.",
						);
					return t;
				},
			}),
				(e.Component = v),
				(e.Fragment = o),
				(e.Profiler = s),
				(e.PureComponent = m),
				(e.StrictMode = i),
				(e.Suspense = f),
				(e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = P),
				(e.cloneElement = (t, e, r) => {
					if (null == t)
						throw Error(
							`React.cloneElement(...): The argument must be a React element, but you passed ${t}.`,
						);
					const o = y({}, t.props);
					let i = t.key;
					let s = t.ref;
					let u = t._owner;
					if (null != e) {
						if (
							(void 0 !== e.ref && ((s = e.ref), (u = O.current)),
							void 0 !== e.key && (i = `${e.key}`),
							t.type?.defaultProps)
						)
							const c = t.type.defaultProps;
						for (a in e)
							E.call(e, a) &&
								!S.hasOwnProperty(a) &&
								(o[a] = void 0 === e[a] && void 0 !== c ? c[a] : e[a]);
					}
					const a = arguments.length - 2;
					if (1 === a) o.children = r;
					else if (1 < a) {
						c = Array(a);
						for (let f = 0; f < a; f++) c[f] = arguments[f + 2];
						o.children = c;
					}
					return {
						$$typeof: n,
						type: t.type,
						key: i,
						ref: s,
						props: o,
						_owner: u,
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
					}).Provider = { $$typeof: u, _context: t }),
					(t.Consumer = t)
				)),
				(e.createElement = R),
				(e.createFactory = (t) => {
					const e = R.bind(null, t);
					return (e.type = t), e;
				}),
				(e.createRef = () => ({ current: null })),
				(e.forwardRef = (t) => ({ $$typeof: a, render: t })),
				(e.isValidElement = k),
				(e.lazy = (t) => ({
					$$typeof: h,
					_payload: { _status: -1, _result: t },
					_init: A,
				})),
				(e.memo = (t, e) => ({
					$$typeof: l,
					type: t,
					compare: void 0 === e ? null : e,
				})),
				(e.startTransition = (t) => {
					const e = $.transition;
					$.transition = {};
					try {
						t();
					} finally {
						$.transition = e;
					}
				}),
				(e.unstable_act = () => {
					throw Error(
						"act(...) is not supported in production builds of React.",
					);
				}),
				(e.useCallback = (t, e) => j.current.useCallback(t, e)),
				(e.useContext = (t) => j.current.useContext(t)),
				(e.useDebugValue = () => {}),
				(e.useDeferredValue = (t) => j.current.useDeferredValue(t)),
				(e.useEffect = (t, e) => j.current.useEffect(t, e)),
				(e.useId = () => j.current.useId()),
				(e.useImperativeHandle = (t, e, n) =>
					j.current.useImperativeHandle(t, e, n)),
				(e.useInsertionEffect = (t, e) => j.current.useInsertionEffect(t, e)),
				(e.useLayoutEffect = (t, e) => j.current.useLayoutEffect(t, e)),
				(e.useMemo = (t, e) => j.current.useMemo(t, e)),
				(e.useReducer = (t, e, n) => j.current.useReducer(t, e, n)),
				(e.useRef = (t) => j.current.useRef(t)),
				(e.useState = (t) => j.current.useState(t)),
				(e.useSyncExternalStore = (t, e, n) =>
					j.current.useSyncExternalStore(t, e, n)),
				(e.useTransition = () => j.current.useTransition()),
				(e.version = "18.2.0");
		},
		50959: (t, e, n) => {
			t.exports = n(95257);
		},
	},
]);
