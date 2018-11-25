declare module 'react-native-languages' {

	type Listener = 'change';
	type Callback = (language: string, languages: string[]) => void;

	interface Languages {
		language: string;
		languages: string[];
		addEventListener: (type: Listener, cb: Callback) => void;
		removeEventListener: (type: Listener, cb: Callback) => void;
	}

	declare const RNLanguages: Languages;
	export = RNLanguages;
}