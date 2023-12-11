(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[5901],
	{
		59142: (e, t) => {
			let n;
			let o;
			let r;
			(o = [t]),
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
						const o = {
							get passive() {
								n = !0;
							},
						};
						window.addEventListener("testPassive", null, o),
							window.removeEventListener("testPassive", null, o);
					}
					const r =
						"undefined" !== typeof window &&
						window.navigator &&
						window.navigator.platform &&
						/iP(ad|hone|od)/.test(window.navigator.platform);
					let s = [];
					let a = !1;
					let i = -1;
					let l = void 0;
					let c = void 0;
					const u = (e) =>
						s.some(
							(t) =>
								!(!t.options.allowTouchMove || !t.options.allowTouchMove(e)),
						);
					const p = (e) => {
						const t = e || window.event;
						return (
							!!u(t.target) ||
							1 < t.touches.length ||
							(t.preventDefault?.(), !1)
						);
					};
					const d = () => {
						setTimeout(() => {
							void 0 !== c &&
								((document.body.style.paddingRight = c), (c = void 0)),
								void 0 !== l &&
									((document.body.style.overflow = l), (l = void 0));
						});
					};
					(e.disableBodyScroll = (e, o) => {
						if (r) {
							if (!e)
								return void console.error(
									"disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.",
								);
							if (e && !s.some((t) => t.targetElement === e)) {
								const d = { targetElement: e, options: o || {} };
								(s = [].concat(t(s), [d])),
									(e.ontouchstart = (e) => {
										1 === e.targetTouches.length &&
											(i = e.targetTouches[0].clientY);
									}),
									(e.ontouchmove = (t) => {
										let n;
										let o;
										let r;
										let s;
										1 === t.targetTouches.length &&
											((o = e),
											(s = (n = t).targetTouches[0].clientY - i),
											!u(n.target) &&
												((o && 0 === o.scrollTop && 0 < s) ||
												((r = o) &&
													r.scrollHeight - r.scrollTop <= r.clientHeight &&
													s < 0)
													? p(n)
													: n.stopPropagation()));
									}),
									a ||
										(document.addEventListener(
											"touchmove",
											p,
											n ? { passive: !1 } : void 0,
										),
										(a = !0));
							}
						} else {
							(m = o),
								setTimeout(() => {
									if (void 0 === c) {
										const e = !!m && !0 === m.reserveScrollBarGap;
										const t =
											window.innerWidth - document.documentElement.clientWidth;
										e &&
											0 < t &&
											((c = document.body.style.paddingRight),
											(document.body.style.paddingRight = `${t}px`));
									}
									void 0 === l &&
										((l = document.body.style.overflow),
										(document.body.style.overflow = "hidden"));
								});
							const h = { targetElement: e, options: o || {} };
							s = [].concat(t(s), [h]);
						}
						let m;
					}),
						(e.clearAllBodyScrollLocks = () => {
							r
								? (s.forEach((e) => {
										(e.targetElement.ontouchstart = null),
											(e.targetElement.ontouchmove = null);
								  }),
								  a &&
										(document.removeEventListener(
											"touchmove",
											p,
											n ? { passive: !1 } : void 0,
										),
										(a = !1)),
								  (s = []),
								  (i = -1))
								: (d(), (s = []));
						}),
						(e.enableBodyScroll = (e) => {
							if (r) {
								if (!e)
									return void console.error(
										"enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.",
									);
								(e.ontouchstart = null),
									(e.ontouchmove = null),
									(s = s.filter((t) => t.targetElement !== e)),
									a &&
										0 === s.length &&
										(document.removeEventListener(
											"touchmove",
											p,
											n ? { passive: !1 } : void 0,
										),
										(a = !1));
							} else
								1 === s.length && s[0].targetElement === e
									? (d(), (s = []))
									: (s = s.filter((t) => t.targetElement !== e));
						});
				}),
				void 0 === (r = "function" === typeof n ? n.apply(t, o) : n) ||
					(e.exports = r);
		},
		23428: (e) => {
			e.exports = {
				button: "button-PYEOTd6i",
				disabled: "disabled-PYEOTd6i",
				hidden: "hidden-PYEOTd6i",
				icon: "icon-PYEOTd6i",
				dropped: "dropped-PYEOTd6i",
			};
		},
		70048: (e) => {
			e.exports = {
				wrapper: "wrapper-GZajBGIm",
				input: "input-GZajBGIm",
				box: "box-GZajBGIm",
				icon: "icon-GZajBGIm",
				noOutline: "noOutline-GZajBGIm",
				"intent-danger": "intent-danger-GZajBGIm",
				check: "check-GZajBGIm",
				dot: "dot-GZajBGIm",
			};
		},
		69789: (e) => {
			e.exports = {
				checkbox: "checkbox-vyj6oJxw",
				reverse: "reverse-vyj6oJxw",
				label: "label-vyj6oJxw",
				baseline: "baseline-vyj6oJxw",
			};
		},
		22623: (e) => {
			e.exports = {
				"textarea-container": "textarea-container-x5KHDULU",
				"change-highlight": "change-highlight-x5KHDULU",
				focused: "focused-x5KHDULU",
				"resize-vertical": "resize-vertical-x5KHDULU",
				"resize-horizontal": "resize-horizontal-x5KHDULU",
				"resize-both": "resize-both-x5KHDULU",
				textarea: "textarea-x5KHDULU",
				"with-icon": "with-icon-x5KHDULU",
				endslot: "endslot-x5KHDULU",
			};
		},
		78370: (e) => {
			e.exports = {
				"icon-wrapper": "icon-wrapper-EZuD3gZZ",
				"no-active-state": "no-active-state-EZuD3gZZ",
				"with-tooltip": "with-tooltip-EZuD3gZZ",
				"intent-default": "intent-default-EZuD3gZZ",
				"intent-danger": "intent-danger-EZuD3gZZ",
				"intent-warning": "intent-warning-EZuD3gZZ",
				"intent-success": "intent-success-EZuD3gZZ",
				icon: "icon-EZuD3gZZ",
			};
		},
		88400: (e) => {
			e.exports = {
				radio: "radio-ALqkCUvs",
				input: "input-ALqkCUvs",
				box: "box-ALqkCUvs",
				reverse: "reverse-ALqkCUvs",
				label: "label-ALqkCUvs",
				wrapper: "wrapper-ALqkCUvs",
				noOutline: "noOutline-ALqkCUvs",
			};
		},
		52272: (e) => {
			e.exports = {
				wrap: "wrap-QStmZL8l",
				thicknessItem: "thicknessItem-QStmZL8l",
				checked: "checked-QStmZL8l",
				accessible: "accessible-QStmZL8l",
				focusVisible: "focusVisible-QStmZL8l",
				radio: "radio-QStmZL8l",
				bar: "bar-QStmZL8l",
			};
		},
		12863: (e) => {
			e.exports = { innerLabel: "innerLabel-DjbvBF5Y" };
		},
		21234: (e) => {
			e.exports = {
				controlWrapper: "controlWrapper-DBTazUk2",
				hidden: "hidden-DBTazUk2",
				control: "control-DBTazUk2",
				controlIncrease: "controlIncrease-DBTazUk2",
				controlDecrease: "controlDecrease-DBTazUk2",
				controlIcon: "controlIcon-DBTazUk2",
				title: "title-DBTazUk2",
			};
		},
		60015: (e) => {
			e.exports = {
				wrap: "wrap-ne5qGlZh",
				icon: "icon-ne5qGlZh",
				text: "text-ne5qGlZh",
				disabled: "disabled-ne5qGlZh",
			};
		},
		28685: (e) => {
			e.exports = {
				colorPickerWrap: "colorPickerWrap-Sw_a4qpB",
				focused: "focused-Sw_a4qpB",
				readonly: "readonly-Sw_a4qpB",
				disabled: "disabled-Sw_a4qpB",
				"size-small": "size-small-Sw_a4qpB",
				"size-medium": "size-medium-Sw_a4qpB",
				"size-large": "size-large-Sw_a4qpB",
				"font-size-small": "font-size-small-Sw_a4qpB",
				"font-size-medium": "font-size-medium-Sw_a4qpB",
				"font-size-large": "font-size-large-Sw_a4qpB",
				"border-none": "border-none-Sw_a4qpB",
				shadow: "shadow-Sw_a4qpB",
				"border-thin": "border-thin-Sw_a4qpB",
				"border-thick": "border-thick-Sw_a4qpB",
				"intent-default": "intent-default-Sw_a4qpB",
				"intent-success": "intent-success-Sw_a4qpB",
				"intent-warning": "intent-warning-Sw_a4qpB",
				"intent-danger": "intent-danger-Sw_a4qpB",
				"intent-primary": "intent-primary-Sw_a4qpB",
				"corner-top-left": "corner-top-left-Sw_a4qpB",
				"corner-top-right": "corner-top-right-Sw_a4qpB",
				"corner-bottom-right": "corner-bottom-right-Sw_a4qpB",
				"corner-bottom-left": "corner-bottom-left-Sw_a4qpB",
				colorPicker: "colorPicker-Sw_a4qpB",
				swatch: "swatch-Sw_a4qpB",
				placeholderContainer: "placeholderContainer-Sw_a4qpB",
				placeholder: "placeholder-Sw_a4qpB",
				mixedColor: "mixedColor-Sw_a4qpB",
				white: "white-Sw_a4qpB",
				opacitySwatch: "opacitySwatch-Sw_a4qpB",
				colorLine: "colorLine-Sw_a4qpB",
				multiWidth: "multiWidth-Sw_a4qpB",
				line: "line-Sw_a4qpB",
				thicknessContainer: "thicknessContainer-Sw_a4qpB",
				thicknessTitle: "thicknessTitle-Sw_a4qpB",
			};
		},
		86536: (e) => {
			e.exports = {
				thicknessContainer: "thicknessContainer-C05zSid7",
				thicknessTitle: "thicknessTitle-C05zSid7",
			};
		},
		69006: (e) => {
			e.exports = {
				hasTooltip: "hasTooltip-DcvaoxPU",
				uppercase: "uppercase-DcvaoxPU",
			};
		},
		2746: (e) => {
			e.exports = { wrap: "wrap-Q2NZ0gvI" };
		},
		25679: (e) => {
			e.exports = { checkbox: "checkbox-FG0u1J5p", title: "title-FG0u1J5p" };
		},
		41125: (e) => {
			e.exports = { hintButton: "hintButton-qEI9XsjF" };
		},
		69750: (e) => {
			e.exports = { titleWrap: "titleWrap-SexRbl__", title: "title-SexRbl__" };
		},
		63581: (e) => {
			e.exports = { accessible: "accessible-HBcDEU4c" };
		},
		93402: (e) => {
			e.exports = {
				container: "container-mdcOkvbj",
				sectionTitle: "sectionTitle-mdcOkvbj",
				separator: "separator-mdcOkvbj",
				customButton: "customButton-mdcOkvbj",
				accessible: "accessible-mdcOkvbj",
			};
		},
		80679: (e) => {
			e.exports = {
				container: "container-iiEYaqPD",
				form: "form-iiEYaqPD",
				swatch: "swatch-iiEYaqPD",
				inputWrap: "inputWrap-iiEYaqPD",
				inputHash: "inputHash-iiEYaqPD",
				input: "input-iiEYaqPD",
				buttonWrap: "buttonWrap-iiEYaqPD",
				hueSaturationWrap: "hueSaturationWrap-iiEYaqPD",
				saturation: "saturation-iiEYaqPD",
				hue: "hue-iiEYaqPD",
			};
		},
		1369: (e) => {
			e.exports = {
				hue: "hue-r4uo5Wn6",
				pointer: "pointer-r4uo5Wn6",
				pointerContainer: "pointerContainer-r4uo5Wn6",
			};
		},
		30099: (e) => {
			e.exports = {
				opacity: "opacity-EnWts7Xu",
				opacitySlider: "opacitySlider-EnWts7Xu",
				opacitySliderGradient: "opacitySliderGradient-EnWts7Xu",
				pointer: "pointer-EnWts7Xu",
				dragged: "dragged-EnWts7Xu",
				opacityPointerWrap: "opacityPointerWrap-EnWts7Xu",
				opacityInputWrap: "opacityInputWrap-EnWts7Xu",
				opacityInput: "opacityInput-EnWts7Xu",
				opacityInputPercent: "opacityInputPercent-EnWts7Xu",
				accessible: "accessible-EnWts7Xu",
			};
		},
		35257: (e) => {
			e.exports = {
				saturation: "saturation-NFNfqP2w",
				pointer: "pointer-NFNfqP2w",
			};
		},
		87466: (e) => {
			e.exports = {
				swatches: "swatches-sfn7Lezv",
				swatch: "swatch-sfn7Lezv",
				hover: "hover-sfn7Lezv",
				empty: "empty-sfn7Lezv",
				white: "white-sfn7Lezv",
				selected: "selected-sfn7Lezv",
				contextItem: "contextItem-sfn7Lezv",
				row: "row-sfn7Lezv",
			};
		},
		66986: (e) => {
			e.exports = {
				button: "button-tFul0OhX",
				"button-children": "button-children-tFul0OhX",
				hiddenArrow: "hiddenArrow-tFul0OhX",
				invisibleFocusHandler: "invisibleFocusHandler-tFul0OhX",
			};
		},
		60673: (e) => {
			e.exports = { placeholder: "placeholder-V6ceS6BN" };
		},
		70673: (e, t, n) => {
			n.d(t, { CheckboxInput: () => u });
			const o = n(50959);
			const r = n(97754);
			const s = n(90186);
			const a = n(9745);
			const i = n(65890);
			const l = n(70048);
			const c = n.n(l);
			function u(e) {
				const t = r(c().box, c()[`intent-${e.intent}`], {
					[c().check]: !e.indeterminate,
					[c().dot]: Boolean(e.indeterminate),
					[c().noOutline]: -1 === e.tabIndex,
				});
				const n = r(c().wrapper, e.className);
				return o.createElement(
					"span",
					{ className: n, title: e.title, style: e.style },
					o.createElement("input", {
						id: e.id,
						tabIndex: e.tabIndex,
						className: c().input,
						type: "checkbox",
						name: e.name,
						checked: e.checked,
						disabled: e.disabled,
						value: e.value,
						autoFocus: e.autoFocus,
						role: e.role,
						onChange: () => {
							e.onChange?.(e.value);
						},
						ref: e.reference,
						"aria-required": e["aria-required"],
						"aria-describedby": e["aria-describedby"],
						"aria-invalid": e["aria-invalid"],
						...(0, s.filterDataProps)(e),
					}),
					o.createElement(
						"span",
						{ className: t },
						o.createElement(a.Icon, { icon: i, className: c().icon }),
					),
				);
			}
		},
		15294: (e, t, n) => {
			n.d(t, { Checkbox: () => c });
			const o = n(50959);
			const r = n(97754);
			const s = n(57733);
			const a = n(70673);
			const i = n(69789);
			const l = n.n(i);
			class c extends o.PureComponent {
				render() {
					const { inputClassName: e, labelClassName: t, ...n } = this.props;
					const s = r(this.props.className, l().checkbox, {
						[l().reverse]: Boolean(this.props.labelPositionReverse),
						[l().baseline]: Boolean(this.props.labelAlignBaseline),
					});
					const i = r(l().label, t, { [l().disabled]: this.props.disabled });
					let c = null;
					return (
						this.props.label &&
							(c = o.createElement(
								"span",
								{ className: i, title: this.props.title },
								this.props.label,
							)),
						o.createElement(
							"label",
							{ className: s },
							o.createElement(a.CheckboxInput, { ...n, className: e }),
							c,
						)
					);
				}
			}
			c.defaultProps = { value: "on" };
			(0, s.makeSwitchGroupItem)(c);
		},
		2568: (e, t, n) => {
			n.d(t, { Textarea: () => C });
			let o;
			const r = n(50959);
			const s = n(97754);
			const a = n(38528);
			const i = n(29202);
			const l = n(48027);
			const c = n(45812);
			const u = n(47201);
			const p = n(48907);
			const d = n(67029);
			const h = n(78274);
			const m = n(22623);
			const v = n.n(m);
			!((e) => {
				(e.None = "none"),
					(e.Vertical = "vertical"),
					(e.Horizontal = "horizontal"),
					(e.Both = "both");
			})(o || (o = {}));
			const g = r.forwardRef((e, t) => {
				const {
					id: n,
					title: o,
					tabIndex: a,
					containerTabIndex: i,
					role: l,
					inputClassName: c,
					autoComplete: u,
					autoFocus: p,
					cols: m,
					disabled: g,
					isFocused: f,
					form: b,
					maxLength: C,
					minLength: y,
					name: E,
					placeholder: S,
					readonly: w,
					required: _,
					rows: x,
					value: N,
					defaultValue: I,
					wrap: T,
					containerReference: B,
					onChange: k,
					onSelect: P,
					onFocus: D,
					onContainerFocus: L,
					onBlur: M,
					"aria-describedby": O,
					"aria-required": F,
					"aria-invalid": V,
					hasIcon: A,
					endSlot: R,
					hasAttachImage: W,
					...q
				} = e;
				const z = {
					id: n,
					title: o,
					tabIndex: a,
					role: l,
					autoComplete: u,
					autoFocus: p,
					cols: m,
					disabled: g,
					form: b,
					maxLength: C,
					minLength: y,
					name: E,
					placeholder: S,
					readOnly: w,
					required: _,
					rows: x,
					value: N,
					defaultValue: I,
					wrap: T,
					onChange: k,
					onSelect: P,
					onFocus: D,
					onBlur: M,
					"aria-describedby": O,
					"aria-required": F,
					"aria-invalid": V,
				};
				return r.createElement(d.ControlSkeleton, {
					...q,
					tabIndex: i,
					disabled: g,
					readonly: w,
					isFocused: f,
					ref: B,
					onFocus: L,
					middleSlot: r.createElement(
						h.MiddleSlot,
						null,
						r.createElement("textarea", {
							...z,
							className: s(v().textarea, c, R && v().endslot),
							ref: t,
						}),
					),
					...(R && {
						endSlot: r.createElement(
							"span",
							{ className: s(!W && v()["with-icon"]) },
							R,
						),
					}),
				});
			});
			g.displayName = "TextareaView";
			const f = (e, t, n) => (t ? void 0 : e ? -1 : n);
			const b = (e, t, n) => (t ? void 0 : e ? n : -1);
			const C = r.forwardRef((e, t) => {
				e = (0, l.useControl)(e);
				const {
					className: n,
					disabled: d,
					autoSelectOnFocus: h,
					tabIndex: m = 0,
					borderStyle: C,
					highlight: y,
					resize: E,
					containerReference: S = null,
					onFocus: w,
					onBlur: _,
					hasIcon: x,
					...N
				} = e;
				const I = (0, r.useRef)(null);
				const T = (0, r.useRef)(null);
				const {
					isMouseDown: B,
					handleMouseDown: k,
					handleMouseUp: P,
				} = (0, c.useIsMouseDown)();
				const [D, L] = (0, i.useFocus)();
				const M = (0, u.createSafeMulticastEventHandler)(
					L.onFocus,
					(e) => {
						h && !B.current && (0, p.selectAllContent)(e.currentTarget);
					},
					w,
				);
				const O = (0, u.createSafeMulticastEventHandler)(L.onBlur, _);
				const F = void 0 !== E && E !== o.None;
				const V = null != C ? C : F ? (y ? "thick" : "thin") : void 0;
				const A = null != y ? y : !F && void 0;
				return r.createElement(g, {
					...N,
					className: s(
						v()["textarea-container"],
						F && v()["change-highlight"],
						E && E !== o.None && v()[`resize-${E}`],
						D && v().focused,
						n,
					),
					disabled: d,
					isFocused: D,
					containerTabIndex: f(D, d, m),
					tabIndex: b(D, d, m),
					borderStyle: V,
					highlight: A,
					onContainerFocus: (e) => {
						T.current === e.target && null !== I.current && I.current.focus();
					},
					onFocus: M,
					onBlur: O,
					onMouseDown: k,
					onMouseUp: P,
					ref: (e) => {
						(I.current = e),
							"function" === typeof t ? t(e) : t && (t.current = e);
					},
					containerReference: (0, a.useMergedRefs)([S, T]),
					hasIcon: x,
				});
			});
			C.displayName = "Textarea";
		},
		36104: (e, t, n) => {
			n.d(t, { useControlDisclosure: () => r });
			const o = n(7953);
			function r(e) {
				const { intent: t, highlight: n, ...r } = e;
				const { isFocused: s, ...a } = (0, o.useDisclosure)(r);
				return {
					...a,
					isFocused: s,
					highlight: null != n ? n : s,
					intent: null != t ? t : s ? "primary" : "default",
				};
			}
		},
		57733: (e, t, n) => {
			n.d(t, { SwitchGroup: () => a, makeSwitchGroupItem: () => i });
			const o = n(50959);
			const r = () => {};
			const s = (0, o.createContext)({
				getName: () => "",
				getValues: () => [],
				getOnChange: () => r,
				subscribe: r,
				unsubscribe: r,
			});
			class a extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._subscriptions = new Set()),
						(this._getName = () => this.props.name),
						(this._getValues = () => this.props.values),
						(this._getOnChange = () => this.props.onChange),
						(this._subscribe = (e) => {
							this._subscriptions.add(e);
						}),
						(this._unsubscribe = (e) => {
							this._subscriptions.delete(e);
						}),
						(this.state = {
							switchGroupContext: {
								getName: this._getName,
								getValues: this._getValues,
								getOnChange: this._getOnChange,
								subscribe: this._subscribe,
								unsubscribe: this._unsubscribe,
							},
						});
				}
				render() {
					return o.createElement(
						s.Provider,
						{ value: this.state.switchGroupContext },
						this.props.children,
					);
				}
				componentDidUpdate(e) {
					this._notify(this._getUpdates(this.props.values, e.values));
				}
				_notify(e) {
					this._subscriptions.forEach((t) => t(e));
				}
				_getUpdates(e, t) {
					return [...t, ...e].filter((n) =>
						t.includes(n) ? !e.includes(n) : e.includes(n),
					);
				}
			}
			function i(e) {
				let t;
				return (
					(t = class extends o.PureComponent {
						constructor() {
							super(...arguments),
								(this._onChange = (e) => {
									this.context.getOnChange()(e);
								}),
								(this._onUpdate = (e) => {
									e.includes(this.props.value) && this.forceUpdate();
								});
						}
						componentDidMount() {
							this.context.subscribe(this._onUpdate);
						}
						render() {
							return o.createElement(e, {
								...this.props,
								name: this._getName(),
								onChange: this._onChange,
								checked: this._isChecked(),
							});
						}
						componentWillUnmount() {
							this.context.unsubscribe(this._onUpdate);
						}
						_getName() {
							return this.context.getName();
						}
						_isChecked() {
							return this.context.getValues().includes(this.props.value);
						}
					}),
					(t.contextType = s),
					t
				);
			}
		},
		92399: (e, t, n) => {
			n.d(t, { NumberInputView: () => T });
			const o = n(50959);
			const r = n(32563);
			const s = n(97754);
			const a = n(67029);
			const i = n(78274);
			const l = n(86623);
			const c = n(95263);
			const u = n(1405);
			const p = n(12863);
			const d = {
				large: a.InputClasses.FontSizeLarge,
				medium: a.InputClasses.FontSizeMedium,
			};
			const h = {
				attachment: u.anchors.top.attachment,
				targetAttachment: u.anchors.top.targetAttachment,
				attachmentOffsetY: -4,
			};
			function m(e) {
				const {
					className: t,
					inputClassName: n,
					stretch: r = !0,
					errorMessage: a,
					fontSizeStyle: u = "large",
					endSlot: m,
					button: v,
					error: g,
					warning: f,
					innerLabel: b,
					inputReference: C,
					children: y,
					...E
				} = e;
				const S = g && void 0 !== a ? [a] : void 0;
				const w = f && void 0 !== a ? [a] : void 0;
				const _ = s(p.inputContainer, d[u], t);
				const x = b
					? o.createElement(
							i.StartSlot,
							{ className: p.innerLabel, interactive: !1 },
							b,
					  )
					: void 0;
				const N =
					m || v || y ? o.createElement(i.EndSlot, null, m, v, y) : void 0;
				return o.createElement(l.FormInput, {
					...E,
					className: _,
					inputClassName: n,
					errors: S,
					warnings: w,
					hasErrors: g,
					hasWarnings: f,
					messagesPosition: c.MessagesPosition.Attached,
					customErrorsAttachment: h,
					messagesRoot: "document",
					inheritMessagesWidthFromTarget: !0,
					disableMessagesRtlStyles: !0,
					iconHidden: !0,
					stretch: r,
					reference: C,
					startSlot: x,
					endSlot: N,
				});
			}
			const v = n(38528);
			const g = n(44352);
			const f = n(9745);
			const b = n(21861);
			const C = n(2948);
			const y = n(21234);
			function E(e) {
				const t = s(y.control, y.controlIncrease);
				const r = s(y.control, y.controlDecrease);
				return o.createElement(
					o.Fragment,
					null,
					void 0 !== e.title &&
						o.createElement("div", { className: y.title }, e.title),
					o.createElement(
						"div",
						{ className: y.controlWrapper },
						(e.defaultButtonsVisible || e.title) &&
							o.createElement(
								o.Fragment,
								null,
								o.createElement(
									"button",
									{
										type: "button",
										tabIndex: -1,
										"aria-label": g.t(null, void 0, n(46812)),
										className: t,
										onClick: e.increaseValue,
										onMouseDown: b.preventDefault,
									},
									o.createElement(f.Icon, {
										icon: C,
										className: y.controlIcon,
									}),
								),
								o.createElement(
									"button",
									{
										type: "button",
										tabIndex: -1,
										"aria-label": g.t(null, void 0, n(56095)),
										className: r,
										onClick: e.decreaseValue,
										onMouseDown: b.preventDefault,
									},
									o.createElement(f.Icon, {
										icon: C,
										className: y.controlIcon,
									}),
								),
							),
					),
				);
			}
			const S = n(70412);
			const w = n(29202);
			const _ = n(47201);
			const x = n(68335);
			const N = [38];
			const I = [40];
			function T(e) {
				const [t, n] = (0, S.useHover)();
				const [s, a] = (0, w.useFocus)();
				const i = (0, o.useRef)(null);
				const l = (0, _.createSafeMulticastEventHandler)(a.onFocus, e.onFocus);
				const c = (0, _.createSafeMulticastEventHandler)(a.onBlur, e.onBlur);
				const u = (0, o.useCallback)(
					(t) => {
						!e.disabled &&
							s &&
							(t.preventDefault(),
							t.deltaY < 0
								? e.onValueByStepChange(1)
								: e.onValueByStepChange(-1));
					},
					[s, e.disabled, e.onValueByStepChange],
				);
				return o.createElement(m, {
					...n,
					id: e.id,
					name: e.name,
					pattern: e.pattern,
					borderStyle: e.borderStyle,
					fontSizeStyle: e.fontSizeStyle,
					value: e.value,
					className: e.className,
					inputClassName: e.inputClassName,
					button: (() => {
						const {
							button: n,
							forceShowControls: a,
							disabled: i,
							title: l,
						} = e;
						const c = !i && !r.mobiletouch && (a || s || t);
						return i
							? void 0
							: o.createElement(
									o.Fragment,
									null,
									null != n
										? n
										: o.createElement(E, {
												increaseValue: p,
												decreaseValue: d,
												defaultButtonsVisible: c,
												title: l,
										  }),
							  );
					})(),
					disabled: e.disabled,
					placeholder: e.placeholder,
					innerLabel: e.innerLabel,
					endSlot: e.endSlot,
					containerReference: (0, v.useMergedRefs)([i, e.containerReference]),
					inputReference: e.inputReference,
					inputMode: e.inputMode,
					type: e.type,
					warning: e.warning,
					error: e.error,
					errorMessage: e.errorMessage,
					onClick: e.onClick,
					onFocus: l,
					onBlur: c,
					onChange: e.onValueChange,
					onKeyDown: (t) => {
						if (e.disabled || 0 !== (0, x.modifiersFromEvent)(t.nativeEvent))
							return;
						let n = N;
						let o = I;
						e.controlDecKeyCodes && (o = o.concat(e.controlDecKeyCodes));
						e.controlIncKeyCodes && (n = n.concat(e.controlIncKeyCodes));
						(o.includes(t.keyCode) || n.includes(t.keyCode)) &&
							(t.preventDefault(),
							e.onValueByStepChange(o.includes(t.keyCode) ? -1 : 1));
						e.onKeyDown?.(t);
					},
					onWheelNoPassive: u,
					stretch: e.stretch,
					intent: e.intent,
					highlight: e.highlight,
					highlightRemoveRoundBorder: e.highlightRemoveRoundBorder,
					autoSelectOnFocus: e.autoSelectOnFocus,
					"data-property-id": e["data-name"],
				});
				function p() {
					let t;
					e.disabled ||
						(null === (t = i.current) || void 0 === t || t.focus(),
						e.onValueByStepChange(1));
				}
				function d() {
					let t;
					e.disabled ||
						(null === (t = i.current) || void 0 === t || t.focus(),
						e.onValueByStepChange(-1));
				}
			}
		},
		58593: (e, t, n) => {
			n.d(t, {
				ColorSelect: () => T,
			});
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(50151);
			const i = n(68335);
			const l = n(20520);
			const c = n(29202);
			const u = n(34381);
			const p = n(64706);
			const d = n(16838);
			const h = n(71468);
			const m = n(63581);
			function v(e) {
				const {
					button: t,
					children: n,
					className: r,
					onPopupClose: v,
					"data-name": g,
					onColorChange: f,
					disabled: b,
					...C
				} = e;
				const [y, E] = (0, o.useState)(!1);
				const [S, w] = (0, o.useState)(!1);
				const [_, x] = (0, c.useFocus)();
				const N = (0, o.useRef)(null);
				const I = (0, o.useRef)(null);
				const T = (0, o.useRef)(null);
				return o.createElement(
					"div",
					{ className: r, "data-name": g },
					o.createElement(
						"button",
						{
							className: s()(d.PLATFORM_ACCESSIBILITY_ENABLED && m.accessible),
							tabIndex: d.PLATFORM_ACCESSIBILITY_ENABLED && !b ? 0 : -1,
							ref: T,
							onClick: () => {
								if (e.disabled) return;
								w((e) => !e), E(!1);
							},
							onFocus: x.onFocus,
							onBlur: x.onBlur,
							disabled: b,
						},
						"function" === typeof t ? t(S, _) : t,
					),
					o.createElement(
						l.PopupMenu,
						{
							reference: I,
							controller: N,
							onFocus: (e) => {
								if (
									!e.target ||
									!d.PLATFORM_ACCESSIBILITY_ENABLED ||
									e.target !== e.currentTarget
								)
									return;
								const t = e.currentTarget;
								const n = (0, a.ensureNotNull)(
									((o = e.target),
									o.querySelector(
										'[data-role="swatch"]:not([disabled], [aria-disabled])',
									)),
								);
								let o;
								(0, h.becomeMainElement)(n),
									setTimeout(() => {
										if (
											document.activeElement !== t ||
											!e.target.matches(":focus-visible")
										)
											return;
										const [n] = (0, d.queryTabbableElements)(t).sort(
											d.navigationOrderComparator,
										);
										n?.focus();
									});
							},
							isOpened: S,
							onClose: B,
							position: () => {
								const e = (0, a.ensureNotNull)(
									T.current,
								).getBoundingClientRect();
								return { x: e.left, y: e.top + e.height };
							},
							doNotCloseOn: T.current,
							onKeyDown: (e) => {
								if (27 === (0, i.hashFromEvent)(e))
									S && (e.preventDefault(), B());
							},
							onOpen: () => {
								let e;
								if (!d.PLATFORM_ACCESSIBILITY_ENABLED) return;
								null === (e = N.current) || void 0 === e || e.focus();
							},
							tabIndex: d.PLATFORM_ACCESSIBILITY_ENABLED ? -1 : void 0,
						},
						o.createElement(p.MenuContext.Consumer, null, (e) =>
							o.createElement(u.ColorPicker, {
								...C,
								onColorChange: f,
								onToggleCustom: E,
								menu: e,
							}),
						),
						!y && n,
					),
				);
				function B() {
					w(!1), (0, a.ensureNotNull)(T.current).focus(), v?.();
				}
			}
			const g = n(56512);
			const f = n(87095);
			const b = n(6914);
			const C = n(44352);
			const y = n(57733);
			const E = n(52272);
			const S = (0, y.makeSwitchGroupItem)(
				class extends o.PureComponent {
					constructor(e) {
						super(e),
							(this._onChange = () => {
								this.props.onChange?.(this.props.value);
							}),
							(this._handleFocus = (e) => {
								d.PLATFORM_ACCESSIBILITY_ENABLED &&
									e.target.matches(":focus-visible") &&
									this.setState({ isFocusVisible: !0 });
							}),
							(this._handleBlur = () => {
								this.state.isFocusVisible &&
									this.setState({ isFocusVisible: !1 });
							}),
							(this.state = { isFocusVisible: !1 });
					}
					render() {
						const { name: e, checked: t, value: n } = this.props;
						const s = r(E.thicknessItem, {
							[E.checked]: t,
							[E.accessible]: d.PLATFORM_ACCESSIBILITY_ENABLED,
							[E.focusVisible]: this.state.isFocusVisible,
						});
						const a = r(E.bar, { [E.checked]: t });
						const i = { borderTopWidth: parseInt(n) };
						return o.createElement(
							"div",
							{ className: s },
							o.createElement("input", {
								type: "radio",
								className: E.radio,
								name: e,
								value: n,
								onChange: this._onChange,
								onFocus: this._handleFocus,
								onBlur: this._handleBlur,
								checked: t,
								tabIndex: d.PLATFORM_ACCESSIBILITY_ENABLED ? 0 : -1,
							}),
							o.createElement("div", { className: a, style: i }, " "),
						);
					}
				},
			);
			function w(e) {
				const { name: t, values: n, selectedValues: r, onChange: s } = e;
				const a = n.map((e, t) =>
					o.createElement(S, { key: t, value: e.toString() }),
				);
				const i = r.map((e) => e.toString());
				return o.createElement(
					"div",
					{
						className: E.wrap,
					},
					o.createElement(
						y.SwitchGroup,
						{
							name: t,
							onChange: (e) => {
								s(parseInt(e));
							},
							values: i,
						},
						a,
					),
				);
			}
			const _ = n(86536);
			const x = C.t(null, void 0, n(60142));
			function N(e) {
				const { value: t, items: n, onChange: r } = e;
				return o.createElement(
					"div",
					{ className: _.thicknessContainer },
					o.createElement("div", { className: _.thicknessTitle }, x),
					o.createElement(w, {
						name: "color_picker_thickness_select",
						onChange: r,
						values: n,
						selectedValues: "mixed" === t ? [] : [t],
					}),
				);
			}
			const I = n(28685);
			function T(e) {
				const {
					className: t,
					selectOpacity: n = void 0 !== e.opacity,
					thickness: r,
					color: a,
					disabled: i,
					opacity: l = 1,
					onColorChange: c,
					onOpacityChange: u,
					onThicknessChange: p,
					thicknessItems: d,
					onPopupClose: h,
					"data-name": m,
				} = e;
				const [f, b, C] = (0, g.useCustomColors)();
				return o.createElement(
					v,
					{
						className: t,
						disabled: i,
						color: "mixed" !== a ? a : null,
						selectOpacity: n,
						opacity: l,
						selectCustom: !0,
						customColors: f,
						onColorChange: c,
						onOpacityChange: a ? u : void 0,
						onAddColor: b,
						onRemoveCustomColor: C,
						button: (e, t) => {
							const n = e || t;
							const c = n ? "primary" : "default";
							return o.createElement(
								"div",
								{
									className: s()(
										I.colorPickerWrap,
										I[`intent-${c}`],
										I["border-thin"],
										I["size-medium"],
										n && I.highlight,
										n && I.focused,
										i && I.disabled,
									),
									"data-role": "button",
									"data-name": r
										? "color-with-thickness-select"
										: "color-select",
								},
								o.createElement(
									"div",
									{ className: s()(I.colorPicker, i && I.disabled) },
									a && "mixed" !== a
										? (() => {
												const e = B(a, l);
												const t = l >= 0.95 && k(a);
												return o.createElement(
													"div",
													{ className: I.opacitySwatch },
													o.createElement("div", {
														style: { backgroundColor: e },
														className: s()(I.swatch, t && I.white),
													}),
												);
										  })()
										: o.createElement(
												"div",
												{ className: I.placeholderContainer },
												o.createElement("div", {
													className:
														"mixed" === a ? I.mixedColor : I.placeholder,
												}),
										  ),
									r &&
										(() => {
											const e = a && "mixed" !== a ? B(a, l) : void 0;
											if ("mixed" === r)
												return o.createElement(
													"div",
													{ className: I.multiWidth },
													o.createElement("div", {
														style: { backgroundColor: e },
														className: I.line,
													}),
													o.createElement("div", {
														style: { backgroundColor: e },
														className: I.line,
													}),
													o.createElement("div", {
														style: { backgroundColor: e },
														className: I.line,
													}),
												);
											return o.createElement("span", {
												className: s()(I.colorLine, k(a) && I.white),
												style: { height: r, backgroundColor: e },
											});
										})(),
								),
								n && o.createElement("span", { className: I.shadow }),
							);
						},
						onPopupClose: h,
						"data-name": m,
					},
					r &&
						d &&
						o.createElement(N, {
							value: r,
							items: d,
							onChange: (e) => {
								p?.(e);
							},
						}),
				);
			}
			function B(e, t) {
				return e
					? (0, f.generateColor)(e, (0, f.alphaToTransparency)(t), !0)
					: "#000000";
			}
			function k(e) {
				return !!e && e.toLowerCase() === b.white;
			}
		},
		48897: (e, t, n) => {
			n.d(t, { SymbolInputsButton: () => x });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(44352);
			const i = n(50151);
			const l = n(60508);
			const c = n(95711);
			const u = n(14483);
			const p = n(55141);
			const d = n(65106);
			const h = n(1861);
			const m = n(9745);
			const v = n(93929);
			const g = n(60015);
			function f(e) {
				const {
					value: t,
					onClick: n,
					className: s,
					startSlot: a,
					disabled: i = !1,
				} = e;
				return o.createElement(
					"div",
					{
						className: r(g.wrap, i && g.disabled, s),
						onClick: n,
						"data-name": "edit-button",
					},
					o.createElement(
						"div",
						{ className: r(g.text, "apply-overflow-tooltip") },
						void 0 !== a && a,
						o.createElement("span", null, t),
					),
					o.createElement(m.Icon, { icon: v, className: g.icon }),
				);
			}
			const b = n(31356);
			const C = n(78260);
			const y = n(44254);
			const E = n(15983);
			const S = n(82708);
			const w = n(69006);
			function _(e) {
				const { symbol: t, onSymbolChanged: r, disabled: i, className: p } = e;
				const [m, v] = (0, o.useState)(t);
				const g = (0, o.useContext)(l.SlotContext);
				const b = (0, o.useContext)(c.PopupContext);
				return o.createElement(f, {
					value: m,
					onClick: () => {
						const e = ((e) => {
							const t = (0, y.tokenize)(e);
							return (0, E.isSpread)(t);
						})(m)
							? m
							: (0, S.safeShortName)(m);
						const t = (0, d.getSymbolSearchCompleteOverrideFunction)();
						(0, h.showSymbolSearchItemsDialog)({
							onSearchComplete: (e) => {
								t(e[0].symbol, e[0].result).then((e) => {
									r(e.symbol), v(e.name);
								});
							},
							dialogTitle: a.t(null, void 0, n(23398)),
							defaultValue: e,
							manager: g,
							onClose: () => {
								b?.focus();
							},
							showSpreadActions:
								u.enabled("show_spread_operators") &&
								u.enabled("studies_symbol_search_spread_operators"),
						});
					},
					disabled: i,
					className: s()(
						p,
						u.enabled("uppercase_instrument_names") && w.uppercase,
					),
				});
			}
			function x(e) {
				if ("definition" in e) {
					const {
						propType: t,
						properties: n,
						id: r,
						title: s = "",
						solutionId: a,
					} = e.definition;
					const l = n[t];
					const c = l.value() || "";
					const u = (e) => {
						l.setValue(e);
					};
					return o.createElement(
						b.CommonSection,
						{ id: r, title: s, solutionId: a },
						o.createElement(
							C.CellWrap,
							null,
							o.createElement(_, {
								symbol: (0, i.ensureDefined)(c),
								onSymbolChanged: u,
							}),
						),
					);
				}
				{
					const {
						study: t,
						value: n,
						input: { id: r, name: a },
						onChange: l,
						disabled: c,
						hasTooltip: u,
					} = e;
					const d = (e) => {
						const n = (0, p.getInternalSymbolName)(e, t);
						l(n, r, a);
					};
					return o.createElement(_, {
						symbol: (0, i.ensureDefined)(n),
						onSymbolChanged: d,
						disabled: c,
						className: s()(u && w.hasTooltip),
					});
				}
			}
		},
		1861: (e, t, n) => {
			n.d(t, { showSymbolSearchItemsDialog: () => l });
			const o = n(50959);
			const r = n(962);
			const s = n(60508);
			const a = n(51826);
			const i = n(32456);
			function l(e) {
				const {
					initialMode: t = "symbolSearch",
					autofocus: n = !0,
					defaultValue: l,
					showSpreadActions: c,
					selectSearchOnInit: u,
					onSearchComplete: p,
					dialogTitle: d,
					placeholder: h,
					fullscreen: m,
					initialScreen: v,
					wrapper: g,
					dialog: f,
					contentItem: b,
					onClose: C,
					onOpen: y,
					footer: E,
					symbolTypes: S,
					searchInput: w,
					emptyState: _,
					hideMarkedListFlag: x,
					dialogWidth: N = "auto",
					manager: I,
					shouldReturnFocus: T,
				} = e;
				if (
					a.dialogsOpenerManager.isOpened("SymbolSearch") ||
					a.dialogsOpenerManager.isOpened("ChangeIntervalDialog")
				)
					return;
				const B = document.createElement("div");
				const k = o.createElement(
					s.SlotContext.Provider,
					{ value: null != I ? I : null },
					o.createElement(i.SymbolSearchItemsDialog, {
						onClose: P,
						initialMode: t,
						defaultValue: l,
						showSpreadActions: c,
						hideMarkedListFlag: x,
						selectSearchOnInit: u,
						onSearchComplete: p,
						dialogTitle: d,
						placeholder: h,
						fullscreen: m,
						initialScreen: v,
						wrapper: g,
						dialog: f,
						contentItem: b,
						footer: E,
						symbolTypes: S,
						searchInput: w,
						emptyState: _,
						autofocus: n,
						dialogWidth: N,
						shouldReturnFocus: T,
					}),
				);
				function P() {
					r.unmountComponentAtNode(B),
						a.dialogsOpenerManager.setAsClosed("SymbolSearch"),
						C?.();
				}
				return (
					r.render(k, B),
					a.dialogsOpenerManager.setAsOpened("SymbolSearch"),
					y?.(),
					{ close: P }
				);
			}
		},
		50238: (e, t, n) => {
			n.d(t, { useRovingTabindexElement: () => a });
			const o = n(50959);
			const r = n(39416);
			const s = n(16838);
			function a(e, t = []) {
				const [n, a] = (0, o.useState)(!1);
				const i = (0, r.useFunctionalRefObject)(e);
				return (
					(0, o.useLayoutEffect)(() => {
						if (!s.PLATFORM_ACCESSIBILITY_ENABLED) return;
						const e = i.current;
						if (null === e) return;
						const t = (e) => {
							switch (e.type) {
								case "roving-tabindex:main-element":
									a(!0);
									break;
								case "roving-tabindex:secondary-element":
									a(!1);
							}
						};
						return (
							e.addEventListener("roving-tabindex:main-element", t),
							e.addEventListener("roving-tabindex:secondary-element", t),
							() => {
								e.removeEventListener("roving-tabindex:main-element", t),
									e.removeEventListener("roving-tabindex:secondary-element", t);
							}
						);
					}, t),
					[i, s.PLATFORM_ACCESSIBILITY_ENABLED ? (n ? 0 : -1) : void 0]
				);
			}
		},
		73146: (e, t, n) => {
			n.d(t, { createAdapter: () => s });
			const o = n(92249);
			const r = n(28853);
			function s(e) {
				if ((0, o.isLineTool)(e))
					return {
						isPine: () => !1,
						isStandardPine: () => !1,
						canOverrideMinTick: () => !1,
						resolvedSymbolInfoBySymbol: () => {
							throw new TypeError("Only study is supported.");
						},
						symbolsResolved: () => {
							throw new TypeError("Only study is supported.");
						},
						parentSources: () => {
							throw new TypeError("Only study is supported.");
						},
						getAllChildren: () => [],
						sourceId: () => {
							throw new TypeError("Only study is supported.");
						},
						inputs: () => ({}),
						parentSourceForInput: () => {
							throw new TypeError("Only study is supported.");
						},
					};
				if ((0, r.isStudy)(e)) return e;
				if ("isInputsStudy" in e) return e;
				throw new TypeError("Unsupported source type.");
			}
		},
		45560: (e, t, n) => {
			n.d(t, { useDefinitionProperty: () => s });
			const o = n(50959);
			const r = n(71953);
			const s = (e) => {
				const t = "property" in e ? e.property : void 0;
				const n = "defaultValue" in e ? e.defaultValue : e.property.value();
				const [s, a] = (0, o.useState)(t ? t.value() : n);
				(0, o.useEffect)(() => {
					if (t) {
						const n = {};
						return (
							a(t.value()),
							t.subscribe(n, (t) => {
								const n = t.value();
								e.handler?.(n), a(n);
							}),
							() => {
								t.unsubscribeAll(n);
							}
						);
					}
					return () => {};
				}, [t]);
				return [
					s,
					(e) => {
						if (void 0 !== t) {
							const n = t.value();
							r.logger.logNormal(
								`Changing property value from "${n}" to "${e}"`,
							),
								t.setValue(e);
						}
					},
				];
			};
		},
		78260: (e, t, n) => {
			n.d(t, { CellWrap: () => i });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(2746);
			function i(e) {
				return o.createElement(
					"div",
					{ className: s()(a.wrap, e.className) },
					e.children,
				);
			}
		},
		53424: (e, t, n) => {
			n.d(t, { CheckableTitle: () => c });
			const o = n(50959);
			const r = n(15294);
			const s = n(45560);
			function a(e) {
				const { property: t, ...n } = e;
				const [a, i] = (0, s.useDefinitionProperty)({ property: t });
				const l = "mixed" === a;
				return o.createElement(r.Checkbox, {
					...n,
					name: "toggle-enabled",
					checked: l || a,
					indeterminate: l,
					onChange: () => {
						i("mixed" === a || !a);
					},
				});
			}
			const i = n(78260);
			const l = n(25679);
			function c(e) {
				const { property: t, disabled: n, title: r, className: s, name: c } = e;
				const u = o.createElement("span", { className: l.title }, r);
				return o.createElement(
					i.CellWrap,
					{ className: s },
					t
						? o.createElement(a, {
								name: c,
								className: l.checkbox,
								property: t,
								disabled: n,
								label: u,
								labelAlignBaseline: !0,
						  })
						: u,
				);
			}
		},
		31356: (e, t, n) => {
			n.d(t, { CommonSection: () => a });
			const o = n(50959);
			const r = n(11062);
			const s = n(53424);
			n(41125);
			function a(e) {
				const {
					id: t,
					offset: n,
					disabled: a,
					checked: i,
					title: l,
					children: c,
					solutionId: u,
				} = e;
				return o.createElement(
					r.PropertyTable.Row,
					null,
					o.createElement(
						r.PropertyTable.Cell,
						{
							placement: "first",
							verticalAlign: "adaptive",
							offset: n,
							"data-section-name": t,
							colSpan: c ? void 0 : 2,
							checkableTitle: !0,
						},
						o.createElement(s.CheckableTitle, {
							name: `is-enabled-${t}`,
							title: l,
							disabled: a,
							property: i,
						}),
						u && !c && !1,
					),
					Boolean(c) &&
						o.createElement(
							r.PropertyTable.Cell,
							{ placement: "last", "data-section-name": t },
							c,
							u && !1,
						),
				);
			}
		},
		86067: (e, t, n) => {
			n.d(t, { GroupTitleSection: () => i });
			const o = n(50959);
			const r = n(11062);
			const s = n(53424);
			const a = n(69750);
			function i(e) {
				return o.createElement(
					r.PropertyTable.Row,
					null,
					o.createElement(
						r.PropertyTable.Cell,
						{
							className: a.titleWrap,
							placement: "first",
							verticalAlign: "adaptive",
							colSpan: 2,
							"data-section-name": e.name,
							checkableTitle: !0,
						},
						o.createElement(s.CheckableTitle, {
							title: e.title,
							name: `is-enabled-${e.name}`,
							className: a.title,
						}),
					),
				);
			}
		},
		71953: (e, t, n) => {
			n.d(t, { logger: () => o });
			const o = (0, n(59224).getLogger)("Platform.GUI.PropertyDefinitionTrace");
		},
		34381: (e, t, n) => {
			n.d(t, { ColorPicker: () => $ });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(44352);
			const i = n(16838);
			const l = n(50151);
			const c = n(68335);
			const u = n(71468);
			const p = [37, 39, 38, 40];
			function d(e) {
				const t = (0, o.useRef)(null);
				return (
					(0, o.useLayoutEffect)(() => {
						if (!i.PLATFORM_ACCESSIBILITY_ENABLED) return;
						const e = (0, l.ensureNotNull)(t.current);
						const n = () => {
							const n = (0, i.queryTabbableElements)(e).sort(
								i.navigationOrderComparator,
							);
							if (
								0 === n.length ||
								(n[0].parentElement &&
									!v(n[0].parentElement, (0, l.ensureNotNull)(t.current)))
							) {
								const o = ((e) => {
									const n = m(e)
										.sort(i.navigationOrderComparator)
										.find((e) => v(e, (0, l.ensureNotNull)(t.current)));
									if (!n) return null;
									const o = Array.from(n.children);
									if (!o.length) return null;
									return o[0];
								})(e);
								if (null === o) return;
								if (((0, u.becomeMainElement)(o), n.length > 0))
									for (const e of n) (0, u.becomeSecondaryElement)(e);
							}
						};
						return (
							window.addEventListener("keyboard-navigation-activation", n),
							n(),
							() =>
								window.removeEventListener("keyboard-navigation-activation", n)
						);
					}, []),
					[
						t,
						(t) => {
							if (!i.PLATFORM_ACCESSIBILITY_ENABLED) return;
							if (t.defaultPrevented) return;
							const n = (0, c.hashFromEvent)(t);
							if (!p.includes(n)) return;
							const o = document.activeElement;
							if (!(o instanceof HTMLElement)) return;
							const r = t.currentTarget;
							let s;
							let a;
							if (e) {
								const e = o.parentElement;
								(s = e ? Array.from(e.children) : []), (a = s.indexOf(o));
							} else
								(s = ((l = r),
								Array.from(
									l.querySelectorAll("button:not([disabled], [aria-disabled])"),
								).filter((0, i.createScopedVisibleElementFilter)(l))).sort(
									i.navigationOrderComparator,
								)),
									(a = s.indexOf(o));
							let l;
							if (0 === s.length || -1 === a) return;
							const u = (n) => {
								if (!document.activeElement) return;
								const o = m(r);
								const s = document.activeElement.parentElement;
								if (!s) return;
								const a = Array.from(s.children).indexOf(
									document.activeElement,
								);
								if (-1 === a) return;
								const i = o["down" === n ? o.indexOf(s) + 1 : o.indexOf(s) - 1];
								if (!i) return;
								t.preventDefault();
								const l = Array.from(i.children);
								l.length && (!e && a <= l.length - 1 ? g(l[a]) : g(l[0]));
							};
							switch (n) {
								case 37:
									if ((t.preventDefault(), !e && 0 === a)) break;
									g(h(s, a, -1));
									break;
								case 39:
									if ((t.preventDefault(), !e && a === s.length - 1)) break;
									g(h(s, a, 1));
									break;
								case 38:
									u("up");
									break;
								case 40:
									u("down");
							}
						},
					]
				);
			}
			function h(e, t, n) {
				return e[(t + e.length + n) % e.length];
			}
			function m(e) {
				return Array.from(e.querySelectorAll('[data-role="row"]')).filter(
					(0, i.createScopedVisibleElementFilter)(e),
				);
			}
			function v(e, t) {
				const n = (0, l.ensureNotNull)(e.parentElement).offsetTop;
				const o = n + (0, l.ensureNotNull)(e.parentElement).clientHeight;
				const r = t.scrollTop;
				const s = r + t.clientHeight;
				return n >= r && o <= s;
			}
			function g(e) {
				document.activeElement &&
					(0, u.becomeSecondaryElement)(document.activeElement),
					(0, u.becomeMainElement)(e),
					e.focus();
			}
			const f = n(43688);
			const b = n(93532);
			const C = n(45582);
			const y = Math.ceil;
			const E = Math.max;
			const S = (e, t, n) => {
				t = (n ? (0, b.default)(e, t, n) : void 0 === t)
					? 1
					: E((0, C.default)(t), 0);
				const o = null == e ? 0 : e.length;
				if (!o || t < 1) return [];
				for (let r = 0, s = 0, a = Array(y(o / t)); r < o; )
					a[s++] = (0, f.default)(e, r, (r += t));
				return a;
			};
			const w = n(24377);
			const _ = n(49483);
			const x = n(20520);
			const N = n(16396);
			const I = o.createContext(void 0);
			const T = n(6914);
			const B = n(50238);
			const k = n(35149);
			const P = n(87466);
			function D(e) {
				const { index: t, color: s, selected: c, onSelect: u } = e;
				const [p, d] = (0, o.useState)(!1);
				const h = (0, o.useContext)(I);
				const [m, v] = (0, B.useRovingTabindexElement)(null);
				const g = Boolean(h) && !_.CheckMobile.any();
				return o.createElement(
					o.Fragment,
					null,
					o.createElement("button", {
						ref: m,
						style: s ? { color: s } : void 0,
						className: r(
							P.swatch,
							i.PLATFORM_ACCESSIBILITY_ENABLED && P.accessible,
							p && P.hover,
							c && P.selected,
							!s && P.empty,
							String(s).toLowerCase() === T.white && P.white,
						),
						onClick: () => {
							u(s);
						},
						onContextMenu: g ? f : void 0,
						tabIndex: v,
						"data-role": "swatch",
					}),
					g &&
						o.createElement(
							x.PopupMenu,
							{
								isOpened: p,
								onClose: f,
								position: () => {
									const e = (0, l.ensureNotNull)(
										m.current,
									).getBoundingClientRect();
									return { x: e.left, y: e.top + e.height + 4 };
								},
								onClickOutside: f,
							},
							o.createElement(N.PopupMenuItem, {
								className: P.contextItem,
								label: a.t(null, void 0, n(54336)),
								icon: k,
								onClick: () => {
									f(), (0, l.ensureDefined)(h)(t);
								},
								dontClosePopup: !0,
							}),
						),
				);
				function f() {
					d(!p);
				}
			}
			function L(e) {
				const { colors: t, color: n, children: r, onSelect: s } = e;
				if (!t) return null;
				const a = n ? (0, w.parseRgb)(String(n)) : void 0;
				const i = S(t, 10);
				return o.createElement(
					"div",
					{ className: P.swatches },
					i.map((e, t) =>
						o.createElement(
							"div",
							{ className: P.row, "data-role": "row", key: t },
							e.map((e, t) =>
								o.createElement(D, {
									key: String(e) + t,
									index: t,
									color: e,
									selected:
										a && (0, w.areEqualRgb)(a, (0, w.parseRgb)(String(e))),
									onSelect: l,
								}),
							),
						),
					),
					r,
				);
				function l(e) {
					s?.(e);
				}
			}
			const M = n(54368);
			const O = n(94720);
			function F(e) {
				const t = `Invalid RGB color: ${e}`;
				if (null === e) throw new Error(t);
				const n = e.match(/^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i);
				if (null === n) throw new Error(t);
				const [, o, r, s] = n;
				if (!o || !r || !s) throw new Error(t);
				const a = parseInt(o, 16) / 255;
				const i = parseInt(r, 16) / 255;
				const l = parseInt(s, 16) / 255;
				const c = Math.max(a, i, l);
				const u = Math.min(a, i, l);
				let p;
				const d = c;
				const h = c - u;
				const m = 0 === c ? 0 : h / c;
				if (c === u) p = 0;
				else {
					switch (c) {
						case a:
							p = (i - l) / h + (i < l ? 6 : 0);
							break;
						case i:
							p = (l - a) / h + 2;
							break;
						case l:
							p = (a - i) / h + 4;
							break;
						default:
							p = 0;
					}
					p /= 6;
				}
				return { h: p, s: m, v: d };
			}
			const V = n(43370);
			const A = n(35257);
			class R extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._container = null),
						(this._refContainer = (e) => {
							this._container = e;
						}),
						(this._handlePosition = (e) => {
							const {
								hsv: { h: t },
								onChange: n,
							} = this.props;
							if (!n) return;
							const o = (0, l.ensureNotNull)(
								this._container,
							).getBoundingClientRect();
							const r = e.clientX - o.left;
							const s = e.clientY - o.top;
							let a = r / o.width;
							a < 0 ? (a = 0) : a > 1 && (a = 1);
							let i = 1 - s / o.height;
							i < 0 ? (i = 0) : i > 1 && (i = 1), n({ h: t, s: a, v: i });
						}),
						(this._mouseDown = (e) => {
							window.addEventListener("mouseup", this._mouseUp),
								window.addEventListener("mousemove", this._mouseMove);
						}),
						(this._mouseUp = (e) => {
							window.removeEventListener("mousemove", this._mouseMove),
								window.removeEventListener("mouseup", this._mouseUp),
								this._handlePosition(e);
						}),
						(this._mouseMove = (0, V.default)(this._handlePosition, 100)),
						(this._handleTouch = (e) => {
							this._handlePosition(e.nativeEvent.touches[0]);
						});
				}
				render() {
					const {
						className: e,
						hsv: { h: t, s: n, v: r },
					} = this.props;
					const a = `hsl(${360 * t}, 100%, 50%)`;
					return o.createElement(
						"div",
						{
							className: s()(A.saturation, e),
							style: { backgroundColor: a },
							ref: this._refContainer,
							onMouseDown: this._mouseDown,
							onTouchStart: this._handleTouch,
							onTouchMove: this._handleTouch,
						},
						o.createElement("div", {
							className: A.pointer,
							style: { left: `${100 * n}%`, top: `${100 * (1 - r)}%` },
						}),
					);
				}
			}
			const W = n(1369);
			class q extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._container = null),
						(this._refContainer = (e) => {
							this._container = e;
						}),
						(this._handlePosition = (e) => {
							const {
								hsv: { s: t, v: n },
								onChange: o,
							} = this.props;
							if (!o) return;
							const r = (0, l.ensureNotNull)(
								this._container,
							).getBoundingClientRect();
							let s = (e.clientY - r.top) / r.height;
							s < 0 ? (s = 0) : s > 1 && (s = 1), o({ h: s, s: t, v: n });
						}),
						(this._mouseDown = (e) => {
							window.addEventListener("mouseup", this._mouseUp),
								window.addEventListener("mousemove", this._mouseMove);
						}),
						(this._mouseUp = (e) => {
							window.removeEventListener("mousemove", this._mouseMove),
								window.removeEventListener("mouseup", this._mouseUp),
								this._handlePosition(e);
						}),
						(this._mouseMove = (0, V.default)(this._handlePosition, 100)),
						(this._handleTouch = (e) => {
							this._handlePosition(e.nativeEvent.touches[0]);
						});
				}
				render() {
					const {
						className: e,
						hsv: { h: t },
					} = this.props;
					return o.createElement(
						"div",
						{ className: s()(W.hue, e) },
						o.createElement(
							"div",
							{
								className: W.pointerContainer,
								ref: this._refContainer,
								onMouseDown: this._mouseDown,
								onTouchStart: this._handleTouch,
								onTouchMove: this._handleTouch,
							},
							o.createElement("div", {
								className: W.pointer,
								style: { top: `${100 * t}%` },
							}),
						),
					);
				}
			}
			const z = n(80679);
			const U = "#000000";
			const Z = a.t(null, { context: "Color Picker" }, n(40276));
			class Y extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._inputRef = o.createRef()),
						(this._handleHSV = (e) => {
							const t =
								((e) => {
									const { h: t, s: n, v: o } = e;
									let r;
									let s;
									let a;
									const i = Math.floor(6 * t);
									const l = 6 * t - i;
									const c = o * (1 - n);
									const u = o * (1 - l * n);
									const p = o * (1 - (1 - l) * n);
									switch (i % 6) {
										case 0:
											(r = o), (s = p), (a = c);
											break;
										case 1:
											(r = u), (s = o), (a = c);
											break;
										case 2:
											(r = c), (s = o), (a = p);
											break;
										case 3:
											(r = c), (s = u), (a = o);
											break;
										case 4:
											(r = p), (s = c), (a = o);
											break;
										case 5:
											(r = o), (s = c), (a = u);
											break;
										default:
											(r = 0), (s = 0), (a = 0);
									}
									return `#${[255 * r, 255 * s, 255 * a]
										.map((e) =>
											`0${Math.round(e).toString(16)}`.replace(
												/.+?([a-f0-9]{2})$/i,
												"$1",
											),
										)
										.join("")}`;
								})(e) || U;
							this.setState({
								color: t,
								inputColor: t.replace(/^#/, ""),
								hsv: e,
							}),
								this.props.onSelect(t);
						}),
						(this._handleInput = (e) => {
							const t = e.currentTarget.value;
							try {
								const e = F(t);
								const n = `#${t}`;
								this.setState({ color: n, inputColor: t, hsv: e }),
									this.props.onSelect(n);
							} catch (e) {
								this.setState({ inputColor: t });
							}
						}),
						(this._handleAddColor = () => this.props.onAdd(this.state.color));
					const t = e.color || U;
					this.state = { color: t, inputColor: t.replace(/^#/, ""), hsv: F(t) };
				}
				componentDidMount() {
					let e;
					i.PLATFORM_ACCESSIBILITY_ENABLED &&
						!_.CheckMobile.any() &&
						(null === (e = this._inputRef.current) ||
							void 0 === e ||
							e.focus());
				}
				render() {
					const { color: e, hsv: t, inputColor: n } = this.state;
					return o.createElement(
						"div",
						{ className: z.container },
						o.createElement(
							"div",
							{ className: z.form },
							o.createElement("div", {
								className: z.swatch,
								style: { backgroundColor: e },
							}),
							o.createElement(
								"div",
								{ className: z.inputWrap },
								o.createElement("span", { className: z.inputHash }, "#"),
								o.createElement("input", {
									ref: this._inputRef,
									type: "text",
									className: z.input,
									value: n,
									onChange: this._handleInput,
								}),
							),
							o.createElement(
								"div",
								{ className: z.buttonWrap },
								o.createElement(
									O.Button,
									{ size: "s", onClick: this._handleAddColor },
									Z,
								),
							),
						),
						o.createElement(
							"div",
							{ className: z.hueSaturationWrap },
							o.createElement(R, {
								className: z.saturation,
								hsv: t,
								onChange: this._handleHSV,
							}),
							o.createElement(q, {
								className: z.hue,
								hsv: t,
								onChange: this._handleHSV,
							}),
						),
					);
				}
			}
			const G = n(93402);
			const H = a.t(null, { context: "Color Picker" }, n(53585));
			const K = a.t(null, { context: "Color Picker" }, n(81865));
			function $(e) {
				const {
					color: t,
					opacity: n,
					selectCustom: r,
					selectOpacity: a,
					customColors: l,
					onRemoveCustomColor: c,
					onToggleCustom: u,
					onOpacityChange: p,
					menu: h,
				} = e;
				const [m, v] = (0, o.useState)(!1);
				const g = "number" === typeof n ? n : 1;
				const [f, b] = d();
				return (
					(0, o.useLayoutEffect)(() => {
						h?.update();
					}, [a, h]),
					m
						? o.createElement(Y, {
								color: t,
								onSelect: C,
								onAdd: (t) => {
									v(!1), null == u || u(!1);
									const { onAddColor: n } = e;
									n?.(t);
								},
						  })
						: o.createElement(
								"div",
								{ className: G.container },
								o.createElement(
									"div",
									{ ref: f, onKeyDown: b },
									o.createElement(L, {
										colors: T.basic,
										color: t,
										onSelect: C,
									}),
									o.createElement(L, {
										colors: T.extended,
										color: t,
										onSelect: C,
									}),
									o.createElement("div", { className: G.separator }),
									o.createElement(
										I.Provider,
										{ value: c },
										o.createElement(
											L,
											{ colors: l, color: t, onSelect: C },
											r &&
												o.createElement(
													o.Fragment,
													null,
													i.PLATFORM_ACCESSIBILITY_ENABLED
														? (null == l ? void 0 : l.length)
															? o.createElement("button", {
																	title: H,
																	onClick: y,
																	className: s()(
																		G.customButton,
																		G.accessible,
																		"apply-common-tooltip",
																	),
																	tabIndex: -1,
															  })
															: o.createElement(
																	"div",
																	{ "data-role": "row" },
																	o.createElement("button", {
																		title: H,
																		onClick: y,
																		className: s()(
																			G.customButton,
																			G.accessible,
																			"apply-common-tooltip",
																		),
																		tabIndex: -1,
																	}),
															  )
														: o.createElement("div", {
																className: s()(
																	G.customButton,
																	"apply-common-tooltip",
																),
																onClick: y,
																title: H,
																tabIndex: -1,
														  }),
												),
										),
									),
								),
								a &&
									o.createElement(
										o.Fragment,
										null,
										o.createElement("div", { className: G.sectionTitle }, K),
										o.createElement(M.Opacity, {
											color: t,
											opacity: g,
											onChange: (e) => {
												p?.(e);
											},
										}),
									),
						  )
				);
				function C(t) {
					const { onColorChange: n } = e;
					n?.(t, m);
				}
				function y(e) {
					v(!0), null == u || u(!0);
				}
			}
		},
		54368: (e, t, n) => {
			n.d(t, { Opacity: () => u });
			const o = n(50959);
			const r = n(97754);
			const s = n(50151);
			const a = n(37160);
			const i = n(68335);
			const l = n(16838);
			const c = n(30099);
			class u extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._container = null),
						(this._pointer = null),
						(this._raf = null),
						(this._refContainer = (e) => {
							this._container = e;
						}),
						(this._refPointer = (e) => {
							this._pointer = e;
						}),
						(this._handlePosition = (e) => {
							null === this._raf &&
								(this._raf = requestAnimationFrame(() => {
									const t = (0, s.ensureNotNull)(this._container);
									const n = (0, s.ensureNotNull)(this._pointer);
									const o = t.getBoundingClientRect();
									const r = n.offsetWidth;
									const i = e.clientX - r / 2 - o.left;
									const l = (0, a.clamp)(i / (o.width - r), 0, 1);
									this.setState({
										inputOpacity: Math.round(100 * l).toString(),
									}),
										this.props.onChange(l),
										(this._raf = null);
								}));
						}),
						(this._onSliderClick = (e) => {
							this._handlePosition(e.nativeEvent), this._dragSubscribe();
						}),
						(this._mouseUp = (e) => {
							this.setState({ isPointerDragged: !1 }),
								this._dragUnsubscribe(),
								this._handlePosition(e);
						}),
						(this._mouseMove = (e) => {
							this.setState({ isPointerDragged: !0 }), this._handlePosition(e);
						}),
						(this._onTouchStart = (e) => {
							this._handlePosition(e.nativeEvent.touches[0]);
						}),
						(this._handleTouch = (e) => {
							this.setState({ isPointerDragged: !0 }),
								this._handlePosition(e.nativeEvent.touches[0]);
						}),
						(this._handleTouchEnd = () => {
							this.setState({ isPointerDragged: !1 });
						}),
						(this._handleInput = (e) => {
							const t = e.currentTarget.value;
							const n = Number(t) / 100;
							this.setState({ inputOpacity: t }),
								Number.isNaN(n) || n > 1 || this.props.onChange(n);
						}),
						(this._handleKeyDown = (e) => {
							const t = (0, i.hashFromEvent)(e);
							if (37 !== t && 39 !== t) return;
							e.preventDefault();
							const n = Number(this.state.inputOpacity);
							37 === t && 0 !== n && this._changeOpacity(n - 1),
								39 === t && 100 !== n && this._changeOpacity(n + 1);
						}),
						(this.state = {
							inputOpacity: Math.round(100 * e.opacity).toString(),
							isPointerDragged: !1,
						});
				}
				componentWillUnmount() {
					null !== this._raf &&
						(cancelAnimationFrame(this._raf), (this._raf = null)),
						this._dragUnsubscribe();
				}
				render() {
					const {
						color: e,
						opacity: t,
						hideInput: n,
						disabled: s,
					} = this.props;
					const { inputOpacity: a, isPointerDragged: i } = this.state;
					const u = { color: e || void 0 };
					return o.createElement(
						"div",
						{ className: c.opacity },
						o.createElement(
							"div",
							{
								className: r(
									c.opacitySlider,
									l.PLATFORM_ACCESSIBILITY_ENABLED && c.accessible,
								),
								style: u,
								tabIndex: l.PLATFORM_ACCESSIBILITY_ENABLED && !s ? 0 : -1,
								ref: this._refContainer,
								onMouseDown: this._onSliderClick,
								onTouchStart: this._onTouchStart,
								onTouchMove: this._handleTouch,
								onTouchEnd: this._handleTouchEnd,
								onKeyDown: this._handleKeyDown,
								"aria-disabled": s,
							},
							o.createElement("div", {
								className: c.opacitySliderGradient,
								style: {
									backgroundImage: `linear-gradient(90deg, transparent, ${e})`,
								},
							}),
							o.createElement(
								"div",
								{ className: c.opacityPointerWrap },
								o.createElement("div", {
									className: r(c.pointer, i && c.dragged),
									style: { left: `${100 * t}%` },
									ref: this._refPointer,
								}),
							),
						),
						!n &&
							o.createElement(
								"div",
								{ className: c.opacityInputWrap },
								o.createElement("input", {
									type: "text",
									className: c.opacityInput,
									value: a,
									onChange: this._handleInput,
								}),
								o.createElement(
									"span",
									{ className: c.opacityInputPercent },
									"%",
								),
							),
					);
				}
				_dragSubscribe() {
					const e = (0, s.ensureNotNull)(this._container).ownerDocument;
					e &&
						(e.addEventListener("mouseup", this._mouseUp),
						e.addEventListener("mousemove", this._mouseMove));
				}
				_dragUnsubscribe() {
					const e = (0, s.ensureNotNull)(this._container).ownerDocument;
					e &&
						(e.removeEventListener("mousemove", this._mouseMove),
						e.removeEventListener("mouseup", this._mouseUp));
				}
				_changeOpacity(e) {
					this.setState({ inputOpacity: e.toString() }),
						this.props.onChange(e / 100);
				}
			}
		},
		6914: (e, t, n) => {
			n.d(t, { basic: () => i, extended: () => c, white: () => r });
			const o = n(48891);
			const r = o.colorsPalette["color-white"];
			const s = [
				"ripe-red",
				"tan-orange",
				"banana-yellow",
				"iguana-green",
				"minty-green",
				"sky-blue",
				"tv-blue",
				"deep-blue",
				"grapes-purple",
				"berry-pink",
			];
			const a = [200, 300, 400, 500, 600, 700, 800, 900].map(
				(e) => `color-cold-gray-${e}`,
			);
			a.unshift("color-white"),
				a.push("color-black"),
				s.forEach((e) => {
					a.push(`color-${e}-500`);
				});
			const i = a.map((e) => o.colorsPalette[e]);
			const l = [];
			[100, 200, 300, 400, 700, 900].forEach((e) => {
				s.forEach((t) => {
					l.push(`color-${t}-${e}`);
				});
			});
			const c = l.map((e) => o.colorsPalette[e]);
		},
		59054: (e, t, n) => {
			n.d(t, { ControlDisclosureView: () => g });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(38528);
			const i = n(67029);
			const l = n(78274);
			const c = n(4523);
			const u = n(9745);
			const p = n(2948);
			const d = n(23428);
			function h(e) {
				const { isDropped: t } = e;
				return o.createElement(u.Icon, {
					className: s()(d.icon, t && d.dropped),
					icon: p,
				});
			}
			function m(e) {
				const { className: t, disabled: n, isDropped: r } = e;
				return o.createElement(
					"span",
					{ className: s()(d.button, n && d.disabled, t) },
					o.createElement(h, { isDropped: r }),
				);
			}
			const v = n(66986);
			const g = o.forwardRef((e, t) => {
				const {
					listboxId: n,
					className: r,
					listboxClassName: u,
					listboxTabIndex: p,
					hideArrowButton: d,
					matchButtonAndListboxWidths: h,
					popupPosition: g,
					disabled: f,
					isOpened: b,
					scrollWrapReference: C,
					repositionOnScroll: y,
					closeOnHeaderOverlap: E,
					listboxReference: S,
					size: w = "small",
					onClose: _,
					onOpen: x,
					onListboxFocus: N,
					onListboxBlur: I,
					onListboxKeyDown: T,
					buttonChildren: B,
					children: k,
					caretClassName: P,
					listboxAria: D,
					...L
				} = e;
				const M = (0, o.useRef)(null);
				const O =
					!d &&
					o.createElement(
						l.EndSlot,
						null,
						o.createElement(m, { isDropped: b, disabled: f, className: P }),
					);
				return o.createElement(c.PopupMenuDisclosureView, {
					buttonRef: M,
					listboxId: n,
					listboxClassName: u,
					listboxTabIndex: p,
					isOpened: b,
					onClose: _,
					onOpen: x,
					listboxReference: S,
					scrollWrapReference: C,
					onListboxFocus: N,
					onListboxBlur: I,
					onListboxKeyDown: T,
					listboxAria: D,
					matchButtonAndListboxWidths: h,
					popupPosition: g,
					button: o.createElement(i.ControlSkeleton, {
						...L,
						"data-role": "listbox",
						disabled: f,
						className: s()(v.button, r),
						size: w,
						ref: (0, a.useMergedRefs)([M, t]),
						middleSlot: o.createElement(
							l.MiddleSlot,
							null,
							o.createElement(
								"span",
								{ className: s()(v["button-children"], d && v.hiddenArrow) },
								B,
							),
						),
						endSlot: O,
					}),
					popupChildren: k,
					repositionOnScroll: y,
					closeOnHeaderOverlap: E,
				});
			});
			g.displayName = "ControlDisclosureView";
		},
		56512: (e, t, n) => {
			n.d(t, { useCustomColors: () => l });
			const o = n(50959);
			const r = n(56840);
			const s = n(76422);
			function a(e, t) {
				(0, o.useEffect)(
					() => (
						s.subscribe(e, t, null),
						() => {
							s.unsubscribe(e, t, null);
						}
					),
					[e, t],
				);
			}
			const i = n(24377);
			function l() {
				const [e, t] = (0, o.useState)(
					(0, r.getJSON)("pickerCustomColors", []),
				);
				a("add_new_custom_color", (n) => t(c(n, e))),
					a("remove_custom_color", (n) => t(u(n, e)));
				const n = (0, o.useCallback)(
					(t) => {
						const n = t ? (0, i.parseRgb)(t) : null;
						e.some(
							(e) =>
								null !== e &&
								null !== n &&
								(0, i.areEqualRgb)((0, i.parseRgb)(e), n),
						) ||
							(s.emit("add_new_custom_color", t),
							(0, r.setJSON)("pickerCustomColors", c(t, e)));
					},
					[e],
				);
				const l = (0, o.useCallback)(
					(t) => {
						(t >= 0 || t < e.length) &&
							(s.emit("remove_custom_color", t),
							(0, r.setJSON)("pickerCustomColors", u(t, e)));
					},
					[e],
				);
				return [e, n, l];
			}
			function c(e, t) {
				const n = t.slice();
				return n.push(e), n.length > 29 && n.shift(), n;
			}
			function u(e, t) {
				return t.filter((t, n) => e !== n);
			}
		},
		90405: (e, t, n) => {
			n.d(t, { Select: () => C });
			const o = n(50959);
			const r = n(22064);
			const s = n(38528);
			const a = n(16921);
			const i = n(16396);
			const l = n(12481);
			const c = n(43370);
			const u = n(36762);
			const p = n(26597);
			const d = n(59054);
			const h = n(36104);
			const m = n(38223);
			const v = n(60673);
			function g(e) {
				return !e.readonly;
			}
			function f(e, t) {
				let n;
				return null !== (n = null == t ? void 0 : t.id) && void 0 !== n
					? n
					: (0, r.createDomId)(e, "item", null == t ? void 0 : t.value);
			}
			function b(e) {
				let t;
				let n;
				const { selectedItem: r, placeholder: s } = e;
				if (!r) return o.createElement("span", { className: v.placeholder }, s);
				const a =
					null !==
						(n =
							null !== (t = r.selectedContent) && void 0 !== t
								? t
								: r.content) && void 0 !== n
						? n
						: r.value;
				return o.createElement("span", null, a);
			}
			const C = o.forwardRef((e, t) => {
				const {
					id: n,
					menuClassName: v,
					menuItemClassName: C,
					tabIndex: y,
					disabled: E,
					highlight: S,
					intent: w,
					hideArrowButton: _,
					placeholder: x,
					addPlaceholderToItems: N = !0,
					value: I,
					"aria-labelledby": T,
					onFocus: B,
					onBlur: k,
					onClick: P,
					onChange: D,
					onKeyDown: L,
					repositionOnScroll: M = !0,
					openMenuOnEnter: O = !0,
					"aria-describedby": F,
					"aria-invalid": V,
					...A
				} = e;
				let { items: R } = e;
				if (x && N) {
					R = [
						{
							value: void 0,
							content: x,
							id: (0, r.createDomId)(n, "placeholder"),
						},
						...R,
					];
				}
				const {
					listboxId: W,
					isOpened: q,
					isFocused: z,
					buttonTabIndex: U,
					listboxTabIndex: Z,
					highlight: Y,
					intent: G,
					open: H,
					onOpen: K,
					close: $,
					toggle: j,
					buttonFocusBindings: X,
					onButtonClick: Q,
					buttonRef: J,
					listboxRef: ee,
					buttonAria: te,
				} = (0, h.useControlDisclosure)({
					id: n,
					disabled: E,
					buttonTabIndex: y,
					intent: w,
					highlight: S,
					onFocus: B,
					onBlur: k,
					onClick: P,
				});
				const ne = R.filter(g);
				const oe = ne.find((e) => e.value === I);
				const [re, se, ae] = (0, a.useKeepActiveItemIntoView)({
					activeItem: oe,
				});
				const ie = (0, r.joinDomIds)(T, n);
				const le = ie.length > 0 ? ie : void 0;
				const ce = (0, o.useMemo)(
					() => ({
						role: "listbox",
						"aria-labelledby": T,
						"aria-activedescendant": f(n, oe),
					}),
					[T, oe],
				);
				const ue = (0, o.useCallback)((e) => e.value === I, [I]);
				const pe = (0, o.useCallback)((e) => D?.(e.value), [D]);
				const de = (0, u.useItemsKeyboardNavigation)(m.isRtl, ne, ue, pe, !1, {
					next: [40],
					previous: [38],
				});
				const he = (0, p.useKeyboardToggle)(j, q || O);
				const me = (0, p.useKeyboardClose)(q, $);
				const ve = (0, p.useKeyboardOpen)(q, H);
				const ge = (0, p.useKeyboardEventHandler)([he, me, ve]);
				const fe = (0, p.useKeyboardEventHandler)([de, he, me]);
				const be = ((e) => {
					const t = (0, o.useRef)("");
					const n = (0, o.useMemo)(
						() =>
							(0, l.default)(() => {
								t.current = "";
							}, 500),
						[],
					);
					const r = (0, o.useMemo)(() => (0, c.default)(e, 200), [e]);
					return (0, o.useCallback)(
						(e) => {
							e.key.length > 0 &&
								e.key.length < 3 &&
								((t.current += e.key), r(t.current, e), n());
						},
						[n, r],
					);
				})((t, n) => {
					const o = ((e, t, n) =>
						e.find((e) => {
							let o;
							const r = t.toLowerCase();
							return (
								!e.readonly &&
								(n
									? n(e).toLowerCase().startsWith(r)
									: !e.readonly &&
									  (("string" === typeof e.content &&
											e.content.toLowerCase().startsWith(r)) ||
											("string" === typeof e.textContent &&
												e.textContent.toLowerCase().startsWith(r)) ||
											String(null !== (o = e.value) && void 0 !== o ? o : "")
												.toLowerCase()
												.startsWith(r)))
							);
						}))(ne, t, e.getSearchKey);
					void 0 !== o && D && (n.stopPropagation(), q || H(), D(o.value));
				});
				return o.createElement(
					d.ControlDisclosureView,
					{
						...A,
						...te,
						...X,
						id: n,
						role: "button",
						tabIndex: U,
						"aria-owns": te["aria-controls"],
						"aria-haspopup": "listbox",
						"aria-labelledby": le,
						disabled: E,
						hideArrowButton: _,
						isFocused: z,
						isOpened: q,
						highlight: Y,
						intent: G,
						ref: (0, s.useMergedRefs)([J, t]),
						onClick: Q,
						onOpen: () => {
							ae(oe, { duration: 0 }), K();
						},
						onClose: $,
						onKeyDown: (e) => {
							ge(e), L?.(e);
							e.defaultPrevented || be(e);
						},
						listboxId: W,
						listboxTabIndex: Z,
						listboxClassName: v,
						listboxAria: ce,
						"aria-describedby": F,
						"aria-invalid": V,
						listboxReference: ee,
						scrollWrapReference: re,
						onListboxKeyDown: (e) => {
							fe(e), e.defaultPrevented || be(e);
						},
						buttonChildren: o.createElement(b, {
							selectedItem: oe,
							placeholder: x,
						}),
						repositionOnScroll: M,
					},
					R.map((e, t) => {
						let r;
						if (e.readonly)
							return o.createElement(
								o.Fragment,
								{ key: `readonly_item_${t}` },
								e.content,
							);
						const s = f(n, e);
						return o.createElement(i.PopupMenuItem, {
							key: s,
							id: s,
							className: C,
							role: "option",
							"aria-selected": I === e.value,
							isActive: I === e.value,
							label: null !== (r = e.content) && void 0 !== r ? r : e.value,
							onClick: Ce,
							onClickArg: e.value,
							isDisabled: e.disabled,
							reference: (t) => se(e, t),
						});
					}),
				);
				function Ce(e) {
					D?.(e);
				}
			});
			C.displayName = "Select";
		},
		86656: (e, t, n) => {
			n.d(t, { TouchScrollContainer: () => i });
			const o = n(50959);
			const r = n(59142);
			const s = n(50151);
			const a = n(49483);
			const i = (0, o.forwardRef)((e, t) => {
				const { children: n, ...s } = e;
				const i = (0, o.useRef)(null);
				return (
					(0, o.useImperativeHandle)(t, () => i.current),
					(0, o.useLayoutEffect)(() => {
						if (a.CheckMobile.iOS())
							return (
								null !== i.current &&
									(0, r.disableBodyScroll)(i.current, { allowTouchMove: l(i) }),
								() => {
									null !== i.current && (0, r.enableBodyScroll)(i.current);
								}
							);
					}, []),
					o.createElement("div", { ref: i, ...s }, n)
				);
			});
			function l(e) {
				return (t) => {
					const n = (0, s.ensureNotNull)(e.current);
					const o = document.activeElement;
					return (
						!n.contains(t) || (null !== o && n.contains(o) && o.contains(t))
					);
				};
			}
		},
		26278: (e) => {
			e.exports = {
				titleWrap: "titleWrap-Izz3hpJc",
				groupFooter: "groupFooter-Izz3hpJc",
			};
		},
		49934: (e) => {
			e.exports = { wrapper: "wrapper-JXHzsa7P" };
		},
		17611: (e) => {
			e.exports = { inlineRow: "inlineRow-D8g11qqA" };
		},
		93071: (e) => {
			e.exports = {
				container: "container-QyF09i7Y",
				hasTooltip: "hasTooltip-QyF09i7Y",
				datePickerWrapper: "datePickerWrapper-QyF09i7Y",
				timePickerWrapper: "timePickerWrapper-QyF09i7Y",
			};
		},
		27698: (e) => {
			e.exports = {
				input: "input-ZOx_CVY3",
				symbol: "symbol-ZOx_CVY3",
				checkbox: "checkbox-ZOx_CVY3",
				label: "label-ZOx_CVY3",
				dropdownMenu: "dropdownMenu-ZOx_CVY3",
				sessionStart: "sessionStart-ZOx_CVY3",
				sessionEnd: "sessionEnd-ZOx_CVY3",
				sessionInputContainer: "sessionInputContainer-ZOx_CVY3",
				sessionDash: "sessionDash-ZOx_CVY3",
				inputGroup: "inputGroup-ZOx_CVY3",
				textarea: "textarea-ZOx_CVY3",
				inlineGroup: "inlineGroup-ZOx_CVY3",
				hasTooltip: "hasTooltip-ZOx_CVY3",
			};
		},
		24712: (e) => {
			e.exports = {
				content: "content-tBgV1m0B",
				cell: "cell-tBgV1m0B",
				inner: "inner-tBgV1m0B",
				first: "first-tBgV1m0B",
				inlineCell: "inlineCell-tBgV1m0B",
				fill: "fill-tBgV1m0B",
				top: "top-tBgV1m0B",
				topCenter: "topCenter-tBgV1m0B",
				offset: "offset-tBgV1m0B",
				inlineRow: "inlineRow-tBgV1m0B",
				grouped: "grouped-tBgV1m0B",
				separator: "separator-tBgV1m0B",
				groupSeparator: "groupSeparator-tBgV1m0B",
				big: "big-tBgV1m0B",
				adaptive: "adaptive-tBgV1m0B",
				checkableTitle: "checkableTitle-tBgV1m0B",
			};
		},
		80128: (e) => {
			e.exports = {
				wrap: "wrap-QutFvTLS",
				labelWrap: "labelWrap-QutFvTLS",
				label: "label-QutFvTLS",
				hasTooltip: "hasTooltip-QutFvTLS",
			};
		},
		82161: (e, t, n) => {
			n.d(t, { splitThousands: () => r });
			const o = n(50335);
			function r(e, t = "&nbsp;") {
				let n = `${e}`;
				-1 !== n.indexOf("e") &&
					(n = ((e) =>
						(0, o.fixComputationError)(e)
							.toFixed(10)
							.replace(/\.?0+$/, ""))(Number(e)));
				const r = n.split(".");
				return (
					r[0].replace(/\B(?=(\d{3})+(?!\d))/g, t) + (r[1] ? `.${r[1]}` : "")
				);
			}
		},
		71468: (e, t, n) => {
			function o(e) {
				e.dispatchEvent(new CustomEvent("roving-tabindex:main-element"));
			}
			function r(e) {
				e.dispatchEvent(new CustomEvent("roving-tabindex:secondary-element"));
			}
			n.d(t, { becomeMainElement: () => o, becomeSecondaryElement: () => r });
		},
		83207: (e, t, n) => {
			n.d(t, { bind: () => a, setter: () => i });
			const o = n(50959);
			const r = n(76917);
			const s = n(27365);
			function a(e) {
				let t;
				return (
					(t = class extends o.PureComponent {
						constructor() {
							super(...arguments),
								(this._onChange = (e, t, n) => {
									const { setValue: o } = this.context;
									const { onChange: r } = this.props;
									i(o, r)(e, t, n);
								});
						}
						render() {
							const { input: t } = this.props;
							const { values: n, model: r } = this.context;
							return o.createElement(e, {
								...this.props,
								value: n[t.id],
								tzName: (0, s.getTimezoneName)(r),
								onChange: this._onChange,
							});
						}
					}),
					(t.contextType = r.PropertyContext),
					t
				);
			}
			function i(e, t) {
				return (n, o, r) => {
					e(o, n, r), t?.(n, o, r);
				};
			}
		},
		76917: (e, t, n) => {
			n.d(t, { PropertyContainer: () => u, PropertyContext: () => c });
			const o = n(50959);
			const r = n(50151);
			const s = n(44352);
			const a = n(36298);
			const i = (0, n(59224).getLogger)(
				"Platform.GUI.StudyInputPropertyContainer",
			);
			const l = new a.TranslatedString(
				"change {propertyName} property",
				s.t(null, void 0, n(18567)),
			);
			const c = o.createContext(null);
			class u extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._setValue = (e, t, o) => {
							const { property: c, model: u } = this.props;
							const p = (0, r.ensureDefined)(c.child(e));
							i.logNormal(
								`Changing property "${e}" value from "${c.value()}" to "${t}"`,
							);
							const d = new a.TranslatedString(
								o,
								((e) => s.t(e, { context: "input" }, n(88601)))(o),
							);
							u.setProperty(p, t, l.format({ propertyName: d }));
						});
					const { property: t } = e;
					const o = {};
					t.childNames().forEach((e) => {
						const n = (0, r.ensureDefined)(t.child(e));
						o.hasOwnProperty(e) || (o[e] = n.value());
					}),
						(this.state = o);
				}
				componentDidMount() {
					const { property: e, onStudyInputChange: t } = this.props;
					e.childNames().forEach((n) => {
						(0, r.ensureDefined)(e.child(n)).subscribe(this, (e) => {
							const o = e.value();
							i.logNormal(`Property "${n}" updated to value "${o}"`),
								this.setState({ [n]: o }),
								null == t || t(o, n);
						});
					});
				}
				componentWillUnmount() {
					const { property: e } = this.props;
					e.childNames().forEach((t) => {
						(0, r.ensureDefined)(e.child(t)).unsubscribeAll(this);
					});
				}
				render() {
					const { study: e, model: t, children: n } = this.props;
					const r = {
						study: e,
						model: t,
						values: this.state,
						setValue: this._setValue,
					};
					return o.createElement(c.Provider, { value: r }, n);
				}
			}
		},
		51717: (e, t, n) => {
			n.d(t, { ModelContext: () => r, bindModel: () => s });
			const o = n(50959);
			const r = o.createContext(null);
			function s(e, t) {
				return o.createElement(r.Consumer, null, (n) =>
					n ? o.createElement(e, { ...Object.assign({ model: n }, t) }) : null,
				);
			}
		},
		41594: (e, t, n) => {
			n.d(t, {
				StylePropertyContainer: () => a,
				StylePropertyContext: () => s,
				bindPropertyContext: () => i,
			});
			const o = n(50959);
			const r = n(51717);
			const s = o.createContext(null);
			class a extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._setValue = (e, t, n) => {
							const { model: o } = this.props;
							o.setProperty(e, t, n);
						});
				}
				componentDidMount() {
					const { property: e } = this.props;
					e.subscribe(this, () => this.forceUpdate());
				}
				componentWillUnmount() {
					const { property: e } = this.props;
					e.unsubscribeAll(this);
				}
				render() {
					const e = { setValue: this._setValue };
					return o.createElement(s.Provider, { value: e }, this.props.children);
				}
			}
			function i(e, t) {
				return (0, r.bindModel)(
					({ model: n }) =>
						o.createElement(
							a,
							{ model: n, property: t.property },
							o.createElement(e, { ...t }),
						),
					t,
				);
			}
		},
		76694: (e, t, n) => {
			n.d(t, { IconGroupWrapper: () => s });
			const o = n(50959);
			const r = n(49934);
			function s(e) {
				const { children: t } = e;
				return o.createElement("div", { className: r.wrapper }, t);
			}
		},
		39847: (e, t, n) => {
			n.d(t, { InputTooltip: () => E });
			const o = n(50959);
			const r = n(97754);
			const s = n(90186);
			const a = n(9745);
			const i = n(5325);
			function l() {
				const [e, t] = (0, o.useState)(!1);
				return (
					(0, o.useEffect)(() => {
						t(i.mobiletouch);
					}, []),
					e
				);
			}
			const c = n(38952);
			const u = n(38528);
			const p = n(82353);
			const d = n(27941);
			const h = n(99084);
			const m = n(30162);
			const v = n(78370);
			const g = n.n(v);
			const f = { info: d, question: p, check: h, exclamation: m };
			function b(e) {
				return o.createElement("span", {
					...(0, c.renameRef)(e),
					className: r(e.className, g()["no-active-state"]),
				});
			}
			function C(e) {
				const {
					icon: t,
					intent: n = "default",
					ariaLabel: i,
					tooltip: c,
					className: p,
					reference: d,
					showTooltipOnTouch: h = !0,
					renderComponent: m = b,
					showTooltip: v,
					hideTooltip: C,
					onFocus: y,
					onBlur: E,
					onClick: S,
					tabIndex: w,
				} = e;
				const _ = l() ? h : Boolean(c);
				const x = o.useRef(null);
				const N = (0, u.useMergedRefs)([d, x]);
				const I = ((e) => {
					const {
						tabIndex: t = 0,
						showTooltip: n,
						hideTooltip: r,
						onFocus: s,
						onBlur: a,
						onClick: i,
						ref: c,
					} = e;
					const u = l();
					return {
						onBlur: (0, o.useCallback)(
							(e) => {
								r?.(), a?.(e);
							},
							[r, a],
						),
						onFocus: (0, o.useCallback)(
							(e) => {
								n?.(e.currentTarget, { tooltipDelay: 200 }), s?.(e);
							},
							[n, s],
						),
						onClick: (0, o.useCallback)(
							(e) => {
								let t;
								u && (null === (t = c.current) || void 0 === t || t.focus()),
									i?.(e);
							},
							[i],
						),
						tabIndex: t,
					};
				})({
					showTooltip: v,
					hideTooltip: C,
					onFocus: y,
					onBlur: E,
					onClick: S,
					ref: x,
					tabIndex: w,
				});
				const T = o.useMemo(
					() =>
						((e, t) => (t ? f[t] : "success" === e ? f.check : f.exclamation))(
							n,
							t,
						),
					[t, n],
				);
				return o.createElement(
					m,
					{
						className: r(
							p,
							g()["icon-wrapper"],
							g()[`intent-${n}`],
							_ && c && g()["with-tooltip"],
							_ && c && "apply-common-tooltip",
						),
						title: _ ? c : void 0,
						"aria-label": i,
						reference: N,
						...(0, s.filterDataProps)(e),
						...I,
					},
					o.createElement(a.Icon, {
						"aria-hidden": !0,
						icon: T,
						className: g().icon,
					}),
				);
			}
			const y = n(38780);
			function E(e) {
				const { className: t, title: n } = e;
				return o.createElement(C, {
					icon: "info",
					className: t,
					ariaLabel: n,
					showTooltip: y.showOnElement,
					hideTooltip: y.hide,
					tooltip: n,
					tabIndex: -1,
				});
			}
		},
		12949: (e, t, n) => {
			n.d(t, { InputRow: () => ne });
			const o = n(44352);
			const r = n(50959);
			const s = n(50151);
			const a = n(33703);
			const i = n(96438);
			const l = n(47510);
			const c = n(4781);
			const u = n(97754);
			const p = n.n(u);
			const d = n(31261);
			const h = n(83207);
			const m = n(90009);
			const v = n(27698);
			class g extends r.PureComponent {
				constructor() {
					super(...arguments),
						(this._onChange = (e) => {
							const {
								input: { id: t, name: n },
								onChange: o,
							} = this.props;
							o(e.currentTarget.value, t, n);
						});
				}
				render() {
					const {
						input: { defval: e },
						value: t,
						disabled: n,
						onBlur: o,
						onKeyDown: s,
						hasTooltip: a,
					} = this.props;
					return r.createElement(d.InputControl, {
						className: p()(v.input, a && v.hasTooltip),
						value: void 0 === t ? e : t,
						onChange: this._onChange,
						onBlur: o,
						onKeyDown: s,
						disabled: n,
						maxLength: 4096,
					});
				}
			}
			const f = (0, m.debounced)(g);
			const b = (0, h.bind)(f);
			const C = n(55141);
			const y = n(11062);
			function E(e) {
				const { className: t } = e;
				const n = (0, r.useContext)(y.PropertyTable.InlineRowContext);
				return r.createElement(
					"div",
					{ className: u(v.inputGroup, n && v.inlineGroup, t) },
					e.children,
				);
			}
			const S = n(36565);
			function w(e = "") {
				const [, t = "", n = "", o = "", r = ""] = Array.from(
					e.match(/^(\d\d)(\d\d)-(\d\d)(\d\d)/) || [],
				);
				return [`${t}:${n}`, `${o}:${r}`];
			}
			class _ extends r.PureComponent {
				constructor(e) {
					super(e),
						(this._onStartPick = (e) => {
							this.setState({ startTime: e }, this._onChange);
						}),
						(this._onEndPick = (e) => {
							this.setState({ endTime: e }, this._onChange);
						}),
						(this._onChange = () => {
							const {
								input: { id: e, name: t },
								onChange: n,
							} = this.props;
							const { startTime: o, endTime: r } = this.state;
							n(`${o.replace(":", "")}-${r.replace(":", "")}`, e, t);
						});
					const t = e.value || e.input.defval;
					const [n, o] = w(t);
					this.state = { prevValue: t, startTime: n, endTime: o };
				}
				render() {
					const { startTime: e, endTime: t } = this.state;
					const { hasTooltip: n, disabled: o } = this.props;
					return r.createElement(
						E,
						{ className: p()(n && v.hasTooltip) },
						r.createElement(
							"div",
							{ className: v.sessionStart },
							r.createElement(S.TimeInput, {
								className: p()(v.input, v.sessionInputContainer),
								name: "start",
								value: (0, s.ensureDefined)(e),
								onChange: this._onStartPick,
								disabled: o,
							}),
							r.createElement("span", { className: v.sessionDash }, " — "),
						),
						r.createElement(
							"div",
							{ className: v.sessionEnd },
							r.createElement(S.TimeInput, {
								className: p()(v.input, v.sessionInputContainer),
								name: "end",
								value: (0, s.ensureDefined)(t),
								onChange: this._onEndPick,
								disabled: o,
							}),
						),
					);
				}
				static getDerivedStateFromProps(e, t) {
					if (e.value === t.prevValue) return t;
					const [n, o] = w(e.value);
					return { prevValue: e.value, startTime: n, endTime: o };
				}
			}
			const x = (0, h.bind)(_);
			const N = n(14483);
			const I = n(42856);
			const T = n(37591);
			const B = n(76917);
			const k = n(90405);
			class P extends r.PureComponent {
				constructor() {
					super(...arguments),
						(this._onChange = (e) => {
							const {
								input: { id: t, name: n },
								onChange: o,
							} = this.props;
							o(e, t, n);
						});
				}
				render() {
					const {
						input: { id: e, defval: t, options: s, optionsTitles: a },
						value: i,
						disabled: l,
						hasTooltip: c,
					} = this.props;
					const u = s.map((e) => {
						const t = a?.[e] ? a[e] : e;
						return {
							value: e,
							content: o.t(t, { context: "input" }, n(88601)),
						};
					});
					const d = void 0 !== i && s.includes(i) ? i : t;
					return r.createElement(k.Select, {
						id: e,
						className: p()(v.input, c && v.hasTooltip),
						menuClassName: v.dropdownMenu,
						value: d,
						items: u,
						onChange: this._onChange,
						disabled: l,
					});
				}
			}
			const D = (0, h.bind)(P);
			const L = n(73146);
			const M = n(28853);
			const O = {
				open: o.t(null, void 0, n(38466)),
				high: o.t(null, void 0, n(39337)),
				low: o.t(null, void 0, n(3919)),
				close: o.t(null, void 0, n(36962)),
				hl2: o.t(null, void 0, n(91815)),
				hlc3: o.t(null, void 0, n(40771)),
				ohlc4: o.t(null, void 0, n(12504)),
				hlcc4: o.t(null, void 0, n(9523)),
			};
			class F extends r.PureComponent {
				render() {
					const { input: e } = this.props;
					const { study: t, model: n } = this.context;
					let o = { ...O };
					o.hlcc4 = undefined;
					const i = (0, L.createAdapter)(t);
					if (t && this._isStudy(t) && t.isChildStudy()) {
						const t = (0, a.getInputValue)(i.inputs()[e.id]);
						const n = i.parentSourceForInput(t);
						if ((0, M.isStudy)(n)) {
							const t = n.title(T.TitleDisplayTarget.StatusLine);
							const r = I.StudyMetaInfo.getChildSourceInputTitles(
								e,
								n.metaInfo(),
								t,
							);
							o = { ...o, ...r };
						}
					}
					if (
						N.enabled("study_on_study") &&
						t &&
						this._isStudy(t) &&
						(t.isChildStudy() || I.StudyMetaInfo.canBeChild(t.metaInfo()))
					) {
						const e = [t, ...i.getAllChildren()];
						n.model()
							.allStudies()
							.filter((t) => t.canHaveChildren() && !e.includes(t))
							.forEach((e) => {
								const t = e.title(
									T.TitleDisplayTarget.StatusLine,
									!0,
									void 0,
									!0,
								);
								const n = e.id();
								const r = e.metaInfo();
								const a = r.styles;
								const i = r.plots || [];
								if (1 === i.length) o[`${n}$0`] = t;
								else if (i.length > 1) {
									const e = i.reduce((e, o, r) => {
										if (!I.StudyMetaInfo.canPlotBeSourceOfChildStudy(o.type))
											return e;
										let i;
										try {
											i = (0, s.ensureDefined)(
												(0, s.ensureDefined)(a)[o.id],
											).title;
										} catch (e) {
											i = o.id;
										}
										return { ...e, [`${n}$${r}`]: `${t}: ${i}` };
									}, {});
									o = { ...o, ...e };
								}
							});
					}
					const l = {
						...e,
						type: "text",
						options: Object.keys(o),
						optionsTitles: o,
					};
					return r.createElement(D, { ...this.props, input: l });
				}
				_isStudy(e) {
					return !e.hasOwnProperty("isInputsStudy");
				}
			}
			F.contextType = B.PropertyContext;
			const V = n(36274);
			const A = n(94025);
			const R = void 0;
			const W = [
				"1",
				"3",
				"5",
				"15",
				"30",
				"45",
				"60",
				"120",
				"180",
				"240",
				"1D",
				"1W",
				"1M",
				"3M",
				"6M",
				"12M",
			];
			const q = ["1S", "5S", "10S", "15S", "30S"];
			class z extends r.PureComponent {
				constructor() {
					super(...arguments),
						(this._onChange = (e) => {
							const {
								input: { id: t, name: n },
								onChange: o,
							} = this.props;
							o(e, t, n);
						});
				}
				render() {
					const { input: e, value: t, disabled: s, hasTooltip: a } = this.props;
					const i = V.Interval.parse(void 0 === t ? e.defval : t);
					const l = i.isValid() ? i.value() : t;
					const c = R
						? R.get().filter((e) => !V.Interval.parse(e).isRange())
						: [];
					const u = (0, A.mergeResolutions)(
						W,
						(0, A.isSecondsEnabled)() ? q : [],
						c,
					);
					return (
						u.unshift(""),
						r.createElement(k.Select, {
							id: e.id,
							className: p()(v.input, v.resolution, a && v.hasTooltip),
							menuClassName: p()(v.dropdownMenu, v.resolution),
							items:
								((d = u),
								d.map((e) => ({
									value: e,
									content:
										"" === e
											? o.t(null, void 0, n(94551))
											: (0, A.getTranslatedResolutionModel)(e).hint,
								}))),
							value: l,
							onChange: this._onChange,
							disabled: s,
						})
					);
					let d;
				}
			}
			const U = (0, h.bind)(z);
			const Z = n(41552);
			const Y = n(41594);
			class G extends r.PureComponent {
				render() {
					return r.createElement(B.PropertyContext.Consumer, null, (e) =>
						e ? this._getColorInputWithContext(e) : null,
					);
				}
				_getColorInputWithContext(e) {
					let t;
					const {
						input: { id: n },
						disabled: o,
						hasTooltip: s,
					} = this.props;
					const { model: a, study: i } = e;
					if ("properties" in i || "tempProperties" in i) {
						const e =
							"properties" in i
								? i.properties().inputs[n]
								: null === (t = i.tempProperties) || void 0 === t
								  ? void 0
								  : t.inputs.child(n);
						return r.createElement(
							Y.StylePropertyContainer,
							{ model: a, property: e },
							r.createElement(Z.ColorWithThicknessSelect, {
								className: p()(s && v.hasTooltip),
								color: e,
								disabled: o,
							}),
						);
					}
					return null;
				}
			}
			const H = n(85528);
			const K = n(76056);
			const $ = n(23935);
			const j = n(27365);
			const X = n(93071);
			const Q = (0, h.bind)((e) => {
				const { value: t, onChange: n, input: o, tzName: s, hasTooltip: a } = e;
				const { id: i, name: l, defval: c } = o;
				const u = (0, r.useMemo)(() => Number(null != t ? t : c), [t, c]);
				const d = (0, r.useMemo)(
					() => (0, j.getChartTimezoneOffsetMs)(u, s),
					[u, s],
				);
				const h = (0, r.useMemo)(() => {
					const e = new Date(u + d + v(u));
					return e.setSeconds(0), e;
				}, [u, d]);
				const m = (0, r.useMemo)(
					() =>
						`${(0, $.twoDigitsFormat)(h.getHours())}:${(0, $.twoDigitsFormat)(
							h.getMinutes(),
						)}`,
					[h],
				);
				return r.createElement(
					"div",
					{ className: p()(X.container, a && X.hasTooltip) },
					r.createElement(
						"div",
						{ className: X.datePickerWrapper },
						r.createElement(H.DatePicker, {
							InputComponent: K.DateInput,
							initial: h,
							onPick: (e) => {
								if (null === e) return;
								const t = new Date(h);
								t.setFullYear(e.getFullYear()),
									t.setMonth(e.getMonth()),
									t.setDate(e.getDate()),
									n(g(t), i, l);
							},
							revertInvalidData: !0,
						}),
					),
					r.createElement(
						"div",
						{ className: X.timePickerWrapper },
						r.createElement(S.TimeInput, {
							value: m,
							onChange: (e) => {
								const [t, o] = e.split(":");
								const r = new Date(h);
								r.setHours(Number(t)), r.setMinutes(Number(o)), n(g(r), i, l);
							},
						}),
					),
				);
				function v(e) {
					return 60 * new Date(e).getTimezoneOffset() * 1e3;
				}
				function g(e) {
					return e.valueOf() - d - v(u);
				}
			});
			class J extends r.PureComponent {
				render() {
					const {
						input: e,
						disabled: t,
						onChange: n,
						tzName: o,
						hasTooltip: s,
					} = this.props;
					if ((0, a.isStudyInputOptionsInfo)(e))
						return r.createElement(D, {
							input: e,
							disabled: t,
							onChange: n,
							hasTooltip: s,
						});
					switch (e.type) {
						case "integer":
							return r.createElement(i.IntegerInput, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "float":
						case "price":
							return r.createElement(l.FloatInput, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "bool":
							return r.createElement(c.BoolInput, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "text":
							return r.createElement(b, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "symbol":
							return r.createElement(C.SymbolInput, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "session":
							return r.createElement(x, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "source":
							return r.createElement(F, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "resolution":
							return r.createElement(U, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						case "time":
							return r.createElement(Q, {
								input: e,
								tzName: o,
								onChange: n,
								hasTooltip: s,
							});
						case "color":
							return r.createElement(G, {
								input: e,
								disabled: t,
								onChange: n,
								hasTooltip: s,
							});
						default:
							return null;
					}
				}
			}
			const ee = n(39847);
			const te = n(76694);
			class ne extends r.PureComponent {
				render() {
					const {
						label: e,
						children: t,
						input: a,
						disabled: i,
						onChange: l,
						labelAlign: c,
						grouped: u,
						tooltip: p,
						solutionId: d,
						offset: h,
					} = this.props;
					const m = Boolean(p);
					return r.createElement(
						y.PropertyTable.Row,
						null,
						r.createElement(
							y.PropertyTable.Cell,
							{
								"data-study-input-name":
									(null == a ? void 0 : a.id) && `${a.id}-label`,
								placement: "first",
								verticalAlign: c,
								grouped: u,
								offset: h,
							},
							void 0 !== e
								? e
								: o.t(
										(0, s.ensureDefined)(a).name,
										{ context: "input" },
										n(88601),
								  ),
						),
						r.createElement(
							y.PropertyTable.Cell,
							{
								"data-study-input-name":
									(null == a ? void 0 : a.id) && `${a.id}-input`,
								placement: "last",
								grouped: u,
							},
							t ||
								r.createElement(J, {
									input: (0, s.ensureDefined)(a),
									onChange: l,
									disabled: i,
									hasTooltip: m,
								}),
							m &&
								r.createElement(
									te.IconGroupWrapper,
									null,
									p && r.createElement(ee.InputTooltip, { title: p }),
									!1,
								),
						),
					);
				}
			}
		},
		39828: (e, t, n) => {
			n.d(t, { InputsTabContent: () => W });
			let o;
			const r = n(50959);
			const s = n(50151);
			const a = n(44352);
			const i = n(76917);
			const l = n(11062);
			const c = n(57733);
			const u = n(97754);
			const p = n.n(u);
			const d = n(88400);
			const h = n.n(d);
			const m = (0, c.makeSwitchGroupItem)(
				(((o = class extends r.PureComponent {
					constructor() {
						super(...arguments),
							(this._onChange = () => {
								this.props.onChange?.(this.props.value);
							});
					}
					render() {
						const e = u(this.props.className, h().radio, {
							[h().reverse]: Boolean(this.props.labelPositionReverse),
						});
						const t = u(h().label, { [h().disabled]: this.props.disabled });
						const n = u(h().box, {
							[h().noOutline]: -1 === this.props.tabIndex,
						});
						let o = null;
						return (
							this.props.label &&
								(o = r.createElement(
									"span",
									{ className: t },
									this.props.label,
								)),
							r.createElement(
								"label",
								{ className: e },
								r.createElement(
									"span",
									{ className: h().wrapper, title: this.props.title },
									r.createElement("input", {
										id: this.props.id,
										tabIndex: this.props.tabIndex,
										autoFocus: this.props.autoFocus,
										role: this.props.role,
										className: h().input,
										type: "radio",
										name: this.props.name,
										checked: this.props.checked,
										disabled: this.props.disabled,
										value: this.props.value,
										onChange: this._onChange,
										ref: this.props.reference,
										"aria-describedby": this.props["aria-describedby"],
										"aria-invalid": this.props["aria-invalid"],
									}),
									r.createElement("span", { className: n }),
								),
								o,
							)
						);
					}
				}).defaultProps = { value: "on" }),
				o),
			);
			const v = n(55141);
			const g = n(83207);
			const f = n(39847);
			const b = n(76694);
			const C = n(27698);
			function y(e) {
				const {
					children: t,
					input: o,
					disabled: u,
					onChange: p,
					grouped: d,
					tooltip: h,
					solutionId: y,
				} = e;
				const E = (0, r.useContext)(i.PropertyContext);
				const { values: S, setValue: w } = (0, s.ensureNotNull)(E);
				const _ = S[o.id];
				const [x, N] = (0, r.useState)(_ ? "another-symbol" : "main-symbol");
				const [I, T] = (0, r.useState)(_);
				const B = Boolean(h);
				return (
					(0, r.useEffect)(() => {
						_ && T(_);
					}, [_]),
					r.createElement(
						c.SwitchGroup,
						{
							name: `symbol-source-${o.id}`,
							values: [x],
							onChange: (e) => {
								N(e),
									"main-symbol" === e
										? (0, g.setter)(w)("", o.id, o.name)
										: "another-symbol" === e &&
										  I &&
										  (0, g.setter)(w, p)(I, o.id, o.name);
							},
						},
						r.createElement(
							l.PropertyTable.Row,
							null,
							r.createElement(
								l.PropertyTable.Cell,
								{
									colSpan: 2,
									placement: "first",
									grouped: d,
									"data-study-input-name":
										(null == o ? void 0 : o.id) && `${o.id}-main-symbol`,
								},
								r.createElement(m, {
									value: "main-symbol",
									className: C.checkbox,
									disabled: u,
									label: r.createElement(
										"span",
										{ className: C.label },
										a.t(null, { context: "input" }, n(88046)),
									),
								}),
							),
						),
						r.createElement(
							l.PropertyTable.Row,
							null,
							r.createElement(
								l.PropertyTable.Cell,
								{
									placement: "first",
									grouped: d,
									"data-study-input-name":
										(null == o ? void 0 : o.id) &&
										`${o.id}-another-symbol-label`,
								},
								r.createElement(m, {
									value: "another-symbol",
									className: C.checkbox,
									disabled: u,
									label: r.createElement(
										"span",
										{ className: C.label },
										a.t(null, { context: "input" }, n(73755)),
									),
								}),
							),
							r.createElement(
								l.PropertyTable.Cell,
								{
									placement: "last",
									grouped: d,
									"data-study-input-name":
										(null == o ? void 0 : o.id) &&
										`${o.id}-another-symbol-input`,
								},
								t ||
									r.createElement(v.SymbolInput, {
										input: (0, s.ensureDefined)(o),
										onChange: p,
										disabled: u || "main-symbol" === x,
										hasTooltip: B,
									}),
								B &&
									r.createElement(
										b.IconGroupWrapper,
										null,
										h && r.createElement(f.InputTooltip, { title: h }),
										!1,
									),
							),
						),
					)
				);
			}
			const E = n(4781);
			class S extends r.PureComponent {
				render() {
					const { label: e, input: t, tooltip: n, solutionId: o } = this.props;
					const s = Boolean(n);
					return r.createElement(
						l.PropertyTable.Row,
						null,
						r.createElement(
							l.PropertyTable.Cell,
							{
								placement: "first",
								colSpan: 2,
								"data-study-input-name":
									(null == t ? void 0 : t.id) && `${t.id}-checkbox`,
							},
							r.createElement(E.BoolInput, {
								label: e,
								input: t,
								hasTooltip: s,
							}),
							s &&
								r.createElement(
									b.IconGroupWrapper,
									null,
									n && r.createElement(f.InputTooltip, { title: n }),
									!1,
								),
						),
					);
				}
			}
			const w = n(12949);
			const _ = n(2568);
			const x = n(67029);
			const N = n(90009);
			class I extends r.PureComponent {
				constructor() {
					super(...arguments),
						(this._onChange = (e) => {
							const {
								input: { id: t, name: n },
								onChange: o,
							} = this.props;
							o(e.currentTarget.value, t, n);
						});
				}
				render() {
					const {
						input: { defval: e },
						value: t,
						disabled: n,
						onBlur: o,
						onKeyDown: s,
					} = this.props;
					return r.createElement(_.Textarea, {
						className: p()(C.input, C.textarea, x.InputClasses.FontSizeMedium),
						value: void 0 === t ? e : t,
						onChange: this._onChange,
						onBlur: o,
						onKeyDown: s,
						disabled: n,
						maxLength: 4096,
					});
				}
			}
			const T = (0, N.debounced)(I);
			const B = (0, g.bind)(T);
			const k = n(80128);
			function P(e) {
				const { input: t, label: n, tooltip: o, solutionId: s } = e;
				const a = Boolean(o);
				return r.createElement(
					l.PropertyTable.Row,
					null,
					r.createElement(
						l.PropertyTable.Cell,
						{
							placement: "first",
							colSpan: 2,
							className: k.wrap,
							"data-study-input-name":
								(null == t ? void 0 : t.id) && `${t.id}-textarea`,
						},
						r.createElement(
							"div",
							{ className: k.labelWrap },
							r.createElement(
								"span",
								{ className: p()(k.label, a && k.hasTooltip) },
								n,
							),
							a &&
								r.createElement(
									b.IconGroupWrapper,
									null,
									o && r.createElement(f.InputTooltip, { title: o }),
									!1,
								),
						),
						r.createElement(B, { input: t }),
					),
				);
			}
			function D(e) {
				const { input: t, tooltip: o, solutionId: s } = e;
				return "symbol" === t.type && t.optional
					? r.createElement(y, { input: t, tooltip: o, solutionId: s })
					: "bool" === t.type
					  ? r.createElement(S, {
								label: a.t(t.name, { context: "input" }, n(88601)),
								input: t,
								tooltip: o,
								solutionId: s,
						  })
					  : "text_area" === t.type
						  ? r.createElement(P, {
									label: a.t(t.name, { context: "input" }, n(88601)),
									input: t,
									tooltip: o,
									solutionId: s,
							  })
						  : r.createElement(w.InputRow, {
									labelAlign: ((e) => {
										switch (e) {
											case "session":
												return "adaptive";
											case "time":
												return "topCenter";
											default:
												return;
										}
									})(t.type),
									input: t,
									tooltip: o,
									solutionId: s,
							  });
			}
			const L = n(86067);
			const M = n(17611);
			function O(e) {
				const { content: t } = e;
				let n;
				return r.createElement(
					l.PropertyTable.InlineRowContext.Provider,
					{ value: !0 },
					r.createElement(
						"div",
						{ className: M.inlineRow },
						t.children.map(
							(e, o) => (
								void 0 !== e.tooltip && (n = e.tooltip),
								r.createElement(D, {
									key: e.id,
									input: e,
									tooltip: o === t.children.length - 1 ? n : void 0,
								})
							),
						),
					),
				);
			}
			const F = n(64420);
			const V = n(26278);
			function A(e) {
				const { content: t } = e;
				return (0, F.isGroup)(t)
					? (0, F.isInputInlines)(t)
						? r.createElement(O, { content: t })
						: r.createElement(
								r.Fragment,
								null,
								r.createElement(
									"div",
									{ className: V.titleWrap },
									r.createElement(L.GroupTitleSection, {
										title: a.t(t.id, { context: "input" }, n(88601)),
										name: t.id,
									}),
								),
								t.children.map((e) =>
									(0, F.isGroup)(e)
										? r.createElement(O, { key: e.id, content: e })
										: r.createElement(D, {
												key: e.id,
												input: e,
												tooltip: e.tooltip,
												solutionId: e.solutionId,
										  }),
								),
								r.createElement("div", { className: V.groupFooter }),
						  )
					: r.createElement(D, {
							input: t,
							tooltip: t.tooltip,
							solutionId: t.solutionId,
					  });
			}
			const R = { offset: a.t(null, void 0, n(89298)) };
			class W extends r.PureComponent {
				render() {
					const {
						reference: e,
						inputs: t,
						property: n,
						study: o,
						studyMetaInfo: a,
						model: i,
						onStudyInputChange: c,
						className: u,
					} = this.props;
					const { offset: p, offsets: d } = n;
					return r.createElement(
						l.PropertyTable,
						{ reference: e, className: u },
						r.createElement(q, {
							study: o,
							model: i,
							property: n.inputs,
							inputs: t,
							onStudyInputChange: c,
						}),
						p && this._createOffsetSection(p, (0, s.ensureDefined)(a.offset)),
						d?.childNames().map((e) => {
							let t;
							const n = d.childs()[e];
							return this._createOffsetSection(
								n,
								(0, s.ensureDefined)(
									null === (t = a.offsets) || void 0 === t ? void 0 : t[e],
								),
							);
						}),
					);
				}
				_createOffsetSection(e, t) {
					const n = e.childs();
					return r.createElement(q, {
						key: `offset_${t.title}`,
						study: this.props.study,
						model: this.props.model,
						inputs: [z(n, t)],
						property: e,
					});
				}
			}
			function q(e) {
				const {
					study: t,
					model: n,
					inputs: o,
					property: s,
					onStudyInputChange: a,
				} = e;
				const l = o;
				const c = (0, r.useMemo)(() => (0, F.getInputGroups)(l), [l]);
				return r.createElement(
					i.PropertyContainer,
					{ property: s, study: t, model: n, onStudyInputChange: a },
					!1,
					!1,
					c.map((e) =>
						r.createElement(
							r.Fragment,
							{ key: e.id },
							r.createElement(A, { content: e }),
							!1,
						),
					),
				);
			}
			function z(e, t) {
				return {
					id: "val",
					name: t.title || R.offset,
					defval: e.val.value(),
					type: "integer",
					min: t.min,
					max: t.max,
				};
			}
		},
		4781: (e, t, n) => {
			n.d(t, { BoolInput: () => u, BoolInputComponent: () => c });
			const o = n(50959);
			const r = n(15294);
			const s = n(97754);
			const a = n.n(s);
			const i = n(83207);
			const l = n(27698);
			class c extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._onChange = () => {
							const {
								input: { id: e, name: t },
								value: n,
								onChange: o,
							} = this.props;
							o(!n, e, t);
						});
				}
				render() {
					const {
						input: { defval: e },
						value: t,
						disabled: n,
						label: s,
						hasTooltip: i,
					} = this.props;
					const c = void 0 === t ? e : t;
					return o.createElement(r.Checkbox, {
						className: a()(l.checkbox, i && l.hasTooltip),
						disabled: n,
						checked: c,
						onChange: this._onChange,
						label: o.createElement("span", { className: l.label }, s),
						labelAlignBaseline: !0,
					});
				}
			}
			const u = (0, i.bind)(c);
		},
		90009: (e, t, n) => {
			n.d(t, { debounced: () => s });
			const o = n(50959);
			const r = { blur: 0, commit: 0, change: 1 / 0 };
			function s(e, t = r) {
				return class extends o.PureComponent {
					constructor(e) {
						super(e),
							(this._onChange = (e, n, o) => {
								const r = t.change;
								r
									? (clearTimeout(this._timeout),
									  this.setState({ value: e }, () => {
											r !== 1 / 0 &&
												(this._timeout = setTimeout(() => this._flush(), r));
									  }))
									: this._flush(e);
							}),
							(this._onBlur = () => {
								this._debounce(t.blur);
								const { onBlur: e } = this.props;
								e?.();
							}),
							(this._onKeyDown = (e) => {
								13 === e.keyCode && this._debounce(t.commit);
							}),
							(this.state = { prevValue: e.value, value: e.value });
					}
					componentWillUnmount() {
						this._flush();
					}
					render() {
						const { value: t } = this.state;
						return o.createElement(e, {
							...this.props,
							value: t,
							onChange: this._onChange,
							onBlur: this._onBlur,
							onKeyDown: this._onKeyDown,
						});
					}
					static getDerivedStateFromProps(e, t) {
						return e.value === t.prevValue
							? t
							: { prevValue: e.value, value: e.value };
					}
					_debounce(e) {
						e
							? (clearTimeout(this._timeout),
							  e !== 1 / 0 &&
									(this._timeout = setTimeout(() => this._flush(), e)))
							: this.setState((e) => {
									this._flush(e.value);
							  });
					}
					_flush(e) {
						const {
							input: { id: t, name: n },
							onChange: o,
						} = this.props;
						const { prevValue: r, value: s } = this.state;
						clearTimeout(this._timeout);
						const a = void 0 !== e ? e : s;
						void 0 !== a && a !== r && o(a, t, n);
					}
				};
			}
		},
		47510: (e, t, n) => {
			n.d(t, { FloatInput: () => d, FloatInputComponent: () => p });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(95052);
			const i = n(83207);
			const l = n(90009);
			const c = n(27698);
			class u extends o.PureComponent {
				render() {
					const { hasTooltip: e } = this.props;
					return o.createElement(a.NumericInput, {
						...this.props,
						className: s()(c.input, e && c.hasTooltip),
						stretch: !1,
					});
				}
			}
			const p = (0, l.debounced)(u, { change: 1 / 0, commit: 0, blur: 0 });
			const d = (0, i.bind)(p);
		},
		96438: (e, t, n) => {
			n.d(t, { IntegerInput: () => d, IntegerInputComponent: () => p });
			const o = n(50959);
			const r = n(97754);
			const s = n.n(r);
			const a = n(83207);
			const i = n(90009);
			const l = n(95052);
			const c = n(27698);
			class u extends o.PureComponent {
				render() {
					const { hasTooltip: e } = this.props;
					return o.createElement(l.NumericInput, {
						...this.props,
						mode: "integer",
						className: s()(c.input, e && c.hasTooltip),
						stretch: !1,
					});
				}
			}
			const p = (0, i.debounced)(u, { change: 1 / 0, commit: 0, blur: 0 });
			const d = (0, a.bind)(p);
		},
		95052: (e, t, n) => {
			n.d(t, { NumericInput: () => y });
			const o = n(50959);
			const r = n(50151);
			const s = n(44352);
			const a = n(60521);
			const i = n(49483);
			const l = n(92399);
			const c = n(82161);
			const u = n(38223);
			const p = n(87663);
			const d = n(37160);
			const h = s.t(null, void 0, n(35563));
			const m = new (class {
				constructor(e = " ") {
					this._divider = e;
				}
				format(e) {
					const t = (0, c.splitThousands)(e, this._divider);
					return (0, u.isRtl)() ? (0, u.startWithLTR)(t) : t;
				}
				parse(e) {
					const t = (0, u.stripLTRMarks)(e).split(this._divider).join("");
					const n = Number(t);
					return Number.isNaN(n) || /e/i.test(t)
						? { res: !1 }
						: { res: !0, value: n, suggest: this.format(n) };
				}
			})();
			const v = /^-?[0-9]*$/;
			const g = 9e15;
			class f extends o.PureComponent {
				constructor(e) {
					super(e),
						(this._onFocus = (e) => {
							this.setState({ focused: !0 }), this.props.onFocus?.(e);
						}),
						(this._onBlur = (e) => {
							this.setState({ focused: !1 }),
								!1 !== this.props.shouldApplyValueOnBlur &&
									(this.setState({
										displayValue: b(this.props, this.props.value),
									}),
									this.props.errorHandler?.(!1)),
								this.props.onBlur?.(e);
						}),
						(this._onValueChange = (e) => {
							const t = e.target.value;
							if (
								(void 0 !== this.props.onEmptyString &&
									"" === t &&
									this.props.onEmptyString(),
								"integer" === this.props.mode && !v.test(t))
							)
								return;
							const n = C(t, this.props.formatter);
							const o = n.res
								? this._checkValueBoundaries(n.value)
								: { isPassed: !1, msg: void 0 };
							const r = n.res && !o.isPassed;
							const s =
								n.res && n.suggest && !this.state.focused ? n.suggest : t;
							const a = r && o.msg ? o.msg : h;
							this.setState({ displayValue: s, errorMsg: a }),
								n.res &&
									o.isPassed &&
									this.props.onValueChange(n.value, "input"),
								this.props.errorHandler?.(!n.res || r);
						}),
						(this._onValueByStepChange = (e) => {
							const {
								roundByStep: t = !0,
								step: n = 1,
								uiStep: o,
								min: r = n,
								formatter: s,
							} = this.props;
							const i = C(this.state.displayValue, s);
							const l = null != o ? o : n;
							let c = n;
							if (i.res) {
								const o = new a.Big(i.value);
								const s = o.minus(r).mod(n);
								let u = o.plus(e * l);
								!s.eq(0) && t && (u = u.plus((e > 0 ? 0 : 1) * l).minus(s)),
									(c = u.toNumber());
							}
							const { isPassed: u, clampedValue: p } =
								this._checkValueBoundaries(c);
							(c = u ? c : p),
								this.setState({ displayValue: b(this.props, c) }),
								this.props.onValueChange(c, "step"),
								this.props.errorHandler?.(!1);
						});
					const { value: t } = e;
					this.state = {
						value: t,
						displayValue: b(e, t),
						focused: !1,
						errorMsg: h,
					};
				}
				render() {
					let e;
					return o.createElement(l.NumberInputView, {
						id: this.props.id,
						inputMode:
							null !== (e = this.props.inputMode) && void 0 !== e
								? e
								: i.CheckMobile.iOS()
								  ? void 0
								  : "numeric",
						borderStyle: this.props.borderStyle,
						fontSizeStyle: this.props.fontSizeStyle,
						value: this.state.displayValue,
						forceShowControls: this.props.forceShowControls,
						className: this.props.className,
						inputClassName: this.props.inputClassName,
						button: this.props.button,
						placeholder: this.props.placeholder,
						innerLabel: this.props.innerLabel,
						endSlot: this.props.endSlot,
						disabled: this.props.disabled,
						warning: this.props.warning,
						error: this.props.error,
						errorMessage: this.props.errorMessage || this.state.errorMsg,
						onValueChange: this._onValueChange,
						onValueByStepChange: this._onValueByStepChange,
						containerReference: this.props.containerReference,
						inputReference: this.props.inputReference,
						onClick: this.props.onClick,
						onFocus: this._onFocus,
						onBlur: this._onBlur,
						onKeyDown: this.props.onKeyDown,
						controlDecKeyCodes: this.props.controlDecKeyCodes,
						controlIncKeyCodes: this.props.controlIncKeyCodes,
						title: this.props.title,
						intent: this.props.intent,
						highlight: this.props.highlight,
						highlightRemoveRoundBorder: this.props.highlightRemoveRoundBorder,
						stretch: this.props.stretch,
						autoSelectOnFocus: !i.CheckMobile.any(),
						"data-name": this.props["data-name"],
					});
				}
				getClampedValue() {
					const { min: e = -1 / 0, max: t = g } = this.props;
					const n = C(this.state.displayValue, this.props.formatter);
					return n.res ? (0, d.clamp)(n.value, e, t) : null;
				}
				static getDerivedStateFromProps(e, t) {
					const { alwaysUpdateValueFromProps: n, value: o } = e;
					return (t.focused && !n) || t.value === o
						? null
						: { value: o, displayValue: b(e, o) };
				}
				_checkValueBoundaries(e) {
					let t;
					let o;
					let r;
					let a;
					const { min: i = -1 / 0, max: l = g } = this.props;
					const c = ((e, t, n) => {
						const o = e >= t;
						const r = e <= n;
						return {
							passMin: o,
							passMax: r,
							pass: o && r,
							clamped: (0, d.clamp)(e, t, n),
						};
					})(e, i, l);
					let u;
					return (
						c.passMax ||
							(u =
								null !==
									(o =
										null === (t = this.props.boundariesErrorMessages) ||
										void 0 === t
											? void 0
											: t.greaterThanMax) && void 0 !== o
									? o
									: s.t(null, { replace: { max: String(l) } }, n(2607))),
						c.passMin ||
							(u =
								null !==
									(a =
										null === (r = this.props.boundariesErrorMessages) ||
										void 0 === r
											? void 0
											: r.lessThanMin) && void 0 !== a
									? a
									: s.t(null, { replace: { min: String(i) } }, n(53669))),
						{ isPassed: c.pass, msg: u, clampedValue: c.clamped }
					);
				}
			}
			function b(e, t) {
				const { useFormatter: n = !0, formatter: o, mode: r } = e;
				return n && "integer" !== r
					? ((e, t = m) => (null !== e ? t.format(e) : ""))(t, o)
					: ((e) => {
							if (null === e) return "";
							return p.NumericFormatter.formatNoE(e);
					  })(t);
			}
			function C(e, t = m) {
				return t.parse
					? t.parse(e)
					: { res: !1, error: "Formatter does not support parse" };
			}
			class y extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._container = null),
						(this._handleContainerRef = (e) => (this._container = e)),
						(this._onChange = (e, t) => {
							const {
								input: { id: n, name: o },
								onChange: r,
								onBlur: s,
							} = this.props;
							r(e, n, o), "step" === t && s && s();
						}),
						(this._onBlur = (e) => {
							const { onBlur: t } = this.props;
							if (t) {
								const n = (0, r.ensureNotNull)(this._container);
								n.contains(document.activeElement) ||
									n.contains(e.relatedTarget) ||
									t();
							}
						});
				}
				render() {
					const {
						input: { defval: e, min: t, max: n, step: r },
						value: s,
						disabled: a,
						onKeyDown: i,
						className: l,
						mode: c,
						stretch: u,
					} = this.props;
					return o.createElement(f, {
						className: l,
						value: Number(void 0 === s ? e : s),
						min: t,
						max: n,
						step: r,
						mode: c,
						onBlur: this._onBlur,
						onValueChange: this._onChange,
						onKeyDown: i,
						disabled: a,
						containerReference: this._handleContainerRef,
						fontSizeStyle: "medium",
						roundByStep: !1,
						stretch: u,
					});
				}
			}
		},
		55141: (e, t, n) => {
			n.d(t, { SymbolInput: () => p, getInternalSymbolName: () => c });
			const o = n(50959);
			const r = n(50151);
			const s = n(76917);
			const a = n(83207);
			const i = n(73146);
			const l = n(48897);
			function c(e, t) {
				const n = (0, i.createAdapter)(t).resolvedSymbolInfoBySymbol(e);
				return n && (n.ticker || n.full_name) ? n.ticker || n.full_name : e;
			}
			function u(e, t) {
				const n = (0, i.createAdapter)(t).resolvedSymbolInfoBySymbol(e);
				return null === n ? e : n.name;
			}
			const p = (0, a.bind)((e) => {
				const t = (0, o.useContext)(s.PropertyContext);
				const { study: n } = (0, r.ensureNotNull)(t);
				const {
					input: { defval: a },
					value: i,
				} = e;
				return o.createElement(l.SymbolInputsButton, {
					...e,
					value: u(i || a || "", n),
					study: n,
				});
			});
		},
		41552: (e, t, n) => {
			n.d(t, { ColorWithThicknessSelect: () => g });
			const o = n(50959);
			const r = n(24377);
			const s = n(44352);
			const a = n(36298);
			const i = n(87095);
			const l = n(41594);
			const c = n(58593);
			const u = n(17948);
			const p = n(51768);
			const d = new a.TranslatedString(
				"change thickness",
				s.t(null, void 0, n(95657)),
			);
			const h = new a.TranslatedString(
				"change color",
				s.t(null, void 0, n(13066)),
			);
			const m = new a.TranslatedString(
				"change opacity",
				s.t(null, void 0, n(17023)),
			);
			const v = [1, 2, 3, 4];
			class g extends o.PureComponent {
				constructor() {
					super(...arguments),
						(this._trackEventLabel = null),
						(this._getTransparencyValue = () => {
							const { transparency: e } = this.props;
							return e ? e.value() : 0;
						}),
						(this._getOpacityValue = () => {
							const { color: e } = this.props;
							const t = (0, u.getPropertyValue)(e);
							if (t)
								return (0, i.isHexColor)(t)
									? (0, i.transparencyToAlpha)(this._getTransparencyValue())
									: (0, r.parseRgba)(t)[3];
						}),
						(this._getColorValueInHex = () => {
							const { color: e } = this.props;
							const t = (0, u.getPropertyValue)(e);
							return t
								? (0, i.isHexColor)(t)
									? t
									: (0, r.rgbToHexString)((0, r.parseRgb)(t))
								: null;
						}),
						(this._onThicknessChange = (e) => {
							const { thickness: t } = this.props;
							void 0 !== t && this._setProperty(t, e, d);
						}),
						(this._onColorChange = (e) => {
							const { color: t, isPaletteColor: n } = this.props;
							const o = (0, u.getPropertyValue)(t);
							let s = 0;
							o &&
								(s = (0, i.isHexColor)(o)
									? this._getTransparencyValue()
									: (0, i.alphaToTransparency)((0, r.parseRgba)(o)[3])),
								this._setProperty(t, (0, i.generateColor)(String(e), s, !0), h),
								(this._trackEventLabel = `Plot color > ${
									n ? "Palette" : "Single"
								}`);
						}),
						(this._onOpacityChange = (e) => {
							const { color: t } = this.props;
							const n = (0, u.getPropertyValue)(t);
							this._setProperty(
								t,
								(0, i.generateColor)(n, (0, i.alphaToTransparency)(e), !0),
								m,
							);
						}),
						(this._onPopupClose = () => {
							this._trackEventLabel &&
								((0, p.trackEvent)(
									"GUI",
									"Study settings",
									this._trackEventLabel,
								),
								(this._trackEventLabel = null));
						});
				}
				componentWillUnmount() {
					this._onPopupClose();
				}
				render() {
					const {
						selectOpacity: e = !0,
						disabled: t,
						className: n,
					} = this.props;
					return o.createElement(c.ColorSelect, {
						className: n,
						disabled: t,
						color: this._getColorValueInHex(),
						selectOpacity: e,
						opacity: this._getOpacityValue(),
						thickness: this._getThicknessValue(),
						thicknessItems: v,
						onColorChange: this._onColorChange,
						onOpacityChange: this._onOpacityChange,
						onThicknessChange: this._onThicknessChange,
						onPopupClose: this._onPopupClose,
					});
				}
				_getThicknessValue() {
					const { thickness: e } = this.props;
					return e ? (0, u.getPropertyValue)(e) : void 0;
				}
				_setProperty(e, t, n) {
					const { setValue: o } = this.context;
					(0, u.setPropertyValue)(e, (e) => o(e, t, n));
				}
			}
			g.contextType = l.StylePropertyContext;
		},
		11062: (e, t, n) => {
			n.d(t, { PropertyTable: () => l });
			const o = n(50959);
			const r = n(97754);
			const s = n(90186);
			const a = n(24712);
			const i = o.createContext(!1);
			class l extends o.PureComponent {
				render() {
					return o.createElement(
						"div",
						{
							ref: this.props.reference,
							className: r(a.content, this.props.className),
						},
						this.props.children,
					);
				}
			}
			(l.InlineRowContext = i),
				(l.Row = (e) => {
					const { children: t } = e;
					return (0, o.useContext)(i)
						? o.createElement("span", { className: a.inlineRow }, t)
						: o.createElement(o.Fragment, null, t);
				}),
				(l.Cell = (e) => {
					const t = (0, o.useContext)(i);
					const n = r(
						a.cell,
						e.offset && a.offset,
						e.grouped && a.grouped,
						t && a.inlineCell,
						"top" === e.verticalAlign && a.top,
						"topCenter" === e.verticalAlign && a.topCenter,
						"adaptive" === e.verticalAlign && a.adaptive,
						e.checkableTitle && a.checkableTitle,
						2 === e.colSpan && a.fill,
						"first" === e.placement && 2 !== e.colSpan && a.first,
						"last" === e.placement && 2 !== e.colSpan && a.last,
					);
					const l = (0, s.filterDataProps)(e);
					return o.createElement(
						"div",
						{ ...l, className: n },
						o.createElement(
							"div",
							{ className: r(a.inner, e.className) },
							e.children,
						),
					);
				}),
				(l.Separator = (e) =>
					o.createElement(
						l.Row,
						null,
						o.createElement("div", {
							className: r(a.cell, a.separator, a.fill),
						}),
					)),
				(l.GroupSeparator = (e) => {
					const t = e.size || 0;
					return o.createElement(
						l.Row,
						null,
						o.createElement("div", {
							className: r(a.cell, a.groupSeparator, a.fill, 1 === t && a.big),
						}),
					);
				});
		},
		17948: (e, t, n) => {
			function o(e) {
				return Array.isArray(e) ? e[0].value() : e.value();
			}
			function r(e, t) {
				if (Array.isArray(e)) for (const n of e) t(n);
				else t(e);
			}
			n.d(t, { getPropertyValue: () => o, setPropertyValue: () => r });
		},
		99084: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm3.87-12.15c.36.2.49.66.28 1.02l-4 7a.75.75 0 0 1-1.18.16l-3-3a.75.75 0 1 1 1.06-1.06l2.3 2.3 3.52-6.14a.75.75 0 0 1 1.02-.28Z"/></svg>';
		},
		30162: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" fill-rule="evenodd" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM9 4c-.79 0-1.38.7-1.25 1.48l.67 4.03a.59.59 0 0 0 1.16 0l.67-4.03A1.27 1.27 0 0 0 9 4Zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/></svg>';
		},
		27941: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM8 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1 2c.49 0 1 .59 1 1v3.01c0 .42-.51.99-1 .99s-1-.57-1-.99V9c0-.41.51-1 1-1Z"/></svg>';
		},
		82353: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM6 7.5a3 3 0 1 1 6 0c0 .96-.6 1.48-1.17 1.98-.55.48-1.08.95-1.08 1.77h-1.5c0-1.37.7-1.9 1.33-2.38.49-.38.92-.71.92-1.37C10.5 6.67 9.82 6 9 6s-1.5.67-1.5 1.5H6Z"/></svg>';
		},
		65890: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9" width="11" height="9" fill="none"><path stroke-width="2" d="M0.999878 4L3.99988 7L9.99988 1"/></svg>';
		},
		93929: (e) => {
			e.exports =
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M13.5 7l1.65-1.65a.5.5 0 0 0 0-.7l-1.8-1.8a.5.5 0 0 0-.7 0L11 4.5M13.5 7L11 4.5M13.5 7l-8.35 8.35a.5.5 0 0 1-.36.15H2.5v-2.3a.5.5 0 0 1 .15-.35L11 4.5"/></svg>';
		},
	},
]);
