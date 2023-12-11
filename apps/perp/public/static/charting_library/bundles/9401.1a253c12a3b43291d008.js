(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [9401],
  {
    50151: (e, t) => {
            function n(e, t) {
        if (void 0 === e)
          throw new Error("".concat(null != t ? t : "Value", " is undefined"));
        return e;
      }
      function r(e, t) {
        if (null === e)
          throw new Error("".concat(null != t ? t : "Value", " is null"));
        return e;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ensureNever =
          t.ensure =
          t.ensureNotNull =
          t.ensureDefined =
          t.assert =
            void 0),
        (t.assert = (e, t) => {
          if (!e)
            throw new Error("Assertion failed".concat(t ? ": ".concat(t) : ""));
        }),
        (t.ensureDefined = n),
        (t.ensureNotNull = r),
        (t.ensure = (e, t) => r(n(e, t), t)),
        (t.ensureNever = (e) => {});
    },
    50335: (e, t) => {
            function n(e) {
        return Math.round(1e10 * e) / 1e10;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.alignTo =
          t.fixComputationError =
          t.isNaN =
          t.isInteger =
          t.isNumber =
            void 0),
        (t.isNumber = (e) => "number" === typeof e && Number.isFinite(e)),
        (t.isInteger = (e) => "number" === typeof e && e % 1 === 0),
        (t.isNaN = (e) => !(e <= 0 || e > 0)),
        (t.fixComputationError = n),
        (t.alignTo = (e, t) => {
          const r = e / t;
          const u = Math.floor(r);
          const o = r - u;
          return o > 2e-10 ? n(o > 0.5 ? (u + 1) * t : u * t) : e;
        });
    },
    30551: (e, t) => {
            (t.hasProperty = t.isObject = void 0),
        (t.isObject = (e) => {
          const t = typeof e;
          return null !== e && ("object" === t || "function" === t);
        }),
        (t.hasProperty = (e, t) => t in e);
    },
    91679: (e, t) => {
            t.WatchedValue = void 0;
      const n = (() => {
        function e(e, t) {
          void 0 === t && (t = {}),
            (this._listeners = []),
            void 0 !== e && (this._value = e),
            (this._onDestroy = t.onDestroy);
        }
        return (
          (e.prototype.destroy = function () {
            this.unsubscribe(),
              this._value = undefined,
              this._readonlyInstance = undefined,
              this._onDestroy?.();
          }),
          (e.prototype.value = function () {
            return this._value;
          }),
          (e.prototype.setValue = function (e, t) {
            const n =
              this._value === e ||
              (Number.isNaN(this._value) && Number.isNaN(e));
            (!t && n) || ((this._value = e), this._notifyListeners());
          }),
          (e.prototype.subscribe = function (e, t) {
            let n;
            let r;
            if (
              !(null === (n = null == t ? void 0 : t.signal) || void 0 === n
                ? void 0
                : n.aborted)
            ) {
              if (
                (null == t ? void 0 : t.callWithLast) &&
                void 0 !== this._value
              ) {
                try {
                  e(this._value);
                } catch (e) {
                  t.onError?.(e);
                }
                if (t.once) return;
              }
              (null == t ? void 0 : t.signal) &&
                t.signal.addEventListener(
                  "abort",
                  () => {
                    this.unsubscribe(e);
                  },
                  { once: !0 },
                ),
                this._listeners.push({
                  callback: e,
                  signal: null == t ? void 0 : t.signal,
                  once:
                    null !== (r = null == t ? void 0 : t.once) &&
                    void 0 !== r &&
                    r,
                  onError: null == t ? void 0 : t.onError,
                });
            }
          }),
          (e.prototype.unsubscribe = function (e) {
            for (let t = this._listeners.length; t--; ) {
              (e !== this._listeners[t].callback && void 0 !== e) ||
                this._listeners.splice(t, 1);
            }
          }),
          (e.prototype.readonly = function () {
            return (
              this._readonlyInstance || (this._readonlyInstance = new u(this)),
              this._readonlyInstance
            );
          }),
          (e.prototype.when = function (e, t) {
            let n;
            if (!e)
              return new Promise((e, t) => {
                if (void 0 === this._value) {
                  const n = (t) => {
                    void 0 !== t && (e(t), this.unsubscribe(n));
                  };
                  this.subscribe(n, { onError: t });
                } else e(this._value);
              });
            if (
              !(null === (n = null == t ? void 0 : t.signal) || void 0 === n
                ? void 0
                : n.aborted)
            )
              if (void 0 === this._value) {
                const u = (t) => {
                  void 0 !== t && (e(t), this.unsubscribe(u));
                };
                this.subscribe(u, t);
              } else
                try {
                  e(this._value);
                } catch (e) {
                  (null == t ? void 0 : t.onError) && t.onError(e);
                }
          }),
          (e.prototype._notifyListeners = function () {
            for (let e, t, n = 0, r = this._listeners; n < r.length; n++) {
              const u = r[n];
              if (
                ((u.once ||
                  (null === (e = u.signal) || void 0 === e
                    ? void 0
                    : e.aborted)) &&
                  this.unsubscribe(u.callback),
                !(null === (t = u.signal) || void 0 === t ? void 0 : t.aborted))
              )
                try {
                  u.callback(this._value);
                } catch (e) {
                  u.onError?.(e);
                }
            }
          }),
          e
        );
      })();
      t.WatchedValue = n;
      const r = "Using destroyed WatchedValueReadonly instance is not allowed";
      const u = (() => {
          function e(e) {
            this._owner = e;
          }
          return (
            (e.prototype.value = function () {
              let e;
              if (!this._owner) throw new Error(r);
              return null === (e = this._owner) || void 0 === e
                ? void 0
                : e.value();
            }),
            (e.prototype.destroy = function () {
              this._owner = undefined;
            }),
            (e.prototype.subscribe = function (e, t) {
              if (!this._owner) throw new Error(r);
              this._owner.subscribe(e, t);
            }),
            (e.prototype.unsubscribe = function (e) {
              if (!this._owner) throw new Error(r);
              this._owner.unsubscribe(e);
            }),
            (e.prototype.when = function (e, t) {
              if (!this._owner) throw new Error(r);
              return void 0 !== e ? this._owner.when(e, t) : this._owner.when();
            }),
            e
          );
        })();
    },
    34026: (e, t, n) => {
            Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointInCircle =
          t.pointInPolygon =
          t.pointInBox =
          t.pointInTriangle =
          t.pointInHalfplane =
            void 0);
      const r = n(5531);
      (t.pointInHalfplane = (e, t) => {
        const n = t.edge;
        return n.A * e.x + n.B * e.y + n.C > 0 === t.isPositive;
      }),
        (t.pointInTriangle = (e, t, n, u) => {
          const o = t.add(n).scaled(0.5).add(u).scaled(0.5);
          let d = r.intersectLineSegments(t, n, o, e);
          return (
            null === d &&
            null === (d = r.intersectLineSegments(n, u, o, e)) &&
            null === (d = r.intersectLineSegments(u, t, o, e))
          );
        }),
        (t.pointInBox = (e, t) => (
            e.x >= t.min.x && e.x <= t.max.x && e.y >= t.min.y && e.y <= t.max.y
          )),
        (t.pointInPolygon = (e, t) => {
          for (
            let n = t.length - 1, r = !1, u = e.x, o = e.y, d = 0;
            d < t.length;
            d++
          ) {
            const i = t[d];
            const a = t[n];
            ((i.y < o && a.y >= o) || (a.y < o && i.y >= o)) &&
              i.x + ((o - i.y) / (a.y - i.y)) * (a.x - i.x) < u &&
              (r = !r),
              (n = d);
          }
          return r;
        }),
        (t.pointInCircle = (e, t, n) => (e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y) <= n * n);
    },
    4652: (e, t) => {
            function n(e, t, n) {
        const r = t.subtract(e);
        const u = n.subtract(e).dotProduct(r) / r.dotProduct(r);
        return { coeff: u, distance: e.addScaled(r, u).subtract(n).length() };
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.distanceToSegment = t.distanceToLine = void 0),
        (t.distanceToLine = n),
        (t.distanceToSegment = (e, t, r) => {
          const u = n(e, t, r);
          if (0 <= u.coeff && u.coeff <= 1) return u;
          const o = e.subtract(r).length();
          const d = t.subtract(r).length();
          return o < d ? { coeff: 0, distance: o } : { coeff: 1, distance: d };
        });
    },
    5531: (e, t, n) => {
            Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.intersectPolygons =
          t.intersectPolygonAndHalfplane =
          t.intersectRayAndBox =
          t.intersectLineAndBox =
          t.intersectLineSegments =
          t.intersectLines =
          t.intersectLineSegmentAndBox =
            void 0);
      const r = n(50151);
      const u = n(86441);
      const o = n(4652);
      const d = n(34026);
      function i(e, t) {
        const n = e.A;
        const r = t.A;
        const o = e.B;
        const d = t.B;
        const i = e.C;
        const a = t.C;
        const s = n * d - r * o;
        if (Math.abs(s) < 1e-6) return null;
        const c = (o * a - d * i) / s;
        const f = (r * i - n * a) / s;
        return new u.Point(c, f);
      }
      function a(e, t, n, r) {
        const u = ((e, t, n, r) => {
          const u = t.subtract(e);
          const o = r.subtract(n);
          const d = u.x * o.y - u.y * o.x;
          if (Math.abs(d) < 1e-6) return null;
          const i = e.subtract(n);
          return (i.y * o.x - i.x * o.y) / d;
        })(e, t, n, r);
        if (null === u) return null;
        const d = t.subtract(e).scaled(u).add(e);
        const i = o.distanceToSegment(n, r, d);
        return Math.abs(i.distance) < 1e-6 ? u : null;
      }
      function s(e, t) {
        for (let n = 0, r = e; n < r.length; n++) {
          const o = r[n];
          if (u.equalPoints(o, t)) return !1;
        }
        return e.push(t), !0;
      }
      function c(e, t) {
        return (
          !(
            e.length > 0 &&
            (u.equalPoints(e[e.length - 1], t) || u.equalPoints(e[0], t))
          ) && (e.push(t), !0)
        );
      }
      function f(e, t) {
        for (let n = [], r = 0; r < e.length; ++r) {
          const o = e[r];
          const a = e[(r + 1) % e.length];
          const s = u.lineThroughPoints(o, a);
          if (d.pointInHalfplane(o, t)) {
            if ((c(n, o), !d.pointInHalfplane(a, t)))
              null !== (f = i(s, t.edge)) && c(n, f);
          } else if (d.pointInHalfplane(a, t)) {
            let f;
            null !== (f = i(s, t.edge)) && c(n, f);
          }
        }
        return n.length >= 3 ? n : null;
      }
      (t.intersectLineSegmentAndBox = (e, t) => {
        let n = e[0].x;
        let r = e[0].y;
        let o = e[1].x;
        let d = e[1].y;
        const i = t.min.x;
        const a = t.min.y;
        const s = t.max.x;
        const c = t.max.y;
        function f(e, t, n, r, u, o) {
          let d = 0;
          return (
            e < n ? (d |= 1) : e > u && (d |= 2),
            t < r ? (d |= 4) : t > o && (d |= 8),
            d
          );
        }
        for (
          let l = f(n, r, i, a, s, c), _ = f(o, d, i, a, s, c), h = !1, p = 0;
          ;

        ) {
          if (p > 1e3)
            throw new Error("Cohen - Sutherland algorithm: infinity loop");
          if ((p++, !(l | _))) {
            h = !0;
            break;
          }
          if (l & _) break;
          const b = l || _;
          let v = void 0;
          let g = void 0;
          8 & b
            ? ((v = n + ((o - n) * (c - r)) / (d - r)), (g = c))
            : 4 & b
            ? ((v = n + ((o - n) * (a - r)) / (d - r)), (g = a))
            : 2 & b
            ? ((g = r + ((d - r) * (s - n)) / (o - n)), (v = s))
            : ((g = r + ((d - r) * (i - n)) / (o - n)), (v = i)),
            b === l
              ? (l = f((n = v), (r = g), i, a, s, c))
              : (_ = f((o = v), (d = g), i, a, s, c));
        }
        return h
          ? u.equalPoints(u.point(n, r), u.point(o, d))
            ? u.point(n, r)
            : u.lineSegment(u.point(n, r), u.point(o, d))
          : null;
      }),
        (t.intersectLines = i),
        (t.intersectLineSegments = a),
        (t.intersectLineAndBox = (e, t) => {
          const n = t.min.x;
          const o = t.min.y;
          const d = t.max.x;
          const i = t.max.y;
          if (0 === e.A) {
            const a = -e.C / e.B;
            return o <= a && a <= i
              ? u.lineSegment(u.point(n, a), u.point(d, a))
              : null;
          }
          if (0 === e.B) {
            const c = -e.C / e.A;
            return n <= c && c <= d
              ? u.lineSegment(u.point(c, o), u.point(c, i))
              : null;
          }
          const f = [];
          const l = (t) => {
              const n = ((e, t) => -(e.C + e.A * t) / e.B)(e, t);
              o <= n && n <= i && s(f, new u.Point(t, n));
            };
          const _ = (t) => {
              const r = ((e, t) => -(e.C + e.B * t) / e.A)(e, t);
              n <= r && r <= d && s(f, new u.Point(r, t));
            };
          switch ((l(n), _(o), l(d), _(i), f.length)) {
            case 0:
              return null;
            case 1:
              return f[0];
            case 2:
              return u.equalPoints(f[0], f[1])
                ? f[0]
                : u.lineSegment(f[0], f[1]);
          }
          return (
            r.assert(!1, "We should have at most two intersection points"), null
          );
        }),
        (t.intersectRayAndBox = (e, t, n) => {
          const r = a(e, t, n.min, new u.Point(n.max.x, n.min.y));
          const o = a(e, t, new u.Point(n.max.x, n.min.y), n.max);
          const i = a(e, t, n.max, new u.Point(n.min.x, n.max.y));
          const s = a(e, t, new u.Point(n.min.x, n.max.y), n.min);
          const c = [];
          if (
            (null !== r && r >= 0 && c.push(r),
            null !== o && o >= 0 && c.push(o),
            null !== i && i >= 0 && c.push(i),
            null !== s && s >= 0 && c.push(s),
            0 === c.length)
          )
            return null;
          c.sort((e, t) => e - t);
          const f = d.pointInBox(e, n) ? c[0] : c[c.length - 1];
          return e.addScaled(t.subtract(e), f);
        }),
        (t.intersectPolygonAndHalfplane = f),
        (t.intersectPolygons = (e, t) => {
          for (let n = e, r = 0; r < t.length && null !== n; ++r) {
            const o = t[r];
            const d = t[(r + 1) % t.length];
            const i = t[(r + 2) % t.length];
            const a = u.lineThroughPoints(o, d);
            n = f(n, u.halfplaneThroughPoint(a, i));
          }
          return n;
        });
    },
    86441: (e, t) => {
            Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.equalBoxes =
          t.box =
          t.halfplaneThroughPoint =
          t.halfplane =
          t.lineSegment =
          t.lineThroughPoints =
          t.line =
          t.equalPoints =
          t.point =
          t.Point =
            void 0);
      const n = (() => {
        function e(e, t) {
          (this.x = e), (this.y = t);
        }
        return (
          (e.prototype.add = function (t) {
            return new e(this.x + t.x, this.y + t.y);
          }),
          (e.prototype.addScaled = function (t, n) {
            return new e(this.x + n * t.x, this.y + n * t.y);
          }),
          (e.prototype.subtract = function (t) {
            return new e(this.x - t.x, this.y - t.y);
          }),
          (e.prototype.dotProduct = function (e) {
            return this.x * e.x + this.y * e.y;
          }),
          (e.prototype.crossProduct = function (e) {
            return this.x * e.y - this.y * e.x;
          }),
          (e.prototype.signedAngle = function (e) {
            return Math.atan2(this.crossProduct(e), this.dotProduct(e));
          }),
          (e.prototype.angle = function (e) {
            return Math.acos(this.dotProduct(e) / (this.length() * e.length()));
          }),
          (e.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
          }),
          (e.prototype.scaled = function (t) {
            return new e(this.x * t, this.y * t);
          }),
          (e.prototype.normalized = function () {
            return this.scaled(1 / this.length());
          }),
          (e.prototype.transposed = function () {
            return new e(-this.y, this.x);
          }),
          (e.prototype.clone = function () {
            return new e(this.x, this.y);
          }),
          e
        );
      })();
      function r(e, t) {
        return new n(e, t);
      }
      function u(e, t) {
        return e.x === t.x && e.y === t.y;
      }
      function o(e, t, n) {
        if (0 === e && 0 === t)
          throw new Error("A and B can not be both equal to zero.");
        return { A: e, B: t, C: n };
      }
      function d(e, t) {
        return { edge: e, isPositive: t };
      }
      (t.Point = n),
        (t.point = r),
        (t.equalPoints = u),
        (t.line = o),
        (t.lineThroughPoints = (e, t) => {
          if (u(e, t)) throw new Error("Points should be distinct");
          return o(e.y - t.y, t.x - e.x, e.x * t.y - t.x * e.y);
        }),
        (t.lineSegment = (e, t) => {
          if (u(e, t))
            throw new Error("Points of a segment should be distinct");
          return [e, t];
        }),
        (t.halfplane = d),
        (t.halfplaneThroughPoint = (e, t) => d(e, e.A * t.x + e.B * t.y + e.C > 0)),
        (t.box = (e, t) => ({
            min: r(Math.min(e.x, t.x), Math.min(e.y, t.y)),
            max: r(Math.max(e.x, t.x), Math.max(e.y, t.y)),
          })),
        (t.equalBoxes = (e, t) => u(e.min, t.min) && u(e.max, t.max));
    },
    25422: (e, t, n) => {
            t.transformPoint =
        t.translationMatrix =
        t.scalingMatrix =
        t.rotationMatrix =
          void 0;
      const r = n(86441);
      (t.rotationMatrix = (e) => {
        const t = Math.cos(e);
        const n = Math.sin(e);
        return [
          [t, -n, 0],
          [n, t, 0],
          [0, 0, 1],
        ];
      }),
        (t.scalingMatrix = (e, t) => [
            [e, 0, 0],
            [0, t, 0],
            [0, 0, 1],
          ]),
        (t.translationMatrix = (e, t) => [
            [1, 0, e],
            [0, 1, t],
            [0, 0, 1],
          ]),
        (t.transformPoint = (e, t) => {
          for (let n = [t.x, t.y, 1], u = [0, 0, 0], o = 0; o < 3; o++)
            for (let d = 0; d < 3; d++) u[o] += n[d] * e[o][d];
          return new r.Point(u[0], u[1]);
        });
    },
    24377: (e, t, n) => {
            const r = n(50335);
      function u(e, t, n) {
        return r.isNaN(t) || t < e ? e : t > n ? n : Math.round(t);
      }
      function o(e, t, n) {
        return r.isNaN(t) || t < e ? e : t > n ? n : Math.round(1e4 * t) / 1e4;
      }
      function d(e) {
        return u(0, e, 255);
      }
      function i(e) {
        return u(0, e, 255);
      }
      function a(e) {
        return u(0, e, 255);
      }
      function s(e) {
        return o(0, e, 1);
      }
      function c(e) {
        return o(0, e, 1);
      }
      function f(e) {
        return o(0, e, 1);
      }
      function l(e) {
        return o(0, e, 1);
      }
      function _(e) {
        return o(0, e, 1);
      }
      function h(e) {
        return o(0, e, 1);
      }
      function p(e) {
        const t = e[0] / 255;
        const n = e[1] / 255;
        const r = e[2] / 255;
        const u = Math.min(t, n, r);
        const o = Math.max(t, n, r);
        let d = 0;
        let i = 0;
        const a = (u + o) / 2;
        if (u === o) (d = 0), (i = 0);
        else {
          const s = o - u;
          switch (((i = a > 0.5 ? s / (2 - o - u) : s / (o + u)), o)) {
            case t:
              d = ((n - r) / s + (n < r ? 6 : 0)) / 6;
              break;
            case n:
              d = ((r - t) / s + 2) / 6;
              break;
            case r:
              d = ((t - n) / s + 4) / 6;
          }
        }
        return [d, i, a];
      }
      function b(e, t, n) {
        return (
          n < 0 && (n += 1),
          n > 1 && (n -= 1),
          n < 1 / 6
            ? e + 6 * (t - e) * n
            : n < 0.5
            ? t
            : n < 2 / 3
            ? e + (t - e) * (2 / 3 - n) * 6
            : e
        );
      }
      function v(e) {
        let t;
        let n;
        let r;
        const u = e[0];
        const o = e[1];
        const s = e[2];
        if (0 === o) t = n = r = s;
        else {
          const c = s < 0.5 ? s * (1 + o) : s + o - s * o;
          const f = 2 * s - c;
          (t = b(f, c, u + 1 / 3)), (n = b(f, c, u)), (r = b(f, c, u - 1 / 3));
        }
        return [d(255 * t), i(255 * n), a(255 * r)];
      }
      (t.normalizeAlphaComponent = s),
        (t.areEqualRgb = (e, t) => e[0] === t[0] && e[1] === t[1] && e[2] === t[2]),
        (t.rgba = (e, t, n, r) => {
          if (Array.isArray(e)) {
            const u = e;
            return (r = t), [u[0], u[1], u[2], s(r)];
          }
          const o = t;
          return (n = n || 0), (r = r || 0), [d(e), i(o), a(n), s(r)];
        }),
        (t.areEqualRgba = (e, t) => (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          )),
        (t.rgbToHsl = p),
        (t.hslToRgb = v);
      const g = [0.199, 0.687, 0.114];
      function m(e) {
        return g[0] * e[0] + g[1] * e[1] + g[2] * e[2];
      }
      function y(e, t, n) {
        void 0 === n && (n = 0.05);
        const r = p(e);
        const u = r[0] + t * n;
        return (r[0] = c(u - Math.floor(u))), v(r);
      }
      function w(e, t, n) {
        void 0 === n && (n = 0.05);
        const r = e[0];
        const u = e[1];
        const o = e[2];
        const d = e[3];
        const i = y([r, u, o], t, n);
        return [i[0], i[1], i[2], d];
      }
      (t.distanceRgb = (e, t) => {
        const n = e[0];
        const r = e[1];
        const u = e[2];
        const o = t[0] - n;
        const d = t[1] - r;
        const i = t[2] - u;
        return Math.sqrt(o * o + d * d + i * i);
      }),
        (t.invertRgb = (e) => [255 - e[0], 255 - e[1], 255 - e[2]]),
        (t.blendRgba = (e, t) => {
          const n = e[0];
          const r = e[1];
          const u = e[2];
          const o = e[3];
          const c = t[0];
          const f = t[1];
          const l = t[2];
          const _ = t[3];
          const h = s(1 - (1 - _) * (1 - o));
          return [
            d((c * _) / h + (n * o * (1 - _)) / h),
            i((f * _) / h + (r * o * (1 - _)) / h),
            a((l * _) / h + (u * o * (1 - _)) / h),
            h,
          ];
        }),
        (t.shiftRgb = y),
        (t.shiftRgba = w),
        (t.shiftColor = (e, t, n) => void 0 === n && (n = 0.05), R(w(B(e), t, n)));
      let x;
      let j;
      let E;
      let S;
      const O = {
          aliceblue: "#f0f8ff",
          antiquewhite: "#faebd7",
          aqua: "#00ffff",
          aquamarine: "#7fffd4",
          azure: "#f0ffff",
          beige: "#f5f5dc",
          bisque: "#ffe4c4",
          black: "#000000",
          blanchedalmond: "#ffebcd",
          blue: "#0000ff",
          blueviolet: "#8a2be2",
          brown: "#a52a2a",
          burlywood: "#deb887",
          cadetblue: "#5f9ea0",
          chartreuse: "#7fff00",
          chocolate: "#d2691e",
          coral: "#ff7f50",
          cornflowerblue: "#6495ed",
          cornsilk: "#fff8dc",
          crimson: "#dc143c",
          cyan: "#00ffff",
          darkblue: "#00008b",
          darkcyan: "#008b8b",
          darkgoldenrod: "#b8860b",
          darkgray: "#a9a9a9",
          darkgreen: "#006400",
          darkkhaki: "#bdb76b",
          darkmagenta: "#8b008b",
          darkolivegreen: "#556b2f",
          darkorange: "#ff8c00",
          darkorchid: "#9932cc",
          darkred: "#8b0000",
          darksalmon: "#e9967a",
          darkseagreen: "#8fbc8f",
          darkslateblue: "#483d8b",
          darkslategray: "#2f4f4f",
          darkturquoise: "#00ced1",
          darkviolet: "#9400d3",
          deeppink: "#ff1493",
          deepskyblue: "#00bfff",
          dimgray: "#696969",
          dodgerblue: "#1e90ff",
          feldspar: "#d19275",
          firebrick: "#b22222",
          floralwhite: "#fffaf0",
          forestgreen: "#228b22",
          fuchsia: "#ff00ff",
          gainsboro: "#dcdcdc",
          ghostwhite: "#f8f8ff",
          gold: "#ffd700",
          goldenrod: "#daa520",
          gray: "#808080",
          green: "#008000",
          greenyellow: "#adff2f",
          honeydew: "#f0fff0",
          hotpink: "#ff69b4",
          indianred: "#cd5c5c",
          indigo: "#4b0082",
          ivory: "#fffff0",
          khaki: "#f0e68c",
          lavender: "#e6e6fa",
          lavenderblush: "#fff0f5",
          lawngreen: "#7cfc00",
          lemonchiffon: "#fffacd",
          lightblue: "#add8e6",
          lightcoral: "#f08080",
          lightcyan: "#e0ffff",
          lightgoldenrodyellow: "#fafad2",
          lightgreen: "#90ee90",
          lightgrey: "#d3d3d3",
          lightpink: "#ffb6c1",
          lightsalmon: "#ffa07a",
          lightseagreen: "#20b2aa",
          lightskyblue: "#87cefa",
          lightslateblue: "#8470ff",
          lightslategray: "#778899",
          lightsteelblue: "#b0c4de",
          lightyellow: "#ffffe0",
          lime: "#00ff00",
          limegreen: "#32cd32",
          linen: "#faf0e6",
          magenta: "#ff00ff",
          maroon: "#800000",
          mediumaquamarine: "#66cdaa",
          mediumblue: "#0000cd",
          mediumorchid: "#ba55d3",
          mediumpurple: "#9370d8",
          mediumseagreen: "#3cb371",
          mediumslateblue: "#7b68ee",
          mediumspringgreen: "#00fa9a",
          mediumturquoise: "#48d1cc",
          mediumvioletred: "#c71585",
          midnightblue: "#191970",
          mintcream: "#f5fffa",
          mistyrose: "#ffe4e1",
          moccasin: "#ffe4b5",
          navajowhite: "#ffdead",
          navy: "#000080",
          oldlace: "#fdf5e6",
          olive: "#808000",
          olivedrab: "#6b8e23",
          orange: "#ffa500",
          orangered: "#ff4500",
          orchid: "#da70d6",
          palegoldenrod: "#eee8aa",
          palegreen: "#98fb98",
          paleturquoise: "#afeeee",
          palevioletred: "#d87093",
          papayawhip: "#ffefd5",
          peachpuff: "#ffdab9",
          peru: "#cd853f",
          pink: "#ffc0cb",
          plum: "#dda0dd",
          powderblue: "#b0e0e6",
          purple: "#800080",
          red: "#ff0000",
          rosybrown: "#bc8f8f",
          royalblue: "#4169e1",
          saddlebrown: "#8b4513",
          salmon: "#fa8072",
          sandybrown: "#f4a460",
          seagreen: "#2e8b57",
          seashell: "#fff5ee",
          sienna: "#a0522d",
          silver: "#c0c0c0",
          skyblue: "#87ceeb",
          slateblue: "#6a5acd",
          slategray: "#708090",
          snow: "#fffafa",
          springgreen: "#00ff7f",
          steelblue: "#4682b4",
          tan: "#d2b48c",
          teal: "#008080",
          thistle: "#d8bfd8",
          tomato: "#ff6347",
          turquoise: "#40e0d0",
          violet: "#ee82ee",
          violetred: "#d02090",
          wheat: "#f5deb3",
          white: "#ffffff",
          whitesmoke: "#f5f5f5",
          yellow: "#ffff00",
          yellowgreen: "#9acd32",
        };
      function z(e, t) {
        return t in e;
      }
      function A(e) {
        const t = x.re.exec(e);
        return null !== t ? x.parse(t) : null;
      }
      function P(e) {
        const t = j.re.exec(e);
        return null !== t ? j.parse(t) : null;
      }
      function k(e) {
        const t = E.re.exec(e);
        return null !== t ? E.parse(t) : null;
      }
      function C(e) {
        const t = S.re.exec(e);
        return null !== t ? S.parse(t) : null;
      }
      function R(e) {
        return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
      }
      function L(e) {
        if (((e = e.toLowerCase()), z(O, e))) {
          const t = P(O[e]);
          if (null !== t) return t;
          throw new Error("Invalid named color definition");
        }
        const n = A(e);
        if (null !== n) return n;
        const r = P(e);
        if (null !== r) return r;
        const u = k(e);
        if (null !== u) return u;
        const o = C(e);
        return null !== o ? [o[0], o[1], o[2]] : null;
      }
      function N(e) {
        if (((e = e.toLowerCase()), z(O, e))) {
          const t = P(O[e]);
          if (null !== t) return [t[0], t[1], t[2], 1];
          throw new Error("Invalid named color definition");
        }
        const n = A(e);
        if (null !== n) return [n[0], n[1], n[2], 1];
        const r = P(e);
        if (null !== r) return [r[0], r[1], r[2], 1];
        const u = k(e);
        if (null !== u) return [u[0], u[1], u[2], 1];
        const o = C(e);
        return null !== o ? o : null;
      }
      function B(e) {
        const t = N(e);
        if (null !== t) return t;
        throw new Error(
          "Passed color string does not match any of the known color representations",
        );
      }
      !((e) => {
        (e.re =
          /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/),
          (e.parse = (e) => [
              d(parseInt(e[1], 10)),
              i(parseInt(e[2], 10)),
              a(parseInt(e[3], 10)),
            ]);
      })(x || (x = {})),
        ((e) => {
          (e.re = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/),
            (e.parse = (e) => [
                d(parseInt(e[1], 16)),
                i(parseInt(e[2], 16)),
                a(parseInt(e[3], 16)),
              ]);
        })(j || (j = {})),
        (t.rgbToHexString = (e) => {
          const t = e[0];
          const n = e[1];
          const r = e[2];
          const u = t.toString(16);
          const o = n.toString(16);
          const d = r.toString(16);
          return (
            `#${1 === u.length ? "0" : ""}${u}${1 === o.length ? "0" : ""}${o}${1 === d.length ? "0" : ""}${d}`
          );
        }),
        ((e) => {
          (e.re = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/),
            (e.parse = (e) => [
                d(parseInt(e[1] + e[1], 16)),
                i(parseInt(e[2] + e[2], 16)),
                a(parseInt(e[3] + e[3], 16)),
              ]);
        })(E || (E = {})),
        ((e) => {
          (e.re =
            /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/),
            (e.parse = (e) => [
                d(parseInt(e[1], 10)),
                i(parseInt(e[2], 10)),
                a(parseInt(e[3], 10)),
                s(parseFloat(e[4])),
              ]);
        })(S || (S = {})),
        (t.rgbaToString = R),
        (t.rgbToBlackWhiteString = (e, t) => {
          if (t < 0 || t > 255)
            throw new Error(
              "invalid threshold value, valid values are [0, 255]",
            );
          return m(e) >= t ? "white" : "black";
        }),
        (t.parseRgb = (e) => {
          const t = L(e);
          if (null !== t) return t;
          throw new Error(
            "Passed color string does not match any of the known color representations",
          );
        }),
        (t.tryParseRgba = N),
        (t.parseRgba = B);
    },
    60521: (e, t, n) => {
      let r;
      !((u) => {
                let o;
                const d = 1e6;
                const i = 1e6;
                const a = "[big.js] ";
                const s = `${a}Invalid `;
                const c = `${s}decimal places`;
                const f = `${a}Division by zero`;
                const l = {};
                const _ = void 0;
                const h = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
        function p(e, t, n, r) {
          const u = e.c;
          if (
            (n === _ && (n = e.constructor.RM),
            0 !== n && 1 !== n && 2 !== n && 3 !== n)
          )
            throw Error("[big.js] Invalid rounding mode");
          if (t < 1)
            (r =
              (3 === n && (r || !!u[0])) ||
              (0 === t &&
                ((1 === n && u[0] >= 5) ||
                  (2 === n &&
                    (u[0] > 5 || (5 === u[0] && (r || u[1] !== _))))))),
              (u.length = 1),
              r ? ((e.e = e.e - t + 1), (u[0] = 1)) : (u[0] = e.e = 0);
          else if (t < u.length) {
            if (
              ((r =
                (1 === n && u[t] >= 5) ||
                (2 === n &&
                  (u[t] > 5 ||
                    (5 === u[t] && (r || u[t + 1] !== _ || 1 & u[t - 1])))) ||
                (3 === n && (r || !!u[0]))),
              (u.length = t--),
              r)
            )
              while (++u[t] > 9) (u[t] = 0), t-- || (++e.e, u.unshift(1));
            for (t = u.length; !u[--t]; ) u.pop();
          }
          return e;
        }
        function b(e, t, n) {
          let r = e.e;
          let u = e.c.join("");
          const o = u.length;
          if (t)
            u =
              u.charAt(0) +
              (o > 1 ? `.${u.slice(1)}` : "") +
              (r < 0 ? "e" : "e+") +
              r;
          else if (r < 0) {
            while (++r) u = `0${u}`;
            u = `0.${u}`;
          } else if (r > 0)
            if (++r > o) for (r -= o; r--; ) u += "0";
            else r < o && (u = `${u.slice(0, r)}.${u.slice(r)}`);
          else o > 1 && (u = `${u.charAt(0)}.${u.slice(1)}`);
          return e.s < 0 && n ? `-${u}` : u;
        }
        (l.abs = function () {
          const e = new this.constructor(this);
          return (e.s = 1), e;
        }),
          (l.cmp = function (e) {
            let t;
            const r = this.c;
            const u = (e = new this.constructor(e)).c;
            let o = this.s;
            let d = e.s;
            let i = this.e;
            let a = e.e;
            if (!r[0] || !u[0]) return r[0] ? o : u[0] ? -d : 0;
            if (o !== d) return o;
            if (((t = o < 0), i !== a)) return (i > a) ^ t ? 1 : -1;
            for (d = (i = r.length) < (a = u.length) ? i : a, o = -1; ++o < d; )
              if (r[o] !== u[o]) return (r[o] > u[o]) ^ t ? 1 : -1;
            return i === a ? 0 : (i > a) ^ t ? 1 : -1;
          }),
          (l.div = function (e) {
            const n = this.constructor;
            const r = this.c;
            const u = (e = new n(e)).c;
            let o = this.s === e.s ? 1 : -1;
            const i = n.DP;
            if (i !== ~~i || i < 0 || i > d) throw Error(c);
            if (!u[0]) throw Error(f);
            if (!r[0]) return (e.s = o), (e.c = [(e.e = 0)]), e;
            let a;
            let s;
            let l;
            let h;
            let b;
            const v = u.slice();
            let g = (a = u.length);
            const m = r.length;
            let y = r.slice(0, a);
            let w = y.length;
            const x = e;
            const j = (x.c = []);
            let E = 0;
            let S = i + (x.e = this.e - e.e) + 1;
            for (x.s = o, o = S < 0 ? 0 : S, v.unshift(0); w++ < a; ) y.push(0);
            do {
              for (l = 0; l < 10; l++) {
                if (a !== (w = y.length)) h = a > w ? 1 : -1;
                else
                  for (b = -1, h = 0; ++b < a; )
                    if (u[b] !== y[b]) {
                      h = u[b] > y[b] ? 1 : -1;
                      break;
                    }
                if (!(h < 0)) break;
                for (s = w === a ? u : v; w; ) {
                  if (y[--w] < s[w]) {
                    for (b = w; b && !y[--b]; ) y[b] = 9;
                    --y[b], (y[w] += 10);
                  }
                  y[w] -= s[w];
                }
                while (!y[0]) y.shift();
              }
              (j[E++] = h ? l : ++l),
                y[0] && h ? (y[w] = r[g] || 0) : (y = [r[g]]);
            } while ((g++ < m || y[0] !== _) && o--);
            return (
              j[0] || 1 === E || (j.shift(), x.e--, S--),
              E > S && p(x, S, n.RM, y[0] !== _),
              x
            );
          }),
          (l.eq = function (e) {
            return 0 === this.cmp(e);
          }),
          (l.gt = function (e) {
            return this.cmp(e) > 0;
          }),
          (l.gte = function (e) {
            return this.cmp(e) > -1;
          }),
          (l.lt = function (e) {
            return this.cmp(e) < 0;
          }),
          (l.lte = function (e) {
            return this.cmp(e) < 1;
          }),
          (l.minus = l.sub =
            function (e) {
              let t;
              let n;
              let r;
              let u;
              const d = this.constructor;
              let i = this.s;
              let a = (e = new d(e)).s;
              if (i !== a) return (e.s = -a), this.plus(e);
              let s = this.c.slice();
              const c = this.e;
              let f = e.c;
              let l = e.e;
              if (!s[0] || !f[0])
                return f[0] ? (e.s = -a) : s[0] ? (e = new d(this)) : (e.s = 1), e;
              if ((i = c - l)) {
                for (
                  (u = i < 0) ? ((i = -i), (r = s)) : ((l = c), (r = f)),
                    r.reverse(),
                    a = i;
                  a--;

                )
                  r.push(0);
                r.reverse();
              } else
                for (
                  n = ((u = s.length < f.length) ? s : f).length, i = a = 0;
                  a < n;
                  a++
                )
                  if (s[a] !== f[a]) {
                    u = s[a] < f[a];
                    break;
                  }
              if (
                (u && ((r = s), (s = f), (f = r), (e.s = -e.s)),
                (a = (n = f.length) - (t = s.length)) > 0)
              )
                while (a--) s[t++] = 0;
              for (a = t; n > i; ) {
                if (s[--n] < f[n]) {
                  for (t = n; t && !s[--t]; ) s[t] = 9;
                  --s[t], (s[n] += 10);
                }
                s[n] -= f[n];
              }
              while (0 === s[--a]) s.pop();
              while (0 === s[0]) s.shift(), --l;
              return (
                s[0] || ((e.s = 1), (s = [(l = 0)])), (e.c = s), (e.e = l), e
              );
            }),
          (l.mod = function (e) {
            let t;
            let n = this;
            const r = n.constructor;
            let u = n.s;
            let o = (e = new r(e)).s;
            if (!e.c[0]) throw Error(f);
            return (
              (n.s = e.s = 1),
              (t = 1 === e.cmp(n)),
              (n.s = u),
              (e.s = o),
              t
                ? new r(n)
                : ((u = r.DP),
                  (o = r.RM),
                  (r.DP = r.RM = 0),
                  (n = n.div(e)),
                  (r.DP = u),
                  (r.RM = o),
                  this.minus(n.times(e)))
            );
          }),
          (l.plus = l.add =
            function (e) {
              let t;
              let n;
              let r;
              const o = this.constructor;
              if (((e = new o(e)), this.s !== e.s)) return (e.s = -e.s), this.minus(e);
              const d = this.e;
              let i = this.c;
              let a = e.e;
              let s = e.c;
              if (!i[0] || !s[0])
                return s[0] || (i[0] ? (e = new o(this)) : (e.s = this.s)), e;
              if (((i = i.slice()), (t = d - a))) {
                for (
                  t > 0 ? ((a = d), (r = s)) : ((t = -t), (r = i)), r.reverse();
                  t--;

                )
                  r.push(0);
                r.reverse();
              }
              for (
                i.length - s.length < 0 && ((r = s), (s = i), (i = r)),
                  t = s.length,
                  n = 0;
                t;
                i[t] %= 10
              )
                n = ((i[--t] = i[t] + s[t] + n) / 10) | 0;
              for (n && (i.unshift(n), ++a), t = i.length; 0 === i[--t]; )
                i.pop();
              return (e.c = i), (e.e = a), e;
            }),
          (l.pow = function (e) {
            let t = this;
            const n = new t.constructor("1");
            let r = n;
            const u = e < 0;
            if (e !== ~~e || e < -1e6 || e > i) throw Error(`${s}exponent`);
            for (u && (e = -e); 1 & e && (r = r.times(t)), (e >>= 1); )
              t = t.times(t);
            return u ? n.div(r) : r;
          }),
          (l.prec = function (e, t) {
            if (e !== ~~e || e < 1 || e > d) throw Error(`${s}precision`);
            return p(new this.constructor(this), e, t);
          }),
          (l.round = function (e, t) {
            if (e === _) e = 0;
            else if (e !== ~~e || e < -d || e > d) throw Error(c);
            return p(new this.constructor(this), e + this.e + 1, t);
          }),
          (l.sqrt = function () {
            let e;
            let t;
            let n;
            const u = this.constructor;
            let o = this.s;
            let d = this.e;
            const i = new u("0.5");
            if (!this.c[0]) return new u(this);
            if (o < 0) throw Error(`${a}No square root`);
            0 === (o = Math.sqrt(`${this}`)) || o === 1 / 0
              ? (((t = this.c.join("")).length + d) & 1 || (t += "0"),
                (d = (((d + 1) / 2) | 0) - (d < 0 || 1 & d)),
                (e = new u(
                  ((o = Math.sqrt(t)) === 1 / 0
                    ? "5e"
                    : (o = o.toExponential()).slice(0, o.indexOf("e") + 1)) + d,
                )))
              : (e = new u(`${o}`)),
              (d = e.e + (u.DP += 4));
            do {
              (n = e), (e = i.times(n.plus(this.div(n))));
            } while (n.c.slice(0, d).join("") !== e.c.slice(0, d).join(""));
            return p(e, (u.DP -= 4) + e.e + 1, u.RM);
          }),
          (l.times = l.mul =
            function (e) {
              let t;
              const r = this.constructor;
              let u = this.c;
              let o = (e = new r(e)).c;
              let d = u.length;
              let i = o.length;
              let a = this.e;
              let s = e.e;
              if (((e.s = this.s === e.s ? 1 : -1), !u[0] || !o[0]))
                return (e.c = [(e.e = 0)]), e;
              for (
                e.e = a + s,
                  d < i &&
                    ((t = u), (u = o), (o = t), (s = d), (d = i), (i = s)),
                  t = new Array((s = d + i));
                s--;

              )
                t[s] = 0;
              for (a = i; a--; ) {
                for (i = 0, s = d + a; s > a; )
                  (i = t[s] + o[a] * u[s - a - 1] + i),
                    (t[s--] = i % 10),
                    (i = (i / 10) | 0);
                t[s] = i;
              }
              for (i ? ++e.e : t.shift(), a = t.length; !t[--a]; ) t.pop();
              return (e.c = t), e;
            }),
          (l.toExponential = function (e, t) {
            let n = this;
            const r = n.c[0];
            if (e !== _) {
              if (e !== ~~e || e < 0 || e > d) throw Error(c);
              for (n = p(new n.constructor(n), ++e, t); n.c.length < e; )
                n.c.push(0);
            }
            return b(n, !0, !!r);
          }),
          (l.toFixed = function (e, t) {
            let n = this;
            const r = n.c[0];
            if (e !== _) {
              if (e !== ~~e || e < 0 || e > d) throw Error(c);
              for (
                e = e + (n = p(new n.constructor(n), e + n.e + 1, t)).e + 1;
                n.c.length < e;

              )
                n.c.push(0);
            }
            return b(n, !1, !!r);
          }),
          (l.toJSON = l.toString =
            function () {
              const 
                t = this.constructor;
              return b(this, this.e <= t.NE || this.e >= t.PE, !!this.c[0]);
            }),
          (l.toNumber = function () {
            const e = Number(b(this, !0, !0));
            if (!0 === this.constructor.strict && !this.eq(e.toString()))
              throw Error(`${a}Imprecise conversion`);
            return e;
          }),
          (l.toPrecision = function (e, t) {
            let n = this;
            const r = n.constructor;
            const u = n.c[0];
            if (e !== _) {
              if (e !== ~~e || e < 1 || e > d) throw Error(`${s}precision`);
              for (n = p(new r(n), e, t); n.c.length < e; ) n.c.push(0);
            }
            return b(n, e <= n.e || n.e <= r.NE || n.e >= r.PE, !!u);
          }),
          (l.valueOf = function () {
            const 
              t = this.constructor;
            if (!0 === t.strict) throw Error(`${a}valueOf disallowed`);
            return b(this, this.e <= t.NE || this.e >= t.PE, !0);
          }),
          (o = (function e() {
            function t(n) {;
              if (!(this instanceof t)) return n === _ ? e() : new t(n);
              if (n instanceof t) (this.s = n.s), (this.e = n.e), (this.c = n.c.slice());
              else {
                if ("string" !== typeof n) {
                  if (!0 === t.strict) throw TypeError(`${s}number`);
                  n = 0 === n && 1 / n < 0 ? "-0" : String(n);
                }
                !((e, t) => {
                  let n;
                  let r;
                  let u;
                  if (!h.test(t)) throw Error(`${s}number`);
                  (e.s = "-" === t.charAt(0) ? ((t = t.slice(1)), -1) : 1),
                    (n = t.indexOf(".")) > -1 && (t = t.replace(".", ""));
                  (r = t.search(/e/i)) > 0
                    ? (n < 0 && (n = r),
                      (n += +t.slice(r + 1)),
                      (t = t.substring(0, r)))
                    : n < 0 && (n = t.length);
                  for (u = t.length, r = 0; r < u && "0" === t.charAt(r); ) ++r;
                  if (r === u) e.c = [(e.e = 0)];
                  else {
                    while (u > 0 && "0" === t.charAt(--u));
                    for (e.e = n - r - 1, e.c = [], n = 0; r <= u; )
                      e.c[n++] = +t.charAt(r++);
                  }
                })(this, n);
              }
              this.constructor = t;
            }
            return (
              (t.prototype = l),
              (t.DP = 20),
              (t.RM = 1),
              (t.NE = -7),
              (t.PE = 21),
              (t.strict = false),
              (t.roundDown = 0),
              (t.roundHalfUp = 1),
              (t.roundHalfEven = 2),
              (t.roundUp = 3),
              t
            );
          })()),
          (o.default = o.Big = o),
          void 0 ===
            (r = () => o.call(t, n, t, e)) || (e.exports = r);
      })();
    },
    97754: (e, t) => {
      let n;
      !(() => {
                const r = {}.hasOwnProperty;
        function u() {
          for (let e = [], t = 0; t < arguments.length; t++) {
            const n = arguments[t];
            if (n) {
              const o = typeof n;
              if ("string" === o || "number" === o) e.push(n);
              else if (Array.isArray(n) && n.length) {
                const d = u.apply(null, n);
                d && e.push(d);
              } else if ("object" === o)
                for (const i in n) r.call(n, i) && n[i] && e.push(i);
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((u.default = u), (e.exports = u))
          : void 0 ===
              (n = () => u.apply(t, [])) || (e.exports = n);
      })();
    },
    18606: (e, t, n) => {
            n.d(t, { default: () => l });
      const r = function () {
        (this.__data__ = []), (this.size = 0);
      };
      const u = n(72575);
      const o = (e, t) => {
        for (let n = e.length; n--; ) if ((0, u.default)(e[n][0], t)) return n;
        return -1;
      };
      const d = Array.prototype.splice;
      const i = function (e) {
        const t = this.__data__;
        const n = o(t, e);
        return (
          !(n < 0) &&
          (n === t.length - 1 ? t.pop() : d.call(t, n, 1), --this.size, !0)
        );
      };
      const a = function (e) {
        const t = this.__data__;
        const n = o(t, e);
        return n < 0 ? void 0 : t[n][1];
      };
      const s = function (e) {
        return o(this.__data__, e) > -1;
      };
      const c = function (e, t) {
        const n = this.__data__;
        const r = o(n, e);
        return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
      };
      function f(e) {
        let t = -1;
        const n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          const r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (f.prototype.clear = r),
        (f.prototype.delete = i),
        (f.prototype.get = a),
        (f.prototype.has = s),
        (f.prototype.set = c);
      const l = f;
    },
    67027: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(70830);
      const u = n(78160);
      const o = (0, r.default)(u.default, "Map");
    },
    1141: (e, t, n) => {
            n.d(t, { default: () => j });
      const r = (0, n(70830).default)(Object, "create");
      const u = function () {
        (this.__data__ = r ? r(null) : {}), (this.size = 0);
      };
      const o = function (e) {
        const t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
      };
      const d = Object.prototype.hasOwnProperty;
      const i = function (e) {
        const t = this.__data__;
        if (r) {
          const n = t[e];
          return "__lodash_hash_undefined__" === n ? void 0 : n;
        }
        return d.call(t, e) ? t[e] : void 0;
      };
      const a = Object.prototype.hasOwnProperty;
      const s = function (e) {
        const t = this.__data__;
        return r ? void 0 !== t[e] : a.call(t, e);
      };
      const c = function (e, t) {
        const n = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (n[e] = r && void 0 === t ? "__lodash_hash_undefined__" : t),
          this
        );
      };
      function f(e) {
        let t = -1;
        const n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          const r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (f.prototype.clear = u),
        (f.prototype.delete = o),
        (f.prototype.get = i),
        (f.prototype.has = s),
        (f.prototype.set = c);
      const l = f;
      const _ = n(18606);
      const h = n(67027);
      const p = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new l(),
            map: new (h.default || _.default)(),
            string: new l(),
          });
      };
      const b = (e) => {
        const t = typeof e;
        return "string" === t || "number" === t || "symbol" === t || "boolean" === t
          ? "__proto__" !== e
          : null === e;
      };
      const v = (e, t) => {
        const n = e.__data__;
        return b(t) ? n["string" === typeof t ? "string" : "hash"] : n.map;
      };
      const g = function (e) {
        const t = v(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
      };
      const m = function (e) {
        return v(this, e).get(e);
      };
      const y = function (e) {
        return v(this, e).has(e);
      };
      const w = function (e, t) {
        const n = v(this, e);
        const r = n.size;
        return n.set(e, t), (this.size += n.size === r ? 0 : 1), this;
      };
      function x(e) {
        let t = -1;
        const n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          const r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (x.prototype.clear = p),
        (x.prototype.delete = g),
        (x.prototype.get = m),
        (x.prototype.has = y),
        (x.prototype.set = w);
      const j = x;
    },
    96335: (e, t, n) => {
            n.d(t, { default: () => l });
      const r = n(18606);
      const u = function () {
        (this.__data__ = new r.default()), (this.size = 0);
      };
      const o = function (e) {
        const t = this.__data__;
        const n = t.delete(e);
        return (this.size = t.size), n;
      };
      const d = function (e) {
        return this.__data__.get(e);
      };
      const i = function (e) {
        return this.__data__.has(e);
      };
      const a = n(67027);
      const s = n(1141);
      const c = function (e, t) {
        let n = this.__data__;
        if (n instanceof r.default) {
          const u = n.__data__;
          if (!a.default || u.length < 199)
            return u.push([e, t]), (this.size = ++n.size), this;
          n = this.__data__ = new s.default(u);
        }
        return n.set(e, t), (this.size = n.size), this;
      };
      function f(e) {
        const t = (this.__data__ = new r.default(e));
        this.size = t.size;
      }
      (f.prototype.clear = u),
        (f.prototype.delete = o),
        (f.prototype.get = d),
        (f.prototype.has = i),
        (f.prototype.set = c);
      const l = f;
    },
    3060: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = n(78160).default.Symbol;
    },
    35246: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = n(78160).default.Uint8Array;
    },
    31468: (e, t, n) => {
            n.d(t, { default: () => c });
      const r = (e, t) => {
        for (let n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
        return r;
      };
      const u = n(53822);
      const o = n(54814);
      const d = n(25247);
      const i = n(17104);
      const a = n(54744);
      const s = Object.prototype.hasOwnProperty;
      const c = (e, t) => {
        const n = (0, o.default)(e);
        const c = !n && (0, u.default)(e);
        const f = !n && !c && (0, d.default)(e);
        const l = !n && !c && !f && (0, a.default)(e);
        const _ = n || c || f || l;
        const h = _ ? r(e.length, String) : [];
        const p = h.length;
        for (const b in e)
          (!t && !s.call(e, b)) ||
            (_ &&
              ("length" === b ||
                (f && ("offset" === b || "parent" === b)) ||
                (l &&
                  ("buffer" === b || "byteLength" === b || "byteOffset" === b)) ||
                (0, i.default)(b, p))) ||
            h.push(b);
        return h;
      };
    },
    20883: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e, t) => {
        for (let n = -1, r = t.length, u = e.length; ++n < r; ) e[u + n] = t[n];
        return e;
      };
    },
    66934: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(24402);
      const u = n(72575);
      const o = Object.prototype.hasOwnProperty;
      const d = (e, t, n) => {
        const d = e[t];
        (o.call(e, t) && (0, u.default)(d, n) && (void 0 !== n || t in e)) ||
          (0, r.default)(e, t, n);
      };
    },
    24402: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(76780);
      const u = (e, t, n) => {
        "__proto__" === t && r.default
          ? (0, r.default)(e, t, {
              configurable: !0,
              enumerable: !0,
              value: n,
              writable: !0,
            })
          : (e[t] = n);
      };
    },
    29718: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = ((e) => (t, n, r) => {
          for (let u = -1, o = Object(t), d = r(t), i = d.length; i--; ) {
            const a = d[e ? i : ++u];
            if (!1 === n(o[a], a, o)) break;
          }
          return t;
        })();
    },
    80838: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(23151);
      const u = n(87844);
      const o = (e, t) => {
        for (
          let n = 0, o = (t = (0, r.default)(t, e)).length;
          null != e && n < o;

        )
          e = e[(0, u.default)(t[n++])];
        return n && n === o ? e : void 0;
      };
    },
    44631: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(20883);
      const u = n(54814);
      const o = (e, t, n) => {
        const o = t(e);
        return (0, u.default)(e) ? o : (0, r.default)(o, n(e));
      };
    },
    28177: (e, t, n) => {
            n.d(t, { default: () => l });
      const r = n(3060);
      const u = Object.prototype;
      const o = u.hasOwnProperty;
      const d = u.toString;
      const i = r.default ? r.default.toStringTag : void 0;
      const a = (e) => {
        const t = o.call(e, i);
        const n = e[i];
        try {
          e[i] = void 0;
          const r = !0;
        } catch (e) {}
        const u = d.call(e);
        return r && (t ? (e[i] = n) : delete e[i]), u;
      };
      const s = Object.prototype.toString;
      const c = (e) => s.call(e);
      const f = r.default ? r.default.toStringTag : void 0;
      const l = (e) => null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : f && f in Object(e)
          ? a(e)
          : c(e);
    },
    96425: (e, t, n) => {
            n.d(t, { default: () => L });
      const r = n(96335);
      const u = n(1141);
      const o = function (e) {
        return this.__data__.set(e, "__lodash_hash_undefined__"), this;
      };
      const d = function (e) {
        return this.__data__.has(e);
      };
      function i(e) {
        let t = -1;
        const n = null == e ? 0 : e.length;
        for (this.__data__ = new u.default(); ++t < n; ) this.add(e[t]);
      }
      (i.prototype.add = i.prototype.push = o), (i.prototype.has = d);
      const a = i;
      let s = (e, t) => {
        for (let n = -1, r = null == e ? 0 : e.length; ++n < r; )
          if (t(e[n], n, e)) return !0;
        return !1;
      };
      let c = (e, t) => e.has(t);
      const f = (e, t, n, r, u, o) => {
        const d = 1 & n;
        const i = e.length;
        const f = t.length;
        if (i !== f && !(d && f > i)) return !1;
        const l = o.get(e);
        if (l && o.get(t)) return l === t;
        let _ = -1;
        let h = !0;
        const p = 2 & n ? new a() : void 0;
        for (o.set(e, t), o.set(t, e); ++_ < i; ) {
          const b = e[_];
          const v = t[_];
          if (r) const g = d ? r(v, b, _, t, e, o) : r(b, v, _, e, t, o);
          if (void 0 !== g) {
            if (g) continue;
            h = !1;
            break;
          }
          if (p) {
            if (
              !s(t, (e, t) => {
                if (!c(p, t) && (b === e || u(b, e, n, r, o))) return p.push(t);
              })
            ) {
              h = !1;
              break;
            }
          } else if (b !== v && !u(b, v, n, r, o)) {
            h = !1;
            break;
          }
        }
        return o.delete(e), o.delete(t), h;
      };
      const l = n(3060);
      const _ = n(35246);
      const h = n(72575);
      const p = (e) => {
        let t = -1;
        const n = Array(e.size);
        return (
          e.forEach((e, r) => {
            n[++t] = [r, e];
          }),
          n
        );
      };
      const b = (e) => {
        let t = -1;
        const n = Array(e.size);
        return (
          e.forEach((e) => {
            n[++t] = e;
          }),
          n
        );
      };
      const v = l.default ? l.default.prototype : void 0;
      const g = v ? v.valueOf : void 0;
      const m = (e, t, n, r, u, o, d) => {
        switch (n) {
          case "[object DataView]":
            if (e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset)
              return !1;
            (e = e.buffer), (t = t.buffer);
          case "[object ArrayBuffer]":
            return !(
              e.byteLength !== t.byteLength ||
              !o(new _.default(e), new _.default(t))
            );
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return (0, h.default)(+e, +t);
          case "[object Error]":
            return e.name === t.name && e.message === t.message;
          case "[object RegExp]":
          case "[object String]":
            return e === `${t}`;
          case "[object Map]": {
            const i = p;
          }
          case "[object Set]": {
            const a = 1 & r;
            if ((i || (i = b), e.size !== t.size && !a)) return !1;
            const s = d.get(e);
            if (s) return s === t;
            (r |= 2), d.set(e, t);
            const c = f(i(e), i(t), r, u, o, d);
            return d.delete(e), c;
          }
          case "[object Symbol]":
            if (g) return g.call(e) === g.call(t);
        }
        return !1;
      };
      const y = n(85747);
      const w = Object.prototype.hasOwnProperty;
      const x = (e, t, n, r, u, o) => {
        const d = 1 & n;
        const i = (0, y.default)(e);
        const a = i.length;
        if (a !== (0, y.default)(t).length && !d) return !1;
        for (let s = a; s--; ) {
          const c = i[s];
          if (!(d ? c in t : w.call(t, c))) return !1;
        }
        const f = o.get(e);
        if (f && o.get(t)) return f === t;
        let l = !0;
        o.set(e, t), o.set(t, e);
        for (let _ = d; ++s < a; ) {
          const h = e[(c = i[s])];
          const p = t[c];
          if (r) const b = d ? r(p, h, c, t, e, o) : r(h, p, c, e, t, o);
          if (!(void 0 === b ? h === p || u(h, p, n, r, o) : b)) {
            l = !1;
            break;
          }
          _ || (_ = "constructor" === c);
        }
        if (l && !_) {
          const v = e.constructor;
          const g = t.constructor;
          v === g ||
            !("constructor" in e) ||
            !("constructor" in t) ||
            ("function" === typeof v &&
              v instanceof v &&
              "function" === typeof g &&
              g instanceof g) ||
            (l = !1);
        }
        return o.delete(e), o.delete(t), l;
      };
      const j = n(17873);
      const E = n(54814);
      const S = n(25247);
      const O = n(54744);
      const z = "[object Arguments]";
      const A = "[object Array]";
      const P = "[object Object]";
      const k = Object.prototype.hasOwnProperty;
      const C = (e, t, n, u, o, d) => {
        let i = (0, E.default)(e);
        const a = (0, E.default)(t);
        let s = i ? A : (0, j.default)(e);
        let c = a ? A : (0, j.default)(t);
        let l = (s = s === z ? P : s) === P;
        const _ = (c = c === z ? P : c) === P;
        const h = s === c;
        if (h && (0, S.default)(e)) {
          if (!(0, S.default)(t)) return !1;
          (i = !0), (l = !1);
        }
        if (h && !l)
          return (
            d || (d = new r.default()),
            i || (0, O.default)(e)
              ? f(e, t, n, u, o, d)
              : m(e, t, s, n, u, o, d)
          );
        if (!(1 & n)) {
          const p = l && k.call(e, "__wrapped__");
          const b = _ && k.call(t, "__wrapped__");
          if (p || b) {
            const v = p ? e.value() : e;
            const g = b ? t.value() : t;
            return d || (d = new r.default()), o(v, g, n, u, d);
          }
        }
        return !!h && (d || (d = new r.default()), x(e, t, n, u, o, d));
      };
      const R = n(83527);
      const L = function e(t, n, r, u, o) {
        return (
          t === n ||
          (null == t || null == n || (!(0, R.default)(t) && !(0, R.default)(n))
            ? t !== t && n !== n
            : C(t, n, r, u, e, o))
        );
      };
    },
    7492: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(43744);
      const u = (0, n(22828).default)(Object.keys, Object);
      const o = Object.prototype.hasOwnProperty;
      const d = (e) => {
        if (!(0, r.default)(e)) return u(e);
        const t = [];
        for (const n in Object(e))
          o.call(e, n) && "constructor" !== n && t.push(n);
        return t;
      };
    },
    43688: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e, t, n) => {
        let r = -1;
        let u = e.length;
        t < 0 && (t = -t > u ? 0 : u + t),
          (n = n > u ? u : n) < 0 && (n += u),
          (u = t > n ? 0 : (n - t) >>> 0),
          (t >>>= 0);
        for (const o = Array(u); ++r < u; ) o[r] = e[r + t];
        return o;
      };
    },
    95256: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => (t) => e(t);
    },
    23151: (e, t, n) => {
            n.d(t, { default: () => b });
      const r = n(54814);
      const u = n(73204);
      const o = n(48874);
      const d =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      const i = /\\(\\)?/g;
      const a = ((e) => {
        const t = (0, o.default)(e, (e) => 500 === n.size && n.clear(), e);
        const n = t.cache;
        return t;
      })((e) => {
        const t = [];
        return (
          46 === e.charCodeAt(0) && t.push(""),
          e.replace(d, (e, n, r, u) => {
            t.push(r ? u.replace(i, "$1") : n || e);
          }),
          t
        );
      });
      const s = n(3060);
      const c = (e, t) => {
        for (let n = -1, r = null == e ? 0 : e.length, u = Array(r); ++n < r; )
          u[n] = t(e[n], n, e);
        return u;
      };
      const f = n(8875);
      const l = s.default ? s.default.prototype : void 0;
      const _ = l ? l.toString : void 0;
      const h = function e(t) {
        if ("string" === typeof t) return t;
        if ((0, r.default)(t)) return `${c(t, e)}`;
        if ((0, f.default)(t)) return _ ? _.call(t) : "";
        const n = `${t}`;
        return "0" === n && 1 / t === -Infinity ? "-0" : n;
      };
      const p = (e) => null == e ? "" : h(e);
      const b = (e, t) => (0, r.default)(e) ? e : (0, u.default)(e, t) ? [e] : a(p(e));
    },
    44702: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(35246);
      const u = (e) => {
        const t = new e.constructor(e.byteLength);
        return new r.default(t).set(new r.default(e)), t;
      };
    },
    57508: (e, t, n) => {
            n.d(t, { default: () => a });
      const r = n(78160);
      e = n.hmd(e);
      const u =
          "object" === typeof exports && exports && !exports.nodeType && exports;
      const o = u && e && !e.nodeType && e;
      const d = o && o.exports === u ? r.default.Buffer : void 0;
      const i = d ? d.allocUnsafe : void 0;
      const a = (e, t) => {
        if (t) return e.slice();
        const n = e.length;
        const r = i ? i(n) : new e.constructor(n);
        return e.copy(r), r;
      };
    },
    39895: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(44702);
      const u = (e, t) => {
        const n = t ? (0, r.default)(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      };
    },
    58555: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e, t) => {
        let n = -1;
        const r = e.length;
        for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
        return t;
      };
    },
    75969: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(66934);
      const u = n(24402);
      const o = (e, t, n, o) => {
        const d = !n;
        n || (n = {});
        for (let i = -1, a = t.length; ++i < a; ) {
          const s = t[i];
          let c = o ? o(n[s], e[s], s, n, e) : void 0;
          void 0 === c && (c = e[s]),
            d ? (0, u.default)(n, s, c) : (0, r.default)(n, s, c);
        }
        return n;
      };
    },
    76780: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(70830);
      const u = (() => {
        try {
          const e = (0, r.default)(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch (e) {}
      })();
    },
    89956: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = "object" === typeof n.g && n.g && n.g.Object === Object && n.g;
    },
    85747: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(44631);
      const u = n(12644);
      const o = n(33358);
      const d = (e) => (0, r.default)(e, o.default, u.default);
    },
    70830: (e, t, n) => {
            n.d(t, { default: () => g });
      const r = n(62942);
      const u = n(78160).default["__core-js_shared__"];
      let o;
      const d = (o = /[^.]+$/.exec((u?.keys?.IE_PROTO) || ""))
          ? `Symbol(src)_1.${o}`
          : "";
      const i = (e) => !!d && d in e;
      const a = n(98279);
      const s = n(59990);
      const c = /^\[object .+?Constructor\]$/;
      const f = Function.prototype;
      const l = Object.prototype;
      const _ = f.toString;
      const h = l.hasOwnProperty;
      const p = RegExp(
          `^${_.call(h)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?",
              )}$`,
        );
      const b = (e) => (
          !(!(0, a.default)(e) || i(e)) &&
          ((0, r.default)(e) ? p : c).test((0, s.default)(e))
        );
      const v = (e, t) => null == e ? void 0 : e[t];
      const g = (e, t) => {
        const n = v(e, t);
        return b(n) ? n : void 0;
      };
    },
    56838: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (0, n(22828).default)(Object.getPrototypeOf, Object);
    },
    12644: (e, t, n) => {
            n.d(t, { default: () => i });
      const r = (e, t) => {
        for (
          let n = -1, r = null == e ? 0 : e.length, u = 0, o = [];
          ++n < r;

        ) {
          const d = e[n];
          t(d, n, e) && (o[u++] = d);
        }
        return o;
      };
      const u = n(35987);
      const o = Object.prototype.propertyIsEnumerable;
      const d = Object.getOwnPropertySymbols;
      const i = d
        ? (e) => null == e
              ? []
              : ((e = Object(e)),
                r(d(e), (t) => o.call(e, t)))
        : u.default;
    },
    17873: (e, t, n) => {
            n.d(t, { default: () => j });
      const r = n(70830);
      const u = n(78160);
      const o = (0, r.default)(u.default, "DataView");
      const d = n(67027);
      const i = (0, r.default)(u.default, "Promise");
      const a = (0, r.default)(u.default, "Set");
      const s = (0, r.default)(u.default, "WeakMap");
      const c = n(28177);
      const f = n(59990);
      const l = "[object Map]";
      const _ = "[object Promise]";
      const h = "[object Set]";
      const p = "[object WeakMap]";
      const b = "[object DataView]";
      const v = (0, f.default)(o);
      const g = (0, f.default)(d.default);
      const m = (0, f.default)(i);
      const y = (0, f.default)(a);
      const w = (0, f.default)(s);
      let x = c.default;
      ((o && x(new o(new ArrayBuffer(1))) !== b) ||
        (d.default && x(new d.default()) !== l) ||
        (i && x(i.resolve()) !== _) ||
        (a && x(new a()) !== h) ||
        (s && x(new s()) !== p)) &&
        (x = (e) => {
          const t = (0, c.default)(e);
          const n = "[object Object]" === t ? e.constructor : void 0;
          const r = n ? (0, f.default)(n) : "";
          if (r)
            switch (r) {
              case v:
                return b;
              case g:
                return l;
              case m:
                return _;
              case y:
                return h;
              case w:
                return p;
            }
          return t;
        });
      const j = x;
    },
    52222: (e, t, n) => {
            n.d(t, { default: () => a });
      const r = n(98279);
      const u = Object.create;
      const o = (() => {
        function e() {}
        return (t) => {
          if (!(0, r.default)(t)) return {};
          if (u) return u(t);
          e.prototype = t;
          const n = new e();
          return (e.prototype = void 0), n;
        };
      })();
      const d = n(56838);
      const i = n(43744);
      const a = (e) => "function" !== typeof e.constructor || (0, i.default)(e)
          ? {}
          : o((0, d.default)(e));
    },
    17104: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = /^(?:0|[1-9]\d*)$/;
      const u = (e, t) => {
        const n = typeof e;
        return (
          !!(t = null == t ? 9007199254740991 : t) &&
          ("number" === n || ("symbol" !== n && r.test(e))) &&
          e > -1 &&
          e % 1 === 0 &&
          e < t
        );
      };
    },
    93532: (e, t, n) => {
            n.d(t, { default: () => i });
      const r = n(72575);
      const u = n(29419);
      const o = n(17104);
      const d = n(98279);
      const i = (e, t, n) => {
        if (!(0, d.default)(n)) return !1;
        const i = typeof t;
        return (
          !!("number" === i
            ? (0, u.default)(n) && (0, o.default)(t, n.length)
            : "string" === i && t in n) && (0, r.default)(n[t], e)
        );
      };
    },
    73204: (e, t, n) => {
            n.d(t, { default: () => i });
      const r = n(54814);
      const u = n(8875);
      const o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      const d = /^\w*$/;
      const i = (e, t) => {
        if ((0, r.default)(e)) return !1;
        const n = typeof e;
        return (
          !(
            "number" !== n &&
            "symbol" !== n &&
            "boolean" !== n &&
            null != e &&
            !(0, u.default)(e)
          ) ||
          d.test(e) ||
          !o.test(e) ||
          (null != t && e in Object(t))
        );
      };
    },
    43744: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = Object.prototype;
      const u = (e) => {
        const t = e?.constructor;
        return e === (("function" === typeof t && t.prototype) || r);
      };
    },
    59283: (e, t, n) => {
            n.d(t, { default: () => i });
      const r = n(89956);
      e = n.hmd(e);
      const u =
          "object" === typeof exports && exports && !exports.nodeType && exports;
      const o = u && e && !e.nodeType && e;
      const d = o && o.exports === u && r.default.process;
      const i = (() => {
        try {
          const e = o?.require?.("util").types;
          return e || (d?.binding?.("util"));
        } catch (e) {}
      })();
    },
    22828: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e, t) => (n) => e(t(n));
    },
    78160: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(89956);
      const u = "object" === typeof self && self && self.Object === Object && self;
      const o = r.default || u || Function("return this")();
    },
    87844: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(8875);
      const u = (e) => {
        if ("string" === typeof e || (0, r.default)(e)) return e;
        const t = `${e}`;
        return "0" === t && 1 / e === -Infinity ? "-0" : t;
      };
    },
    59990: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = Function.prototype.toString;
      const u = (e) => {
        if (null != e) {
          try {
            return r.call(e);
          } catch (e) {}
          try {
            return `${e}`;
          } catch (e) {}
        }
        return "";
      };
    },
    27788: (e, t, n) => {
            n.d(t, { default: () => ee });
      const r = n(96335);
      const u = (e, t) => {
        for (
          let n = -1, r = null == e ? 0 : e.length;
          ++n < r && !1 !== t(e[n], n, e);

        );
        return e;
      };
      const o = n(66934);
      const d = n(75969);
      const i = n(33358);
      const a = (e, t) => e && (0, d.default)(t, (0, i.default)(t), e);
      const s = n(64162);
      const c = (e, t) => e && (0, d.default)(t, (0, s.default)(t), e);
      const f = n(57508);
      const l = n(58555);
      const _ = n(12644);
      const h = (e, t) => (0, d.default)(e, (0, _.default)(e), t);
      const p = n(20883);
      const b = n(56838);
      const v = n(35987);
      const g = Object.getOwnPropertySymbols
        ? (e) => {
            for (const t = []; e; )
              (0, p.default)(t, (0, _.default)(e)), (e = (0, b.default)(e));
            return t;
          }
        : v.default;
      const m = (e, t) => (0, d.default)(e, g(e), t);
      const y = n(85747);
      const w = n(44631);
      const x = (e) => (0, w.default)(e, s.default, g);
      const j = n(17873);
      const E = Object.prototype.hasOwnProperty;
      const S = (e) => {
        const t = e.length;
        const n = new e.constructor(t);
        return (
          t &&
            "string" === typeof e[0] &&
            E.call(e, "index") &&
            ((n.index = e.index), (n.input = e.input)),
          n
        );
      };
      const O = n(44702);
      const z = (e, t) => {
        const n = t ? (0, O.default)(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      };
      const A = /\w*$/;
      const P = (e) => {
        const t = new e.constructor(e.source, A.exec(e));
        return (t.lastIndex = e.lastIndex), t;
      };
      const k = n(3060);
      const C = k.default ? k.default.prototype : void 0;
      const R = C ? C.valueOf : void 0;
      const L = (e) => R ? Object(R.call(e)) : {};
      const N = n(39895);
      const B = (e, t, n) => {
        const r = e.constructor;
        switch (t) {
          case "[object ArrayBuffer]":
            return (0, O.default)(e);
          case "[object Boolean]":
          case "[object Date]":
            return new r(+e);
          case "[object DataView]":
            return z(e, n);
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return (0, N.default)(e, n);
          case "[object Map]":
          case "[object Set]":
            return new r();
          case "[object Number]":
          case "[object String]":
            return new r(e);
          case "[object RegExp]":
            return P(e);
          case "[object Symbol]":
            return L(e);
        }
      };
      const M = n(52222);
      const I = n(54814);
      const T = n(25247);
      const $ = n(83527);
      const F = (e) => (0, $.default)(e) && "[object Map]" === (0, j.default)(e);
      const q = n(95256);
      const D = n(59283);
      const V = D.default?.isMap;
      const U = V ? (0, q.default)(V) : F;
      const W = n(98279);
      const H = (e) => (0, $.default)(e) && "[object Set]" === (0, j.default)(e);
      const Z = D.default?.isSet;
      const Q = Z ? (0, q.default)(Z) : H;
      const G = "[object Arguments]";
      const J = "[object Function]";
      const Y = "[object Object]";
      const K = {};
      (K[G] =
        K["[object Array]"] =
        K["[object ArrayBuffer]"] =
        K["[object DataView]"] =
        K["[object Boolean]"] =
        K["[object Date]"] =
        K["[object Float32Array]"] =
        K["[object Float64Array]"] =
        K["[object Int8Array]"] =
        K["[object Int16Array]"] =
        K["[object Int32Array]"] =
        K["[object Map]"] =
        K["[object Number]"] =
        K[Y] =
        K["[object RegExp]"] =
        K["[object Set]"] =
        K["[object String]"] =
        K["[object Symbol]"] =
        K["[object Uint8Array]"] =
        K["[object Uint8ClampedArray]"] =
        K["[object Uint16Array]"] =
        K["[object Uint32Array]"] =
          !0),
        (K["[object Error]"] = K[J] = K["[object WeakMap]"] = !1);
      const X = function e(t, n, d, s, _, p) {
        let b;
        const v = 1 & n;
        const g = 2 & n;
        const w = 4 & n;
        if ((d && (b = _ ? d(t, s, _, p) : d(t)), void 0 !== b)) return b;
        if (!(0, W.default)(t)) return t;
        const E = (0, I.default)(t);
        if (E) {
          if (((b = S(t)), !v)) return (0, l.default)(t, b);
        } else {
          const O = (0, j.default)(t);
          const z = O === J || "[object GeneratorFunction]" === O;
          if ((0, T.default)(t)) return (0, f.default)(t, v);
          if (O === Y || O === G || (z && !_)) {
            if (((b = g || z ? {} : (0, M.default)(t)), !v))
              return g ? m(t, c(b, t)) : h(t, a(b, t));
          } else {
            if (!K[O]) return _ ? t : {};
            b = B(t, O, v);
          }
        }
        p || (p = new r.default());
        const A = p.get(t);
        if (A) return A;
        p.set(t, b),
          Q(t)
            ? t.forEach((r) => {
                b.add(e(r, n, d, r, t, p));
              })
            : U(t) &&
              t.forEach((r, u) => {
                b.set(u, e(r, n, d, u, t, p));
              });
        const P = w ? (g ? x : y.default) : g ? keysIn : i.default;
        const k = E ? void 0 : P(t);
        return (
          u(k || t, (r, u) => {
            k && (r = t[(u = r)]), (0, o.default)(b, u, e(r, n, d, u, t, p));
          }),
          b
        );
      };
      const ee = (e) => X(e, 5);
    },
    12481: (e, t, n) => {
            n.d(t, { default: () => s });
      const r = n(98279);
      const u = n(78160);
      const o = () => u.default.Date.now();
      const d = n(68877);
      const i = Math.max;
      const a = Math.min;
      const s = (e, t, n) => {
        let u;
        let s;
        let c;
        let f;
        let l;
        let _;
        let h = 0;
        let p = !1;
        let b = !1;
        let v = !0;
        if ("function" !== typeof e) throw new TypeError("Expected a function");
        function g(t) {
          const n = u;
          const r = s;
          return (u = s = void 0), (h = t), (f = e.apply(r, n));
        }
        function m(e) {
          return (h = e), (l = setTimeout(w, t)), p ? g(e) : f;
        }
        function y(e) {
          const n = e - _;
          return void 0 === _ || n >= t || n < 0 || (b && e - h >= c);
        }
        function w() {
          const e = o();
          if (y(e)) return x(e);
          l = setTimeout(
            w,
            ((e) => {
              const n = t - (e - _);
              return b ? a(n, c - (e - h)) : n;
            })(e),
          );
        }
        function x(e) {
          return (l = void 0), v && u ? g(e) : ((u = s = void 0), f);
        }
        function j() {
          const e = o();
          const n = y(e);
          if (((u = arguments), (s = this), (_ = e), n)) {
            if (void 0 === l) return m(_);
            if (b) return clearTimeout(l), (l = setTimeout(w, t)), g(_);
          }
          return void 0 === l && (l = setTimeout(w, t)), f;
        }
        return (
          (t = (0, d.default)(t) || 0),
          (0, r.default)(n) &&
            ((p = !!n.leading),
            (c = (b = "maxWait" in n)
              ? i((0, d.default)(n.maxWait) || 0, t)
              : c),
            (v = "trailing" in n ? !!n.trailing : v)),
          (j.cancel = () => {
            void 0 !== l && clearTimeout(l), (h = 0), (u = _ = s = l = void 0);
          }),
          (j.flush = () => void 0 === l ? f : x(o())),
          j
        );
      };
    },
    72575: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e, t) => e === t || (e !== e && t !== t);
    },
    99097: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => e;
    },
    53822: (e, t, n) => {
            n.d(t, { default: () => s });
      const r = n(28177);
      const u = n(83527);
      const o = (e) => (0, u.default)(e) && "[object Arguments]" === (0, r.default)(e);
      const d = Object.prototype;
      const i = d.hasOwnProperty;
      const a = d.propertyIsEnumerable;
      const s = o(
        (() => arguments)(),
      )
        ? o
        : (e) => (
              (0, u.default)(e) && i.call(e, "callee") && !a.call(e, "callee")
            );
    },
    54814: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = Array.isArray;
    },
    29419: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(62942);
      const u = n(67702);
      const o = (e) => null != e && (0, u.default)(e.length) && !(0, r.default)(e);
    },
    25247: (e, t, n) => {
            n.d(t, { default: () => a });
      const r = n(78160);
      const u = () => !1;
      e = n.hmd(e);
      const o =
          "object" === typeof exports && exports && !exports.nodeType && exports;
      const d = o && e && !e.nodeType && e;
      const i = d && d.exports === o ? r.default.Buffer : void 0;
      const a = (i ? i.isBuffer : void 0) || u;
    },
    38651: (e, t, n) => {
            n.d(t, { default: () => l });
      const r = n(7492);
      const u = n(17873);
      const o = n(53822);
      const d = n(54814);
      const i = n(29419);
      const a = n(25247);
      const s = n(43744);
      const c = n(54744);
      const f = Object.prototype.hasOwnProperty;
      const l = (e) => {
        if (null == e) return !0;
        if (
          (0, i.default)(e) &&
          ((0, d.default)(e) ||
            "string" === typeof e ||
            "function" === typeof e.splice ||
            (0, a.default)(e) ||
            (0, c.default)(e) ||
            (0, o.default)(e))
        )
          return !e.length;
        const t = (0, u.default)(e);
        if ("[object Map]" === t || "[object Set]" === t) return !e.size;
        if ((0, s.default)(e)) return !(0, r.default)(e).length;
        for (const n in e) if (f.call(e, n)) return !1;
        return !0;
      };
    },
    16230: (e, t, n) => {
            n.d(t, { default: () => u });
      const r = n(96425);
      const u = (e, t) => (0, r.default)(e, t);
    },
    62942: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(28177);
      const u = n(98279);
      const o = (e) => {
        if (!(0, u.default)(e)) return !1;
        const t = (0, r.default)(e);
        return (
          "[object Function]" === t ||
          "[object GeneratorFunction]" === t ||
          "[object AsyncFunction]" === t ||
          "[object Proxy]" === t
        );
      };
    },
    67702: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => (
          "number" === typeof e && e > -1 && e % 1 === 0 && e <= 9007199254740991
        );
    },
    77973: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => null === e;
    },
    3308: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(28177);
      const u = n(83527);
      const o = (e) => (
          "number" === typeof e ||
          ((0, u.default)(e) && "[object Number]" === (0, r.default)(e))
        );
    },
    98279: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => {
        const t = typeof e;
        return null != e && ("object" === t || "function" === t);
      };
    },
    83527: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (e) => null != e && "object" === typeof e;
    },
    27147: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(28177);
      const u = n(54814);
      const o = n(83527);
      const d = (e) => (
          "string" === typeof e ||
          (!(0, u.default)(e) &&
            (0, o.default)(e) &&
            "[object String]" === (0, r.default)(e))
        );
    },
    8875: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(28177);
      const u = n(83527);
      const o = (e) => (
          "symbol" === typeof e ||
          ((0, u.default)(e) && "[object Symbol]" === (0, r.default)(e))
        );
    },
    54744: (e, t, n) => {
            n.d(t, { default: () => f });
      const r = n(28177);
      const u = n(67702);
      const o = n(83527);
      const d = {};
      (d["[object Float32Array]"] =
        d["[object Float64Array]"] =
        d["[object Int8Array]"] =
        d["[object Int16Array]"] =
        d["[object Int32Array]"] =
        d["[object Uint8Array]"] =
        d["[object Uint8ClampedArray]"] =
        d["[object Uint16Array]"] =
        d["[object Uint32Array]"] =
          !0),
        (d["[object Arguments]"] =
          d["[object Array]"] =
          d["[object ArrayBuffer]"] =
          d["[object Boolean]"] =
          d["[object DataView]"] =
          d["[object Date]"] =
          d["[object Error]"] =
          d["[object Function]"] =
          d["[object Map]"] =
          d["[object Number]"] =
          d["[object Object]"] =
          d["[object RegExp]"] =
          d["[object Set]"] =
          d["[object String]"] =
          d["[object WeakMap]"] =
            !1);
      const i = (e) => (
          (0, o.default)(e) &&
          (0, u.default)(e.length) &&
          !!d[(0, r.default)(e)]
        );
      const a = n(95256);
      const s = n(59283);
      const c = s.default?.isTypedArray;
      const f = c ? (0, a.default)(c) : i;
    },
    33358: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(31468);
      const u = n(7492);
      const o = n(29419);
      const d = (e) => (0, o.default)(e) ? (0, r.default)(e) : (0, u.default)(e);
    },
    64162: (e, t, n) => {
            n.d(t, { default: () => c });
      const r = n(31468);
      const u = n(98279);
      const o = n(43744);
      const d = (e) => {
        const t = [];
        if (null != e) for (const n in Object(e)) t.push(n);
        return t;
      };
      const i = Object.prototype.hasOwnProperty;
      const a = (e) => {
        if (!(0, u.default)(e)) return d(e);
        const t = (0, o.default)(e);
        const n = [];
        for (const r in e)
          ("constructor" !== r || (!t && i.call(e, r))) && n.push(r);
        return n;
      };
      const s = n(29419);
      const c = (e) => (0, s.default)(e) ? (0, r.default)(e, !0) : a(e);
    },
    48874: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(1141);
      function u(e, t) {
        if ("function" !== typeof e || (null != t && "function" !== typeof t))
          throw new TypeError("Expected a function");
        const n = function () {
          const r = arguments;
          const u = t ? t.apply(this, r) : r[0];
          const o = n.cache;
          if (o.has(u)) return o.get(u);
          const d = e.apply(this, r);
          return (n.cache = o.set(u, d) || o), d;
        };
        return (n.cache = new (u.Cache || r.default)()), n;
      }
      u.Cache = r.default;
      const o = u;
    },
    14314: (e, t, n) => {
            n.d(t, { default: () => H });
      const r = n(96335);
      let u = n(24402);
      const o = n(72575);
      const d = (e, t, n) => {
        ((void 0 !== n && !(0, o.default)(e[t], n)) ||
          (void 0 === n && !(t in e))) &&
          (0, u.default)(e, t, n);
      };
      const i = n(29718);
      const a = n(57508);
      const s = n(39895);
      const c = n(58555);
      const f = n(52222);
      const l = n(53822);
      const _ = n(54814);
      const h = n(29419);
      const p = n(83527);
      const b = (e) => (0, p.default)(e) && (0, h.default)(e);
      const v = n(25247);
      const g = n(62942);
      const m = n(98279);
      const y = n(28177);
      const w = n(56838);
      const x = Function.prototype;
      const j = Object.prototype;
      const E = x.toString;
      const S = j.hasOwnProperty;
      const O = E.call(Object);
      const z = (e) => {
        if (!(0, p.default)(e) || "[object Object]" !== (0, y.default)(e))
          return !1;
        const t = (0, w.default)(e);
        if (null === t) return !0;
        const n = S.call(t, "constructor") && t.constructor;
        return "function" === typeof n && n instanceof n && E.call(n) === O;
      };
      const A = n(54744);
      const P = (e, t) => {
        if (
          ("constructor" !== t || "function" !== typeof e[t]) &&
          "__proto__" !== t
        )
          return e[t];
      };
      const k = n(75969);
      const C = n(64162);
      const R = (e) => (0, k.default)(e, (0, C.default)(e));
      const L = (e, t, n, r, u, o, i) => {
        const h = P(e, n);
        const p = P(t, n);
        const y = i.get(p);
        if (y) d(e, n, y);
        else {
          let w = o ? o(h, p, `${n}`, e, t, i) : void 0;
          let x = void 0 === w;
          if (x) {
            const j = (0, _.default)(p);
            const E = !j && (0, v.default)(p);
            const S = !j && !E && (0, A.default)(p);
            (w = p),
              j || E || S
                ? (0, _.default)(h)
                  ? (w = h)
                  : b(h)
                  ? (w = (0, c.default)(h))
                  : E
                  ? ((x = !1), (w = (0, a.default)(p, !0)))
                  : S
                  ? ((x = !1), (w = (0, s.default)(p, !0)))
                  : (w = [])
                : z(p) || (0, l.default)(p)
                ? ((w = h),
                  (0, l.default)(h)
                    ? (w = R(h))
                    : ((0, m.default)(h) && !(0, g.default)(h)) ||
                      (w = (0, f.default)(p)))
                : (x = !1);
          }
          x && (i.set(p, w), u(w, p, r, o, i), i.delete(p)), d(e, n, w);
        }
      };
      const N = function e(t, n, u, o, a) {
        t !== n &&
          (0, i.default)(
            n,
            (i, s) => {
              if ((a || (a = new r.default()), (0, m.default)(i)))
                L(t, n, s, u, e, o, a);
              else {
                let c = o ? o(P(t, s), i, `${s}`, t, n, a) : void 0;
                void 0 === c && (c = i), d(t, s, c);
              }
            },
            C.default,
          );
      };
      const B = n(99097);
      const M = (e, t, n) => {
        switch (n.length) {
          case 0:
            return e.call(t);
          case 1:
            return e.call(t, n[0]);
          case 2:
            return e.call(t, n[0], n[1]);
          case 3:
            return e.call(t, n[0], n[1], n[2]);
        }
        return e.apply(t, n);
      };
      const I = Math.max;
      const T = (e, t, n) => (
          (t = I(void 0 === t ? e.length - 1 : t, 0)),
          function () {
            for (
              let r = arguments, u = -1, o = I(r.length - t, 0), d = Array(o);
              ++u < o;

            )
              d[u] = r[t + u];
            u = -1;
            for (const i = Array(t + 1); ++u < t; ) i[u] = r[u];
            return (i[t] = n(d)), M(e, this, i);
          }
        );
      const $ = (e) => () => e;
      const F = n(76780);
      const q = F.default
        ? (e, t) => (0, F.default)(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: $(t),
              writable: !0,
            })
        : B.default;
      const D = Date.now;
      const V = ((e) => {
        let t = 0;
        let n = 0;
        return () => {
          const r = D();
          const u = 16 - (r - n);
          if (((n = r), u > 0)) {
            if (++t >= 800) return arguments[0];
          } else t = 0;
          return e.apply(void 0, arguments);
        };
      })(q);
      const U = (e, t) => V(T(e, t, B.default), `${e}`);
      const W = n(93532);
      const H = ((e) => U((t, n) => {
          let r = -1;
          let u = n.length;
          let o = u > 1 ? n[u - 1] : void 0;
          const d = u > 2 ? n[2] : void 0;
          for (
            o = e.length > 3 && "function" === typeof o ? (u--, o) : void 0,
              d &&
                (0, W.default)(n[0], n[1], d) &&
                ((o = u < 3 ? void 0 : o), (u = 1)),
              t = Object(t);
            ++r < u;

          ) {
            const i = n[r];
            i && e(t, i, r, o);
          }
          return t;
        }))((e, t, n) => {
        N(e, t, n);
      });
    },
    95171: (e, t, n) => {
            n.d(t, {
        default: () => o,
      });
      const r = n(45582);
      const u = (e, t) => {
        let n;
        if ("function" !== typeof t) throw new TypeError("Expected a function");
        return (
          (e = (0, r.default)(e)),
          function () {
            return (
              --e > 0 && (n = t.apply(this, arguments)),
              e <= 1 && (t = void 0),
              n
            );
          }
        );
      };
      const o = (e) => u(2, e);
    },
    99094: (e, t, n) => {
            n.d(t, { default: () => M });
      let r = (e, t, n, r) => {
        let u = -1;
        const o = null == e ? 0 : e.length;
        for (r && o && (n = e[++u]); ++u < o; ) n = t(n, e[u], u, e);
        return n;
      };
      let u = n(29718);
      const o = n(33358);
      const d = (e, t) => e && (0, u.default)(e, t, o.default);
      let i = n(29419);
      const a = ((e, t) => (n, r) => {
          if (null == n) return n;
          if (!(0, i.default)(n)) return e(n, r);
          for (
            let u = n.length, o = t ? u : -1, d = Object(n);
            (t ? o-- : ++o < u) && !1 !== r(d[o], o, d);

          );
          return n;
        })(d);
      const s = n(96335);
      const c = n(96425);
      const f = (e, t, n, r) => {
        let u = n.length;
        const o = u;
        const d = !r;
        if (null == e) return !o;
        for (e = Object(e); u--; ) {
          const i = n[u];
          if (d && i[2] ? i[1] !== e[i[0]] : !(i[0] in e)) return !1;
        }
        while (++u < o) {
          const a = (i = n[u])[0];
          const f = e[a];
          const l = i[1];
          if (d && i[2]) {
            if (void 0 === f && !(a in e)) return !1;
          } else {
            const _ = new s.default();
            if (r) const h = r(f, l, a, e, t, _);
            if (!(void 0 === h ? (0, c.default)(l, f, 3, r, _) : h)) return !1;
          }
        }
        return !0;
      };
      const l = n(98279);
      const _ = (e) => e === e && !(0, l.default)(e);
      const h = (e) => {
        for (let t = (0, o.default)(e), n = t.length; n--; ) {
          const r = t[n];
          const u = e[r];
          t[n] = [r, u, _(u)];
        }
        return t;
      };
      const p = (e, t) => (n) => null != n && n[e] === t && (void 0 !== t || e in Object(n));
      const b = (e) => {
        const t = h(e);
        return 1 === t.length && t[0][2]
          ? p(t[0][0], t[0][1])
          : (n) => n === e || f(n, e, t);
      };
      const v = n(80838);
      const g = (e, t, n) => {
        const r = null == e ? void 0 : (0, v.default)(e, t);
        return void 0 === r ? n : r;
      };
      const m = (e, t) => null != e && t in Object(e);
      const y = n(23151);
      const w = n(53822);
      const x = n(54814);
      const j = n(17104);
      const E = n(67702);
      const S = n(87844);
      const O = (e, t, n) => {
        for (
          let r = -1, u = (t = (0, y.default)(t, e)).length, o = !1;
          ++r < u;

        ) {
          const d = (0, S.default)(t[r]);
          if (!(o = null != e && n(e, d))) break;
          e = e[d];
        }
        return o || ++r !== u
          ? o
          : !!(u = null == e ? 0 : e.length) &&
              (0, E.default)(u) &&
              (0, j.default)(d, u) &&
              ((0, x.default)(e) || (0, w.default)(e));
      };
      const z = (e, t) => null != e && O(e, t, m);
      const A = n(73204);
      const P = (e, t) => (0, A.default)(e) && _(t)
          ? p((0, S.default)(e), t)
          : (n) => {
              const r = g(n, e);
              return void 0 === r && r === t
                ? z(n, e)
                : (0, c.default)(t, r, 3);
            };
      const k = n(99097);
      const C = (e) => (t) => null == t ? void 0 : t[e];
      const R = (e) => (t) => (0, v.default)(t, e);
      const L = (e) => (0, A.default)(e) ? C((0, S.default)(e)) : R(e);
      const N = (e) => "function" === typeof e
          ? e
          : null == e
          ? k.default
          : "object" === typeof e
          ? (0, x.default)(e)
            ? P(e[0], e[1])
            : b(e)
          : L(e);
      const B = (e, t, n, r, u) => (
          u(e, (e, u, o) => {
            n = r ? ((r = !1), e) : t(n, e, u, o);
          }),
          n
        );
      const M = (e, t, n) => {
        const u = (0, x.default)(e) ? r : B;
        const o = arguments.length < 3;
        return u(e, N(t, 4), n, o, a);
      };
    },
    35987: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = () => [];
    },
    43370: (e, t, n) => {
            n.d(t, { default: () => o });
      const r = n(12481);
      const u = n(98279);
      const o = (e, t, n) => {
        let o = !0;
        let d = !0;
        if ("function" !== typeof e) throw new TypeError("Expected a function");
        return (
          (0, u.default)(n) &&
            ((o = "leading" in n ? !!n.leading : o),
            (d = "trailing" in n ? !!n.trailing : d)),
          (0, r.default)(e, t, { leading: o, maxWait: t, trailing: d })
        );
      };
    },
    45582: (e, t, n) => {
            n.d(t, { default: () => d });
      const r = n(68877);
      const u = 1 / 0;
      const o = (e) => e
          ? (e = (0, r.default)(e)) === u || e === -1 / 0
            ? 17976931348623157e292 * (e < 0 ? -1 : 1)
            : e === e
            ? e
            : 0
          : 0 === e
          ? e
          : 0;
      const d = (e) => {
        const t = o(e);
        const n = t % 1;
        return t === t ? (n ? t - n : t) : 0;
      };
    },
    68877: (e, t, n) => {
            n.d(t, { default: () => c });
      const r = n(98279);
      const u = n(8875);
      const o = /^\s+|\s+$/g;
      const d = /^[-+]0x[0-9a-f]+$/i;
      const i = /^0b[01]+$/i;
      const a = /^0o[0-7]+$/i;
      const s = parseInt;
      const c = (e) => {
        if ("number" === typeof e) return e;
        if ((0, u.default)(e)) return NaN;
        if ((0, r.default)(e)) {
          const t = "function" === typeof e.valueOf ? e.valueOf() : e;
          e = (0, r.default)(t) ? `${t}` : t;
        }
        if ("string" !== typeof e) return 0 === e ? e : +e;
        e = e.replace(o, "");
        const n = i.test(e);
        return n || a.test(e) ? s(e.slice(2), n ? 2 : 8) : d.test(e) ? NaN : +e;
      };
    },
    17987: (e, t, n) => {
            n.d(t, { default: () => c });
      const r = n(23151);
      const u = (e) => {
        const t = null == e ? 0 : e.length;
        return t ? e[t - 1] : void 0;
      };
      const o = n(80838);
      const d = n(43688);
      const i = (e, t) => t.length < 2 ? e : (0, o.default)(e, (0, d.default)(t, 0, -1));
      const a = n(87844);
      const s = (e, t) => (
          (t = (0, r.default)(t, e)),
          null == (e = i(e, t)) || delete e[(0, a.default)(u(t))]
        );
      const c = (e, t) => null == e || s(e, t);
    },
    64531: (e, t) => {
            let n;
            const r = !(
          "undefined" === typeof window ||
          !window.document ||
          !window.document.createElement
        );
      function u() {
        if (n) return n;
        if (!r || !window.document.body) return "indeterminate";
        const e = window.document.createElement("div");
        return (
          e.appendChild(document.createTextNode("ABCD")),
          (e.dir = "rtl"),
          (e.style.fontSize = "14px"),
          (e.style.width = "4px"),
          (e.style.height = "1px"),
          (e.style.position = "absolute"),
          (e.style.top = "-1000px"),
          (e.style.overflow = "scroll"),
          document.body.appendChild(e),
          (n = "reverse"),
          e.scrollLeft > 0
            ? (n = "default")
            : ((e.scrollLeft = 1), 0 === e.scrollLeft && (n = "negative")),
          document.body.removeChild(e),
          n
        );
      }
      (t.detectScrollType = u),
        (t.getNormalizedScrollLeft = (e, t) => {
          const n = e.scrollLeft;
          if ("rtl" !== t) return n;
          const r = u();
          if ("indeterminate" === r) return Number.NaN;
          switch (r) {
            case "negative":
              return e.scrollWidth - e.clientWidth + n;
            case "reverse":
              return e.scrollWidth - e.clientWidth - n;
          }
          return n;
        });
    },
    32563: (e, t, n) => {
            n.d(t, { mobiletouch: () => u, setClasses: () => d, touch: () => o });
      const r = n(5325);
      const u = r.mobiletouch;
      const o = r.touch;
      function d() {
        document.documentElement.classList.add(
          r.touch ? "feature-touch" : "feature-no-touch",
          r.mobiletouch ? "feature-mobiletouch" : "feature-no-mobiletouch",
        );
      }
    },
    49483: (e, t, n) => {
            n.r(t),
        n.d(t, {
          CheckMobile: () => f,
          appVersion: () => c,
          checkPageType: () => h,
          className: () => m,
          desktopAppVersion: () => s,
          isChrome: () => p,
          isDesktopApp: () => a,
          isEdge: () => v,
          isFF: () => b,
          isLinux: () => i,
          isMac: () => o,
          isSafari: () => g,
          isWindows: () => d,
          onGoPro: () => y,
          onMainPage: () => w,
          onWidget: () => l,
          supportTouch: () => _,
        });
      const r = n(5325);
      const u = (window.TradingView = window.TradingView || {});
      function o() {
        return r.isMac;
      }
      function d() {
        return r.isWindows;
      }
      function i() {
        return r.isLinux;
      }
      function a() {
        return /TVDesktop/i.test(navigator.userAgent);
      }
      function s() {
        const e = navigator.userAgent.match(/TVDesktop\/([^\s]+)/);
        return e?.[1];
      }
      function c() {
        const e = navigator.userAgent.match(/TradingView\/([^\s]+)/);
        return e?.[1];
      }
      const f = {
        Android: () => r.isAndroid,
        BlackBerry: () => r.isBlackBerry,
        iOS: () => r.isIOS,
        Opera: () => r.isOperaMini,
        isIPad: () => r.isIPad,
        any: () => r.isAnyMobile,
      };
      function l() {
        const e = [
            "^widgetembed/?$",
            "^cmewidgetembed/?$",
            "^([0-9a-zA-Z-]+)/widgetembed/?$",
            "^([0-9a-zA-Z-]+)/widgetstatic/?$",
            "^([0-9a-zA-Z-]+)?/?mediumwidgetembed/?$",
            "^twitter-chart/?$",
            "^embed(-static)?/([0-9a-zA-Z]{8})/?$",
            "^widgetpopup/?$",
            "^extension/?$",
            "^chatwidgetembed/?$",
            "^ideaswidgetembed/?$",
            "^ideas-widget/?$",
            "^view-idea-widget/([0-9a-zA-Z]{8})/?$",
            "^idea-popup/?$",
            "^hotlistswidgetembed/?$",
            "^([0-9a-zA-Z-]+)/hotlistswidgetembed/?$",
            "^marketoverviewwidgetembed/?$",
            "^([0-9a-zA-Z-]+)/marketoverviewwidgetembed/?$",
            "^eventswidgetembed/?$",
            "^tickerswidgetembed/?$",
            "^forexcrossrateswidgetembed/?$",
            "^forexheatmapwidgetembed/?$",
            "^marketquoteswidgetembed/?$",
            "^screenerwidget/?$",
            "^cryptomktscreenerwidget/?$",
            "^([0-9a-zA-Z-]+)/cryptomktscreenerwidget/?$",
            "^([0-9a-zA-Z-]+)/marketquoteswidgetembed/?$",
            "^technical-analysis-widget-embed/$",
            "^singlequotewidgetembed/?$",
            "^([0-9a-zA-Z-]+)/singlequotewidgetembed/?$",
            "^embed-widget/([0-9a-zA-Z-]+)/(([0-9a-zA-Z-]+)/)?$",
          ];
        const t = window.location.pathname.replace(/^\//, "");
        let n;
        for (let r = e.length - 1; r >= 0; r--)
          if (((n = new RegExp(e[r])), n.test(t))) return !0;
        return !1;
      }
      function _() {
        return r.mobiletouch || r.touch || r.isAnyMobile;
      }
      function h(e) {
        return (
          new URLSearchParams(window.location.search).get("page_type") === e
        );
      }
      (u.isMobile = f), (u.onWidget = l);
      const p = r.isChrome;
      const b = r.isFF;
      const v = r.isEdge;
      const g = r.isSafari;
      function m(e) {
        for (const [t, n] of Object.entries(u)) if (n === e) return t;
        return null;
      }
      function y() {
        return "/gopro/" === window.location.pathname;
      }
      function w() {
        return "/" === window.location.pathname;
      }
      u.className = m;
    },
    28865: (e, t, n) => {
            n.d(t, { getIsoLanguageCodeFromLanguage: () => u });
      const r = {
        ar_AE: "ar",
        br: "pt",
        de_DE: "de",
        ca_ES: "ca",
        he_IL: "he",
        id_ID: "id",
        in: "en",
        kr: "ko",
        ms_MY: "ms",
        sv_SE: "sv",
        th_TH: "th",
        uk: "en",
        vi_VN: "vi",
        zh_CN: "zh-Hans",
        zh_TW: "zh-Hant",
        zh: "zh-Hans",
      };
      function u(e) {
        return r[e] || e;
      }
    },
    87795: (e) => {
            const t = 55296;
            const n = 127995;
            const r = 127999;
            const u = [
          776, 2359, 2359, 2367, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657,
          4352, 4449, 4520,
        ];
      function o(e) {
        if ("string" !== typeof e)
          throw new Error("string cannot be undefined or null");
        const t = [];
        let n = 0;
        let r = 0;
        while (n < e.length)
          (r += d(n + r, e)),
            c(e[n + r]) && r++,
            a(e[n + r]) && r++,
            s(e[n + r]) && r++,
            f(e[n + r])
              ? r++
              : (t.push(e.substring(n, n + r)), (n += r), (r = 0));
        return t;
      }
      function d(e, u) {
        const o = u[e];
        if (
          !((e) => e && _(e[0].charCodeAt(0), t, 56319))(o) ||
          e === u.length - 1
        )
          return 1;
        const d = o + u[e + 1];
        const a = u.substring(e + 2, e + 5);
        return (i(d) && i(a)) ||
          ((e) => _(l(e), n, r))(a)
          ? 4
          : 2;
      }
      function i(e) {
        return _(l(e), 127462, 127487);
      }
      function a(e) {
        return "string" === typeof e && _(e.charCodeAt(0), 65024, 65039);
      }
      function s(e) {
        return "string" === typeof e && _(e.charCodeAt(0), 8400, 8447);
      }
      function c(e) {
        return "string" === typeof e && -1 !== u.indexOf(e.charCodeAt(0));
      }
      function f(e) {
        return "string" === typeof e && 8205 === e.charCodeAt(0);
      }
      function l(e) {
        return (
          ((e.charCodeAt(0) - t) << 10) + (e.charCodeAt(1) - 56320) + 65536
        );
      }
      function _(e, t, n) {
        return e >= t && e <= n;
      }
      (e.exports = o),
        (e.exports.substr = (e, t, n) => {
          const r = o(e);
          if (void 0 === t) return e;
          if (t >= r.length) return "";
          const u = r.length - t;
          let d = t + (void 0 === n ? u : n);
          return d > t + u && (d = void 0), r.slice(t, d).join("");
        });
    },
    14483: (e, t, n) => {
            n.r(t),
        n.d(t, {
          disable: () => f,
          enable: () => c,
          enabled: () => a,
          getAllFeatures: () => l,
          setEnabled: () => s,
        });
      const r = JSON.parse(
        '{"14851":{},"custom_items_in_context_menu":{},"countdown":{},"symbol_search_parser_mixin":{},"pay_attention_to_ticker_not_symbol":{},"graying_disabled_tools_enabled":{},"update_study_formatter_on_symbol_resolve":{},"constraint_dialogs_movement":{},"phone_verification":{},"show_trading_notifications_history":{},"show_interval_dialog_on_key_press":{},"header_interval_dialog_button":{"subsets":["show_interval_dialog_on_key_press"]},"header_fullscreen_button":{},"header_symbol_search":{},"symbol_search_hot_key":{},"header_resolutions":{"subsets":["header_interval_dialog_button"]},"header_chart_type":{},"header_settings":{},"header_indicators":{},"header_compare":{},"header_undo_redo":{},"header_screenshot":{},"header_saveload":{},"study_on_study":{},"scales_date_format":{},"scales_time_hours_format":{},"header_widget":{"subsets":["header_widget_dom_node","header_symbol_search","header_resolutions","header_chart_type","header_settings","header_indicators","header_compare","header_undo_redo","header_fullscreen_button","compare_symbol","header_screenshot"]},"legend_widget":{},"compare_symbol":{"subsets":["header_compare"]},"property_pages":{"subsets":["show_chart_property_page","chart_property_page"]},"show_chart_property_page":{},"chart_property_page":{"subsets":["chart_property_page_scales","chart_property_page_trading","chart_property_page_right_margin_editor"]},"left_toolbar":{},"right_toolbar":{},"hide_left_toolbar_by_default":{},"control_bar":{},"widget_logo":{},"timeframes_toolbar":{},"edit_buttons_in_legend":{"subsets":["show_hide_button_in_legend","format_button_in_legend","study_buttons_in_legend","delete_button_in_legend"]},"show_hide_button_in_legend":{},"object_tree_legend_mode":{},"format_button_in_legend":{},"study_buttons_in_legend":{},"delete_button_in_legend":{},"broker_button":{},"buy_sell_buttons":{"subsets":["broker_button"]},"pane_context_menu":{},"scales_context_menu":{},"legend_context_menu":{},"context_menus":{"subsets":["pane_context_menu","scales_context_menu","legend_context_menu","objects_tree_context_menu"]},"items_favoriting":{},"save_chart_properties_to_local_storage":{},"use_localstorage_for_settings":{"subsets":["items_favoriting","save_chart_properties_to_local_storage"]},"handle_scale":{"subsets":["mouse_wheel_scale","pinch_scale","axis_pressed_mouse_move_scale"]},"handle_scroll":{"subsets":["mouse_wheel_scroll","pressed_mouse_move_scroll","horz_touch_drag_scroll","vert_touch_drag_scroll"]},"plain_studymarket":{},"disable_resolution_rebuild":{},"border_around_the_chart":{},"charting_library_debug_mode":{},"saveload_requires_authentication":{},"saveload_storage_customization":{},"volume_force_overlay":{},"create_volume_indicator_by_default":{},"create_volume_indicator_by_default_once":{},"saved_charts_count_restriction":{},"lean_chart_load":{},"stop_study_on_restart":{},"star_some_intervals_by_default":{},"move_logo_to_main_pane":{},"show_animated_logo":{},"link_to_tradingview":{},"logo_without_link":{},"logo_always_maximized":{},"right_bar_stays_on_scroll":{},"chart_content_overrides_by_defaults":{},"snapshot_trading_drawings":{},"allow_supported_resolutions_set_only":{},"widgetbar_tabs":{"subsets":["right_toolbar"]},"show_object_tree":{"subsets":["right_toolbar"]},"dom_widget":{"subsets":["right_toolbar"]},"collapsible_header":{},"study_templates":{},"side_toolbar_in_fullscreen_mode":{},"header_in_fullscreen_mode":{},"remove_library_container_border":{},"whotrades_auth_only":{},"support_multicharts":{},"display_market_status":{},"display_data_mode":{},"datasource_copypaste":{},"drawing_templates":{"subsets":["linetoolpropertieswidget_template_button"]},"expand_symbolsearch_items":{},"symbol_search_three_columns_exchanges":{},"symbol_search_flags":{},"symbol_search_limited_exchanges":{},"bugreport_button":{"subsets":["right_toolbar"]},"footer_publish_idea_button":{},"text_notes":{},"show_source_code":{},"symbol_info":{},"no_bars_status":{},"clear_bars_on_series_error":{},"hide_loading_screen_on_series_error":{},"seconds_resolution":{},"dont_show_boolean_study_arguments":{},"hide_last_na_study_output":{},"price_scale_always_last_bar_value":{},"study_dialog_fundamentals_economy_addons":{},"uppercase_instrument_names":{},"trading_notifications":{},"chart_crosshair_menu":{},"japanese_chart_styles":{},"hide_series_legend_item":{},"hide_study_overlay_legend_item":{},"hide_study_compare_legend_item":{},"linetoolpropertieswidget_template_button":{},"use_overrides_for_overlay":{},"timezone_menu":{},"main_series_scale_menu":{},"show_login_dialog":{},"remove_img_from_rss":{},"bars_marks":{},"chart_scroll":{},"chart_zoom":{},"source_selection_markers":{},"low_density_bars":{},"end_of_period_timescale_marks":{},"open_account_manager":{},"show_order_panel_on_start":{},"order_panel":{"subsets":["order_panel_close_button","order_panel_undock","right_toolbar","order_info"]},"multiple_watchlists":{},"watchlist_import_export":{},"study_overlay_compare_legend_option":{},"mobile_app_action_open_details_webview":{},"custom_resolutions":{},"referral_program_for_widget_owners":{},"mobile_trading":{},"real_brokers":{},"no_min_chart_width":{},"lock_visible_time_range_on_resize":{},"pricescale_currency":{},"cropped_tick_marks":{},"trading_account_manager":{},"disable_sameinterval_aligning":{},"display_legend_on_all_charts":{},"chart_style_hilo":{},"chart_style_hilo_last_price":{},"pricescale_unit":{},"show_spread_operators":{},"hide_exponentiation_spread_operator":{},"hide_reciprocal_spread_operator":{},"compare_symbol_search_spread_operators":{},"studies_symbol_search_spread_operators":{},"hide_resolution_in_legend":{},"hide_unresolved_symbols_in_legend":{},"fix_left_edge":{},"study_symbol_ticker_description":{},"two_character_bar_marks_labels":{},"tick_resolution":{},"secondary_series_extend_time_scale":{},"hide_volume_ma":{},"small_no_display":{},"charting_library_single_symbol_request":{},"use_ticker_on_symbol_info_update":{},"show_zoom_and_move_buttons_on_touch":{},"hide_main_series_symbol_from_indicator_legend":{},"chart_hide_close_position_button":{},"chart_hide_close_order_button":{},"hide_price_scale_global_last_bar_value":{"subsets":["use_last_visible_bar_value_in_legend"]},"keep_object_tree_widget_in_right_toolbar":{},"show_average_close_price_line_and_label":{},"hide_image_invalid_symbol":{},"hide_object_tree_and_price_scale_exchange_label":{},"confirm_overwrite_if_chart_layout_with_name_exists":{},"determine_first_data_request_size_using_visible_range":{},"use_na_string_for_not_available_values":{},"show_last_price_and_change_only_in_series_legend":{},"show_context_menu_in_crosshair_if_only_one_item":{},"iframe_loading_compatibility_mode":{},"show_percent_option_for_right_margin":{},"watchlist_context_menu":{},"app_phone":{},"app_tablet":{},"tv_production":{"subsets":["auto_enable_symbol_labels","symbol_search_parser_mixin","header_fullscreen_button","header_widget","dont_show_boolean_study_arguments","left_toolbar","right_toolbar","buy_sell_buttons","control_bar","symbol_search_hot_key","context_menus","edit_buttons_in_legend","object_tree_legend_mode","uppercase_instrument_names","use_localstorage_for_settings","saveload_requires_authentication","volume_force_overlay","saved_charts_count_restriction","create_volume_indicator_by_default","create_volume_indicator_by_default_once","charts_auto_save","save_old_chart_before_save_as","chart_content_overrides_by_defaults","alerts","header_saveload","header_layouttoggle","datasource_copypaste","show_saved_watchlists","watchlists_from_to_file","add_to_watchlist","property_pages","support_multicharts","display_market_status","display_data_mode","show_chart_warn_message","support_manage_drawings","widgetbar_tabs","study_templates","collapsible_header","drawing_templates","footer_publish_idea_button","text_notes","show_source_code","symbol_info","linetoolpropertieswidget_template_button","trading_notifications","symbol_search_three_columns_exchanges","symbol_search_flags","symbol_search_limited_exchanges","phone_verification","custom_resolutions","compare_symbol","study_on_study","japanese_chart_styles","show_login_dialog","dom_widget","bars_marks","chart_scroll","chart_zoom","show_trading_notifications_history","source_selection_markers","study_dialog_fundamentals_economy_addons","multiple_watchlists","marked_symbols","order_panel","pricescale_currency","show_animated_logo","pricescale_currency","show_object_tree","watchlist_import_export","scales_date_format","scales_time_hours_format","popup_hints","show_right_widgets_panel_by_default","compare_recent_symbols_enabled","adaptive_trading_sources","chart_style_hilo_last_price"]},"widget":{"subsets":["auto_enable_symbol_labels","symbol_search_parser_mixin","uppercase_instrument_names","left_toolbar","right_toolbar","control_bar","symbol_search_hot_key","context_menus","edit_buttons_in_legend","object_tree_legend_mode","use_localstorage_for_settings","saveload_requires_authentication","volume_force_overlay","create_volume_indicator_by_default","create_volume_indicator_by_default_once","dont_show_boolean_study_arguments","header_widget_dom_node","header_symbol_search","header_resolutions","header_chart_type","header_compare","header_indicators","star_some_intervals_by_default","display_market_status","display_data_mode","show_chart_warn_message","symbol_info","linetoolpropertieswidget_template_button","symbol_search_three_columns_exchanges","symbol_search_flags","symbol_search_limited_exchanges","widgetbar_tabs","compare_symbol","show_login_dialog","plain_studymarket","japanese_chart_styles","bars_marks","chart_scroll","chart_zoom","source_selection_markers","property_pages","show_right_widgets_panel_by_default","chart_style_hilo_last_price"]},"bovespa_widget":{"subsets":["widget","header_settings","linetoolpropertieswidget_template_button","compare_recent_symbols_enabled"]},"charting_library_base":{"subsets":["14851","allow_supported_resolutions_set_only","auto_enable_symbol_labels","border_around_the_chart","collapsible_header","constraint_dialogs_movement","context_menus","control_bar","create_volume_indicator_by_default","custom_items_in_context_menu","datasource_copypaste","uppercase_instrument_names","display_market_status","edit_buttons_in_legend","object_tree_legend_mode","graying_disabled_tools_enabled","header_widget","legend_widget","header_saveload","dont_show_boolean_study_arguments","lean_chart_load","left_toolbar","right_toolbar","link_to_tradingview","pay_attention_to_ticker_not_symbol","plain_studymarket","refresh_saved_charts_list_on_dialog_show","right_bar_stays_on_scroll","saveload_storage_customization","stop_study_on_restart","timeframes_toolbar","symbol_search_hot_key","update_study_formatter_on_symbol_resolve","update_timeframes_set_on_symbol_resolve","use_localstorage_for_settings","volume_force_overlay","widget_logo","countdown","use_overrides_for_overlay","trading_notifications","compare_symbol","symbol_info","timezone_menu","main_series_scale_menu","create_volume_indicator_by_default_once","bars_marks","chart_scroll","chart_zoom","source_selection_markers","property_pages","go_to_date","adaptive_logo","show_animated_logo","handle_scale","handle_scroll","shift_visible_range_on_new_bar","chart_content_overrides_by_defaults","cropped_tick_marks","scales_date_format","scales_time_hours_format","popup_hints","save_shortcut","show_right_widgets_panel_by_default","show_object_tree","insert_indicator_dialog_shortcut","compare_recent_symbols_enabled","hide_main_series_symbol_from_indicator_legend","chart_style_hilo","request_only_visible_range_on_reset","clear_price_scale_on_error_or_empty_bars","show_symbol_logo_in_legend","show_symbol_logo_for_compare_studies","accessibility"]},"charting_library":{"subsets":["charting_library_base"]},"static_charts_service":{"subsets":["charting_library","disable_resolution_rebuild"]},"trading_terminal":{"subsets":["charting_library_base","support_multicharts","header_layouttoggle","japanese_chart_styles","chart_property_page_trading","add_to_watchlist","open_account_manager","show_dom_first_time","order_panel","buy_sell_buttons","multiple_watchlists","show_trading_notifications_history","always_pass_called_order_to_modify","show_object_tree","watchlist_import_export","drawing_templates","trading_account_manager","chart_crosshair_menu","compare_recent_symbols_enabled","adaptive_trading_sources","watchlist_context_menu","show_symbol_logo_in_account_manager","watchlist_sections","enable_dom_data_for_untradable_symbols"]}}',
      );
      const u = n.t(r, 2);
      const o = new Map();
      const d = new Map();
      const i = new Set();
      function a(e) {
        const t = o.get(e);
        if (void 0 !== t) return t;
        const n = d.get(e);
        return !!n && n.some(a);
      }
      function s(e, t) {
        o.set(String(e), Boolean(t));
      }
      function c(e) {
        s(e, !0);
      }
      function f(e) {
        s(e, !1);
      }
      function l() {
        const e = Object.create(null);
        for (const t of i) e[t] = a(t);
        return e;
      }
      !(() => {
        for (const [e, t] of Object.entries(u))
          if ((i.add(e), "subsets" in t))
            for (const n of t.subsets) {
              i.add(n);
              let t = d.get(n);
              void 0 === t && ((t = []), d.set(n, t)), t.push(e);
            }
        "object" === typeof __initialDisabledFeaturesets &&
          Array.isArray(__initialDisabledFeaturesets) &&
          __initialDisabledFeaturesets.forEach(f),
          "object" === typeof __initialEnabledFeaturesets &&
            Array.isArray(__initialEnabledFeaturesets) &&
            __initialEnabledFeaturesets.forEach(c);
      })();
    },
    1722: function (e, t, n) {
      let r;
      e = n.nmd(e);
      const u =
          Array.isArray ||
          (e) => "[object Array]" === Object.prototype.toString.call(e),
        o = (e) => "object" == typeof e && null !== e;
      function d(e) {
        return "number" === typeof e && Number.isFinite(e);
      }
      function i(e) {
        return (
          null != e &&
          (e.constructor === Function ||
            "[object Function]" === Object.prototype.toString.call(e))
        );
      }
      function a(e, t) {
        e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        });
      }
      "undefined" !== typeof window
        ? ((r = window.TradingView = window.TradingView || {}),
          (window.isNumber = d),
          (window.isFunction = i),
          (window.inherit = a),
          (window.isArray = u))
        : (r = this.TradingView = this.TradingView || {}),
        (r.isNaN = (e) => !(e <= 0 || e > 0)),
        (r.isAbsent = (e) => null == e),
        (r.isExistent = (e) => null != e),
        (Number.isNaN =
          Number.isNaN ||
          (e) => e != e),
        (r.isSameType = (e, t) => Number.isNaN(e) || Number.isNaN(t)
            ? Number.isNaN(e) === Number.isNaN(t)
            : {}.toString.call(e) === {}.toString.call(t)),
        (r.isInteger = (e) => "number" == typeof e && e % 1 == 0),
        (r.isString = (e) => null != e && e.constructor === String),
        (r.isInherited = (e, t) => {
          if (null == e || null == e.prototype)
            throw new TypeError(
              "isInherited: child should be a constructor function",
            );
          if (null == t || null == t.prototype)
            throw new TypeError(
              "isInherited: parent should be a constructor function",
            );
          return e.prototype instanceof t || e.prototype === t.prototype;
        }),
        (r.clone = (e) => {
          if (!e || "object" !== typeof e) return e;
          let t;
          let n;
          let u;
          for (n in ((t = "function" === typeof e.pop ? [] : {}), e))
            e.hasOwnProperty(n) &&
              ((u = e[n]), (t[n] = u && "object" === typeof u ? r.clone(u) : u));
          return t;
        }),
        (r.deepEquals = (e, t, n) => {
          if ((n || (n = ""), e === t)) return [!0, n];
          if (
            (i(e) && (e = void 0),
            i(t) && (t = void 0),
            void 0 === e && void 0 !== t)
          )
            return [!1, n];
          if (void 0 === t && void 0 !== e) return [!1, n];
          if (null === e && null !== t) return [!1, n];
          if (null === t && null !== e) return [!1, n];
          if ("object" !== typeof e && "object" !== typeof t) return [e === t, n];
          if (Array.isArray(e) && Array.isArray(t)) {
            const o = e.length;
            if (o !== t.length) return [!1, n];
            for (let d = 0; d < o; d++) {
              if (!(s = r.deepEquals(e[d], t[d], `${n}[${d}]`))[0])
                return s;
            }
            return [!0, n];
          }
          if (u(e) || u(t)) return [!1, n];
          if (Object.keys(e).length !== Object.keys(t).length) return [!1, n];
          for (const a in e) {
            let s;
            if (!(s = r.deepEquals(e[a], t[a], `${n}[${a}]`))[0]) return s;
          }
          return [!0, n];
        }),
        (r.merge = (e, t) => {
          for (const n in t)
            null !== t[n] && "object" === typeof t[n] && e.hasOwnProperty(n)
              ? r.merge(e[n], t[n])
              : (e[n] = t[n]);
          return e;
        }),
        e &&
          e.exports &&
          (e.exports = {
            inherit: a,
            clone: r.clone,
            merge: r.merge,
            isNumber: d,
            isInteger: r.isInteger,
            isString: r.isString,
            isObject: o,
            isHashObject: (e) => (
                o(e) &&
                -1 !== e.constructor.toString().indexOf("function Object")
              ),
            isPromise: (e) => o(e) && e.then,
            isNaN: r.isNaN,
            isAbsent: r.isAbsent,
            isExistent: r.isExistent,
            isSameType: r.isSameType,
            isArray: u,
            isFunction: i,
            parseBool: r.parseBool,
            deepEquals: r.deepEquals,
            notNull: (e) => null !== e,
            notUndefined: (e) => void 0 !== e,
            isEven: (e) => e % 2 == 0,
            declareClassAsPureInterface: (e, t) => {
              for (const n in e.prototype)
                "function" === typeof e.prototype[n] &&
                  e.prototype.hasOwnProperty(n) &&
                  (e.prototype[n] = () => {
                    throw new Error(
                      `${t}::${n} is an interface member declaration and must be overloaded in order to be called`,
                    );
                  });
            },
            requireFullInterfaceImplementation: (e, t, n, r) => {
              for (const u in n.prototype)
                if ("function" === typeof n.prototype[u] && !e.prototype[u])
                  throw new Error(
                    `Interface implementation assertion failed: ${t} does not implement ${r}::${u} function`,
                  );
            },
          });
    },
    42053: (e, t, n) => {
            n.r(t);
      const r = n(1722);
      const u = /{(\w+)}/g;
      const o = /{(\d+)}/g;
      String.prototype.format = function (...e) {
        const t = (0, r.isObject)(e[0]);
        const n = t ? u : o;
        const d = t
            ? (t, n) => {
                const r = e[0];
                return void 0 !== r[n] ? r[n] : t;
              }
            : (t, n) => {
                const r = parseInt(n, 10);
                const u = e[r];
                return void 0 !== u ? u : t;
              };
        return this.replace(n, d);
      };
    },
    95374: () => {
            let e;
            let t;
            let n;
            let r;
            let u;
            let o;
      window.parent !== window &&
        window.CanvasRenderingContext2D &&
        window.TextMetrics &&
        (t = window.CanvasRenderingContext2D.prototype) &&
        t.hasOwnProperty("font") &&
        t.hasOwnProperty("mozTextStyle") &&
        "function" === typeof t.__lookupSetter__ &&
        (n = t.__lookupSetter__("font")) &&
        (t.__defineSetter__("font", function (e) {
          try {
            return n.call(this, e);
          } catch (e) {
            if ("NS_ERROR_FAILURE" !== e.name) throw e;
          }
        }),
        (r = t.measureText),
        (e = function () {
          (this.width = 0),
            (this.isFake = !0),
            (this.__proto__ = window.TextMetrics.prototype);
        }),
        (t.measureText = function (t) {
          try {
            return r.apply(this, arguments);
          } catch (t) {
            if ("NS_ERROR_FAILURE" !== t.name) throw t;
            return new e();
          }
        }),
        (u = t.fillText),
        (t.fillText = function (e, t, n, r) {
          try {
            u.apply(this, arguments);
          } catch (e) {
            if ("NS_ERROR_FAILURE" !== e.name) throw e;
          }
        }),
        (o = t.strokeText),
        (t.strokeText = function (e, t, n, r) {
          try {
            o.apply(this, arguments);
          } catch (e) {
            if ("NS_ERROR_FAILURE" !== e.name) throw e;
          }
        }));
    },
    18438: (e, t, n) => {
            n.d(t, { default: () => r });
      const r = (() => {
        const e = {
            base: "https://twemoji.maxcdn.com/v/13.0.1/",
            ext: ".png",
            size: "72x72",
            className: "emoji",
            convert: {
              fromCodePoint: (e) => {
                let t = "string" === typeof e ? parseInt(e, 16) : e;
                if (t < 65536) return i(t);
                return i(55296 + ((t -= 65536) >> 10), 56320 + (1023 & t));
              },
              toCodePoint: v,
            },
            onerror: function () {
              this.parentNode?.replaceChild(a(this.alt, !1), this);
            },
            parse: (t, n) => {
              (n && "function" !== typeof n) || (n = { callback: n });
              return ("string" === typeof t ? _ : l)(t, {
                callback: n.callback || s,
                attributes:
                  "function" === typeof n.attributes ? n.attributes : p,
                base: "string" === typeof n.base ? n.base : e.base,
                ext: n.ext || e.ext,
                size:
                  n.folder ||
                  ((r = n.size || e.size),
                  "number" === typeof r ? `${r}x${r}` : r),
                className: n.className || e.className,
                onerror: n.onerror || e.onerror,
              });
              let r;
            },
            replace: b,
            test: (e) => {
              n.lastIndex = 0;
              const t = n.test(e);
              return (n.lastIndex = 0), t;
            },
          };
        const t = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;",
          };
        const n =
            /(?:\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udeeb\udeec\udef4-\udefc\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78\udd7a-\uddb4\uddb7\uddba\uddbc-\uddcb\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7a\ude80-\ude86\ude90-\udea8\udeb0-\udeb6\udec0-\udec2\uded0-\uded6]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
        const r = /\uFE0F/g;
        const u = String.fromCharCode(8205);
        const o = /[&<>'"]/g;
        const d = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/;
        const i = String.fromCharCode;
        return e;
        function a(e, t) {
          return document.createTextNode(t ? e.replace(r, "") : e);
        }
        function s(e, t) {
          return "".concat(t.base, t.size, "/", e, t.ext);
        }
        function c(e, t) {
          for (let n, r, u = e.childNodes, o = u.length; o--; )
            3 === (r = (n = u[o]).nodeType)
              ? t.push(n)
              : 1 !== r ||
                "ownerSVGElement" in n ||
                d.test(n.nodeName.toLowerCase()) ||
                c(n, t);
          return t;
        }
        function f(e) {
          return v(e.indexOf(u) < 0 ? e.replace(r, "") : e);
        }
        function l(e, t) {
          for (
            let r,
              u,
              o,
              d,
              i,
              s,
              l,
              _,
              h,
              p,
              b,
              v,
              g,
              m = c(e, []),
              y = m.length;
            y--;

          ) {
            for (
              o = !1,
                d = document.createDocumentFragment(),
                s = (i = m[y]).nodeValue,
                _ = 0;
              (l = n.exec(s));

            ) {
              if (
                ((h = l.index) !== _ && d.appendChild(a(s.slice(_, h), !0)),
                (v = f((b = l[0]))),
                (_ = h + b.length),
                (g = t.callback(v, t)),
                v && g)
              ) {
                for (u in (((p = new Image()).onerror = t.onerror),
                p.setAttribute("draggable", "false"),
                (r = t.attributes(b, v))))
                  r.hasOwnProperty(u) &&
                    0 !== u.indexOf("on") &&
                    !p.hasAttribute(u) &&
                    p.setAttribute(u, r[u]);
                (p.className = t.className),
                  (p.alt = b),
                  (p.src = g),
                  (o = !0),
                  d.appendChild(p);
              }
              p || d.appendChild(a(b, !1)), (p = null);
            }
            o &&
              (_ < s.length && d.appendChild(a(s.slice(_), !0)),
              i.parentNode.replaceChild(d, i));
          }
          return e;
        }
        function _(e, t) {
          return b(e, (e) => {
            let n;
            let r;
            let u = e;
            const d = f(e);
            const i = t.callback(d, t);
            if (d && i) {
              for (r in ((u = "<img ".concat(
                'class="',
                t.className,
                '" ',
                'draggable="false" ',
                'alt="',
                e,
                '"',
                ' src="',
                i,
                '"',
              )),
              (n = t.attributes(e, d))))
                n.hasOwnProperty(r) &&
                  0 !== r.indexOf("on") &&
                  -1 === u.indexOf(` ${r}=`) &&
                  (u = u.concat(" ", r, '="', n[r].replace(o, h), '"'));
              u = u.concat("/>");
            }
            return u;
          });
        }
        function h(e) {
          return t[e];
        }
        function p() {
          return null;
        }
        function b(e, t) {
          return String(e).replace(n, t);
        }
        function v(e, t) {
          for (let n = [], r = 0, u = 0, o = 0; o < e.length; )
            (r = e.charCodeAt(o++)),
              u
                ? (n.push(
                    (65536 + ((u - 55296) << 10) + (r - 56320)).toString(16),
                  ),
                  (u = 0))
                : 55296 <= r && r <= 56319
                ? (u = r)
                : n.push(r.toString(16));
          return n.join(t || "-");
        }
      })();
    },
    85459: function (e, t, n) {
      let r;
      !((t) => {
                function u() {}
        const o = u.prototype;
        const d = t.EventEmitter;
        function i(e, t) {
          for (let n = e.length; n--; ) if (e[n].listener === t) return n;
          return -1;
        }
        function a(e) {
          return function () {
            return this[e].apply(this, arguments);
          };
        }
        function s(e) {
          return (
            "function" === typeof e ||
            e instanceof RegExp ||
            (!(!e || "object" !== typeof e) && s(e.listener))
          );
        }
        (o.getListeners = function (e) {
          let t;
          let n;
          const r = this._getEvents();
          if (e instanceof RegExp)
            for (n in ((t = {}), r))
              r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);
          else t = r[e] || (r[e] = []);
          return t;
        }),
          (o.flattenListeners = (e) => {
            let t;
            const n = [];
            for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
            return n;
          }),
          (o.getListenersAsObject = function (e) {
            let t;
            const n = this.getListeners(e);
            return Array.isArray(n) && ((t = {})[e] = n), t || n;
          }),
          (o.addListener = function (e, t) {
            if (!s(t)) throw new TypeError("listener must be a function");
            let n;
            const r = this.getListenersAsObject(e);
            const u = "object" === typeof t;
            for (n in r)
              r.hasOwnProperty(n) &&
                -1 === i(r[n], t) &&
                r[n].push(u ? t : { listener: t, once: !1 });
            return this;
          }),
          (o.on = a("addListener")),
          (o.addOnceListener = function (e, t) {
            return this.addListener(e, { listener: t, once: !0 });
          }),
          (o.once = a("addOnceListener")),
          (o.defineEvent = function (e) {
            return this.getListeners(e), this;
          }),
          (o.defineEvents = function (e) {
            for (let t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this;
          }),
          (o.removeListener = function (e, t) {
            let n;
            let r;
            const u = this.getListenersAsObject(e);
            for (r in u)
              u.hasOwnProperty(r) &&
                -1 !== (n = i(u[r], t)) &&
                u[r].splice(n, 1);
            return this;
          }),
          (o.off = a("removeListener")),
          (o.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t);
          }),
          (o.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t);
          }),
          (o.manipulateListeners = function (e, t, n) {
            let r;
            let u;
            const o = e ? this.removeListener : this.addListener;
            const d = e ? this.removeListeners : this.addListeners;
            if ("object" !== typeof t || t instanceof RegExp)
              for (r = n.length; r--; ) o.call(this, t, n[r]);
            else
              for (r in t)
                t.hasOwnProperty(r) &&
                  (u = t[r]) &&
                  ("function" === typeof u
                    ? o.call(this, r, u)
                    : d.call(this, r, u));
            return this;
          }),
          (o.removeEvent = function (e) {
            let t;
            const n = typeof e;
            const r = this._getEvents();
            if ("string" === n) delete r[e];
            else if (e instanceof RegExp)
              for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
            else this._events = undefined;
            return this;
          }),
          (o.removeAllListeners = a("removeEvent")),
          (o.emitEvent = function (e, t) {
            let n;
            let r;
            let u;
            let o;
            const d = this.getListenersAsObject(e);
            for (o in d)
              if (d.hasOwnProperty(o))
                for (n = d[o].slice(0), u = 0; u < n.length; u++)
                  !0 === (r = n[u]).once && this.removeListener(e, r.listener),
                    r.listener.apply(this, t || []) ===
                      this._getOnceReturnValue() &&
                      this.removeListener(e, r.listener);
            return this;
          }),
          (o.trigger = a("emitEvent")),
          (o.emit = function (e) {
            const t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t);
          }),
          (o.setOnceReturnValue = function (e) {
            return (this._onceReturnValue = e), this;
          }),
          (o._getOnceReturnValue = function () {
            return (
              !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            );
          }),
          (o._getEvents = function () {
            return this._events || (this._events = {});
          }),
          (u.noConflict = () => (t.EventEmitter = d), u),
          void 0 ===
            (r = () => u.call(t, n, t, e)) || (e.exports = r);
      })(this || {});
    },
    27714: (e, t, n) => {
            function r(e) {
        const t = e.width;
        const n = e.height;
        if (t < 0) throw new Error("Negative width is not allowed for Size");
        if (n < 0) throw new Error("Negative height is not allowed for Size");
        return { width: t, height: n };
      }
      function u(e, t) {
        return e.width === t.width && e.height === t.height;
      }
      n.d(t, {
        CanvasRenderingTarget2D: () => s,
        bindCanvasElementBitmapSizeTo: () => i,
        equalSizes: () => u,
        size: () => r,
      });
      const o = (() => {
        function e(e) {;
          (this._resolutionListener = () => this._onResolutionChanged()),
            (this._resolutionMediaQueryList = null),
            (this._observers = []),
            (this._window = e),
            this._installResolutionListener();
        }
        return (
          (e.prototype.dispose = function () {
            this._uninstallResolutionListener(), (this._window = null);
          }),
          Object.defineProperty(e.prototype, "value", {
            get: function () {
              return this._window.devicePixelRatio;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.subscribe = function (e) {
            const 
              n = { next: e };
            return (
              this._observers.push(n),
              {
                unsubscribe: () => {
                  this._observers = this._observers.filter((e) => e !== n);
                },
              }
            );
          }),
          (e.prototype._installResolutionListener = function () {
            if (null !== this._resolutionMediaQueryList)
              throw new Error("Resolution listener is already installed");
            const e = this._window.devicePixelRatio;
            (this._resolutionMediaQueryList = this._window.matchMedia(
              "all and (resolution: ".concat(e, "dppx)"),
            )),
              this._resolutionMediaQueryList.addListener(
                this._resolutionListener,
              );
          }),
          (e.prototype._uninstallResolutionListener = function () {
            null !== this._resolutionMediaQueryList &&
              (this._resolutionMediaQueryList.removeListener(
                this._resolutionListener,
              ),
              (this._resolutionMediaQueryList = null));
          }),
          (e.prototype._reinstallResolutionListener = function () {
            this._uninstallResolutionListener(),
              this._installResolutionListener();
          }),
          (e.prototype._onResolutionChanged = function () {;
            this._observers.forEach((t) => t.next(this._window.devicePixelRatio)),
              this._reinstallResolutionListener();
          }),
          e
        );
      })();
      const d = (() => {
        function e(e, t, n) {
          let u;
          (this._canvasElement = null),
            (this._bitmapSizeChangedListeners = []),
            (this._suggestedBitmapSize = null),
            (this._suggestedBitmapSizeChangedListeners = []),
            (this._devicePixelRatioObservable = null),
            (this._canvasElementResizeObserver = null),
            (this._canvasElement = e),
            (this._canvasElementClientSize = r({
              width: this._canvasElement.clientWidth,
              height: this._canvasElement.clientHeight,
            })),
            (this._transformBitmapSize =
              null != t
                ? t
                : (e) => e),
            (this._allowResizeObserver =
              null === (u = null == n ? void 0 : n.allowResizeObserver) ||
              void 0 === u ||
              u),
            this._chooseAndInitObserver();
        }
        return (
          (e.prototype.dispose = function () {
            let e;
            let t;
            if (null === this._canvasElement)
              throw new Error("Object is disposed");
            null === (e = this._canvasElementResizeObserver) ||
              void 0 === e ||
              e.disconnect(),
              (this._canvasElementResizeObserver = null),
              null === (t = this._devicePixelRatioObservable) ||
                void 0 === t ||
                t.dispose(),
              (this._devicePixelRatioObservable = null),
              (this._suggestedBitmapSizeChangedListeners.length = 0),
              (this._bitmapSizeChangedListeners.length = 0),
              (this._canvasElement = null);
          }),
          Object.defineProperty(e.prototype, "canvasElement", {
            get: function () {
              if (null === this._canvasElement)
                throw new Error("Object is disposed");
              return this._canvasElement;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "canvasElementClientSize", {
            get: function () {
              return this._canvasElementClientSize;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "bitmapSize", {
            get: function () {
              return r({
                width: this.canvasElement.width,
                height: this.canvasElement.height,
              });
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.resizeCanvasElement = function (e) {
            (this._canvasElementClientSize = r(e)),
              (this.canvasElement.style.width = "".concat(
                this._canvasElementClientSize.width,
                "px",
              )),
              (this.canvasElement.style.height = "".concat(
                this._canvasElementClientSize.height,
                "px",
              )),
              this._invalidateBitmapSize();
          }),
          (e.prototype.subscribeBitmapSizeChanged = function (e) {
            this._bitmapSizeChangedListeners.push(e);
          }),
          (e.prototype.unsubscribeBitmapSizeChanged = function (e) {
            this._bitmapSizeChangedListeners =
              this._bitmapSizeChangedListeners.filter((t) => t !== e);
          }),
          Object.defineProperty(e.prototype, "suggestedBitmapSize", {
            get: function () {
              return this._suggestedBitmapSize;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.subscribeSuggestedBitmapSizeChanged = function (e) {
            this._suggestedBitmapSizeChangedListeners.push(e);
          }),
          (e.prototype.unsubscribeSuggestedBitmapSizeChanged = function (e) {
            this._suggestedBitmapSizeChangedListeners =
              this._suggestedBitmapSizeChangedListeners.filter((t) => t !== e);
          }),
          (e.prototype.applySuggestedBitmapSize = function () {
            if (null !== this._suggestedBitmapSize) {
              const e = this._suggestedBitmapSize;
              (this._suggestedBitmapSize = null),
                this._resizeBitmap(e),
                this._emitSuggestedBitmapSizeChanged(
                  e,
                  this._suggestedBitmapSize,
                );
            }
          }),
          (e.prototype._resizeBitmap = function (e) {
            const t = this.bitmapSize;
            u(t, e) ||
              ((this.canvasElement.width = e.width),
              (this.canvasElement.height = e.height),
              this._emitBitmapSizeChanged(t, e));
          }),
          (e.prototype._emitBitmapSizeChanged = function (e, t) {;
            this._bitmapSizeChangedListeners.forEach((r) => r.call(this, e, t));
          }),
          (e.prototype._suggestNewBitmapSize = function (e) {
            const t = this._suggestedBitmapSize;
            const n = r(
                this._transformBitmapSize(e, this._canvasElementClientSize),
              );
            const o = u(this.bitmapSize, n) ? null : n;
            (null === t && null === o) ||
              (null !== t && null !== o && u(t, o)) ||
              ((this._suggestedBitmapSize = o),
              this._emitSuggestedBitmapSizeChanged(t, o));
          }),
          (e.prototype._emitSuggestedBitmapSizeChanged = function (e, t) {;
            this._suggestedBitmapSizeChangedListeners.forEach((r) => r.call(this, e, t));
          }),
          (e.prototype._chooseAndInitObserver = function () {;
            this._allowResizeObserver
              ? new Promise((e) => {
                  const t = new ResizeObserver((n) => {
                    e(
                      n.every((e) => "devicePixelContentBoxSize" in e),
                    ),
                      t.disconnect();
                  });
                  t.observe(document.body, { box: "device-pixel-content-box" });
                })
                  .catch(() => !1)
                  .then((t) => t
                      ? this._initResizeObserver()
                      : this._initDevicePixelRatioObservable())
              : this._initDevicePixelRatioObservable();
          }),
          (e.prototype._initDevicePixelRatioObservable = function () {;
            if (null !== this._canvasElement) {
              const t = a(this._canvasElement);
              if (null === t)
                throw new Error("No window is associated with the canvas");
              (this._devicePixelRatioObservable = ((e) => new o(e))(t)),
                this._devicePixelRatioObservable.subscribe(() => this._invalidateBitmapSize()),
                this._invalidateBitmapSize();
            }
          }),
          (e.prototype._invalidateBitmapSize = function () {
            let e;
            let t;
            if (null !== this._canvasElement) {
              const n = a(this._canvasElement);
              if (null !== n) {
                const u =
                    null !==
                      (t =
                        null === (e = this._devicePixelRatioObservable) ||
                        void 0 === e
                          ? void 0
                          : e.value) && void 0 !== t
                      ? t
                      : n.devicePixelRatio;
                const o = this._canvasElement.getClientRects();
                const d =
                    void 0 !== o[0]
                      ? ((e, t) => r({
                            width:
                              Math.round(e.left * t + e.width * t) -
                              Math.round(e.left * t),
                            height:
                              Math.round(e.top * t + e.height * t) -
                              Math.round(e.top * t),
                          }))(o[0], u)
                      : r({
                          width: this._canvasElementClientSize.width * u,
                          height: this._canvasElementClientSize.height * u,
                        });
                this._suggestNewBitmapSize(d);
              }
            }
          }),
          (e.prototype._initResizeObserver = function () {;
            null !== this._canvasElement &&
              ((this._canvasElementResizeObserver = new ResizeObserver(
                (t) => {
                  const n = t.find((t) => t.target === this._canvasElement);
                  if (
                    n?.devicePixelContentBoxSize?.[0]
                  ) {
                    const u = n.devicePixelContentBoxSize[0];
                    const o = r({ width: u.inlineSize, height: u.blockSize });
                    this._suggestNewBitmapSize(o);
                  }
                },
              )),
              this._canvasElementResizeObserver.observe(this._canvasElement, {
                box: "device-pixel-content-box",
              }));
          }),
          e
        );
      })();
      function i(e, t) {
        if ("device-pixel-content-box" === t.type)
          return new d(e, t.transform, t.options);
        throw new Error("Unsupported binding target");
      }
      function a(e) {
        return e.ownerDocument.defaultView;
      }
      const s = (() => {
        function e(e, t, n) {
          if (0 === t.width || 0 === t.height)
            throw new TypeError(
              "Rendering target could only be created on a media with positive width and height",
            );
          if (((this._mediaSize = t), 0 === n.width || 0 === n.height))
            throw new TypeError(
              "Rendering target could only be created using a bitmap with positive integer width and height",
            );
          (this._bitmapSize = n), (this._context = e);
        }
        return (
          (e.prototype.useMediaCoordinateSpace = function (e) {
            try {
              return (
                this._context.save(),
                this._context.setTransform(1, 0, 0, 1, 0, 0),
                this._context.scale(
                  this._horizontalPixelRatio,
                  this._verticalPixelRatio,
                ),
                e({ context: this._context, mediaSize: this._mediaSize })
              );
            } finally {
              this._context.restore();
            }
          }),
          (e.prototype.useBitmapCoordinateSpace = function (e) {
            try {
              return (
                this._context.save(),
                this._context.setTransform(1, 0, 0, 1, 0, 0),
                e({
                  context: this._context,
                  mediaSize: this._mediaSize,
                  bitmapSize: this._bitmapSize,
                  horizontalPixelRatio: this._horizontalPixelRatio,
                  verticalPixelRatio: this._verticalPixelRatio,
                })
              );
            } finally {
              this._context.restore();
            }
          }),
          Object.defineProperty(e.prototype, "_horizontalPixelRatio", {
            get: function () {
              return this._bitmapSize.width / this._mediaSize.width;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "_verticalPixelRatio", {
            get: function () {
              return this._bitmapSize.height / this._mediaSize.height;
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })();
    },
  },
]);
