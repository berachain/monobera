(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[7260],
	{
		22436: (e) => {
			e.exports = {
				item: "item-GJX1EXhk",
				interactive: "interactive-GJX1EXhk",
				hovered: "hovered-GJX1EXhk",
				disabled: "disabled-GJX1EXhk",
				active: "active-GJX1EXhk",
				shortcut: "shortcut-GJX1EXhk",
				normal: "normal-GJX1EXhk",
				big: "big-GJX1EXhk",
				iconCell: "iconCell-GJX1EXhk",
				icon: "icon-GJX1EXhk",
				checkmark: "checkmark-GJX1EXhk",
				content: "content-GJX1EXhk",
				label: "label-GJX1EXhk",
				checked: "checked-GJX1EXhk",
				toolbox: "toolbox-GJX1EXhk",
				showToolboxOnHover: "showToolboxOnHover-GJX1EXhk",
				arrowIcon: "arrowIcon-GJX1EXhk",
				subMenu: "subMenu-GJX1EXhk",
				invisibleHotkey: "invisibleHotkey-GJX1EXhk",
			};
		},
		29122: (e) => {
			e.exports = {
				item: "item-WJDah4zD",
				emptyIcons: "emptyIcons-WJDah4zD",
				loading: "loading-WJDah4zD",
				disabled: "disabled-WJDah4zD",
				interactive: "interactive-WJDah4zD",
				hovered: "hovered-WJDah4zD",
				normal: "normal-WJDah4zD",
				big: "big-WJDah4zD",
				icon: "icon-WJDah4zD",
				label: "label-WJDah4zD",
				title: "title-WJDah4zD",
				nested: "nested-WJDah4zD",
				shortcut: "shortcut-WJDah4zD",
				remove: "remove-WJDah4zD",
			};
		},
		45719: (e) => {
			e.exports = { separator: "separator-Pf4rIzEt" };
		},
		4618: (e) => {
			e.exports = {
				tabs: "tabs-NGf0gcnH",
				tab: "tab-NGf0gcnH",
				noBorder: "noBorder-NGf0gcnH",
				disabled: "disabled-NGf0gcnH",
				active: "active-NGf0gcnH",
				defaultCursor: "defaultCursor-NGf0gcnH",
				slider: "slider-NGf0gcnH",
				content: "content-NGf0gcnH",
			};
		},
		42142: (e, t, s) => {
			s.d(t, { FragmentMap: () => a });
			const r = s(50959);
			function a(e) {
				if (e.map) {
					return r.Children.toArray(e.children).map(e.map);
				}
				return e.children;
			}
		},
		99025: (e, t, s) => {
			s.d(t, { Hint: () => o });
			const r = s(50959);
			const a = s(97754);
			const n = s.n(a);
			const i = s(22436);
			function o(e) {
				const { text: t = "", className: s } = e;
				return r.createElement("span", { className: n()(i.shortcut, s) }, t);
			}
		},
		23829: (e, t, s) => {
			s.d(t, { ContextMenuItem: () => p });
			const r = s(50959);
			const a = s(97754);
			const n = s.n(a);
			const i = s(9745);
			const o = s(26996);
			const l = s(54627);
			const c = s(99025);
			const d = s(39750);
			const h = s(79978);
			const u = s(69311);
			const m = s(29122);
			function p(e) {
				const {
					className: t,
					isTitle: s,
					isLoading: a,
					isHovered: p,
					active: g,
					checkable: v,
					disabled: _,
					checked: b,
					icon: y,
					iconChecked: f,
					hint: S,
					subItems: k,
					label: x,
					onClick: C,
					children: E,
					toolbox: M,
					jsxLabel: T,
					size: z = "normal",
				} = e;
				const A = (0, r.useContext)(l.EmptyIconsContext);
				const w = !!k.length;
				return a
					? r.createElement(
							"li",
							{ className: n()(t, m.item, m.loading, m[z]) },
							r.createElement(o.Loader, null),
					  )
					: r.createElement(
							"li",
							{
								className: n()(
									t,
									m.item,
									m.interactive,
									s && m.title,
									_ && m.disabled,
									p && m.hovered,
									g && m.active,
									A && m.emptyIcons,
									m[z],
								),
								onClick: C,
							},
							r.createElement(i.Icon, {
								className: n()(m.icon),
								icon: (() => {
									if (v && b) return f || y || d;
									return y;
								})(),
							}),
							r.createElement(
								"span",
								{ className: n()(m.label) },
								null != T ? T : x,
							),
							!!M &&
								r.createElement(i.Icon, {
									onClick: () => {
										M?.action();
									},
									className: m.remove,
									icon: u,
								}),
							!w &&
								S &&
								r.createElement(c.Hint, { className: m.shortcut, text: S }),
							w && r.createElement(i.Icon, { className: m.nested, icon: h }),
							E,
					  );
			}
		},
		54627: (e, t, s) => {
			s.d(t, { EmptyIconsContext: () => r });
			const r = s(50959).createContext(!1);
		},
		1109: (e, t, s) => {
			s.d(t, { Separator: () => i });
			const r = s(50959);
			const a = s(97754);
			const n = s(45719);
			function i(e) {
				return r.createElement("div", {
					className: a(n.separator, e.className),
				});
			}
		},
		64264: (e) => {
			e.exports = {
				toolbar: "toolbar-BXXUwft2",
				dateRangeWrapper: "dateRangeWrapper-BXXUwft2",
				seriesControlWrapper: "seriesControlWrapper-BXXUwft2",
				dateRangeExpanded: "dateRangeExpanded-BXXUwft2",
				dateRangeCollapsed: "dateRangeCollapsed-BXXUwft2",
				item: "item-BXXUwft2",
				last: "last-BXXUwft2",
				inline: "inline-BXXUwft2",
				dateRange: "dateRange-BXXUwft2",
				hidden: "hidden-BXXUwft2",
				collapsed: "collapsed-BXXUwft2",
			};
		},
		7458: (e) => {
			e.exports = { button: "button-Hfju7pW_" };
		},
		50242: (e) => {
			e.exports = { button: "button-uToIfRbZ" };
		},
		56812: (e) => {
			e.exports = { separator: "separator-yDfG9Ccu" };
		},
		97086: (e) => {
			e.exports = { headerMenuText: "headerMenuText-AcJrLng7" };
		},
		85616: (e) => {
			e.exports = {
				button: "button-x1dCOTP3",
				disabled: "disabled-x1dCOTP3",
				hover: "hover-x1dCOTP3",
				accessible: "accessible-x1dCOTP3",
			};
		},
		91348: (e) => {
			e.exports = { item: "item-SqYYy1zF" };
		},
		22586: (e) => {
			e.exports = { slider: "slider-3kCW6DWs", inner: "inner-3kCW6DWs" };
		},
		21648: (e) => {
			e.exports = { sliderRow: "sliderRow-k2h4OAz8" };
		},
		54079: (e, t, s) => {
			s.d(t, { Toolbar: () => h });
			const r = s(50959);
			const a = s(50151);
			const n = s(47201);
			const i = s(3343);
			const o = s(16838);
			const l = s(71468);
			const c = s(39416);
			const d = s(36898);
			const h = (0, r.forwardRef)((e, t) => {
				const {
					onKeyDown: s,
					orientation: h,
					blurOnEscKeydown: u = !0,
					blurOnClick: m = !0,
					...p
				} = e;
				const g = o.PLATFORM_ACCESSIBILITY_ENABLED
					? { role: "toolbar", "aria-orientation": h }
					: {};
				const v = (0, c.useFunctionalRefObject)(t);
				return (
					(0, r.useLayoutEffect)(() => {
						if (!o.PLATFORM_ACCESSIBILITY_ENABLED) return;
						const e = (0, a.ensureNotNull)(v.current);
						const t = () => {
							const t = (0, o.queryTabbableElements)(e).sort(
								o.navigationOrderComparator,
							);
							if (0 === t.length) {
								const [t] = (0, o.queryFocusableElements)(e).sort(
									o.navigationOrderComparator,
								);
								if (void 0 === t) return;
								(0, l.becomeMainElement)(t);
							}
							if (t.length > 1) {
								const [, ...e] = t;
								for (const t of e) (0, l.becomeSecondaryElement)(t);
							}
						};
						return (
							window.addEventListener("keyboard-navigation-activation", t),
							() =>
								window.removeEventListener("keyboard-navigation-activation", t)
						);
					}, []),
					(0, d.useMouseClickAutoBlur)(v, m),
					r.createElement("div", {
						...p,
						...g,
						ref: v,
						onKeyDown: (0, n.createSafeMulticastEventHandler)((e) => {
							if (!o.PLATFORM_ACCESSIBILITY_ENABLED) return;
							if (e.defaultPrevented) return;
							if (!(document.activeElement instanceof HTMLElement)) return;
							const t = (0, i.hashFromEvent)(e);
							if (27 === t)
								return e.preventDefault(), void document.activeElement.blur();
							if ("vertical" !== h && 37 !== t && 39 !== t) return;
							if ("vertical" === h && 38 !== t && 40 !== t) return;
							const s = e.currentTarget;
							const r = (0, o.queryFocusableElements)(s).sort(
								o.navigationOrderComparator,
							);
							if (0 === r.length) return;
							const a = r.indexOf(document.activeElement);
							if (-1 === a) return;
							e.preventDefault();
							const n = () => {
								const e = (a + r.length - 1) % r.length;
								(0, l.becomeSecondaryElement)(r[a]),
									(0, l.becomeMainElement)(r[e]),
									r[e].focus();
							};
							const c = () => {
								const e = (a + r.length + 1) % r.length;
								(0, l.becomeSecondaryElement)(r[a]),
									(0, l.becomeMainElement)(r[e]),
									r[e].focus();
							};
							switch (t) {
								case 37:
									"vertical" !== h && n();
									break;
								case 39:
									"vertical" !== h && c();
									break;
								case 38:
									"vertical" === h && n();
									break;
								case 40:
									"vertical" === h && c();
							}
						}, s),
					})
				);
			});
		},
		33279: (e, t, s) => {
			s.r(t), s.d(t, { BottomToolbarRenderer: () => pt });
			const r = s(50959);
			let a = s(962);
			const n = s(44352);
			let i = s(19036);
			let o = s(97754);
			const l = s.n(o);
			const c = s(14483);
			const d = s(50298);
			const h = s(12811);
			const u = s(59064);
			const m = s(90692);
			const p = s(16396);
			const g = s(51613);
			const v = s(50151);
			const _ = s(51768);
			const b = s(5962);
			const y = s(57898);
			const f = s(36274);
			const S = (e) =>
				n.t(
					null,
					{ plural: "{str} minutes", count: e, replace: { str: `${e}` } },
					s(60144),
				);
			const k = (e) =>
				n.t(
					null,
					{ plural: "{str} hours", count: e, replace: { str: `${e}` } },
					s(17174),
				);
			const x = (e) =>
				n.t(
					null,
					{ plural: "{str} months", count: e, replace: { str: `${e}` } },
					s(28039),
				);
			const C = {
				1: { resolution: "1", text: S(1) },
				3: { resolution: "3", text: S(3) },
				5: { resolution: "5", text: S(5) },
				15: { resolution: "15", text: S(15) },
				30: { resolution: "30", text: S(30) },
				45: { resolution: "45", text: S(45) },
				60: { resolution: "60", text: k(1) },
				120: { resolution: "120", text: k(2) },
				180: { resolution: "180", text: k(3) },
				240: { resolution: "240", text: k(4) },
				"1D": {
					resolution: "1D",
					text:
						((T = 1),
						n.t(
							null,
							{ plural: "{str} days", count: T, replace: { str: `${T}` } },
							s(74262),
						)),
				},
				"1W": {
					resolution: "1W",
					text:
						((M = 1),
						n.t(
							null,
							{ plural: "{str} weeks", count: M, replace: { str: `${M}` } },
							s(14074),
						)),
				},
				"1M": { resolution: "1M", text: x(1) },
				"3M": { resolution: "3M", text: x(3) },
				"6M": { resolution: "6M", text: x(6) },
				"12M": {
					resolution: "12M",
					text:
						((E = 1),
						n.t(
							null,
							{ plural: "{str} years", count: E, replace: { str: `${E}` } },
							s(8222),
						)),
				},
			};
			let E;
			let M;
			let T;
			function z(e) {
				const t = ((e) => {
					const t = e.value.value;
					const r = f.Interval.parse(t);
					if (!r.isValid()) {
						if ("YTD" === t)
							return n.t(null, { context: "timeframe_title" }, s(87556));
						if ("ALL" === t)
							return n.t(null, { context: "timeframe_title" }, s(74944));
						if ("LASTSESSION" === t) return A(1);
					}
					if (r.isMinutes()) {
						const e = r.multiplier();
						return e % 60 !== 0
							? ((i = e),
							  n.t(
									null,
									{
										plural: "{str} minutes",
										count: i,
										replace: { str: `${i}` },
										context: "timeframe_title",
									},
									s(44795),
							  ))
							: ((a = e / 60),
							  n.t(
									null,
									{
										plural: "{str} hours",
										count: a,
										replace: { str: `${a}` },
										context: "timeframe_title",
									},
									s(89020),
							  ));
					}
					let a;
					let i;
					if (r.isDays()) return A(r.multiplier());
					if (r.isWeeks())
						return ((e) =>
							n.t(
								null,
								{
									plural: "{str} weeks",
									count: e,
									replace: { str: `${e}` },
									context: "timeframe_title",
								},
								s(67518),
							))(r.multiplier());
					if (r.isMonths()) {
						const e = r.multiplier();
						return e % 12 !== 0
							? ((o = e),
							  n.t(
									null,
									{
										plural: "{str} months",
										count: o,
										replace: { str: `${o}` },
										context: "timeframe_title",
									},
									s(3189),
							  ))
							: ((e) =>
									n.t(
										null,
										{
											plural: "{str} years",
											count: e,
											replace: { str: `${e}` },
											context: "timeframe_title",
										},
										s(6598),
									))(e / 12);
					}
					let o;
					return e.description || e.text;
				})(e);
				const r = ((e) => {
					const t = e.targetResolution;
					const r = f.Interval.parse(t);
					if (r.isMinutes()) {
						const e = r.multiplier();
						return e % 60 !== 0
							? ((i = e),
							  n.t(
									null,
									{
										plural: "{str} minutes intervals",
										count: i,
										replace: { str: `${i}` },
										context: "timeframe_title",
									},
									s(56347),
							  ))
							: ((a = e / 60),
							  n.t(
									null,
									{
										plural: "{str} hours intervals",
										count: a,
										replace: { str: `${a}` },
										context: "timeframe_title",
									},
									s(54028),
							  ));
					}
					let a;
					let i;
					if (r.isDays())
						return ((e) =>
							n.t(
								null,
								{
									plural: "{str} days intervals",
									count: e,
									replace: { str: `${e}` },
									context: "timeframe_title",
								},
								s(81693),
							))(r.multiplier());
					if (r.isWeeks())
						return ((e) =>
							n.t(
								null,
								{
									plural: "{str} weeks intervals",
									count: e,
									replace: { str: `${e}` },
									context: "timeframe_title",
								},
								s(58667),
							))(r.multiplier());
					if (r.isMonths()) {
						const e = r.multiplier();
						return e % 12 !== 0
							? ((o = e),
							  n.t(
									null,
									{
										plural: "{str} months intervals",
										count: o,
										replace: { str: `${o}` },
										context: "timeframe_title",
									},
									s(99773),
							  ))
							: ((e) =>
									n.t(
										null,
										{
											plural: "{str} years intervals",
											count: e,
											replace: { str: `${e}` },
											context: "timeframe_title",
										},
										s(57849),
									))(e / 12);
					}
					let o;
					return C[t].text;
				})(e);
				return n.t(
					null,
					{
						replace: { timePeriod: t, timeInterval: r },
						context: "timeframe_title",
					},
					s(29505),
				);
			}
			const A = (e) =>
				n.t(
					null,
					{
						plural: "{str} days",
						count: e,
						replace: { str: `${e}` },
						context: "timeframe_title",
					},
					s(42908),
				);
			class w {
				constructor(e) {
					(this._state = { ranges: [] }),
						(this._change = new y.Delegate()),
						(this._rangeChangedListenerBound = this._onRangeChanged.bind(this));
					const { chartWidget: t } = (this._context = e);
					t.withModel(null, () => {
						const e = t.model();
						const s = e.mainSeries();
						s.onStatusChanged().subscribe(this, this._updateAvailableRanges),
							c.enabled("update_timeframes_set_on_symbol_resolve") &&
								s
									.dataEvents()
									.symbolResolved()
									.subscribe(this, this._updateAvailableRanges),
							s
								.priceScale()
								.properties()
								.childs()
								.lockScale.subscribe(this, this._updateAvailableRanges);
						const r = e.model().appliedTimeFrame();
						r.subscribe(this._rangeChangedListenerBound),
							this._rangeChangedListenerBound(r.value()),
							this._updateAvailableRanges();
					});
				}
				state() {
					return this._state;
				}
				onChange() {
					return this._change;
				}
				selectRange(e) {
					this._setState({ activeRange: e.value.value });
					const { chartWidgetCollection: t } = this._context;
					const s = { val: e.value, res: e.targetResolution };
					t.setTimeFrame(s);
				}
				destroy() {
					const { chartWidget: e } = this._context;
					e.withModel(null, () => {
						const t = e.model();
						const s = t.mainSeries();
						s.onStatusChanged().unsubscribe(this, this._updateAvailableRanges),
							c.enabled("update_timeframes_set_on_symbol_resolve") &&
								s
									.dataEvents()
									.symbolResolved()
									.unsubscribe(this, this._updateAvailableRanges),
							s
								.priceScale()
								.properties()
								.childs()
								.lockScale.unsubscribe(this, this._updateAvailableRanges),
							t
								.model()
								.appliedTimeFrame()
								.unsubscribe(this._rangeChangedListenerBound);
					}),
						this._change.destroy();
				}
				_setState(e) {
					(this._state = Object.assign({}, this._state, e)),
						this._change.fire(this._state);
				}
				_onRangeChanged(e) {
					let t;
					null !== e && "period-back" === e.val.type && (t = e.val.value),
						this._setState({ activeRange: t });
				}
				_updateAvailableRanges() {
					const { availableTimeFrames: e, chartWidget: t } = this._context;
					if (!t.hasModel()) return;
					const s = t.model().mainSeries();
					const r = s.status();
					if (2 === r || 1 === r) return;
					const a = e(s.symbolInfo(), s.status()).map((e) => ({
						...e,
						description: z(e),
					}));
					0 !== a.length && this._setState({ ranges: a });
				}
			}
			const D = (0, b.registryContextType)();
			function I(e) {
				let t;
				return (
					((t = class extends r.PureComponent {
						constructor(e, t) {
							super(e, t),
								(this._handleUpdate = (e) => {
									this.setState(e);
								}),
								(this._handleSelectRange = (e) => {
									let t;
									let s;
									(0, _.trackEvent)(
										"GUI",
										"Chart Bottom Toolbar",
										`range ${e.value}`,
									),
										null === (s = (t = this.props).onSelectRange) ||
											void 0 === s ||
											s.call(t, e),
										this._binding.selectRange(e);
								}),
								(0, b.validateRegistry)(t, {
									availableTimeFrames: i.any.isRequired,
									chartWidgetCollection: i.any.isRequired,
									chartWidget: i.any.isRequired,
								}),
								W.has(t.chartWidget) || W.set(t.chartWidget, new w(t));
							const s = (this._binding = (0, v.ensureDefined)(
								W.get(t.chartWidget),
							));
							this.state = s.state();
						}
						componentDidMount() {
							this._binding.onChange().subscribe(this, this._handleUpdate);
						}
						componentWillUnmount() {
							this._binding.onChange().unsubscribe(this, this._handleUpdate);
						}
						render() {
							return r.createElement(e, {
								goToDateButton: this.props.goToDateButton,
								className: this.props.className,
								ranges: this.state.ranges,
								activeRange: this.state.activeRange,
								onSelectRange: this._handleSelectRange,
							});
						}
					}).contextType = D),
					t
				);
			}
			const W = new WeakMap();
			const L = s(64358);
			const j = s(23829);
			const N = s(1109);
			const B = s(53180);
			const R = s(90752);
			const P = s(7458);
			function H(e) {
				const { ranges: t, activeRange: s, onSelectRange: a } = e;
				return r.createElement(
					r.Fragment,
					null,
					t.map((e) =>
						r.createElement(j.ContextMenuItem, {
							key: e.value.value,
							label: e.description || e.text,
							active: s === e.value.value,
							checked: s === e.value.value,
							checkable: !0,
							disabled: !1,
							onClick: n.bind(null, e),
							doNotCloseOnClick: !1,
							subItems: [],
						}),
					),
				);
				function n(e) {
					e && a && a(e), (0, u.globalCloseMenu)();
				}
			}
			function U(e) {
				const { onGoToDateClick: t } = e;
				return r.createElement(
					r.Fragment,
					null,
					r.createElement(N.Separator, { className: P.separator }),
					r.createElement(j.ContextMenuItem, {
						icon: R,
						label: (0, B.appendEllipsis)(n.t(null, void 0, s(369))),
						onClick: t,
						active: !1,
						checked: !1,
						checkable: !1,
						disabled: !1,
						doNotCloseOnClick: !1,
						subItems: [],
					}),
				);
			}
			const F = {
				title: n.t(null, void 0, s(60222)),
				goToDate: (0, B.appendEllipsis)(n.t(null, void 0, s(369))),
			};
			const Y = (0, b.registryContextType)();
			class O extends r.PureComponent {
				constructor(e, t) {
					super(e, t),
						(this._handleGoToDateClick = () => {
							const { chartWidget: e } = this.context;
							(0, L.showGoToDateDialog)(e), (0, u.globalCloseMenu)();
						}),
						(this._handleRangeSelect = (e) => {
							e && this.props.onSelectRange && this.props.onSelectRange(e),
								(0, u.globalCloseMenu)();
						}),
						(this._renderChildren = (e) => {
							const {
								ranges: t,
								activeRange: s,
								goToDateButton: a,
							} = this.props;
							return e
								? r.createElement(
										r.Fragment,
										null,
										r.createElement(H, {
											ranges: t,
											activeRange: s,
											onSelectRange: this._handleRangeSelect,
										}),
										a &&
											r.createElement(U, {
												onGoToDateClick: this._handleGoToDateClick,
											}),
								  )
								: r.createElement(
										r.Fragment,
										null,
										t.map((e) =>
											r.createElement(p.PopupMenuItem, {
												key: e.value.value,
												label: e.description || e.text,
												isActive: s === e.value.value,
												onClick: this._handleRangeSelect,
												onClickArg: e,
											}),
										),
										a && r.createElement(g.PopupMenuSeparator, null),
										a &&
											r.createElement(p.PopupMenuItem, {
												label: F.goToDate,
												onClick: this._handleGoToDateClick,
											}),
								  );
						}),
						(0, b.validateRegistry)(t, { chartWidget: i.any.isRequired });
				}
				render() {
					return r.createElement(
						m.MatchMedia,
						{ rule: "screen and (max-width: 430px)" },
						(e) =>
							r.createElement(
								d.ToolbarMenuButton,
								{
									className: l()(P.button, this.props.className),
									content: F.title,
									arrow: !0,
									verticalAttachEdge: h.VerticalAttachEdge.Top,
									verticalDropDirection:
										h.VerticalDropDirection.FromBottomToTop,
									horizontalMargin: 4,
									"data-name": "date-ranges-menu",
									isDrawer: e,
									onClick: this._trackClick,
								},
								this._renderChildren(e),
							),
					);
				}
				_trackClick() {
					0;
				}
			}
			O.contextType = Y;
			const X = I(O);
			const J = s(4618);
			const G = J;
			function V(e) {
				return class extends r.PureComponent {
					constructor() {
						super(...arguments), (this.activeTab = { current: null });
					}
					componentDidUpdate() {
						((0, v.ensureNotNull)(this._slider).style.transition =
							"transform 350ms"),
							this._componentDidUpdate();
					}
					componentDidMount() {
						this._componentDidUpdate();
					}
					render() {
						const { className: t } = this.props;
						const s = this._generateTabs();
						return r.createElement(
							"div",
							{ className: o(t, J.tabs), "data-name": this.props["data-name"] },
							s,
							r.createElement(e, {
								reference: (e) => {
									this._slider = e;
								},
							}),
						);
					}
					_generateTabs() {
						return (
							(this.activeTab.current = null),
							r.Children.map(this.props.children, (e) => {
								const t = e;
								const s = Boolean(t.props.isActive);
								const a = {
									reference: (e) => {
										s && (this.activeTab.current = e), t.props.reference?.(e);
									},
								};
								return r.cloneElement(t, a);
							})
						);
					}
					_componentDidUpdate() {
						const e = (0, v.ensureNotNull)(this._slider).style;
						if (this.activeTab.current) {
							const t = this.activeTab.current.offsetWidth;
							const s = this.activeTab.current.offsetLeft;
							(e.transform = `translateX(${s}px)`),
								(e.width = `${t}px`),
								(e.opacity = "1");
						} else e.opacity = "0";
					}
				};
			}
			V((e) =>
				r.createElement("div", {
					className: J.slider,
					ref: e.reference,
				}),
			);
			const q = s(40173);
			const Z = s(88066);
			const $ = s(91348);
			(0, q.mergeThemes)(Z.DEFAULT_TOOLBAR_BUTTON_THEME, $);
			function K(e) {
				const {
					reference: t,
					text: s,
					tooltip: a,
					isActive: n,
					className: i,
					onClick: l,
					theme: c = $,
					...d
				} = e;
				const h = o(i, c.item, { [c.isActive]: n });
				return r.createElement(Z.ToolbarButton, {
					...d,
					ref: t,
					text: s,
					isActive: n,
					tooltip: a,
					className: h,
					onClick: l,
				});
			}
			const Q = s(22586);
			const ee = (0, q.mergeThemes)(G, Q);
			const te = s(21648);
			const se = V((e) =>
				r.createElement(
					"div",
					{ className: o(e.className, ee.slider), ref: e.reference },
					r.createElement("div", { className: ee.inner }),
				),
			);
			const re = I((e) => {
				const { className: t, ranges: s, activeRange: a, onSelectRange: n } = e;
				return r.createElement(
					se,
					{ className: o(te.sliderRow, t), "data-name": "date-ranges-tabs" },
					s.map((e) =>
						r.createElement(K, {
							key: e.value.value,
							value: e.value.value,
							"data-name": `date-range-tab-${e.value.value}`,
							isActive: a === e.value.value,
							onClick: n?.bind(null, e),
							text: e.text,
							tooltip: e.description || e.text,
						}),
					),
				);
			});
			const ae = s(61814);
			const ne = s(68335);
			const ie = s(48889);
			const oe = s(92574);
			const le = s(50242);
			const ce = (0, ae.hotKeySerialize)({
				keys: [(0, ne.humanReadableModifiers)(ne.Modifiers.Alt, !1), "G"],
				text: "{0} + {1}",
			});
			const de = (0, b.registryContextType)();
			class he extends r.PureComponent {
				constructor(e, t) {
					super(e, t),
						(this._handleClick = () => {
							const { chartWidget: e } = this.context;
							(0, _.trackEvent)("GUI", "Chart Bottom Toolbar", "go to"),
								(0, L.showGoToDateDialog)(e);
						}),
						(0, b.validateRegistry)(t, { chartWidget: i.any.isRequired });
				}
				render() {
					const { className: e, ranges: t } = this.props;
					return (
						t.length > 0 &&
						r.createElement(ie.ToolbarIconButton, {
							icon: oe,
							onClick: this._handleClick,
							"data-tooltip-hotkey": ce,
							tooltip: n.t(null, void 0, s(369)),
							"data-name": "go-to-date",
							className: o(le.button, e),
						})
					);
				}
			}
			he.contextType = de;
			const ue = I(he);
			const me = s(88270);
			const pe = s(79206);
			const ge = s(39347);
			const ve = s(41249);
			const _e = s(92216);
			const be = s(16164);
			const ye = s(10643);
			const fe = s(85616);
			const Se = (0, q.mergeThemes)(Z.DEFAULT_TOOLBAR_BUTTON_THEME, {
				isDisabled: fe.disabled,
				button: fe.button,
			});
			const ke = (0, b.registryContextType)();
			class xe extends r.PureComponent {
				constructor(e, t) {
					super(e, t),
						(this._timeFormatter = new pe.TimeFormatter(
							(0, _e.getHourMinuteSecondFormat)(
								be.timeHoursFormatProperty.value(),
							),
						)),
						(this._tickInterval = void 0),
						(this._element = null),
						(this._menuShown = !1),
						(this._preventShowingMenu = !1),
						(this._tickClock = () => {
							const { chartApiInstance: e } = this.context;
							if (void 0 !== this._timezone) {
								const t = (0, ve.utc_to_cal)(this._timezone, e.serverTime());
								this.setState({ time: this._timeFormatter.format(t) });
							}
						}),
						(this._getActions = () => {
							if (!this.props.withMenu) return [];
							const { chartWidget: e } = this.context;
							return ((e) => {
								e.updateActions();
								const t = e.actions();
								return t && t.applyTimeZone instanceof ge.Action
									? t.applyTimeZone.getSubItems()
									: [];
							})(e);
						}),
						(this._handleRef = (e) => {
							this._element = e;
						}),
						(this._onMouseDown = () => {
							this._preventShowingMenu = this._menuShown;
						}),
						(this._showMenu = () => {
							if (this._preventShowingMenu)
								return void ye.ContextMenuManager.hideAll();
							const e = (0, v.ensureNotNull)(this._element);
							const t = this._getActions();
							if (0 === t.length) return;
							const s = e.getBoundingClientRect();
							ye.ContextMenuManager.showMenu(
								t,
								{ clientX: s.left, clientY: s.top, attachToYBy: "bottom" },
								{ returnFocus: !0, takeFocus: !0 },
								{ menuName: "TimezoneMenuContextMenu" },
								() => {
									this._menuShown = !1;
								},
							).then(() => {
								this._menuShown = !0;
							});
						}),
						(0, b.validateRegistry)(t, {
							chartWidget: i.any.isRequired,
							chartApiInstance: i.any.isRequired,
						}),
						(this.state = { time: "" });
				}
				componentDidMount() {
					const { chartWidget: e } = this.context;
					(this._tickInterval = setInterval(this._tickClock, 1e3)),
						e.withModel(null, () => {
							const t = e.model();
							t
								.model()
								.mainSeries()
								.dataEvents()
								.symbolResolved()
								.subscribe(this, this.updateTimezonesButton),
								t
									.model()
									.properties()
									.childs()
									.timezone.subscribe(this, this.updateTimezonesButton),
								be.timeHoursFormatProperty.subscribe(
									this,
									this._timeHoursFormatPropertyChanged,
								);
						});
				}
				componentWillUnmount() {
					const { chartWidget: e } = this.context;
					clearInterval(this._tickInterval),
						e.withModel(null, () => {
							const t = e.model();
							t
								.model()
								.mainSeries()
								.dataEvents()
								.symbolResolved()
								.unsubscribe(this, this.updateTimezonesButton),
								t
									.model()
									.properties()
									.childs()
									.timezone.unsubscribe(this, this.updateTimezonesButton),
								be.timeHoursFormatProperty.unsubscribe(
									this,
									this._timeHoursFormatPropertyChanged,
								);
						});
				}
				render() {
					const { className: e, withMenu: t } = this.props;
					const { time: a } = this.state;
					const i =
						void 0 !== this._timezone
							? (0, me.parseTzOffset)(this._timezone.name()).string
							: null;
					return r.createElement(Z.ToolbarButton, {
						onMouseDown: this._onMouseDown,
						ref: this._handleRef,
						onClick: this._showMenu,
						isDisabled: !t,
						theme: Se,
						"data-name": "time-zone-menu",
						tooltip: t ? n.t(null, void 0, s(87492)) : void 0,
						className: e,
						text: a && i && `${a} (${i})`,
					});
				}
				updateTimezonesButton() {
					const { chartWidget: e } = this.context;
					if (!e.hasModel()) return;
					if (null === e.model().mainSeries().symbolInfo()) return;
					let t = e.model().model().timezone();
					if ("exchange" === t) {
						const s = (0, v.ensureNotNull)(
							e.model().mainSeries().symbolInfo(),
						).timezone;
						s && (t = s);
					}
					(this._timezone = (0, ve.get_timezone)(t)), this._tickClock();
				}
				_timeHoursFormatPropertyChanged() {
					(this._timeFormatter = new pe.TimeFormatter(
						(0, _e.getHourMinuteSecondFormat)(
							be.timeHoursFormatProperty.value(),
						),
					)),
						this.updateTimezonesButton();
				}
			}
			xe.contextType = ke;
			const Ce = s(56812);
			function Ee(e) {
				return r.createElement("span", {
					className: o(Ce.separator, e.className),
				});
			}
			const Me = s(54079);
			const Te = s(36298);
			const ze = s(49483);
			class Ae {
				constructor(e, t, s) {
					(this._highlighted = !1),
						(this._chartWidget = e),
						(this._priceScaleGetter = t),
						(this._owner = s),
						(this._setHighlight = this._setHighlight.bind(this)),
						(this._removeHighlight = this._removeHighlight.bind(this));
				}
				destroy() {
					this._highlighted && this._removeHighlight();
				}
				handlers() {
					const e = ze.CheckMobile.any();
					return {
						onMouseEnter: e ? void 0 : this._setHighlight,
						onMouseLeave: e ? void 0 : this._removeHighlight,
					};
				}
				_setHighlight() {
					if (!this._chartWidget.hasModel()) return;
					const e = this._chartWidget.model().model();
					const t = e.paneForSource(e.mainSeries());
					const s = this._priceScaleGetter();
					if (null === t || null === s) return;
					const r = this._chartWidget.paneByState(t);
					if (null !== r) {
						const t = r.rightPriceAxisesContainer().findAxisWidgetForScale(s);
						let a = null;
						null !== t && (a = t.axisInfo());
						const n = r.leftPriceAxisesContainer().findAxisWidgetForScale(s);
						null !== n && (a = n.axisInfo());
						const i = r.highlightedPriceAxis();
						null !== a &&
							i.value().axis !== a &&
							(i.setValue({ owner: this._owner, axis: a }),
							e.lightUpdate(),
							(this._highlighted = !0));
					}
				}
				_removeHighlight() {
					if (!this._chartWidget.hasModel()) return;
					const e = this._chartWidget.model().model();
					const t = e.paneForSource(e.mainSeries());
					if (null === t) return;
					const s = this._chartWidget.paneByState(t);
					if (null !== s) {
						const t = s.highlightedPriceAxis();
						const r = t.value();
						null !== r.axis &&
							r.owner === this._owner &&
							(t.setValue({ owner: this._owner, axis: null }),
							e.lightUpdate(),
							(this._highlighted = !1));
					}
				}
			}
			const we = (0, b.registryContextType)();
			const De = new Te.TranslatedString(
				"toggle log scale",
				n.t(null, void 0, s(60166)),
			);
			const Ie = (0, b.registryContextType)();
			const We = new Te.TranslatedString(
				"toggle auto scale",
				n.t(null, void 0, s(63060)),
			);
			const Le = (0, b.registryContextType)();
			const je = new Te.TranslatedString(
				"toggle percentage scale",
				n.t(null, void 0, s(68642)),
			);
			const Ne = (0, b.registryContextType)();
			const Be = s(42142);
			const Re = s(21861);
			const Pe = s(82962);
			const He = s(11678);
			const Ue = s(97086);
			const Fe = new Te.TranslatedString(
				"change session",
				n.t(null, void 0, s(65303)),
			);
			const Ye = {
				hint: n.t(null, void 0, s(25866)),
				headerMenuText: n.t(null, void 0, s(44794)),
			};
			const Oe = (0, b.registryContextType)();
			class Xe extends r.PureComponent {
				constructor(e, t) {
					super(e, t),
						(0, b.validateRegistry)(t, {
							chartWidget: i.any.isRequired,
							chartApiInstance: i.any.isRequired,
						}),
						(this.state = { availableSessions: [] });
				}
				componentDidMount() {
					const { chartWidget: e } = this.context;
					e.withModel(null, () => {
						const t = e.model();
						t
							.model()
							.mainSeries()
							.dataEvents()
							.symbolResolved()
							.subscribe(this, this.updateSessionButton),
							t
								.model()
								.mainSeries()
								.properties()
								.childs()
								.sessionId.subscribe(this, this.updateSessionButton),
							this.updateSessionButton();
					});
				}
				componentWillUnmount() {
					const { chartWidget: e } = this.context;
					e.withModel(null, () => {
						const t = e.model();
						t
							.model()
							.mainSeries()
							.dataEvents()
							.symbolResolved()
							.unsubscribe(this, this.updateSessionButton),
							t
								.model()
								.mainSeries()
								.properties()
								.childs()
								.sessionId.unsubscribe(this, this.updateSessionButton);
					});
				}
				render() {
					const { className: e, withMenu: t } = this.props;
					const { sessionName: s, sessionDescription: a } = this.state;
					return r.createElement(
						d.ToolbarMenuButton,
						{
							arrow: !1,
							isDisabled: !t,
							content: s,
							className: e,
							closeOnClickOutside: !0,
							tooltip: t ? a : void 0,
							"data-name": "session-menu",
							verticalDropDirection: h.VerticalDropDirection.FromBottomToTop,
							verticalAttachEdge: h.VerticalAttachEdge.Top,
							onClick: this._trackClick,
						},
						this._menuItems(),
					);
				}
				updateSessionButton() {
					let e;
					let t;
					const { chartWidget: s } = this.context;
					if (!s.model()) return;
					const r = s.model().mainSeries().symbolInfo();
					if (null === r) return;
					const a = r.subsession_id;
					const n =
						null !==
							(t =
								null === (e = r.subsessions) || void 0 === e
									? void 0
									: e.filter((e) => !e.private)) && void 0 !== t
							? t
							: [];
					const i = n.find((e) => e.id === a);
					this.setState({
						sessionId: a,
						sessionName: (0, He.translateSessionShortDescription)(
							(null == i ? void 0 : i.description) || "",
						),
						sessionDescription: (0, He.translateSessionDescription)(
							(null == i ? void 0 : i.description) || "",
						),
						availableSessions: n,
					});
				}
				_menuItems() {
					if (!this.props.withMenu) return [];
					const { chartWidget: e } = this.context;
					const { availableSessions: t } = this.state;
					if (!e.model()) return [];
					const s = e.model().mainSeries();
					const a = [
						r.createElement(
							Pe.ToolWidgetMenuSummary,
							{ key: "header_menu_text", className: Ue.headerMenuText },
							Ye.headerMenuText.toUpperCase(),
						),
					];
					for (const n of t) {
						const t = { category: "SetSession", event: n.id };
						const i = () => {
							e.model().setProperty(
								s.properties().childs().sessionId,
								n.id,
								Fe,
							);
						};
						a.push(
							r.createElement(p.PopupMenuItem, {
								key: n.id,
								label: (0, He.translateSessionDescription)(n.description),
								isActive: this.state.sessionId === n.id,
								trackEventObject: t,
								onClick: i,
							}),
						);
					}
					return a;
				}
				_trackClick() {
					0;
				}
			}
			Xe.contextType = Oe;
			const Je = s(21868);
			const Ge = s(72026);
			const Ve = s(51267);
			const qe = s(64264);
			const Ze = {
				extLabel: n.t(null, void 0, s(8877)),
				extHint: n.t(null, void 0, s(41421)),
				percentageHint: n.t(null, void 0, s(43737)),
				logLabel: n.t(null, { context: "scale" }, s(885)),
				logHint: n.t(null, void 0, s(21329)),
				autoLabel: n.t(null, { context: "scale" }, s(99247)),
				autoHint: n.t(null, void 0, s(60879)),
				fullscreenHint: n.t(null, void 0, s(98948)),
				adjLabel: n.t(null, { context: "adjustments" }, s(25988)),
				adjHint: n.t(null, void 0, s(9994)),
				adjForDividendsOnlyHint: n.t(null, void 0, s(1217)),
				adjForSplitsOnlyHint: n.t(null, void 0, s(27662)),
				backAdjustLabel: n.t(null, { context: "adjustments" }, s(24717)),
				backAdjustHint: n.t(null, void 0, s(10989)),
				settlementAsCloseLabel: n.t(null, { context: "adjustments" }, s(11987)),
				settlementAsCloseHint: n.t(null, void 0, s(99983)),
			};
			const $e =
				((Ke = (e) =>
					r.createElement(Z.ToolbarButton, {
						text: Ze.logLabel,
						tooltip: Ze.logHint,
						className: e.className,
						isActive: e.isLogarithm,
						"aria-pressed": e.isLogarithm,
						onClick: lt(e.onClick, "log", e.isLogarithm),
						onMouseEnter: e.onMouseEnter,
						onMouseLeave: e.onMouseLeave,
						"data-name": "logarithm",
					})),
				((Qe = class extends r.PureComponent {
					constructor(e, t) {
						super(e, t),
							(this._priceScale = null),
							(this._handleSelect = () => {
								const e = this.context.chartWidget.model();
								const t = (0, v.ensureNotNull)(this.state.series);
								const s = t.priceScale();
								const r = s.mode();
								t.priceScale().isLockScale() ||
									e.setPriceScaleMode({ log: !r.log }, s, De);
							}),
							(0, b.validateRegistry)(t, { chartWidget: i.any.isRequired }),
							(this.state = { isActive: !1, series: null }),
							(this._priceAxisHighlighter = new Ae(
								this.context.chartWidget,
								() => this._priceScale,
								"logarithm",
							));
					}
					componentDidMount() {
						const e = this.context.chartWidget;
						e.withModel(null, () => {
							const t = e.model().mainSeries();
							const s = t.priceScale();
							this._handleMainSeriesPriceScaleChanged(s),
								t
									.priceScaleChanged()
									.subscribe(this, this._handleMainSeriesPriceScaleChanged),
								this._handleModeChanged({}, s.mode()),
								this.setState({
									isActive: t.priceScale().isLog(),
									series: t,
								});
						});
					}
					componentWillUnmount() {
						const e = this.context.chartWidget;
						e.withModel(null, () => {
							e.model()
								.mainSeries()
								.priceScaleChanged()
								.unsubscribe(this, this._handleMainSeriesPriceScaleChanged);
						}),
							null !== this._priceScale &&
								(this._priceScale.modeChanged().unsubscribeAll(this),
								(this._priceScale = null)),
							this._priceAxisHighlighter.destroy();
					}
					render() {
						const { className: e } = this.props;
						const { isActive: t, series: s } = this.state;
						return r.createElement(Ke, {
							...this._priceAxisHighlighter.handlers(),
							className: e,
							isLogarithm: t,
							isDisabled: null === s,
							onClick: this._handleSelect,
						});
					}
					_handleMainSeriesPriceScaleChanged(e) {
						null !== this._priceScale &&
							this._priceScale
								.modeChanged()
								.unsubscribe(this, this._handleModeChanged),
							(this._priceScale = e),
							this._priceScale
								.modeChanged()
								.subscribe(this, this._handleModeChanged),
							this._handleModeChanged({}, e.mode());
					}
					_handleModeChanged(e, t) {
						Boolean(t.log) !== this.state.isActive &&
							this.setState({ isActive: Boolean(t.log) });
					}
				}).contextType = we),
				Qe);
			let Ke;
			let Qe;
			const et = ((e) => {
				let t;
				return (
					((t = class extends r.PureComponent {
						constructor(e, t) {
							super(e, t),
								(this._priceScale = null),
								(this._handleSelect = () => {
									const e = this.context.chartWidget.model();
									const t = (0, v.ensureNotNull)(
										this.state.series,
									).priceScale();
									const s = t.mode();
									e.setPriceScaleMode({ autoScale: !s.autoScale }, t, We);
								}),
								(0, b.validateRegistry)(t, { chartWidget: i.any.isRequired }),
								(this.state = { isActive: !1, series: null }),
								(this._priceAxisHighlighter = new Ae(
									this.context.chartWidget,
									() => this._priceScale,
									"auto",
								));
						}
						componentDidMount() {
							const e = this.context.chartWidget;
							e.withModel(null, () => {
								const t = e.model().mainSeries();
								const s = t.priceScale();
								this._handleMainSeriesPriceScaleChanged(s),
									t
										.priceScaleChanged()
										.subscribe(this, this._handleMainSeriesPriceScaleChanged),
									this._handleModeChanged({}, s.mode()),
									this.setState({
										isActive: t.priceScale().isAutoScale(),
										series: t,
									});
							});
						}
						componentWillUnmount() {
							const e = this.context.chartWidget;
							e.withModel(null, () => {
								e.model()
									.mainSeries()
									.priceScaleChanged()
									.unsubscribe(this, this._handleMainSeriesPriceScaleChanged);
							}),
								null !== this._priceScale &&
									(this._priceScale.modeChanged().unsubscribeAll(this),
									(this._priceScale = null)),
								this._priceAxisHighlighter.destroy();
						}
						render() {
							const { className: t } = this.props;
							const { isActive: s, series: a } = this.state;
							return r.createElement(e, {
								...this._priceAxisHighlighter.handlers(),
								className: t,
								isAuto: s,
								isDisabled: null === a,
								onClick: this._handleSelect,
							});
						}
						_handleMainSeriesPriceScaleChanged(e) {
							null !== this._priceScale &&
								this._priceScale
									.modeChanged()
									.unsubscribe(this, this._handleModeChanged),
								(this._priceScale = e),
								this._priceScale
									.modeChanged()
									.subscribe(this, this._handleModeChanged),
								this._handleModeChanged({}, e.mode());
						}
						_handleModeChanged(e, t) {
							Boolean(t.autoScale) !== this.state.isActive &&
								this.setState({ isActive: Boolean(t.autoScale) });
						}
					}).contextType = Ie),
					t
				);
			})((e) =>
				r.createElement(Z.ToolbarButton, {
					text: Ze.autoLabel,
					tooltip: Ze.autoHint,
					className: e.className,
					isActive: e.isAuto,
					"aria-pressed": e.isAuto,
					onClick: lt(e.onClick, "auto", e.isAuto),
					onMouseEnter: e.onMouseEnter,
					onMouseLeave: e.onMouseLeave,
					"data-name": "auto",
				}),
			);
			const tt = ((e) => {
				let t;
				return (
					((t = class extends r.PureComponent {
						constructor(e, t) {
							super(e, t),
								(this._priceScale = null),
								(this._handleSelect = () => {
									const e = this.context.chartWidget.model();
									const t = (0, v.ensureNotNull)(this.state.series);
									const s = t.priceScale();
									const r = s.mode();
									t.priceScale().isLockScale() ||
										e.setPriceScaleMode({ percentage: !r.percentage }, s, je);
								}),
								(0, b.validateRegistry)(t, { chartWidget: i.any.isRequired }),
								(this.state = { isActive: !1, series: null }),
								(this._priceAxisHighlighter = new Ae(
									this.context.chartWidget,
									() => this._priceScale,
									"percentage",
								));
						}
						componentDidMount() {
							const e = this.context.chartWidget;
							e.withModel(null, () => {
								const t = e.model().mainSeries();
								const s = t.priceScale();
								this._handleMainSeriesPriceScaleChanged(s),
									t
										.priceScaleChanged()
										.subscribe(this, this._handleMainSeriesPriceScaleChanged),
									this._handleScaleChange({}, s.mode()),
									this.setState({
										isActive: t.priceScale().isPercentage(),
										series: t,
									});
							});
						}
						componentWillUnmount() {
							const e = this.context.chartWidget;
							e.withModel(null, () => {
								e.model()
									.mainSeries()
									.priceScaleChanged()
									.unsubscribe(this, this._handleMainSeriesPriceScaleChanged);
							}),
								null !== this._priceScale &&
									(this._priceScale.modeChanged().unsubscribeAll(this),
									(this._priceScale = null)),
								this._priceAxisHighlighter.destroy();
						}
						render() {
							const { className: t } = this.props;
							const { isActive: s, series: a } = this.state;
							return r.createElement(e, {
								...this._priceAxisHighlighter.handlers(),
								className: t,
								isPercentage: s,
								isDisabled: null === a,
								onClick: this._handleSelect,
							});
						}
						_handleMainSeriesPriceScaleChanged(e) {
							null !== this._priceScale &&
								this._priceScale
									.modeChanged()
									.unsubscribe(this, this._handleScaleChange),
								(this._priceScale = e),
								this._priceScale
									.modeChanged()
									.subscribe(this, this._handleScaleChange),
								this._handleScaleChange({}, e.mode());
						}
						_handleScaleChange(e, t) {
							Boolean(t.percentage) !== this.state.isActive &&
								this.setState({ isActive: Boolean(t.percentage) });
						}
					}).contextType = Le),
					t
				);
			})((e) =>
				r.createElement(Z.ToolbarButton, {
					icon: Je,
					tooltip: Ze.percentageHint,
					className: e.className,
					isActive: e.isPercentage,
					"aria-pressed": e.isPercentage,
					isDisabled: e.isDisabled,
					onClick: lt(e.onClick, "percent", e.isPercentage),
					onMouseEnter: e.onMouseEnter,
					onMouseLeave: e.onMouseLeave,
					"data-name": "percentage",
				}),
			);
			const st = (0, ae.hotKeySerialize)({
				keys: [(0, ne.humanReadableModifiers)(ne.Modifiers.Alt, !1), "Enter"],
				text: "{0} + {1}",
			});
			const rt = ((e) => {
				let t;
				return (
					((t = class extends r.PureComponent {
						constructor(e, t) {
							super(e, t),
								(this._handleClick = (e) => {
									const { resizerDetacher: t, chartWidgetCollection: s } =
										this.context;
									e.shiftKey && t.detachable.value()
										? t.detach()
										: this.state.isFullscreen
										  ? t.exitFullscreen()
										  : t.requestFullscreen();
								}),
								(this._handleLayoutChange = (e) => {
									this.setState({ isFullscreen: e });
								}),
								(this._handlePhoneSize = () => {
									0;
								}),
								(0, b.validateRegistry)(t, {
									chartWidgetCollection: i.any.isRequired,
									resizerDetacher: i.any.isRequired,
								});
							const { resizerDetacher: s } = t;
							this.state = {
								isFullscreen: s.fullscreen.value(),
								isChangeLayoutButton: this._isChangeLayoutButton(),
							};
						}
						componentDidMount() {
							const { resizerDetacher: e, chartWidgetCollection: t } =
								this.context;
							const { mobileChangeLayoutEnabled: s } = this.props;
							e.fullscreen.subscribe(this._handleLayoutChange);
						}
						componentWillUnmount() {
							const { resizerDetacher: e, chartWidgetCollection: t } =
								this.context;
							const { mobileChangeLayoutEnabled: s } = this.props;
							e.fullscreen.unsubscribe(this._handleLayoutChange);
						}
						render() {
							const { className: t } = this.props;
							const { isFullscreen: s, isChangeLayoutButton: a } = this.state;
							return r.createElement(e, {
								className: t,
								isFullscreen: s,
								onClick: this._handleClick,
							});
						}
						_isChangeLayoutButton() {
							return !1;
						}
					}).contextType = Ne),
					t
				);
			})((e) =>
				r.createElement(Z.ToolbarButton, {
					icon: e.isFullscreen ? Ve : Ge,
					tooltip: Ze.fullscreenHint,
					className: e.className,
					isActive: e.isFullscreen,
					onClick: lt(e.onClick, "maximize chart", e.isFullscreen),
					"data-tooltip-hotkey": st,
					"data-name": "fullscreen",
				}),
			);
			const at = { fullscreen: !0, preventPhoneLayout: !0 };
			const nt = {
				fullscreen: Number.MIN_SAFE_INTEGER,
				preventPhoneLayout: Number.MIN_SAFE_INTEGER,
				separator: -2,
				timeZones: -1,
				auto: 0,
				logarithm: 1,
				percentage: 2,
				session: 3,
				adj: 4,
				backAdj: 5,
				settlementAsClose: 6,
			};
			const it = (() => {
				const e = new Map();
				return (
					e.set($e, "logarithm"),
					e.set(tt, "percentage"),
					e.set(et, "auto"),
					e.set(Xe, "session"),
					e.set(rt, "fullscreen"),
					e
				);
			})();
			function ot(e) {
				0;
			}
			function lt(e, t, s) {
				return (t) => {
					e(t);
				};
			}
			const ct = {
				dateRangeMode: "hidden",
				separator: !0,
				timeZones: !0,
				fullscreen: !0,
				preventPhoneLayout: !0,
				auto: !0,
				logarithm: !0,
				percentage: !0,
				session: !0,
				adj: !0,
				backAdj: !0,
				settlementAsClose: !0,
			};
			const dt = (0, b.registryContextType)();
			class ht extends r.PureComponent {
				constructor(e, t) {
					let s;
					let n;
					super(e, t),
						(this._timezoneButtonRef = null),
						(this._layout = Object.assign({}, ct)),
						(this._raf = null),
						(this._toolbar = null),
						(this._rangeExpanded = null),
						(this._rangeCollapsed = null),
						(this._seriesComponents = {}),
						(this._resizeObserver = null),
						(this._injector =
							((s = () => this._layout),
							(n = (e, t) => (this._seriesComponents[t] = e)),
							(e, t, a) => {
								if (r.isValidElement(e) && "string" !== typeof e.type) {
									const { props: i } = e;
									if ("string" === typeof i.className) {
										const l = {
											className: o(i.className, t === a.length - 1 && qe.last),
										};
										const c = s();
										const d = (0, v.ensureDefined)(it.get(e.type));
										return r.createElement(
											"div",
											{
												key: null === e.key ? void 0 : e.key,
												className: o(qe.inline, c[d] && qe.collapsed),
												ref: (e) => n(e, d),
												onClick: () => ot(),
											},
											r.cloneElement(e, l),
										);
									}
								}
								return e;
							})),
						(this._updateButtonsVisibility = () => {
							const { chartWidget: e } = this.context;
							const t = e.model().model();
							const s = t.mainSeries();
							const r = s.symbolInfo();
							const a = !s.isDWMProperty().value();
							if (s.symbolResolvingActive().value())
								return void this._setStateWithResize({
									intervalAllowsSessionButton: a,
								});
							const n =
								((null == r ? void 0 : r.subsessions) || []).filter(
									(e) => !e.private,
								).length > 1;
							this._setStateWithResize({
								intervalAllowsSessionButton: a,
								symbolAllowsSessionButton: n,
							});
						}),
						(this._handleResize = () => {
							null === this._raf &&
								(this._raf = requestAnimationFrame(() => {
									const e = this._layout;
									const t = (0, v.ensureNotNull)(this._toolbar);
									const s = (0, v.ensureNotNull)(this._rangeExpanded);
									const r =
										((n = ((e) => {
											const t = {};
											return (
												Object.keys(e).forEach((s) => {
													const r = e[s];
													if (null !== r) {
														const e = a.findDOMNode(r);
														null !== e && (t[s] = e);
													}
												}),
												t
											);
										})(this._seriesComponents)),
										Object.keys(n)
											.map((e) => ({ name: e, width: n[e].offsetWidth }))
											.sort((e, t) => nt[e.name] - nt[t.name]));
									let n;
									const i = t.offsetWidth;
									const o = r.reduce((e, t) => e + t.width, 0);
									const l = s.offsetWidth;
									const c =
										!s.textContent || i - o - l <= 0 ? "collapsed" : "expanded";
									if (
										(Object.assign(e, { dateRangeMode: c }), "expanded" !== c)
									) {
										const t =
											i -
											(0, v.ensureNotNull)(this._rangeCollapsed).offsetWidth -
											0;
										let s = 0;
										let a = 0;
										for (const n of r)
											(s += n.width),
												n.name in at
													? ((a += n.width), Object.assign(e, { [n.name]: !1 }))
													: Object.assign(e, { [n.name]: t <= s });
										t <= a && Object.assign(e, { dateRangeMode: "hidden" });
									} else
										Object.assign(e, {
											separator: !1,
											timeZones: !1,
											fullscreen: !1,
											preventPhoneLayout: !1,
											auto: !1,
											logarithm: !1,
											percentage: !1,
											session: !1,
											adj: !1,
											settlementAsClose: !1,
											backAdj: !1,
										});
									this._applyResizing(), (this._raf = null);
								}));
						}),
						(this._handleTimezoneButtonRef = (e) => {
							this._timezoneButtonRef = e;
						}),
						(this._handleMeasure = () => {
							null !== this._toolbar && this.resizeUI();
						}),
						(this._handleFullscreenableChange = (e) => {
							this._setStateWithResize({ isFullscreenable: e });
						}),
						(this._handlePreventPhoneLayoutButtonVisibility = () => {
							0;
						}),
						(this._handleToolbarRef = (e) => (this._toolbar = e)),
						(this._handleRangeCollapsedRef = (e) => (this._rangeCollapsed = e)),
						(this._handleRangeExpandedRef = (e) => {
							this._updateResizeObserver(this._rangeExpanded, e),
								(this._rangeExpanded = e);
						}),
						(this._handleTimeZonesRef = (e) => {
							this._updateResizeObserver(this._seriesComponents.timeZones, e),
								(this._seriesComponents.timeZones = e);
						}),
						(this._handleSessionsRef = (e) => {
							this._updateResizeObserver(this._seriesComponents.session, e),
								(this._seriesComponents.session = e);
						}),
						(this._handleSeparatorRef = (e) => {
							this._seriesComponents.separator = e;
						}),
						(this._updateResizeObserver = (e, t) => {
							this._resizeObserver &&
								e !== t &&
								(e && this._resizeObserver.unobserve(e),
								t && this._resizeObserver.observe(t));
						}),
						(0, b.validateRegistry)(t, {
							onContentBoxChanged: i.any.isRequired,
							chartApiInstance: i.any.isRequired,
							chartWidget: i.any.isRequired,
							chartWidgetCollection: i.any.isRequired,
							resizerDetacher: i.any.isRequired,
						});
					const { resizerDetacher: l } = this.context;
					(this.state = {
						isFullscreenable: l.fullscreenable.value(),
						isPreventPhoneLayoutButton: this._isPreventPhoneLayoutButton(),
					}),
						(this._resizeObserver = new ResizeObserver(this._handleMeasure));
				}
				componentDidMount() {
					const {
						onContentBoxChanged: e,
						resizerDetacher: t,
						chartWidgetCollection: s,
						chartWidget: r,
					} = this.context;
					e.subscribe(this, this._handleResize),
						t.fullscreenable.subscribe(this._handleFullscreenableChange),
						r.withModel(null, () => {
							const e = r.model();
							const t = e.model();
							e
								.mainSeries()
								.isDWMProperty()
								.subscribe(this, this._updateButtonsVisibility),
								t
									.symbolSourceResolvingActive()
									.subscribe(this._updateButtonsVisibility),
								t
									.symbolSourceCollectionChanged()
									.subscribe(this, this._updateButtonsVisibility),
								this._updateButtonsVisibility();
						}),
						this.updateTimezonesButton(),
						this.resizeUI();
				}
				componentWillUnmount() {
					let e;
					const {
						onContentBoxChanged: t,
						resizerDetacher: s,
						chartWidgetCollection: r,
						chartWidget: a,
					} = this.context;
					t.unsubscribe(this, this._handleResize),
						s.fullscreenable.unsubscribe(this._handleFullscreenableChange),
						null === (e = this._resizeObserver) ||
							void 0 === e ||
							e.disconnect(),
						a.withModel(null, () => {
							const e = a.model();
							const t = e.model();
							e
								.mainSeries()
								.isDWMProperty()
								.unsubscribe(this, this._updateButtonsVisibility),
								e
									.mainSeries()
									.isBackAdjustmentForbiddenProperty()
									.unsubscribe(this, this._updateButtonsVisibility),
								e
									.mainSeries()
									.isSettlementAsCloseForbiddenProperty()
									.unsubscribe(this, this._updateButtonsVisibility),
								t
									.symbolSourceCollectionChanged()
									.unsubscribe(this, this._updateButtonsVisibility),
								t
									.symbolSourceResolvingActive()
									.unsubscribe(this._updateButtonsVisibility);
						}),
						null !== this._raf &&
							(cancelAnimationFrame(this._raf), (this._raf = null));
				}
				render() {
					const e = this._layout;
					const {
						timeFramesWidgetEnabled: t,
						timeWidgetEnabled: s,
						percentageScaleButtonEnabled: a,
						logScaleButtonEnabled: n,
						autoScaleButtonEnabled: i,
						fullscreenButtonEnabled: l,
					} = this.props;
					return r.createElement(
						Me.Toolbar,
						{
							className: qe.toolbar,
							onContextMenu: Re.preventDefault,
							ref: this._handleToolbarRef,
						},
						t &&
							r.createElement(
								Be.FragmentMap,
								null,
								r.createElement(
									"div",
									{
										className: o(
											qe.dateRangeWrapper,
											"collapsed" !== e.dateRangeMode && qe.collapsed,
										),
										ref: this._handleRangeCollapsedRef,
									},
									r.createElement(
										"div",
										{ className: o(qe.dateRangeCollapsed) },
										r.createElement(X, {
											goToDateButton: this.props.goToDateEnabled,
											className: qe.dateRange,
										}),
									),
								),
								r.createElement(
									"div",
									{
										className: o(
											qe.dateRangeWrapper,
											"expanded" !== e.dateRangeMode && qe.collapsed,
										),
										ref: this._handleRangeExpandedRef,
									},
									r.createElement(
										"div",
										{ className: o(qe.dateRangeExpanded) },
										r.createElement(re, {
											onSelectRange: this._trackRangeButtonClick,
											className: qe.dateRange,
										}),
										this.props.goToDateEnabled && r.createElement(Ee, null),
										this.props.goToDateEnabled && r.createElement(ue, null),
									),
								),
							),
						r.createElement(
							"div",
							{ className: qe.seriesControlWrapper },
							s &&
								r.createElement(
									"div",
									{
										className: o(qe.inline, e.timeZones && qe.collapsed),
										ref: this._handleTimeZonesRef,
									},
									r.createElement(
										"div",
										{
											className: qe.inline,
											onClick: this._trackTimezonesButtonClick,
										},
										r.createElement(xe, {
											className: qe.item,
											withMenu: this.props.timezoneMenuEnabled,
											ref: this._handleTimezoneButtonRef,
										}),
									),
								),
							this.props.sessionIdButtonEnabled &&
								this.state.symbolAllowsSessionButton &&
								this.state.intervalAllowsSessionButton &&
								r.createElement(
									"div",
									{
										className: o(qe.inline, e.session && qe.collapsed),
										ref: this._handleSessionsRef,
									},
									r.createElement(
										"div",
										{ className: qe.inline },
										r.createElement(Xe, {
											className: qe.item,
											withMenu: this.props.sessionIdButtonEnabled,
										}),
									),
								),
							r.createElement(
								"div",
								{
									ref: this._handleSeparatorRef,
									className: o(qe.inline, e.separator && qe.collapsed),
								},
								r.createElement(Ee, null),
							),
							r.createElement(
								Be.FragmentMap,
								{ map: this._injector },
								!1,
								!1,
								!1,
								a &&
									!c.enabled("fundamental_widget") &&
									r.createElement(tt, { className: qe.item }),
								n && r.createElement($e, { className: qe.item }),
								i && r.createElement(et, { className: qe.item }),
								l &&
									this.state.isFullscreenable &&
									r.createElement(rt, {
										className: qe.item,
										mobileChangeLayoutEnabled:
											this.props.mobileChangeLayoutEnabled,
									}),
								!1,
							),
						),
					);
				}
				updateTimezonesButton() {
					null !== this._timezoneButtonRef &&
						this._timezoneButtonRef.updateTimezonesButton();
				}
				resizeUI() {
					this._handleResize();
				}
				_trackRangeButtonClick(e) {
					0;
				}
				_trackTimezonesButtonClick() {
					ot();
				}
				_setStateWithResize(e) {
					Object.assign(this._layout, ct),
						this._applyResizing(),
						this.setState(e, () => this._handleResize());
				}
				_applyResizing() {
					const { dateRangeMode: e, ...t } = this._layout;
					this._rangeExpanded?.classList.toggle(qe.collapsed, "expanded" !== e),
						this._rangeCollapsed?.classList.toggle(
							qe.collapsed,
							"collapsed" !== e,
						);
					let s = !1;
					let r = !1;
					Object.keys(t).forEach((e) => {
						const a = e;
						if ("separator" !== a) {
							const e = this._seriesComponents[a];
							const n = !0 === t[a];
							e &&
								("timeZones" === a || "session" === a
									? (s = s || !n)
									: (r = r || !n),
								e.classList.toggle(qe.collapsed, n));
						}
					});
					const a = this._seriesComponents.separator;
					if (a) {
						const e = !s || !r || !0 === t.separator;
						a.classList.toggle(qe.collapsed, e);
					}
				}
				_isPreventPhoneLayoutButton() {
					return !1;
				}
			}
			ht.contextType = dt;
			const ut = {
				onContentBoxChanged: i.any,
				computeContentBox: i.any,
				chartWidget: i.any,
				chartApiInstance: i.any,
				chartWidgetCollection: i.any,
				resizerDetacher: i.any,
				availableTimeFrames: i.any,
			};
			class mt extends r.PureComponent {
				constructor(e) {
					super(e),
						(this._setActiveChart = (e) => {
							this._defineRegistry(e), this.setState({ chartWidget: e });
						});
					const t = this.props.chartWidgetCollection.activeChartWidget.value();
					(this.state = { chartWidget: t }), this._defineRegistry(t);
				}
				componentDidMount() {
					this.props.chartWidgetCollection.activeChartWidget.subscribe(
						this._setActiveChart,
					);
				}
				componentWillUnmount() {
					this.props.chartWidgetCollection.activeChartWidget.unsubscribe(
						this._setActiveChart,
					);
				}
				render() {
					const { chartWidget: e } = this.state;
					if (!e) return null;
					const { options: t } = this.props;
					const s = {
						timeFramesWidgetEnabled: t.timeFramesWidgetEnabled,
						goToDateEnabled: t.timeFramesWidget.goToDateEnabled,
						timeWidgetEnabled: t.timeWidgetEnabled,
						timezoneMenuEnabled: t.timeWidget?.timezoneMenuEnabled,
						sessionIdButtonEnabled: t.sessionIdButtonEnabled,
						backAdjustmentButtonEnabled: t.backAdjustmentButtonEnabled,
						settlementAsCloseButtonEnabled: t.settlementAsCloseButtonEnabled,
						adjustForDividendsButtonEnabled: t.adjustForDividendsButtonEnabled,
						logScaleButtonEnabled: t.logScaleButtonEnabled,
						percentageScaleButtonEnabled: t.percentageScaleButtonEnabled,
						autoScaleButtonEnabled: t.autoScaleButtonEnabled,
						fullscreenButtonEnabled: t.fullscreenButtonEnabled,
						mobileChangeLayoutEnabled: t.mobileChangeLayoutEnabled,
					};
					return r.createElement(
						b.RegistryProvider,
						{ validation: ut, value: this._registry },
						r.createElement(ht, { key: e.id(), ...s }),
					);
				}
				_defineRegistry(e) {
					const {
						onContentBoxChanged: t,
						computeContentBox: s,
						chartApiInstance: r,
						chartWidgetCollection: a,
						options: { timeFramesWidgetEnabled: n, timeFramesWidget: i },
					} = this.props;
					const o = n ? i.availableTimeFrames : void 0;
					this._registry = {
						onContentBoxChanged: t,
						computeContentBox: s,
						chartWidget: e,
						availableTimeFrames: o,
						chartApiInstance: r,
						chartWidgetCollection: a,
						resizerDetacher: e.getResizerDetacher(),
					};
				}
			}
			class pt {
				constructor(e, t, s, n, i, o, l) {
					this._container = e;
					const c = r.createElement(mt, {
						onContentBoxChanged: t,
						computeContentBox: s,
						chartWidgetCollection: n,
						chartApiInstance: i,
						chartWidgetOptions: o,
						options: l,
					});
					a.render(c, e), e.setAttribute("data-initialized", "true");
				}
				destroy() {
					a.unmountComponentAtNode(this._container),
						this._container.removeAttribute("data-initialized");
				}
			}
		},
		72026: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M15 8V3h-5V2h6v6h-1ZM3 10v5h5v1H2v-6h1Z"/></svg>';
		},
		51267: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M11 2v5h5v1h-6V2h1ZM7 16v-5H2v-1h6v6H7Z"/></svg>';
		},
		92574: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="M11 4h-1v2H7.5A2.5 2.5 0 0 0 5 8.5V13h1v-2h16v8.5c0 .83-.67 1.5-1.5 1.5H14v1h6.5a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 20.5 6H18V4h-1v2h-6V4Zm6 4V7h-6v1h-1V7H7.5C6.67 7 6 7.67 6 8.5V10h16V8.5c0-.83-.67-1.5-1.5-1.5H18v1h-1Zm-5.15 10.15-3.5-3.5-.7.7L10.29 18H4v1h6.3l-2.65 2.65.7.7 3.5-3.5.36-.35-.36-.35Z"/></svg>';
		},
		79978: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M8 5l3.5 3.5L8 12"/></svg>';
		},
		21868: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><g fill="none" stroke="currentColor"><circle cx="3.5" cy="3.5" r="2"/><circle cx="10.5" cy="10.5" r="2"/><path stroke-linecap="square" d="M9.5 1.5l-5 11"/></g></svg>';
		},
		39750: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M7 15l5 5L23 9"/></svg>';
		},
		69311: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.7 9l4.65-4.65-.7-.7L9 8.29 4.35 3.65l-.7.7L8.29 9l-4.64 4.65.7.7L9 9.71l4.65 4.64.7-.7L9.71 9z"/></svg>';
		},
		90752: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" d="M5.5 13v-2.5m8.5 11h6.5a2 2 0 0 0 2-2v-9m-17 0v-2c0-1.1.9-2 2-2h13a2 2 0 0 1 2 2v2m-17 0h17"/><path fill="currentColor" d="M10 4h1v4h-1V4zM17 4h1v4h-1V4z"/><path stroke="currentColor" d="M4 18.5h7.5m0 0L8 22m3.5-3.5L8 15"/></svg>';
		},
		25988: (e) => {
			e.exports = {
				ar: ["تعديل"],
				ca_ES: ["aj"],
				cs: ["adj"],
				de: ["Anp."],
				el: ["adj"],
				en: "ADJ",
				es: "ADJ",
				fa: ["adj"],
				fr: ["adj"],
				he_IL: ["התאם"],
				hu_HU: ["adj"],
				id_ID: ["penyesuaian"],
				it: ["adg"],
				ja: ["配当調整"],
				ko: "ADJ",
				ms_MY: ["laras"],
				nl_NL: ["adj"],
				pl: ["adj"],
				pt: ["AJUSTES"],
				ro: ["adj"],
				ru: ["коррект."],
				sv: ["adj"],
				th: ["adj"],
				tr: "ADJ",
				vi: ["đ.chỉnh"],
				zh: "ADJ",
				zh_TW: "ADJ",
			};
		},
		24717: (e) => {
			e.exports = {
				ar: ["b-adj"],
				ca_ES: ["b-adj"],
				cs: "B-ADJ",
				de: ["b-adj"],
				el: "B-ADJ",
				en: "B-ADJ",
				es: "B-ADJ",
				fa: "B-ADJ",
				fr: ["b-adj"],
				he_IL: ["b-adj"],
				hu_HU: "B-ADJ",
				id_ID: ["b-adj"],
				it: ["b-adg"],
				ja: ["限月調整"],
				ko: "B-ADJ",
				ms_MY: ["b-adj"],
				nl_NL: "B-ADJ",
				pl: ["b-adj"],
				pt: "B-ADJ",
				ro: "B-ADJ",
				ru: ["корр"],
				sv: ["b-adj"],
				th: ["b-adj"],
				tr: "B-ADJ",
				vi: ["b-adj"],
				zh: "B-ADJ",
				zh_TW: "B-ADJ",
			};
		},
		11987: (e) => {
			e.exports = {
				ar: ["ضبط"],
				ca_ES: ["set"],
				cs: "SET",
				de: ["setzen"],
				el: "SET",
				en: "SET",
				es: "SET",
				fa: "SET",
				fr: ["fixer"],
				he_IL: ["הגדר"],
				hu_HU: "SET",
				id_ID: "SET",
				it: ["set"],
				ja: ["清算価格"],
				ko: "SET",
				ms_MY: ["set"],
				nl_NL: "SET",
				pl: ["ustaw"],
				pt: ["DEFINIR"],
				ro: "SET",
				ru: ["расч.цена"],
				sv: ["ställ in"],
				th: ["set"],
				tr: "SET",
				vi: ["set"],
				zh: "SET",
				zh_TW: "SET",
			};
		},
		99247: (e) => {
			e.exports = {
				ar: ["تلقائي"],
				ca_ES: "auto",
				cs: ["automatické"],
				de: "auto",
				el: ["αυτοματο"],
				en: "auto",
				es: "auto",
				fa: ["خودکار"],
				fr: ["automatique"],
				he_IL: ["אוטומטי"],
				hu_HU: "auto",
				id_ID: "auto",
				it: "auto",
				ja: ["自動"],
				ko: ["자동"],
				ms_MY: "auto",
				nl_NL: "auto",
				pl: "auto",
				pt: "auto",
				ro: "auto",
				ru: ["авто"],
				sv: "auto",
				th: ["อัตโนมัติ"],
				tr: ["otomatik"],
				vi: ["tự động"],
				zh: ["自动"],
				zh_TW: ["自動"],
			};
		},
		885: (e) => {
			e.exports = {
				ar: ["لوغاريتمي"],
				ca_ES: "log",
				cs: "log",
				de: "log",
				el: "log",
				en: "log",
				es: "log",
				fa: "log",
				fr: "log",
				he_IL: ["לוג"],
				hu_HU: "log",
				id_ID: "log",
				it: "log",
				ja: ["ログスケール"],
				ko: ["로그"],
				ms_MY: "log",
				nl_NL: "log",
				pl: "log",
				pt: "log",
				ro: "log",
				ru: ["лог"],
				sv: ["logg"],
				th: ["ล็อก"],
				tr: "log",
				vi: "log",
				zh: "log",
				zh_TW: "log",
			};
		},
		74944: (e) => {
			e.exports = {
				ar: "All data",
				ca_ES: "All data",
				cs: "All data",
				de: ["Alle Daten"],
				el: "All data",
				en: "All data",
				es: ["Todos los datos"],
				fa: "All data",
				fr: ["Toutes les données"],
				he_IL: ["כל הנתונים"],
				hu_HU: "All data",
				id_ID: ["Seluruh data"],
				it: ["Tutti i dati"],
				ja: ["すべてのデータ"],
				ko: ["모든 데이터"],
				ms_MY: ["Semua data"],
				nl_NL: "All data",
				pl: "All data",
				pt: ["Todos os dados"],
				ro: "All data",
				ru: ["Все данные"],
				sv: "All data",
				th: "All data",
				tr: "All data",
				vi: "All data",
				zh: ["所有数据"],
				zh_TW: "All data",
			};
		},
		87556: (e) => {
			e.exports = {
				ar: "Year to day",
				ca_ES: "Year to day",
				cs: "Year to day",
				de: ["Jahr zu Tag"],
				el: "Year to day",
				en: "Year to day",
				es: ["De año a día"],
				fa: "Year to day",
				fr: ["Année à ce jour"],
				he_IL: ["שנה ליום"],
				hu_HU: "Year to day",
				id_ID: ["Tahun ke hari"],
				it: "Year to day",
				ja: ["年初来"],
				ko: ["연도별"],
				ms_MY: ["Tahun ke hari"],
				nl_NL: "Year to day",
				pl: "Year to day",
				pt: ["De ano para dia"],
				ro: "Year to day",
				ru: ["Данные с начала года"],
				sv: "Year to day",
				th: "Year to day",
				tr: "Year to day",
				vi: "Year to day",
				zh: "Year to day",
				zh_TW: "Year to day",
			};
		},
		29505: (e) => {
			e.exports = {
				ar: "{timePeriod} in {timeInterval}",
				ca_ES: "{timePeriod} in {timeInterval}",
				cs: "{timePeriod} in {timeInterval}",
				de: "{timePeriod} in {timeInterval}",
				el: "{timePeriod} in {timeInterval}",
				en: "{timePeriod} in {timeInterval}",
				es: ["{timePeriod} en {timeInterval}"],
				fa: "{timePeriod} in {timeInterval}",
				fr: ["{timePeriod} dans {timeInterval}"],
				he_IL: ["‎{timePeriod}‎ ב-‎{timeInterval}‎"],
				hu_HU: "{timePeriod} in {timeInterval}",
				id_ID: ["{timePeriod} pada {timeInterval}"],
				it: ["{timeInterval} a {timePeriod}"],
				ja: ["{timeInterval} で {timePeriod}"],
				ko: ["{timeInterval} 의 {timePeriod}₩"],
				ms_MY: ["{timePeriod} dalam {timeInterval}"],
				nl_NL: "{timePeriod} in {timeInterval}",
				pl: "{timePeriod} in {timeInterval}",
				pt: ["{timePeriod} em {timeInterval}"],
				ro: "{timePeriod} in {timeInterval}",
				ru: ["{timePeriod} в {timeInterval}"],
				sv: "{timePeriod} in {timeInterval}",
				th: "{timePeriod} in {timeInterval}",
				tr: "{timePeriod} in {timeInterval}",
				vi: "{timePeriod} in {timeInterval}",
				zh: "{timePeriod} in {timeInterval}",
				zh_TW: "{timePeriod} in {timeInterval}",
			};
		},
		9994: (e) => {
			e.exports = {
				ar: ["تعديل البيانات لأرباح الأسهم"],
				ca_ES: ["Ajusta dades dels dividends"],
				cs: "Adjust data for dividends",
				de: ["Daten für Dividenden anpassen"],
				el: "Adjust data for dividends",
				en: "Adjust data for dividends",
				es: ["Ajustar datos de los dividendos"],
				fa: "Adjust data for dividends",
				fr: ["Ajuster les données pour les dividendes"],
				he_IL: ["התאם נתונים לדיבידנדים"],
				hu_HU: "Adjust data for dividends",
				id_ID: ["Sesuaikan data untuk dividen"],
				it: ["Adegua i dati a seconda dei dividendi"],
				ja: ["配当でデータを調整"],
				ko: ["배당에 따른 데이터 조정"],
				ms_MY: ["Laras data untuk dividen"],
				nl_NL: "Adjust data for dividends",
				pl: ["Dopasuj dane według dywidend"],
				pt: ["Ajustar dados de dividendos"],
				ro: "Adjust data for dividends",
				ru: ["Корректировать данные на дивиденды"],
				sv: ["Justera data för utdelning"],
				th: ["ปรับเปลี่ยนข้อมูลเนื่องจากเงินปันผล"],
				tr: ["Verileri temettülere göre düzelt"],
				vi: ["Điều chỉnh dữ liệu cho Cổ tức"],
				zh: ["调整股息数据"],
				zh_TW: ["調整股息數據"],
			};
		},
		10989: (e) => {
			e.exports = {
				ar: ["ضبط لتغييرات العقود"],
				ca_ES: ["Ajusta els canvis dels contractes"],
				cs: "Adjust for contract changes",
				de: ["Veränderungen der Kontraktgrößen und Verfalltage"],
				el: "Adjust for contract changes",
				en: "Adjust for contract changes",
				es: ["Ajustar cambios de contrato"],
				fa: "Adjust for contract changes",
				fr: ["Ajustement pour les changements de contrat"],
				he_IL: ["התאם לשינויים בחוזה"],
				hu_HU: "Adjust for contract changes",
				id_ID: ["Penyesuaian untuk perubahan kontrak"],
				it: ["Incorpora variazioni dovute al cambio di contratto"],
				ja: ["限月の切り替えの調整"],
				ko: ["컨트랙트 변경 조절"],
				ms_MY: ["Laraskan untuk perubahan-perubahan kontrak"],
				nl_NL: "Adjust for contract changes",
				pl: ["Dostosuj do zmian w kontrakcie"],
				pt: ["Ajustes para mudanças no contrato"],
				ro: "Adjust for contract changes",
				ru: ["Корректировать с учётом изменений контрактов"],
				sv: ["Förändringar i avtalens storlek och datum för upphörande"],
				th: ["ปรับตามการเปลี่ยนแปลงสัญญา"],
				tr: ["Sözleşme değişiklikleri için ayarlama"],
				vi: ["Điều chỉnh để thay đổi hợp đồng"],
				zh: ["根据合约变更调整"],
				zh_TW: ["調整合約變更"],
			};
		},
		369: (e) => {
			e.exports = {
				ar: ["الذهاب إلى"],
				ca_ES: ["Anar a"],
				cs: "Go to",
				de: ["Gehe zu"],
				el: "Go to",
				en: "Go to",
				es: ["Ir a"],
				fa: ["برو به"],
				fr: ["Aller à"],
				he_IL: ["עבור ל"],
				hu_HU: ["Ugrás ide:"],
				id_ID: ["Menuju ke"],
				it: ["Vai a"],
				ja: ["移動"],
				ko: ["가기"],
				ms_MY: ["Pergi ke"],
				nl_NL: "Go to",
				pl: ["Idź do..."],
				pt: ["Ir para"],
				ro: "Go to",
				ru: ["Перейти к дате"],
				sv: ["Gå till"],
				th: ["ไปที่"],
				tr: ["Tarihe git"],
				vi: ["Đến"],
				zh: ["前往到"],
				zh_TW: ["前往到"],
			};
		},
		41421: (e) => {
			e.exports = {
				ar: [
					"ساعات التداول المُمددة متاحة فقط على النطاقات الصغرى خلال اليوم للرسوم البيانية",
				],
				ca_ES: [
					"L'horari ampliat només està disponible per a gràfics intradia",
				],
				cs: "Extended Hours is available only for intraday charts",
				de: [
					"Verlängerte Handelszeiten sind nur für Intraday-Charts verfügbar",
				],
				el: "Extended Hours is available only for intraday charts",
				en: "Extended Hours is available only for intraday charts",
				es: [
					"El horario ampliado solo se encuentra disponible para gráficos intradía",
				],
				fa: "Extended Hours is available only for intraday charts",
				fr: [
					"L'option Horaires étendus est disponible uniquement pour les graphiques intrajournaliers",
				],
				he_IL: ["שעות מורחבות זמינות רק עבור גרפים תוך-יומיים"],
				hu_HU: "Extended Hours is available only for intraday charts",
				id_ID: ["Jam Perpanjangan hanya tersedia bagi chart intrahari"],
				it: [
					"Gli orari di negoziazione estesi sono disponibili solo per i grafici intraday",
				],
				ja: ["時間外取引の機能は、イントラデイのチャートでのみ利用できます"],
				ko: ["확장시간은 인트라데이 차트에서만 가능합니다"],
				ms_MY: ["Waktu Dilanjutkan hanya tersedia untuk carta intra hari"],
				nl_NL: "Extended Hours is available only for intraday charts",
				pl: ["Sesja rozszerzona dostępna jest wyłącznie dla wykresów intraday"],
				pt: [
					"O Horário Estendido está disponível apenas para gráficos intradiário",
				],
				ro: "Extended Hours is available only for intraday charts",
				ru: [
					"Функция расширенных торговых часов доступна только для внутридневных графиков",
				],
				sv: ["Utökade timmar är endast tillgänglig för intradagsdiagram"],
				th: ["ชั่วโมงที่เพิ่มเติมขึ้นมาใช้ได้สำหรับกราฟแบบระหว่างวันเท่านั้น"],
				tr: ["Uzatılmış saatler sadece gün içi grafiklerde kullanılabilir"],
				vi: [
					"Tính năng Thời gian Giao dịch Ngoài giờ chỉ có sẵn cho các biểu đồ trong ngày",
				],
				zh: ["延长时段仅适用于日内图表"],
				zh_TW: ["延長時段僅適用於日內圖表"],
			};
		},
		1217: (e) => {
			e.exports = {
				ar: ["يتم ضبط بيانات الرمز الرئيسي لتوزيعات الأرباح فقط"],
				ca_ES: ["Les dades del símbol principal s'ajusten només als dividends"],
				cs: "Main symbol data is adjusted for dividends only",
				de: [
					"Die Daten des Hauptsymbols sind nur für die Dividenden angepasst",
				],
				el: "Main symbol data is adjusted for dividends only",
				en: "Main symbol data is adjusted for dividends only",
				es: [
					"Los datos del símbolo principal se ajustan solo a los dividendos",
				],
				fa: "Main symbol data is adjusted for dividends only",
				fr: [
					"Les données du symbole principal sont ajustées pour les dividendes uniquement",
				],
				he_IL: ["הנתונים של הסימול הראשי מותאמים לדיבידנדים בלבד"],
				hu_HU: "Main symbol data is adjusted for dividends only",
				id_ID: ["Data simbol utama disesuaikan hanya untuk deviden"],
				it: [
					"I dati del simbolo principale sono adeguati solo per lo stacco dei dividendi",
				],
				ja: ["メインシンボルのデータは配当のみで調整されています"],
				ko: ["메인 심볼 데이터는 디비든드에 대해서만 조정됩니다"],
				ms_MY: ["Data utama simbol adalah diselaraskan untuk dividend sahaja"],
				nl_NL: "Main symbol data is adjusted for dividends only",
				pl: ["Dane głównego symbolu są dostosowywane tylko do dywidend"],
				pt: ["Os dados do símbolo são ajustados apenas para dividendos"],
				ro: "Main symbol data is adjusted for dividends only",
				ru: [
					"Данные по основному инструменту корректируются только для дивидендов",
				],
				sv: ["Uppgifterna om huvudsymbolen justeras endast för utdelningar."],
				th: ["ข้อมูลสัญลักษณ์หลักถูกปรับเป็นเงินปันผลเท่านั้น"],
				tr: ["Ana sembol verileri yalnızca temettüler için ayarlanır"],
				vi: ["Dữ liệu của mã chính chỉ được điều chỉnh cho cổ tức"],
				zh: ["主要商品数据仅针对股息进行调整"],
				zh_TW: ["主要商品數據僅針對股息進行調整"],
			};
		},
		27662: (e) => {
			e.exports = {
				ar: ["يتم ضبط بيانات الرمز الرئيسي للتقسيمات فقط"],
				ca_ES: ["Les dades del símbol principal s'ajusten només als splits"],
				cs: "Main symbol data is adjusted for splits only",
				de: ["Die Daten des Hauptsymbols werden nur für Splits angepasst"],
				el: "Main symbol data is adjusted for splits only",
				en: "Main symbol data is adjusted for splits only",
				es: ["Los datos del símbolo principal se ajustan solo a los splits"],
				fa: "Main symbol data is adjusted for splits only",
				fr: [
					"Les données du symbole principal sont ajustées pour les fractions uniquement",
				],
				he_IL: ["הנתונים של הסימול הראשי מותאמים לספליטים בלבד"],
				hu_HU: "Main symbol data is adjusted for splits only",
				id_ID: ["Data simbol utama disesuaikan hanya untuk pecahan."],
				it: [
					"I dati del simbolo principale sono adeguati solo per i frazionamenti",
				],
				ja: ["メインシンボルのデータは株式分割でのみ調整されています"],
				ko: ["메인 심볼 데이터는 스플릿에 대해서만 조정됩니다"],
				ms_MY: [
					"Data utama simbol adalah diselaraskan untuk pembahagian sahaja",
				],
				nl_NL: "Main symbol data is adjusted for splits only",
				pl: ["Dane głównego symbolu są dostosowywane tylko do podziałów"],
				pt: [
					"Os dados do símbolo principal são ajustados apenas para desdobramentos",
				],
				ro: "Main symbol data is adjusted for splits only",
				ru: [
					"Данные по основному инструменту корректируются только для сплитов",
				],
				sv: ["Uppgifter om huvudsymbolen justeras endast för splits."],
				th: ["ข้อมูลสัญลักษณ์หลักถูกปรับสำหรับการแยกเท่านั้น"],
				tr: ["Ana sembol verileri yalnızca bölmeler için ayarlanır"],
				vi: ["Dữ liệu của mã chính chỉ được điều chỉnh để tách"],
				zh: ["主要商品数据仅针对拆分进行调整"],
				zh_TW: ["主要商品數據僅針對拆分進行調整"],
			};
		},
		44794: (e) => {
			e.exports = {
				ar: ["الجلسات"],
				ca_ES: "Sessions",
				cs: "Sessions",
				de: "Sessions",
				el: "Sessions",
				en: "Sessions",
				es: ["Sesiones"],
				fa: "Sessions",
				fr: "Sessions",
				he_IL: ["סשנים"],
				hu_HU: "Sessions",
				id_ID: ["Sesi"],
				it: ["Sessioni"],
				ja: ["セッション"],
				ko: ["세션"],
				ms_MY: ["Sesi-sesi"],
				nl_NL: "Sessions",
				pl: ["Sesje"],
				pt: ["Sessões"],
				ro: "Sessions",
				ru: ["Сессии"],
				sv: ["Sessioner"],
				th: ["เซสชั่น"],
				tr: ["Oturum"],
				vi: ["Phiên"],
				zh: ["交易时段"],
				zh_TW: ["交易時段"],
			};
		},
		98948: (e) => {
			e.exports = {
				ar: ["تبديل تكبير الرسم البياني"],
				ca_ES: ["Alterna maximitzar gràfic"],
				cs: "Toggle Maximize Chart",
				de: ["Auf maximierten Chart umschalten"],
				el: "Toggle Maximize Chart",
				en: "Toggle Maximize Chart",
				es: ["Alternar maximizar gráfico"],
				fa: "Toggle Maximize Chart",
				fr: ["Agrandir le graphique"],
				he_IL: ["החלף לגרף מקסימלי"],
				hu_HU: ["Maximális Chat Kiterjesztése"],
				id_ID: ["Toggle Memperbesar Chart"],
				it: ["Espandi/riduci grafico"],
				ja: ["チャート最大化切り替え"],
				ko: ["차트최대화토글"],
				ms_MY: ["Carta Memaksimumkan Togol"],
				nl_NL: "Toggle Maximize Chart",
				pl: ["Maksymalizuj wykres"],
				pt: ["Alternar para gráfico maximizado"],
				ro: "Toggle Maximize Chart",
				ru: ["Развернуть/свернуть график"],
				sv: ["Slå på/av maximering av diagram"],
				th: ["สลับเป็นชาร์ตขนาดใหญ่ที่สุด"],
				tr: ["Grafik Maksimize Değiştir"],
				vi: ["Chuyển đổi Tối đa hoá Biểu đồ"],
				zh: ["切换为最大化图表"],
				zh_TW: ["切換最大化圖表"],
			};
		},
		60879: (e) => {
			e.exports = {
				ar: ["نطاق قياس تلقائي"],
				ca_ES: ["Alterna l'escala automàtica"],
				cs: ["Přepnout na Auto Stupnici"],
				de: ["Auf automatische Skalierung umschalten"],
				el: ["Αυτόματη κλίμακα"],
				en: "Toggle Auto Scale",
				es: ["Alternar escala automática"],
				fa: "Toggle Auto Scale",
				fr: ["Mise à l'échelle automatique"],
				he_IL: ["הפעל/כבה קנה מידה אוטומטיות"],
				hu_HU: ["Váltás Automata Méretezés"],
				id_ID: ["Toggle Skala Otomatis"],
				it: ["Seleziona/deseleziona scala automatica"],
				ja: ["自動スケール切り替え"],
				ko: ["자동눈금토글"],
				ms_MY: ["Skala Auto Togol"],
				nl_NL: ["Schakel autoschaal"],
				pl: ["Włącz skalę automatyczną"],
				pt: ["Alternar Para Escala Automática"],
				ro: "Toggle Auto Scale",
				ru: ["Автоматический масштаб вкл/выкл"],
				sv: ["Växla skala automatiskt"],
				th: ["สลับเป็นสเกลอัตโนมัติ"],
				tr: ["Otomatik Ölçeklendirmeyi Aç/Kapat"],
				vi: ["Chuyển đổi Tỷ lệ tự động"],
				zh: ["切换为自动坐标"],
				zh_TW: ["切換為自動刻度"],
			};
		},
		21329: (e) => {
			e.exports = {
				ar: ["نطاق قياس لوغاريتمي"],
				ca_ES: ["Alterna l'escala logarítmica"],
				cs: ["Přepnout Log Měřítko"],
				de: ["Auf logarithmische Skalierung umschalten"],
				el: ["Λογαριθμική κλίμακα"],
				en: "Toggle Log Scale",
				es: ["Alternar escala logarítmica"],
				fa: "Toggle Log Scale",
				fr: ["Mise à l'échelle logarithmique"],
				he_IL: ["הפעל/כבה סקאלה לוגריתמית"],
				hu_HU: ["Váltás Log Skála"],
				id_ID: ["Toggle Skala Log"],
				it: ["Seleziona/Deseleziona scala logaritmica"],
				ja: ["ログスケール切り替え"],
				ko: ["로그눈금토글"],
				ms_MY: ["Skala Log Togol"],
				nl_NL: ["Schakel log schaal"],
				pl: ["Przełącz na skalę logarytmiczną"],
				pt: ["Alternar Para Escala Logarítmica"],
				ro: "Toggle Log Scale",
				ru: ["Логарифмическая шкала вкл/выкл"],
				sv: ["Slå på/av Log-skala"],
				th: ["สลับเป็นมาตราแบบล๊อก"],
				tr: ["Logaritmik Ölçeklendirmeyi Aç/Kapat"],
				vi: ["Chuyển đổi Quy mô Đăng nhập"],
				zh: ["切换为对数坐标"],
				zh_TW: ["切換為對數刻度"],
			};
		},
		43737: (e) => {
			e.exports = {
				ar: ["نطاق قياس النسبة المئوية"],
				ca_ES: ["Altarna percentatge"],
				cs: ["Přepnout na Procenta"],
				de: ["Auf Prozent umschalten"],
				el: ["Ποσοστιαία κλίμακα"],
				en: "Toggle Percentage",
				es: ["Alternar porcentaje"],
				fa: "Toggle Percentage",
				fr: ["Echelle en pourcentage"],
				he_IL: ["החלף אחוזים"],
				hu_HU: ["Váltás Százalék"],
				id_ID: ["Toggle Persentase"],
				it: ["Seleziona/Deseleziona percentuale"],
				ja: ["％スケール切り替え"],
				ko: ["백분율토글"],
				ms_MY: ["Peratusan Togol"],
				nl_NL: ["Schakel percentage"],
				pl: ["Włącz skalę procentową"],
				pt: ["Alternar Para Percentagem"],
				ro: "Toggle Percentage",
				ru: ["Процентная шкала вкл/выкл"],
				sv: ["Slå på/av procentsats"],
				th: ["สลับเป็นเปอร์เซ็นต์"],
				tr: ["Yüzde Olarak Değiştir"],
				vi: ["Chuyển đồi Phần trăm"],
				zh: ["切换为百分比坐标"],
				zh_TW: ["切換為百分比"],
			};
		},
		87492: (e) => {
			e.exports = {
				ar: ["توقيت"],
				ca_ES: ["Zona horària"],
				cs: ["Časové pásmo"],
				de: ["Zeitzone"],
				el: "Timezone",
				en: "Timezone",
				es: ["Zona horaria"],
				fa: "Timezone",
				fr: ["Fuseau horaire"],
				he_IL: ["אזור זמן"],
				hu_HU: ["Időzóna"],
				id_ID: ["Zona waktu"],
				it: ["Fuso orario"],
				ja: ["タイムゾーン"],
				ko: ["타임존"],
				ms_MY: ["Zon Waktu"],
				nl_NL: "Timezone",
				pl: ["Strefa czasowa"],
				pt: ["Fuso Horário"],
				ro: "Timezone",
				ru: ["Часовой пояс"],
				sv: ["Tidszon"],
				th: ["เขตเวลา"],
				tr: ["Saat Dilimi"],
				vi: ["Múi giờ"],
				zh: ["时区"],
				zh_TW: ["時區"],
			};
		},
		99983: (e) => {
			e.exports = {
				ar: ["استخدم التسوية في أقرب وقت على الفاصل الزمني اليومي"],
				ca_ES: ["Fer servir la liquidació com a tancament en intervals diaris"],
				cs: "Use settlement as close on daily interval",
				de: ["Settlement als Schlusskurs im Tagesintervall verwenden"],
				el: "Use settlement as close on daily interval",
				en: "Use settlement as close on daily interval",
				es: ["Utilizar la liquidación como cierre en intervalos diarios"],
				fa: "Use settlement as close on daily interval",
				fr: ["Utiliser le règlement comme proche de l'intervalle quotidien"],
				he_IL: ["השתמש בסליקה כסגירה באינטרוול יומי"],
				hu_HU: "Use settlement as close on daily interval",
				id_ID: ["Gunakan penyelesaian sedekat mungkin pada interval harian"],
				it: ["Usa il settlement come chiusura nel giornaliero"],
				ja: ["日足で清算価格を終値として利用"],
				ko: ["데일리 클로즈를 청산가로 쓰기"],
				ms_MY: ["Gunakan penyelesaian sebagai penutup pada selang masa harian"],
				nl_NL: "Use settlement as close on daily interval",
				pl: ["Użyj ceny rozliczenia jako dziennej ceny zamknięcia"],
				pt: ["Usar a liquidação como fechamento no gráfico diário"],
				ro: "Use settlement as close on daily interval",
				ru: [
					"Использовать расчетную цену для цены закрытия на дневном интервале",
				],
				sv: ["Använd avräkning så nära daglig intervallängd"],
				th: ["ใช้การชำระราคาที่ใกล้เคียงกันในแต่ละวัน"],
				tr: ["Ödemeyi günlük aralıklarla yakın olarak kullanma"],
				vi: ["Sử dụng giải quyết càng gần vào khoảng thời gian hàng ngày"],
				zh: ["使用结算价作为每日周期的收盘价"],
				zh_TW: ["使用結算價做為日圖的收盤價"],
			};
		},
		8877: (e) => {
			e.exports = {
				ar: "ext",
				ca_ES: "ext",
				cs: "ext",
				de: ["verl."],
				el: "ext",
				en: "ext",
				es: "ext",
				fa: "ext",
				fr: "ext",
				he_IL: ["הרחב"],
				hu_HU: "ext",
				id_ID: ["perp"],
				it: ["est"],
				ja: ["時間外"],
				ko: ["확장"],
				ms_MY: ["dilanjutkan"],
				nl_NL: "ext",
				pl: ["rozsz"],
				pt: ["est"],
				ro: "ext",
				ru: ["расш"],
				sv: ["utökad"],
				th: ["ต่อ"],
				tr: ["ek"],
				vi: ["mở rộng"],
				zh: ["延时"],
				zh_TW: ["延時"],
			};
		},
		42908: (e) => {
			e.exports = {
				ar: "{str} day",
				ca_ES: "{str} day",
				cs: "{str} day",
				de: ["{str} Tag", "{str} Tage"],
				el: "{str} day",
				en: "{str} day",
				es: ["{str} día", "{str} días"],
				fa: ["{str} days"],
				fr: ["{str} jour", "{str} jours"],
				he_IL: ["{str} יום", "{str} ימים", "{str} ימים", "{str} ימים"],
				hu_HU: ["{str} days"],
				id_ID: ["{str} hari"],
				it: ["{str} giorno", "{str} giorni"],
				ja: ["{str}日"],
				ko: ["{str} 일"],
				ms_MY: ["{str} hari"],
				nl_NL: "{str} day",
				pl: "{str} day",
				pt: ["{str} dia", "{str} dias"],
				ro: "{str} day",
				ru: ["{str} день", "{str} дня", "{str} дней", "{str} дней"],
				sv: "{str} day",
				th: ["{str} days"],
				tr: "{str} day",
				vi: ["{str} days"],
				zh: ["{str} days"],
				zh_TW: ["{str} days"],
			};
		},
		74262: (e) => {
			e.exports = {
				ar: [
					"‎‎{str}‎ يوم",
					"‎‎{str}‎ يوم",
					"‎‎{str}‎ يوم",
					"‎‎{str}‎ يوم",
					"‎‎{str}‎ يوم",
					"‎‎{str}‎ يوم",
				],
				ca_ES: "{str} day",
				cs: "{str} day",
				de: ["{str} Tag", "{str} Tage"],
				el: "{str} day",
				en: "{str} day",
				es: ["{str} día", "{str} días"],
				fa: ["{str} days"],
				fr: ["{str} jour", "{str} jours"],
				he_IL: ["יום ‎{str}‎", "‎{str}‎ ימים", "‎{str}‎ ימים", "‎{str}‎ ימים"],
				hu_HU: ["{str} days"],
				id_ID: ["{str} hari"],
				it: ["{str} giorno", "{str} giorni"],
				ja: ["{str}日"],
				ko: ["{str} 날"],
				ms_MY: ["{str} hari"],
				nl_NL: "{str} day",
				pl: ["{str} dzień", "{str} dni", "{str} dni", "{str} dni"],
				pt: ["{str} dia", "{str} dias"],
				ro: "{str} day",
				ru: ["{str} день", "{str} дня", "{str} дней", "{str} дней"],
				sv: ["{str} dag", "{str} dagar"],
				th: ["{str} days"],
				tr: ["{str} gün", "{str} gün"],
				vi: ["{str} ngày"],
				zh: ["{str}天"],
				zh_TW: ["{str}天"],
			};
		},
		81693: (e) => {
			e.exports = {
				ar: "{str} day intervals",
				ca_ES: "{str} day intervals",
				cs: "{str} day intervals",
				de: ["{str}-tägige Intervalle", "{str}-tägige Intervalle"],
				el: "{str} day intervals",
				en: "{str} day intervals",
				es: ["intervalos de {str} día", "intervalos de {str} días"],
				fa: ["{str} days intervals"],
				fr: ["{str} intervalles de jour", "{str} intervalles de jours"],
				he_IL: [
					"{str} אינטרוולי יום",
					"{str} אינטרוולי ימים",
					"{str} אינטרוולי ימים",
					"{str} אינטרוולי ימים",
				],
				hu_HU: ["{str} days intervals"],
				id_ID: ["{str} interval hari"],
				it: ["Timeframe {str} giorno", "Timeframe {str} giorni"],
				ja: ["{str}日足"],
				ko: ["{str} 일 간격"],
				ms_MY: ["{str} selang hari"],
				nl_NL: "{str} day intervals",
				pl: "{str} day intervals",
				pt: ["intervalos de {str} dia", "intervalos de {str} dias"],
				ro: "{str} day intervals",
				ru: [
					"{str}-дневных интервалах",
					"{str}-дневных интервалах",
					"{str}-дневных интервалах",
					"{str}-дневных интервалах",
				],
				sv: "{str} day intervals",
				th: ["{str} days intervals"],
				tr: "{str} day intervals",
				vi: ["{str} days intervals"],
				zh: ["{str} days intervals"],
				zh_TW: ["{str} days intervals"],
			};
		},
		89020: (e) => {
			e.exports = {
				ar: "{str} hour",
				ca_ES: "{str} hour",
				cs: "{str} hour",
				de: ["{str} Stunde", "{str} Stunden"],
				el: "{str} hour",
				en: "{str} hour",
				es: ["{str} hora", "{str} horas"],
				fa: ["{str} hours"],
				fr: ["{str} heure", "{str} heures"],
				he_IL: ["{str} שעה", "{str} שעות", "{str} שעות", "{str} שעות"],
				hu_HU: ["{str} hours"],
				id_ID: ["{str} jam"],
				it: ["{str} ora", "{str} ore"],
				ja: ["{str}時間"],
				ko: ["{str} 시"],
				ms_MY: ["{str} jam"],
				nl_NL: "{str} hour",
				pl: "{str} hour",
				pt: ["{str} hora", "{str} horas"],
				ro: "{str} hour",
				ru: ["{str} час", "{str} часа", "{str} часов", "{str} часов"],
				sv: "{str} hour",
				th: ["{str} hours"],
				tr: "{str} hour",
				vi: ["{str} hours"],
				zh: ["{str} hours"],
				zh_TW: ["{str} hours"],
			};
		},
		17174: (e) => {
			e.exports = {
				ar: [
					"{str} ساعة",
					"{str} ساعة",
					"{str} ساعة",
					"{str} ساعة",
					"{str} ساعة",
					"{str} ساعة",
				],
				ca_ES: "{str} hour",
				cs: "{str} hour",
				de: ["{str} Stunde", "{str} Stunden"],
				el: "{str} hour",
				en: "{str} hour",
				es: ["{str} hora", "{str} horas"],
				fa: ["{str} hours"],
				fr: ["{str} heure", "{str} heures"],
				he_IL: ["שעה ‎{str}‎", "‎{str}‎ שעות", "‎{str}‎ שעות", "‎{str}‎ שעות"],
				hu_HU: ["{str} hours"],
				id_ID: ["{str} jam"],
				it: ["{str} ora", "{str} ore"],
				ja: ["{str}時間"],
				ko: ["{str} 시간"],
				ms_MY: ["{str} jam"],
				nl_NL: "{str} hour",
				pl: ["{str} godzina", "{str} godziny", "{str} godzin", "{str} godzin"],
				pt: ["{str} hora", "{str} horas"],
				ro: "{str} hour",
				ru: ["{str} час", "{str} часа", "{str} часов", "{str} часов"],
				sv: ["{str} timme", "{str} timmar"],
				th: ["{str} hours"],
				tr: ["{str} saat", "{str} saat"],
				vi: ["{str} giờ"],
				zh: ["{str}小时"],
				zh_TW: ["{str}小時"],
			};
		},
		54028: (e) => {
			e.exports = {
				ar: "{str} hour intervals",
				ca_ES: "{str} hour intervals",
				cs: "{str} hour intervals",
				de: ["{str}-stündige Intervalle", "{str}-stündige Intervalle"],
				el: "{str} hour intervals",
				en: "{str} hour intervals",
				es: ["intervalos de {str} hora", "intervalos de {str} horas"],
				fa: ["{str} hours intervals"],
				fr: ["{str} intervalles d'heure", "{str} intervalles d'heures"],
				he_IL: [
					"{str} אינטרוולי שעה",
					"{str} אינטרוולי שעות",
					"{str} אינטרוולי שעות",
					"{str} אינטרוולי שעות",
				],
				hu_HU: ["{str} hours intervals"],
				id_ID: ["{str} interval jam"],
				it: ["Timeframe {str} ora", "Timeframe {str} ore"],
				ja: ["{str}時間足"],
				ko: ["{str} 시간 간격"],
				ms_MY: ["{str} selang jam"],
				nl_NL: "{str} hour intervals",
				pl: "{str} hour intervals",
				pt: ["intervalos de {str} hora", "intervalos de {str} horas"],
				ro: "{str} hour intervals",
				ru: [
					"{str}-часовых интервалах",
					"{str}-часовых интервалах",
					"{str}-часовых интервалах",
					"{str}-часовых интервалах",
				],
				sv: "{str} hour intervals",
				th: ["{str} hours intervals"],
				tr: "{str} hour intervals",
				vi: ["{str} hours intervals"],
				zh: ["{str} hours intervals"],
				zh_TW: ["{str} hours intervals"],
			};
		},
		3189: (e) => {
			e.exports = {
				ar: "{str} month",
				ca_ES: "{str} month",
				cs: "{str} month",
				de: ["{str} Monat", "{str} Monate"],
				el: "{str} month",
				en: "{str} month",
				es: ["{str} mes", "{str} meses"],
				fa: ["{str} months"],
				fr: ["{str} mois", "{str} mois"],
				he_IL: ["{str} חודש", "{str} חודשים", "{str} חודשים", "{str} חודשים"],
				hu_HU: ["{str} months"],
				id_ID: ["{str} bulan"],
				it: ["{str} mese", "{str} mesi"],
				ja: ["{str}ヶ月"],
				ko: ["{str} 월"],
				ms_MY: ["{str} bulan"],
				nl_NL: "{str} month",
				pl: "{str} month",
				pt: ["{str} mês", "{str} meses"],
				ro: "{str} month",
				ru: ["{str} месяц", "{str} месяца", "{str} месяцев", "{str} месяцев"],
				sv: "{str} month",
				th: ["{str} months"],
				tr: "{str} month",
				vi: ["{str} months"],
				zh: ["{str} months"],
				zh_TW: ["{str} months"],
			};
		},
		28039: (e) => {
			e.exports = {
				ar: [
					"‎{str}‎ شهر",
					"‎{str}‎ شهر",
					"‎{str}‎ شهر",
					"‎{str}‎ شهر",
					"‎{str}‎ شهر",
					"‎{str}‎ شهر",
				],
				ca_ES: "{str} month",
				cs: "{str} month",
				de: ["{str} Monat", "{str} Monate"],
				el: "{str} month",
				en: "{str} month",
				es: ["{str} mes", "{str} meses"],
				fa: ["{str} months"],
				fr: ["{str} mois", "{str} mois"],
				he_IL: ["חודש ‎{str}‎", "‎{str}‎ חודשים", "‎{str}‎ חודשים", "‎{str}‎ חודשים"],
				hu_HU: ["{str} months"],
				id_ID: ["{str} bulan"],
				it: ["{str} mese", "{str} mesi"],
				ja: ["{str}ヶ月"],
				ko: ["{str} 달"],
				ms_MY: ["{str} bulan"],
				nl_NL: "{str} month",
				pl: [
					"{str} miesiąc",
					"{str} miesiące",
					"{str} miesięcy",
					"{str} miesięcy",
				],
				pt: ["{str} mês", "{str} meses"],
				ro: "{str} month",
				ru: ["{str} месяц", "{str} месяца", "{str} месяцев", "{str} месяцев"],
				sv: ["{str} månad", "{str} månader"],
				th: ["{str} months"],
				tr: ["{str} ay", "{str} ay"],
				vi: ["{str} tháng"],
				zh: ["{str}个月"],
				zh_TW: ["{str}月"],
			};
		},
		99773: (e) => {
			e.exports = {
				ar: "{str} month intervals",
				ca_ES: "{str} month intervals",
				cs: "{str} month intervals",
				de: ["{str}-monatige Intervalle", "{str}-monatige Intervalle"],
				el: "{str} month intervals",
				en: "{str} month intervals",
				es: ["intervalos de {str} mes", "intervalos de {str} meses"],
				fa: ["{str} months intervals"],
				fr: ["{str} intervalles de mois", "{str} intervalles de mois"],
				he_IL: [
					"{str} אינטרוולי חודש",
					"{str} אינטרוולי חודשים",
					"{str} אינטרוולי חודשים",
					"{str} אינטרוולי חודשים",
				],
				hu_HU: ["{str} months intervals"],
				id_ID: ["{str} interval bulan"],
				it: ["Timeframe {str} mese", "Timeframe {str} mesi"],
				ja: ["{str}ヶ月足"],
				ko: ["{str} 월 간격"],
				ms_MY: ["{str} selang bulan"],
				nl_NL: "{str} month intervals",
				pl: "{str} month intervals",
				pt: ["intervalos de {str} mês", "intervalos de {str} meses"],
				ro: "{str} month intervals",
				ru: [
					"{str}-месячных интервалах",
					"{str}-месячных интервалах",
					"{str}-месячных интервалах",
					"{str}-месячных интервалах",
				],
				sv: "{str} month intervals",
				th: ["{str} months intervals"],
				tr: "{str} month intervals",
				vi: ["{str} months intervals"],
				zh: ["{str} months intervals"],
				zh_TW: ["{str} months intervals"],
			};
		},
		44795: (e) => {
			e.exports = {
				ar: "{str} minute",
				ca_ES: "{str} minute",
				cs: "{str} minute",
				de: ["{str} Minute", "{str} Minuten"],
				el: "{str} minute",
				en: "{str} minute",
				es: ["{str} minuto", "{str} minutos"],
				fa: ["{str} minutes"],
				fr: "{str} minute",
				he_IL: ["דקה {str}", "דקות {str}", "דקות {str}", "דקות {str}"],
				hu_HU: ["{str} minutes"],
				id_ID: ["{str} menit"],
				it: ["{str} minuto", "{str} minuti"],
				ja: ["{str}分"],
				ko: ["{str} 분"],
				ms_MY: ["{str} minit"],
				nl_NL: "{str} minute",
				pl: "{str} minute",
				pt: ["{str} minuto", "{str} minutos"],
				ro: "{str} minute",
				ru: ["{str} минута", "{str} минуты", "{str} минут", "{str} минут"],
				sv: "{str} minute",
				th: ["{str} minutes"],
				tr: "{str} minute",
				vi: ["{str} minutes"],
				zh: ["{str} minutes"],
				zh_TW: ["{str} minutes"],
			};
		},
		60144: (e) => {
			e.exports = {
				ar: [
					"{str} دقيقة",
					"{str} دقيقة",
					"{str} دقيقة",
					"{str} دقيقة",
					"{str} دقيقة",
					"{str} دقيقة",
				],
				ca_ES: "{str} minute",
				cs: "{str} minute",
				de: ["{str} Minute", "{str} Minuten"],
				el: "{str} minute",
				en: "{str} minute",
				es: ["{str} minuto", "{str} minutos"],
				fa: ["{str} minutes"],
				fr: "{str} minute",
				he_IL: ["דקה {str}", "{str} דקות", "{str} דקות", "{str} דקות"],
				hu_HU: ["{str} minutes"],
				id_ID: ["{str} menit"],
				it: ["{str} minuto", "{str} minuti"],
				ja: ["{str}分"],
				ko: ["{str} 분"],
				ms_MY: ["{str} minit"],
				nl_NL: "{str} minute",
				pl: ["{str} minuta", "{str} minuty", "{str} minut", "{str} minut"],
				pt: ["{str} minuto", "{str} minutos"],
				ro: "{str} minute",
				ru: ["{str} минута", "{str} минуты", "{str} минут", "{str} минут"],
				sv: "{str} minute",
				th: ["{str} minutes"],
				tr: ["{str} dakika", "{str} dakika"],
				vi: ["{str} phút"],
				zh: ["{str}分钟"],
				zh_TW: ["{str}分"],
			};
		},
		56347: (e) => {
			e.exports = {
				ar: "{str} minute intervals",
				ca_ES: "{str} minute intervals",
				cs: "{str} minute intervals",
				de: ["{str}-minütige Intervalle", "{str}-minütige Intervalle"],
				el: "{str} minute intervals",
				en: "{str} minute intervals",
				es: ["intervalos de {str} minuto", "intervalos de {str} minutos"],
				fa: ["{str} minutes intervals"],
				fr: ["{str} intervalles de minute", "{str} intervalles de minutes"],
				he_IL: [
					"{str} אינטרוולי דקה",
					"{str} אינטרוולי דקות",
					"{str} אינטרוולי דקות",
					"{str} אינטרוולי דקות",
				],
				hu_HU: ["{str} minutes intervals"],
				id_ID: ["{str} interval menit"],
				it: ["Timeframe {str} minuto", "Timeframe {str} minuti"],
				ja: ["{str}分足"],
				ko: ["{str} 분 간격"],
				ms_MY: ["{str} selang minit"],
				nl_NL: "{str} minute intervals",
				pl: "{str} minute intervals",
				pt: ["intervalos de {str} minuto", "intervalos de {str} minutos"],
				ro: "{str} minute intervals",
				ru: [
					"{str}-минутных интервалах",
					"{str}-минутных интервалах",
					"{str}-минутных интервалах",
					"{str}-минутных интервалах",
				],
				sv: "{str} minute intervals",
				th: ["{str} minutes intervals"],
				tr: "{str} minute intervals",
				vi: ["{str} minutes intervals"],
				zh: ["{str} minutes intervals"],
				zh_TW: ["{str} minutes intervals"],
			};
		},
		67518: (e) => {
			e.exports = {
				ar: "{str} week",
				ca_ES: "{str} week",
				cs: "{str} week",
				de: ["{str} Woche", "{str} Wochen"],
				el: "{str} week",
				en: "{str} week",
				es: ["{str} semana", "{str} semanas"],
				fa: ["{str} weeks"],
				fr: ["{str} semaine", "{str} semaines"],
				he_IL: ["{str} שבוע", "{str} שבועות", "{str} שבועות", "{str} שבועות"],
				hu_HU: ["{str} weeks"],
				id_ID: ["{str} minggu"],
				it: ["{str} settimana", "{str} settimane"],
				ja: ["{str}週"],
				ko: ["{str} 주"],
				ms_MY: ["{str} minggu"],
				nl_NL: "{str} week",
				pl: "{str} week",
				pt: ["{str} semana", "{str} semanas"],
				ro: "{str} week",
				ru: ["{str} неделя", "{str} недели", "{str} недель", "{str} недель"],
				sv: "{str} week",
				th: ["{str} weeks"],
				tr: "{str} week",
				vi: ["{str} weeks"],
				zh: ["{str} weeks"],
				zh_TW: ["{str} weeks"],
			};
		},
		14074: (e) => {
			e.exports = {
				ar: [
					"‎{str}‎ أسبوع",
					"‎{str}‎ أسبوع",
					"‎{str}‎ أسبوع",
					"‎{str}‎ أسبوع",
					"‎{str}‎ أسبوع",
					"‎{str}‎ أسبوع",
				],
				ca_ES: "{str} week",
				cs: "{str} week",
				de: ["{str} Woche", "{str} Wochen"],
				el: "{str} week",
				en: "{str} week",
				es: ["{str} semana", "{str} semanas"],
				fa: ["{str} weeks"],
				fr: ["{str} semaine", "{str} semaines"],
				he_IL: ["שבוע ‎{str}‎", "‎{str}‎ שבועות", "‎{str}‎ שבועות", "‎{str}‎ שבועות"],
				hu_HU: ["{str} weeks"],
				id_ID: ["{str} minggu"],
				it: ["{str} settimana", "{str} settimane"],
				ja: ["{str}週"],
				ko: ["{str} 주"],
				ms_MY: ["{str} minggu"],
				nl_NL: "{str} week",
				pl: [
					"{str} tydzień",
					"{str} tygodnie",
					"{str} tygodni",
					"{str} tygodni",
				],
				pt: ["{str} semana", "{str} semanas"],
				ro: "{str} week",
				ru: ["{str} неделя", "{str} недели", "{str} недель", "{str} недель"],
				sv: ["{str} vecka", "{str} veckor"],
				th: ["{str} weeks"],
				tr: ["{str} hafta", "{str} hafta"],
				vi: ["{str} tuần"],
				zh: ["{str}周"],
				zh_TW: ["{str}週"],
			};
		},
		58667: (e) => {
			e.exports = {
				ar: "{str} week intervals",
				ca_ES: "{str} week intervals",
				cs: "{str} week intervals",
				de: ["{str}-wöchige Intervalle", "{str}-wöchige Intervalle"],
				el: "{str} week intervals",
				en: "{str} week intervals",
				es: ["intervalos de {str} semana", "intervalos de {str} semanas"],
				fa: ["{str} weeks intervals"],
				fr: ["{str} intervalles de semaine", "{str} intervalles de semaines"],
				he_IL: [
					"{str} אינטרוולי שבוע",
					"{str} אינטרוולי שבועות",
					"{str} אינטרוולי שבועות",
					"{str} אינטרוולי שבועות",
				],
				hu_HU: ["{str} weeks intervals"],
				id_ID: ["{str} interval minggu"],
				it: ["Timeframe {str} settimana", "Timeframe {str} settimane"],
				ja: ["{str}週足"],
				ko: ["{str} 주 간격"],
				ms_MY: ["{str} selang minggu"],
				nl_NL: "{str} week intervals",
				pl: "{str} week intervals",
				pt: ["intervalos de {str} semana", "intervalos de {str} semanas"],
				ro: "{str} week intervals",
				ru: [
					"{str}-недельных интервалах",
					"{str}-недельных интервалах",
					"{str}-недельных интервалах",
					"{str}-недельных интервалах",
				],
				sv: "{str} week intervals",
				th: ["{str} weeks intervals"],
				tr: "{str} week intervals",
				vi: ["{str} weeks intervals"],
				zh: ["{str} weeks intervals"],
				zh_TW: ["{str} weeks intervals"],
			};
		},
		6598: (e) => {
			e.exports = {
				ar: "{str} year",
				ca_ES: "{str} year",
				cs: "{str} year",
				de: ["{str} Jahr", "{str} Jahre"],
				el: "{str} year",
				en: "{str} year",
				es: ["{str} año", "{str} años"],
				fa: ["{str} years"],
				fr: ["{str} an", "{str} ans"],
				he_IL: ["{str} שנה", "{str} שנים", "{str} שנים", "{str} שנים"],
				hu_HU: ["{str} years"],
				id_ID: ["{str} tahun"],
				it: ["{str} anno", "{str} anni"],
				ja: ["{str}年"],
				ko: ["{str} 년"],
				ms_MY: ["{str} tahun"],
				nl_NL: "{str} year",
				pl: "{str} year",
				pt: ["{str} ano", "{str} anos"],
				ro: "{str} year",
				ru: ["{str} год", "{str} года", "{str} лет", "{str} лет"],
				sv: "{str} year",
				th: ["{str} years"],
				tr: "{str} year",
				vi: ["{str} years"],
				zh: ["{str} years"],
				zh_TW: ["{str} years"],
			};
		},
		8222: (e) => {
			e.exports = {
				ar: [
					"‎{str}‎ سنة",
					"‎{str}‎ سنة",
					"‎{str}‎ سنة",
					"‎{str}‎ سنة",
					"‎{str}‎ سنة",
					"‎{str}‎ سنة",
				],
				ca_ES: "{str} year",
				cs: "{str} year",
				de: ["{str} Jahr", "{str} Jahre"],
				el: "{str} year",
				en: "{str} year",
				es: ["{str} año", "{str} años"],
				fa: ["{str} years"],
				fr: ["{str} année", "{str} années"],
				he_IL: ["שנה ‎{str}‎", "‎{str}‎ שנים", "‎{str}‎ שנים", "‎{str}‎ שנים"],
				hu_HU: ["{str} years"],
				id_ID: ["{str} tahun"],
				it: ["{str} anno", "{str} anni"],
				ja: ["{str}年"],
				ko: ["{str} 해"],
				ms_MY: ["{str} tahun"],
				nl_NL: "{str} year",
				pl: ["{str} rok", "{str} lata", "{str} lat", "{str} lat"],
				pt: ["{str} ano", "{str} anos"],
				ro: "{str} year",
				ru: ["{str} год", "{str} года", "{str} лет", "{str} лет"],
				sv: ["{str} år", "{str} år"],
				th: ["{str} years"],
				tr: ["{str} yıl", "{str} yıl"],
				vi: ["{str} năm"],
				zh: ["{str}年"],
				zh_TW: ["{str}年"],
			};
		},
		57849: (e) => {
			e.exports = {
				ar: "{str} year intervals",
				ca_ES: "{str} year intervals",
				cs: "{str} year intervals",
				de: ["{str}-jährige Intervalle", "{str}-jährige Intervalle"],
				el: "{str} year intervals",
				en: "{str} year intervals",
				es: ["intervalos de {str} año", "intervalos de {str} años"],
				fa: ["{str} years intervals"],
				fr: ["{str} intervalles d'année", "{str} intervalles d'années"],
				he_IL: [
					"{str} אינטרוולי שעה",
					"{str} אינטרוולי שעות",
					"{str} אינטרוולי שעות",
					"{str} אינטרוולי שעות",
				],
				hu_HU: ["{str} years intervals"],
				id_ID: ["{str} interval tahun"],
				it: ["Timeframe {str} anno", "Timeframe {str} anni"],
				ja: ["{str}年足"],
				ko: ["{str} 년 간격"],
				ms_MY: ["{str} selang tahun"],
				nl_NL: "{str} year intervals",
				pl: "{str} year intervals",
				pt: ["intervalos de {str} ano", "intervalos de {str} anos"],
				ro: "{str} year intervals",
				ru: [
					"{str}-летних интервалах",
					"{str}-летних интервалах",
					"{str}-летних интервалах",
					"{str}-летних интервалах",
				],
				sv: "{str} year intervals",
				th: ["{str} years intervals"],
				tr: "{str} year intervals",
				vi: ["{str} years intervals"],
				zh: ["{str} years intervals"],
				zh_TW: ["{str} years intervals"],
			};
		},
	},
]);
