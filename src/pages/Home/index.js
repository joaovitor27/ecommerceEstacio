"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Producers_tsx_1 = require("./components/Producers.tsx");
var Auth_tsx_1 = require("../../services/firebase/Auth.tsx");
function Home(_a) {
    var navigation = _a.navigation;
    if (!(0, Auth_tsx_1.getCurrentUser)()) {
        navigation.navigate('Login');
    }
    return (<>
      <Producers_tsx_1.default navigation={navigation}/>
    </>);
}
exports.default = Home;
