(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [5901],
  {
    59142: function (e, t) {
      var n, o, r;
      (o = [t]),
        (n = function (e) {
          "use strict";
          function t(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
              return n;
            }
            return Array.from(e);
          }
          Object.defineProperty(e, "__esModule", { value: !0 });
          var n = !1;
          if ("undefined" != typeof window) {
            var o = {
              get passive() {
                n = !0;
              },
            };
            window.addEventListener("testPassive", null, o),
              window.removeEventListener("testPassive", null, o);
          }
          var r =
              "undefined" != typeof window &&
              window.navigator &&
              window.navigator.platform &&
              /iP(ad|hone|od)/.test(window.navigator.platform),
            s = [],
            a = !1,
            i = -1,
            l = void 0,
            c = void 0,
            u = function (e) {
              return s.some(function (t) {
                return !(
                  !t.options.allowTouchMove || !t.options.allowTouchMove(e)
                );
              });
            },
            p = function (e) {
              var t = e || window.event;
              return (
                !!u(t.target) ||
                1 < t.touches.length ||
                (t.preventDefault && t.preventDefault(), !1)
              );
            },
            d = function () {
              setTimeout(function () {
                void 0 !== c &&
                  ((document.body.style.paddingRight = c), (c = void 0)),
                  void 0 !== l &&
                    ((document.body.style.overflow = l), (l = void 0));
              });
            };
          (e.disableBodyScroll = function (e, o) {
            if (r) {
              if (!e)
                return void console.error(
                  "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.",
                );
              if (
                e &&
                !s.some(function (t) {
                  return t.targetElement === e;
                })
              ) {
                var d = { targetElement: e, options: o || {} };
                (s = [].concat(t(s), [d])),
                  (e.ontouchstart = function (e) {
                    1 === e.targetTouches.length &&
                      (i = e.targetTouches[0].clientY);
                  }),
                  (e.ontouchmove = function (t) {
                    var n, o, r, s;
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
                setTimeout(function () {
                  if (void 0 === c) {
                    var e = !!m && !0 === m.reserveScrollBarGap,
                      t =
                        window.innerWidth -
                        document.documentElement.clientWidth;
                    e &&
                      0 < t &&
                      ((c = document.body.style.paddingRight),
                      (document.body.style.paddingRight = t + "px"));
                  }
                  void 0 === l &&
                    ((l = document.body.style.overflow),
                    (document.body.style.overflow = "hidden"));
                });
              var h = { targetElement: e, options: o || {} };
              s = [].concat(t(s), [h]);
            }
            var m;
          }),
            (e.clearAllBodyScrollLocks = function () {
              r
                ? (s.forEach(function (e) {
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
            (e.enableBodyScroll = function (e) {
              if (r) {
                if (!e)
                  return void console.error(
                    "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.",
                  );
                (e.ontouchstart = null),
                  (e.ontouchmove = null),
                  (s = s.filter(function (t) {
                    return t.targetElement !== e;
                  })),
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
                  : (s = s.filter(function (t) {
                      return t.targetElement !== e;
                    }));
            });
        }),
        void 0 === (r = "function" == typeof n ? n.apply(t, o) : n) ||
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
      "use strict";
      n.d(t, { CheckboxInput: () => u });
      var o = n(50959),
        r = n(97754),
        s = n(90186),
        a = n(9745),
        i = n(65890),
        l = n(70048),
        c = n.n(l);
      function u(e) {
        const t = r(c().box, c()[`intent-${e.intent}`], {
            [c().check]: !Boolean(e.indeterminate),
            [c().dot]: Boolean(e.indeterminate),
            [c().noOutline]: -1 === e.tabIndex,
          }),
          n = r(c().wrapper, e.className);
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
            onChange: function () {
              e.onChange && e.onChange(e.value);
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
      "use strict";
      n.d(t, { Checkbox: () => c });
      var o = n(50959),
        r = n(97754),
        s = n(57733),
        a = n(70673),
        i = n(69789),
        l = n.n(i);
      class c extends o.PureComponent {
        render() {
          const { inputClassName: e, labelClassName: t, ...n } = this.props,
            s = r(this.props.className, l().checkbox, {
              [l().reverse]: Boolean(this.props.labelPositionReverse),
              [l().baseline]: Boolean(this.props.labelAlignBaseline),
            }),
            i = r(l().label, t, { [l().disabled]: this.props.disabled });
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
      "use strict";
      n.d(t, { Textarea: () => C });
      var o,
        r = n(50959),
        s = n(97754),
        a = n(38528),
        i = n(29202),
        l = n(48027),
        c = n(45812),
        u = n(47201),
        p = n(48907),
        d = n(67029),
        h = n(78274),
        m = n(22623),
        v = n.n(m);
      !(function (e) {
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
          } = e,
          z = {
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
      const f = (e, t, n) => (t ? void 0 : e ? -1 : n),
        b = (e, t, n) => (t ? void 0 : e ? n : -1),
        C = r.forwardRef((e, t) => {
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
            } = e,
            I = (0, r.useRef)(null),
            T = (0, r.useRef)(null),
            {
              isMouseDown: B,
              handleMouseDown: k,
              handleMouseUp: P,
            } = (0, c.useIsMouseDown)(),
            [D, L] = (0, i.useFocus)(),
            M = (0, u.createSafeMulticastEventHandler)(
              L.onFocus,
              function (e) {
                h && !B.current && (0, p.selectAllContent)(e.currentTarget);
              },
              w,
            ),
            O = (0, u.createSafeMulticastEventHandler)(L.onBlur, _),
            F = void 0 !== E && E !== o.None,
            V = null != C ? C : F ? (y ? "thick" : "thin") : void 0,
            A = null != y ? y : !F && void 0;
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
            onContainerFocus: function (e) {
              T.current === e.target && null !== I.current && I.current.focus();
            },
            onFocus: M,
            onBlur: O,
            onMouseDown: k,
            onMouseUp: P,
            ref: function (e) {
              (I.current = e),
                "function" == typeof t ? t(e) : t && (t.current = e);
            },
            containerReference: (0, a.useMergedRefs)([S, T]),
            hasIcon: x,
          });
        });
      C.displayName = "Textarea";
    },
    36104: (e, t, n) => {
      "use strict";
      n.d(t, { useControlDisclosure: () => r });
      var o = n(7953);
      function r(e) {
        const { intent: t, highlight: n, ...r } = e,
          { isFocused: s, ...a } = (0, o.useDisclosure)(r);
        return {
          ...a,
          isFocused: s,
          highlight: null != n ? n : s,
          intent: null != t ? t : s ? "primary" : "default",
        };
      }
    },
    57733: (e, t, n) => {
      "use strict";
      n.d(t, { SwitchGroup: () => a, makeSwitchGroupItem: () => i });
      var o = n(50959);
      const r = function () {},
        s = (0, o.createContext)({
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
        var t;
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
      "use strict";
      n.d(t, { NumberInputView: () => T });
      var o = n(50959),
        r = n(32563),
        s = n(97754),
        a = n(67029),
        i = n(78274),
        l = n(86623),
        c = n(95263),
        u = n(1405),
        p = n(12863);
      const d = {
          large: a.InputClasses.FontSizeLarge,
          medium: a.InputClasses.FontSizeMedium,
        },
        h = {
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
          } = e,
          S = g && void 0 !== a ? [a] : void 0,
          w = f && void 0 !== a ? [a] : void 0,
          _ = s(p.inputContainer, d[u], t),
          x = b
            ? o.createElement(
                i.StartSlot,
                { className: p.innerLabel, interactive: !1 },
                b,
              )
            : void 0,
          N = m || v || y ? o.createElement(i.EndSlot, null, m, v, y) : void 0;
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
      var v = n(38528),
        g = n(44352),
        f = n(9745),
        b = n(21861),
        C = n(2948),
        y = n(21234);
      function E(e) {
        const t = s(y.control, y.controlIncrease),
          r = s(y.control, y.controlDecrease);
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
      var S = n(70412),
        w = n(29202),
        _ = n(47201),
        x = n(68335);
      const N = [38],
        I = [40];
      function T(e) {
        const [t, n] = (0, S.useHover)(),
          [s, a] = (0, w.useFocus)(),
          i = (0, o.useRef)(null),
          l = (0, _.createSafeMulticastEventHandler)(a.onFocus, e.onFocus),
          c = (0, _.createSafeMulticastEventHandler)(a.onBlur, e.onBlur),
          u = (0, o.useCallback)(
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
          button: (function () {
            const {
                button: n,
                forceShowControls: a,
                disabled: i,
                title: l,
              } = e,
              c = !i && !r.mobiletouch && (a || s || t);
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
          onKeyDown: function (t) {
            if (e.disabled || 0 !== (0, x.modifiersFromEvent)(t.nativeEvent))
              return;
            let n = N,
              o = I;
            e.controlDecKeyCodes && (o = o.concat(e.controlDecKeyCodes));
            e.controlIncKeyCodes && (n = n.concat(e.controlIncKeyCodes));
            (o.includes(t.keyCode) || n.includes(t.keyCode)) &&
              (t.preventDefault(),
              e.onValueByStepChange(o.includes(t.keyCode) ? -1 : 1));
            e.onKeyDown && e.onKeyDown(t);
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
          var t;
          e.disabled ||
            (null === (t = i.current) || void 0 === t || t.focus(),
            e.onValueByStepChange(1));
        }
        function d() {
          var t;
          e.disabled ||
            (null === (t = i.current) || void 0 === t || t.focus(),
            e.onValueByStepChange(-1));
        }
      }
    },
    58593: (e, t, n) => {
      "use strict";
      n.d(t, {
        ColorSelect: () => T,
      });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(50151),
        i = n(68335),
        l = n(20520),
        c = n(29202),
        u = n(34381),
        p = n(64706),
        d = n(16838),
        h = n(71468),
        m = n(63581);
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
          } = e,
          [y, E] = (0, o.useState)(!1),
          [S, w] = (0, o.useState)(!1),
          [_, x] = (0, c.useFocus)(),
          N = (0, o.useRef)(null),
          I = (0, o.useRef)(null),
          T = (0, o.useRef)(null);
        return o.createElement(
          "div",
          { className: r, "data-name": g },
          o.createElement(
            "button",
            {
              className: s()(d.PLATFORM_ACCESSIBILITY_ENABLED && m.accessible),
              tabIndex: d.PLATFORM_ACCESSIBILITY_ENABLED && !b ? 0 : -1,
              ref: T,
              onClick: function () {
                if (e.disabled) return;
                w((e) => !e), E(!1);
              },
              onFocus: x.onFocus,
              onBlur: x.onBlur,
              disabled: b,
            },
            "function" == typeof t ? t(S, _) : t,
          ),
          o.createElement(
            l.PopupMenu,
            {
              reference: I,
              controller: N,
              onFocus: function (e) {
                if (
                  !e.target ||
                  !d.PLATFORM_ACCESSIBILITY_ENABLED ||
                  e.target !== e.currentTarget
                )
                  return;
                const t = e.currentTarget,
                  n = (0, a.ensureNotNull)(
                    ((o = e.target),
                    o.querySelector(
                      '[data-role="swatch"]:not([disabled], [aria-disabled])',
                    )),
                  );
                var o;
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
                    n && n.focus();
                  });
              },
              isOpened: S,
              onClose: B,
              position: function () {
                const e = (0, a.ensureNotNull)(
                  T.current,
                ).getBoundingClientRect();
                return { x: e.left, y: e.top + e.height };
              },
              doNotCloseOn: T.current,
              onKeyDown: function (e) {
                if (27 === (0, i.hashFromEvent)(e))
                  S && (e.preventDefault(), B());
              },
              onOpen: function () {
                var e;
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
          w(!1), (0, a.ensureNotNull)(T.current).focus(), v && v();
        }
      }
      var g = n(56512),
        f = n(87095),
        b = n(6914),
        C = n(44352),
        y = n(57733),
        E = n(52272);
      const S = (0, y.makeSwitchGroupItem)(
        class extends o.PureComponent {
          constructor(e) {
            super(e),
              (this._onChange = () => {
                this.props.onChange && this.props.onChange(this.props.value);
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
            const { name: e, checked: t, value: n } = this.props,
              s = r(E.thicknessItem, {
                [E.checked]: t,
                [E.accessible]: d.PLATFORM_ACCESSIBILITY_ENABLED,
                [E.focusVisible]: this.state.isFocusVisible,
              }),
              a = r(E.bar, { [E.checked]: t }),
              i = { borderTopWidth: parseInt(n) };
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
        const { name: t, values: n, selectedValues: r, onChange: s } = e,
          a = n.map((e, t) =>
            o.createElement(S, { key: t, value: e.toString() }),
          ),
          i = r.map((e) => e.toString());
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
      var _ = n(86536);
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
      var I = n(28685);
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
          } = e,
          [f, b, C] = (0, g.useCustomColors)();
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
            button: function (e, t) {
              const n = e || t,
                c = n ? "primary" : "default";
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
                    ? (function () {
                        const e = B(a, l),
                          t = l >= 0.95 && k(a);
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
                    (function () {
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
              onChange: function (e) {
                p && p(e);
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
      "use strict";
      n.d(t, { SymbolInputsButton: () => x });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(44352),
        i = n(50151),
        l = n(60508),
        c = n(95711),
        u = n(14483),
        p = n(55141),
        d = n(65106),
        h = n(1861),
        m = n(9745),
        v = n(93929),
        g = n(60015);
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
      var b = n(31356),
        C = n(78260),
        y = n(44254),
        E = n(15983),
        S = n(82708),
        w = n(69006);
      function _(e) {
        const { symbol: t, onSymbolChanged: r, disabled: i, className: p } = e,
          [m, v] = (0, o.useState)(t),
          g = (0, o.useContext)(l.SlotContext),
          b = (0, o.useContext)(c.PopupContext);
        return o.createElement(f, {
          value: m,
          onClick: function () {
            const e = (function (e) {
                const t = (0, y.tokenize)(e);
                return (0, E.isSpread)(t);
              })(m)
                ? m
                : (0, S.safeShortName)(m),
              t = (0, d.getSymbolSearchCompleteOverrideFunction)();
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
                b && b.focus();
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
            } = e.definition,
            l = n[t],
            c = l.value() || "",
            u = (e) => {
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
            } = e,
            d = (e) => {
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
      "use strict";
      n.d(t, { showSymbolSearchItemsDialog: () => l });
      var o = n(50959),
        r = n(962),
        s = n(60508),
        a = n(51826),
        i = n(32456);
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
        const B = document.createElement("div"),
          k = o.createElement(
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
            C && C();
        }
        return (
          r.render(k, B),
          a.dialogsOpenerManager.setAsOpened("SymbolSearch"),
          y && y(),
          { close: P }
        );
      }
    },
    50238: (e, t, n) => {
      "use strict";
      n.d(t, { useRovingTabindexElement: () => a });
      var o = n(50959),
        r = n(39416),
        s = n(16838);
      function a(e, t = []) {
        const [n, a] = (0, o.useState)(!1),
          i = (0, r.useFunctionalRefObject)(e);
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
      "use strict";
      n.d(t, { createAdapter: () => s });
      var o = n(92249),
        r = n(28853);
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
      "use strict";
      n.d(t, { useDefinitionProperty: () => s });
      var o = n(50959),
        r = n(71953);
      const s = (e) => {
        const t = "property" in e ? e.property : void 0,
          n = "defaultValue" in e ? e.defaultValue : e.property.value(),
          [s, a] = (0, o.useState)(t ? t.value() : n);
        (0, o.useEffect)(() => {
          if (t) {
            const n = {};
            return (
              a(t.value()),
              t.subscribe(n, (t) => {
                const n = t.value();
                e.handler && e.handler(n), a(n);
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
      "use strict";
      n.d(t, { CellWrap: () => i });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(2746);
      function i(e) {
        return o.createElement(
          "div",
          { className: s()(a.wrap, e.className) },
          e.children,
        );
      }
    },
    53424: (e, t, n) => {
      "use strict";
      n.d(t, { CheckableTitle: () => c });
      var o = n(50959),
        r = n(15294),
        s = n(45560);
      function a(e) {
        const { property: t, ...n } = e,
          [a, i] = (0, s.useDefinitionProperty)({ property: t }),
          l = "mixed" === a;
        return o.createElement(r.Checkbox, {
          ...n,
          name: "toggle-enabled",
          checked: l || a,
          indeterminate: l,
          onChange: function () {
            i("mixed" === a || !a);
          },
        });
      }
      var i = n(78260),
        l = n(25679);
      function c(e) {
        const { property: t, disabled: n, title: r, className: s, name: c } = e,
          u = o.createElement("span", { className: l.title }, r);
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
      "use strict";
      n.d(t, { CommonSection: () => a });
      var o = n(50959),
        r = n(11062),
        s = n(53424);
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
              colSpan: Boolean(c) ? void 0 : 2,
              checkableTitle: !0,
            },
            o.createElement(s.CheckableTitle, {
              name: `is-enabled-${t}`,
              title: l,
              disabled: a,
              property: i,
            }),
            u && !Boolean(c) && !1,
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
      "use strict";
      n.d(t, { GroupTitleSection: () => i });
      var o = n(50959),
        r = n(11062),
        s = n(53424),
        a = n(69750);
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
      "use strict";
      n.d(t, { logger: () => o });
      const o = (0, n(59224).getLogger)("Platform.GUI.PropertyDefinitionTrace");
    },
    34381: (e, t, n) => {
      "use strict";
      n.d(t, { ColorPicker: () => $ });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(44352),
        i = n(16838),
        l = n(50151),
        c = n(68335),
        u = n(71468);
      const p = [37, 39, 38, 40];
      function d(e) {
        const t = (0, o.useRef)(null);
        return (
          (0, o.useLayoutEffect)(() => {
            if (!i.PLATFORM_ACCESSIBILITY_ENABLED) return;
            const e = (0, l.ensureNotNull)(t.current),
              n = () => {
                const n = (0, i.queryTabbableElements)(e).sort(
                  i.navigationOrderComparator,
                );
                if (
                  0 === n.length ||
                  (n[0].parentElement &&
                    !v(n[0].parentElement, (0, l.ensureNotNull)(t.current)))
                ) {
                  const o = (function (e) {
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
            function (t) {
              if (!i.PLATFORM_ACCESSIBILITY_ENABLED) return;
              if (t.defaultPrevented) return;
              const n = (0, c.hashFromEvent)(t);
              if (!p.includes(n)) return;
              const o = document.activeElement;
              if (!(o instanceof HTMLElement)) return;
              const r = t.currentTarget;
              let s, a;
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
              var l;
              if (0 === s.length || -1 === a) return;
              const u = (n) => {
                if (!document.activeElement) return;
                const o = m(r),
                  s = document.activeElement.parentElement;
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
        const n = (0, l.ensureNotNull)(e.parentElement).offsetTop,
          o = n + (0, l.ensureNotNull)(e.parentElement).clientHeight,
          r = t.scrollTop,
          s = r + t.clientHeight;
        return n >= r && o <= s;
      }
      function g(e) {
        document.activeElement &&
          (0, u.becomeSecondaryElement)(document.activeElement),
          (0, u.becomeMainElement)(e),
          e.focus();
      }
      var f = n(43688),
        b = n(93532),
        C = n(45582),
        y = Math.ceil,
        E = Math.max;
      const S = function (e, t, n) {
        t = (n ? (0, b.default)(e, t, n) : void 0 === t)
          ? 1
          : E((0, C.default)(t), 0);
        var o = null == e ? 0 : e.length;
        if (!o || t < 1) return [];
        for (var r = 0, s = 0, a = Array(y(o / t)); r < o; )
          a[s++] = (0, f.default)(e, r, (r += t));
        return a;
      };
      var w = n(24377),
        _ = n(49483),
        x = n(20520),
        N = n(16396);
      const I = o.createContext(void 0);
      var T = n(6914),
        B = n(50238),
        k = n(35149),
        P = n(87466);
      function D(e) {
        const { index: t, color: s, selected: c, onSelect: u } = e,
          [p, d] = (0, o.useState)(!1),
          h = (0, o.useContext)(I),
          [m, v] = (0, B.useRovingTabindexElement)(null),
          g = Boolean(h) && !_.CheckMobile.any();
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
            onClick: function () {
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
                position: function () {
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
                onClick: function () {
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
        const a = n ? (0, w.parseRgb)(String(n)) : void 0,
          i = S(t, 10);
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
          s && s(e);
        }
      }
      var M = n(54368),
        O = n(94720);
      function F(e) {
        const t = `Invalid RGB color: ${e}`;
        if (null === e) throw new Error(t);
        const n = e.match(/^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i);
        if (null === n) throw new Error(t);
        const [, o, r, s] = n;
        if (!o || !r || !s) throw new Error(t);
        const a = parseInt(o, 16) / 255,
          i = parseInt(r, 16) / 255,
          l = parseInt(s, 16) / 255,
          c = Math.max(a, i, l),
          u = Math.min(a, i, l);
        let p;
        const d = c,
          h = c - u,
          m = 0 === c ? 0 : h / c;
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
      var V = n(43370),
        A = n(35257);
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
                ).getBoundingClientRect(),
                r = e.clientX - o.left,
                s = e.clientY - o.top;
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
            } = this.props,
            a = `hsl(${360 * t}, 100%, 50%)`;
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
              style: { left: 100 * n + "%", top: 100 * (1 - r) + "%" },
            }),
          );
        }
      }
      var W = n(1369);
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
                style: { top: 100 * t + "%" },
              }),
            ),
          );
        }
      }
      var z = n(80679);
      const U = "#000000",
        Z = a.t(null, { context: "Color Picker" }, n(40276));
      class Y extends o.PureComponent {
        constructor(e) {
          super(e),
            (this._inputRef = o.createRef()),
            (this._handleHSV = (e) => {
              const t =
                (function (e) {
                  const { h: t, s: n, v: o } = e;
                  let r, s, a;
                  const i = Math.floor(6 * t),
                    l = 6 * t - i,
                    c = o * (1 - n),
                    u = o * (1 - l * n),
                    p = o * (1 - (1 - l) * n);
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
                  return (
                    "#" +
                    [255 * r, 255 * s, 255 * a]
                      .map((e) =>
                        ("0" + Math.round(e).toString(16)).replace(
                          /.+?([a-f0-9]{2})$/i,
                          "$1",
                        ),
                      )
                      .join("")
                  );
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
                const e = F(t),
                  n = `#${t}`;
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
          var e;
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
      var G = n(93402);
      const H = a.t(null, { context: "Color Picker" }, n(53585)),
        K = a.t(null, { context: "Color Picker" }, n(81865));
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
          } = e,
          [m, v] = (0, o.useState)(!1),
          g = "number" == typeof n ? n : 1,
          [f, b] = d();
        return (
          (0, o.useLayoutEffect)(() => {
            h && h.update();
          }, [a, h]),
          m
            ? o.createElement(Y, {
                color: t,
                onSelect: C,
                onAdd: function (t) {
                  v(!1), null == u || u(!1);
                  const { onAddColor: n } = e;
                  n && n(t);
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
                      onChange: function (e) {
                        p && p(e);
                      },
                    }),
                  ),
              )
        );
        function C(t) {
          const { onColorChange: n } = e;
          n && n(t, m);
        }
        function y(e) {
          v(!0), null == u || u(!0);
        }
      }
    },
    54368: (e, t, n) => {
      "use strict";
      n.d(t, { Opacity: () => u });
      var o = n(50959),
        r = n(97754),
        s = n(50151),
        a = n(37160),
        i = n(68335),
        l = n(16838),
        c = n(30099);
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
                  const t = (0, s.ensureNotNull)(this._container),
                    n = (0, s.ensureNotNull)(this._pointer),
                    o = t.getBoundingClientRect(),
                    r = n.offsetWidth,
                    i = e.clientX - r / 2 - o.left,
                    l = (0, a.clamp)(i / (o.width - r), 0, 1);
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
              const t = e.currentTarget.value,
                n = Number(t) / 100;
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
            } = this.props,
            { inputOpacity: a, isPointerDragged: i } = this.state,
            u = { color: e || void 0 };
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
                  style: { left: 100 * t + "%" },
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
      "use strict";
      n.d(t, { basic: () => i, extended: () => c, white: () => r });
      var o = n(48891);
      const r = o.colorsPalette["color-white"],
        s = [
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
        ],
        a = [200, 300, 400, 500, 600, 700, 800, 900].map(
          (e) => `color-cold-gray-${e}`,
        );
      a.unshift("color-white"),
        a.push("color-black"),
        s.forEach((e) => {
          a.push(`color-${e}-500`);
        });
      const i = a.map((e) => o.colorsPalette[e]),
        l = [];
      [100, 200, 300, 400, 700, 900].forEach((e) => {
        s.forEach((t) => {
          l.push(`color-${t}-${e}`);
        });
      });
      const c = l.map((e) => o.colorsPalette[e]);
    },
    59054: (e, t, n) => {
      "use strict";
      n.d(t, { ControlDisclosureView: () => g });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(38528),
        i = n(67029),
        l = n(78274),
        c = n(4523),
        u = n(9745),
        p = n(2948),
        d = n(23428);
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
      var v = n(66986);
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
          } = e,
          M = (0, o.useRef)(null),
          O =
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
      "use strict";
      n.d(t, { useCustomColors: () => l });
      var o = n(50959),
        r = n(56840),
        s = n(76422);
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
      var i = n(24377);
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
          ),
          l = (0, o.useCallback)(
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
      "use strict";
      n.d(t, { Select: () => C });
      var o = n(50959),
        r = n(22064),
        s = n(38528),
        a = n(16921),
        i = n(16396),
        l = n(12481),
        c = n(43370);
      var u = n(36762),
        p = n(26597),
        d = n(59054),
        h = n(36104),
        m = n(38223),
        v = n(60673);
      function g(e) {
        return !e.readonly;
      }
      function f(e, t) {
        var n;
        return null !== (n = null == t ? void 0 : t.id) && void 0 !== n
          ? n
          : (0, r.createDomId)(e, "item", null == t ? void 0 : t.value);
      }
      function b(e) {
        var t, n;
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
          }),
          ne = R.filter(g),
          oe = ne.find((e) => e.value === I),
          [re, se, ae] = (0, a.useKeepActiveItemIntoView)({ activeItem: oe }),
          ie = (0, r.joinDomIds)(T, n),
          le = ie.length > 0 ? ie : void 0,
          ce = (0, o.useMemo)(
            () => ({
              role: "listbox",
              "aria-labelledby": T,
              "aria-activedescendant": f(n, oe),
            }),
            [T, oe],
          ),
          ue = (0, o.useCallback)((e) => e.value === I, [I]),
          pe = (0, o.useCallback)((e) => D && D(e.value), [D]),
          de = (0, u.useItemsKeyboardNavigation)(m.isRtl, ne, ue, pe, !1, {
            next: [40],
            previous: [38],
          }),
          he = (0, p.useKeyboardToggle)(j, q || O),
          me = (0, p.useKeyboardClose)(q, $),
          ve = (0, p.useKeyboardOpen)(q, H),
          ge = (0, p.useKeyboardEventHandler)([he, me, ve]),
          fe = (0, p.useKeyboardEventHandler)([de, he, me]),
          be = (function (e) {
            const t = (0, o.useRef)(""),
              n = (0, o.useMemo)(
                () =>
                  (0, l.default)(() => {
                    t.current = "";
                  }, 500),
                [],
              ),
              r = (0, o.useMemo)(() => (0, c.default)(e, 200), [e]);
            return (0, o.useCallback)(
              (e) => {
                e.key.length > 0 &&
                  e.key.length < 3 &&
                  ((t.current += e.key), r(t.current, e), n());
              },
              [n, r],
            );
          })((t, n) => {
            const o = (function (e, t, n) {
              return e.find((e) => {
                var o;
                const r = t.toLowerCase();
                return (
                  !e.readonly &&
                  (n
                    ? n(e).toLowerCase().startsWith(r)
                    : !e.readonly &&
                      (("string" == typeof e.content &&
                        e.content.toLowerCase().startsWith(r)) ||
                        ("string" == typeof e.textContent &&
                          e.textContent.toLowerCase().startsWith(r)) ||
                        String(null !== (o = e.value) && void 0 !== o ? o : "")
                          .toLowerCase()
                          .startsWith(r)))
                );
              });
            })(ne, t, e.getSearchKey);
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
            onOpen: function () {
              ae(oe, { duration: 0 }), K();
            },
            onClose: $,
            onKeyDown: function (e) {
              ge(e), L && L(e);
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
            onListboxKeyDown: function (e) {
              fe(e), e.defaultPrevented || be(e);
            },
            buttonChildren: o.createElement(b, {
              selectedItem: oe,
              placeholder: x,
            }),
            repositionOnScroll: M,
          },
          R.map((e, t) => {
            var r;
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
          D && D(e);
        }
      });
      C.displayName = "Select";
    },
    86656: (e, t, n) => {
      "use strict";
      n.d(t, { TouchScrollContainer: () => i });
      var o = n(50959),
        r = n(59142),
        s = n(50151),
        a = n(49483);
      const i = (0, o.forwardRef)((e, t) => {
        const { children: n, ...s } = e,
          i = (0, o.useRef)(null);
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
          const n = (0, s.ensureNotNull)(e.current),
            o = document.activeElement;
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
      "use strict";
      n.d(t, { splitThousands: () => r });
      var o = n(50335);
      function r(e, t = "&nbsp;") {
        let n = e + "";
        -1 !== n.indexOf("e") &&
          (n = (function (e) {
            return (0, o.fixComputationError)(e)
              .toFixed(10)
              .replace(/\.?0+$/, "");
          })(Number(e)));
        const r = n.split(".");
        return (
          r[0].replace(/\B(?=(\d{3})+(?!\d))/g, t) + (r[1] ? "." + r[1] : "")
        );
      }
    },
    71468: (e, t, n) => {
      "use strict";
      function o(e) {
        e.dispatchEvent(new CustomEvent("roving-tabindex:main-element"));
      }
      function r(e) {
        e.dispatchEvent(new CustomEvent("roving-tabindex:secondary-element"));
      }
      n.d(t, { becomeMainElement: () => o, becomeSecondaryElement: () => r });
    },
    83207: (e, t, n) => {
      "use strict";
      n.d(t, { bind: () => a, setter: () => i });
      var o = n(50959),
        r = n(76917),
        s = n(27365);
      function a(e) {
        var t;
        return (
          (t = class extends o.PureComponent {
            constructor() {
              super(...arguments),
                (this._onChange = (e, t, n) => {
                  const { setValue: o } = this.context,
                    { onChange: r } = this.props;
                  i(o, r)(e, t, n);
                });
            }
            render() {
              const { input: t } = this.props,
                { values: n, model: r } = this.context;
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
          e(o, n, r), t && t(n, o, r);
        };
      }
    },
    76917: (e, t, n) => {
      "use strict";
      n.d(t, { PropertyContainer: () => u, PropertyContext: () => c });
      var o = n(50959),
        r = n(50151),
        s = n(44352),
        a = n(36298);
      const i = (0, n(59224).getLogger)(
          "Platform.GUI.StudyInputPropertyContainer",
        ),
        l = new a.TranslatedString(
          "change {propertyName} property",
          s.t(null, void 0, n(18567)),
        ),
        c = o.createContext(null);
      class u extends o.PureComponent {
        constructor(e) {
          super(e),
            (this._setValue = (e, t, o) => {
              const { property: c, model: u } = this.props,
                p = (0, r.ensureDefined)(c.child(e));
              i.logNormal(
                `Changing property "${e}" value from "${c.value()}" to "${t}"`,
              );
              const d = new a.TranslatedString(
                o,
                (function (e) {
                  return s.t(e, { context: "input" }, n(88601));
                })(o),
              );
              u.setProperty(p, t, l.format({ propertyName: d }));
            });
          const { property: t } = e,
            o = {};
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
          const { study: e, model: t, children: n } = this.props,
            r = {
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
      "use strict";
      n.d(t, { ModelContext: () => r, bindModel: () => s });
      var o = n(50959);
      const r = o.createContext(null);
      function s(e, t) {
        return o.createElement(r.Consumer, null, (n) =>
          n ? o.createElement(e, { ...Object.assign({ model: n }, t) }) : null,
        );
      }
    },
    41594: (e, t, n) => {
      "use strict";
      n.d(t, {
        StylePropertyContainer: () => a,
        StylePropertyContext: () => s,
        bindPropertyContext: () => i,
      });
      var o = n(50959),
        r = n(51717);
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
      "use strict";
      n.d(t, { IconGroupWrapper: () => s });
      var o = n(50959),
        r = n(49934);
      function s(e) {
        const { children: t } = e;
        return o.createElement("div", { className: r.wrapper }, t);
      }
    },
    39847: (e, t, n) => {
      "use strict";
      n.d(t, { InputTooltip: () => E });
      var o = n(50959),
        r = n(97754),
        s = n(90186),
        a = n(9745),
        i = n(5325);
      function l() {
        const [e, t] = (0, o.useState)(!1);
        return (
          (0, o.useEffect)(() => {
            t(i.mobiletouch);
          }, []),
          e
        );
      }
      var c = n(38952),
        u = n(38528),
        p = n(82353),
        d = n(27941),
        h = n(99084),
        m = n(30162),
        v = n(78370),
        g = n.n(v);
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
          } = e,
          _ = l() ? h : Boolean(c),
          x = o.useRef(null),
          N = (0, u.useMergedRefs)([d, x]),
          I = (function (e) {
            const {
                tabIndex: t = 0,
                showTooltip: n,
                hideTooltip: r,
                onFocus: s,
                onBlur: a,
                onClick: i,
                ref: c,
              } = e,
              u = l();
            return {
              onBlur: (0, o.useCallback)(
                (e) => {
                  r && r(), a && a(e);
                },
                [r, a],
              ),
              onFocus: (0, o.useCallback)(
                (e) => {
                  n && n(e.currentTarget, { tooltipDelay: 200 }), s && s(e);
                },
                [n, s],
              ),
              onClick: (0, o.useCallback)(
                (e) => {
                  var t;
                  u && (null === (t = c.current) || void 0 === t || t.focus()),
                    i && i(e);
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
          }),
          T = o.useMemo(
            () =>
              (function (e, t) {
                return t ? f[t] : "success" === e ? f.check : f.exclamation;
              })(n, t),
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
      var y = n(38780);
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
      "use strict";
      n.d(t, { InputRow: () => ne });
      var o = n(44352),
        r = n(50959),
        s = n(50151),
        a = n(33703),
        i = n(96438),
        l = n(47510),
        c = n(4781),
        u = n(97754),
        p = n.n(u),
        d = n(31261),
        h = n(83207),
        m = n(90009),
        v = n(27698);
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
      const f = (0, m.debounced)(g),
        b = (0, h.bind)(f);
      var C = n(55141),
        y = n(11062);
      function E(e) {
        const { className: t } = e,
          n = (0, r.useContext)(y.PropertyTable.InlineRowContext);
        return r.createElement(
          "div",
          { className: u(v.inputGroup, n && v.inlineGroup, t) },
          e.children,
        );
      }
      var S = n(36565);
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
                } = this.props,
                { startTime: o, endTime: r } = this.state;
              n(o.replace(":", "") + "-" + r.replace(":", ""), e, t);
            });
          const t = e.value || e.input.defval,
            [n, o] = w(t);
          this.state = { prevValue: t, startTime: n, endTime: o };
        }
        render() {
          const { startTime: e, endTime: t } = this.state,
            { hasTooltip: n, disabled: o } = this.props;
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
      var N = n(14483),
        I = n(42856),
        T = n(37591),
        B = n(76917),
        k = n(90405);
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
            } = this.props,
            u = s.map((e) => {
              const t = a && a[e] ? a[e] : e;
              return {
                value: e,
                content: o.t(t, { context: "input" }, n(88601)),
              };
            }),
            d = void 0 !== i && s.includes(i) ? i : t;
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
      var L = n(73146),
        M = n(28853);
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
          const { input: e } = this.props,
            { study: t, model: n } = this.context;
          let o = { ...O };
          delete o.hlcc4;
          const i = (0, L.createAdapter)(t);
          if (t && this._isStudy(t) && t.isChildStudy()) {
            const t = (0, a.getInputValue)(i.inputs()[e.id]),
              n = i.parentSourceForInput(t);
            if ((0, M.isStudy)(n)) {
              const t = n.title(T.TitleDisplayTarget.StatusLine),
                r = I.StudyMetaInfo.getChildSourceInputTitles(
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
                  ),
                  n = e.id(),
                  r = e.metaInfo(),
                  a = r.styles,
                  i = r.plots || [];
                if (1 === i.length) o[n + "$0"] = t;
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
      var V = n(36274),
        A = n(94025);
      const R = void 0,
        W = [
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
        ],
        q = ["1S", "5S", "10S", "15S", "30S"];
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
          const { input: e, value: t, disabled: s, hasTooltip: a } = this.props,
            i = V.Interval.parse(void 0 === t ? e.defval : t),
            l = i.isValid() ? i.value() : t,
            c = R ? R.get().filter((e) => !V.Interval.parse(e).isRange()) : [],
            u = (0, A.mergeResolutions)(
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
          var d;
        }
      }
      const U = (0, h.bind)(z);
      var Z = n(41552),
        Y = n(41594);
      class G extends r.PureComponent {
        render() {
          return r.createElement(B.PropertyContext.Consumer, null, (e) =>
            e ? this._getColorInputWithContext(e) : null,
          );
        }
        _getColorInputWithContext(e) {
          var t;
          const {
              input: { id: n },
              disabled: o,
              hasTooltip: s,
            } = this.props,
            { model: a, study: i } = e;
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
      var H = n(85528),
        K = n(76056),
        $ = n(23935),
        j = n(27365),
        X = n(93071);
      const Q = (0, h.bind)(function (e) {
        const { value: t, onChange: n, input: o, tzName: s, hasTooltip: a } = e,
          { id: i, name: l, defval: c } = o,
          u = (0, r.useMemo)(() => Number(null != t ? t : c), [t, c]),
          d = (0, r.useMemo)(
            () => (0, j.getChartTimezoneOffsetMs)(u, s),
            [u, s],
          ),
          h = (0, r.useMemo)(() => {
            const e = new Date(u + d + v(u));
            return e.setSeconds(0), e;
          }, [u, d]),
          m = (0, r.useMemo)(
            () =>
              (0, $.twoDigitsFormat)(h.getHours()) +
              ":" +
              (0, $.twoDigitsFormat)(h.getMinutes()),
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
              onPick: function (e) {
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
              onChange: function (e) {
                const [t, o] = e.split(":"),
                  r = new Date(h);
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
      var ee = n(39847),
        te = n(76694);
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
            } = this.props,
            m = Boolean(p);
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
      "use strict";
      n.d(t, { InputsTabContent: () => W });
      var o,
        r = n(50959),
        s = n(50151),
        a = n(44352),
        i = n(76917),
        l = n(11062),
        c = n(57733),
        u = n(97754),
        p = n.n(u),
        d = n(88400),
        h = n.n(d);
      const m = (0, c.makeSwitchGroupItem)(
        (((o = class extends r.PureComponent {
          constructor() {
            super(...arguments),
              (this._onChange = () => {
                this.props.onChange && this.props.onChange(this.props.value);
              });
          }
          render() {
            const e = u(this.props.className, h().radio, {
                [h().reverse]: Boolean(this.props.labelPositionReverse),
              }),
              t = u(h().label, { [h().disabled]: this.props.disabled }),
              n = u(h().box, { [h().noOutline]: -1 === this.props.tabIndex });
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
      var v = n(55141),
        g = n(83207),
        f = n(39847),
        b = n(76694),
        C = n(27698);
      function y(e) {
        const {
            children: t,
            input: o,
            disabled: u,
            onChange: p,
            grouped: d,
            tooltip: h,
            solutionId: y,
          } = e,
          E = (0, r.useContext)(i.PropertyContext),
          { values: S, setValue: w } = (0, s.ensureNotNull)(E),
          _ = S[o.id],
          [x, N] = (0, r.useState)(_ ? "another-symbol" : "main-symbol"),
          [I, T] = (0, r.useState)(_),
          B = Boolean(h);
        return (
          (0, r.useEffect)(() => {
            _ && T(_);
          }, [_]),
          r.createElement(
            c.SwitchGroup,
            {
              name: `symbol-source-${o.id}`,
              values: [x],
              onChange: function (e) {
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
      var E = n(4781);
      class S extends r.PureComponent {
        render() {
          const { label: e, input: t, tooltip: n, solutionId: o } = this.props,
            s = Boolean(n);
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
      var w = n(12949),
        _ = n(2568),
        x = n(67029),
        N = n(90009);
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
      const T = (0, N.debounced)(I),
        B = (0, g.bind)(T);
      var k = n(80128);
      function P(e) {
        const { input: t, label: n, tooltip: o, solutionId: s } = e,
          a = Boolean(o);
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
              labelAlign: (function (e) {
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
      var L = n(86067),
        M = n(17611);
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
      var F = n(64420),
        V = n(26278);
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
            } = this.props,
            { offset: p, offsets: d } = n;
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
            d &&
              d.childNames().map((e) => {
                var t;
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
          } = e,
          l = o,
          c = (0, r.useMemo)(() => (0, F.getInputGroups)(l), [l]);
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
      "use strict";
      n.d(t, { BoolInput: () => u, BoolInputComponent: () => c });
      var o = n(50959),
        r = n(15294),
        s = n(97754),
        a = n.n(s),
        i = n(83207),
        l = n(27698);
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
            } = this.props,
            c = void 0 === t ? e : t;
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
      "use strict";
      n.d(t, { debounced: () => s });
      var o = n(50959);
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
                e && e();
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
              } = this.props,
              { prevValue: r, value: s } = this.state;
            clearTimeout(this._timeout);
            const a = void 0 !== e ? e : s;
            void 0 !== a && a !== r && o(a, t, n);
          }
        };
      }
    },
    47510: (e, t, n) => {
      "use strict";
      n.d(t, { FloatInput: () => d, FloatInputComponent: () => p });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(95052),
        i = n(83207),
        l = n(90009),
        c = n(27698);
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
      const p = (0, l.debounced)(u, { change: 1 / 0, commit: 0, blur: 0 }),
        d = (0, i.bind)(p);
    },
    96438: (e, t, n) => {
      "use strict";
      n.d(t, { IntegerInput: () => d, IntegerInputComponent: () => p });
      var o = n(50959),
        r = n(97754),
        s = n.n(r),
        a = n(83207),
        i = n(90009),
        l = n(95052),
        c = n(27698);
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
      const p = (0, i.debounced)(u, { change: 1 / 0, commit: 0, blur: 0 }),
        d = (0, a.bind)(p);
    },
    95052: (e, t, n) => {
      "use strict";
      n.d(t, { NumericInput: () => y });
      var o = n(50959),
        r = n(50151),
        s = n(44352),
        a = n(60521),
        i = n(49483),
        l = n(92399),
        c = n(82161),
        u = n(38223);
      var p = n(87663),
        d = n(37160);
      const h = s.t(null, void 0, n(35563)),
        m = new (class {
          constructor(e = " ") {
            this._divider = e;
          }
          format(e) {
            const t = (0, c.splitThousands)(e, this._divider);
            return (0, u.isRtl)() ? (0, u.startWithLTR)(t) : t;
          }
          parse(e) {
            const t = (0, u.stripLTRMarks)(e).split(this._divider).join(""),
              n = Number(t);
            return isNaN(n) || /e/i.test(t)
              ? { res: !1 }
              : { res: !0, value: n, suggest: this.format(n) };
          }
        })(),
        v = /^-?[0-9]*$/,
        g = 9e15;
      class f extends o.PureComponent {
        constructor(e) {
          super(e),
            (this._onFocus = (e) => {
              this.setState({ focused: !0 }),
                this.props.onFocus && this.props.onFocus(e);
            }),
            (this._onBlur = (e) => {
              this.setState({ focused: !1 }),
                !1 !== this.props.shouldApplyValueOnBlur &&
                  (this.setState({
                    displayValue: b(this.props, this.props.value),
                  }),
                  this.props.errorHandler && this.props.errorHandler(!1)),
                this.props.onBlur && this.props.onBlur(e);
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
              const n = C(t, this.props.formatter),
                o = n.res
                  ? this._checkValueBoundaries(n.value)
                  : { isPassed: !1, msg: void 0 },
                r = n.res && !o.isPassed,
                s = n.res && n.suggest && !this.state.focused ? n.suggest : t,
                a = r && o.msg ? o.msg : h;
              this.setState({ displayValue: s, errorMsg: a }),
                n.res &&
                  o.isPassed &&
                  this.props.onValueChange(n.value, "input"),
                this.props.errorHandler && this.props.errorHandler(!n.res || r);
            }),
            (this._onValueByStepChange = (e) => {
              const {
                  roundByStep: t = !0,
                  step: n = 1,
                  uiStep: o,
                  min: r = n,
                  formatter: s,
                } = this.props,
                i = C(this.state.displayValue, s),
                l = null != o ? o : n;
              let c = n;
              if (i.res) {
                const o = new a.Big(i.value),
                  s = o.minus(r).mod(n);
                let u = o.plus(e * l);
                !s.eq(0) && t && (u = u.plus((e > 0 ? 0 : 1) * l).minus(s)),
                  (c = u.toNumber());
              }
              const { isPassed: u, clampedValue: p } =
                this._checkValueBoundaries(c);
              (c = u ? c : p),
                this.setState({ displayValue: b(this.props, c) }),
                this.props.onValueChange(c, "step"),
                this.props.errorHandler && this.props.errorHandler(!1);
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
          var e;
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
          const { min: e = -1 / 0, max: t = g } = this.props,
            n = C(this.state.displayValue, this.props.formatter);
          return n.res ? (0, d.clamp)(n.value, e, t) : null;
        }
        static getDerivedStateFromProps(e, t) {
          const { alwaysUpdateValueFromProps: n, value: o } = e;
          return (t.focused && !n) || t.value === o
            ? null
            : { value: o, displayValue: b(e, o) };
        }
        _checkValueBoundaries(e) {
          var t, o, r, a;
          const { min: i = -1 / 0, max: l = g } = this.props,
            c = (function (e, t, n) {
              const o = e >= t,
                r = e <= n;
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
          ? (function (e, t = m) {
              return null !== e ? t.format(e) : "";
            })(t, o)
          : (function (e) {
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
      "use strict";
      n.d(t, { SymbolInput: () => p, getInternalSymbolName: () => c });
      var o = n(50959),
        r = n(50151),
        s = n(76917),
        a = n(83207),
        i = n(73146),
        l = n(48897);
      function c(e, t) {
        const n = (0, i.createAdapter)(t).resolvedSymbolInfoBySymbol(e);
        return n && (n.ticker || n.full_name) ? n.ticker || n.full_name : e;
      }
      function u(e, t) {
        const n = (0, i.createAdapter)(t).resolvedSymbolInfoBySymbol(e);
        return null === n ? e : n.name;
      }
      const p = (0, a.bind)(function (e) {
        const t = (0, o.useContext)(s.PropertyContext),
          { study: n } = (0, r.ensureNotNull)(t),
          {
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
      "use strict";
      n.d(t, { ColorWithThicknessSelect: () => g });
      var o = n(50959),
        r = n(24377),
        s = n(44352),
        a = n(36298),
        i = n(87095),
        l = n(41594),
        c = n(58593),
        u = n(17948),
        p = n(51768);
      const d = new a.TranslatedString(
          "change thickness",
          s.t(null, void 0, n(95657)),
        ),
        h = new a.TranslatedString("change color", s.t(null, void 0, n(13066))),
        m = new a.TranslatedString(
          "change opacity",
          s.t(null, void 0, n(17023)),
        ),
        v = [1, 2, 3, 4];
      class g extends o.PureComponent {
        constructor() {
          super(...arguments),
            (this._trackEventLabel = null),
            (this._getTransparencyValue = () => {
              const { transparency: e } = this.props;
              return e ? e.value() : 0;
            }),
            (this._getOpacityValue = () => {
              const { color: e } = this.props,
                t = (0, u.getPropertyValue)(e);
              if (t)
                return (0, i.isHexColor)(t)
                  ? (0, i.transparencyToAlpha)(this._getTransparencyValue())
                  : (0, r.parseRgba)(t)[3];
            }),
            (this._getColorValueInHex = () => {
              const { color: e } = this.props,
                t = (0, u.getPropertyValue)(e);
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
              const { color: t, isPaletteColor: n } = this.props,
                o = (0, u.getPropertyValue)(t);
              let s = 0;
              o &&
                (s = (0, i.isHexColor)(o)
                  ? this._getTransparencyValue()
                  : (0, i.alphaToTransparency)((0, r.parseRgba)(o)[3])),
                this._setProperty(t, (0, i.generateColor)(String(e), s, !0), h),
                (this._trackEventLabel =
                  "Plot color > " + (n ? "Palette" : "Single"));
            }),
            (this._onOpacityChange = (e) => {
              const { color: t } = this.props,
                n = (0, u.getPropertyValue)(t);
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
      "use strict";
      n.d(t, { PropertyTable: () => l });
      var o = n(50959),
        r = n(97754),
        s = n(90186),
        a = n(24712);
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
        (l.Row = function (e) {
          const { children: t } = e;
          return (0, o.useContext)(i)
            ? o.createElement("span", { className: a.inlineRow }, t)
            : o.createElement(o.Fragment, null, t);
        }),
        (l.Cell = function (e) {
          const t = (0, o.useContext)(i),
            n = r(
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
            ),
            l = (0, s.filterDataProps)(e);
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
        (l.Separator = function (e) {
          return o.createElement(
            l.Row,
            null,
            o.createElement("div", {
              className: r(a.cell, a.separator, a.fill),
            }),
          );
        }),
        (l.GroupSeparator = function (e) {
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
      "use strict";
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
