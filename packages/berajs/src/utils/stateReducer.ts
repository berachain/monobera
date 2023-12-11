type LoadingState = "idle" | "loading" | "success" | "fail" | "submitting";

export enum ActionEnum {
	ERROR = "confirm_error",
	SUCCESS = "confirm_receipt",
	LOADING = "confirm_sending",
	SUBMITTING = "confirm_submitting",
}

type Action =
	| { type: ActionEnum.LOADING }
	| { type: ActionEnum.SUCCESS }
	| { type: ActionEnum.ERROR }
	| { type: ActionEnum.SUBMITTING };

interface State {
	confirmState: LoadingState;
	txnHash: string;
	message: string;
}

export const initialState: State = {
	confirmState: "idle",
	txnHash: "",
	message: "",
};

export const reducer = (state: State, actions: Action): State => {
	switch (actions.type) {
		case ActionEnum.LOADING:
			return {
				...state,
				confirmState: "loading",
			};
		case ActionEnum.SUCCESS:
			return {
				...state,
				confirmState: "success",
			};
		case ActionEnum.ERROR:
			return {
				...state,
				confirmState: "fail",
			};
		case ActionEnum.SUBMITTING:
			return {
				...state,
				confirmState: "submitting",
			};
		default:
			return state;
	}
};
