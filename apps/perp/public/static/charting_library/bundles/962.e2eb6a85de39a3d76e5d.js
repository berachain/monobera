(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [962],
  {
    50690: (e, n, t) => {
      let r = t(50959);
      let l = t(22962);
      function a(e) {
        for (
          let n = `https://reactjs.org/docs/error-decoder.html?invariant=${e}`,
            t = 1;
          t < arguments.length;
          t++
        )
          n += `&args[]=${encodeURIComponent(arguments[t])}`;
        return (
          `Minified React error #${e}; visit ${n} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        );
      }
      let u = new Set();
      let o = {};
      function i(e, n) {
        s(e, n), s(`${e}Capture`, n);
      }
      function s(e, n) {
        for (o[e] = n, e = 0; e < n.length; e++) u.add(n[e]);
      }
      let c = !(
          "undefined" === typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
        );
      let f = Object.prototype.hasOwnProperty;
      let d =
          /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      let p = {};
      let m = {};
      function h(e, n, t, r, l, a, u) {
        (this.acceptsBooleans = 2 === n || 3 === n || 4 === n),
          (this.attributeName = r),
          (this.attributeNamespace = l),
          (this.mustUseProperty = t),
          (this.propertyName = e),
          (this.type = n),
          (this.sanitizeURL = a),
          (this.removeEmptyString = u);
      }
      let g = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
        .split(" ")
        .forEach((e) => {
          g[e] = new h(e, 0, !1, e, null, !1, !1);
        }),
        [
          ["acceptCharset", "accept-charset"],
          ["className", "class"],
          ["htmlFor", "for"],
          ["httpEquiv", "http-equiv"],
        ].forEach((e) => {
          const n = e[0];
          g[n] = new h(n, 1, !1, e[1], null, !1, !1);
        }),
        ["contentEditable", "draggable", "spellCheck", "value"].forEach(
          (e) => {
            g[e] = new h(e, 2, !1, e.toLowerCase(), null, !1, !1);
          },
        ),
        [
          "autoReverse",
          "externalResourcesRequired",
          "focusable",
          "preserveAlpha",
        ].forEach((e) => {
          g[e] = new h(e, 2, !1, e, null, !1, !1);
        }),
        "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
          .split(" ")
          .forEach((e) => {
            g[e] = new h(e, 3, !1, e.toLowerCase(), null, !1, !1);
          }),
        ["checked", "multiple", "muted", "selected"].forEach((e) => {
          g[e] = new h(e, 3, !0, e, null, !1, !1);
        }),
        ["capture", "download"].forEach((e) => {
          g[e] = new h(e, 4, !1, e, null, !1, !1);
        }),
        ["cols", "rows", "size", "span"].forEach((e) => {
          g[e] = new h(e, 6, !1, e, null, !1, !1);
        }),
        ["rowSpan", "start"].forEach((e) => {
          g[e] = new h(e, 5, !1, e.toLowerCase(), null, !1, !1);
        });
      let v = /[\-:]([a-z])/g;
      function y(e) {
        return e[1].toUpperCase();
      }
      function b(e, n, t, r) {
        let l = g.hasOwnProperty(n) ? g[n] : null;
        (null !== l
          ? 0 !== l.type
          : r ||
            !(2 < n.length) ||
            ("o" !== n[0] && "O" !== n[0]) ||
            ("n" !== n[1] && "N" !== n[1])) &&
          (((e, n, t, r) => {
            if (
              null == n ||
              ((e, n, t, r) => {
                if (null !== t && 0 === t.type) return !1;
                switch (typeof n) {
                  case "function":
                  case "symbol":
                    return !0;
                  case "boolean":
                    return (
                      !r &&
                      (null !== t
                        ? !t.acceptsBooleans
                        : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                          "aria-" !== e)
                    );
                  default:
                    return !1;
                }
              })(e, n, t, r)
            )
              return !0;
            if (r) return !1;
            if (null !== t)
              switch (t.type) {
                case 3:
                  return !n;
                case 4:
                  return !1 === n;
                case 5:
                  return Number.isNaN(n);
                case 6:
                  return Number.isNaN(n) || 1 > n;
              }
            return !1;
          })(n, t, l, r) && (t = null),
          r || null === l
            ? ((e) => (
                  !!f.call(m, e) ||
                  (!f.call(p, e) &&
                    (d.test(e) ? (m[e] = !0) : ((p[e] = !0), !1)))
                ))(n) &&
              (null === t ? e.removeAttribute(n) : e.setAttribute(n, `${t}`))
            : l.mustUseProperty
            ? (e[l.propertyName] = null === t ? 3 !== l.type && "" : t)
            : ((n = l.attributeName),
              (r = l.attributeNamespace),
              null === t
                ? e.removeAttribute(n)
                : ((t =
                    3 === (l = l.type) || (4 === l && !0 === t) ? "" : `${t}`),
                  r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
        .split(" ")
        .forEach((e) => {
          const n = e.replace(v, y);
          g[n] = new h(n, 1, !1, e, null, !1, !1);
        }),
        "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
          .split(" ")
          .forEach((e) => {
            const n = e.replace(v, y);
            g[n] = new h(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
          }),
        ["xml:base", "xml:lang", "xml:space"].forEach((e) => {
          const n = e.replace(v, y);
          g[n] = new h(
            n,
            1,
            !1,
            e,
            "http://www.w3.org/XML/1998/namespace",
            !1,
            !1,
          );
        }),
        ["tabIndex", "crossOrigin"].forEach((e) => {
          g[e] = new h(e, 1, !1, e.toLowerCase(), null, !1, !1);
        }),
        (g.xlinkHref = new h(
          "xlinkHref",
          1,
          !1,
          "xlink:href",
          "http://www.w3.org/1999/xlink",
          !0,
          !1,
        )),
        ["src", "href", "action", "formAction"].forEach((e) => {
          g[e] = new h(e, 1, !1, e.toLowerCase(), null, !0, !0);
        });
      const k = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      const w = Symbol.for("react.element");
      const S = Symbol.for("react.portal");
      const x = Symbol.for("react.fragment");
      const E = Symbol.for("react.strict_mode");
      const C = Symbol.for("react.profiler");
      const _ = Symbol.for("react.provider");
      const z = Symbol.for("react.context");
      const N = Symbol.for("react.forward_ref");
      const P = Symbol.for("react.suspense");
      const T = Symbol.for("react.suspense_list");
      const L = Symbol.for("react.memo");
      const M = Symbol.for("react.lazy");
      Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
      const F = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden"),
        Symbol.for("react.cache"),
        Symbol.for("react.tracing_marker");
      const D = Symbol.iterator;
      function R(e) {
        return null === e || "object" !== typeof e
          ? null
          : "function" === typeof (e = (D && e[D]) || e["@@iterator"])
          ? e
          : null;
      }
      let O;
      const I = Object.assign;
      function U(e) {
        if (void 0 === O)
          try {
            throw Error();
          } catch (e) {
            const n = e.stack.trim().match(/\n( *(at )?)/);
            O = (n?.[1]) || "";
          }
        return `\n${O}${e}`;
      }
      let V = !1;
      function A(e, n) {
        if (!e || V) return "";
        V = !0;
        const t = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (n)
            if (
              ((n = () => {
                throw Error();
              }),
              Object.defineProperty(n.prototype, "props", {
                set: () => {
                  throw Error();
                },
              }),
              "object" === typeof Reflect && Reflect.construct)
            ) {
              try {
                Reflect.construct(n, []);
              } catch (e) {
                const r = e;
              }
              Reflect.construct(e, [], n);
            } else {
              try {
                n.call();
              } catch (e) {
                r = e;
              }
              e.call(n.prototype);
            }
          else {
            try {
              throw Error();
            } catch (e) {
              r = e;
            }
            e();
          }
        } catch (n) {
          if (n && r && "string" === typeof n.stack) {
            for (
              let l = n.stack.split("\n"),
                a = r.stack.split("\n"),
                u = l.length - 1,
                o = a.length - 1;
              1 <= u && 0 <= o && l[u] !== a[o];

            )
              o--;
            for (; 1 <= u && 0 <= o; u--, o--)
              if (l[u] !== a[o]) {
                if (1 !== u || 1 !== o)
                  do {
                    if ((u--, 0 > --o || l[u] !== a[o])) {
                      let i = `\n${l[u].replace(" at new ", " at ")}`;
                      return (
                        e.displayName &&
                          i.includes("<anonymous>") &&
                          (i = i.replace("<anonymous>", e.displayName)),
                        i
                      );
                    }
                  } while (1 <= u && 0 <= o);
                break;
              }
          }
        } finally {
          (V = !1), (Error.prepareStackTrace = t);
        }
        return (e = e ? e.displayName || e.name : "") ? U(e) : "";
      }
      function B(e) {
        switch (e.tag) {
          case 5:
            return U(e.type);
          case 16:
            return U("Lazy");
          case 13:
            return U("Suspense");
          case 19:
            return U("SuspenseList");
          case 0:
          case 2:
          case 15:
            return (e = A(e.type, !1));
          case 11:
            return (e = A(e.type.render, !1));
          case 1:
            return (e = A(e.type, !0));
          default:
            return "";
        }
      }
      function H(e) {
        if (null == e) return null;
        if ("function" === typeof e) return e.displayName || e.name || null;
        if ("string" === typeof e) return e;
        switch (e) {
          case x:
            return "Fragment";
          case S:
            return "Portal";
          case C:
            return "Profiler";
          case E:
            return "StrictMode";
          case P:
            return "Suspense";
          case T:
            return "SuspenseList";
        }
        if ("object" === typeof e)
          switch (e.$$typeof) {
            case z:
              return `${(e.displayName || "Context")}.Consumer`;
            case _:
              return `${(e._context.displayName || "Context")}.Provider`;
            case N: {
              const n = e.render;
              return (
                (e = e.displayName) ||
                  (e =
                    "" !== (e = n.displayName || n.name || "")
                      ? `ForwardRef(${e})`
                      : "ForwardRef"),
                e
              );
            }
            case L:
              return null !== (n = e.displayName || null)
                ? n
                : H(e.type) || "Memo";
            case M:
              (n = e._payload), (e = e._init);
              try {
                return H(e(n));
              } catch (e) {}
          }
        return null;
      }
      function W(e) {
        const n = e.type;
        switch (e.tag) {
          case 24:
            return "Cache";
          case 9:
            return `${(n.displayName || "Context")}.Consumer`;
          case 10:
            return `${(n._context.displayName || "Context")}.Provider`;
          case 18:
            return "DehydratedFragment";
          case 11:
            return (
              (e = (e = n.render).displayName || e.name || ""),
              n.displayName ||
                ("" !== e ? `ForwardRef(${e})` : "ForwardRef")
            );
          case 7:
            return "Fragment";
          case 5:
            return n;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return H(n);
          case 8:
            return n === E ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof n) return n.displayName || n.name || null;
            if ("string" === typeof n) return n;
        }
        return null;
      }
      function Q(e) {
        switch (typeof e) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
          case "object":
            return e;
          default:
            return "";
        }
      }
      function j(e) {
        const n = e.type;
        return (
          (e = e.nodeName) &&
          "input" === e.toLowerCase() &&
          ("checkbox" === n || "radio" === n)
        );
      }
      function $(e) {
        e._valueTracker ||
          (e._valueTracker = ((e) => {
            const n = j(e) ? "checked" : "value";
            const t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
            let r = `${e[n]}`;
            if (
              !e.hasOwnProperty(n) &&
              void 0 !== t &&
              "function" === typeof t.get &&
              "function" === typeof t.set
            ) {
              const l = t.get;
              const a = t.set;
              return (
                Object.defineProperty(e, n, {
                  configurable: !0,
                  get: function () {
                    return l.call(this);
                  },
                  set: function (e) {
                    (r = `${e}`), a.call(this, e);
                  },
                }),
                Object.defineProperty(e, n, { enumerable: t.enumerable }),
                {
                  getValue: () => r,
                  setValue: (e) => {
                    r = `${e}`;
                  },
                  stopTracking: () => {
                    (e._valueTracker = null), delete e[n];
                  },
                }
              );
            }
          })(e));
      }
      function K(e) {
        if (!e) return !1;
        const n = e._valueTracker;
        if (!n) return !0;
        const t = n.getValue();
        let r = "";
        return (
          e && (r = j(e) ? (e.checked ? "true" : "false") : e.value),
          (e = r) !== t && (n.setValue(e), !0)
        );
      }
      function q(e) {
        if (
          void 0 ===
          (e = e || ("undefined" !== typeof document ? document : void 0))
        )
          return null;
        try {
          return e.activeElement || e.body;
        } catch (n) {
          return e.body;
        }
      }
      function Y(e, n) {
        const t = n.checked;
        return I({}, n, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: void 0,
          checked: null != t ? t : e._wrapperState.initialChecked,
        });
      }
      function X(e, n) {
        let t = null == n.defaultValue ? "" : n.defaultValue;
        const r = null != n.checked ? n.checked : n.defaultChecked;
        (t = Q(null != n.value ? n.value : t)),
          (e._wrapperState = {
            initialChecked: r,
            initialValue: t,
            controlled:
              "checkbox" === n.type || "radio" === n.type
                ? null != n.checked
                : null != n.value,
          });
      }
      function G(e, n) {
        null != (n = n.checked) && b(e, "checked", n, !1);
      }
      function Z(e, n) {
        G(e, n);
        const t = Q(n.value);
        const r = n.type;
        if (null != t)
          "number" === r
            ? ((0 === t && "" === e.value) || e.value !== t) &&
              (e.value = `${t}`)
            : e.value !== `${t}` && (e.value = `${t}`);
        else if ("submit" === r || "reset" === r)
          return void e.removeAttribute("value");
        n.hasOwnProperty("value")
          ? ee(e, n.type, t)
          : n.hasOwnProperty("defaultValue") &&
            ee(e, n.type, Q(n.defaultValue)),
          null == n.checked &&
            null != n.defaultChecked &&
            (e.defaultChecked = !!n.defaultChecked);
      }
      function J(e, n, t) {
        if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
          const r = n.type;
          if (
            !(
              ("submit" !== r && "reset" !== r) ||
              (void 0 !== n.value && null !== n.value)
            )
          )
            return;
          (n = `${e._wrapperState.initialValue}`),
            t || n === e.value || (e.value = n),
            (e.defaultValue = n);
        }
        "" !== (t = e.name) && (e.name = ""),
          (e.defaultChecked = !!e._wrapperState.initialChecked),
          "" !== t && (e.name = t);
      }
      function ee(e, n, t) {
        ("number" === n && q(e.ownerDocument) === e) ||
          (null == t
            ? (e.defaultValue = `${e._wrapperState.initialValue}`)
            : e.defaultValue !== `${t}` && (e.defaultValue = `${t}`));
      }
      const ne = Array.isArray;
      function te(e, n, t, r) {
        if (((e = e.options), n)) {
          n = {};
          for (let l = 0; l < t.length; l++) n[`$${t[l]}`] = !0;
          for (t = 0; t < e.length; t++)
            (l = n.hasOwnProperty(`$${e[t].value}`)),
              e[t].selected !== l && (e[t].selected = l),
              l && r && (e[t].defaultSelected = !0);
        } else {
          for (t = `${Q(t)}`, n = null, l = 0; l < e.length; l++) {
            if (e[l].value === t)
              return (
                (e[l].selected = !0), void (r && (e[l].defaultSelected = !0))
              );
            null !== n || e[l].disabled || (n = e[l]);
          }
          null !== n && (n.selected = !0);
        }
      }
      function re(e, n) {
        if (null != n.dangerouslySetInnerHTML) throw Error(a(91));
        return I({}, n, {
          value: void 0,
          defaultValue: void 0,
          children: `${e._wrapperState.initialValue}`,
        });
      }
      function le(e, n) {
        let t = n.value;
        if (null == t) {
          if (((t = n.children), (n = n.defaultValue), null != t)) {
            if (null != n) throw Error(a(92));
            if (ne(t)) {
              if (1 < t.length) throw Error(a(93));
              t = t[0];
            }
            n = t;
          }
          null == n && (n = ""), (t = n);
        }
        e._wrapperState = { initialValue: Q(t) };
      }
      function ae(e, n) {
        let t = Q(n.value);
        const r = Q(n.defaultValue);
        null != t &&
          ((t = `${t}`) !== e.value && (e.value = t),
          null == n.defaultValue &&
            e.defaultValue !== t &&
            (e.defaultValue = t)),
          null != r && (e.defaultValue = `${r}`);
      }
      function ue(e) {
        const n = e.textContent;
        n === e._wrapperState.initialValue &&
          "" !== n &&
          null !== n &&
          (e.value = n);
      }
      function oe(e) {
        switch (e) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function ie(e, n) {
        return null == e || "http://www.w3.org/1999/xhtml" === e
          ? oe(n)
          : "http://www.w3.org/2000/svg" === e && "foreignObject" === n
          ? "http://www.w3.org/1999/xhtml"
          : e;
      }
      let se;
      let ce;
      const fe =
          ((ce = (e, n) => {
            if (
              "http://www.w3.org/2000/svg" !== e.namespaceURI ||
              "innerHTML" in e
            )
              e.innerHTML = n;
            else {
              for (
                (se = se || document.createElement("div")).innerHTML =
                  `<svg>${n.valueOf().toString()}</svg>`,
                  n = se.firstChild;
                e.firstChild;

              )
                e.removeChild(e.firstChild);
              while (n.firstChild) e.appendChild(n.firstChild);
            }
          }),
          "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
            ? (e, n, t, r) => {
                MSApp.execUnsafeLocalFunction(() => ce(e, n));
              }
            : ce);
      function de(e, n) {
        if (n) {
          const t = e.firstChild;
          if (t && t === e.lastChild && 3 === t.nodeType)
            return void (t.nodeValue = n);
        }
        e.textContent = n;
      }
      const pe = {
          animationIterationCount: !0,
          aspectRatio: !0,
          borderImageOutset: !0,
          borderImageSlice: !0,
          borderImageWidth: !0,
          boxFlex: !0,
          boxFlexGroup: !0,
          boxOrdinalGroup: !0,
          columnCount: !0,
          columns: !0,
          flex: !0,
          flexGrow: !0,
          flexPositive: !0,
          flexShrink: !0,
          flexNegative: !0,
          flexOrder: !0,
          gridArea: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowSpan: !0,
          gridRowStart: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnSpan: !0,
          gridColumnStart: !0,
          fontWeight: !0,
          lineClamp: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          tabSize: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeDasharray: !0,
          strokeDashoffset: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
          strokeWidth: !0,
        };
      const me = ["Webkit", "ms", "Moz", "O"];
      function he(e, n, t) {
        return null == n || "boolean" === typeof n || "" === n
          ? ""
          : t ||
            "number" !== typeof n ||
            0 === n ||
            (pe.hasOwnProperty(e) && pe[e])
          ? (`${n}`).trim()
          : `${n}px`;
      }
      function ge(e, n) {
        for (let t in ((e = e.style), n))
          if (n.hasOwnProperty(t)) {
            const r = 0 === t.indexOf("--");
            const l = he(t, n[t], r);
            "float" === t && (t = "cssFloat"),
              r ? e.setProperty(t, l) : (e[t] = l);
          }
      }
      Object.keys(pe).forEach((e) => {
        me.forEach((n) => {
          (n = n + e.charAt(0).toUpperCase() + e.substring(1)), (pe[n] = pe[e]);
        });
      });
      const ve = I(
        { menuitem: !0 },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
      );
      function ye(e, n) {
        if (n) {
          if (
            ve[e] &&
            (null != n.children || null != n.dangerouslySetInnerHTML)
          )
            throw Error(a(137, e));
          if (null != n.dangerouslySetInnerHTML) {
            if (null != n.children) throw Error(a(60));
            if (
              "object" !== typeof n.dangerouslySetInnerHTML ||
              !("__html" in n.dangerouslySetInnerHTML)
            )
              throw Error(a(61));
          }
          if (null != n.style && "object" !== typeof n.style) throw Error(a(62));
        }
      }
      function be(e, n) {
        if (-1 === e.indexOf("-")) return "string" === typeof n.is;
        switch (e) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      let ke = null;
      function we(e) {
        return (
          (e = e.target || e.srcElement || window).correspondingUseElement &&
            (e = e.correspondingUseElement),
          3 === e.nodeType ? e.parentNode : e
        );
      }
      let Se = null;
      let xe = null;
      let Ee = null;
      function Ce(e) {
        if ((e = bl(e))) {
          if ("function" !== typeof Se) throw Error(a(280));
          let n = e.stateNode;
          n && ((n = wl(n)), Se(e.stateNode, e.type, n));
        }
      }
      function _e(e) {
        xe ? (Ee ? Ee.push(e) : (Ee = [e])) : (xe = e);
      }
      function ze() {
        if (xe) {
          let e = xe;
          const n = Ee;
          if (((Ee = xe = null), Ce(e), n))
            for (e = 0; e < n.length; e++) Ce(n[e]);
        }
      }
      function Ne(e, n) {
        return e(n);
      }
      function Pe() {}
      let Te = !1;
      function Le(e, n, t) {
        if (Te) return e(n, t);
        Te = !0;
        try {
          return Ne(e, n, t);
        } finally {
          (Te = !1), (null !== xe || null !== Ee) && (Pe(), ze());
        }
      }
      function Me(e, n) {
        let t = e.stateNode;
        if (null === t) return null;
        let r = wl(t);
        if (null === r) return null;
        t = r[n];
        switch (n) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (r = !r.disabled) ||
              (r = !(
                "button" === (e = e.type) ||
                "input" === e ||
                "select" === e ||
                "textarea" === e
              )),
              (e = !r);
            break;
          default:
            e = !1;
        }
        if (e) return null;
        if (t && "function" !== typeof t) throw Error(a(231, n, typeof t));
        return t;
      }
      let Fe = !1;
      if (c)
        try {
          const De = {};
          Object.defineProperty(De, "passive", {
            get: () => {
              Fe = !0;
            },
          }),
            window.addEventListener("test", De, De),
            window.removeEventListener("test", De, De);
        } catch (ce) {
          Fe = !1;
        }
      function Re(e, n, t, r, l, a, u, o, i) {
        const s = Array.prototype.slice.call(arguments, 3);
        try {
          n.apply(t, s);
        } catch (e) {
          this.onError(e);
        }
      }
      let Oe = !1;
      let Ie = null;
      let Ue = !1;
      let Ve = null;
      const Ae = {
          onError: (e) => {
            (Oe = !0), (Ie = e);
          },
        };
      function Be(e, n, t, r, l, a, u, o, i) {
        (Oe = !1), (Ie = null), Re.apply(Ae, arguments);
      }
      function He(e) {
        let n = e;
        let t = e;
        if (e.alternate) while (n.return) n = n.return;
        else {
          e = n;
          do {
            0 !== (4098 & (n = e).flags) && (t = n.return), (e = n.return);
          } while (e);
        }
        return 3 === n.tag ? t : null;
      }
      function We(e) {
        if (13 === e.tag) {
          let n = e.memoizedState;
          if (
            (null === n && null !== (e = e.alternate) && (n = e.memoizedState),
            null !== n)
          )
            return n.dehydrated;
        }
        return null;
      }
      function Qe(e) {
        if (He(e) !== e) throw Error(a(188));
      }
      function je(e) {
        return null !==
          (e = ((e) => {
            let n = e.alternate;
            if (!n) {
              if (null === (n = He(e))) throw Error(a(188));
              return n !== e ? null : e;
            }
            for (let t = e, r = n; ; ) {
              const l = t.return;
              if (null === l) break;
              let u = l.alternate;
              if (null === u) {
                if (null !== (r = l.return)) {
                  t = r;
                  continue;
                }
                break;
              }
              if (l.child === u.child) {
                for (u = l.child; u; ) {
                  if (u === t) return Qe(l), e;
                  if (u === r) return Qe(l), n;
                  u = u.sibling;
                }
                throw Error(a(188));
              }
              if (t.return !== r.return) (t = l), (r = u);
              else {
                for (let o = !1, i = l.child; i; ) {
                  if (i === t) {
                    (o = !0), (t = l), (r = u);
                    break;
                  }
                  if (i === r) {
                    (o = !0), (r = l), (t = u);
                    break;
                  }
                  i = i.sibling;
                }
                if (!o) {
                  for (i = u.child; i; ) {
                    if (i === t) {
                      (o = !0), (t = u), (r = l);
                      break;
                    }
                    if (i === r) {
                      (o = !0), (r = u), (t = l);
                      break;
                    }
                    i = i.sibling;
                  }
                  if (!o) throw Error(a(189));
                }
              }
              if (t.alternate !== r) throw Error(a(190));
            }
            if (3 !== t.tag) throw Error(a(188));
            return t.stateNode.current === t ? e : n;
          })(e))
          ? $e(e)
          : null;
      }
      function $e(e) {
        if (5 === e.tag || 6 === e.tag) return e;
        for (e = e.child; null !== e; ) {
          const n = $e(e);
          if (null !== n) return n;
          e = e.sibling;
        }
        return null;
      }
      const Ke = l.unstable_scheduleCallback;
      const qe = l.unstable_cancelCallback;
      const Ye = l.unstable_shouldYield;
      const Xe = l.unstable_requestPaint;
      const Ge = l.unstable_now;
      const Ze = l.unstable_getCurrentPriorityLevel;
      const Je = l.unstable_ImmediatePriority;
      const en = l.unstable_UserBlockingPriority;
      const nn = l.unstable_NormalPriority;
      const tn = l.unstable_LowPriority;
      const rn = l.unstable_IdlePriority;
      let ln = null;
      let an = null;
      const un = Math.clz32
          ? Math.clz32
          : (e) => 0 === (e >>>= 0) ? 32 : (31 - ((on(e) / sn) | 0)) | 0;
      const on = Math.log;
      const sn = Math.LN2;
      let cn = 64;
      let fn = 4194304;
      function dn(e) {
        switch (e & -e) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return 4194240 & e;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return 130023424 & e;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return e;
        }
      }
      function pn(e, n) {
        let t = e.pendingLanes;
        if (0 === t) return 0;
        let r = 0;
        let l = e.suspendedLanes;
        let a = e.pingedLanes;
        let u = 268435455 & t;
        if (0 !== u) {
          const o = u & ~l;
          0 !== o ? (r = dn(o)) : 0 !== (a &= u) && (r = dn(a));
        } else 0 !== (u = t & ~l) ? (r = dn(u)) : 0 !== a && (r = dn(a));
        if (0 === r) return 0;
        if (
          0 !== n &&
          n !== r &&
          0 === (n & l) &&
          ((l = r & -r) >= (a = n & -n) || (16 === l && 0 !== (4194240 & a)))
        )
          return n;
        if ((0 !== (4 & r) && (r |= 16 & t), 0 !== (n = e.entangledLanes)))
          for (e = e.entanglements, n &= r; 0 < n; )
            (l = 1 << (t = 31 - un(n))), (r |= e[t]), (n &= ~l);
        return r;
      }
      function mn(e, n) {
        switch (e) {
          case 1:
          case 2:
          case 4:
            return n + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return n + 5e3;
          default:
            return -1;
        }
      }
      function hn(e) {
        return 0 !== (e = -1073741825 & e.pendingLanes)
          ? e
          : 1073741824 & e
          ? 1073741824
          : 0;
      }
      function gn() {
        const e = cn;
        return 0 === (4194240 & (cn <<= 1)) && (cn = 64), e;
      }
      function vn(e) {
        for (let n = [], t = 0; 31 > t; t++) n.push(e);
        return n;
      }
      function yn(e, n, t) {
        (e.pendingLanes |= n),
          536870912 !== n && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
          ((e = e.eventTimes)[(n = 31 - un(n))] = t);
      }
      function bn(e, n) {
        let t = (e.entangledLanes |= n);
        for (e = e.entanglements; t; ) {
          const r = 31 - un(t);
          const l = 1 << r;
          (l & n) | (e[r] & n) && (e[r] |= n), (t &= ~l);
        }
      }
      let kn = 0;
      function wn(e) {
        return 1 < (e &= -e)
          ? 4 < e
            ? 0 !== (268435455 & e)
              ? 16
              : 536870912
            : 4
          : 1;
      }
      let Sn;
      let xn;
      let En;
      let Cn;
      let _n;
      let zn = !1;
      const Nn = [];
      let Pn = null;
      let Tn = null;
      let Ln = null;
      const Mn = new Map();
      const Fn = new Map();
      const Dn = [];
      const Rn =
          "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " ",
          );
      function On(e, n) {
        switch (e) {
          case "focusin":
          case "focusout":
            Pn = null;
            break;
          case "dragenter":
          case "dragleave":
            Tn = null;
            break;
          case "mouseover":
          case "mouseout":
            Ln = null;
            break;
          case "pointerover":
          case "pointerout":
            Mn.delete(n.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Fn.delete(n.pointerId);
        }
      }
      function In(e, n, t, r, l, a) {
        return null === e || e.nativeEvent !== a
          ? ((e = {
              blockedOn: n,
              domEventName: t,
              eventSystemFlags: r,
              nativeEvent: a,
              targetContainers: [l],
            }),
            null !== n && null !== (n = bl(n)) && xn(n),
            e)
          : ((e.eventSystemFlags |= r),
            (n = e.targetContainers),
            null !== l && -1 === n.indexOf(l) && n.push(l),
            e);
      }
      function Un(e) {
        let n = yl(e.target);
        if (null !== n) {
          const t = He(n);
          if (null !== t)
            if (13 === (n = t.tag)) {
              if (null !== (n = We(t)))
                return (
                  (e.blockedOn = n),
                  void _n(e.priority, () => {
                    En(t);
                  })
                );
            } else if (
              3 === n &&
              t.stateNode.current.memoizedState.isDehydrated
            )
              return void (e.blockedOn =
                3 === t.tag ? t.stateNode.containerInfo : null);
        }
        e.blockedOn = null;
      }
      function Vn(e) {
        if (null !== e.blockedOn) return !1;
        for (let n = e.targetContainers; 0 < n.length; ) {
          let t = Xn(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
          if (null !== t)
            return null !== (n = bl(t)) && xn(n), (e.blockedOn = t), !1;
          const r = new (t = e.nativeEvent).constructor(t.type, t);
          (ke = r), t.target.dispatchEvent(r), (ke = null), n.shift();
        }
        return !0;
      }
      function An(e, n, t) {
        Vn(e) && t.delete(n);
      }
      function Bn() {
        (zn = !1),
          null !== Pn && Vn(Pn) && (Pn = null),
          null !== Tn && Vn(Tn) && (Tn = null),
          null !== Ln && Vn(Ln) && (Ln = null),
          Mn.forEach(An),
          Fn.forEach(An);
      }
      function Hn(e, n) {
        e.blockedOn === n &&
          ((e.blockedOn = null),
          zn ||
            ((zn = !0),
            l.unstable_scheduleCallback(l.unstable_NormalPriority, Bn)));
      }
      function Wn(e) {
        function n(n) {
          return Hn(n, e);
        }
        if (0 < Nn.length) {
          Hn(Nn[0], e);
          for (let t = 1; t < Nn.length; t++) {
            const r = Nn[t];
            r.blockedOn === e && (r.blockedOn = null);
          }
        }
        for (
          null !== Pn && Hn(Pn, e),
            null !== Tn && Hn(Tn, e),
            null !== Ln && Hn(Ln, e),
            Mn.forEach(n),
            Fn.forEach(n),
            t = 0;
          t < Dn.length;
          t++
        )
          (r = Dn[t]).blockedOn === e && (r.blockedOn = null);
        while (0 < Dn.length && null === (t = Dn[0]).blockedOn)
          Un(t), null === t.blockedOn && Dn.shift();
      }
      const Qn = k.ReactCurrentBatchConfig;
      let jn = !0;
      function $n(e, n, t, r) {
        const l = kn;
        const a = Qn.transition;
        Qn.transition = null;
        try {
          (kn = 1), qn(e, n, t, r);
        } finally {
          (kn = l), (Qn.transition = a);
        }
      }
      function Kn(e, n, t, r) {
        const l = kn;
        const a = Qn.transition;
        Qn.transition = null;
        try {
          (kn = 4), qn(e, n, t, r);
        } finally {
          (kn = l), (Qn.transition = a);
        }
      }
      function qn(e, n, t, r) {
        if (jn) {
          let l = Xn(e, n, t, r);
          if (null === l) Qr(e, n, r, Yn, t), On(e, r);
          else if (
            ((e, n, t, r, l) => {
              switch (n) {
                case "focusin":
                  return (Pn = In(Pn, e, n, t, r, l)), !0;
                case "dragenter":
                  return (Tn = In(Tn, e, n, t, r, l)), !0;
                case "mouseover":
                  return (Ln = In(Ln, e, n, t, r, l)), !0;
                case "pointerover": {
                  const a = l.pointerId;
                  return Mn.set(a, In(Mn.get(a) || null, e, n, t, r, l)), !0;
                }
                case "gotpointercapture":
                  return (
                    (a = l.pointerId),
                    Fn.set(a, In(Fn.get(a) || null, e, n, t, r, l)),
                    !0
                  );
              }
              return !1;
            })(l, e, n, t, r)
          )
            r.stopPropagation();
          else if ((On(e, r), 4 & n && -1 < Rn.indexOf(e))) {
            while (null !== l) {
              let a = bl(l);
              if (
                (null !== a && Sn(a),
                null === (a = Xn(e, n, t, r)) && Qr(e, n, r, Yn, t),
                a === l)
              )
                break;
              l = a;
            }
            null !== l && r.stopPropagation();
          } else Qr(e, n, r, null, t);
        }
      }
      let Yn = null;
      function Xn(e, n, t, r) {
        if (((Yn = null), null !== (e = yl((e = we(r))))))
          if (null === (n = He(e))) e = null;
          else if (13 === (t = n.tag)) {
            if (null !== (e = We(n))) return e;
            e = null;
          } else if (3 === t) {
            if (n.stateNode.current.memoizedState.isDehydrated)
              return 3 === n.tag ? n.stateNode.containerInfo : null;
            e = null;
          } else n !== e && (e = null);
        return (Yn = e), null;
      }
      function Gn(e) {
        switch (e) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (Ze()) {
              case Je:
                return 1;
              case en:
                return 4;
              case nn:
              case tn:
                return 16;
              case rn:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      let Zn = null;
      let Jn = null;
      let et = null;
      function nt() {
        if (et) return et;
        let e;
        let n;
        const t = Jn;
        const r = t.length;
        const l = "value" in Zn ? Zn.value : Zn.textContent;
        const a = l.length;
        for (e = 0; e < r && t[e] === l[e]; e++);
        const u = r - e;
        for (n = 1; n <= u && t[r - n] === l[a - n]; n++);
        return (et = l.slice(e, 1 < n ? 1 - n : void 0));
      }
      function tt(e) {
        const n = e.keyCode;
        return (
          "charCode" in e
            ? 0 === (e = e.charCode) && 13 === n && (e = 13)
            : (e = n),
          10 === e && (e = 13),
          32 <= e || 13 === e ? e : 0
        );
      }
      function rt() {
        return !0;
      }
      function lt() {
        return !1;
      }
      function at(e) {
        function n(n, t, r, l, a) {
          for (const u in ((this._reactName = n),
          (this._targetInst = r),
          (this.type = t),
          (this.nativeEvent = l),
          (this.target = a),
          (this.currentTarget = null),
          e))
            e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(l) : l[u]));
          return (
            (this.isDefaultPrevented = (
              null != l.defaultPrevented
                ? l.defaultPrevented
                : !1 === l.returnValue
            )
              ? rt
              : lt),
            (this.isPropagationStopped = lt),
            this
          );
        }
        return (
          I(n.prototype, {
            preventDefault: function () {
              this.defaultPrevented = !0;
              const e = this.nativeEvent;
              e &&
                (e.preventDefault
                  ? e.preventDefault()
                  : "unknown" !== typeof e.returnValue && (e.returnValue = !1),
                (this.isDefaultPrevented = rt));
            },
            stopPropagation: function () {
              const e = this.nativeEvent;
              e &&
                (e.stopPropagation
                  ? e.stopPropagation()
                  : "unknown" !== typeof e.cancelBubble && (e.cancelBubble = !0),
                (this.isPropagationStopped = rt));
            },
            persist: () => {},
            isPersistent: rt,
          }),
          n
        );
      }
      let ut;
      let ot;
      let it;
      const st = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: (e) => e.timeStamp || Date.now(),
          defaultPrevented: 0,
          isTrusted: 0,
        };
      const ct = at(st);
      const ft = I({}, st, { view: 0, detail: 0 });
      const dt = at(ft);
      const pt = I({}, ft, {
          screenX: 0,
          screenY: 0,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          getModifierState: Ct,
          button: 0,
          buttons: 0,
          relatedTarget: (e) => void 0 === e.relatedTarget
              ? e.fromElement === e.srcElement
                ? e.toElement
                : e.fromElement
              : e.relatedTarget,
          movementX: (e) => "movementX" in e
              ? e.movementX
              : (e !== it &&
                  (it && "mousemove" === e.type
                    ? ((ut = e.screenX - it.screenX),
                      (ot = e.screenY - it.screenY))
                    : (ot = ut = 0),
                  (it = e)),
                ut),
          movementY: (e) => "movementY" in e ? e.movementY : ot,
        });
      const mt = at(pt);
      const ht = at(I({}, pt, { dataTransfer: 0 }));
      const gt = at(I({}, ft, { relatedTarget: 0 }));
      const vt = at(
          I({}, st, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
        );
      const yt = I({}, st, {
          clipboardData: (e) => "clipboardData" in e
              ? e.clipboardData
              : window.clipboardData,
        });
      const bt = at(yt);
      const kt = at(I({}, st, { data: 0 }));
      const wt = {
          Esc: "Escape",
          Spacebar: " ",
          Left: "ArrowLeft",
          Up: "ArrowUp",
          Right: "ArrowRight",
          Down: "ArrowDown",
          Del: "Delete",
          Win: "OS",
          Menu: "ContextMenu",
          Apps: "ContextMenu",
          Scroll: "ScrollLock",
          MozPrintableKey: "Unidentified",
        };
      const St = {
          8: "Backspace",
          9: "Tab",
          12: "Clear",
          13: "Enter",
          16: "Shift",
          17: "Control",
          18: "Alt",
          19: "Pause",
          20: "CapsLock",
          27: "Escape",
          32: " ",
          33: "PageUp",
          34: "PageDown",
          35: "End",
          36: "Home",
          37: "ArrowLeft",
          38: "ArrowUp",
          39: "ArrowRight",
          40: "ArrowDown",
          45: "Insert",
          46: "Delete",
          112: "F1",
          113: "F2",
          114: "F3",
          115: "F4",
          116: "F5",
          117: "F6",
          118: "F7",
          119: "F8",
          120: "F9",
          121: "F10",
          122: "F11",
          123: "F12",
          144: "NumLock",
          145: "ScrollLock",
          224: "Meta",
        };
      const xt = {
          Alt: "altKey",
          Control: "ctrlKey",
          Meta: "metaKey",
          Shift: "shiftKey",
        };
      function Et(e) {
        const n = this.nativeEvent;
        return n.getModifierState
          ? n.getModifierState(e)
          : !!(e = xt[e]) && !!n[e];
      }
      function Ct() {
        return Et;
      }
      const _t = I({}, ft, {
          key: (e) => {
            if (e.key) {
              const n = wt[e.key] || e.key;
              if ("Unidentified" !== n) return n;
            }
            return "keypress" === e.type
              ? 13 === (e = tt(e))
                ? "Enter"
                : String.fromCharCode(e)
              : "keydown" === e.type || "keyup" === e.type
              ? St[e.keyCode] || "Unidentified"
              : "";
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Ct,
          charCode: (e) => "keypress" === e.type ? tt(e) : 0,
          keyCode: (e) => "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0,
          which: (e) => "keypress" === e.type
              ? tt(e)
              : "keydown" === e.type || "keyup" === e.type
              ? e.keyCode
              : 0,
        });
      const zt = at(_t);
      const Nt = at(
          I({}, pt, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0,
          }),
        );
      const Pt = at(
          I({}, ft, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: Ct,
          }),
        );
      const Tt = at(
          I({}, st, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
        );
      const Lt = I({}, pt, {
          deltaX: (e) => "deltaX" in e
              ? e.deltaX
              : "wheelDeltaX" in e
              ? -e.wheelDeltaX
              : 0,
          deltaY: (e) => "deltaY" in e
              ? e.deltaY
              : "wheelDeltaY" in e
              ? -e.wheelDeltaY
              : "wheelDelta" in e
              ? -e.wheelDelta
              : 0,
          deltaZ: 0,
          deltaMode: 0,
        });
      const Mt = at(Lt);
      const Ft = [9, 13, 27, 32];
      const Dt = c && "CompositionEvent" in window;
      let Rt = null;
      c && "documentMode" in document && (Rt = document.documentMode);
      const Ot = c && "TextEvent" in window && !Rt;
      const It = c && (!Dt || (Rt && 8 < Rt && 11 >= Rt));
      const Ut = String.fromCharCode(32);
      let Vt = !1;
      function At(e, n) {
        switch (e) {
          case "keyup":
            return -1 !== Ft.indexOf(n.keyCode);
          case "keydown":
            return 229 !== n.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return !0;
          default:
            return !1;
        }
      }
      function Bt(e) {
        return "object" === typeof (e = e.detail) && "data" in e ? e.data : null;
      }
      let Ht = !1;
      const Wt = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      };
      function Qt(e) {
        const n = e?.nodeName?.toLowerCase();
        return "input" === n ? !!Wt[e.type] : "textarea" === n;
      }
      function jt(e, n, t, r) {
        _e(r),
          0 < (n = $r(n, "onChange")).length &&
            ((t = new ct("onChange", "change", null, t, r)),
            e.push({ event: t, listeners: n }));
      }
      let $t = null;
      let Kt = null;
      function qt(e) {
        Ur(e, 0);
      }
      function Yt(e) {
        if (K(kl(e))) return e;
      }
      function Xt(e, n) {
        if ("change" === e) return n;
      }
      let Gt = !1;
      if (c) {
        let Zt;
        if (c) {
          let Jt = "oninput" in document;
          if (!Jt) {
            const er = document.createElement("div");
            er.setAttribute("oninput", "return;"),
              (Jt = "function" === typeof er.oninput);
          }
          Zt = Jt;
        } else Zt = !1;
        Gt = Zt && (!document.documentMode || 9 < document.documentMode);
      }
      function nr() {
        $t && ($t.detachEvent("onpropertychange", tr), (Kt = $t = null));
      }
      function tr(e) {
        if ("value" === e.propertyName && Yt(Kt)) {
          const n = [];
          jt(n, Kt, e, we(e)), Le(qt, n);
        }
      }
      function rr(e, n, t) {
        "focusin" === e
          ? (nr(), (Kt = t), ($t = n).attachEvent("onpropertychange", tr))
          : "focusout" === e && nr();
      }
      function lr(e) {
        if ("selectionchange" === e || "keyup" === e || "keydown" === e)
          return Yt(Kt);
      }
      function ar(e, n) {
        if ("click" === e) return Yt(n);
      }
      function ur(e, n) {
        if ("input" === e || "change" === e) return Yt(n);
      }
      const or =
        "function" === typeof Object.is
          ? Object.is
          : (e, n) => (
                (e === n && (0 !== e || 1 / e === 1 / n)) || (e !== e && n !== n)
              );
      function ir(e, n) {
        if (or(e, n)) return !0;
        if (
          "object" !== typeof e ||
          null === e ||
          "object" !== typeof n ||
          null === n
        )
          return !1;
        const t = Object.keys(e);
        let r = Object.keys(n);
        if (t.length !== r.length) return !1;
        for (r = 0; r < t.length; r++) {
          const l = t[r];
          if (!f.call(n, l) || !or(e[l], n[l])) return !1;
        }
        return !0;
      }
      function sr(e) {
        while (e?.firstChild) e = e.firstChild;
        return e;
      }
      function cr(e, n) {
        let t;
        let r = sr(e);
        for (e = 0; r; ) {
          if (3 === r.nodeType) {
            if (((t = e + r.textContent.length), e <= n && t >= n))
              return { node: r, offset: n - e };
            e = t;
          }
          e: {
            while (r) {
              if (r.nextSibling) {
                r = r.nextSibling;
                break e;
              }
              r = r.parentNode;
            }
            r = void 0;
          }
          r = sr(r);
        }
      }
      function fr(e, n) {
        return (
          !(!e || !n) &&
          (e === n ||
            ((!e || 3 !== e.nodeType) &&
              (n && 3 === n.nodeType
                ? fr(e, n.parentNode)
                : "contains" in e
                ? e.contains(n)
                : !!e.compareDocumentPosition &&
                  !!(16 & e.compareDocumentPosition(n)))))
        );
      }
      function dr() {
        for (let e = window, n = q(); n instanceof e.HTMLIFrameElement; ) {
          try {
            const t = "string" === typeof n.contentWindow.location.href;
          } catch (e) {
            t = !1;
          }
          if (!t) break;
          n = q((e = n.contentWindow).document);
        }
        return n;
      }
      function pr(e) {
        const n = e?.nodeName?.toLowerCase();
        return (
          n &&
          (("input" === n &&
            ("text" === e.type ||
              "search" === e.type ||
              "tel" === e.type ||
              "url" === e.type ||
              "password" === e.type)) ||
            "textarea" === n ||
            "true" === e.contentEditable)
        );
      }
      function mr(e) {
        let n = dr();
        let t = e.focusedElem;
        let r = e.selectionRange;
        if (
          n !== t &&
          t &&
          t.ownerDocument &&
          fr(t.ownerDocument.documentElement, t)
        ) {
          if (null !== r && pr(t))
            if (
              ((n = r.start),
              void 0 === (e = r.end) && (e = n),
              "selectionStart" in t)
            )
              (t.selectionStart = n),
                (t.selectionEnd = Math.min(e, t.value.length));
            else if (
              (e =
                ((n = t.ownerDocument || document) && n.defaultView) || window)
                .getSelection
            ) {
              e = e.getSelection();
              let l = t.textContent.length;
              let a = Math.min(r.start, l);
              (r = void 0 === r.end ? a : Math.min(r.end, l)),
                !e.extend && a > r && ((l = r), (r = a), (a = l)),
                (l = cr(t, a));
              const u = cr(t, r);
              l &&
                u &&
                (1 !== e.rangeCount ||
                  e.anchorNode !== l.node ||
                  e.anchorOffset !== l.offset ||
                  e.focusNode !== u.node ||
                  e.focusOffset !== u.offset) &&
                ((n = n.createRange()).setStart(l.node, l.offset),
                e.removeAllRanges(),
                a > r
                  ? (e.addRange(n), e.extend(u.node, u.offset))
                  : (n.setEnd(u.node, u.offset), e.addRange(n)));
            }
          for (n = [], e = t; (e = e.parentNode); )
            1 === e.nodeType &&
              n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
          for (
            "function" === typeof t.focus && t.focus(), t = 0;
            t < n.length;
            t++
          )
            ((e = n[t]).element.scrollLeft = e.left),
              (e.element.scrollTop = e.top);
        }
      }
      const hr = c && "documentMode" in document && 11 >= document.documentMode;
      let gr = null;
      let vr = null;
      let yr = null;
      let br = !1;
      function kr(e, n, t) {
        let r =
          t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
        br ||
          null == gr ||
          gr !== q(r) ||
          ("selectionStart" in (r = gr) && pr(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : (r = {
                anchorNode: (r = (
                  (r.ownerDocument?.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset,
              }),
          (yr && ir(yr, r)) ||
            ((yr = r),
            0 < (r = $r(vr, "onSelect")).length &&
              ((n = new ct("onSelect", "select", null, n, t)),
              e.push({ event: n, listeners: r }),
              (n.target = gr))));
      }
      function wr(e, n) {
        const t = {};
        return (
          (t[e.toLowerCase()] = n.toLowerCase()),
          (t[`Webkit${e}`] = `webkit${n}`),
          (t[`Moz${e}`] = `moz${n}`),
          t
        );
      }
      const Sr = {
          animationend: wr("Animation", "AnimationEnd"),
          animationiteration: wr("Animation", "AnimationIteration"),
          animationstart: wr("Animation", "AnimationStart"),
          transitionend: wr("Transition", "TransitionEnd"),
        };
      const xr = {};
      let Er = {};
      function Cr(e) {
        if (xr[e]) return xr[e];
        if (!Sr[e]) return e;
        let n;
        const t = Sr[e];
        for (n in t) if (t.hasOwnProperty(n) && n in Er) return (xr[e] = t[n]);
        return e;
      }
      c &&
        ((Er = document.createElement("div").style),
        "AnimationEvent" in window ||
          (Sr.animationend.animation = undefined,
          Sr.animationiteration.animation = undefined,
          Sr.animationstart.animation = undefined),
        "TransitionEvent" in window || Sr.transitionend.transition = undefined);
      const _r = Cr("animationend");
      const zr = Cr("animationiteration");
      const Nr = Cr("animationstart");
      const Pr = Cr("transitionend");
      const Tr = new Map();
      const Lr =
          "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " ",
          );
      function Mr(e, n) {
        Tr.set(e, n), i(n, [e]);
      }
      for (let Fr = 0; Fr < Lr.length; Fr++) {
        const Dr = Lr[Fr];
        Mr(Dr.toLowerCase(), `on${Dr[0].toUpperCase()}${Dr.slice(1)}`);
      }
      Mr(_r, "onAnimationEnd"),
        Mr(zr, "onAnimationIteration"),
        Mr(Nr, "onAnimationStart"),
        Mr("dblclick", "onDoubleClick"),
        Mr("focusin", "onFocus"),
        Mr("focusout", "onBlur"),
        Mr(Pr, "onTransitionEnd"),
        s("onMouseEnter", ["mouseout", "mouseover"]),
        s("onMouseLeave", ["mouseout", "mouseover"]),
        s("onPointerEnter", ["pointerout", "pointerover"]),
        s("onPointerLeave", ["pointerout", "pointerover"]),
        i(
          "onChange",
          "change click focusin focusout input keydown keyup selectionchange".split(
            " ",
          ),
        ),
        i(
          "onSelect",
          "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
            " ",
          ),
        ),
        i("onBeforeInput", [
          "compositionend",
          "keypress",
          "textInput",
          "paste",
        ]),
        i(
          "onCompositionEnd",
          "compositionend focusout keydown keypress keyup mousedown".split(" "),
        ),
        i(
          "onCompositionStart",
          "compositionstart focusout keydown keypress keyup mousedown".split(
            " ",
          ),
        ),
        i(
          "onCompositionUpdate",
          "compositionupdate focusout keydown keypress keyup mousedown".split(
            " ",
          ),
        );
      const Rr =
          "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " ",
          );
      const Or = new Set(
          "cancel close invalid load scroll toggle".split(" ").concat(Rr),
        );
      function Ir(e, n, t) {
        const r = e.type || "unknown-event";
        (e.currentTarget = t),
          (function (e, n, t, r, l, u, o, i, s) {
            if ((Be.apply(this, arguments), Oe)) {
              if (!Oe) throw Error(a(198));
              const c = Ie;
              (Oe = !1), (Ie = null), Ue || ((Ue = !0), (Ve = c));
            }
          })(r, n, void 0, e),
          (e.currentTarget = null);
      }
      function Ur(e, n) {
        n = 0 !== (4 & n);
        for (let t = 0; t < e.length; t++) {
          let r = e[t];
          const l = r.event;
          r = r.listeners;
          e: {
            let a = void 0;
            if (n)
              for (let u = r.length - 1; 0 <= u; u--) {
                let o = r[u];
                const i = o.instance;
                const s = o.currentTarget;
                if (((o = o.listener), i !== a && l.isPropagationStopped()))
                  break e;
                Ir(l, o, s), (a = i);
              }
            else
              for (u = 0; u < r.length; u++) {
                if (
                  ((i = (o = r[u]).instance),
                  (s = o.currentTarget),
                  (o = o.listener),
                  i !== a && l.isPropagationStopped())
                )
                  break e;
                Ir(l, o, s), (a = i);
              }
          }
        }
        if (Ue) throw ((e = Ve), (Ue = !1), (Ve = null), e);
      }
      function Vr(e, n) {
        let t = n[hl];
        void 0 === t && (t = n[hl] = new Set());
        const r = `${e}__bubble`;
        t.has(r) || (Wr(n, e, 2, !1), t.add(r));
      }
      function Ar(e, n, t) {
        let r = 0;
        n && (r |= 4), Wr(t, e, r, n);
      }
      const Br = `_reactListening${Math.random().toString(36).slice(2)}`;
      function Hr(e) {
        if (!e[Br]) {
          (e[Br] = !0),
            u.forEach((n) => {
              "selectionchange" !== n &&
                (Or.has(n) || Ar(n, !1, e), Ar(n, !0, e));
            });
          const n = 9 === e.nodeType ? e : e.ownerDocument;
          null === n || n[Br] || ((n[Br] = !0), Ar("selectionchange", !1, n));
        }
      }
      function Wr(e, n, t, r) {
        switch (Gn(n)) {
          case 1: {
            const l = $n;
            break;
          }
          case 4:
            l = Kn;
            break;
          default:
            l = qn;
        }
        (t = l.bind(null, n, t, e)),
          (l = void 0),
          !Fe ||
            ("touchstart" !== n && "touchmove" !== n && "wheel" !== n) ||
            (l = !0),
          r
            ? void 0 !== l
              ? e.addEventListener(n, t, { capture: !0, passive: l })
              : e.addEventListener(n, t, !0)
            : void 0 !== l
            ? e.addEventListener(n, t, { passive: l })
            : e.addEventListener(n, t, !1);
      }
      function Qr(e, n, t, r, l) {
        let a = r;
        if (0 === (1 & n) && 0 === (2 & n) && null !== r)
          e: for (;;) {
            if (null === r) return;
            let u = r.tag;
            if (3 === u || 4 === u) {
              let o = r.stateNode.containerInfo;
              if (o === l || (8 === o.nodeType && o.parentNode === l)) break;
              if (4 === u)
                for (u = r.return; null !== u; ) {
                  let i = u.tag;
                  if (
                    (3 === i || 4 === i) &&
                    ((i = u.stateNode.containerInfo) === l ||
                      (8 === i.nodeType && i.parentNode === l))
                  )
                    return;
                  u = u.return;
                }
              while (null !== o) {
                if (null === (u = yl(o))) return;
                if (5 === (i = u.tag) || 6 === i) {
                  r = a = u;
                  continue e;
                }
                o = o.parentNode;
              }
            }
            r = r.return;
          }
        Le(() => {
          let r = a;
          let l = we(t);
          const u = [];
          e: {
            let o = Tr.get(e);
            if (void 0 !== o) {
              let i = ct;
              let s = e;
              switch (e) {
                case "keypress":
                  if (0 === tt(t)) break e;
                case "keydown":
                case "keyup":
                  i = zt;
                  break;
                case "focusin":
                  (s = "focus"), (i = gt);
                  break;
                case "focusout":
                  (s = "blur"), (i = gt);
                  break;
                case "beforeblur":
                case "afterblur":
                  i = gt;
                  break;
                case "click":
                  if (2 === t.button) break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  i = mt;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  i = ht;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  i = Pt;
                  break;
                case _r:
                case zr:
                case Nr:
                  i = vt;
                  break;
                case Pr:
                  i = Tt;
                  break;
                case "scroll":
                  i = dt;
                  break;
                case "wheel":
                  i = Mt;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  i = bt;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  i = Nt;
              }
              let c = 0 !== (4 & n);
              const f = !c && "scroll" === e;
              const d = c ? (null !== o ? `${o}Capture` : null) : o;
              c = [];
              for (let p, m = r; null !== m; ) {
                let h = (p = m).stateNode;
                if (
                  (5 === p.tag &&
                    null !== h &&
                    ((p = h),
                    null !== d &&
                      null != (h = Me(m, d)) &&
                      c.push(jr(m, h, p))),
                  f)
                )
                  break;
                m = m.return;
              }
              0 < c.length &&
                ((o = new i(o, s, null, t, l)),
                u.push({ event: o, listeners: c }));
            }
          }
          if (0 === (7 & n)) {
            if (
              ((i = "mouseout" === e || "pointerout" === e),
              (!(o = "mouseover" === e || "pointerover" === e) ||
                t === ke ||
                !(s = t.relatedTarget || t.fromElement) ||
                (!yl(s) && !s[ml])) &&
                (i || o) &&
                ((o =
                  l.window === l
                    ? l
                    : (o = l.ownerDocument)
                    ? o.defaultView || o.parentWindow
                    : window),
                i
                  ? ((i = r),
                    null !==
                      (s = (s = t.relatedTarget || t.toElement)
                        ? yl(s)
                        : null) &&
                      (s !== (f = He(s)) || (5 !== s.tag && 6 !== s.tag)) &&
                      (s = null))
                  : ((i = null), (s = r)),
                i !== s))
            ) {
              if (
                ((c = mt),
                (h = "onMouseLeave"),
                (d = "onMouseEnter"),
                (m = "mouse"),
                ("pointerout" !== e && "pointerover" !== e) ||
                  ((c = Nt),
                  (h = "onPointerLeave"),
                  (d = "onPointerEnter"),
                  (m = "pointer")),
                (f = null == i ? o : kl(i)),
                (p = null == s ? o : kl(s)),
                ((o = new c(h, `${m}leave`, i, t, l)).target = f),
                (o.relatedTarget = p),
                (h = null),
                yl(l) === r &&
                  (((c = new c(d, `${m}enter`, s, t, l)).target = p),
                  (c.relatedTarget = f),
                  (h = c)),
                (f = h),
                i && s)
              )
                e: {
                  for (d = s, m = 0, p = c = i; p; p = Kr(p)) m++;
                  for (p = 0, h = d; h; h = Kr(h)) p++;
                  while (0 < m - p) (c = Kr(c)), m--;
                  while (0 < p - m) (d = Kr(d)), p--;
                  while (m--) {
                    if (c === d || (null !== d && c === d.alternate)) break e;
                    (c = Kr(c)), (d = Kr(d));
                  }
                  c = null;
                }
              else c = null;
              null !== i && qr(u, o, i, c, !1),
                null !== s && null !== f && qr(u, f, s, c, !0);
            }
            if (
              "select" ===
                (i =
                  (o = r ? kl(r) : window).nodeName &&
                  o.nodeName.toLowerCase()) ||
              ("input" === i && "file" === o.type)
            )
              let g = Xt;
            else if (Qt(o))
              if (Gt) g = ur;
              else {
                g = lr;
                const v = rr;
              }
            else
              (i = o.nodeName) &&
                "input" === i.toLowerCase() &&
                ("checkbox" === o.type || "radio" === o.type) &&
                (g = ar);
            switch (
              (g && (g = g(e, r))
                ? jt(u, g, t, l)
                : (v?.(e, o, r),
                  "focusout" === e &&
                    (v = o._wrapperState) &&
                    v.controlled &&
                    "number" === o.type &&
                    ee(o, "number", o.value)),
              (v = r ? kl(r) : window),
              e)
            ) {
              case "focusin":
                (Qt(v) || "true" === v.contentEditable) &&
                  ((gr = v), (vr = r), (yr = null));
                break;
              case "focusout":
                yr = vr = gr = null;
                break;
              case "mousedown":
                br = !0;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                (br = !1), kr(u, t, l);
                break;
              case "selectionchange":
                if (hr) break;
              case "keydown":
              case "keyup":
                kr(u, t, l);
            }
            let y;
            if (Dt)
              e: {
                switch (e) {
                  case "compositionstart": {
                    const b = "onCompositionStart";
                    break e;
                  }
                  case "compositionend":
                    b = "onCompositionEnd";
                    break e;
                  case "compositionupdate":
                    b = "onCompositionUpdate";
                    break e;
                }
                b = void 0;
              }
            else
              Ht
                ? At(e, t) && (b = "onCompositionEnd")
                : "keydown" === e &&
                  229 === t.keyCode &&
                  (b = "onCompositionStart");
            b &&
              (It &&
                "ko" !== t.locale &&
                (Ht || "onCompositionStart" !== b
                  ? "onCompositionEnd" === b && Ht && (y = nt())
                  : ((Jn = "value" in (Zn = l) ? Zn.value : Zn.textContent),
                    (Ht = !0))),
              0 < (v = $r(r, b)).length &&
                ((b = new kt(b, e, null, t, l)),
                u.push({ event: b, listeners: v }),
                y ? (b.data = y) : null !== (y = Bt(t)) && (b.data = y))),
              (y = Ot
                ? ((e, n) => {
                    switch (e) {
                      case "compositionend":
                        return Bt(n);
                      case "keypress":
                        return 32 !== n.which ? null : ((Vt = !0), Ut);
                      case "textInput":
                        return (e = n.data) === Ut && Vt ? null : e;
                      default:
                        return null;
                    }
                  })(e, t)
                : ((e, n) => {
                    if (Ht)
                      return "compositionend" === e || (!Dt && At(e, n))
                        ? ((e = nt()), (et = Jn = Zn = null), (Ht = !1), e)
                        : null;
                    switch (e) {
                      default:
                        return null;
                      case "keypress":
                        if (
                          !(n.ctrlKey || n.altKey || n.metaKey) ||
                          (n.ctrlKey && n.altKey)
                        ) {
                          if (n.char && 1 < n.char.length) return n.char;
                          if (n.which) return String.fromCharCode(n.which);
                        }
                        return null;
                      case "compositionend":
                        return It && "ko" !== n.locale ? null : n.data;
                    }
                  })(e, t)) &&
                0 < (r = $r(r, "onBeforeInput")).length &&
                ((l = new kt("onBeforeInput", "beforeinput", null, t, l)),
                u.push({ event: l, listeners: r }),
                (l.data = y));
          }
          Ur(u, n);
        });
      }
      function jr(e, n, t) {
        return { instance: e, listener: n, currentTarget: t };
      }
      function $r(e, n) {
        for (const t = `${n}Capture`, r = []; null !== e; ) {
          let l = e;
          let a = l.stateNode;
          5 === l.tag &&
            null !== a &&
            ((l = a),
            null != (a = Me(e, t)) && r.unshift(jr(e, a, l)),
            null != (a = Me(e, n)) && r.push(jr(e, a, l))),
            (e = e.return);
        }
        return r;
      }
      function Kr(e) {
        if (null === e) return null;
        do {
          e = e.return;
        } while (e && 5 !== e.tag);
        return e || null;
      }
      function qr(e, n, t, r, l) {
        for (const a = n._reactName, u = []; null !== t && t !== r; ) {
          let o = t;
          let i = o.alternate;
          const s = o.stateNode;
          if (null !== i && i === r) break;
          5 === o.tag &&
            null !== s &&
            ((o = s),
            l
              ? null != (i = Me(t, a)) && u.unshift(jr(t, i, o))
              : l || (null != (i = Me(t, a)) && u.push(jr(t, i, o)))),
            (t = t.return);
        }
        0 !== u.length && e.push({ event: n, listeners: u });
      }
      const Yr = /\r\n?/g;
      const Xr = /\u0000|\uFFFD/g;
      function Gr(e) {
        return ("string" === typeof e ? e : `${e}`)
          .replace(Yr, "\n")
          .replace(Xr, "");
      }
      function Zr(e, n, t) {
        if (((n = Gr(n)), Gr(e) !== n && t)) throw Error(a(425));
      }
      function Jr() {}
      let el = null;
      let nl = null;
      function tl(e, n) {
        return (
          "textarea" === e ||
          "noscript" === e ||
          "string" === typeof n.children ||
          "number" === typeof n.children ||
          ("object" === typeof n.dangerouslySetInnerHTML &&
            null !== n.dangerouslySetInnerHTML &&
            null != n.dangerouslySetInnerHTML.__html)
        );
      }
      const rl = "function" === typeof setTimeout ? setTimeout : void 0;
      const ll = "function" === typeof clearTimeout ? clearTimeout : void 0;
      const al = "function" === typeof Promise ? Promise : void 0;
      const ul =
          "function" === typeof queueMicrotask
            ? queueMicrotask
            : void 0 !== al
            ? (e) => al.resolve(null).then(e).catch(ol)
            : rl;
      function ol(e) {
        setTimeout(() => {
          throw e;
        });
      }
      function il(e, n) {
        let t = n;
        let r = 0;
        do {
          const l = t.nextSibling;
          if ((e.removeChild(t), l && 8 === l.nodeType))
            if ("/$" === (t = l.data)) {
              if (0 === r) return e.removeChild(l), void Wn(n);
              r--;
            } else ("$" !== t && "$?" !== t && "$!" !== t) || r++;
          t = l;
        } while (t);
        Wn(n);
      }
      function sl(e) {
        for (; null != e; e = e.nextSibling) {
          let n = e.nodeType;
          if (1 === n || 3 === n) break;
          if (8 === n) {
            if ("$" === (n = e.data) || "$!" === n || "$?" === n) break;
            if ("/$" === n) return null;
          }
        }
        return e;
      }
      function cl(e) {
        e = e.previousSibling;
        for (let n = 0; e; ) {
          if (8 === e.nodeType) {
            const t = e.data;
            if ("$" === t || "$!" === t || "$?" === t) {
              if (0 === n) return e;
              n--;
            } else "/$" === t && n++;
          }
          e = e.previousSibling;
        }
        return null;
      }
      const fl = Math.random().toString(36).slice(2);
      const dl = `__reactFiber$${fl}`;
      const pl = `__reactProps$${fl}`;
      const ml = `__reactContainer$${fl}`;
      const hl = `__reactEvents$${fl}`;
      const gl = `__reactListeners$${fl}`;
      const vl = `__reactHandles$${fl}`;
      function yl(e) {
        let n = e[dl];
        if (n) return n;
        for (let t = e.parentNode; t; ) {
          if ((n = t[ml] || t[dl])) {
            if (
              ((t = n.alternate),
              null !== n.child || (null !== t && null !== t.child))
            )
              for (e = cl(e); null !== e; ) {
                if ((t = e[dl])) return t;
                e = cl(e);
              }
            return n;
          }
          t = (e = t).parentNode;
        }
        return null;
      }
      function bl(e) {
        return !(e = e[dl] || e[ml]) ||
          (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
          ? null
          : e;
      }
      function kl(e) {
        if (5 === e.tag || 6 === e.tag) return e.stateNode;
        throw Error(a(33));
      }
      function wl(e) {
        return e[pl] || null;
      }
      const Sl = [];
      let xl = -1;
      function El(e) {
        return { current: e };
      }
      function Cl(e) {
        0 > xl || ((e.current = Sl[xl]), (Sl[xl] = null), xl--);
      }
      function _l(e, n) {
        xl++, (Sl[xl] = e.current), (e.current = n);
      }
      const zl = {};
      const Nl = El(zl);
      const Pl = El(!1);
      let Tl = zl;
      function Ll(e, n) {
        const t = e.type.contextTypes;
        if (!t) return zl;
        const r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === n)
          return r.__reactInternalMemoizedMaskedChildContext;
        let l;
        const a = {};
        for (l in t) a[l] = n[l];
        return (
          r &&
            (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
              n),
            (e.__reactInternalMemoizedMaskedChildContext = a)),
          a
        );
      }
      function Ml(e) {
        return null != (e = e.childContextTypes);
      }
      function Fl() {
        Cl(Pl), Cl(Nl);
      }
      function Dl(e, n, t) {
        if (Nl.current !== zl) throw Error(a(168));
        _l(Nl, n), _l(Pl, t);
      }
      function Rl(e, n, t) {
        let r = e.stateNode;
        if (((n = n.childContextTypes), "function" !== typeof r.getChildContext))
          return t;
        for (const l in (r = r.getChildContext()))
          if (!(l in n)) throw Error(a(108, W(e) || "Unknown", l));
        return I({}, t, r);
      }
      function Ol(e) {
        return (
          (e =
            ((e = e.stateNode) &&
              e.__reactInternalMemoizedMergedChildContext) ||
            zl),
          (Tl = Nl.current),
          _l(Nl, e),
          _l(Pl, Pl.current),
          !0
        );
      }
      function Il(e, n, t) {
        const r = e.stateNode;
        if (!r) throw Error(a(169));
        t
          ? ((e = Rl(e, n, Tl)),
            (r.__reactInternalMemoizedMergedChildContext = e),
            Cl(Pl),
            Cl(Nl),
            _l(Nl, e))
          : Cl(Pl),
          _l(Pl, t);
      }
      let Ul = null;
      let Vl = !1;
      let Al = !1;
      function Bl(e) {
        null === Ul ? (Ul = [e]) : Ul.push(e);
      }
      function Hl() {
        if (!Al && null !== Ul) {
          Al = !0;
          let e = 0;
          const n = kn;
          try {
            const t = Ul;
            for (kn = 1; e < t.length; e++) {
              let r = t[e];
              do {
                r = r(!0);
              } while (null !== r);
            }
            (Ul = null), (Vl = !1);
          } catch (n) {
            throw (null !== Ul && (Ul = Ul.slice(e + 1)), Ke(Je, Hl), n);
          } finally {
            (kn = n), (Al = !1);
          }
        }
        return null;
      }
      const Wl = [];
      let Ql = 0;
      let jl = null;
      let $l = 0;
      const Kl = [];
      let ql = 0;
      let Yl = null;
      let Xl = 1;
      let Gl = "";
      function Zl(e, n) {
        (Wl[Ql++] = $l), (Wl[Ql++] = jl), (jl = e), ($l = n);
      }
      function Jl(e, n, t) {
        (Kl[ql++] = Xl), (Kl[ql++] = Gl), (Kl[ql++] = Yl), (Yl = e);
        let r = Xl;
        e = Gl;
        let l = 32 - un(r) - 1;
        (r &= ~(1 << l)), (t += 1);
        let a = 32 - un(n) + l;
        if (30 < a) {
          const u = l - (l % 5);
          (a = (r & ((1 << u) - 1)).toString(32)),
            (r >>= u),
            (l -= u),
            (Xl = (1 << (32 - un(n) + l)) | (t << l) | r),
            (Gl = a + e);
        } else (Xl = (1 << a) | (t << l) | r), (Gl = e);
      }
      function ea(e) {
        null !== e.return && (Zl(e, 1), Jl(e, 1, 0));
      }
      function na(e) {
        while (e === jl)
          (jl = Wl[--Ql]), (Wl[Ql] = null), ($l = Wl[--Ql]), (Wl[Ql] = null);
        while (e === Yl)
          (Yl = Kl[--ql]),
            (Kl[ql] = null),
            (Gl = Kl[--ql]),
            (Kl[ql] = null),
            (Xl = Kl[--ql]),
            (Kl[ql] = null);
      }
      let ta = null;
      let ra = null;
      let la = !1;
      let aa = null;
      function ua(e, n) {
        const t = Ls(5, null, null, 0);
        (t.elementType = "DELETED"),
          (t.stateNode = n),
          (t.return = e),
          null === (n = e.deletions)
            ? ((e.deletions = [t]), (e.flags |= 16))
            : n.push(t);
      }
      function oa(e, n) {
        switch (e.tag) {
          case 5: {
            const t = e.type;
            return (
              null !==
                (n =
                  1 !== n.nodeType ||
                  t.toLowerCase() !== n.nodeName.toLowerCase()
                    ? null
                    : n) &&
              ((e.stateNode = n), (ta = e), (ra = sl(n.firstChild)), !0)
            );
          }
          case 6:
            return (
              null !==
                (n = "" === e.pendingProps || 3 !== n.nodeType ? null : n) &&
              ((e.stateNode = n), (ta = e), (ra = null), !0)
            );
          case 13:
            return (
              null !== (n = 8 !== n.nodeType ? null : n) &&
              ((t = null !== Yl ? { id: Xl, overflow: Gl } : null),
              (e.memoizedState = {
                dehydrated: n,
                treeContext: t,
                retryLane: 1073741824,
              }),
              ((t = Ls(18, null, null, 0)).stateNode = n),
              (t.return = e),
              (e.child = t),
              (ta = e),
              (ra = null),
              !0)
            );
          default:
            return !1;
        }
      }
      function ia(e) {
        return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
      }
      function sa(e) {
        if (la) {
          let n = ra;
          if (n) {
            const t = n;
            if (!oa(e, n)) {
              if (ia(e)) throw Error(a(418));
              n = sl(t.nextSibling);
              const r = ta;
              n && oa(e, n)
                ? ua(r, t)
                : ((e.flags = (-4097 & e.flags) | 2), (la = !1), (ta = e));
            }
          } else {
            if (ia(e)) throw Error(a(418));
            (e.flags = (-4097 & e.flags) | 2), (la = !1), (ta = e);
          }
        }
      }
      function ca(e) {
        for (
          e = e.return;
          null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

        )
          e = e.return;
        ta = e;
      }
      function fa(e) {
        if (e !== ta) return !1;
        if (!la) return ca(e), (la = !0), !1;
        let n;
        if (
          ((n = 3 !== e.tag) &&
            !(n = 5 !== e.tag) &&
            (n =
              "head" !== (n = e.type) &&
              "body" !== n &&
              !tl(e.type, e.memoizedProps)),
          n && (n = ra))
        ) {
          if (ia(e)) throw (da(), Error(a(418)));
          while (n) ua(e, n), (n = sl(n.nextSibling));
        }
        if ((ca(e), 13 === e.tag)) {
          if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
            throw Error(a(317));
          e: {
            for (e = e.nextSibling, n = 0; e; ) {
              if (8 === e.nodeType) {
                const t = e.data;
                if ("/$" === t) {
                  if (0 === n) {
                    ra = sl(e.nextSibling);
                    break e;
                  }
                  n--;
                } else ("$" !== t && "$!" !== t && "$?" !== t) || n++;
              }
              e = e.nextSibling;
            }
            ra = null;
          }
        } else ra = ta ? sl(e.stateNode.nextSibling) : null;
        return !0;
      }
      function da() {
        for (let e = ra; e; ) e = sl(e.nextSibling);
      }
      function pa() {
        (ra = ta = null), (la = !1);
      }
      function ma(e) {
        null === aa ? (aa = [e]) : aa.push(e);
      }
      const ha = k.ReactCurrentBatchConfig;
      function ga(e, n) {
        if (e?.defaultProps) {
          for (const t in ((n = I({}, n)), (e = e.defaultProps)))
            void 0 === n[t] && (n[t] = e[t]);
          return n;
        }
        return n;
      }
      const va = El(null);
      let ya = null;
      let ba = null;
      let ka = null;
      function wa() {
        ka = ba = ya = null;
      }
      function Sa(e) {
        const n = va.current;
        Cl(va), (e._currentValue = n);
      }
      function xa(e, n, t) {
        while (null !== e) {
          const r = e.alternate;
          if (
            ((e.childLanes & n) !== n
              ? ((e.childLanes |= n), null !== r && (r.childLanes |= n))
              : null !== r && (r.childLanes & n) !== n && (r.childLanes |= n),
            e === t)
          )
            break;
          e = e.return;
        }
      }
      function Ea(e, n) {
        (ya = e),
          (ka = ba = null),
          null !== (e = e.dependencies) &&
            null !== e.firstContext &&
            (0 !== (e.lanes & n) && (ko = !0), (e.firstContext = null));
      }
      function Ca(e) {
        const n = e._currentValue;
        if (ka !== e)
          if (
            ((e = { context: e, memoizedValue: n, next: null }), null === ba)
          ) {
            if (null === ya) throw Error(a(308));
            (ba = e), (ya.dependencies = { lanes: 0, firstContext: e });
          } else ba = ba.next = e;
        return n;
      }
      let _a = null;
      function za(e) {
        null === _a ? (_a = [e]) : _a.push(e);
      }
      function Na(e, n, t, r) {
        const l = n.interleaved;
        return (
          null === l
            ? ((t.next = t), za(n))
            : ((t.next = l.next), (l.next = t)),
          (n.interleaved = t),
          Pa(e, r)
        );
      }
      function Pa(e, n) {
        e.lanes |= n;
        let t = e.alternate;
        for (null !== t && (t.lanes |= n), t = e, e = e.return; null !== e; )
          (e.childLanes |= n),
            null !== (t = e.alternate) && (t.childLanes |= n),
            (t = e),
            (e = e.return);
        return 3 === t.tag ? t.stateNode : null;
      }
      let Ta = !1;
      function La(e) {
        e.updateQueue = {
          baseState: e.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, interleaved: null, lanes: 0 },
          effects: null,
        };
      }
      function Ma(e, n) {
        (e = e.updateQueue),
          n.updateQueue === e &&
            (n.updateQueue = {
              baseState: e.baseState,
              firstBaseUpdate: e.firstBaseUpdate,
              lastBaseUpdate: e.lastBaseUpdate,
              shared: e.shared,
              effects: e.effects,
            });
      }
      function Fa(e, n) {
        return {
          eventTime: e,
          lane: n,
          tag: 0,
          payload: null,
          callback: null,
          next: null,
        };
      }
      function Da(e, n, t) {
        let r = e.updateQueue;
        if (null === r) return null;
        if (((r = r.shared), 0 !== (2 & Ni))) {
          const l = r.pending;
          return (
            null === l ? (n.next = n) : ((n.next = l.next), (l.next = n)),
            (r.pending = n),
            Pa(e, t)
          );
        }
        return (
          null === (l = r.interleaved)
            ? ((n.next = n), za(r))
            : ((n.next = l.next), (l.next = n)),
          (r.interleaved = n),
          Pa(e, t)
        );
      }
      function Ra(e, n, t) {
        if (
          null !== (n = n.updateQueue) &&
          ((n = n.shared), 0 !== (4194240 & t))
        ) {
          let r = n.lanes;
          (t |= r &= e.pendingLanes), (n.lanes = t), bn(e, t);
        }
      }
      function Oa(e, n) {
        let t = e.updateQueue;
        let r = e.alternate;
        if (null !== r && t === (r = r.updateQueue)) {
          let l = null;
          let a = null;
          if (null !== (t = t.firstBaseUpdate)) {
            do {
              const u = {
                eventTime: t.eventTime,
                lane: t.lane,
                tag: t.tag,
                payload: t.payload,
                callback: t.callback,
                next: null,
              };
              null === a ? (l = a = u) : (a = a.next = u), (t = t.next);
            } while (null !== t);
            null === a ? (l = a = n) : (a = a.next = n);
          } else l = a = n;
          return (
            (t = {
              baseState: r.baseState,
              firstBaseUpdate: l,
              lastBaseUpdate: a,
              shared: r.shared,
              effects: r.effects,
            }),
            void (e.updateQueue = t)
          );
        }
        null === (e = t.lastBaseUpdate)
          ? (t.firstBaseUpdate = n)
          : (e.next = n),
          (t.lastBaseUpdate = n);
      }
      function Ia(e, n, t, r) {
        let l = e.updateQueue;
        Ta = !1;
        let a = l.firstBaseUpdate;
        let u = l.lastBaseUpdate;
        let o = l.shared.pending;
        if (null !== o) {
          l.shared.pending = null;
          const i = o;
          const s = i.next;
          (i.next = null), null === u ? (a = s) : (u.next = s), (u = i);
          let c = e.alternate;
          null !== c &&
            (o = (c = c.updateQueue).lastBaseUpdate) !== u &&
            (null === o ? (c.firstBaseUpdate = s) : (o.next = s),
            (c.lastBaseUpdate = i));
        }
        if (null !== a) {
          let f = l.baseState;
          for (u = 0, c = s = i = null, o = a; ; ) {
            let d = o.lane;
            let p = o.eventTime;
            if ((r & d) === d) {
              null !== c &&
                (c = c.next =
                  {
                    eventTime: p,
                    lane: 0,
                    tag: o.tag,
                    payload: o.payload,
                    callback: o.callback,
                    next: null,
                  });
              e: {
                let m = e;
                const h = o;
                switch (((d = n), (p = t), h.tag)) {
                  case 1:
                    if ("function" === typeof (m = h.payload)) {
                      f = m.call(p, f, d);
                      break e;
                    }
                    f = m;
                    break e;
                  case 3:
                    m.flags = (-65537 & m.flags) | 128;
                  case 0:
                    if (
                      null ==
                      (d =
                        "function" === typeof (m = h.payload)
                          ? m.call(p, f, d)
                          : m)
                    )
                      break e;
                    f = I({}, f, d);
                    break e;
                  case 2:
                    Ta = !0;
                }
              }
              null !== o.callback &&
                0 !== o.lane &&
                ((e.flags |= 64),
                null === (d = l.effects) ? (l.effects = [o]) : d.push(o));
            } else
              (p = {
                eventTime: p,
                lane: d,
                tag: o.tag,
                payload: o.payload,
                callback: o.callback,
                next: null,
              }),
                null === c ? ((s = c = p), (i = f)) : (c = c.next = p),
                (u |= d);
            if (null === (o = o.next)) {
              if (null === (o = l.shared.pending)) break;
              (o = (d = o).next),
                (d.next = null),
                (l.lastBaseUpdate = d),
                (l.shared.pending = null);
            }
          }
          if (
            (null === c && (i = f),
            (l.baseState = i),
            (l.firstBaseUpdate = s),
            (l.lastBaseUpdate = c),
            null !== (n = l.shared.interleaved))
          ) {
            l = n;
            do {
              (u |= l.lane), (l = l.next);
            } while (l !== n);
          } else null === a && (l.shared.lanes = 0);
          (Oi |= u), (e.lanes = u), (e.memoizedState = f);
        }
      }
      function Ua(e, n, t) {
        if (((e = n.effects), (n.effects = null), null !== e))
          for (n = 0; n < e.length; n++) {
            let r = e[n];
            const l = r.callback;
            if (null !== l) {
              if (((r.callback = null), (r = t), "function" !== typeof l))
                throw Error(a(191, l));
              l.call(r);
            }
          }
      }
      const Va = new r.Component().refs;
      function Aa(e, n, t, r) {
        (t = null == (t = t(r, (n = e.memoizedState))) ? n : I({}, n, t)),
          (e.memoizedState = t),
          0 === e.lanes && (e.updateQueue.baseState = t);
      }
      const Ba = {
        isMounted: (e) => !!(e = e._reactInternals) && He(e) === e,
        enqueueSetState: (e, n, t) => {
          e = e._reactInternals;
          const r = es();
          const l = ns(e);
          const a = Fa(r, l);
          (a.payload = n),
            null != t && (a.callback = t),
            null !== (n = Da(e, a, l)) && (ts(n, e, l, r), Ra(n, e, l));
        },
        enqueueReplaceState: (e, n, t) => {
          e = e._reactInternals;
          const r = es();
          const l = ns(e);
          const a = Fa(r, l);
          (a.tag = 1),
            (a.payload = n),
            null != t && (a.callback = t),
            null !== (n = Da(e, a, l)) && (ts(n, e, l, r), Ra(n, e, l));
        },
        enqueueForceUpdate: (e, n) => {
          e = e._reactInternals;
          const t = es();
          const r = ns(e);
          const l = Fa(t, r);
          (l.tag = 2),
            null != n && (l.callback = n),
            null !== (n = Da(e, l, r)) && (ts(n, e, r, t), Ra(n, e, r));
        },
      };
      function Ha(e, n, t, r, l, a, u) {
        return "function" === typeof (e = e.stateNode).shouldComponentUpdate
          ? e.shouldComponentUpdate(r, a, u)
          : !n.prototype ||
              !n.prototype.isPureReactComponent ||
              !ir(t, r) ||
              !ir(l, a);
      }
      function Wa(e, n, t) {
        let r = !1;
        let l = zl;
        let a = n.contextType;
        return (
          "object" === typeof a && null !== a
            ? (a = Ca(a))
            : ((l = Ml(n) ? Tl : Nl.current),
              (a = (r = null != (r = n.contextTypes)) ? Ll(e, l) : zl)),
          (n = new n(t, a)),
          (e.memoizedState =
            null !== n.state && void 0 !== n.state ? n.state : null),
          (n.updater = Ba),
          (e.stateNode = n),
          (n._reactInternals = e),
          r &&
            (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
              l),
            (e.__reactInternalMemoizedMaskedChildContext = a)),
          n
        );
      }
      function Qa(e, n, t, r) {
        (e = n.state),
          "function" === typeof n.componentWillReceiveProps &&
            n.componentWillReceiveProps(t, r),
          "function" === typeof n.UNSAFE_componentWillReceiveProps &&
            n.UNSAFE_componentWillReceiveProps(t, r),
          n.state !== e && Ba.enqueueReplaceState(n, n.state, null);
      }
      function ja(e, n, t, r) {
        const l = e.stateNode;
        (l.props = t), (l.state = e.memoizedState), (l.refs = Va), La(e);
        let a = n.contextType;
        "object" === typeof a && null !== a
          ? (l.context = Ca(a))
          : ((a = Ml(n) ? Tl : Nl.current), (l.context = Ll(e, a))),
          (l.state = e.memoizedState),
          "function" === typeof (a = n.getDerivedStateFromProps) &&
            (Aa(e, n, a, t), (l.state = e.memoizedState)),
          "function" === typeof n.getDerivedStateFromProps ||
            "function" === typeof l.getSnapshotBeforeUpdate ||
            ("function" !== typeof l.UNSAFE_componentWillMount &&
              "function" !== typeof l.componentWillMount) ||
            ((n = l.state),
            "function" === typeof l.componentWillMount && l.componentWillMount(),
            "function" === typeof l.UNSAFE_componentWillMount &&
              l.UNSAFE_componentWillMount(),
            n !== l.state && Ba.enqueueReplaceState(l, l.state, null),
            Ia(e, t, l, r),
            (l.state = e.memoizedState)),
          "function" === typeof l.componentDidMount && (e.flags |= 4194308);
      }
      function $a(e, n, t) {
        if (
          null !== (e = t.ref) &&
          "function" !== typeof e &&
          "object" !== typeof e
        ) {
          if (t._owner) {
            if ((t = t._owner)) {
              if (1 !== t.tag) throw Error(a(309));
              const r = t.stateNode;
            }
            if (!r) throw Error(a(147, e));
            const l = r;
            const u = `${e}`;
            return null !== n &&
              null !== n.ref &&
              "function" === typeof n.ref &&
              n.ref._stringRef === u
              ? n.ref
              : ((n = (e) => {
                  let n = l.refs;
                  n === Va && (n = l.refs = {}),
                    null === e ? delete n[u] : (n[u] = e);
                }),
                (n._stringRef = u),
                n);
          }
          if ("string" !== typeof e) throw Error(a(284));
          if (!t._owner) throw Error(a(290, e));
        }
        return e;
      }
      function Ka(e, n) {
        throw (
          ((e = Object.prototype.toString.call(n)),
          Error(
            a(
              31,
              "[object Object]" === e
                ? `object with keys {${Object.keys(n).join(", ")}}`
                : e,
            ),
          ))
        );
      }
      function qa(e) {
        return (0, e._init)(e._payload);
      }
      function Ya(e) {
        function n(n, t) {
          if (e) {
            const r = n.deletions;
            null === r ? ((n.deletions = [t]), (n.flags |= 16)) : r.push(t);
          }
        }
        function t(t, r) {
          if (!e) return null;
          while (null !== r) n(t, r), (r = r.sibling);
          return null;
        }
        function r(e, n) {
          for (e = new Map(); null !== n; )
            null !== n.key ? e.set(n.key, n) : e.set(n.index, n),
              (n = n.sibling);
          return e;
        }
        function l(e, n) {
          return ((e = Fs(e, n)).index = 0), (e.sibling = null), e;
        }
        function u(n, t, r) {
          return (
            (n.index = r),
            e
              ? null !== (r = n.alternate)
                ? (r = r.index) < t
                  ? ((n.flags |= 2), t)
                  : r
                : ((n.flags |= 2), t)
              : ((n.flags |= 1048576), t)
          );
        }
        function o(n) {
          return e && null === n.alternate && (n.flags |= 2), n;
        }
        function i(e, n, t, r) {
          return null === n || 6 !== n.tag
            ? (((n = Is(t, e.mode, r)).return = e), n)
            : (((n = l(n, t)).return = e), n);
        }
        function s(e, n, t, r) {
          const a = t.type;
          return a === x
            ? f(e, n, t.props.children, r, t.key)
            : null !== n &&
              (n.elementType === a ||
                ("object" === typeof a &&
                  null !== a &&
                  a.$$typeof === M &&
                  qa(a) === n.type))
            ? (((r = l(n, t.props)).ref = $a(e, n, t)), (r.return = e), r)
            : (((r = Ds(t.type, t.key, t.props, null, e.mode, r)).ref = $a(
                e,
                n,
                t,
              )),
              (r.return = e),
              r);
        }
        function c(e, n, t, r) {
          return null === n ||
            4 !== n.tag ||
            n.stateNode.containerInfo !== t.containerInfo ||
            n.stateNode.implementation !== t.implementation
            ? (((n = Us(t, e.mode, r)).return = e), n)
            : (((n = l(n, t.children || [])).return = e), n);
        }
        function f(e, n, t, r, a) {
          return null === n || 7 !== n.tag
            ? (((n = Rs(t, e.mode, r, a)).return = e), n)
            : (((n = l(n, t)).return = e), n);
        }
        function d(e, n, t) {
          if (("string" === typeof n && "" !== n) || "number" === typeof n)
            return ((n = Is(`${n}`, e.mode, t)).return = e), n;
          if ("object" === typeof n && null !== n) {
            switch (n.$$typeof) {
              case w:
                return (
                  ((t = Ds(n.type, n.key, n.props, null, e.mode, t)).ref = $a(
                    e,
                    null,
                    n,
                  )),
                  (t.return = e),
                  t
                );
              case S:
                return ((n = Us(n, e.mode, t)).return = e), n;
              case M:
                return d(e, (0, n._init)(n._payload), t);
            }
            if (ne(n) || R(n))
              return ((n = Rs(n, e.mode, t, null)).return = e), n;
            Ka(e, n);
          }
          return null;
        }
        function p(e, n, t, r) {
          let l = null !== n ? n.key : null;
          if (("string" === typeof t && "" !== t) || "number" === typeof t)
            return null !== l ? null : i(e, n, `${t}`, r);
          if ("object" === typeof t && null !== t) {
            switch (t.$$typeof) {
              case w:
                return t.key === l ? s(e, n, t, r) : null;
              case S:
                return t.key === l ? c(e, n, t, r) : null;
              case M:
                return p(e, n, (l = t._init)(t._payload), r);
            }
            if (ne(t) || R(t)) return null !== l ? null : f(e, n, t, r, null);
            Ka(e, t);
          }
          return null;
        }
        function m(e, n, t, r, l) {
          if (("string" === typeof r && "" !== r) || "number" === typeof r)
            return i(n, (e = e.get(t) || null), `${r}`, l);
          if ("object" === typeof r && null !== r) {
            switch (r.$$typeof) {
              case w:
                return s(
                  n,
                  (e = e.get(null === r.key ? t : r.key) || null),
                  r,
                  l,
                );
              case S:
                return c(
                  n,
                  (e = e.get(null === r.key ? t : r.key) || null),
                  r,
                  l,
                );
              case M:
                return m(e, n, t, (0, r._init)(r._payload), l);
            }
            if (ne(r) || R(r)) return f(n, (e = e.get(t) || null), r, l, null);
            Ka(n, r);
          }
          return null;
        }
        function h(l, a, o, i) {
          for (
            let s = null, c = null, f = a, h = (a = 0), g = null;
            null !== f && h < o.length;
            h++
          ) {
            f.index > h ? ((g = f), (f = null)) : (g = f.sibling);
            const v = p(l, f, o[h], i);
            if (null === v) {
              null === f && (f = g);
              break;
            }
            e && f && null === v.alternate && n(l, f),
              (a = u(v, a, h)),
              null === c ? (s = v) : (c.sibling = v),
              (c = v),
              (f = g);
          }
          if (h === o.length) return t(l, f), la && Zl(l, h), s;
          if (null === f) {
            for (; h < o.length; h++)
              null !== (f = d(l, o[h], i)) &&
                ((a = u(f, a, h)),
                null === c ? (s = f) : (c.sibling = f),
                (c = f));
            return la && Zl(l, h), s;
          }
          for (f = r(l, f); h < o.length; h++)
            null !== (g = m(f, l, h, o[h], i)) &&
              (e &&
                null !== g.alternate &&
                f.delete(null === g.key ? h : g.key),
              (a = u(g, a, h)),
              null === c ? (s = g) : (c.sibling = g),
              (c = g));
          return (
            e &&
              f.forEach((e) => n(l, e)),
            la && Zl(l, h),
            s
          );
        }
        function g(l, o, i, s) {
          let c = R(i);
          if ("function" !== typeof c) throw Error(a(150));
          if (null == (i = c.call(i))) throw Error(a(151));
          for (
            let f = (c = null), h = o, g = (o = 0), v = null, y = i.next();
            null !== h && !y.done;
            g++, y = i.next()
          ) {
            h.index > g ? ((v = h), (h = null)) : (v = h.sibling);
            const b = p(l, h, y.value, s);
            if (null === b) {
              null === h && (h = v);
              break;
            }
            e && h && null === b.alternate && n(l, h),
              (o = u(b, o, g)),
              null === f ? (c = b) : (f.sibling = b),
              (f = b),
              (h = v);
          }
          if (y.done) return t(l, h), la && Zl(l, g), c;
          if (null === h) {
            for (; !y.done; g++, y = i.next())
              null !== (y = d(l, y.value, s)) &&
                ((o = u(y, o, g)),
                null === f ? (c = y) : (f.sibling = y),
                (f = y));
            return la && Zl(l, g), c;
          }
          for (h = r(l, h); !y.done; g++, y = i.next())
            null !== (y = m(h, l, g, y.value, s)) &&
              (e &&
                null !== y.alternate &&
                h.delete(null === y.key ? g : y.key),
              (o = u(y, o, g)),
              null === f ? (c = y) : (f.sibling = y),
              (f = y));
          return (
            e &&
              h.forEach((e) => n(l, e)),
            la && Zl(l, g),
            c
          );
        }
        return function e(r, a, u, i) {
          if (
            ("object" === typeof u &&
              null !== u &&
              u.type === x &&
              null === u.key &&
              (u = u.props.children),
            "object" === typeof u && null !== u)
          ) {
            switch (u.$$typeof) {
              case w:
                e: {
                  for (let s = u.key, c = a; null !== c; ) {
                    if (c.key === s) {
                      if ((s = u.type) === x) {
                        if (7 === c.tag) {
                          t(r, c.sibling),
                            ((a = l(c, u.props.children)).return = r),
                            (r = a);
                          break e;
                        }
                      } else if (
                        c.elementType === s ||
                        ("object" === typeof s &&
                          null !== s &&
                          s.$$typeof === M &&
                          qa(s) === c.type)
                      ) {
                        t(r, c.sibling),
                          ((a = l(c, u.props)).ref = $a(r, c, u)),
                          (a.return = r),
                          (r = a);
                        break e;
                      }
                      t(r, c);
                      break;
                    }
                    n(r, c), (c = c.sibling);
                  }
                  u.type === x
                    ? (((a = Rs(u.props.children, r.mode, i, u.key)).return =
                        r),
                      (r = a))
                    : (((i = Ds(u.type, u.key, u.props, null, r.mode, i)).ref =
                        $a(r, a, u)),
                      (i.return = r),
                      (r = i));
                }
                return o(r);
              case S:
                e: {
                  for (c = u.key; null !== a; ) {
                    if (a.key === c) {
                      if (
                        4 === a.tag &&
                        a.stateNode.containerInfo === u.containerInfo &&
                        a.stateNode.implementation === u.implementation
                      ) {
                        t(r, a.sibling),
                          ((a = l(a, u.children || [])).return = r),
                          (r = a);
                        break e;
                      }
                      t(r, a);
                      break;
                    }
                    n(r, a), (a = a.sibling);
                  }
                  ((a = Us(u, r.mode, i)).return = r), (r = a);
                }
                return o(r);
              case M:
                return e(r, a, (c = u._init)(u._payload), i);
            }
            if (ne(u)) return h(r, a, u, i);
            if (R(u)) return g(r, a, u, i);
            Ka(r, u);
          }
          return ("string" === typeof u && "" !== u) || "number" === typeof u
            ? ((u = `${u}`),
              null !== a && 6 === a.tag
                ? (t(r, a.sibling), ((a = l(a, u)).return = r), (r = a))
                : (t(r, a), ((a = Is(u, r.mode, i)).return = r), (r = a)),
              o(r))
            : t(r, a);
        };
      }
      const Xa = Ya(!0);
      const Ga = Ya(!1);
      const Za = {};
      const Ja = El(Za);
      const eu = El(Za);
      const nu = El(Za);
      function tu(e) {
        if (e === Za) throw Error(a(174));
        return e;
      }
      function ru(e, n) {
        switch ((_l(nu, n), _l(eu, e), _l(Ja, Za), (e = n.nodeType))) {
          case 9:
          case 11:
            n = (n = n.documentElement) ? n.namespaceURI : ie(null, "");
            break;
          default:
            n = ie(
              (n = (e = 8 === e ? n.parentNode : n).namespaceURI || null),
              (e = e.tagName),
            );
        }
        Cl(Ja), _l(Ja, n);
      }
      function lu() {
        Cl(Ja), Cl(eu), Cl(nu);
      }
      function au(e) {
        tu(nu.current);
        const n = tu(Ja.current);
        const t = ie(n, e.type);
        n !== t && (_l(eu, e), _l(Ja, t));
      }
      function uu(e) {
        eu.current === e && (Cl(Ja), Cl(eu));
      }
      const ou = El(0);
      function iu(e) {
        for (let n = e; null !== n; ) {
          if (13 === n.tag) {
            let t = n.memoizedState;
            if (
              null !== t &&
              (null === (t = t.dehydrated) ||
                "$?" === t.data ||
                "$!" === t.data)
            )
              return n;
          } else if (19 === n.tag && void 0 !== n.memoizedProps.revealOrder) {
            if (0 !== (128 & n.flags)) return n;
          } else if (null !== n.child) {
            (n.child.return = n), (n = n.child);
            continue;
          }
          if (n === e) break;
          while (null === n.sibling) {
            if (null === n.return || n.return === e) return null;
            n = n.return;
          }
          (n.sibling.return = n.return), (n = n.sibling);
        }
        return null;
      }
      const su = [];
      function cu() {
        for (let e = 0; e < su.length; e++)
          su[e]._workInProgressVersionPrimary = null;
        su.length = 0;
      }
      const fu = k.ReactCurrentDispatcher;
      const du = k.ReactCurrentBatchConfig;
      let pu = 0;
      let mu = null;
      let hu = null;
      let gu = null;
      let vu = !1;
      let yu = !1;
      let bu = 0;
      let ku = 0;
      function wu() {
        throw Error(a(321));
      }
      function Su(e, n) {
        if (null === n) return !1;
        for (let t = 0; t < n.length && t < e.length; t++)
          if (!or(e[t], n[t])) return !1;
        return !0;
      }
      function xu(e, n, t, r, l, u) {
        if (
          ((pu = u),
          (mu = n),
          (n.memoizedState = null),
          (n.updateQueue = null),
          (n.lanes = 0),
          (fu.current = null === e || null === e.memoizedState ? uo : oo),
          (e = t(r, l)),
          yu)
        ) {
          u = 0;
          do {
            if (((yu = !1), (bu = 0), 25 <= u)) throw Error(a(301));
            (u += 1),
              (gu = hu = null),
              (n.updateQueue = null),
              (fu.current = io),
              (e = t(r, l));
          } while (yu);
        }
        if (
          ((fu.current = ao),
          (n = null !== hu && null !== hu.next),
          (pu = 0),
          (gu = hu = mu = null),
          (vu = !1),
          n)
        )
          throw Error(a(300));
        return e;
      }
      function Eu() {
        const e = 0 !== bu;
        return (bu = 0), e;
      }
      function Cu() {
        const e = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null,
        };
        return (
          null === gu ? (mu.memoizedState = gu = e) : (gu = gu.next = e), gu
        );
      }
      function _u() {
        if (null === hu) {
          let e = mu.alternate;
          e = null !== e ? e.memoizedState : null;
        } else e = hu.next;
        const n = null === gu ? mu.memoizedState : gu.next;
        if (null !== n) (gu = n), (hu = e);
        else {
          if (null === e) throw Error(a(310));
          (e = {
            memoizedState: (hu = e).memoizedState,
            baseState: hu.baseState,
            baseQueue: hu.baseQueue,
            queue: hu.queue,
            next: null,
          }),
            null === gu ? (mu.memoizedState = gu = e) : (gu = gu.next = e);
        }
        return gu;
      }
      function zu(e, n) {
        return "function" === typeof n ? n(e) : n;
      }
      function Nu(e) {
        const n = _u();
        const t = n.queue;
        if (null === t) throw Error(a(311));
        t.lastRenderedReducer = e;
        let r = hu;
        let l = r.baseQueue;
        let u = t.pending;
        if (null !== u) {
          if (null !== l) {
            const o = l.next;
            (l.next = u.next), (u.next = o);
          }
          (r.baseQueue = l = u), (t.pending = null);
        }
        if (null !== l) {
          (u = l.next), (r = r.baseState);
          let i = (o = null);
          let s = null;
          let c = u;
          do {
            const f = c.lane;
            if ((pu & f) === f)
              null !== s &&
                (s = s.next =
                  {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null,
                  }),
                (r = c.hasEagerState ? c.eagerState : e(r, c.action));
            else {
              const d = {
                lane: f,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null,
              };
              null === s ? ((i = s = d), (o = r)) : (s = s.next = d),
                (mu.lanes |= f),
                (Oi |= f);
            }
            c = c.next;
          } while (null !== c && c !== u);
          null === s ? (o = r) : (s.next = i),
            or(r, n.memoizedState) || (ko = !0),
            (n.memoizedState = r),
            (n.baseState = o),
            (n.baseQueue = s),
            (t.lastRenderedState = r);
        }
        if (null !== (e = t.interleaved)) {
          l = e;
          do {
            (u = l.lane), (mu.lanes |= u), (Oi |= u), (l = l.next);
          } while (l !== e);
        } else null === l && (t.lanes = 0);
        return [n.memoizedState, t.dispatch];
      }
      function Pu(e) {
        const n = _u();
        const t = n.queue;
        if (null === t) throw Error(a(311));
        t.lastRenderedReducer = e;
        const r = t.dispatch;
        let l = t.pending;
        let u = n.memoizedState;
        if (null !== l) {
          t.pending = null;
          let o = (l = l.next);
          do {
            (u = e(u, o.action)), (o = o.next);
          } while (o !== l);
          or(u, n.memoizedState) || (ko = !0),
            (n.memoizedState = u),
            null === n.baseQueue && (n.baseState = u),
            (t.lastRenderedState = u);
        }
        return [u, r];
      }
      function Tu() {}
      function Lu(e, n) {
        const t = mu;
        let r = _u();
        const l = n();
        const u = !or(r.memoizedState, l);
        if (
          (u && ((r.memoizedState = l), (ko = !0)),
          (r = r.queue),
          Wu(Du.bind(null, t, r, e), [e]),
          r.getSnapshot !== n || u || (null !== gu && 1 & gu.memoizedState.tag))
        ) {
          if (
            ((t.flags |= 2048),
            Uu(9, Fu.bind(null, t, r, l, n), void 0, null),
            null === Pi)
          )
            throw Error(a(349));
          0 !== (30 & pu) || Mu(t, n, l);
        }
        return l;
      }
      function Mu(e, n, t) {
        (e.flags |= 16384),
          (e = { getSnapshot: n, value: t }),
          null === (n = mu.updateQueue)
            ? ((n = { lastEffect: null, stores: null }),
              (mu.updateQueue = n),
              (n.stores = [e]))
            : null === (t = n.stores)
            ? (n.stores = [e])
            : t.push(e);
      }
      function Fu(e, n, t, r) {
        (n.value = t), (n.getSnapshot = r), Ru(n) && Ou(e);
      }
      function Du(e, n, t) {
        return t(() => {
          Ru(n) && Ou(e);
        });
      }
      function Ru(e) {
        const n = e.getSnapshot;
        e = e.value;
        try {
          const t = n();
          return !or(e, t);
        } catch (e) {
          return !0;
        }
      }
      function Ou(e) {
        const n = Pa(e, 1);
        null !== n && ts(n, e, 1, -1);
      }
      function Iu(e) {
        const n = Cu();
        return (
          "function" === typeof e && (e = e()),
          (n.memoizedState = n.baseState = e),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: zu,
            lastRenderedState: e,
          }),
          (n.queue = e),
          (e = e.dispatch = no.bind(null, mu, e)),
          [n.memoizedState, e]
        );
      }
      function Uu(e, n, t, r) {
        return (
          (e = { tag: e, create: n, destroy: t, deps: r, next: null }),
          null === (n = mu.updateQueue)
            ? ((n = { lastEffect: null, stores: null }),
              (mu.updateQueue = n),
              (n.lastEffect = e.next = e))
            : null === (t = n.lastEffect)
            ? (n.lastEffect = e.next = e)
            : ((r = t.next), (t.next = e), (e.next = r), (n.lastEffect = e)),
          e
        );
      }
      function Vu() {
        return _u().memoizedState;
      }
      function Au(e, n, t, r) {
        const l = Cu();
        (mu.flags |= e),
          (l.memoizedState = Uu(1 | n, t, void 0, void 0 === r ? null : r));
      }
      function Bu(e, n, t, r) {
        const l = _u();
        r = void 0 === r ? null : r;
        let a = void 0;
        if (null !== hu) {
          const u = hu.memoizedState;
          if (((a = u.destroy), null !== r && Su(r, u.deps)))
            return void (l.memoizedState = Uu(n, t, a, r));
        }
        (mu.flags |= e), (l.memoizedState = Uu(1 | n, t, a, r));
      }
      function Hu(e, n) {
        return Au(8390656, 8, e, n);
      }
      function Wu(e, n) {
        return Bu(2048, 8, e, n);
      }
      function Qu(e, n) {
        return Bu(4, 2, e, n);
      }
      function ju(e, n) {
        return Bu(4, 4, e, n);
      }
      function $u(e, n) {
        return "function" === typeof n
          ? ((e = e()),
            n(e),
            () => {
              n(null);
            })
          : null != n
          ? ((e = e()),
            (n.current = e),
            () => {
              n.current = null;
            })
          : void 0;
      }
      function Ku(e, n, t) {
        return (
          (t = null != t ? t.concat([e]) : null),
          Bu(4, 4, $u.bind(null, n, e), t)
        );
      }
      function qu() {}
      function Yu(e, n) {
        const t = _u();
        n = void 0 === n ? null : n;
        const r = t.memoizedState;
        return null !== r && null !== n && Su(n, r[1])
          ? r[0]
          : ((t.memoizedState = [e, n]), e);
      }
      function Xu(e, n) {
        const t = _u();
        n = void 0 === n ? null : n;
        const r = t.memoizedState;
        return null !== r && null !== n && Su(n, r[1])
          ? r[0]
          : ((e = e()), (t.memoizedState = [e, n]), e);
      }
      function Gu(e, n, t) {
        return 0 === (21 & pu)
          ? (e.baseState && ((e.baseState = !1), (ko = !0)),
            (e.memoizedState = t))
          : (or(t, n) ||
              ((t = gn()), (mu.lanes |= t), (Oi |= t), (e.baseState = !0)),
            n);
      }
      function Zu(e, n) {
        const t = kn;
        (kn = 0 !== t && 4 > t ? t : 4), e(!0);
        const r = du.transition;
        du.transition = {};
        try {
          e(!1), n();
        } finally {
          (kn = t), (du.transition = r);
        }
      }
      function Ju() {
        return _u().memoizedState;
      }
      function eo(e, n, t) {
        const r = ns(e);
        if (
          ((t = {
            lane: r,
            action: t,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          }),
          to(e))
        )
          ro(n, t);
        else if (null !== (t = Na(e, n, t, r))) {
          ts(t, e, r, es()), lo(t, n, r);
        }
      }
      function no(e, n, t) {
        const r = ns(e);
        let l = {
            lane: r,
            action: t,
            hasEagerState: !1,
            eagerState: null,
            next: null,
          };
        if (to(e)) ro(n, l);
        else {
          let a = e.alternate;
          if (
            0 === e.lanes &&
            (null === a || 0 === a.lanes) &&
            null !== (a = n.lastRenderedReducer)
          )
            try {
              const u = n.lastRenderedState;
              const o = a(u, t);
              if (((l.hasEagerState = !0), (l.eagerState = o), or(o, u))) {
                const i = n.interleaved;
                return (
                  null === i
                    ? ((l.next = l), za(n))
                    : ((l.next = i.next), (i.next = l)),
                  void (n.interleaved = l)
                );
              }
            } catch (e) {}
          null !== (t = Na(e, n, l, r)) &&
            (ts(t, e, r, (l = es())), lo(t, n, r));
        }
      }
      function to(e) {
        const n = e.alternate;
        return e === mu || (null !== n && n === mu);
      }
      function ro(e, n) {
        yu = vu = !0;
        const t = e.pending;
        null === t ? (n.next = n) : ((n.next = t.next), (t.next = n)),
          (e.pending = n);
      }
      function lo(e, n, t) {
        if (0 !== (4194240 & t)) {
          let r = n.lanes;
          (t |= r &= e.pendingLanes), (n.lanes = t), bn(e, t);
        }
      }
      const ao = {
          readContext: Ca,
          useCallback: wu,
          useContext: wu,
          useEffect: wu,
          useImperativeHandle: wu,
          useInsertionEffect: wu,
          useLayoutEffect: wu,
          useMemo: wu,
          useReducer: wu,
          useRef: wu,
          useState: wu,
          useDebugValue: wu,
          useDeferredValue: wu,
          useTransition: wu,
          useMutableSource: wu,
          useSyncExternalStore: wu,
          useId: wu,
          unstable_isNewReconciler: !1,
        };
      const uo = {
          readContext: Ca,
          useCallback: (e, n) => (Cu().memoizedState = [e, void 0 === n ? null : n]), e,
          useContext: Ca,
          useEffect: Hu,
          useImperativeHandle: (e, n, t) => (
              (t = null != t ? t.concat([e]) : null),
              Au(4194308, 4, $u.bind(null, n, e), t)
            ),
          useLayoutEffect: (e, n) => Au(4194308, 4, e, n),
          useInsertionEffect: (e, n) => Au(4, 2, e, n),
          useMemo: (e, n) => {
            const t = Cu();
            return (
              (n = void 0 === n ? null : n),
              (e = e()),
              (t.memoizedState = [e, n]),
              e
            );
          },
          useReducer: (e, n, t) => {
            const r = Cu();
            return (
              (n = void 0 !== t ? t(n) : n),
              (r.memoizedState = r.baseState = n),
              (e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: n,
              }),
              (r.queue = e),
              (e = e.dispatch = eo.bind(null, mu, e)),
              [r.memoizedState, e]
            );
          },
          useRef: (e) => (e = { current: e }), (Cu().memoizedState = e),
          useState: Iu,
          useDebugValue: qu,
          useDeferredValue: (e) => (Cu().memoizedState = e),
          useTransition: () => {
            let e = Iu(!1);
            const n = e[0];
            return (e = Zu.bind(null, e[1])), (Cu().memoizedState = e), [n, e];
          },
          useMutableSource: () => {},
          useSyncExternalStore: (e, n, t) => {
            const r = mu;
            const l = Cu();
            if (la) {
              if (void 0 === t) throw Error(a(407));
              t = t();
            } else {
              if (((t = n()), null === Pi)) throw Error(a(349));
              0 !== (30 & pu) || Mu(r, n, t);
            }
            l.memoizedState = t;
            const u = { value: t, getSnapshot: n };
            return (
              (l.queue = u),
              Hu(Du.bind(null, r, u, e), [e]),
              (r.flags |= 2048),
              Uu(9, Fu.bind(null, r, u, t, n), void 0, null),
              t
            );
          },
          useId: () => {
            const e = Cu();
            let n = Pi.identifierPrefix;
            if (la) {
              let t = Gl;
              (n =
                `:${n}R${t = (Xl & ~(1 << (32 - un(Xl) - 1))).toString(32) + t}`),
                0 < (t = bu++) && (n += `H${t.toString(32)}`),
                (n += ":");
            } else n = `:${n}r${(t = ku++).toString(32)}:`;
            return (e.memoizedState = n);
          },
          unstable_isNewReconciler: !1,
        };
      const oo = {
          readContext: Ca,
          useCallback: Yu,
          useContext: Ca,
          useEffect: Wu,
          useImperativeHandle: Ku,
          useInsertionEffect: Qu,
          useLayoutEffect: ju,
          useMemo: Xu,
          useReducer: Nu,
          useRef: Vu,
          useState: () => Nu(zu),
          useDebugValue: qu,
          useDeferredValue: (e) => Gu(_u(), hu.memoizedState, e),
          useTransition: () => [Nu(zu)[0], _u().memoizedState],
          useMutableSource: Tu,
          useSyncExternalStore: Lu,
          useId: Ju,
          unstable_isNewReconciler: !1,
        };
      const io = {
          readContext: Ca,
          useCallback: Yu,
          useContext: Ca,
          useEffect: Wu,
          useImperativeHandle: Ku,
          useInsertionEffect: Qu,
          useLayoutEffect: ju,
          useMemo: Xu,
          useReducer: Pu,
          useRef: Vu,
          useState: () => Pu(zu),
          useDebugValue: qu,
          useDeferredValue: (e) => {
            const n = _u();
            return null === hu
              ? (n.memoizedState = e)
              : Gu(n, hu.memoizedState, e);
          },
          useTransition: () => [Pu(zu)[0], _u().memoizedState],
          useMutableSource: Tu,
          useSyncExternalStore: Lu,
          useId: Ju,
          unstable_isNewReconciler: !1,
        };
      function so(e, n) {
        try {
          let t = "";
          let r = n;
          do {
            (t += B(r)), (r = r.return);
          } while (r);
          const l = t;
        } catch (e) {
          l = `\nError generating stack: ${e.message}\n${e.stack}`;
        }
        return { value: e, source: n, stack: l, digest: null };
      }
      function co(e, n, t) {
        return {
          value: e,
          source: null,
          stack: null != t ? t : null,
          digest: null != n ? n : null,
        };
      }
      function fo(e, n) {
        try {
          console.error(n.value);
        } catch (e) {
          setTimeout(() => {
            throw e;
          });
        }
      }
      const po = "function" === typeof WeakMap ? WeakMap : Map;
      function mo(e, n, t) {
        ((t = Fa(-1, t)).tag = 3), (t.payload = { element: null });
        const r = n.value;
        return (
          (t.callback = () => {
            Qi || ((Qi = !0), (ji = r)), fo(0, n);
          }),
          t
        );
      }
      function ho(e, n, t) {
        (t = Fa(-1, t)).tag = 3;
        const r = e.type.getDerivedStateFromError;
        if ("function" === typeof r) {
          const l = n.value;
          (t.payload = () => r(l)),
            (t.callback = () => {
              fo(0, n);
            });
        }
        const a = e.stateNode;
        return (
          null !== a &&
            "function" === typeof a.componentDidCatch &&
            (t.callback = function () {
              fo(0, n),
                "function" !== typeof r &&
                  (null === $i ? ($i = new Set([this])) : $i.add(this));
              const e = n.stack;
              this.componentDidCatch(n.value, {
                componentStack: null !== e ? e : "",
              });
            }),
          t
        );
      }
      function go(e, n, t) {
        let r = e.pingCache;
        if (null === r) {
          r = e.pingCache = new po();
          const l = new Set();
          r.set(n, l);
        } else void 0 === (l = r.get(n)) && ((l = new Set()), r.set(n, l));
        l.has(t) || (l.add(t), (e = Cs.bind(null, e, n, t)), n.then(e, e));
      }
      function vo(e) {
        do {
          let n;
          if (
            ((n = 13 === e.tag) &&
              (n = null === (n = e.memoizedState) || null !== n.dehydrated),
            n)
          )
            return e;
          e = e.return;
        } while (null !== e);
        return null;
      }
      function yo(e, n, t, r, l) {
        return 0 === (1 & e.mode)
          ? (e === n
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (t.flags |= 131072),
                (t.flags &= -52805),
                1 === t.tag &&
                  (null === t.alternate
                    ? (t.tag = 17)
                    : (((n = Fa(-1, 1)).tag = 2), Da(t, n, 1))),
                (t.lanes |= 1)),
            e)
          : ((e.flags |= 65536), (e.lanes = l), e);
      }
      const bo = k.ReactCurrentOwner;
      let ko = !1;
      function wo(e, n, t, r) {
        n.child = null === e ? Ga(n, null, t, r) : Xa(n, e.child, t, r);
      }
      function So(e, n, t, r, l) {
        t = t.render;
        const a = n.ref;
        return (
          Ea(n, l),
          (r = xu(e, n, t, r, a, l)),
          (t = Eu()),
          null === e || ko
            ? (la && t && ea(n), (n.flags |= 1), wo(e, n, r, l), n.child)
            : ((n.updateQueue = e.updateQueue),
              (n.flags &= -2053),
              (e.lanes &= ~l),
              Qo(e, n, l))
        );
      }
      function xo(e, n, t, r, l) {
        if (null === e) {
          const a = t.type;
          return "function" !== typeof a ||
            Ms(a) ||
            void 0 !== a.defaultProps ||
            null !== t.compare ||
            void 0 !== t.defaultProps
            ? (((e = Ds(t.type, null, r, n, n.mode, l)).ref = n.ref),
              (e.return = n),
              (n.child = e))
            : ((n.tag = 15), (n.type = a), Eo(e, n, a, r, l));
        }
        if (((a = e.child), 0 === (e.lanes & l))) {
          const u = a.memoizedProps;
          if ((t = null !== (t = t.compare) ? t : ir)(u, r) && e.ref === n.ref)
            return Qo(e, n, l);
        }
        return (
          (n.flags |= 1),
          ((e = Fs(a, r)).ref = n.ref),
          (e.return = n),
          (n.child = e)
        );
      }
      function Eo(e, n, t, r, l) {
        if (null !== e) {
          const a = e.memoizedProps;
          if (ir(a, r) && e.ref === n.ref) {
            if (((ko = !1), (n.pendingProps = r = a), 0 === (e.lanes & l)))
              return (n.lanes = e.lanes), Qo(e, n, l);
            0 !== (131072 & e.flags) && (ko = !0);
          }
        }
        return zo(e, n, t, r, l);
      }
      function Co(e, n, t) {
        let r = n.pendingProps;
        const l = r.children;
        const a = null !== e ? e.memoizedState : null;
        if ("hidden" === r.mode)
          if (0 === (1 & n.mode))
            (n.memoizedState = {
              baseLanes: 0,
              cachePool: null,
              transitions: null,
            }),
              _l(Fi, Mi),
              (Mi |= t);
          else {
            if (0 === (1073741824 & t))
              return (
                (e = null !== a ? a.baseLanes | t : t),
                (n.lanes = n.childLanes = 1073741824),
                (n.memoizedState = {
                  baseLanes: e,
                  cachePool: null,
                  transitions: null,
                }),
                (n.updateQueue = null),
                _l(Fi, Mi),
                (Mi |= e),
                null
              );
            (n.memoizedState = {
              baseLanes: 0,
              cachePool: null,
              transitions: null,
            }),
              (r = null !== a ? a.baseLanes : t),
              _l(Fi, Mi),
              (Mi |= r);
          }
        else
          null !== a
            ? ((r = a.baseLanes | t), (n.memoizedState = null))
            : (r = t),
            _l(Fi, Mi),
            (Mi |= r);
        return wo(e, n, l, t), n.child;
      }
      function _o(e, n) {
        const t = n.ref;
        ((null === e && null !== t) || (null !== e && e.ref !== t)) &&
          ((n.flags |= 512), (n.flags |= 2097152));
      }
      function zo(e, n, t, r, l) {
        let a = Ml(t) ? Tl : Nl.current;
        return (
          (a = Ll(n, a)),
          Ea(n, l),
          (t = xu(e, n, t, r, a, l)),
          (r = Eu()),
          null === e || ko
            ? (la && r && ea(n), (n.flags |= 1), wo(e, n, t, l), n.child)
            : ((n.updateQueue = e.updateQueue),
              (n.flags &= -2053),
              (e.lanes &= ~l),
              Qo(e, n, l))
        );
      }
      function No(e, n, t, r, l) {
        if (Ml(t)) {
          const a = !0;
          Ol(n);
        } else a = !1;
        if ((Ea(n, l), null === n.stateNode))
          Wo(e, n), Wa(n, t, r), ja(n, t, r, l), (r = !0);
        else if (null === e) {
          const u = n.stateNode;
          let o = n.memoizedProps;
          u.props = o;
          let i = u.context;
          let s = t.contextType;
          "object" === typeof s && null !== s
            ? (s = Ca(s))
            : (s = Ll(n, (s = Ml(t) ? Tl : Nl.current)));
          const c = t.getDerivedStateFromProps;
          const f =
              "function" === typeof c ||
              "function" === typeof u.getSnapshotBeforeUpdate;
          f ||
            ("function" !== typeof u.UNSAFE_componentWillReceiveProps &&
              "function" !== typeof u.componentWillReceiveProps) ||
            ((o !== r || i !== s) && Qa(n, u, r, s)),
            (Ta = !1);
          const d = n.memoizedState;
          (u.state = d),
            Ia(n, r, u, l),
            (i = n.memoizedState),
            o !== r || d !== i || Pl.current || Ta
              ? ("function" === typeof c &&
                  (Aa(n, t, c, r), (i = n.memoizedState)),
                (o = Ta || Ha(n, t, o, r, d, i, s))
                  ? (f ||
                      ("function" !== typeof u.UNSAFE_componentWillMount &&
                        "function" !== typeof u.componentWillMount) ||
                      ("function" === typeof u.componentWillMount &&
                        u.componentWillMount(),
                      "function" === typeof u.UNSAFE_componentWillMount &&
                        u.UNSAFE_componentWillMount()),
                    "function" === typeof u.componentDidMount &&
                      (n.flags |= 4194308))
                  : ("function" === typeof u.componentDidMount &&
                      (n.flags |= 4194308),
                    (n.memoizedProps = r),
                    (n.memoizedState = i)),
                (u.props = r),
                (u.state = i),
                (u.context = s),
                (r = o))
              : ("function" === typeof u.componentDidMount &&
                  (n.flags |= 4194308),
                (r = !1));
        } else {
          (u = n.stateNode),
            Ma(e, n),
            (o = n.memoizedProps),
            (s = n.type === n.elementType ? o : ga(n.type, o)),
            (u.props = s),
            (f = n.pendingProps),
            (d = u.context),
            "object" === typeof (i = t.contextType) && null !== i
              ? (i = Ca(i))
              : (i = Ll(n, (i = Ml(t) ? Tl : Nl.current)));
          const p = t.getDerivedStateFromProps;
          (c =
            "function" === typeof p ||
            "function" === typeof u.getSnapshotBeforeUpdate) ||
            ("function" !== typeof u.UNSAFE_componentWillReceiveProps &&
              "function" !== typeof u.componentWillReceiveProps) ||
            ((o !== f || d !== i) && Qa(n, u, r, i)),
            (Ta = !1),
            (d = n.memoizedState),
            (u.state = d),
            Ia(n, r, u, l);
          let m = n.memoizedState;
          o !== f || d !== m || Pl.current || Ta
            ? ("function" === typeof p &&
                (Aa(n, t, p, r), (m = n.memoizedState)),
              (s = Ta || Ha(n, t, s, r, d, m, i) || !1)
                ? (c ||
                    ("function" !== typeof u.UNSAFE_componentWillUpdate &&
                      "function" !== typeof u.componentWillUpdate) ||
                    ("function" === typeof u.componentWillUpdate &&
                      u.componentWillUpdate(r, m, i),
                    "function" === typeof u.UNSAFE_componentWillUpdate &&
                      u.UNSAFE_componentWillUpdate(r, m, i)),
                  "function" === typeof u.componentDidUpdate && (n.flags |= 4),
                  "function" === typeof u.getSnapshotBeforeUpdate &&
                    (n.flags |= 1024))
                : ("function" !== typeof u.componentDidUpdate ||
                    (o === e.memoizedProps && d === e.memoizedState) ||
                    (n.flags |= 4),
                  "function" !== typeof u.getSnapshotBeforeUpdate ||
                    (o === e.memoizedProps && d === e.memoizedState) ||
                    (n.flags |= 1024),
                  (n.memoizedProps = r),
                  (n.memoizedState = m)),
              (u.props = r),
              (u.state = m),
              (u.context = i),
              (r = s))
            : ("function" !== typeof u.componentDidUpdate ||
                (o === e.memoizedProps && d === e.memoizedState) ||
                (n.flags |= 4),
              "function" !== typeof u.getSnapshotBeforeUpdate ||
                (o === e.memoizedProps && d === e.memoizedState) ||
                (n.flags |= 1024),
              (r = !1));
        }
        return Po(e, n, t, r, a, l);
      }
      function Po(e, n, t, r, l, a) {
        _o(e, n);
        const u = 0 !== (128 & n.flags);
        if (!r && !u) return l && Il(n, t, !1), Qo(e, n, a);
        (r = n.stateNode), (bo.current = n);
        const o =
          u && "function" !== typeof t.getDerivedStateFromError
            ? null
            : r.render();
        return (
          (n.flags |= 1),
          null !== e && u
            ? ((n.child = Xa(n, e.child, null, a)),
              (n.child = Xa(n, null, o, a)))
            : wo(e, n, o, a),
          (n.memoizedState = r.state),
          l && Il(n, t, !0),
          n.child
        );
      }
      function To(e) {
        const n = e.stateNode;
        n.pendingContext
          ? Dl(0, n.pendingContext, n.pendingContext !== n.context)
          : n.context && Dl(0, n.context, !1),
          ru(e, n.containerInfo);
      }
      function Lo(e, n, t, r, l) {
        return pa(), ma(l), (n.flags |= 256), wo(e, n, t, r), n.child;
      }
      let Mo;
      let Fo;
      let Do;
      const Ro = { dehydrated: null, treeContext: null, retryLane: 0 };
      function Oo(e) {
        return { baseLanes: e, cachePool: null, transitions: null };
      }
      function Io(e, n, t) {
        let r;
        let l = n.pendingProps;
        let u = ou.current;
        let o = !1;
        let i = 0 !== (128 & n.flags);
        if (
          ((r = i) ||
            (r = (null === e || null !== e.memoizedState) && 0 !== (2 & u)),
          r
            ? ((o = !0), (n.flags &= -129))
            : (null !== e && null === e.memoizedState) || (u |= 1),
          _l(ou, 1 & u),
          null === e)
        )
          return (
            sa(n),
            null !== (e = n.memoizedState) && null !== (e = e.dehydrated)
              ? (0 === (1 & n.mode)
                  ? (n.lanes = 1)
                  : "$!" === e.data
                  ? (n.lanes = 8)
                  : (n.lanes = 1073741824),
                null)
              : ((i = l.children),
                (e = l.fallback),
                o
                  ? ((l = n.mode),
                    (o = n.child),
                    (i = { mode: "hidden", children: i }),
                    0 === (1 & l) && null !== o
                      ? ((o.childLanes = 0), (o.pendingProps = i))
                      : (o = Os(i, l, 0, null)),
                    (e = Rs(e, l, t, null)),
                    (o.return = n),
                    (e.return = n),
                    (o.sibling = e),
                    (n.child = o),
                    (n.child.memoizedState = Oo(t)),
                    (n.memoizedState = Ro),
                    e)
                  : Uo(n, i))
          );
        if (null !== (u = e.memoizedState) && null !== (r = u.dehydrated))
          return ((e, n, t, r, l, u, o) => {
            if (t)
              return 256 & n.flags
                ? ((n.flags &= -257), Vo(e, n, o, (r = co(Error(a(422))))))
                : null !== n.memoizedState
                ? ((n.child = e.child), (n.flags |= 128), null)
                : ((u = r.fallback),
                  (l = n.mode),
                  (r = Os(
                    { mode: "visible", children: r.children },
                    l,
                    0,
                    null,
                  )),
                  ((u = Rs(u, l, o, null)).flags |= 2),
                  (r.return = n),
                  (u.return = n),
                  (r.sibling = u),
                  (n.child = r),
                  0 !== (1 & n.mode) && Xa(n, e.child, null, o),
                  (n.child.memoizedState = Oo(o)),
                  (n.memoizedState = Ro),
                  u);
            if (0 === (1 & n.mode)) return Vo(e, n, o, null);
            if ("$!" === l.data) {
              if ((r = l.nextSibling?.dataset)) const i = r.dgst;
              return (
                (r = i), Vo(e, n, o, (r = co((u = Error(a(419))), r, void 0)))
              );
            }
            if (((i = 0 !== (o & e.childLanes)), ko || i)) {
              if (null !== (r = Pi)) {
                switch (o & -o) {
                  case 4:
                    l = 2;
                    break;
                  case 16:
                    l = 8;
                    break;
                  case 64:
                  case 128:
                  case 256:
                  case 512:
                  case 1024:
                  case 2048:
                  case 4096:
                  case 8192:
                  case 16384:
                  case 32768:
                  case 65536:
                  case 131072:
                  case 262144:
                  case 524288:
                  case 1048576:
                  case 2097152:
                  case 4194304:
                  case 8388608:
                  case 16777216:
                  case 33554432:
                  case 67108864:
                    l = 32;
                    break;
                  case 536870912:
                    l = 268435456;
                    break;
                  default:
                    l = 0;
                }
                0 !== (l = 0 !== (l & (r.suspendedLanes | o)) ? 0 : l) &&
                  l !== u.retryLane &&
                  ((u.retryLane = l), Pa(e, l), ts(r, e, l, -1));
              }
              return hs(), Vo(e, n, o, (r = co(Error(a(421)))));
            }
            return "$?" === l.data
              ? ((n.flags |= 128),
                (n.child = e.child),
                (n = zs.bind(null, e)),
                (l._reactRetry = n),
                null)
              : ((e = u.treeContext),
                (ra = sl(l.nextSibling)),
                (ta = n),
                (la = !0),
                (aa = null),
                null !== e &&
                  ((Kl[ql++] = Xl),
                  (Kl[ql++] = Gl),
                  (Kl[ql++] = Yl),
                  (Xl = e.id),
                  (Gl = e.overflow),
                  (Yl = n)),
                ((n = Uo(n, r.children)).flags |= 4096),
                n);
          })(e, n, i, l, r, u, t);
        if (o) {
          (o = l.fallback), (i = n.mode), (r = (u = e.child).sibling);
          const s = { mode: "hidden", children: l.children };
          return (
            0 === (1 & i) && n.child !== u
              ? (((l = n.child).childLanes = 0),
                (l.pendingProps = s),
                (n.deletions = null))
              : ((l = Fs(u, s)).subtreeFlags = 14680064 & u.subtreeFlags),
            null !== r ? (o = Fs(r, o)) : ((o = Rs(o, i, t, null)).flags |= 2),
            (o.return = n),
            (l.return = n),
            (l.sibling = o),
            (n.child = l),
            (l = o),
            (o = n.child),
            (i =
              null === (i = e.child.memoizedState)
                ? Oo(t)
                : {
                    baseLanes: i.baseLanes | t,
                    cachePool: null,
                    transitions: i.transitions,
                  }),
            (o.memoizedState = i),
            (o.childLanes = e.childLanes & ~t),
            (n.memoizedState = Ro),
            l
          );
        }
        return (
          (e = (o = e.child).sibling),
          (l = Fs(o, { mode: "visible", children: l.children })),
          0 === (1 & n.mode) && (l.lanes = t),
          (l.return = n),
          (l.sibling = null),
          null !== e &&
            (null === (t = n.deletions)
              ? ((n.deletions = [e]), (n.flags |= 16))
              : t.push(e)),
          (n.child = l),
          (n.memoizedState = null),
          l
        );
      }
      function Uo(e, n) {
        return (
          ((n = Os({ mode: "visible", children: n }, e.mode, 0, null)).return =
            e),
          (e.child = n)
        );
      }
      function Vo(e, n, t, r) {
        return (
          null !== r && ma(r),
          Xa(n, e.child, null, t),
          ((e = Uo(n, n.pendingProps.children)).flags |= 2),
          (n.memoizedState = null),
          e
        );
      }
      function Ao(e, n, t) {
        e.lanes |= n;
        const r = e.alternate;
        null !== r && (r.lanes |= n), xa(e.return, n, t);
      }
      function Bo(e, n, t, r, l) {
        const a = e.memoizedState;
        null === a
          ? (e.memoizedState = {
              isBackwards: n,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: t,
              tailMode: l,
            })
          : ((a.isBackwards = n),
            (a.rendering = null),
            (a.renderingStartTime = 0),
            (a.last = r),
            (a.tail = t),
            (a.tailMode = l));
      }
      function Ho(e, n, t) {
        let r = n.pendingProps;
        let l = r.revealOrder;
        const a = r.tail;
        if ((wo(e, n, r.children, t), 0 !== (2 & (r = ou.current))))
          (r = (1 & r) | 2), (n.flags |= 128);
        else {
          if (null !== e && 0 !== (128 & e.flags))
            e: for (e = n.child; null !== e; ) {
              if (13 === e.tag) null !== e.memoizedState && Ao(e, t, n);
              else if (19 === e.tag) Ao(e, t, n);
              else if (null !== e.child) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === n) break;
              while (null === e.sibling) {
                if (null === e.return || e.return === n) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          r &= 1;
        }
        if ((_l(ou, r), 0 === (1 & n.mode))) n.memoizedState = null;
        else
          switch (l) {
            case "forwards":
              for (t = n.child, l = null; null !== t; )
                null !== (e = t.alternate) && null === iu(e) && (l = t),
                  (t = t.sibling);
              null === (t = l)
                ? ((l = n.child), (n.child = null))
                : ((l = t.sibling), (t.sibling = null)),
                Bo(n, !1, l, t, a);
              break;
            case "backwards":
              for (t = null, l = n.child, n.child = null; null !== l; ) {
                if (null !== (e = l.alternate) && null === iu(e)) {
                  n.child = l;
                  break;
                }
                (e = l.sibling), (l.sibling = t), (t = l), (l = e);
              }
              Bo(n, !0, t, null, a);
              break;
            case "together":
              Bo(n, !1, null, null, void 0);
              break;
            default:
              n.memoizedState = null;
          }
        return n.child;
      }
      function Wo(e, n) {
        0 === (1 & n.mode) &&
          null !== e &&
          ((e.alternate = null), (n.alternate = null), (n.flags |= 2));
      }
      function Qo(e, n, t) {
        if (
          (null !== e && (n.dependencies = e.dependencies),
          (Oi |= n.lanes),
          0 === (t & n.childLanes))
        )
          return null;
        if (null !== e && n.child !== e.child) throw Error(a(153));
        if (null !== n.child) {
          for (
            t = Fs((e = n.child), e.pendingProps), n.child = t, t.return = n;
            null !== e.sibling;

          )
            (e = e.sibling),
              ((t = t.sibling = Fs(e, e.pendingProps)).return = n);
          t.sibling = null;
        }
        return n.child;
      }
      function jo(e, n) {
        if (!la)
          switch (e.tailMode) {
            case "hidden":
              n = e.tail;
              for (let t = null; null !== n; )
                null !== n.alternate && (t = n), (n = n.sibling);
              null === t ? (e.tail = null) : (t.sibling = null);
              break;
            case "collapsed":
              t = e.tail;
              for (let r = null; null !== t; )
                null !== t.alternate && (r = t), (t = t.sibling);
              null === r
                ? n || null === e.tail
                  ? (e.tail = null)
                  : (e.tail.sibling = null)
                : (r.sibling = null);
          }
      }
      function $o(e) {
        const n = null !== e.alternate && e.alternate.child === e.child;
        let t = 0;
        let r = 0;
        if (n)
          for (let l = e.child; null !== l; )
            (t |= l.lanes | l.childLanes),
              (r |= 14680064 & l.subtreeFlags),
              (r |= 14680064 & l.flags),
              (l.return = e),
              (l = l.sibling);
        else
          for (l = e.child; null !== l; )
            (t |= l.lanes | l.childLanes),
              (r |= l.subtreeFlags),
              (r |= l.flags),
              (l.return = e),
              (l = l.sibling);
        return (e.subtreeFlags |= r), (e.childLanes = t), n;
      }
      function Ko(e, n, t) {
        let r = n.pendingProps;
        switch ((na(n), n.tag)) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return $o(n), null;
          case 1:
          case 17:
            return Ml(n.type) && Fl(), $o(n), null;
          case 3:
            return (
              (r = n.stateNode),
              lu(),
              Cl(Pl),
              Cl(Nl),
              cu(),
              r.pendingContext &&
                ((r.context = r.pendingContext), (r.pendingContext = null)),
              (null !== e && null !== e.child) ||
                (fa(n)
                  ? (n.flags |= 4)
                  : null === e ||
                    (e.memoizedState.isDehydrated && 0 === (256 & n.flags)) ||
                    ((n.flags |= 1024), null !== aa && (us(aa), (aa = null)))),
              $o(n),
              null
            );
          case 5: {
            uu(n);
            let l = tu(nu.current);
            if (((t = n.type), null !== e && null != n.stateNode))
              Fo(e, n, t, r),
                e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152));
            else {
              if (!r) {
                if (null === n.stateNode) throw Error(a(166));
                return $o(n), null;
              }
              if (((e = tu(Ja.current)), fa(n))) {
                (r = n.stateNode), (t = n.type);
                const u = n.memoizedProps;
                switch (
                  ((r[dl] = n), (r[pl] = u), (e = 0 !== (1 & n.mode)), t)
                ) {
                  case "dialog":
                    Vr("cancel", r), Vr("close", r);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    Vr("load", r);
                    break;
                  case "video":
                  case "audio":
                    for (l = 0; l < Rr.length; l++) Vr(Rr[l], r);
                    break;
                  case "source":
                    Vr("error", r);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    Vr("error", r), Vr("load", r);
                    break;
                  case "details":
                    Vr("toggle", r);
                    break;
                  case "input":
                    X(r, u), Vr("invalid", r);
                    break;
                  case "select":
                    (r._wrapperState = { wasMultiple: !!u.multiple }),
                      Vr("invalid", r);
                    break;
                  case "textarea":
                    le(r, u), Vr("invalid", r);
                }
                for (const i in (ye(t, u), (l = null), u))
                  if (u.hasOwnProperty(i)) {
                    const s = u[i];
                    "children" === i
                      ? "string" === typeof s
                        ? r.textContent !== s &&
                          (!0 !== u.suppressHydrationWarning &&
                            Zr(r.textContent, s, e),
                          (l = ["children", s]))
                        : "number" === typeof s &&
                          r.textContent !== `${s}` &&
                          (!0 !== u.suppressHydrationWarning &&
                            Zr(r.textContent, s, e),
                          (l = ["children", `${s}`]))
                      : o.hasOwnProperty(i) &&
                        null != s &&
                        "onScroll" === i &&
                        Vr("scroll", r);
                  }
                switch (t) {
                  case "input":
                    $(r), J(r, u, !0);
                    break;
                  case "textarea":
                    $(r), ue(r);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof u.onClick && (r.onclick = Jr);
                }
                (r = l), (n.updateQueue = r), null !== r && (n.flags |= 4);
              } else {
                (i = 9 === l.nodeType ? l : l.ownerDocument),
                  "http://www.w3.org/1999/xhtml" === e && (e = oe(t)),
                  "http://www.w3.org/1999/xhtml" === e
                    ? "script" === t
                      ? (((e = i.createElement("div")).innerHTML =
                          "<script></script>"),
                        (e = e.removeChild(e.firstChild)))
                      : "string" === typeof r.is
                      ? (e = i.createElement(t, { is: r.is }))
                      : ((e = i.createElement(t)),
                        "select" === t &&
                          ((i = e),
                          r.multiple
                            ? (i.multiple = !0)
                            : r.size && (i.size = r.size)))
                    : (e = i.createElementNS(e, t)),
                  (e[dl] = n),
                  (e[pl] = r),
                  Mo(e, n),
                  (n.stateNode = e);
                e: {
                  switch (((i = be(t, r)), t)) {
                    case "dialog":
                      Vr("cancel", e), Vr("close", e), (l = r);
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      Vr("load", e), (l = r);
                      break;
                    case "video":
                    case "audio":
                      for (l = 0; l < Rr.length; l++) Vr(Rr[l], e);
                      l = r;
                      break;
                    case "source":
                      Vr("error", e), (l = r);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      Vr("error", e), Vr("load", e), (l = r);
                      break;
                    case "details":
                      Vr("toggle", e), (l = r);
                      break;
                    case "input":
                      X(e, r), (l = Y(e, r)), Vr("invalid", e);
                      break;
                    default:
                      l = r;
                      break;
                    case "select":
                      (e._wrapperState = { wasMultiple: !!r.multiple }),
                        (l = I({}, r, { value: void 0 })),
                        Vr("invalid", e);
                      break;
                    case "textarea":
                      le(e, r), (l = re(e, r)), Vr("invalid", e);
                  }
                  for (u in (ye(t, l), (s = l)))
                    if (s.hasOwnProperty(u)) {
                      let c = s[u];
                      "style" === u
                        ? ge(e, c)
                        : "dangerouslySetInnerHTML" === u
                        ? null != (c = c ? c.__html : void 0) && fe(e, c)
                        : "children" === u
                        ? "string" === typeof c
                          ? ("textarea" !== t || "" !== c) && de(e, c)
                          : "number" === typeof c && de(e, `${c}`)
                        : "suppressContentEditableWarning" !== u &&
                          "suppressHydrationWarning" !== u &&
                          "autoFocus" !== u &&
                          (o.hasOwnProperty(u)
                            ? null != c && "onScroll" === u && Vr("scroll", e)
                            : null != c && b(e, u, c, i));
                    }
                  switch (t) {
                    case "input":
                      $(e), J(e, r, !1);
                      break;
                    case "textarea":
                      $(e), ue(e);
                      break;
                    case "option":
                      null != r.value &&
                        e.setAttribute("value", `${Q(r.value)}`);
                      break;
                    case "select":
                      (e.multiple = !!r.multiple),
                        null != (u = r.value)
                          ? te(e, !!r.multiple, u, !1)
                          : null != r.defaultValue &&
                            te(e, !!r.multiple, r.defaultValue, !0);
                      break;
                    default:
                      "function" === typeof l.onClick && (e.onclick = Jr);
                  }
                  switch (t) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      r = !!r.autoFocus;
                      break e;
                    case "img":
                      r = !0;
                      break e;
                    default:
                      r = !1;
                  }
                }
                r && (n.flags |= 4);
              }
              null !== n.ref && ((n.flags |= 512), (n.flags |= 2097152));
            }
            return $o(n), null;
          }
          case 6:
            if (e && null != n.stateNode) Do(0, n, e.memoizedProps, r);
            else {
              if ("string" !== typeof r && null === n.stateNode)
                throw Error(a(166));
              if (((t = tu(nu.current)), tu(Ja.current), fa(n))) {
                if (
                  ((r = n.stateNode),
                  (t = n.memoizedProps),
                  (r[dl] = n),
                  (u = r.nodeValue !== t) && null !== (e = ta))
                )
                  switch (e.tag) {
                    case 3:
                      Zr(r.nodeValue, t, 0 !== (1 & e.mode));
                      break;
                    case 5:
                      !0 !== e.memoizedProps.suppressHydrationWarning &&
                        Zr(r.nodeValue, t, 0 !== (1 & e.mode));
                  }
                u && (n.flags |= 4);
              } else
                ((r = (9 === t.nodeType ? t : t.ownerDocument).createTextNode(
                  r,
                ))[dl] = n),
                  (n.stateNode = r);
            }
            return $o(n), null;
          case 13:
            if (
              (Cl(ou),
              (r = n.memoizedState),
              null === e ||
                (null !== e.memoizedState &&
                  null !== e.memoizedState.dehydrated))
            ) {
              if (
                la &&
                null !== ra &&
                0 !== (1 & n.mode) &&
                0 === (128 & n.flags)
              )
                da(), pa(), (n.flags |= 98560), (u = !1);
              else if (((u = fa(n)), null !== r && null !== r.dehydrated)) {
                if (null === e) {
                  if (!u) throw Error(a(318));
                  if (
                    !(u = null !== (u = n.memoizedState) ? u.dehydrated : null)
                  )
                    throw Error(a(317));
                  u[dl] = n;
                } else
                  pa(),
                    0 === (128 & n.flags) && (n.memoizedState = null),
                    (n.flags |= 4);
                $o(n), (u = !1);
              } else null !== aa && (us(aa), (aa = null)), (u = !0);
              if (!u) return 65536 & n.flags ? n : null;
            }
            return 0 !== (128 & n.flags)
              ? ((n.lanes = t), n)
              : ((r = null !== r) !==
                  (null !== e && null !== e.memoizedState) &&
                  r &&
                  ((n.child.flags |= 8192),
                  0 !== (1 & n.mode) &&
                    (null === e || 0 !== (1 & ou.current)
                      ? 0 === Di && (Di = 3)
                      : hs())),
                null !== n.updateQueue && (n.flags |= 4),
                $o(n),
                null);
          case 4:
            return (
              lu(), null === e && Hr(n.stateNode.containerInfo), $o(n), null
            );
          case 10:
            return Sa(n.type._context), $o(n), null;
          case 19:
            if ((Cl(ou), null === (u = n.memoizedState))) return $o(n), null;
            if (((r = 0 !== (128 & n.flags)), null === (i = u.rendering)))
              if (r) jo(u, !1);
              else {
                if (0 !== Di || (null !== e && 0 !== (128 & e.flags)))
                  for (e = n.child; null !== e; ) {
                    if (null !== (i = iu(e))) {
                      for (
                        n.flags |= 128,
                          jo(u, !1),
                          null !== (r = i.updateQueue) &&
                            ((n.updateQueue = r), (n.flags |= 4)),
                          n.subtreeFlags = 0,
                          r = t,
                          t = n.child;
                        null !== t;

                      )
                        (e = r),
                          ((u = t).flags &= 14680066),
                          null === (i = u.alternate)
                            ? ((u.childLanes = 0),
                              (u.lanes = e),
                              (u.child = null),
                              (u.subtreeFlags = 0),
                              (u.memoizedProps = null),
                              (u.memoizedState = null),
                              (u.updateQueue = null),
                              (u.dependencies = null),
                              (u.stateNode = null))
                            : ((u.childLanes = i.childLanes),
                              (u.lanes = i.lanes),
                              (u.child = i.child),
                              (u.subtreeFlags = 0),
                              (u.deletions = null),
                              (u.memoizedProps = i.memoizedProps),
                              (u.memoizedState = i.memoizedState),
                              (u.updateQueue = i.updateQueue),
                              (u.type = i.type),
                              (e = i.dependencies),
                              (u.dependencies =
                                null === e
                                  ? null
                                  : {
                                      lanes: e.lanes,
                                      firstContext: e.firstContext,
                                    })),
                          (t = t.sibling);
                      return _l(ou, (1 & ou.current) | 2), n.child;
                    }
                    e = e.sibling;
                  }
                null !== u.tail &&
                  Ge() > Hi &&
                  ((n.flags |= 128), (r = !0), jo(u, !1), (n.lanes = 4194304));
              }
            else {
              if (!r)
                if (null !== (e = iu(i))) {
                  if (
                    ((n.flags |= 128),
                    (r = !0),
                    null !== (t = e.updateQueue) &&
                      ((n.updateQueue = t), (n.flags |= 4)),
                    jo(u, !0),
                    null === u.tail &&
                      "hidden" === u.tailMode &&
                      !i.alternate &&
                      !la)
                  )
                    return $o(n), null;
                } else
                  2 * Ge() - u.renderingStartTime > Hi &&
                    1073741824 !== t &&
                    ((n.flags |= 128),
                    (r = !0),
                    jo(u, !1),
                    (n.lanes = 4194304));
              u.isBackwards
                ? ((i.sibling = n.child), (n.child = i))
                : (null !== (t = u.last) ? (t.sibling = i) : (n.child = i),
                  (u.last = i));
            }
            return null !== u.tail
              ? ((n = u.tail),
                (u.rendering = n),
                (u.tail = n.sibling),
                (u.renderingStartTime = Ge()),
                (n.sibling = null),
                (t = ou.current),
                _l(ou, r ? (1 & t) | 2 : 1 & t),
                n)
              : ($o(n), null);
          case 22:
          case 23:
            return (
              fs(),
              (r = null !== n.memoizedState),
              null !== e &&
                (null !== e.memoizedState) !== r &&
                (n.flags |= 8192),
              r && 0 !== (1 & n.mode)
                ? 0 !== (1073741824 & Mi) &&
                  ($o(n), 6 & n.subtreeFlags && (n.flags |= 8192))
                : $o(n),
              null
            );
          case 24:
          case 25:
            return null;
        }
        throw Error(a(156, n.tag));
      }
      function qo(e, n) {
        switch ((na(n), n.tag)) {
          case 1:
            return (
              Ml(n.type) && Fl(),
              65536 & (e = n.flags) ? ((n.flags = (-65537 & e) | 128), n) : null
            );
          case 3:
            return (
              lu(),
              Cl(Pl),
              Cl(Nl),
              cu(),
              0 !== (65536 & (e = n.flags)) && 0 === (128 & e)
                ? ((n.flags = (-65537 & e) | 128), n)
                : null
            );
          case 5:
            return uu(n), null;
          case 13:
            if (
              (Cl(ou), null !== (e = n.memoizedState) && null !== e.dehydrated)
            ) {
              if (null === n.alternate) throw Error(a(340));
              pa();
            }
            return 65536 & (e = n.flags)
              ? ((n.flags = (-65537 & e) | 128), n)
              : null;
          case 19:
            return Cl(ou), null;
          case 4:
            return lu(), null;
          case 10:
            return Sa(n.type._context), null;
          case 22:
          case 23:
            return fs(), null;
          default:
            return null;
        }
      }
      (Mo = (e, n) => {
        for (let t = n.child; null !== t; ) {
          if (5 === t.tag || 6 === t.tag) e.appendChild(t.stateNode);
          else if (4 !== t.tag && null !== t.child) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === n) break;
          while (null === t.sibling) {
            if (null === t.return || t.return === n) return;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }),
        (Fo = (e, n, t, r) => {
          let l = e.memoizedProps;
          if (l !== r) {
            (e = n.stateNode), tu(Ja.current);
            let a;
            let u = null;
            switch (t) {
              case "input":
                (l = Y(e, l)), (r = Y(e, r)), (u = []);
                break;
              case "select":
                (l = I({}, l, { value: void 0 })),
                  (r = I({}, r, { value: void 0 })),
                  (u = []);
                break;
              case "textarea":
                (l = re(e, l)), (r = re(e, r)), (u = []);
                break;
              default:
                "function" !== typeof l.onClick &&
                  "function" === typeof r.onClick &&
                  (e.onclick = Jr);
            }
            for (c in (ye(t, r), (t = null), l))
              if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && null != l[c])
                if ("style" === c) {
                  const i = l[c];
                  for (a in i)
                    i.hasOwnProperty(a) && (t || (t = {}), (t[a] = ""));
                } else
                  "dangerouslySetInnerHTML" !== c &&
                    "children" !== c &&
                    "suppressContentEditableWarning" !== c &&
                    "suppressHydrationWarning" !== c &&
                    "autoFocus" !== c &&
                    (o.hasOwnProperty(c)
                      ? u || (u = [])
                      : (u = u || []).push(c, null));
            for (c in r) {
              let s = r[c];
              if (
                ((i = null != l ? l[c] : void 0),
                r.hasOwnProperty(c) && s !== i && (null != s || null != i))
              )
                if ("style" === c)
                  if (i) {
                    for (a in i)
                      !i.hasOwnProperty(a) ||
                        (s?.hasOwnProperty(a)) ||
                        (t || (t = {}), (t[a] = ""));
                    for (a in s)
                      s.hasOwnProperty(a) &&
                        i[a] !== s[a] &&
                        (t || (t = {}), (t[a] = s[a]));
                  } else t || (u || (u = []), u.push(c, t)), (t = s);
                else
                  "dangerouslySetInnerHTML" === c
                    ? ((s = s ? s.__html : void 0),
                      (i = i ? i.__html : void 0),
                      null != s && i !== s && (u = u || []).push(c, s))
                    : "children" === c
                    ? ("string" !== typeof s && "number" !== typeof s) ||
                      (u = u || []).push(c, `${s}`)
                    : "suppressContentEditableWarning" !== c &&
                      "suppressHydrationWarning" !== c &&
                      (o.hasOwnProperty(c)
                        ? (null != s && "onScroll" === c && Vr("scroll", e),
                          u || i === s || (u = []))
                        : (u = u || []).push(c, s));
            }
            t && (u = u || []).push("style", t);
            const c = u;
            (n.updateQueue = c) && (n.flags |= 4);
          }
        }),
        (Do = (e, n, t, r) => {
          t !== r && (n.flags |= 4);
        });
      let Yo = !1;
      let Xo = !1;
      const Go = "function" === typeof WeakSet ? WeakSet : Set;
      let Zo = null;
      function Jo(e, n) {
        const t = e.ref;
        if (null !== t)
          if ("function" === typeof t)
            try {
              t(null);
            } catch (t) {
              Es(e, n, t);
            }
          else t.current = null;
      }
      function ei(e, n, t) {
        try {
          t();
        } catch (t) {
          Es(e, n, t);
        }
      }
      let ni = !1;
      function ti(e, n, t) {
        let r = n.updateQueue;
        if (null !== (r = null !== r ? r.lastEffect : null)) {
          let l = (r = r.next);
          do {
            if ((l.tag & e) === e) {
              const a = l.destroy;
              (l.destroy = void 0), void 0 !== a && ei(n, t, a);
            }
            l = l.next;
          } while (l !== r);
        }
      }
      function ri(e, n) {
        if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
          let t = (n = n.next);
          do {
            if ((t.tag & e) === e) {
              const r = t.create;
              t.destroy = r();
            }
            t = t.next;
          } while (t !== n);
        }
      }
      function li(e) {
        const n = e.ref;
        if (null !== n) {
          const t = e.stateNode;
          e.tag, (e = t), "function" === typeof n ? n(e) : (n.current = e);
        }
      }
      function ai(e) {
        let n = e.alternate;
        null !== n && ((e.alternate = null), ai(n)),
          (e.child = null),
          (e.deletions = null),
          (e.sibling = null),
          5 === e.tag &&
            null !== (n = e.stateNode) &&
            (delete n[dl],
            delete n[pl],
            delete n[hl],
            delete n[gl],
            delete n[vl]),
          (e.stateNode = null),
          (e.return = null),
          (e.dependencies = null),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.pendingProps = null),
          (e.stateNode = null),
          (e.updateQueue = null);
      }
      function ui(e) {
        return 5 === e.tag || 3 === e.tag || 4 === e.tag;
      }
      function oi(e) {
        e: for (;;) {
          while (null === e.sibling) {
            if (null === e.return || ui(e.return)) return null;
            e = e.return;
          }
          for (
            e.sibling.return = e.return, e = e.sibling;
            5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

          ) {
            if (2 & e.flags) continue e;
            if (null === e.child || 4 === e.tag) continue e;
            (e.child.return = e), (e = e.child);
          }
          if (!(2 & e.flags)) return e.stateNode;
        }
      }
      function ii(e, n, t) {
        const r = e.tag;
        if (5 === r || 6 === r)
          (e = e.stateNode),
            n
              ? 8 === t.nodeType
                ? t.parentNode.insertBefore(e, n)
                : t.insertBefore(e, n)
              : (8 === t.nodeType
                  ? (n = t.parentNode).insertBefore(e, t)
                  : (n = t).appendChild(e),
                null != (t = t._reactRootContainer) ||
                  null !== n.onclick ||
                  (n.onclick = Jr));
        else if (4 !== r && null !== (e = e.child))
          for (ii(e, n, t), e = e.sibling; null !== e; )
            ii(e, n, t), (e = e.sibling);
      }
      function si(e, n, t) {
        const r = e.tag;
        if (5 === r || 6 === r)
          (e = e.stateNode), n ? t.insertBefore(e, n) : t.appendChild(e);
        else if (4 !== r && null !== (e = e.child))
          for (si(e, n, t), e = e.sibling; null !== e; )
            si(e, n, t), (e = e.sibling);
      }
      let ci = null;
      let fi = !1;
      function di(e, n, t) {
        for (t = t.child; null !== t; ) pi(e, n, t), (t = t.sibling);
      }
      function pi(e, n, t) {
        if (an && "function" === typeof an.onCommitFiberUnmount)
          try {
            an.onCommitFiberUnmount(ln, t);
          } catch (e) {}
        switch (t.tag) {
          case 5:
            Xo || Jo(t, n);
          case 6: {
            const r = ci;
            const l = fi;
            (ci = null),
              di(e, n, t),
              (fi = l),
              null !== (ci = r) &&
                (fi
                  ? ((e = ci),
                    (t = t.stateNode),
                    8 === e.nodeType
                      ? e.parentNode.removeChild(t)
                      : e.removeChild(t))
                  : ci.removeChild(t.stateNode));
            break;
          }
          case 18:
            null !== ci &&
              (fi
                ? ((e = ci),
                  (t = t.stateNode),
                  8 === e.nodeType
                    ? il(e.parentNode, t)
                    : 1 === e.nodeType && il(e, t),
                  Wn(e))
                : il(ci, t.stateNode));
            break;
          case 4:
            (r = ci),
              (l = fi),
              (ci = t.stateNode.containerInfo),
              (fi = !0),
              di(e, n, t),
              (ci = r),
              (fi = l);
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (
              !Xo &&
              null !== (r = t.updateQueue) &&
              null !== (r = r.lastEffect)
            ) {
              l = r = r.next;
              do {
                let a = l;
                const u = a.destroy;
                (a = a.tag),
                  void 0 !== u && (0 !== (2 & a) || 0 !== (4 & a)) && ei(t, n, u),
                  (l = l.next);
              } while (l !== r);
            }
            di(e, n, t);
            break;
          case 1:
            if (
              !Xo &&
              (Jo(t, n),
              "function" === typeof (r = t.stateNode).componentWillUnmount)
            )
              try {
                (r.props = t.memoizedProps),
                  (r.state = t.memoizedState),
                  r.componentWillUnmount();
              } catch (e) {
                Es(t, n, e);
              }
            di(e, n, t);
            break;
          case 21:
            di(e, n, t);
            break;
          case 22:
            1 & t.mode
              ? ((Xo = (r = Xo) || null !== t.memoizedState),
                di(e, n, t),
                (Xo = r))
              : di(e, n, t);
            break;
          default:
            di(e, n, t);
        }
      }
      function mi(e) {
        const n = e.updateQueue;
        if (null !== n) {
          e.updateQueue = null;
          let t = e.stateNode;
          null === t && (t = e.stateNode = new Go()),
            n.forEach((n) => {
              const r = Ns.bind(null, e, n);
              t.has(n) || (t.add(n), n.then(r, r));
            });
        }
      }
      function hi(e, n) {
        const t = n.deletions;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const l = t[r];
            try {
              const u = e;
              const o = n;
              let i = o;
              e: while (null !== i) {
                switch (i.tag) {
                  case 5:
                    (ci = i.stateNode), (fi = !1);
                    break e;
                  case 3:
                  case 4:
                    (ci = i.stateNode.containerInfo), (fi = !0);
                    break e;
                }
                i = i.return;
              }
              if (null === ci) throw Error(a(160));
              pi(u, o, l), (ci = null), (fi = !1);
              const s = l.alternate;
              null !== s && (s.return = null), (l.return = null);
            } catch (e) {
              Es(l, n, e);
            }
          }
        if (12854 & n.subtreeFlags)
          for (n = n.child; null !== n; ) gi(n, e), (n = n.sibling);
      }
      function gi(e, n) {
        let t = e.alternate;
        let r = e.flags;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            if ((hi(n, e), vi(e), 4 & r)) {
              try {
                ti(3, e, e.return), ri(3, e);
              } catch (n) {
                Es(e, e.return, n);
              }
              try {
                ti(5, e, e.return);
              } catch (n) {
                Es(e, e.return, n);
              }
            }
            break;
          case 1:
            hi(n, e), vi(e), 512 & r && null !== t && Jo(t, t.return);
            break;
          case 5:
            if (
              (hi(n, e),
              vi(e),
              512 & r && null !== t && Jo(t, t.return),
              32 & e.flags)
            ) {
              const l = e.stateNode;
              try {
                de(l, "");
              } catch (n) {
                Es(e, e.return, n);
              }
            }
            if (4 & r && null != (l = e.stateNode)) {
              const u = e.memoizedProps;
              let o = null !== t ? t.memoizedProps : u;
              const i = e.type;
              const s = e.updateQueue;
              if (((e.updateQueue = null), null !== s))
                try {
                  "input" === i &&
                    "radio" === u.type &&
                    null != u.name &&
                    G(l, u),
                    be(i, o);
                  const c = be(i, u);
                  for (o = 0; o < s.length; o += 2) {
                    const f = s[o];
                    const d = s[o + 1];
                    "style" === f
                      ? ge(l, d)
                      : "dangerouslySetInnerHTML" === f
                      ? fe(l, d)
                      : "children" === f
                      ? de(l, d)
                      : b(l, f, d, c);
                  }
                  switch (i) {
                    case "input":
                      Z(l, u);
                      break;
                    case "textarea":
                      ae(l, u);
                      break;
                    case "select": {
                      const p = l._wrapperState.wasMultiple;
                      l._wrapperState.wasMultiple = !!u.multiple;
                      const m = u.value;
                      null != m
                        ? te(l, !!u.multiple, m, !1)
                        : p !== !!u.multiple &&
                          (null != u.defaultValue
                            ? te(l, !!u.multiple, u.defaultValue, !0)
                            : te(l, !!u.multiple, u.multiple ? [] : "", !1));
                    }
                  }
                  l[pl] = u;
                } catch (n) {
                  Es(e, e.return, n);
                }
            }
            break;
          case 6:
            if ((hi(n, e), vi(e), 4 & r)) {
              if (null === e.stateNode) throw Error(a(162));
              (l = e.stateNode), (u = e.memoizedProps);
              try {
                l.nodeValue = u;
              } catch (n) {
                Es(e, e.return, n);
              }
            }
            break;
          case 3:
            if (
              (hi(n, e),
              vi(e),
              4 & r && null !== t && t.memoizedState.isDehydrated)
            )
              try {
                Wn(n.containerInfo);
              } catch (n) {
                Es(e, e.return, n);
              }
            break;
          default:
            hi(n, e), vi(e);
            break;
          case 13:
            hi(n, e),
              vi(e),
              8192 & (l = e.child).flags &&
                ((u = null !== l.memoizedState),
                (l.stateNode.isHidden = u),
                !u ||
                  (null !== l.alternate &&
                    null !== l.alternate.memoizedState) ||
                  (Bi = Ge())),
              4 & r && mi(e);
            break;
          case 22:
            if (
              ((f = null !== t && null !== t.memoizedState),
              1 & e.mode
                ? ((Xo = (c = Xo) || f), hi(n, e), (Xo = c))
                : hi(n, e),
              vi(e),
              8192 & r)
            ) {
              if (
                ((c = null !== e.memoizedState),
                (e.stateNode.isHidden = c) && !f && 0 !== (1 & e.mode))
              )
                for (Zo = e, f = e.child; null !== f; ) {
                  for (d = Zo = f; null !== Zo; ) {
                    switch (((m = (p = Zo).child), p.tag)) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        ti(4, p, p.return);
                        break;
                      case 1: {
                        Jo(p, p.return);
                        const h = p.stateNode;
                        if ("function" === typeof h.componentWillUnmount) {
                          (r = p), (t = p.return);
                          try {
                            (n = r),
                              (h.props = n.memoizedProps),
                              (h.state = n.memoizedState),
                              h.componentWillUnmount();
                          } catch (e) {
                            Es(r, t, e);
                          }
                        }
                        break;
                      }
                      case 5:
                        Jo(p, p.return);
                        break;
                      case 22:
                        if (null !== p.memoizedState) {
                          wi(d);
                          continue;
                        }
                    }
                    null !== m ? ((m.return = p), (Zo = m)) : wi(d);
                  }
                  f = f.sibling;
                }
              e: for (f = null, d = e; ; ) {
                if (5 === d.tag) {
                  if (null === f) {
                    f = d;
                    try {
                      (l = d.stateNode),
                        c
                          ? "function" === typeof (u = l.style).setProperty
                            ? u.setProperty("display", "none", "important")
                            : (u.display = "none")
                          : ((i = d.stateNode),
                            (o =
                              null != (s = d.memoizedProps.style) &&
                              s.hasOwnProperty("display")
                                ? s.display
                                : null),
                            (i.style.display = he("display", o)));
                    } catch (n) {
                      Es(e, e.return, n);
                    }
                  }
                } else if (6 === d.tag) {
                  if (null === f)
                    try {
                      d.stateNode.nodeValue = c ? "" : d.memoizedProps;
                    } catch (n) {
                      Es(e, e.return, n);
                    }
                } else if (
                  ((22 !== d.tag && 23 !== d.tag) ||
                    null === d.memoizedState ||
                    d === e) &&
                  null !== d.child
                ) {
                  (d.child.return = d), (d = d.child);
                  continue;
                }
                if (d === e) break;
                while (null === d.sibling) {
                  if (null === d.return || d.return === e) break e;
                  f === d && (f = null), (d = d.return);
                }
                f === d && (f = null),
                  (d.sibling.return = d.return),
                  (d = d.sibling);
              }
            }
            break;
          case 19:
            hi(n, e), vi(e), 4 & r && mi(e);
          case 21:
        }
      }
      function vi(e) {
        const n = e.flags;
        if (2 & n) {
          try {
            e: {
              for (let t = e.return; null !== t; ) {
                if (ui(t)) {
                  const r = t;
                  break e;
                }
                t = t.return;
              }
              throw Error(a(160));
            }
            switch (r.tag) {
              case 5: {
                const l = r.stateNode;
                32 & r.flags && (de(l, ""), (r.flags &= -33)), si(e, oi(e), l);
                break;
              }
              case 3:
              case 4: {
                const u = r.stateNode.containerInfo;
                ii(e, oi(e), u);
                break;
              }
              default:
                throw Error(a(161));
            }
          } catch (n) {
            Es(e, e.return, n);
          }
          e.flags &= -3;
        }
        4096 & n && (e.flags &= -4097);
      }
      function yi(e, n, t) {
        (Zo = e), bi(e, n, t);
      }
      function bi(e, n, t) {
        for (const r = 0 !== (1 & e.mode); null !== Zo; ) {
          const l = Zo;
          let a = l.child;
          if (22 === l.tag && r) {
            let u = null !== l.memoizedState || Yo;
            if (!u) {
              let o = l.alternate;
              let i = (null !== o && null !== o.memoizedState) || Xo;
              o = Yo;
              const s = Xo;
              if (((Yo = u), (Xo = i) && !s))
                for (Zo = l; null !== Zo; )
                  (i = (u = Zo).child),
                    22 === u.tag && null !== u.memoizedState
                      ? Si(l)
                      : null !== i
                      ? ((i.return = u), (Zo = i))
                      : Si(l);
              while (null !== a) (Zo = a), bi(a, n, t), (a = a.sibling);
              (Zo = l), (Yo = o), (Xo = s);
            }
            ki(e);
          } else
            0 !== (8772 & l.subtreeFlags) && null !== a
              ? ((a.return = l), (Zo = a))
              : ki(e);
        }
      }
      function ki(e) {
        while (null !== Zo) {
          const n = Zo;
          if (0 !== (8772 & n.flags)) {
            let t = n.alternate;
            try {
              if (0 !== (8772 & n.flags))
                switch (n.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Xo || ri(5, n);
                    break;
                  case 1: {
                    const r = n.stateNode;
                    if (4 & n.flags && !Xo)
                      if (null === t) r.componentDidMount();
                      else {
                        const l =
                          n.elementType === n.type
                            ? t.memoizedProps
                            : ga(n.type, t.memoizedProps);
                        r.componentDidUpdate(
                          l,
                          t.memoizedState,
                          r.__reactInternalSnapshotBeforeUpdate,
                        );
                      }
                    const u = n.updateQueue;
                    null !== u && Ua(n, u, r);
                    break;
                  }
                  case 3: {
                    const o = n.updateQueue;
                    if (null !== o) {
                      if (((t = null), null !== n.child))
                        switch (n.child.tag) {
                          case 5:
                          case 1:
                            t = n.child.stateNode;
                        }
                      Ua(n, o, t);
                    }
                    break;
                  }
                  case 5: {
                    const i = n.stateNode;
                    if (null === t && 4 & n.flags) {
                      t = i;
                      const s = n.memoizedProps;
                      switch (n.type) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                          s.autoFocus && t.focus();
                          break;
                        case "img":
                          s.src && (t.src = s.src);
                      }
                    }
                    break;
                  }
                  case 6:
                  case 4:
                  case 12:
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                  case 25:
                    break;
                  case 13:
                    if (null === n.memoizedState) {
                      const c = n.alternate;
                      if (null !== c) {
                        const f = c.memoizedState;
                        if (null !== f) {
                          const d = f.dehydrated;
                          null !== d && Wn(d);
                        }
                      }
                    }
                    break;
                  default:
                    throw Error(a(163));
                }
              Xo || (512 & n.flags && li(n));
            } catch (e) {
              Es(n, n.return, e);
            }
          }
          if (n === e) {
            Zo = null;
            break;
          }
          if (null !== (t = n.sibling)) {
            (t.return = n.return), (Zo = t);
            break;
          }
          Zo = n.return;
        }
      }
      function wi(e) {
        while (null !== Zo) {
          const n = Zo;
          if (n === e) {
            Zo = null;
            break;
          }
          const t = n.sibling;
          if (null !== t) {
            (t.return = n.return), (Zo = t);
            break;
          }
          Zo = n.return;
        }
      }
      function Si(e) {
        while (null !== Zo) {
          const n = Zo;
          try {
            switch (n.tag) {
              case 0:
              case 11:
              case 15: {
                const t = n.return;
                try {
                  ri(4, n);
                } catch (e) {
                  Es(n, t, e);
                }
                break;
              }
              case 1: {
                const r = n.stateNode;
                if ("function" === typeof r.componentDidMount) {
                  const l = n.return;
                  try {
                    r.componentDidMount();
                  } catch (e) {
                    Es(n, l, e);
                  }
                }
                const a = n.return;
                try {
                  li(n);
                } catch (e) {
                  Es(n, a, e);
                }
                break;
              }
              case 5: {
                const u = n.return;
                try {
                  li(n);
                } catch (e) {
                  Es(n, u, e);
                }
              }
            }
          } catch (e) {
            Es(n, n.return, e);
          }
          if (n === e) {
            Zo = null;
            break;
          }
          const o = n.sibling;
          if (null !== o) {
            (o.return = n.return), (Zo = o);
            break;
          }
          Zo = n.return;
        }
      }
      let xi;
      const Ei = Math.ceil;
      const Ci = k.ReactCurrentDispatcher;
      const _i = k.ReactCurrentOwner;
      const zi = k.ReactCurrentBatchConfig;
      let Ni = 0;
      let Pi = null;
      let Ti = null;
      let Li = 0;
      let Mi = 0;
      const Fi = El(0);
      let Di = 0;
      let Ri = null;
      let Oi = 0;
      let Ii = 0;
      let Ui = 0;
      let Vi = null;
      let Ai = null;
      let Bi = 0;
      let Hi = 1 / 0;
      let Wi = null;
      let Qi = !1;
      let ji = null;
      let $i = null;
      let Ki = !1;
      let qi = null;
      let Yi = 0;
      let Xi = 0;
      let Gi = null;
      let Zi = -1;
      let Ji = 0;
      function es() {
        return 0 !== (6 & Ni) ? Ge() : -1 !== Zi ? Zi : (Zi = Ge());
      }
      function ns(e) {
        return 0 === (1 & e.mode)
          ? 1
          : 0 !== (2 & Ni) && 0 !== Li
          ? Li & -Li
          : null !== ha.transition
          ? (0 === Ji && (Ji = gn()), Ji)
          : 0 !== (e = kn)
          ? e
          : (e = void 0 === (e = window.event) ? 16 : Gn(e.type));
      }
      function ts(e, n, t, r) {
        if (50 < Xi) throw ((Xi = 0), (Gi = null), Error(a(185)));
        yn(e, t, r),
          (0 !== (2 & Ni) && e === Pi) ||
            (e === Pi && (0 === (2 & Ni) && (Ii |= t), 4 === Di && os(e, Li)),
            rs(e, r),
            1 === t &&
              0 === Ni &&
              0 === (1 & n.mode) &&
              ((Hi = Ge() + 500), Vl && Hl()));
      }
      function rs(e, n) {
        let t = e.callbackNode;
        !((e, n) => {
          for (
            let t = e.suspendedLanes,
              r = e.pingedLanes,
              l = e.expirationTimes,
              a = e.pendingLanes;
            0 < a;

          ) {
            const u = 31 - un(a);
            const o = 1 << u;
            const i = l[u];
            -1 === i
              ? (0 !== (o & t) && 0 === (o & r)) || (l[u] = mn(o, n))
              : i <= n && (e.expiredLanes |= o),
              (a &= ~o);
          }
        })(e, n);
        const r = pn(e, e === Pi ? Li : 0);
        if (0 === r)
          null !== t && qe(t),
            (e.callbackNode = null),
            (e.callbackPriority = 0);
        else if (((n = r & -r), e.callbackPriority !== n)) {
          if ((null != t && qe(t), 1 === n))
            0 === e.tag
              ? ((e) => {
                  (Vl = !0), Bl(e);
                })(is.bind(null, e))
              : Bl(is.bind(null, e)),
              ul(() => {
                0 === (6 & Ni) && Hl();
              }),
              (t = null);
          else {
            switch (wn(r)) {
              case 1:
                t = Je;
                break;
              case 4:
                t = en;
                break;
              default:
                t = nn;
                break;
              case 536870912:
                t = rn;
            }
            t = Ps(t, ls.bind(null, e));
          }
          (e.callbackPriority = n), (e.callbackNode = t);
        }
      }
      function ls(e, n) {
        if (((Zi = -1), (Ji = 0), 0 !== (6 & Ni))) throw Error(a(327));
        let t = e.callbackNode;
        if (Ss() && e.callbackNode !== t) return null;
        let r = pn(e, e === Pi ? Li : 0);
        if (0 === r) return null;
        if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || n) n = gs(e, r);
        else {
          n = r;
          const l = Ni;
          Ni |= 2;
          const u = ms();
          for (
            (Pi === e && Li === n) ||
            ((Wi = null), (Hi = Ge() + 500), ds(e, n));
            ;

          )
            try {
              ys();
              break;
            } catch (n) {
              ps(e, n);
            }
          wa(),
            (Ci.current = u),
            (Ni = l),
            null !== Ti ? (n = 0) : ((Pi = null), (Li = 0), (n = Di));
        }
        if (0 !== n) {
          if (
            (2 === n && 0 !== (l = hn(e)) && ((r = l), (n = as(e, l))), 1 === n)
          )
            throw ((t = Ri), ds(e, 0), os(e, r), rs(e, Ge()), t);
          if (6 === n) os(e, r);
          else {
            if (
              ((l = e.current.alternate),
              0 === (30 & r) &&
                !((e) => {
                  for (let n = e; ; ) {
                    if (16384 & n.flags) {
                      let t = n.updateQueue;
                      if (null !== t && null !== (t = t.stores))
                        for (let r = 0; r < t.length; r++) {
                          let l = t[r];
                          const a = l.getSnapshot;
                          l = l.value;
                          try {
                            if (!or(a(), l)) return !1;
                          } catch (e) {
                            return !1;
                          }
                        }
                    }
                    if (((t = n.child), 16384 & n.subtreeFlags && null !== t))
                      (t.return = n), (n = t);
                    else {
                      if (n === e) break;
                      while (null === n.sibling) {
                        if (null === n.return || n.return === e) return !0;
                        n = n.return;
                      }
                      (n.sibling.return = n.return), (n = n.sibling);
                    }
                  }
                  return !0;
                })(l) &&
                (2 === (n = gs(e, r)) &&
                  0 !== (u = hn(e)) &&
                  ((r = u), (n = as(e, u))),
                1 === n))
            )
              throw ((t = Ri), ds(e, 0), os(e, r), rs(e, Ge()), t);
            switch (((e.finishedWork = l), (e.finishedLanes = r), n)) {
              case 0:
              case 1:
                throw Error(a(345));
              case 2:
              case 5:
                ws(e, Ai, Wi);
                break;
              case 3:
                if (
                  (os(e, r),
                  (130023424 & r) === r && 10 < (n = Bi + 500 - Ge()))
                ) {
                  if (0 !== pn(e, 0)) break;
                  if (((l = e.suspendedLanes) & r) !== r) {
                    es(), (e.pingedLanes |= e.suspendedLanes & l);
                    break;
                  }
                  e.timeoutHandle = rl(ws.bind(null, e, Ai, Wi), n);
                  break;
                }
                ws(e, Ai, Wi);
                break;
              case 4:
                if ((os(e, r), (4194240 & r) === r)) break;
                for (n = e.eventTimes, l = -1; 0 < r; ) {
                  let o = 31 - un(r);
                  (u = 1 << o), (o = n[o]) > l && (l = o), (r &= ~u);
                }
                if (
                  ((r = l),
                  10 <
                    (r =
                      (120 > (r = Ge() - r)
                        ? 120
                        : 480 > r
                        ? 480
                        : 1080 > r
                        ? 1080
                        : 1920 > r
                        ? 1920
                        : 3e3 > r
                        ? 3e3
                        : 4320 > r
                        ? 4320
                        : 1960 * Ei(r / 1960)) - r))
                ) {
                  e.timeoutHandle = rl(ws.bind(null, e, Ai, Wi), r);
                  break;
                }
                ws(e, Ai, Wi);
                break;
              default:
                throw Error(a(329));
            }
          }
        }
        return rs(e, Ge()), e.callbackNode === t ? ls.bind(null, e) : null;
      }
      function as(e, n) {
        const t = Vi;
        return (
          e.current.memoizedState.isDehydrated && (ds(e, n).flags |= 256),
          2 !== (e = gs(e, n)) && ((n = Ai), (Ai = t), null !== n && us(n)),
          e
        );
      }
      function us(e) {
        null === Ai ? (Ai = e) : Ai.push.apply(Ai, e);
      }
      function os(e, n) {
        for (
          n &= ~Ui,
            n &= ~Ii,
            e.suspendedLanes |= n,
            e.pingedLanes &= ~n,
            e = e.expirationTimes;
          0 < n;

        ) {
          const t = 31 - un(n);
          const r = 1 << t;
          (e[t] = -1), (n &= ~r);
        }
      }
      function is(e) {
        if (0 !== (6 & Ni)) throw Error(a(327));
        Ss();
        let n = pn(e, 0);
        if (0 === (1 & n)) return rs(e, Ge()), null;
        let t = gs(e, n);
        if (0 !== e.tag && 2 === t) {
          const r = hn(e);
          0 !== r && ((n = r), (t = as(e, r)));
        }
        if (1 === t) throw ((t = Ri), ds(e, 0), os(e, n), rs(e, Ge()), t);
        if (6 === t) throw Error(a(345));
        return (
          (e.finishedWork = e.current.alternate),
          (e.finishedLanes = n),
          ws(e, Ai, Wi),
          rs(e, Ge()),
          null
        );
      }
      function ss(e, n) {
        const t = Ni;
        Ni |= 1;
        try {
          return e(n);
        } finally {
          0 === (Ni = t) && ((Hi = Ge() + 500), Vl && Hl());
        }
      }
      function cs(e) {
        null !== qi && 0 === qi.tag && 0 === (6 & Ni) && Ss();
        const n = Ni;
        Ni |= 1;
        const t = zi.transition;
        const r = kn;
        try {
          if (((zi.transition = null), (kn = 1), e)) return e();
        } finally {
          (kn = r), (zi.transition = t), 0 === (6 & (Ni = n)) && Hl();
        }
      }
      function fs() {
        (Mi = Fi.current), Cl(Fi);
      }
      function ds(e, n) {
        (e.finishedWork = null), (e.finishedLanes = 0);
        let t = e.timeoutHandle;
        if ((-1 !== t && ((e.timeoutHandle = -1), ll(t)), null !== Ti))
          for (t = Ti.return; null !== t; ) {
            let r = t;
            switch ((na(r), r.tag)) {
              case 1:
                null != (r = r.type.childContextTypes) && Fl();
                break;
              case 3:
                lu(), Cl(Pl), Cl(Nl), cu();
                break;
              case 5:
                uu(r);
                break;
              case 4:
                lu();
                break;
              case 13:
              case 19:
                Cl(ou);
                break;
              case 10:
                Sa(r.type._context);
                break;
              case 22:
              case 23:
                fs();
            }
            t = t.return;
          }
        if (
          ((Pi = e),
          (Ti = e = Fs(e.current, null)),
          (Li = Mi = n),
          (Di = 0),
          (Ri = null),
          (Ui = Ii = Oi = 0),
          (Ai = Vi = null),
          null !== _a)
        ) {
          for (n = 0; n < _a.length; n++)
            if (null !== (r = (t = _a[n]).interleaved)) {
              t.interleaved = null;
              const l = r.next;
              const a = t.pending;
              if (null !== a) {
                const u = a.next;
                (a.next = l), (r.next = u);
              }
              t.pending = r;
            }
          _a = null;
        }
        return e;
      }
      function ps(e, n) {
        for (;;) {
          let t = Ti;
          try {
            if ((wa(), (fu.current = ao), vu)) {
              for (let r = mu.memoizedState; null !== r; ) {
                const l = r.queue;
                null !== l && (l.pending = null), (r = r.next);
              }
              vu = !1;
            }
            if (
              ((pu = 0),
              (gu = hu = mu = null),
              (yu = !1),
              (bu = 0),
              (_i.current = null),
              null === t || null === t.return)
            ) {
              (Di = 1), (Ri = n), (Ti = null);
              break;
            }
            e: {
              let u = e;
              const o = t.return;
              let i = t;
              let s = n;
              if (
                ((n = Li),
                (i.flags |= 32768),
                null !== s &&
                  "object" === typeof s &&
                  "function" === typeof s.then)
              ) {
                const c = s;
                const f = i;
                const d = f.tag;
                if (0 === (1 & f.mode) && (0 === d || 11 === d || 15 === d)) {
                  const p = f.alternate;
                  p
                    ? ((f.updateQueue = p.updateQueue),
                      (f.memoizedState = p.memoizedState),
                      (f.lanes = p.lanes))
                    : ((f.updateQueue = null), (f.memoizedState = null));
                }
                const m = vo(o);
                if (null !== m) {
                  (m.flags &= -257),
                    yo(m, o, i, 0, n),
                    1 & m.mode && go(u, c, n),
                    (s = c);
                  const h = (n = m).updateQueue;
                  if (null === h) {
                    const g = new Set();
                    g.add(s), (n.updateQueue = g);
                  } else h.add(s);
                  break e;
                }
                if (0 === (1 & n)) {
                  go(u, c, n), hs();
                  break e;
                }
                s = Error(a(426));
              } else if (la && 1 & i.mode) {
                const v = vo(o);
                if (null !== v) {
                  0 === (65536 & v.flags) && (v.flags |= 256),
                    yo(v, o, i, 0, n),
                    ma(so(s, i));
                  break e;
                }
              }
              (u = s = so(s, i)),
                4 !== Di && (Di = 2),
                null === Vi ? (Vi = [u]) : Vi.push(u),
                (u = o);
              do {
                switch (u.tag) {
                  case 3:
                    (u.flags |= 65536),
                      (n &= -n),
                      (u.lanes |= n),
                      Oa(u, mo(0, s, n));
                    break e;
                  case 1: {
                    i = s;
                    const y = u.type;
                    const b = u.stateNode;
                    if (
                      0 === (128 & u.flags) &&
                      ("function" === typeof y.getDerivedStateFromError ||
                        (null !== b &&
                          "function" === typeof b.componentDidCatch &&
                          (null === $i || !$i.has(b))))
                    ) {
                      (u.flags |= 65536),
                        (n &= -n),
                        (u.lanes |= n),
                        Oa(u, ho(u, i, n));
                      break e;
                    }
                  }
                }
                u = u.return;
              } while (null !== u);
            }
            ks(t);
          } catch (e) {
            (n = e), Ti === t && null !== t && (Ti = t = t.return);
            continue;
          }
          break;
        }
      }
      function ms() {
        const e = Ci.current;
        return (Ci.current = ao), null === e ? ao : e;
      }
      function hs() {
        (0 !== Di && 3 !== Di && 2 !== Di) || (Di = 4),
          null === Pi ||
            (0 === (268435455 & Oi) && 0 === (268435455 & Ii)) ||
            os(Pi, Li);
      }
      function gs(e, n) {
        const t = Ni;
        Ni |= 2;
        const r = ms();
        for ((Pi === e && Li === n) || ((Wi = null), ds(e, n)); ; )
          try {
            vs();
            break;
          } catch (n) {
            ps(e, n);
          }
        if ((wa(), (Ni = t), (Ci.current = r), null !== Ti))
          throw Error(a(261));
        return (Pi = null), (Li = 0), Di;
      }
      function vs() {
        while (null !== Ti) bs(Ti);
      }
      function ys() {
        while (null !== Ti && !Ye()) bs(Ti);
      }
      function bs(e) {
        const n = xi(e.alternate, e, Mi);
        (e.memoizedProps = e.pendingProps),
          null === n ? ks(e) : (Ti = n),
          (_i.current = null);
      }
      function ks(e) {
        let n = e;
        do {
          let t = n.alternate;
          if (((e = n.return), 0 === (32768 & n.flags))) {
            if (null !== (t = Ko(t, n, Mi))) return void (Ti = t);
          } else {
            if (null !== (t = qo(t, n)))
              return (t.flags &= 32767), void (Ti = t);
            if (null === e) return (Di = 6), void (Ti = null);
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          }
          if (null !== (n = n.sibling)) return void (Ti = n);
          Ti = n = e;
        } while (null !== n);
        0 === Di && (Di = 5);
      }
      function ws(e, n, t) {
        const r = kn;
        const l = zi.transition;
        try {
          (zi.transition = null),
            (kn = 1),
            ((e, n, t, r) => {
              do {
                Ss();
              } while (null !== qi);
              if (0 !== (6 & Ni)) throw Error(a(327));
              t = e.finishedWork;
              let l = e.finishedLanes;
              if (null === t) return null;
              if (
                ((e.finishedWork = null),
                (e.finishedLanes = 0),
                t === e.current)
              )
                throw Error(a(177));
              (e.callbackNode = null), (e.callbackPriority = 0);
              let u = t.lanes | t.childLanes;
              if (
                (((e, n) => {
                  let t = e.pendingLanes & ~n;
                  (e.pendingLanes = n),
                    (e.suspendedLanes = 0),
                    (e.pingedLanes = 0),
                    (e.expiredLanes &= n),
                    (e.mutableReadLanes &= n),
                    (e.entangledLanes &= n),
                    (n = e.entanglements);
                  const r = e.eventTimes;
                  for (e = e.expirationTimes; 0 < t; ) {
                    const l = 31 - un(t);
                    const a = 1 << l;
                    (n[l] = 0), (r[l] = -1), (e[l] = -1), (t &= ~a);
                  }
                })(e, u),
                e === Pi && ((Ti = Pi = null), (Li = 0)),
                (0 === (2064 & t.subtreeFlags) && 0 === (2064 & t.flags)) ||
                  Ki ||
                  ((Ki = !0),
                  Ps(nn, () => Ss(), null)),
                (u = 0 !== (15990 & t.flags)),
                0 !== (15990 & t.subtreeFlags) || u)
              ) {
                (u = zi.transition), (zi.transition = null);
                const o = kn;
                kn = 1;
                const i = Ni;
                (Ni |= 4),
                  (_i.current = null),
                  ((e, n) => {
                    if (((el = jn), pr((e = dr())))) {
                      if ("selectionStart" in e)
                        let t = {
                          start: e.selectionStart,
                          end: e.selectionEnd,
                        };
                      else
                        e: {
                          let r =
                            (t =
                              ((t = e.ownerDocument) && t.defaultView) ||
                              window).getSelection && t.getSelection();
                          if (r && 0 !== r.rangeCount) {
                            t = r.anchorNode;
                            const l = r.anchorOffset;
                            const u = r.focusNode;
                            r = r.focusOffset;
                            try {
                              t.nodeType, u.nodeType;
                            } catch (e) {
                              t = null;
                              break e;
                            }
                            let o = 0;
                            let i = -1;
                            let s = -1;
                            let c = 0;
                            let f = 0;
                            let d = e;
                            let p = null;
                            n: for (;;) {
                              for (
                                let m;
                                d !== t ||
                                  (0 !== l && 3 !== d.nodeType) ||
                                  (i = o + l),
                                  d !== u ||
                                    (0 !== r && 3 !== d.nodeType) ||
                                    (s = o + r),
                                  3 === d.nodeType && (o += d.nodeValue.length),
                                  null !== (m = d.firstChild);

                              )
                                (p = d), (d = m);
                              for (;;) {
                                if (d === e) break n;
                                if (
                                  (p === t && ++c === l && (i = o),
                                  p === u && ++f === r && (s = o),
                                  null !== (m = d.nextSibling))
                                )
                                  break;
                                p = (d = p).parentNode;
                              }
                              d = m;
                            }
                            t =
                              -1 === i || -1 === s
                                ? null
                                : { start: i, end: s };
                          } else t = null;
                        }
                      t = t || { start: 0, end: 0 };
                    } else t = null;
                    for (
                      nl = { focusedElem: e, selectionRange: t },
                        jn = !1,
                        Zo = n;
                      null !== Zo;

                    )
                      if (
                        ((e = (n = Zo).child),
                        0 !== (1028 & n.subtreeFlags) && null !== e)
                      )
                        (e.return = n), (Zo = e);
                      else
                        while (null !== Zo) {
                          n = Zo;
                          try {
                            const h = n.alternate;
                            if (0 !== (1024 & n.flags))
                              switch (n.tag) {
                                case 0:
                                case 11:
                                case 15:
                                case 5:
                                case 6:
                                case 4:
                                case 17:
                                  break;
                                case 1:
                                  if (null !== h) {
                                    const g = h.memoizedProps;
                                    const v = h.memoizedState;
                                    const y = n.stateNode;
                                    const b = y.getSnapshotBeforeUpdate(
                                        n.elementType === n.type
                                          ? g
                                          : ga(n.type, g),
                                        v,
                                      );
                                    y.__reactInternalSnapshotBeforeUpdate = b;
                                  }
                                  break;
                                case 3: {
                                  const k = n.stateNode.containerInfo;
                                  1 === k.nodeType
                                    ? (k.textContent = "")
                                    : 9 === k.nodeType &&
                                      k.documentElement &&
                                      k.removeChild(k.documentElement);
                                  break;
                                }
                                default:
                                  throw Error(a(163));
                              }
                          } catch (e) {
                            Es(n, n.return, e);
                          }
                          if (null !== (e = n.sibling)) {
                            (e.return = n.return), (Zo = e);
                            break;
                          }
                          Zo = n.return;
                        }
                    (h = ni), (ni = !1);
                  })(e, t),
                  gi(t, e),
                  mr(nl),
                  (jn = !!el),
                  (nl = el = null),
                  (e.current = t),
                  yi(t, e, l),
                  Xe(),
                  (Ni = i),
                  (kn = o),
                  (zi.transition = u);
              } else e.current = t;
              if (
                (Ki && ((Ki = !1), (qi = e), (Yi = l)),
                0 === (u = e.pendingLanes) && ($i = null),
                ((e) => {
                  if (an && "function" === typeof an.onCommitFiberRoot)
                    try {
                      an.onCommitFiberRoot(
                        ln,
                        e,
                        void 0,
                        128 === (128 & e.current.flags),
                      );
                    } catch (e) {}
                })(t.stateNode),
                rs(e, Ge()),
                null !== n)
              )
                for (r = e.onRecoverableError, t = 0; t < n.length; t++)
                  (l = n[t]),
                    r(l.value, { componentStack: l.stack, digest: l.digest });
              if (Qi) throw ((Qi = !1), (e = ji), (ji = null), e);
              0 !== (1 & Yi) && 0 !== e.tag && Ss(),
                0 !== (1 & (u = e.pendingLanes))
                  ? e === Gi
                    ? Xi++
                    : ((Xi = 0), (Gi = e))
                  : (Xi = 0),
                Hl();
            })(e, n, t, r);
        } finally {
          (zi.transition = l), (kn = r);
        }
        return null;
      }
      function Ss() {
        if (null !== qi) {
          let e = wn(Yi);
          const n = zi.transition;
          const t = kn;
          try {
            if (((zi.transition = null), (kn = 16 > e ? 16 : e), null === qi))
              let r = !1;
            else {
              if (((e = qi), (qi = null), (Yi = 0), 0 !== (6 & Ni)))
                throw Error(a(331));
              const l = Ni;
              for (Ni |= 4, Zo = e.current; null !== Zo; ) {
                let u = Zo;
                const o = u.child;
                if (0 !== (16 & Zo.flags)) {
                  const i = u.deletions;
                  if (null !== i) {
                    for (let s = 0; s < i.length; s++) {
                      const c = i[s];
                      for (Zo = c; null !== Zo; ) {
                        let f = Zo;
                        switch (f.tag) {
                          case 0:
                          case 11:
                          case 15:
                            ti(8, f, u);
                        }
                        const d = f.child;
                        if (null !== d) (d.return = f), (Zo = d);
                        else
                          while (null !== Zo) {
                            const p = (f = Zo).sibling;
                            const m = f.return;
                            if ((ai(f), f === c)) {
                              Zo = null;
                              break;
                            }
                            if (null !== p) {
                              (p.return = m), (Zo = p);
                              break;
                            }
                            Zo = m;
                          }
                      }
                    }
                    const h = u.alternate;
                    if (null !== h) {
                      let g = h.child;
                      if (null !== g) {
                        h.child = null;
                        do {
                          const v = g.sibling;
                          (g.sibling = null), (g = v);
                        } while (null !== g);
                      }
                    }
                    Zo = u;
                  }
                }
                if (0 !== (2064 & u.subtreeFlags) && null !== o)
                  (o.return = u), (Zo = o);
                else
                  while (null !== Zo) {
                    if (0 !== (2048 & (u = Zo).flags))
                      switch (u.tag) {
                        case 0:
                        case 11:
                        case 15:
                          ti(9, u, u.return);
                      }
                    const y = u.sibling;
                    if (null !== y) {
                      (y.return = u.return), (Zo = y);
                      break;
                    }
                    Zo = u.return;
                  }
              }
              const b = e.current;
              for (Zo = b; null !== Zo; ) {
                const k = (o = Zo).child;
                if (0 !== (2064 & o.subtreeFlags) && null !== k)
                  (k.return = o), (Zo = k);
                else
                  for (o = b; null !== Zo; ) {
                    if (0 !== (2048 & (i = Zo).flags))
                      try {
                        switch (i.tag) {
                          case 0:
                          case 11:
                          case 15:
                            ri(9, i);
                        }
                      } catch (e) {
                        Es(i, i.return, e);
                      }
                    if (i === o) {
                      Zo = null;
                      break;
                    }
                    const w = i.sibling;
                    if (null !== w) {
                      (w.return = i.return), (Zo = w);
                      break;
                    }
                    Zo = i.return;
                  }
              }
              if (
                ((Ni = l),
                Hl(),
                an && "function" === typeof an.onPostCommitFiberRoot)
              )
                try {
                  an.onPostCommitFiberRoot(ln, e);
                } catch (e) {}
              r = !0;
            }
            return r;
          } finally {
            (kn = t), (zi.transition = n);
          }
        }
        return !1;
      }
      function xs(e, n, t) {
        (e = Da(e, (n = mo(0, (n = so(t, n)), 1)), 1)),
          (n = es()),
          null !== e && (yn(e, 1, n), rs(e, n));
      }
      function Es(e, n, t) {
        if (3 === e.tag) xs(e, e, t);
        else
          while (null !== n) {
            if (3 === n.tag) {
              xs(n, e, t);
              break;
            }
            if (1 === n.tag) {
              const r = n.stateNode;
              if (
                "function" === typeof n.type.getDerivedStateFromError ||
                ("function" === typeof r.componentDidCatch &&
                  (null === $i || !$i.has(r)))
              ) {
                (n = Da(n, (e = ho(n, (e = so(t, e)), 1)), 1)),
                  (e = es()),
                  null !== n && (yn(n, 1, e), rs(n, e));
                break;
              }
            }
            n = n.return;
          }
      }
      function Cs(e, n, t) {
        const r = e.pingCache;
        null !== r && r.delete(n),
          (n = es()),
          (e.pingedLanes |= e.suspendedLanes & t),
          Pi === e &&
            (Li & t) === t &&
            (4 === Di ||
            (3 === Di && (130023424 & Li) === Li && 500 > Ge() - Bi)
              ? ds(e, 0)
              : (Ui |= t)),
          rs(e, n);
      }
      function _s(e, n) {
        0 === n &&
          (0 === (1 & e.mode)
            ? (n = 1)
            : ((n = fn), 0 === (130023424 & (fn <<= 1)) && (fn = 4194304)));
        const t = es();
        null !== (e = Pa(e, n)) && (yn(e, n, t), rs(e, t));
      }
      function zs(e) {
        const n = e.memoizedState;
        let t = 0;
        null !== n && (t = n.retryLane), _s(e, t);
      }
      function Ns(e, n) {
        let t = 0;
        switch (e.tag) {
          case 13: {
            const r = e.stateNode;
            const l = e.memoizedState;
            null !== l && (t = l.retryLane);
            break;
          }
          case 19:
            r = e.stateNode;
            break;
          default:
            throw Error(a(314));
        }
        null !== r && r.delete(n), _s(e, t);
      }
      function Ps(e, n) {
        return Ke(e, n);
      }
      function Ts(e, n, t, r) {
        (this.tag = e),
          (this.key = t),
          (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
              null),
          (this.index = 0),
          (this.ref = null),
          (this.pendingProps = n),
          (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
              null),
          (this.mode = r),
          (this.subtreeFlags = this.flags = 0),
          (this.deletions = null),
          (this.childLanes = this.lanes = 0),
          (this.alternate = null);
      }
      function Ls(e, n, t, r) {
        return new Ts(e, n, t, r);
      }
      function Ms(e) {
        return !(!(e = e.prototype) || !e.isReactComponent);
      }
      function Fs(e, n) {
        let t = e.alternate;
        return (
          null === t
            ? (((t = Ls(e.tag, n, e.key, e.mode)).elementType = e.elementType),
              (t.type = e.type),
              (t.stateNode = e.stateNode),
              (t.alternate = e),
              (e.alternate = t))
            : ((t.pendingProps = n),
              (t.type = e.type),
              (t.flags = 0),
              (t.subtreeFlags = 0),
              (t.deletions = null)),
          (t.flags = 14680064 & e.flags),
          (t.childLanes = e.childLanes),
          (t.lanes = e.lanes),
          (t.child = e.child),
          (t.memoizedProps = e.memoizedProps),
          (t.memoizedState = e.memoizedState),
          (t.updateQueue = e.updateQueue),
          (n = e.dependencies),
          (t.dependencies =
            null === n
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext }),
          (t.sibling = e.sibling),
          (t.index = e.index),
          (t.ref = e.ref),
          t
        );
      }
      function Ds(e, n, t, r, l, u) {
        let o = 2;
        if (((r = e), "function" === typeof e)) Ms(e) && (o = 1);
        else if ("string" === typeof e) o = 5;
        else
          e: switch (e) {
            case x:
              return Rs(t.children, l, u, n);
            case E:
              (o = 8), (l |= 8);
              break;
            case C:
              return (
                ((e = Ls(12, t, n, 2 | l)).elementType = C), (e.lanes = u), e
              );
            case P:
              return ((e = Ls(13, t, n, l)).elementType = P), (e.lanes = u), e;
            case T:
              return ((e = Ls(19, t, n, l)).elementType = T), (e.lanes = u), e;
            case F:
              return Os(t, l, u, n);
            default:
              if ("object" === typeof e && null !== e)
                switch (e.$$typeof) {
                  case _:
                    o = 10;
                    break e;
                  case z:
                    o = 9;
                    break e;
                  case N:
                    o = 11;
                    break e;
                  case L:
                    o = 14;
                    break e;
                  case M:
                    (o = 16), (r = null);
                    break e;
                }
              throw Error(a(130, null == e ? e : typeof e, ""));
          }
        return (
          ((n = Ls(o, t, n, l)).elementType = e), (n.type = r), (n.lanes = u), n
        );
      }
      function Rs(e, n, t, r) {
        return ((e = Ls(7, e, r, n)).lanes = t), e;
      }
      function Os(e, n, t, r) {
        return (
          ((e = Ls(22, e, r, n)).elementType = F),
          (e.lanes = t),
          (e.stateNode = { isHidden: !1 }),
          e
        );
      }
      function Is(e, n, t) {
        return ((e = Ls(6, e, null, n)).lanes = t), e;
      }
      function Us(e, n, t) {
        return (
          ((n = Ls(4, null !== e.children ? e.children : [], e.key, n)).lanes =
            t),
          (n.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
          }),
          n
        );
      }
      function Vs(e, n, t, r, l) {
        (this.tag = n),
          (this.containerInfo = e),
          (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
              null),
          (this.timeoutHandle = -1),
          (this.callbackNode = this.pendingContext = this.context = null),
          (this.callbackPriority = 0),
          (this.eventTimes = vn(0)),
          (this.expirationTimes = vn(-1)),
          (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
              0),
          (this.entanglements = vn(0)),
          (this.identifierPrefix = r),
          (this.onRecoverableError = l),
          (this.mutableSourceEagerHydrationData = null);
      }
      function As(e, n, t, r, l, a, u, o, i) {
        return (
          (e = new Vs(e, n, t, o, i)),
          1 === n ? ((n = 1), !0 === a && (n |= 8)) : (n = 0),
          (a = Ls(3, null, null, n)),
          (e.current = a),
          (a.stateNode = e),
          (a.memoizedState = {
            element: r,
            isDehydrated: t,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
          }),
          La(a),
          e
        );
      }
      function Bs(e, n, t) {
        const r =
          3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: S,
          key: null == r ? null : `${r}`,
          children: e,
          containerInfo: n,
          implementation: t,
        };
      }
      function Hs(e) {
        if (!e) return zl;
        e: {
          if (He((e = e._reactInternals)) !== e || 1 !== e.tag)
            throw Error(a(170));
          let n = e;
          do {
            switch (n.tag) {
              case 3:
                n = n.stateNode.context;
                break e;
              case 1:
                if (Ml(n.type)) {
                  n = n.stateNode.__reactInternalMemoizedMergedChildContext;
                  break e;
                }
            }
            n = n.return;
          } while (null !== n);
          throw Error(a(171));
        }
        if (1 === e.tag) {
          const t = e.type;
          if (Ml(t)) return Rl(e, t, n);
        }
        return n;
      }
      function Ws(e, n, t, r, l, a, u, o, i) {
        return (
          ((e = As(t, r, !0, e, 0, a, 0, o, i)).context = Hs(null)),
          (t = e.current),
          ((a = Fa((r = es()), (l = ns(t)))).callback = null != n ? n : null),
          Da(t, a, l),
          (e.current.lanes = l),
          yn(e, l, r),
          rs(e, r),
          e
        );
      }
      function Qs(e, n, t, r) {
        const l = n.current;
        const a = es();
        const u = ns(l);
        return (
          (t = Hs(t)),
          null === n.context ? (n.context = t) : (n.pendingContext = t),
          ((n = Fa(a, u)).payload = { element: e }),
          null !== (r = void 0 === r ? null : r) && (n.callback = r),
          null !== (e = Da(l, n, u)) && (ts(e, l, u, a), Ra(e, l, u)),
          u
        );
      }
      function js(e) {
        return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
      }
      function $s(e, n) {
        if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
          const t = e.retryLane;
          e.retryLane = 0 !== t && t < n ? t : n;
        }
      }
      function Ks(e, n) {
        $s(e, n), (e = e.alternate) && $s(e, n);
      }
      xi = (e, n, t) => {
        if (null !== e)
          if (e.memoizedProps !== n.pendingProps || Pl.current) ko = !0;
          else {
            if (0 === (e.lanes & t) && 0 === (128 & n.flags))
              return (
                (ko = !1),
                ((e, n, t) => {
                  switch (n.tag) {
                    case 3:
                      To(n), pa();
                      break;
                    case 5:
                      au(n);
                      break;
                    case 1:
                      Ml(n.type) && Ol(n);
                      break;
                    case 4:
                      ru(n, n.stateNode.containerInfo);
                      break;
                    case 10: {
                      const r = n.type._context;
                      const l = n.memoizedProps.value;
                      _l(va, r._currentValue), (r._currentValue = l);
                      break;
                    }
                    case 13:
                      if (null !== (r = n.memoizedState))
                        return null !== r.dehydrated
                          ? (_l(ou, 1 & ou.current), (n.flags |= 128), null)
                          : 0 !== (t & n.child.childLanes)
                          ? Io(e, n, t)
                          : (_l(ou, 1 & ou.current),
                            null !== (e = Qo(e, n, t)) ? e.sibling : null);
                      _l(ou, 1 & ou.current);
                      break;
                    case 19:
                      if (
                        ((r = 0 !== (t & n.childLanes)), 0 !== (128 & e.flags))
                      ) {
                        if (r) return Ho(e, n, t);
                        n.flags |= 128;
                      }
                      if (
                        (null !== (l = n.memoizedState) &&
                          ((l.rendering = null),
                          (l.tail = null),
                          (l.lastEffect = null)),
                        _l(ou, ou.current),
                        r)
                      )
                        break;
                      return null;
                    case 22:
                    case 23:
                      return (n.lanes = 0), Co(e, n, t);
                  }
                  return Qo(e, n, t);
                })(e, n, t)
              );
            ko = 0 !== (131072 & e.flags);
          }
        else (ko = !1), la && 0 !== (1048576 & n.flags) && Jl(n, $l, n.index);
        switch (((n.lanes = 0), n.tag)) {
          case 2: {
            const r = n.type;
            Wo(e, n), (e = n.pendingProps);
            let l = Ll(n, Nl.current);
            Ea(n, t), (l = xu(null, n, r, e, l, t));
            let u = Eu();
            return (
              (n.flags |= 1),
              "object" === typeof l &&
              null !== l &&
              "function" === typeof l.render &&
              void 0 === l.$$typeof
                ? ((n.tag = 1),
                  (n.memoizedState = null),
                  (n.updateQueue = null),
                  Ml(r) ? ((u = !0), Ol(n)) : (u = !1),
                  (n.memoizedState =
                    null !== l.state && void 0 !== l.state ? l.state : null),
                  La(n),
                  (l.updater = Ba),
                  (n.stateNode = l),
                  (l._reactInternals = n),
                  ja(n, r, e, t),
                  (n = Po(null, n, r, !0, u, t)))
                : ((n.tag = 0),
                  la && u && ea(n),
                  wo(null, n, l, t),
                  (n = n.child)),
              n
            );
          }
          case 16:
            r = n.elementType;
            e: {
              switch (
                (Wo(e, n),
                (e = n.pendingProps),
                (r = (l = r._init)(r._payload)),
                (n.type = r),
                (l = n.tag =
                  ((e) => {
                    if ("function" === typeof e) return Ms(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === N) return 11;
                      if (e === L) return 14;
                    }
                    return 2;
                  })(r)),
                (e = ga(r, e)),
                l)
              ) {
                case 0:
                  n = zo(null, n, r, e, t);
                  break e;
                case 1:
                  n = No(null, n, r, e, t);
                  break e;
                case 11:
                  n = So(null, n, r, e, t);
                  break e;
                case 14:
                  n = xo(null, n, r, ga(r.type, e), t);
                  break e;
              }
              throw Error(a(306, r, ""));
            }
            return n;
          case 0:
            return (
              (r = n.type),
              (l = n.pendingProps),
              zo(e, n, r, (l = n.elementType === r ? l : ga(r, l)), t)
            );
          case 1:
            return (
              (r = n.type),
              (l = n.pendingProps),
              No(e, n, r, (l = n.elementType === r ? l : ga(r, l)), t)
            );
          case 3:
            e: {
              if ((To(n), null === e)) throw Error(a(387));
              (r = n.pendingProps),
                (l = (u = n.memoizedState).element),
                Ma(e, n),
                Ia(n, r, null, t);
              const o = n.memoizedState;
              if (((r = o.element), u.isDehydrated)) {
                if (
                  ((u = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions,
                  }),
                  (n.updateQueue.baseState = u),
                  (n.memoizedState = u),
                  256 & n.flags)
                ) {
                  n = Lo(e, n, r, t, (l = so(Error(a(423)), n)));
                  break e;
                }
                if (r !== l) {
                  n = Lo(e, n, r, t, (l = so(Error(a(424)), n)));
                  break e;
                }
                for (
                  ra = sl(n.stateNode.containerInfo.firstChild),
                    ta = n,
                    la = !0,
                    aa = null,
                    t = Ga(n, null, r, t),
                    n.child = t;
                  t;

                )
                  (t.flags = (-3 & t.flags) | 4096), (t = t.sibling);
              } else {
                if ((pa(), r === l)) {
                  n = Qo(e, n, t);
                  break e;
                }
                wo(e, n, r, t);
              }
              n = n.child;
            }
            return n;
          case 5:
            return (
              au(n),
              null === e && sa(n),
              (r = n.type),
              (l = n.pendingProps),
              (u = null !== e ? e.memoizedProps : null),
              (o = l.children),
              tl(r, l) ? (o = null) : null !== u && tl(r, u) && (n.flags |= 32),
              _o(e, n),
              wo(e, n, o, t),
              n.child
            );
          case 6:
            return null === e && sa(n), null;
          case 13:
            return Io(e, n, t);
          case 4:
            return (
              ru(n, n.stateNode.containerInfo),
              (r = n.pendingProps),
              null === e ? (n.child = Xa(n, null, r, t)) : wo(e, n, r, t),
              n.child
            );
          case 11:
            return (
              (r = n.type),
              (l = n.pendingProps),
              So(e, n, r, (l = n.elementType === r ? l : ga(r, l)), t)
            );
          case 7:
            return wo(e, n, n.pendingProps, t), n.child;
          case 8:
          case 12:
            return wo(e, n, n.pendingProps.children, t), n.child;
          case 10:
            e: {
              if (
                ((r = n.type._context),
                (l = n.pendingProps),
                (u = n.memoizedProps),
                (o = l.value),
                _l(va, r._currentValue),
                (r._currentValue = o),
                null !== u)
              )
                if (or(u.value, o)) {
                  if (u.children === l.children && !Pl.current) {
                    n = Qo(e, n, t);
                    break e;
                  }
                } else
                  for (null !== (u = n.child) && (u.return = n); null !== u; ) {
                    let i = u.dependencies;
                    if (null !== i) {
                      o = u.child;
                      for (let s = i.firstContext; null !== s; ) {
                        if (s.context === r) {
                          if (1 === u.tag) {
                            (s = Fa(-1, t & -t)).tag = 2;
                            let c = u.updateQueue;
                            if (null !== c) {
                              const f = (c = c.shared).pending;
                              null === f
                                ? (s.next = s)
                                : ((s.next = f.next), (f.next = s)),
                                (c.pending = s);
                            }
                          }
                          (u.lanes |= t),
                            null !== (s = u.alternate) && (s.lanes |= t),
                            xa(u.return, t, n),
                            (i.lanes |= t);
                          break;
                        }
                        s = s.next;
                      }
                    } else if (10 === u.tag)
                      o = u.type === n.type ? null : u.child;
                    else if (18 === u.tag) {
                      if (null === (o = u.return)) throw Error(a(341));
                      (o.lanes |= t),
                        null !== (i = o.alternate) && (i.lanes |= t),
                        xa(o, t, n),
                        (o = u.sibling);
                    } else o = u.child;
                    if (null !== o) o.return = u;
                    else
                      for (o = u; null !== o; ) {
                        if (o === n) {
                          o = null;
                          break;
                        }
                        if (null !== (u = o.sibling)) {
                          (u.return = o.return), (o = u);
                          break;
                        }
                        o = o.return;
                      }
                    u = o;
                  }
              wo(e, n, l.children, t), (n = n.child);
            }
            return n;
          case 9:
            return (
              (l = n.type),
              (r = n.pendingProps.children),
              Ea(n, t),
              (r = r((l = Ca(l)))),
              (n.flags |= 1),
              wo(e, n, r, t),
              n.child
            );
          case 14:
            return (
              (l = ga((r = n.type), n.pendingProps)),
              xo(e, n, r, (l = ga(r.type, l)), t)
            );
          case 15:
            return Eo(e, n, n.type, n.pendingProps, t);
          case 17:
            return (
              (r = n.type),
              (l = n.pendingProps),
              (l = n.elementType === r ? l : ga(r, l)),
              Wo(e, n),
              (n.tag = 1),
              Ml(r) ? ((e = !0), Ol(n)) : (e = !1),
              Ea(n, t),
              Wa(n, r, l),
              ja(n, r, l, t),
              Po(null, n, r, !0, e, t)
            );
          case 19:
            return Ho(e, n, t);
          case 22:
            return Co(e, n, t);
        }
        throw Error(a(156, n.tag));
      };
      const qs =
        "function" === typeof reportError
          ? reportError
          : (e) => {
              console.error(e);
            };
      function Ys(e) {
        this._internalRoot = e;
      }
      function Xs(e) {
        this._internalRoot = e;
      }
      function Gs(e) {
        return !(
          !e ||
          (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
        );
      }
      function Zs(e) {
        return !(
          !e ||
          (1 !== e.nodeType &&
            9 !== e.nodeType &&
            11 !== e.nodeType &&
            (8 !== e.nodeType ||
              " react-mount-point-unstable " !== e.nodeValue))
        );
      }
      function Js() {}
      function ec(e, n, t, r, l) {
        const a = t._reactRootContainer;
        if (a) {
          const u = a;
          if ("function" === typeof l) {
            const o = l;
            l = () => {
              const e = js(u);
              o.call(e);
            };
          }
          Qs(n, u, e, l);
        } else
          u = ((e, n, t, r, l) => {
            if (l) {
              if ("function" === typeof r) {
                const a = r;
                r = () => {
                  const e = js(u);
                  a.call(e);
                };
              }
              const u = Ws(n, r, e, 0, null, !1, 0, "", Js);
              return (
                (e._reactRootContainer = u),
                (e[ml] = u.current),
                Hr(8 === e.nodeType ? e.parentNode : e),
                cs(),
                u
              );
            }
            while ((l = e.lastChild)) e.removeChild(l);
            if ("function" === typeof r) {
              const o = r;
              r = () => {
                const e = js(i);
                o.call(e);
              };
            }
            const i = As(e, 0, !1, null, 0, !1, 0, "", Js);
            return (
              (e._reactRootContainer = i),
              (e[ml] = i.current),
              Hr(8 === e.nodeType ? e.parentNode : e),
              cs(() => {
                Qs(n, i, t, r);
              }),
              i
            );
          })(t, n, e, l, r);
        return js(u);
      }
      (Xs.prototype.render = Ys.prototype.render =
        function (e) {
          const n = this._internalRoot;
          if (null === n) throw Error(a(409));
          Qs(e, n, null, null);
        }),
        (Xs.prototype.unmount = Ys.prototype.unmount =
          function () {
            const e = this._internalRoot;
            if (null !== e) {
              this._internalRoot = null;
              const n = e.containerInfo;
              cs(() => {
                Qs(null, e, null, null);
              }),
                (n[ml] = null);
            }
          }),
        (Xs.prototype.unstable_scheduleHydration = (e) => {
          if (e) {
            const n = Cn();
            e = { blockedOn: null, target: e, priority: n };
            for (
              let t = 0;
              t < Dn.length && 0 !== n && n < Dn[t].priority;
              t++
            );
            Dn.splice(t, 0, e), 0 === t && Un(e);
          }
        }),
        (Sn = (e) => {
          switch (e.tag) {
            case 3: {
              const n = e.stateNode;
              if (n.current.memoizedState.isDehydrated) {
                const t = dn(n.pendingLanes);
                0 !== t &&
                  (bn(n, 1 | t),
                  rs(n, Ge()),
                  0 === (6 & Ni) && ((Hi = Ge() + 500), Hl()));
              }
              break;
            }
            case 13:
              cs(() => {
                const n = Pa(e, 1);
                if (null !== n) {
                  const t = es();
                  ts(n, e, 1, t);
                }
              }),
                Ks(e, 1);
          }
        }),
        (xn = (e) => {
          if (13 === e.tag) {
            const n = Pa(e, 134217728);
            if (null !== n) ts(n, e, 134217728, es());
            Ks(e, 134217728);
          }
        }),
        (En = (e) => {
          if (13 === e.tag) {
            const n = ns(e);
            const t = Pa(e, n);
            if (null !== t) ts(t, e, n, es());
            Ks(e, n);
          }
        }),
        (Cn = () => kn),
        (_n = (e, n) => {
          const t = kn;
          try {
            return (kn = e), n();
          } finally {
            kn = t;
          }
        }),
        (Se = (e, n, t) => {
          switch (n) {
            case "input":
              if ((Z(e, t), (n = t.name), "radio" === t.type && null != n)) {
                for (t = e; t.parentNode; ) t = t.parentNode;
                for (
                  t = t.querySelectorAll(
                    `input[name=${JSON.stringify(`${n}`)}][type="radio"]`,
                  ),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  const r = t[n];
                  if (r !== e && r.form === e.form) {
                    const l = wl(r);
                    if (!l) throw Error(a(90));
                    K(r), Z(r, l);
                  }
                }
              }
              break;
            case "textarea":
              ae(e, t);
              break;
            case "select":
              null != (n = t.value) && te(e, !!t.multiple, n, !1);
          }
        }),
        (Ne = ss),
        (Pe = cs);
      const nc = { usingClientEntryPoint: !1, Events: [bl, kl, wl, _e, ze, ss] };
      const tc = {
          findFiberByHostInstance: yl,
          bundleType: 0,
          version: "18.2.0",
          rendererPackageName: "react-dom",
        };
      const rc = {
          bundleType: tc.bundleType,
          version: tc.version,
          rendererPackageName: tc.rendererPackageName,
          rendererConfig: tc.rendererConfig,
          overrideHookState: null,
          overrideHookStateDeletePath: null,
          overrideHookStateRenamePath: null,
          overrideProps: null,
          overridePropsDeletePath: null,
          overridePropsRenamePath: null,
          setErrorHandler: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: k.ReactCurrentDispatcher,
          findHostInstanceByFiber: (e) => null === (e = je(e)) ? null : e.stateNode,
          findFiberByHostInstance:
            tc.findFiberByHostInstance ||
            () => null,
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
          reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
        };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        const lc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!lc.isDisabled && lc.supportsFiber)
          try {
            (ln = lc.inject(rc)), (an = lc);
          } catch (ce) {}
      }
      (n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nc),
        (n.createPortal = (e, n) => {
          const t =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null;
          if (!Gs(n)) throw Error(a(200));
          return Bs(e, n, null, t);
        }),
        (n.createRoot = (e, n) => {
          if (!Gs(e)) throw Error(a(299));
          let t = !1;
          let r = "";
          let l = qs;
          return (
            null != n &&
              (!0 === n.unstable_strictMode && (t = !0),
              void 0 !== n.identifierPrefix && (r = n.identifierPrefix),
              void 0 !== n.onRecoverableError && (l = n.onRecoverableError)),
            (n = As(e, 1, !1, null, 0, t, 0, r, l)),
            (e[ml] = n.current),
            Hr(8 === e.nodeType ? e.parentNode : e),
            new Ys(n)
          );
        }),
        (n.findDOMNode = (e) => {
          if (null == e) return null;
          if (1 === e.nodeType) return e;
          const n = e._reactInternals;
          if (void 0 === n) {
            if ("function" === typeof e.render) throw Error(a(188));
            throw ((e = Object.keys(e).join(",")), Error(a(268, e)));
          }
          return (e = null === (e = je(n)) ? null : e.stateNode);
        }),
        (n.flushSync = (e) => cs(e)),
        (n.hydrate = (e, n, t) => {
          if (!Zs(n)) throw Error(a(200));
          return ec(null, e, n, !0, t);
        }),
        (n.hydrateRoot = (e, n, t) => {
          if (!Gs(e)) throw Error(a(405));
          const r = (null != t && t.hydratedSources) || null;
          let l = !1;
          let u = "";
          let o = qs;
          if (
            (null != t &&
              (!0 === t.unstable_strictMode && (l = !0),
              void 0 !== t.identifierPrefix && (u = t.identifierPrefix),
              void 0 !== t.onRecoverableError && (o = t.onRecoverableError)),
            (n = Ws(n, null, e, 1, null != t ? t : null, l, 0, u, o)),
            (e[ml] = n.current),
            Hr(e),
            r)
          )
            for (e = 0; e < r.length; e++)
              (l = (l = (t = r[e])._getVersion)(t._source)),
                null == n.mutableSourceEagerHydrationData
                  ? (n.mutableSourceEagerHydrationData = [t, l])
                  : n.mutableSourceEagerHydrationData.push(t, l);
          return new Xs(n);
        }),
        (n.render = (e, n, t) => {
          if (!Zs(n)) throw Error(a(200));
          return ec(null, e, n, !1, t);
        }),
        (n.unmountComponentAtNode = (e) => {
          if (!Zs(e)) throw Error(a(40));
          return (
            !!e._reactRootContainer &&
            (cs(() => {
              ec(null, null, e, !1, () => {
                (e._reactRootContainer = null), (e[ml] = null);
              });
            }),
            !0)
          );
        }),
        (n.unstable_batchedUpdates = ss),
        (n.unstable_renderSubtreeIntoContainer = (e, n, t, r) => {
          if (!Zs(t)) throw Error(a(200));
          if (null == e || void 0 === e._reactInternals) throw Error(a(38));
          return ec(e, n, t, !1, r);
        }),
        (n.version = "18.2.0-next-9e3b772b8-20220608");
    },
    962: (e, n, t) => {
      !(function e() {
        if (
          "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
        )
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
          } catch (e) {
            console.error(e);
          }
      })(),
        (e.exports = t(50690));
    },
    85568: (e, n) => {
      function t(e, n) {
        let t = e.length;
        e.push(n);
        while (0 < t) {
          const r = (t - 1) >>> 1;
          const l = e[r];
          if (!(0 < a(l, n))) break;
          (e[r] = n), (e[t] = l), (t = r);
        }
      }
      function r(e) {
        return 0 === e.length ? null : e[0];
      }
      function l(e) {
        if (0 === e.length) return null;
        const n = e[0];
        const t = e.pop();
        if (t !== n) {
          e[0] = t;
          for (let r = 0, l = e.length, u = l >>> 1; r < u; ) {
            const o = 2 * (r + 1) - 1;
            const i = e[o];
            const s = o + 1;
            const c = e[s];
            if (0 > a(i, t))
              s < l && 0 > a(c, i)
                ? ((e[r] = c), (e[s] = t), (r = s))
                : ((e[r] = i), (e[o] = t), (r = o));
            else {
              if (!(s < l && 0 > a(c, t))) break;
              (e[r] = c), (e[s] = t), (r = s);
            }
          }
        }
        return n;
      }
      function a(e, n) {
        const t = e.sortIndex - n.sortIndex;
        return 0 !== t ? t : e.id - n.id;
      }
      if (
        "object" === typeof performance &&
        "function" === typeof performance.now
      ) {
        const u = performance;
        n.unstable_now = () => u.now();
      } else {
        const o = Date;
        const i = o.now();
        n.unstable_now = () => o.now() - i;
      }
      const s = [];
      const c = [];
      let f = 1;
      let d = null;
      let p = 3;
      let m = !1;
      let h = !1;
      let g = !1;
      const v = "function" === typeof setTimeout ? setTimeout : null;
      const y = "function" === typeof clearTimeout ? clearTimeout : null;
      const b = "undefined" !== typeof setImmediate ? setImmediate : null;
      function k(e) {
        for (let n = r(c); null !== n; ) {
          if (null === n.callback) l(c);
          else {
            if (!(n.startTime <= e)) break;
            l(c), (n.sortIndex = n.expirationTime), t(s, n);
          }
          n = r(c);
        }
      }
      function w(e) {
        if (((g = !1), k(e), !h))
          if (null !== r(s)) (h = !0), F(S);
          else {
            const n = r(c);
            null !== n && D(w, n.startTime - e);
          }
      }
      function S(e, t) {
        (h = !1), g && ((g = !1), y(_), (_ = -1)), (m = !0);
        const a = p;
        try {
          for (
            k(t), d = r(s);
            null !== d && (!(d.expirationTime > t) || (e && !P()));

          ) {
            const u = d.callback;
            if ("function" === typeof u) {
              (d.callback = null), (p = d.priorityLevel);
              const o = u(d.expirationTime <= t);
              (t = n.unstable_now()),
                "function" === typeof o ? (d.callback = o) : d === r(s) && l(s),
                k(t);
            } else l(s);
            d = r(s);
          }
          if (null !== d) let i = !0;
          else {
            const f = r(c);
            null !== f && D(w, f.startTime - t), (i = !1);
          }
          return i;
        } finally {
          (d = null), (p = a), (m = !1);
        }
      }
      "undefined" !== typeof navigator &&
        void 0 !== navigator.scheduling &&
        void 0 !== navigator.scheduling.isInputPending &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
      let x;
      let E = !1;
      let C = null;
      let _ = -1;
      let z = 5;
      let N = -1;
      function P() {
        return !(n.unstable_now() - N < z);
      }
      function T() {
        if (null !== C) {
          const e = n.unstable_now();
          N = e;
          let t = !0;
          try {
            t = C(!0, e);
          } finally {
            t ? x() : ((E = !1), (C = null));
          }
        } else E = !1;
      }
      if ("function" === typeof b)
        x = () => {
          b(T);
        };
      else if ("undefined" !== typeof MessageChannel) {
        const L = new MessageChannel();
        const M = L.port2;
        (L.port1.onmessage = T),
          (x = () => {
            M.postMessage(null);
          });
      } else
        x = () => {
          v(T, 0);
        };
      function F(e) {
        (C = e), E || ((E = !0), x());
      }
      function D(e, t) {
        _ = v(() => {
          e(n.unstable_now());
        }, t);
      }
      (n.unstable_IdlePriority = 5),
        (n.unstable_ImmediatePriority = 1),
        (n.unstable_LowPriority = 4),
        (n.unstable_NormalPriority = 3),
        (n.unstable_Profiling = null),
        (n.unstable_UserBlockingPriority = 2),
        (n.unstable_cancelCallback = (e) => {
          e.callback = null;
        }),
        (n.unstable_continueExecution = () => {
          h || m || ((h = !0), F(S));
        }),
        (n.unstable_forceFrameRate = (e) => {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
              )
            : (z = 0 < e ? Math.floor(1e3 / e) : 5);
        }),
        (n.unstable_getCurrentPriorityLevel = () => p),
        (n.unstable_getFirstCallbackNode = () => r(s)),
        (n.unstable_next = (e) => {
          switch (p) {
            case 1:
            case 2:
            case 3: {
              const n = 3;
              break;
            }
            default:
              n = p;
          }
          const t = p;
          p = n;
          try {
            return e();
          } finally {
            p = t;
          }
        }),
        (n.unstable_pauseExecution = () => {}),
        (n.unstable_requestPaint = () => {}),
        (n.unstable_runWithPriority = (e, n) => {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          const t = p;
          p = e;
          try {
            return n();
          } finally {
            p = t;
          }
        }),
        (n.unstable_scheduleCallback = (e, l, a) => {
          const u = n.unstable_now();
          switch (
            ("object" === typeof a && null !== a
              ? (a = "number" === typeof (a = a.delay) && 0 < a ? u + a : u)
              : (a = u),
            e)
          ) {
            case 1: {
              const o = -1;
              break;
            }
            case 2:
              o = 250;
              break;
            case 5:
              o = 1073741823;
              break;
            case 4:
              o = 1e4;
              break;
            default:
              o = 5e3;
          }
          return (
            (e = {
              id: f++,
              callback: l,
              priorityLevel: e,
              startTime: a,
              expirationTime: (o = a + o),
              sortIndex: -1,
            }),
            a > u
              ? ((e.sortIndex = a),
                t(c, e),
                null === r(s) &&
                  e === r(c) &&
                  (g ? (y(_), (_ = -1)) : (g = !0), D(w, a - u)))
              : ((e.sortIndex = o), t(s, e), h || m || ((h = !0), F(S))),
            e
          );
        }),
        (n.unstable_shouldYield = P),
        (n.unstable_wrapCallback = (e) => {
          const n = p;
          return function () {
            const t = p;
            p = n;
            try {
              return e.apply(this, arguments);
            } finally {
              p = t;
            }
          };
        });
    },
    22962: (e, n, t) => {
      e.exports = t(85568);
    },
  },
]);
