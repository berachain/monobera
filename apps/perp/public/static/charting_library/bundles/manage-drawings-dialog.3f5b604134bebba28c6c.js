(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
	[1702],
	{
		95002: (e) => {
			e.exports = {
				dialog: "dialog-lmxpCvnK",
				dialogWrapper: "dialogWrapper-lmxpCvnK",
				wrap: "wrap-lmxpCvnK",
			};
		},
		41662: (e, t, i) => {
			i.r(t), i.d(t, { ManageDrawingsDialogRenderer: () => c });
			const s = i(50959);
			const a = i(962);
			const n = i(44352);
			const r = i(16216);
			const l = i(98310);
			const o = i(35057);
			const d = i(23263);
			const h = i(95002);
			class p extends s.PureComponent {
				constructor(e) {
					super(e),
						(this._dialogRef = s.createRef()),
						(this._renderChildren = (e) =>
							s.createElement(
								"div",
								{ className: h.wrap },
								s.createElement(d.ManageDrawings, {
									onInitialized: e.centerAndFit,
									chartWidget: this._activeChartWidget,
								}),
							));
					const t = (0, r.service)(l.CHART_WIDGET_COLLECTION_SERVICE);
					(this._activeChartWidget = t.activeChartWidget.value()),
						(this.state = { layoutName: t.metaInfo.name.value() });
				}
				render() {
					return s.createElement(o.AdaptivePopupDialog, {
						wrapperClassName: h.dialogWrapper,
						className: h.dialog,
						dataName: "manage-drawings-dialog",
						isOpened: !0,
						onClickOutside: this.props.onClose,
						onClose: this.props.onClose,
						ref: this._dialogRef,
						render: this._renderChildren,
						showSeparator: !0,
						title: n.t(null, void 0, i(72357)),
						subtitle: this.state.layoutName,
					});
				}
			}
			class c {
				constructor(e) {
					(this._container = document.createElement("div")),
						(this._isVisible = !1),
						(this._handleClose = () => {
							this._onClose?.(),
								a.unmountComponentAtNode(this._container),
								(this._isVisible = !1);
						}),
						(this._onClose = e);
				}
				hide() {
					this._handleClose();
				}
				isVisible() {
					return this._isVisible;
				}
				show() {
					a.render(
						s.createElement(p, { onClose: this._handleClose }),
						this._container,
					),
						(this._isVisible = !0);
				}
			}
		},
	},
]);
