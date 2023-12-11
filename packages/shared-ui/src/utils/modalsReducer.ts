// Define action types
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

// Define modal names
export type ModalName =
	| "successModal"
	| "errorModal"
	| "submissionModal"
	| "loadingModal";

// Reducer function
interface ModalState {
	[key: string]: {
		isOpen: boolean;
		successHash?: string;
		errorHash?: string;
		errorMessage?: string;
		submissionHash?: string;
	};
}

interface OpenModalAction {
	type: typeof OPEN_MODAL;
	modalName: ModalName;
	modalData?: any;
}

interface CloseModalAction {
	type: typeof CLOSE_MODAL;
	modalName: ModalName;
	modalData?: any;
}

type ModalAction = OpenModalAction | CloseModalAction;

export const modalReducer = (
	state: ModalState,
	action: ModalAction,
): ModalState => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				[action.modalName]: {
					...state[action.modalName],
					isOpen: true,
					...action.modalData, // Spread the passed modal data
				},
			};
		case CLOSE_MODAL:
			return {
				...state,
				[action.modalName]: {
					...state[action.modalName],
					isOpen: false,
				},
			};
		default:
			return state;
	}
};

export const initialState: ModalState = {
	successModal: {
		isOpen: false,
		successHash: undefined,
	},
	errorModal: {
		isOpen: false,
		errorHash: undefined,
		errorMessage: undefined,
	},
	submissionModal: {
		isOpen: false,
		submissionHash: undefined,
	},
	loadingModal: {
		isOpen: false,
	},
};
