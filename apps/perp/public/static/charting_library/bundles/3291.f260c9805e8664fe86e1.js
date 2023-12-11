(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[3291],
	{
		59142: (e, t) => {
			let n;
			let r;
			let o;
			(r = [t]),
				(n = (e) => {
					function t(e) {
						if (Array.isArray(e)) {
							for (let t = 0, n = Array(e.length); t < e.length; t++)
								n[t] = e[t];
							return n;
						}
						return Array.from(e);
					}
					Object.defineProperty(e, "__esModule", { value: !0 });
					let n = !1;
					if ("undefined" !== typeof window) {
						const r = {
							get passive() {
								n = !0;
							},
						};
						window.addEventListener("testPassive", null, r),
							window.removeEventListener("testPassive", null, r);
					}
					const o =
							"undefined" !== typeof window &&
							window.navigator &&
							window.navigator.platform &&
							/iP(ad|hone|od)/.test(window.navigator.platform);
					let a = [];
					let i = !1;
					let u = -1;
					let c = void 0;
					let l = void 0;
					const s = (e) =>
							a.some(
								(t) =>
									!(!t.options.allowTouchMove || !t.options.allowTouchMove(e)),
							);
					const f = (e) => {
							const t = e || window.event;
							return (
								!!s(t.target) ||
								1 < t.touches.length ||
								(t.preventDefault?.(), !1)
							);
						};
					const d = () => {
							setTimeout(() => {
								void 0 !== l &&
									((document.body.style.paddingRight = l), (l = void 0)),
									void 0 !== c &&
										((document.body.style.overflow = c), (c = void 0));
							});
						};
					(e.disableBodyScroll = (e, r) => {
						if (o) {
							if (!e)
								return void console.error(
									"disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.",
								);
							if (e && !a.some((t) => t.targetElement === e)) {
								const d = { targetElement: e, options: r || {} };
								(a = [].concat(t(a), [d])),
									(e.ontouchstart = (e) => {
										1 === e.targetTouches.length &&
											(u = e.targetTouches[0].clientY);
									}),
									(e.ontouchmove = (t) => {
										let n;
										let r;
										let o;
										let a;
										1 === t.targetTouches.length &&
											((r = e),
											(a = (n = t).targetTouches[0].clientY - u),
											!s(n.target) &&
												((r && 0 === r.scrollTop && 0 < a) ||
												((o = r) &&
													o.scrollHeight - o.scrollTop <= o.clientHeight &&
													a < 0)
													? f(n)
													: n.stopPropagation()));
									}),
									i ||
										(document.addEventListener(
											"touchmove",
											f,
											n ? { passive: !1 } : void 0,
										),
										(i = !0));
							}
						} else {
							(m = r),
								setTimeout(() => {
									if (void 0 === l) {
										const e = !!m && !0 === m.reserveScrollBarGap;
										const t =
												window.innerWidth -
												document.documentElement.clientWidth;
										e &&
											0 < t &&
											((l = document.body.style.paddingRight),
											(document.body.style.paddingRight = `${t}px`));
									}
									void 0 === c &&
										((c = document.body.style.overflow),
										(document.body.style.overflow = "hidden"));
								});
							const p = { targetElement: e, options: r || {} };
							a = [].concat(t(a), [p]);
						}
						let m;
					}),
						(e.clearAllBodyScrollLocks = () => {
							o
								? (a.forEach((e) => {
										(e.targetElement.ontouchstart = null),
											(e.targetElement.ontouchmove = null);
								  }),
								  i &&
										(document.removeEventListener(
											"touchmove",
											f,
											n ? { passive: !1 } : void 0,
										),
										(i = !1)),
								  (a = []),
								  (u = -1))
								: (d(), (a = []));
						}),
						(e.enableBodyScroll = (e) => {
							if (o) {
								if (!e)
									return void console.error(
										"enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.",
									);
								(e.ontouchstart = null),
									(e.ontouchmove = null),
									(a = a.filter((t) => t.targetElement !== e)),
									i &&
										0 === a.length &&
										(document.removeEventListener(
											"touchmove",
											f,
											n ? { passive: !1 } : void 0,
										),
										(i = !1));
							} else
								1 === a.length && a[0].targetElement === e
									? (d(), (a = []))
									: (a = a.filter((t) => t.targetElement !== e));
						});
				}),
				void 0 === (o = "function" === typeof n ? n.apply(t, r) : n) ||
					(e.exports = o);
		},
		25650: (e) => {
			e.exports = {
				loader: "loader-UL6iwcBa",
				static: "static-UL6iwcBa",
				item: "item-UL6iwcBa",
				"tv-button-loader": "tv-button-loader-UL6iwcBa",
				medium: "medium-UL6iwcBa",
				small: "small-UL6iwcBa",
				black: "black-UL6iwcBa",
				white: "white-UL6iwcBa",
				gray: "gray-UL6iwcBa",
				primary: "primary-UL6iwcBa",
				"loader-initial": "loader-initial-UL6iwcBa",
				"loader-appear": "loader-appear-UL6iwcBa",
			};
		},
		92910: (e) => {
			e.exports = {
				separator: "separator-QjUlCDId",
				small: "small-QjUlCDId",
				normal: "normal-QjUlCDId",
				large: "large-QjUlCDId",
			};
		},
		26996: (e, t, n) => {
			n.d(t, { Loader: () => l });
			let r;
			const o = n(50959);
			const a = n(97754);
			const i = n(74991);
			const u = n(25650);
			const c = n.n(u);
			!((e) => {
				(e[(e.Initial = 0)] = "Initial"),
					(e[(e.Appear = 1)] = "Appear"),
					(e[(e.Active = 2)] = "Active");
			})(r || (r = {}));
			class l extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._stateChangeTimeout = null),
						(this.state = { state: r.Initial });
				}
				render() {
					const {
							className: e,
							color: t = "black",
							size: n = "medium",
							staticPosition: r,
						} = this.props;
					const i = a(c().item, c()[t], c()[n]);
					return o.createElement(
						"span",
						{
							className: a(
								c().loader,
								r && c().static,
								this._getStateClass(),
								e,
							),
						},
						o.createElement("span", { className: i }),
						o.createElement("span", { className: i }),
						o.createElement("span", { className: i }),
					);
				}
				componentDidMount() {
					this.setState({ state: r.Appear }),
						(this._stateChangeTimeout = setTimeout(() => {
							this.setState({ state: r.Active });
						}, 2 * i.dur));
				}
				componentWillUnmount() {
					this._stateChangeTimeout &&
						(clearTimeout(this._stateChangeTimeout),
						(this._stateChangeTimeout = null));
				}
				_getStateClass() {
					switch (this.state.state) {
						case r.Initial:
							return c()["loader-initial"];
						case r.Appear:
							return c()["loader-appear"];
						default:
							return "";
					}
				}
			}
		},
		47201: (e, t, n) => {
			function r(...e) {
				return (t) => {
					for (const n of e) void 0 !== n && n(t);
				};
			}
			n.d(t, { createSafeMulticastEventHandler: () => r });
		},
		51613: (e, t, n) => {
			n.d(t, { PopupMenuSeparator: () => u });
			const r = n(50959);
			const o = n(97754);
			const a = n.n(o);
			const i = n(92910);
			function u(e) {
				const { size: t = "normal", className: n, ariaHidden: o = !1 } = e;
				return r.createElement("div", {
					className: a()(
						i.separator,
						"small" === t && i.small,
						"normal" === t && i.normal,
						"large" === t && i.large,
						n,
					),
					role: "separator",
					"aria-hidden": o,
				});
			}
		},
		40173: (e, t, n) => {
			function r(e, t, n = {}) {
				return Object.assign(
					{},
					e,
					((e, t, n = {}) => {
						const r = Object.assign({}, t);
						for (const o of Object.keys(t)) {
							const a = n[o] || o;
							a in e && (r[o] = [e[a], t[o]].join(" "));
						}
						return r;
					})(e, t, n),
				);
			}
			n.d(t, { mergeThemes: () => r });
		},
		6132: (e, t, n) => {
			const r = n(22134);
			function o() {}
			function a() {}
			(a.resetWarningCache = o),
				(e.exports = () => {
					function e(e, t, n, o, a, i) {
						if (i !== r) {
							const u = new Error(
								"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
							);
							throw ((u.name = "Invariant Violation"), u);
						}
					}
					function t() {
						return e;
					}
					e.isRequired = e;
					const n = {
						array: e,
						bool: e,
						func: e,
						number: e,
						object: e,
						string: e,
						symbol: e,
						any: e,
						arrayOf: t,
						element: e,
						elementType: e,
						instanceOf: t,
						node: e,
						objectOf: t,
						oneOf: t,
						oneOfType: t,
						shape: t,
						exact: t,
						checkPropTypes: a,
						resetWarningCache: o,
					};
					return (n.PropTypes = n), n;
				});
		},
		19036: (e, t, n) => {
			e.exports = n(6132)();
		},
		22134: (e) => {
			e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
		},
		95257: (e, t) => {
			const n = Symbol.for("react.element");
			const r = Symbol.for("react.portal");
			const o = Symbol.for("react.fragment");
			const a = Symbol.for("react.strict_mode");
			const i = Symbol.for("react.profiler");
			const u = Symbol.for("react.provider");
			let c = Symbol.for("react.context");
			let l = Symbol.for("react.forward_ref");
			let s = Symbol.for("react.suspense");
			const f = Symbol.for("react.memo");
			const d = Symbol.for("react.lazy");
			const p = Symbol.iterator;
			const m = {
					isMounted: () => !1,
					enqueueForceUpdate: () => {},
					enqueueReplaceState: () => {},
					enqueueSetState: () => {},
				};
			const v = Object.assign;
			const y = {};
			function h(e, t, n) {
				(this.props = e),
					(this.context = t),
					(this.refs = y),
					(this.updater = n || m);
			}
			function E() {}
			function b(e, t, n) {
				(this.props = e),
					(this.context = t),
					(this.refs = y),
					(this.updater = n || m);
			}
			(h.prototype.isReactComponent = {}),
				(h.prototype.setState = function (e, t) {
					if ("object" !== typeof e && "function" !== typeof e && null != e)
						throw Error(
							"setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
						);
					this.updater.enqueueSetState(this, e, t, "setState");
				}),
				(h.prototype.forceUpdate = function (e) {
					this.updater.enqueueForceUpdate(this, e, "forceUpdate");
				}),
				(E.prototype = h.prototype);
			const g = (b.prototype = new E());
			(g.constructor = b), v(g, h.prototype), (g.isPureReactComponent = !0);
			const _ = Array.isArray;
			const T = Object.prototype.hasOwnProperty;
			const w = { current: null };
			const S = { key: !0, ref: !0, __self: !0, __source: !0 };
			function C(e, t, r) {
				let o;
				const a = {};
				let i = null;
				let u = null;
				if (null != t)
					for (o in (void 0 !== t.ref && (u = t.ref),
					void 0 !== t.key && (i = `${t.key}`),
					t))
						T.call(t, o) && !S.hasOwnProperty(o) && (a[o] = t[o]);
				let c = arguments.length - 2;
				if (1 === c) a.children = r;
				else if (1 < c) {
					for (let l = Array(c), s = 0; s < c; s++) l[s] = arguments[s + 2];
					a.children = l;
				}
				if (e?.defaultProps)
					for (o in (c = e.defaultProps)) void 0 === a[o] && (a[o] = c[o]);
				return {
					$$typeof: n,
					type: e,
					key: i,
					ref: u,
					props: a,
					_owner: w.current,
				};
			}
			function L(e) {
				return "object" === typeof e && null !== e && e.$$typeof === n;
			}
			const A = /\/+/g;
			function I(e, t) {
				return "object" === typeof e && null !== e && null != e.key
					? ((e) => {
							const t = { "=": "=0", ":": "=2" };
							return `$${e.replace(/[=:]/g, (e) => t[e])}`;
					  })(`${e.key}`)
					: t.toString(36);
			}
			function R(e, t, o, a, i) {
				let u = typeof e;
				("undefined" !== u && "boolean" !== u) || (e = null);
				let c = !1;
				if (null === e) c = !0;
				else
					switch (u) {
						case "string":
						case "number":
							c = !0;
							break;
						case "object":
							switch (e.$$typeof) {
								case n:
								case r:
									c = !0;
							}
					}
				if (c)
					return (
						(i = i((c = e))),
						(e = "" === a ? `.${I(c, 0)}` : a),
						_(i)
							? ((o = ""),
							  null != e && (o = `${e.replace(A, "$&/")}/`),
							  R(i, t, o, "", (e) => e))
							: null != i &&
							  (L(i) &&
									(i = ((e, t) => ({
										$$typeof: n,
										type: e.type,
										key: t,
										ref: e.ref,
										props: e.props,
										_owner: e._owner,
									}))(
										i,
										o +
											(!i.key || (c && c.key === i.key)
												? ""
												: `${(`${i.key}`).replace(A, "$&/")}/`) +
											e,
									)),
							  t.push(i)),
						1
					);
				if (((c = 0), (a = "" === a ? "." : `${a}:`), _(e)))
					for (let l = 0; l < e.length; l++) {
						const s = a + I((u = e[l]), l);
						c += R(u, t, o, s, i);
					}
				else if (
					((s = ((e) =>
						null === e || "object" !== typeof e
							? null
							: "function" === typeof (e = (p && e[p]) || e["@@iterator"])
							  ? e
							  : null)(e)),
					"function" === typeof s)
				)
					for (e = s.call(e), l = 0; !(u = e.next()).done; )
						c += R((u = u.value), t, o, (s = a + I(u, l++)), i);
				else if ("object" === u)
					throw (
						((t = String(e)),
						Error(
							`Objects are not valid as a React child (found: ${"[object Object]" === t
									? `object with keys {${Object.keys(e).join(", ")}}`
									: t}). If you meant to render a collection of children, use an array instead.`,
						))
					);
				return c;
			}
			function B(e, t, n) {
				if (null == e) return e;
				const r = [];
				let o = 0;
				return R(e, r, "", "", (e) => t.call(n, e, o++)), r;
			}
			function O(e) {
				if (-1 === e._status) {
					let t = e._result;
					(t = t()).then(
						(t) => {
							(0 !== e._status && -1 !== e._status) ||
								((e._status = 1), (e._result = t));
						},
						(t) => {
							(0 !== e._status && -1 !== e._status) ||
								((e._status = 2), (e._result = t));
						},
					),
						-1 === e._status && ((e._status = 0), (e._result = t));
				}
				if (1 === e._status) return e._result.default;
				throw e._result;
			}
			const k = { current: null };
			const P = { transition: null };
			const M = {
					ReactCurrentDispatcher: k,
					ReactCurrentBatchConfig: P,
					ReactCurrentOwner: w,
				};
			(t.Children = {
				map: B,
				forEach: (e, t, n) => {
					B(
						e,
						function () {
							t.apply(this, arguments);
						},
						n,
					);
				},
				count: (e) => {
					let t = 0;
					return (
						B(e, () => {
							t++;
						}),
						t
					);
				},
				toArray: (e) => B(e, (e) => e) || [],
				only: (e) => {
					if (!L(e))
						throw Error(
							"React.Children.only expected to receive a single React element child.",
						);
					return e;
				},
			}),
				(t.Component = h),
				(t.Fragment = o),
				(t.Profiler = i),
				(t.PureComponent = b),
				(t.StrictMode = a),
				(t.Suspense = s),
				(t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M),
				(t.cloneElement = (e, t, r) => {
					if (null == e)
						throw Error(
							`React.cloneElement(...): The argument must be a React element, but you passed ${e}.`,
						);
					const o = v({}, e.props);
					let a = e.key;
					let i = e.ref;
					let u = e._owner;
					if (null != t) {
						if (
							(void 0 !== t.ref && ((i = t.ref), (u = w.current)),
							void 0 !== t.key && (a = `${t.key}`),
							e.type?.defaultProps)
						)
							const c = e.type.defaultProps;
						for (l in t)
							T.call(t, l) &&
								!S.hasOwnProperty(l) &&
								(o[l] = void 0 === t[l] && void 0 !== c ? c[l] : t[l]);
					}
					const l = arguments.length - 2;
					if (1 === l) o.children = r;
					else if (1 < l) {
						c = Array(l);
						for (let s = 0; s < l; s++) c[s] = arguments[s + 2];
						o.children = c;
					}
					return {
						$$typeof: n,
						type: e.type,
						key: a,
						ref: i,
						props: o,
						_owner: u,
					};
				}),
				(t.createContext = (e) => (
					((e = {
						$$typeof: c,
						_currentValue: e,
						_currentValue2: e,
						_threadCount: 0,
						Provider: null,
						Consumer: null,
						_defaultValue: null,
						_globalName: null,
					}).Provider = { $$typeof: u, _context: e }),
					(e.Consumer = e)
				)),
				(t.createElement = C),
				(t.createFactory = (e) => {
					const t = C.bind(null, e);
					return (t.type = e), t;
				}),
				(t.createRef = () => ({ current: null })),
				(t.forwardRef = (e) => ({ $$typeof: l, render: e })),
				(t.isValidElement = L),
				(t.lazy = (e) => ({
					$$typeof: d,
					_payload: { _status: -1, _result: e },
					_init: O,
				})),
				(t.memo = (e, t) => ({
					$$typeof: f,
					type: e,
					compare: void 0 === t ? null : t,
				})),
				(t.startTransition = (e) => {
					const t = P.transition;
					P.transition = {};
					try {
						e();
					} finally {
						P.transition = t;
					}
				}),
				(t.unstable_act = () => {
					throw Error(
						"act(...) is not supported in production builds of React.",
					);
				}),
				(t.useCallback = (e, t) => k.current.useCallback(e, t)),
				(t.useContext = (e) => k.current.useContext(e)),
				(t.useDebugValue = () => {}),
				(t.useDeferredValue = (e) => k.current.useDeferredValue(e)),
				(t.useEffect = (e, t) => k.current.useEffect(e, t)),
				(t.useId = () => k.current.useId()),
				(t.useImperativeHandle = (e, t, n) =>
					k.current.useImperativeHandle(e, t, n)),
				(t.useInsertionEffect = (e, t) => k.current.useInsertionEffect(e, t)),
				(t.useLayoutEffect = (e, t) => k.current.useLayoutEffect(e, t)),
				(t.useMemo = (e, t) => k.current.useMemo(e, t)),
				(t.useReducer = (e, t, n) => k.current.useReducer(e, t, n)),
				(t.useRef = (e) => k.current.useRef(e)),
				(t.useState = (e) => k.current.useState(e)),
				(t.useSyncExternalStore = (e, t, n) =>
					k.current.useSyncExternalStore(e, t, n)),
				(t.useTransition = () => k.current.useTransition()),
				(t.version = "18.2.0");
		},
		50959: (e, t, n) => {
			e.exports = n(95257);
		},
		44242: (e) => {
			e.exports = { title: "title-u3QJgF_p" };
		},
		81261: (e, t, n) => {
			n.d(t, {
				focusFirstMenuItem: () => l,
				handleAccessibleMenuFocus: () => u,
				handleAccessibleMenuKeyDown: () => c,
				queryMenuElements: () => d,
			});
			const r = n(16838);
			const o = n(71468);
			const a = n(68335);
			const i = [37, 39, 38, 40];
			function u(e, t) {
				e.target &&
					r.PLATFORM_ACCESSIBILITY_ENABLED &&
					e.relatedTarget === t.current &&
					l(e.target);
			}
			function c(e) {
				if (!r.PLATFORM_ACCESSIBILITY_ENABLED) return;
				if (e.defaultPrevented) return;
				const t = (0, a.hashFromEvent)(e);
				if (!i.includes(t)) return;
				const n = document.activeElement;
				if (!(document.activeElement instanceof HTMLElement)) return;
				const u = d(e.currentTarget).sort(r.navigationOrderComparator);
				if (0 === u.length) return;
				const c = document.activeElement.closest('[data-role="menuitem"]');
				if (!(c instanceof HTMLElement)) return;
				const l = u.indexOf(c);
				if (-1 === l) return;
				const m = p(c);
				const v = m.indexOf(document.activeElement);
				const y = -1 !== v;
				const h = (e) => {
						n && (0, o.becomeSecondaryElement)(n),
							(0, o.becomeMainElement)(e),
							e.focus();
					};
				switch (t) {
					case 37:
						if (!m.length) return;
						e.preventDefault(),
							h(0 === v ? u[l] : y ? s(m, v, -1) : m[m.length - 1]);
						break;
					case 39:
						if (!m.length) return;
						e.preventDefault(),
							v === m.length - 1 ? h(u[l]) : h(y ? s(m, v, 1) : m[0]);
						break;
					case 38: {
						e.preventDefault();
						const t = s(u, l, -1);
						if (y) {
							const e = f(t, v);
							h(e || t);
							break;
						}
						h(t);
						break;
					}
					case 40: {
						e.preventDefault();
						const t = s(u, l, 1);
						if (y) {
							const e = f(t, v);
							h(e || t);
							break;
						}
						h(t);
					}
				}
			}
			function l(e) {
				const [t] = d(e);
				t && ((0, o.becomeMainElement)(t), t.focus());
			}
			function s(e, t, n) {
				return e[(t + e.length + n) % e.length];
			}
			function f(e, t) {
				const n = p(e);
				return n.length ? n[(t + n.length) % n.length] : null;
			}
			function d(e) {
				return Array.from(
					e.querySelectorAll(
						'[data-role="menuitem"]:not([disabled], [aria-disabled])',
					),
				).filter((0, r.createScopedVisibleElementFilter)(e));
			}
			function p(e) {
				return Array.from(
					e.querySelectorAll("[tabindex]:not([disabled], [aria-disabled])"),
				).filter((0, r.createScopedVisibleElementFilter)(e));
			}
		},
		36898: (e, t, n) => {
			n.d(t, { useMouseClickAutoBlur: () => i });
			const r = n(50959);
			const o = n(76460);
			const a = n(16838);
			function i(e, t = !0) {
				(0, r.useEffect)(() => {
					if (!a.PLATFORM_ACCESSIBILITY_ENABLED || !t) return;
					const n = (t) => {
						const n = e.current;
						null !== n &&
							document.activeElement instanceof HTMLElement &&
							((0, o.isKeyboardClick)(t) ||
								(n.contains(document.activeElement) &&
									"INPUT" !== document.activeElement.tagName &&
									document.activeElement.blur()));
					};
					return (
						window.addEventListener("click", n, !0),
						() => window.removeEventListener("click", n, !0)
					);
				}, [t]);
			}
		},
		82962: (e, t, n) => {
			n.d(t, { ToolWidgetMenuSummary: () => i });
			const r = n(50959);
			const o = n(97754);
			const a = n(44242);
			function i(e) {
				return r.createElement(
					"div",
					{ className: o(e.className, a.title) },
					e.children,
				);
			}
		},
		88066: (e, t, n) => {
			n.d(t, { DEFAULT_TOOLBAR_BUTTON_THEME: () => u, ToolbarButton: () => c });
			const r = n(50959);
			const o = n(31409);
			const a = n(50238);
			const i = n(16838);
			const u = o.DEFAULT_TOOL_WIDGET_BUTTON_THEME;
			const c = (0, r.forwardRef)((e, t) => {
					const { tooltip: n, ...u } = e;
					const [c, l] = (0, a.useRovingTabindexElement)(t);
					return r.createElement(o.ToolWidgetButton, {
						"aria-label": i.PLATFORM_ACCESSIBILITY_ENABLED ? n : void 0,
						...u,
						tag: i.PLATFORM_ACCESSIBILITY_ENABLED ? "button" : "div",
						ref: c,
						tabIndex: l,
						"data-tooltip": n,
					});
				});
		},
		48889: (e, t, n) => {
			n.d(t, { ToolbarIconButton: () => u });
			const r = n(50959);
			const o = n(50238);
			const a = n(16838);
			const i = n(50813);
			const u = (0, r.forwardRef)((e, t) => {
				const { tooltip: n, ...u } = e;
				const [c, l] = (0, o.useRovingTabindexElement)(t);
				return r.createElement(i.ToolWidgetIconButton, {
					"aria-label": a.PLATFORM_ACCESSIBILITY_ENABLED ? n : void 0,
					...u,
					tag: a.PLATFORM_ACCESSIBILITY_ENABLED ? "button" : "div",
					ref: c,
					tabIndex: l,
					"data-tooltip": n,
				});
			});
		},
		50298: (e, t, n) => {
			n.d(t, { ToolbarMenuButton: () => s });
			const r = n(50959);
			const o = n(39416);
			const a = n(8087);
			const i = n(50238);
			const u = n(16838);
			const c = n(36898);
			const l = n(81261);
			const s = (0, r.forwardRef)((e, t) => {
				const { tooltip: n, menuReference: s = null, ...f } = e;
				const [d, p] = (0, i.useRovingTabindexElement)(null);
				const m = (0, o.useFunctionalRefObject)(s);
				return (
					(0, c.useMouseClickAutoBlur)(m),
					r.createElement(a.ToolWidgetMenu, {
						"aria-label": u.PLATFORM_ACCESSIBILITY_ENABLED ? n : void 0,
						...f,
						ref: t,
						tag: u.PLATFORM_ACCESSIBILITY_ENABLED ? "button" : "div",
						reference: d,
						tabIndex: p,
						"data-tooltip": n,
						menuReference: m,
						onMenuKeyDown: l.handleAccessibleMenuKeyDown,
						onMenuFocus: (e) => (0, l.handleAccessibleMenuFocus)(e, d),
					})
				);
			});
		},
		5962: (e, t, n) => {
			n.d(t, {
				RegistryProvider: () => c,
				registryContextType: () => l,
				validateRegistry: () => u,
			});
			const r = n(50959);
			const o = n(19036);
			const a = n.n(o);
			const i = r.createContext({});
			function u(e, t) {
				a().checkPropTypes(t, e, "context", "RegistryContext");
			}
			function c(e) {
				const { validation: t, value: n } = e;
				return u(n, t), r.createElement(i.Provider, { value: n }, e.children);
			}
			function l() {
				return i;
			}
		},
	},
]);
