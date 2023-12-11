(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[8020],
	{
		27267: (t, e, r) => {
			function n(t, e, r, n, o) {
				function i(o) {
					if (t > o.timeStamp) return;
					const i = o.target;
					void 0 !== r &&
						null !== e &&
						null !== i &&
						i.ownerDocument === n &&
						(e.contains(i) || r(o));
				}
				return (
					o.click && n.addEventListener("click", i, !1),
					o.mouseDown && n.addEventListener("mousedown", i, !1),
					o.touchEnd && n.addEventListener("touchend", i, !1),
					o.touchStart && n.addEventListener("touchstart", i, !1),
					() => {
						n.removeEventListener("click", i, !1),
							n.removeEventListener("mousedown", i, !1),
							n.removeEventListener("touchend", i, !1),
							n.removeEventListener("touchstart", i, !1);
					}
				);
			}
			r.d(e, { addOutsideEventListener: () => n });
		},
		36383: (t, e, r) => {
			r.d(e, { useOutsideEvent: () => i });
			const n = r(50959);
			const o = r(27267);
			function i(t) {
				const {
						click: e,
						mouseDown: r,
						touchEnd: i,
						touchStart: u,
						handler: s,
						reference: c,
						ownerDocument: a = document,
					} = t;
				const l = (0, n.useRef)(null);
				const f = (0, n.useRef)(new CustomEvent("timestamp").timeStamp);
				return (
					(0, n.useLayoutEffect)(() => {
						const t = { click: e, mouseDown: r, touchEnd: i, touchStart: u };
						const n = c ? c.current : l.current;
						return (0, o.addOutsideEventListener)(f.current, n, s, a, t);
					}, [e, r, i, u, s]),
					c || l
				);
			}
		},
		95257: (t, e) => {
			const r = Symbol.for("react.element");
			const n = Symbol.for("react.portal");
			const o = Symbol.for("react.fragment");
			const i = Symbol.for("react.strict_mode");
			const u = Symbol.for("react.profiler");
			const s = Symbol.for("react.provider");
			let c = Symbol.for("react.context");
			let a = Symbol.for("react.forward_ref");
			let l = Symbol.for("react.suspense");
			const f = Symbol.for("react.memo");
			const d = Symbol.for("react.lazy");
			const p = Symbol.iterator;
			const h = {
					isMounted: () => !1,
					enqueueForceUpdate: () => {},
					enqueueReplaceState: () => {},
					enqueueSetState: () => {},
				};
			const m = Object.assign;
			const _ = {};
			function y(t, e, r) {
				(this.props = t),
					(this.context = e),
					(this.refs = _),
					(this.updater = r || h);
			}
			function v() {}
			function w(t, e, r) {
				(this.props = t),
					(this.context = e),
					(this.refs = _),
					(this.updater = r || h);
			}
			(y.prototype.isReactComponent = {}),
				(y.prototype.setState = function (t, e) {
					if ("object" !== typeof t && "function" !== typeof t && null != t)
						throw Error(
							"setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
						);
					this.updater.enqueueSetState(this, t, e, "setState");
				}),
				(y.prototype.forceUpdate = function (t) {
					this.updater.enqueueForceUpdate(this, t, "forceUpdate");
				}),
				(v.prototype = y.prototype);
			const E = (w.prototype = new v());
			(E.constructor = w), m(E, y.prototype), (E.isPureReactComponent = !0);
			const C = Array.isArray;
			const b = Object.prototype.hasOwnProperty;
			const S = { current: null };
			const I = { key: !0, ref: !0, __self: !0, __source: !0 };
			function k(t, e, n) {
				let o;
				const i = {};
				let u = null;
				let s = null;
				if (null != e)
					for (o in (void 0 !== e.ref && (s = e.ref),
					void 0 !== e.key && (u = `${e.key}`),
					e))
						b.call(e, o) && !I.hasOwnProperty(o) && (i[o] = e[o]);
				let c = arguments.length - 2;
				if (1 === c) i.children = n;
				else if (1 < c) {
					for (let a = Array(c), l = 0; l < c; l++) a[l] = arguments[l + 2];
					i.children = a;
				}
				if (t?.defaultProps)
					for (o in (c = t.defaultProps)) void 0 === i[o] && (i[o] = c[o]);
				return {
					$$typeof: r,
					type: t,
					key: u,
					ref: s,
					props: i,
					_owner: S.current,
				};
			}
			function g(t) {
				return "object" === typeof t && null !== t && t.$$typeof === r;
			}
			const T = /\/+/g;
			function L(t, e) {
				return "object" === typeof t && null !== t && null != t.key
					? ((t) => {
							const e = { "=": "=0", ":": "=2" };
							return `$${t.replace(/[=:]/g, (t) => e[t])}`;
					  })(`${t.key}`)
					: e.toString(36);
			}
			function R(t, e, o, i, u) {
				let s = typeof t;
				("undefined" !== s && "boolean" !== s) || (t = null);
				let c = !1;
				if (null === t) c = !0;
				else
					switch (s) {
						case "string":
						case "number":
							c = !0;
							break;
						case "object":
							switch (t.$$typeof) {
								case r:
								case n:
									c = !0;
							}
					}
				if (c)
					return (
						(u = u((c = t))),
						(t = "" === i ? `.${L(c, 0)}` : i),
						C(u)
							? ((o = ""),
							  null != t && (o = `${t.replace(T, "$&/")}/`),
							  R(u, e, o, "", (t) => t))
							: null != u &&
							  (g(u) &&
									(u = ((t, e) => ({
										$$typeof: r,
										type: t.type,
										key: e,
										ref: t.ref,
										props: t.props,
										_owner: t._owner,
									}))(
										u,
										o +
											(!u.key || (c && c.key === u.key)
												? ""
												: `${(`${u.key}`).replace(T, "$&/")}/`) +
											t,
									)),
							  e.push(u)),
						1
					);
				if (((c = 0), (i = "" === i ? "." : `${i}:`), C(t)))
					for (let a = 0; a < t.length; a++) {
						const l = i + L((s = t[a]), a);
						c += R(s, e, o, l, u);
					}
				else if (
					((l = ((t) =>
						null === t || "object" !== typeof t
							? null
							: "function" === typeof (t = (p && t[p]) || t["@@iterator"])
							  ? t
							  : null)(t)),
					"function" === typeof l)
				)
					for (t = l.call(t), a = 0; !(s = t.next()).done; )
						c += R((s = s.value), e, o, (l = i + L(s, a++)), u);
				else if ("object" === s)
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
			function $(t, e, r) {
				if (null == t) return t;
				const n = [];
				let o = 0;
				return R(t, n, "", "", (t) => e.call(r, t, o++)), n;
			}
			function x(t) {
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
			const A = { current: null };
			const O = { transition: null };
			const j = {
					ReactCurrentDispatcher: A,
					ReactCurrentBatchConfig: O,
					ReactCurrentOwner: S,
				};
			(e.Children = {
				map: $,
				forEach: (t, e, r) => {
					$(
						t,
						function () {
							e.apply(this, arguments);
						},
						r,
					);
				},
				count: (t) => {
					let e = 0;
					return (
						$(t, () => {
							e++;
						}),
						e
					);
				},
				toArray: (t) => $(t, (t) => t) || [],
				only: (t) => {
					if (!g(t))
						throw Error(
							"React.Children.only expected to receive a single React element child.",
						);
					return t;
				},
			}),
				(e.Component = y),
				(e.Fragment = o),
				(e.Profiler = u),
				(e.PureComponent = w),
				(e.StrictMode = i),
				(e.Suspense = l),
				(e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = j),
				(e.cloneElement = (t, e, n) => {
					if (null == t)
						throw Error(
							`React.cloneElement(...): The argument must be a React element, but you passed ${t}.`,
						);
					const o = m({}, t.props);
					let i = t.key;
					let u = t.ref;
					let s = t._owner;
					if (null != e) {
						if (
							(void 0 !== e.ref && ((u = e.ref), (s = S.current)),
							void 0 !== e.key && (i = `${e.key}`),
							t.type?.defaultProps)
						)
							const c = t.type.defaultProps;
						for (a in e)
							b.call(e, a) &&
								!I.hasOwnProperty(a) &&
								(o[a] = void 0 === e[a] && void 0 !== c ? c[a] : e[a]);
					}
					const a = arguments.length - 2;
					if (1 === a) o.children = n;
					else if (1 < a) {
						c = Array(a);
						for (let l = 0; l < a; l++) c[l] = arguments[l + 2];
						o.children = c;
					}
					return {
						$$typeof: r,
						type: t.type,
						key: i,
						ref: u,
						props: o,
						_owner: s,
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
					}).Provider = { $$typeof: s, _context: t }),
					(t.Consumer = t)
				)),
				(e.createElement = k),
				(e.createFactory = (t) => {
					const e = k.bind(null, t);
					return (e.type = t), e;
				}),
				(e.createRef = () => ({ current: null })),
				(e.forwardRef = (t) => ({ $$typeof: a, render: t })),
				(e.isValidElement = g),
				(e.lazy = (t) => ({
					$$typeof: d,
					_payload: { _status: -1, _result: t },
					_init: x,
				})),
				(e.memo = (t, e) => ({
					$$typeof: f,
					type: t,
					compare: void 0 === e ? null : e,
				})),
				(e.startTransition = (t) => {
					const e = O.transition;
					O.transition = {};
					try {
						t();
					} finally {
						O.transition = e;
					}
				}),
				(e.unstable_act = () => {
					throw Error(
						"act(...) is not supported in production builds of React.",
					);
				}),
				(e.useCallback = (t, e) => A.current.useCallback(t, e)),
				(e.useContext = (t) => A.current.useContext(t)),
				(e.useDebugValue = () => {}),
				(e.useDeferredValue = (t) => A.current.useDeferredValue(t)),
				(e.useEffect = (t, e) => A.current.useEffect(t, e)),
				(e.useId = () => A.current.useId()),
				(e.useImperativeHandle = (t, e, r) =>
					A.current.useImperativeHandle(t, e, r)),
				(e.useInsertionEffect = (t, e) => A.current.useInsertionEffect(t, e)),
				(e.useLayoutEffect = (t, e) => A.current.useLayoutEffect(t, e)),
				(e.useMemo = (t, e) => A.current.useMemo(t, e)),
				(e.useReducer = (t, e, r) => A.current.useReducer(t, e, r)),
				(e.useRef = (t) => A.current.useRef(t)),
				(e.useState = (t) => A.current.useState(t)),
				(e.useSyncExternalStore = (t, e, r) =>
					A.current.useSyncExternalStore(t, e, r)),
				(e.useTransition = () => A.current.useTransition()),
				(e.version = "18.2.0");
		},
		50959: (t, e, r) => {
			t.exports = r(95257);
		},
		46315: (t) => {
			t.exports = {
				css_value_arrow_size: "13",
				tooltip: "tooltip-eSLcXvvL",
				show: "show-eSLcXvvL",
				right: "right-eSLcXvvL",
			};
		},
		49844: (t) => {
			t.exports = { text: "text-hF57_4zZ" };
		},
		5972: (t, e, r) => {
			r.r(e), r.d(e, { TooltipRenderer: () => c });
			const n = r(50959);
			const o = r(962);
			const i = r(36383);
			const u = r(46315);
			const s = parseInt(u.css_value_arrow_size);
			class c {
				constructor(t) {
					(this._container = null),
						(this._props = null),
						(this._deferredActions = { hideItemTime: 0 }),
						(this._updatePosition = () => {
							if (null === this._props || null === this._container) return;
							const { width: t, height: e } =
									this._tooltipContainer.getBoundingClientRect();
							const r = this._container.getBoundingClientRect();
							const n = Math.round(this._props.itemSize / 2);
							const o = Math.min(8, n);
							let i = !1;
							let c = this._props.x - t - n - s - o;
							c < 0 && ((c = this._props.x + n + s + o), (i = !0));
							const a = r.height;
							let l = Math.max(0, this._props.y - e / 2);
							l > 0 && (l = Math.min(l, a - e)),
								this._tooltipContainer.classList.toggle(u.right, i),
								(this._tooltipContainer.style.top = `${l}px`),
								(this._tooltipContainer.style.left = `${c}px`);
						}),
						(this._tooltipFactory = t),
						(this._tooltipContainer = document.createElement("div")),
						this._tooltipContainer.classList.add(u.tooltip);
				}
				destroy() {
					this._unmountComponent();
				}
				contains(t) {
					return this._tooltipContainer.contains(t);
				}
				hide(t) {
					(this._deferredActions.hideItemTime = performance.now()),
						this._clearTimeouts(),
						t
							? this._tooltipContainer.classList.remove(u.show)
							: (this._deferredActions.hideItemTimerId = setTimeout(() => {
									this._tooltipContainer.classList.remove(u.show);
							  }, 100));
				}
				show(t) {
					this._clearTimeouts(),
						performance.now() < this._deferredActions.hideItemTime + 100
							? this._showImpl(t)
							: (this._deferredActions.showItemTimerId = setTimeout(
									() => this._showImpl(t),
									400,
							  ));
				}
				_showImpl(t) {
					(this._props = t),
						this._render(t),
						this._clearTimeouts(),
						this._tooltipContainer.classList.add(u.show);
				}
				_render(t) {
					const e = t.container;
					this._container !== e &&
						(this._unmountComponent(),
						(this._container = e),
						this._container.appendChild(this._tooltipContainer)),
						o.render(
							n.createElement(a, {
								handler: t.onClickOutside,
								child: n.createElement(this._tooltipFactory, t.factoryProps),
							}),
							this._tooltipContainer,
							this._updatePosition,
						);
				}
				_unmountComponent() {
					null !== this._container &&
						(o.unmountComponentAtNode(this._tooltipContainer),
						this._tooltipContainer.remove(),
						(this._container = null),
						this._clearTimeouts());
				}
				_clearTimeouts() {
					void 0 !== this._deferredActions.showItemTimerId &&
						(clearTimeout(this._deferredActions.showItemTimerId),
						(this._deferredActions.showItemTimerId = void 0)),
						void 0 !== this._deferredActions.hideItemTimerId &&
							(clearTimeout(this._deferredActions.hideItemTimerId),
							(this._deferredActions.hideItemTimerId = void 0));
				}
			}
			function a(t) {
				const { handler: e, child: r } = t;
				const o = (0, i.useOutsideEvent)({
						mouseDown: !0,
						touchStart: !0,
						handler: e,
					});
				return n.createElement("div", { ref: o }, r);
			}
		},
		48080: (t, e, r) => {
			r.r(e), r.d(e, { UserDefinedBarsMarksTooltip: () => i });
			const n = r(50959);
			const o = r(49844);
			function i(t) {
				const { text: e } = t;
				return n.createElement("div", { className: o.text }, e);
			}
		},
	},
]);
