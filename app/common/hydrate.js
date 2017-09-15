import {AsyncStorage} from "react-native";
import {create, persist} from "mobx-persist";

const hydrate = create({
	storage: AsyncStorage,   // or AsyncStorage in react-native.
	// default: localStorage
	jsonify: true  // if you use AsyncStorage, here shoud be true
	// default: true
});

export default hydrate;